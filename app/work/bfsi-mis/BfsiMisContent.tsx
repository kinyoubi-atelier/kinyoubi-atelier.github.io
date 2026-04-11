'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, CalendarClock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/* ─────────────────────────────────────────────────────────────
   Source: ../../CASE STUDIES/case-study-bfsi-mis.html
   Every claim on this page is neutralized and traceable to that
   source document. Founder attestation section is reproduced
   verbatim because it is the load-bearing credibility signal.
   ───────────────────────────────────────────────────────────── */

const heroChips = [
  'Sector: Regulated financial services',
  'Region: India',
  'Engagement: Greenfield build',
]

const heroMeta = [
  { k: 'Client', v: 'Regulated Indian financial institution (anonymized)' },
  { k: 'Stakeholder', v: 'Senior operations & compliance leadership' },
  { k: 'Phase', v: 'Foundation phase — data & infrastructure' },
  { k: 'Stack', v: 'Flutter · AWS ap-south-1 · PostgreSQL · Bedrock' },
]

const clientProblem = [
  'Leadership needed a single pane of glass across the field network — not a once-a-month deck.',
  'Field officers in low-connectivity geographies needed to capture daily numbers without depending on a stable mobile data connection.',
  'Risk and compliance needed cryptographic assurance that sensitive fields were protected at rest, in transit, and across the AI layer.',
  'Leadership wanted natural-language insights (e.g. "Why did this product line soften in a specific region this week?") without exposing any row-level customer data to a third-party model.',
]

const architectureKv = [
  { k: 'Identity', v: 'Amazon Cognito user pool, MFA enforced, role claims surfaced into API Gateway authorizers.' },
  { k: 'Edge & API', v: 'API Gateway fronting Lambda handlers, TLS\u00a01.3 end-to-end, short-lived JWTs, request-level audit logging.' },
  { k: 'Data', v: 'Amazon RDS for PostgreSQL in the Mumbai region, row-level security per role, client-side FLE for sensitive text fields.' },
  { k: 'AI layer', v: 'Amazon Bedrock invoked from a private-subnet Lambda, reading only aggregated, de-identified views.' },
  { k: 'Mobile', v: 'Flutter application with encrypted local store and conflict-aware sync.' },
  { k: 'Residency', v: 'All primary data, compute, and model inference pinned to AWS Mumbai (ap-south-1).' },
]

const compliance = [
  { concern: 'Data residency (RBI cloud guidance)', how: 'Primary storage, compute, and model inference pinned to AWS Mumbai (ap-south-1). No cross-border data movement.' },
  { concern: 'Transport security', how: 'TLS 1.3 enforced on every API surface; no downgrade paths.' },
  { concern: 'PII protection at rest', how: 'Client-side field-level encryption for sensitive free-text fields before they reach the database. Keys rotate on schedule.' },
  { concern: 'Tenant isolation', how: 'PostgreSQL row-level security per role — tenancy boundaries survive application bugs.' },
  { concern: 'Least privilege', how: 'Scoped IAM roles on every service; no broad wildcards on data-plane resources.' },
  { concern: 'AI data exposure (DPDP Act readiness)', how: 'AI layer consumes only aggregated, de-identified views through a hardened view layer. No IAM path to raw rows.' },
  { concern: 'Auditability', how: "Full audit trail of read and write events, retained per the institution's record-keeping requirements." },
]

type ArtifactStatus = 'done' | 'wip' | 'next'
const artifacts: { path: string; scope: string; status: ArtifactStatus }[] = [
  { path: 'schema.sql', scope: 'PostgreSQL DDL — core tables, FLE annotations, indexes', status: 'wip' },
  { path: 'policies/rls.sql', scope: 'Row-level security policies across the role matrix', status: 'wip' },
  { path: 'template.yaml', scope: 'SAM / CloudFormation scaffold — Cognito, RDS, Lambda', status: 'wip' },
  { path: 'docs/encryption-policy.md', scope: 'Written policy identifying every FLE field and its rationale', status: 'done' },
  { path: 'docs/rbi-mapping.md', scope: 'Control-by-control mapping to RBI outsourcing guidance', status: 'done' },
  { path: 'tests/rls-matrix.sql', scope: 'Negative-path test suite for every role × scope combination', status: 'next' },
]

