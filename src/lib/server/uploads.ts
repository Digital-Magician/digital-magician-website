import "server-only";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { put, del, get } from "@vercel/blob";

export const ALLOWED_UPLOAD_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB

const MAGIC = Buffer.from("DMENC1");
const LOCAL_DIR = path.join(process.cwd(), ".uploads");

export interface StoredFile {
  pathname: string;
  contentType: string;
  size: number;
}

/**
 * Identity documents are encrypted before they leave this process, then written
 * to a PRIVATE blob store. Two independent locks: the store refuses anonymous
 * reads, and the bytes are useless without DOCUMENT_ENCRYPTION_KEY.
 */
function encryptionKey(): Buffer | null {
  const raw = process.env.DOCUMENT_ENCRYPTION_KEY;
  if (!raw) return null;
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("DOCUMENT_ENCRYPTION_KEY must be 32 bytes, base64 encoded.");
  }
  return key;
}

function encrypt(data: Buffer): Buffer {
  const key = encryptionKey();
  if (!key) return data;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([cipher.update(data), cipher.final()]);
  return Buffer.concat([MAGIC, iv, cipher.getAuthTag(), body]);
}

function decrypt(data: Buffer): Buffer {
  if (!data.subarray(0, MAGIC.length).equals(MAGIC)) return data; // stored before encryption was on
  const key = encryptionKey();
  if (!key) throw new Error("This file is encrypted but DOCUMENT_ENCRYPTION_KEY is not set.");
  const iv = data.subarray(MAGIC.length, MAGIC.length + 12);
  const tag = data.subarray(MAGIC.length + 12, MAGIC.length + 28);
  const body = data.subarray(MAGIC.length + 28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(body), decipher.final()]);
}

/** Development machines have no private blob store, so files stay on disk. */
function useLocalDisk(): boolean {
  return process.env.NODE_ENV !== "production" && process.env.BLOB_PRIVATE_STORE !== "1";
}

export function contentTypeFor(pathname: string): string {
  if (pathname.endsWith(".pdf")) return "application/pdf";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

export async function storePrivateFile(
  folder: "aadhaar" | "payment-proof",
  file: File
): Promise<StoredFile> {
  if (!ALLOWED_UPLOAD_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, WEBP or PDF files are accepted.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("File is larger than 8 MB.");
  }

  const extension = file.type === "application/pdf" ? "pdf" : file.type.split("/")[1];
  const pathname = `private/${folder}/${crypto.randomUUID()}.${extension}`;
  const payload = encrypt(Buffer.from(await file.arrayBuffer()));

  if (useLocalDisk()) {
    const target = path.join(LOCAL_DIR, pathname);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, payload);
  } else {
    await put(pathname, payload, {
      access: "private",
      contentType: "application/octet-stream",
      addRandomSuffix: false,
    });
  }

  return { pathname, contentType: file.type, size: file.size };
}

/** Returns the decrypted bytes for an admin to view. */
export async function readPrivateFile(pathname: string): Promise<Buffer | null> {
  if (useLocalDisk()) {
    try {
      return decrypt(await fs.readFile(path.join(LOCAL_DIR, pathname)));
    } catch {
      return null;
    }
  }

  const result = await get(pathname, { access: "private" });
  if (!result?.stream) return null;
  const chunks: Uint8Array[] = [];
  const reader = result.stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return decrypt(Buffer.concat(chunks));
}

export async function deletePrivateFile(pathname: string) {
  if (useLocalDisk()) {
    await fs.rm(path.join(LOCAL_DIR, pathname), { force: true });
    return;
  }
  await del(pathname);
}
