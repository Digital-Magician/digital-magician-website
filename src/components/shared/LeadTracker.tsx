"use client";

import { useEffect } from "react";

type LeadMethod = "whatsapp" | "phone" | "email";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

function methodFor(href: string): LeadMethod | null {
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\//i.test(href)) return "whatsapp";
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  return null;
}

/**
 * Enquiries happen through WhatsApp, call and email links rather than forms,
 * so one delegated listener reports every such click to GA4 as generate_lead
 * (mark it as a key event in GA4) and to the Meta Pixel as Contact.
 */
export default function LeadTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const method = methodFor(href);
      if (!method) return;

      const label = (anchor.textContent ?? "").trim().slice(0, 80);

      // Same shape as the gtag() stub, so events queue even before gtag.js loads.
      window.dataLayer = window.dataLayer || [];
      // eslint-disable-next-line prefer-rest-params
      const gtag = function (..._args: unknown[]) { window.dataLayer!.push(arguments); };
      gtag("event", "generate_lead", {
        method,
        link_text: label,
        page_path: window.location.pathname,
      });

      window.fbq?.("track", "Contact", { method });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