const workRhythm = [
  { wk: 'W1', focus: 'Scope lock, threat model, data classification', artifact: 'threat model v1' },
  { wk: 'W2', focus: 'Schema draft & review with risk team', artifact: 'schema.sql draft' },
  { wk: 'W3', focus: 'RLS policy authoring & role matrix', artifact: 'policies/rls.sql' },
  { wk: 'W4', focus: 'IaC scaffold, Cognito & RDS stacks', artifact: 'template.yaml' },
  { wk: 'W5', focus: 'Encryption policy & RBI control mapping', artifact: 'policy docs v1' },
  { wk: 'W6', focus: 'Internal review, hardening, handoff to phase 2', artifact: 'review sign-off' },
]

/* ─── Code blocks ─── */

const codeSchema = `-- Illustrative shape of a daily site-level metrics table.
-- Fields marked [FLE] are encrypted client-side before insert;
-- the database only ever sees ciphertext for those columns.

CREATE TABLE site_daily_metrics (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id          UUID NOT NULL REFERENCES sites(id),
  reporting_date   DATE NOT NULL,
  category_code    TEXT NOT NULL,   -- generic bucket, not a customer-level tag
  volume_inr       NUMERIC(18,2) NOT NULL,
  txn_count        INT     NOT NULL,
  officer_note_enc BYTEA,           -- [FLE] free-text, encrypted client-side
  created_by       UUID NOT NULL REFERENCES users(id),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- No raw customer identifiers are permitted in this table by design.
-- All aggregation keys are site-level, never account-level.
`

const codeRls = `-- The session variable app.current_user_id is set from the verified JWT
-- before any query runs. Policies read from a users table carrying
-- role + scope (site_id for site leads, region_id for regional leads).

ALTER TABLE site_daily_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY site_scope ON site_daily_metrics
  FOR SELECT USING (
    site_id IN (
      SELECT s.id FROM sites s
      JOIN users u ON u.id = current_setting('app.current_user_id')::uuid
      WHERE
        (u.role = 'site_lead'     AND s.id        = u.site_id)   OR
        (u.role = 'regional_lead' AND s.region_id = u.region_id) OR
         u.role = 'compliance_ro'
    )
  );
`

const codeIac = `Resources:
  MisUserPool:
    Type: AWS::Cognito::UserPool
    Properties:
      UserPoolName: mis-users
      MfaConfiguration: ON
      EnabledMfas: [SOFTWARE_TOKEN_MFA]
      Policies:
        PasswordPolicy:
          MinimumLength: 12
          RequireSymbols: true
          RequireNumbers: true
          RequireUppercase: true
      Schema:
        - Name: role
          AttributeDataType: String
          Mutable: false
  # RDS and Bedrock-connected Lambda resources omitted for brevity.
`

/* ─── Presentational helpers ─── */

function CodeBlock({ caption, children }: { caption: string; children: string }) {
  return (
    <figure className="my-7 rounded-card border border-text-primary/10 overflow-hidden bg-surface-dark">
      <figcaption className="px-5 py-3 bg-surface-dark-alt text-gold-bright text-[11px] font-medium uppercase tracking-widest border-b border-text-primary/10 font-mono">
        {caption}
      </figcaption>
      <pre className="m-0 p-5 md:p-6 overflow-x-auto text-text-on-dark/90 text-[12.5px] md:text-[13px] leading-relaxed font-mono">
        <code>{children}</code>
      </pre>
    </figure>
  )
}

