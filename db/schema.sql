-- Digital Magician application schema.
-- Safe to run repeatedly: every statement is guarded.

CREATE TABLE IF NOT EXISTS users (
  id                   BIGSERIAL PRIMARY KEY,
  email                TEXT UNIQUE NOT NULL,
  full_name            TEXT NOT NULL,
  phone                TEXT,
  password_hash        TEXT NOT NULL,
  role                 TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  must_change_password BOOLEAN NOT NULL DEFAULT TRUE,
  is_active            BOOLEAN NOT NULL DEFAULT TRUE,
  token_version        INTEGER NOT NULL DEFAULT 0,
  last_login_at        TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Enrollment ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrollments (
  id                    BIGSERIAL PRIMARY KEY,
  reference             TEXT UNIQUE NOT NULL,
  student_name          TEXT NOT NULL,
  father_name           TEXT NOT NULL,
  guardian_phone        TEXT NOT NULL,
  contact_number        TEXT NOT NULL,
  whatsapp_number       TEXT NOT NULL,
  email                 TEXT,
  address               TEXT NOT NULL,
  program_slug          TEXT NOT NULL,
  program_name          TEXT NOT NULL,
  course_fee_paise      BIGINT NOT NULL,
  payment_plan          TEXT NOT NULL CHECK (payment_plan IN ('full', 'enrollment_only')),
  amount_due_now_paise  BIGINT NOT NULL,
  payment_method        TEXT CHECK (payment_method IN ('razorpay', 'upi', 'cash')),
  balance_method        TEXT CHECK (balance_method IN ('cash', 'online', 'not_applicable')),
  payment_status        TEXT NOT NULL DEFAULT 'pending'
                          CHECK (payment_status IN ('pending', 'paid', 'awaiting_verification', 'cash_at_institute', 'failed')),
  aadhaar_path          TEXT,
  payment_proof_path    TEXT,
  razorpay_order_id     TEXT,
  razorpay_payment_id   TEXT,
  amount_paid_paise     BIGINT NOT NULL DEFAULT 0,
  status                TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'verified', 'rejected')),
  admin_notes           TEXT,
  verified_by           BIGINT REFERENCES users (id),
  verified_at           TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS enrollments_created_idx ON enrollments (created_at DESC);
CREATE INDEX IF NOT EXISTS enrollments_status_idx ON enrollments (status);

-- ── Learning portal ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id           BIGSERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  position     INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS modules (
  id        BIGSERIAL PRIMARY KEY,
  course_id BIGINT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
  title     TEXT NOT NULL,
  position  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS modules_course_idx ON modules (course_id, position);

CREATE TABLE IF NOT EXISTS lessons (
  id             BIGSERIAL PRIMARY KEY,
  module_id      BIGINT NOT NULL REFERENCES modules (id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  youtube_id     TEXT NOT NULL,
  description    TEXT,
  duration_label TEXT,
  resource_url   TEXT,
  position       INTEGER NOT NULL DEFAULT 0,
  is_published   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lessons_module_idx ON lessons (module_id, position);

CREATE TABLE IF NOT EXISTS course_access (
  user_id    BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  course_id  BIGINT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id      BIGINT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  lesson_id    BIGINT NOT NULL REFERENCES lessons (id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id)
);

-- ── Certificates ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certificates (
  id                 BIGSERIAL PRIMARY KEY,
  certificate_number TEXT UNIQUE NOT NULL,
  student_name       TEXT NOT NULL,
  program_name       TEXT NOT NULL,
  issued_on          DATE NOT NULL,
  grade              TEXT,
  status             TEXT NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'revoked')),
  revoked_reason     TEXT,
  created_by         BIGINT REFERENCES users (id),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS certificates_number_idx ON certificates (upper(certificate_number));

-- ── Infrastructure ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rate_limits (
  key          TEXT PRIMARY KEY,
  hits         INTEGER NOT NULL DEFAULT 0,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_log (
  id             BIGSERIAL PRIMARY KEY,
  actor_user_id  BIGINT REFERENCES users (id),
  action         TEXT NOT NULL,
  entity         TEXT,
  entity_id      TEXT,
  meta           JSONB,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_log_created_idx ON audit_log (created_at DESC);