function StatusChip({ status }: { status: ArtifactStatus }) {
  if (status === 'done') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
        <CheckCircle2 className="h-3 w-3" />
        Delivered
      </span>
    )
  }
  if (status === 'wip') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/25">
        <Clock3 className="h-3 w-3" />
        In review
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-navy/10 text-navy border border-navy/20">
      <CalendarClock className="h-3 w-3" />
      Scheduled
    </span>
  )
}

/* ─── Architecture diagram — rebuilt in Kinyoubi palette
       navy #142850 · gold #a08535 · background-alt #F0EEEA
       ───────────────────────────────────────────────── */

function ArchitectureDiagram() {
  return (
    <figure className="my-8 rounded-card border border-text-primary/10 bg-surface-card p-6 md:p-8">
      <svg viewBox="0 0 720 290" xmlns="http://www.w3.org/2000/svg" role="img" className="w-full h-auto max-w-[760px] mx-auto block" aria-label="End-to-end architecture: Flutter client to API Gateway to Lambda to PostgreSQL with row-level security, and from a de-identified view layer to a private-subnet Lambda invoking Amazon Bedrock.">
        <defs>
          <marker id="bfsiArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#a08535" />
          </marker>
        </defs>

        {/* Flutter client (outside the region box) */}
        <rect x="10" y="95" width="110" height="70" rx="8" fill="#FFFFFF" stroke="#142850" strokeWidth="1.2" />
        <text x="65" y="120" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Flutter client</text>
        <text x="65" y="138" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">encrypted</text>
        <text x="65" y="152" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">local store</text>

        {/* Region dashed box */}
        <rect x="150" y="30" width="560" height="230" rx="10" fill="none" stroke="#142850" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
        <text x="160" y="50" fill="#9CA3AF" fontSize="10" letterSpacing="1.4" fontFamily="Inter, system-ui, sans-serif">AWS AP-SOUTH-1 · MUMBAI</text>

        {/* API Gateway */}
        <rect x="170" y="95" width="120" height="70" rx="8" fill="#F0EEEA" stroke="#142850" strokeWidth="1.2" />
        <text x="230" y="120" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">API Gateway</text>
        <text x="230" y="138" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">TLS 1.3</text>
        <text x="230" y="152" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Cognito JWT</text>

        {/* Lambda */}
        <rect x="310" y="95" width="120" height="70" rx="8" fill="#F0EEEA" stroke="#142850" strokeWidth="1.2" />
        <text x="370" y="120" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Lambda</text>
        <text x="370" y="138" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">role → session var</text>
        <text x="370" y="152" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">audit log</text>

        {/* PostgreSQL */}
        <rect x="450" y="95" width="120" height="70" rx="8" fill="#F0EEEA" stroke="#142850" strokeWidth="1.2" />
        <text x="510" y="120" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">PostgreSQL</text>
        <text x="510" y="138" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">row-level security</text>
        <text x="510" y="152" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">FLE columns</text>

        {/* Bedrock */}
        <rect x="590" y="95" width="110" height="70" rx="8" fill="#F0EEEA" stroke="#142850" strokeWidth="1.2" />
        <text x="645" y="120" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Bedrock</text>
        <text x="645" y="138" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">private subnet</text>
        <text x="645" y="152" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">de-id views only</text>

        {/* Arrows */}
        <line x1="122" y1="130" x2="168" y2="130" stroke="#a08535" strokeWidth="1.5" markerEnd="url(#bfsiArrow)" />
        <line x1="292" y1="130" x2="308" y2="130" stroke="#a08535" strokeWidth="1.5" markerEnd="url(#bfsiArrow)" />
        <line x1="432" y1="130" x2="448" y2="130" stroke="#a08535" strokeWidth="1.5" markerEnd="url(#bfsiArrow)" />
        <line x1="572" y1="130" x2="588" y2="130" stroke="#a08535" strokeWidth="1.5" markerEnd="url(#bfsiArrow)" />

        {/* Footer text */}
        <text x="365" y="210" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="Inter, system-ui, sans-serif">
          Data, compute, and inference all pinned to region. No raw PII crosses the de-identification boundary.
        </text>
        <text x="365" y="226" textAnchor="middle" fill="#9CA3AF" fontSize="11" fontStyle="italic" fontFamily="Inter, system-ui, sans-serif">
          Illustrative — simplified for public disclosure.
        </text>
      </svg>
      <figcaption className="mt-4 text-sm text-text-tertiary text-center">
        Figure 1 · End-to-end flow, simplified for disclosure.
      </figcaption>
    </figure>
  )
}

/* ─── Repository tree — emitted as one <pre>, with [redacted] / tag markers
       rendered via inline <span>s that preserve the monospace column alignment
       ───────────────────────────────────────────────────────────────────── */

function RepoTree() {
  const redact = (
    <span className="text-text-tertiary/70">[redacted]</span>
  )
  const published = (
    <span className="text-gold">published summary available</span>
  )
  return (
    <figure className="my-6 rounded-card border border-text-primary/10 overflow-hidden bg-surface-dark">
      <figcaption className="px-5 py-3 bg-surface-dark-alt text-gold-bright text-[11px] font-medium uppercase tracking-widest border-b border-text-primary/10 font-mono">
        project repository · top level
      </figcaption>
      <pre className="m-0 p-5 md:p-6 overflow-x-auto text-text-on-dark/90 text-[12.5px] md:text-[13px] leading-[1.65] font-mono">
        {`mis-platform/
├── db/
│   ├── schema.sql                  `}{redact}{`
│   ├── policies/rls.sql            `}{redact}{`
│   └── migrations/                 `}{redact}{`
├── infra/
│   ├── template.yaml               `}{redact}{`
│   └── stacks/                     `}{redact}{`
├── mobile/                         `}<span className="text-text-tertiary/70">[Flutter — phase 2]</span>{`
├── docs/
│   ├── encryption-policy.md        `}{published}{`
│   ├── threat-model.md             `}{redact}{`
│   └── rbi-mapping.md              `}{published}{`
└── tests/
    └── rls-matrix.sql              `}{redact}
      </pre>
    </figure>
  )
}

/* ─── Page ─── */

export default function BfsiMisContent() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-36 pb-14 md:pb-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/#built-with-care"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-gold transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-5">
              Case study · BFSI · Regulated SaaS
            </p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-[1.1]">
              A compliance-first MIS platform for a regulated Indian financial institution
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl">
              How Kinyoubi Atelier &amp; Co. designed the secure data foundation, offline-first capture layer, and AI-assisted insight engine for a multi-site Management Information System — engineered from day one for RBI alignment and DPDP Act readiness.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {heroChips.map((c) => (
                <span
                  key={c}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-text-primary/10 bg-background-alt text-text-secondary"
                >
                  {c}
                </span>
              ))}
            </div>

            <dl className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-8 border-t border-text-primary/10">
              {heroMeta.map((m) => (
                <div key={m.k}>
                  <dt className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest mb-1">
                    {m.k}
                  </dt>
                  <dd className="text-sm text-text-primary leading-snug">{m.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Provenance band */}
      <section className="py-3 px-6 md:px-12 bg-surface-dark text-text-on-dark/70 border-t border-b border-text-primary/10 font-mono text-[12px]">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span>v1.0 · published 2026-04-11 · publisher: Kinyoubi Atelier &amp; Co.</span>
          <span className="text-text-on-dark/50">provenance: founder attestation below</span>
        </div>
      </section>

      {/* At a glance */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              At a glance
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              A regulated Indian financial institution engaged Kinyoubi Atelier &amp; Co. to replace an Excel-and-email reporting loop that senior operations leadership relied on to track daily field performance. The brief sounded deceptively simple — &ldquo;give us one pane of glass&rdquo; — but three hard constraints shape every serious build in this segment: strict regulatory posture under RBI supervision, patchy connectivity across field sites, and the non-negotiable rule that raw personally identifiable information (PII) must never leave the institution&apos;s trust boundary, least of all through a third-party AI API.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              This case study describes the foundation phase — the secure data layer, identity, and infrastructure scaffolding — and why the underlying pattern is productizable across the wider regulated-SaaS segment in India.
            </p>

            <div className="mt-8 border-l-2 border-gold pl-5 py-3 bg-background-alt rounded-r-card">
              <p className="text-text-secondary text-base leading-relaxed mb-0">
                <strong className="text-text-primary">Note on confidentiality.</strong> Client identity, site data, internal product taxonomies, named stakeholders, and any proprietary metrics have been redacted or generalized. Code samples are simplified, sanitized illustrations of architectural patterns — not production artifacts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The opportunity */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The opportunity
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              Large regulated financial institutions in India operate at a scale that makes operational visibility genuinely hard. Daily reporting across a wide field network still happens through spreadsheets stitched together locally, emailed upstream, and re-keyed into leadership decks the night before review calls. The data is always at least a day stale, frequently inconsistent across sites, and carries enough embedded PII that even informal sharing creates regulatory exposure.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Our thesis going in: the opportunity isn&apos;t &ldquo;another dashboard.&rdquo; It is a <em>compliance-native operating layer</em> — a system of record for daily field activity that is secure by construction, usable on weak networks, and capable of generating narrative insights without ever shipping raw customer data out of the institution&apos;s VPC.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              The problem, in the client&apos;s words
            </h2>
            <ul className="space-y-3 text-text-secondary text-lg leading-relaxed list-disc pl-6 marker:text-gold">
              {clientProblem.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Our approach */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Our approach
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              We scoped the foundation phase tightly: before writing a single line of frontend code, we would finalize the secure data foundation. Three deliverables — a PostgreSQL schema with row-level security (RLS) enforced at the database, an Infrastructure-as-Code scaffold covering identity and data services, and a clear written policy on which fields require client-side field-level encryption (FLE) before they are allowed to touch the database at all.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Three principles guided the design:
            </p>

            <div className="space-y-6">
              <div className="rounded-card border border-text-primary/5 bg-surface-card p-6 md:p-7">
                <h3 className="text-base font-semibold text-gold mb-2">1 · Zero raw PII to external APIs.</h3>
                <p className="text-text-secondary leading-relaxed mb-0">
                  AI-assisted insight generation runs against <em>aggregated, tokenized, de-identified</em> views — never against raw rows. The Bedrock-connected Lambda sits inside a private subnet, reads pre-aggregated shapes through a hardened view layer, and has no IAM path to customer-identifying columns. This is an architectural guarantee, not a policy promise.
                </p>
              </div>
              <div className="rounded-card border border-text-primary/5 bg-surface-card p-6 md:p-7">
                <h3 className="text-base font-semibold text-gold mb-2">2 · Tenancy enforced at the database, not the application.</h3>
                <p className="text-text-secondary leading-relaxed mb-0">
                  Multi-role access (site-level → regional-level → compliance read-only) is implemented as PostgreSQL row-level security policies. Even if a developer shipped a query without a <code className="text-sm text-gold bg-background-alt px-1.5 py-0.5 rounded border border-text-primary/10">WHERE</code> clause, the database would still refuse to return rows outside the caller&apos;s authorized scope. Application bugs cannot become data-leak incidents.
                </p>
              </div>
              <div className="rounded-card border border-text-primary/5 bg-surface-card p-6 md:p-7">
                <h3 className="text-base font-semibold text-gold mb-2">3 · Offline-first is a first-class concern, not a retrofit.</h3>
                <p className="text-text-secondary leading-relaxed mb-0">
                  The mobile capture layer is built in Flutter with a local encrypted store and a conflict-aware sync protocol. Officers can complete an entire day&apos;s capture in a no-signal site and have it reconcile cleanly when they step back into coverage.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Architecture in brief
            </h2>

            <ArchitectureDiagram />

            <dl className="divide-y divide-text-primary/5 border-t border-b border-text-primary/5 mt-6">
              {architectureKv.map((row) => (
                <div key={row.k} className="grid grid-cols-1 md:grid-cols-[180px,1fr] gap-y-1 md:gap-x-6 py-4">
                  <dt className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest pt-1">
                    {row.k}
                  </dt>
                  <dd className="text-text-secondary leading-relaxed">{row.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Snippets */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
              A look inside — sanitized snippets
            </h2>
            <p className="text-text-tertiary text-base leading-relaxed mb-4">
              The following are illustrative, abstracted patterns — not production code. They are included to convey engineering posture, not implementation.
            </p>

            <CodeBlock caption="01 · Schema skeleton with field-level encryption annotations">{codeSchema}</CodeBlock>
            <CodeBlock caption="02 · Row-level security — tenancy enforced by the database">{codeRls}</CodeBlock>
            <CodeBlock caption="03 · IaC stub — identity with MFA enforced (SAM / CloudFormation)">{codeIac}</CodeBlock>
          </motion.div>
        </div>
      </section>

      {/* Compliance posture */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Compliance posture
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              The foundation phase was designed against the Reserve Bank of India&apos;s guidance on outsourcing of IT services and cloud computing for regulated entities, and against the data-handling obligations set by the Digital Personal Data Protection Act, 2023. The controls that matter most to a BFSI buyer are built in, not bolted on.
            </p>

            <div className="rounded-card border border-text-primary/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-alt">
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top w-[38%]">Regulatory concern</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top">How we address it</th>
                  </tr>
                </thead>
                <tbody>
                  {compliance.map((row) => (
                    <tr key={row.concern} className="border-b border-text-primary/5 last:border-b-0 align-top">
                      <td className="px-5 py-4 text-text-primary font-medium text-[15px]">{row.concern}</td>
                      <td className="px-5 py-4 text-text-secondary text-[15px] leading-relaxed">{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof & provenance */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
              Proof &amp; provenance
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              Public case studies in regulated industries often read as hand-wavy marketing. We have published the following to let a qualified reader verify that what we describe above maps to real engineering artifacts.
            </p>

            {/* Artifact manifest */}
            <h3 className="font-heading text-xl text-text-primary mb-3">Published artifact manifest</h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              The foundation phase produces a defined set of deliverables. The table below reflects their current status, and is updated as each artifact clears internal review.
            </p>

            <div className="rounded-card border border-text-primary/10 overflow-hidden bg-surface-card mb-14">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-alt">
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top">Artifact</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top">Scope</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 align-top">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {artifacts.map((row) => (
                    <tr key={row.path} className="border-b border-text-primary/5 last:border-b-0 align-top">
                      <td className="px-5 py-4 font-mono text-[13px] text-gold whitespace-nowrap">{row.path}</td>
                      <td className="px-5 py-4 text-text-secondary text-[14.5px] leading-relaxed">{row.scope}</td>
                      <td className="px-5 py-4 whitespace-nowrap"><StatusChip status={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Repository tree */}
            <h3 className="font-heading text-xl text-text-primary mb-3">Repository shape</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              We are not publishing contents, but the <em>shape</em> of the repository is itself a credibility signal. This is the top-level layout of the foundation-phase workspace:
            </p>

            <RepoTree />

            {/* Work rhythm */}
            <h3 className="font-heading text-xl text-text-primary mb-3 mt-12">Foundation phase · work rhythm</h3>
            <p className="text-text-secondary leading-relaxed mb-5">
              A week-by-week view of how the foundation phase was executed. No absolute dates — the cadence itself is the signal.
            </p>

            <div className="rounded-card border border-text-primary/10 overflow-hidden bg-surface-card">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-alt">
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10 w-[60px]">Week</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10">Focus</th>
                    <th className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest px-5 py-3 border-b border-text-primary/10">Artifact</th>
                  </tr>
                </thead>
                <tbody>
                  {workRhythm.map((row) => (
                    <tr key={row.wk} className="border-b border-text-primary/5 last:border-b-0">
                      <td className="px-5 py-4 font-mono text-sm text-gold align-top">{row.wk}</td>
                      <td className="px-5 py-4 text-text-secondary text-[14.5px] leading-relaxed align-top">{row.focus}</td>
                      <td className="px-5 py-4 text-text-primary font-mono text-[12.5px] align-top">{row.artifact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder attestation */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h3 className="font-heading text-xl text-text-primary mb-5">Founder attestation</h3>
            <div className="rounded-card border-2 border-gold/30 bg-surface-card p-7 md:p-9 shadow-soft">
              <div className="flex items-start gap-4 mb-5">
                <div className="h-11 w-11 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                  <span className="text-gold-bright font-heading text-base font-semibold">AS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-text-primary font-semibold text-base">Ankit Sahu</div>
                  <div className="text-text-tertiary text-sm">Founder, Kinyoubi Atelier &amp; Co.</div>
                </div>
              </div>
              <p className="text-text-secondary text-base leading-relaxed mb-4">
                I attest that the engagement, architecture, and artifacts described in this case study are real and were produced by Kinyoubi Atelier &amp; Co. for a regulated Indian financial institution. Client identity and proprietary details have been redacted in accordance with confidentiality obligations. Qualified prospects, investors, and partners can request a technical deep-dive, a walkthrough of unredacted artifacts, and direct client references under mutual NDA.
              </p>
              <p className="text-sm text-text-tertiary pt-4 border-t border-text-primary/5">
                Contact:{' '}
                <a
                  href="mailto:kinyoubi.atelier@outlook.com"
                  className="text-gold hover:underline"
                >
                  kinyoubi.atelier@outlook.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What the foundation phase delivered */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              What the foundation phase delivered
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              At the close of the foundation phase, the institution had a defensible base to build on: a reviewed PostgreSQL schema with RLS policies written and tested against the role matrix, an Infrastructure-as-Code scaffold covering identity and the data tier, and a written encryption policy identifying every field that must be client-side encrypted before storage. Crucially, the architecture decisions were documented in a form the client&apos;s internal risk and compliance team could review against RBI guidance line by line.
            </p>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Phase 2 — the officer capture app, leadership dashboards, and Bedrock-mediated insights — is in active build. Outcome metrics will be added here once the system is in production and the client has approved their disclosure. We do not publish fabricated KPIs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why this build matters */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Why this build matters
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-5">
              Every large regulated financial institution in India has some version of the same problem: operational data trapped in spreadsheets, reporting that is stale by the time leadership sees it, and a regulatory environment that makes &ldquo;just pipe it into an AI tool&rdquo; a non-starter. The pattern we have built here — offline-first capture, database-enforced tenancy, encryption at the edge, and an AI layer that only ever sees de-identified aggregates — is not specific to one institution. It is a template for regulated SaaS in the Indian BFSI market, and one we believe productizes cleanly.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Kinyoubi Atelier &amp; Co. builds compliance-first software for regulated industries. If you&apos;re a partner or investor interested in how we turn regulated pilots into repeatable product patterns, we&apos;d be glad to share more under NDA.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer disclosure */}
      <section className="py-10 px-6 md:px-12 border-t border-text-primary/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-text-tertiary leading-relaxed">
            © Kinyoubi Atelier &amp; Co. · All client-identifying details have been redacted in accordance with applicable confidentiality obligations and regulatory norms. Code samples are illustrative abstractions, not production artifacts.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Building something in a regulated sector?
            </h2>
            <p className="text-text-on-dark/70 mb-8 text-lg">
              If you need software that has to hold up to a risk and compliance review on day one, we&apos;d like to hear about it.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
