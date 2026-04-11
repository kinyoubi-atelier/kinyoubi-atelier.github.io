'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Clock3,
  FileText,
  Server,
  Globe2,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'

/* ─────────────────────────────────────────────────────────────
   Source of truth for this page — every claim here maps to a
   verifiable fact in the repo, not aspiration:

   • Hosting: GitHub Pages (current) → Vercel (phase 2).
     See DEPLOY.md and .github/workflows/deploy.yml.
   • Build type: Next.js static export (output: 'export' in
     next.config.mjs). No runtime backend on this site.
   • Data collection: optional contact form routed through
     Formspree or Web3Forms, plus optional Google Sheets log.
     See .env.local.example for the full sub-processor list.
   • Security headers: defined in vercel.json — applied when
     the site moves to Vercel. On GitHub Pages, headers are
     set by GitHub.
   • Regulated client work (BFSI-MIS case study) uses AWS
     ap-south-1, PostgreSQL with RLS + FLE, Cognito MFA, and
     Bedrock in a private subnet. Those controls are described
     on /work/bfsi-mis, not claimed as controls of THIS site.

   Every control below is scoped explicitly — "this site" vs
   "client engagements" — so buyers can't conflate the two.
   ───────────────────────────────────────────────────────────── */

const thisSite = [
  {
    icon: Server,
    title: 'Static site, no server-side data store',
    body:
      'kinyoubi-atelier.github.io is a Next.js static export. There is no application database, no login system, and no server-side session storage on this domain. The attack surface is HTML, CSS, JavaScript, and static assets delivered by the hosting provider\'s CDN.',
  },
  {
    icon: Lock,
    title: 'Transport encryption',
    body:
      'All traffic is served over HTTPS with TLS terminated at the hosting edge (GitHub Pages today, Vercel when the custom domain ships). HSTS is enforced upstream. We do not serve any content over plain HTTP.',
  },
  {
    icon: ShieldCheck,
    title: 'Security headers',
    body:
      'X-Content-Type-Options: nosniff, X-Frame-Options: DENY, X-XSS-Protection, Referrer-Policy: strict-origin-when-cross-origin, and a Permissions-Policy that disables camera, microphone, and geolocation are declared in vercel.json and applied when the site is served from Vercel.',
  },
  {
    icon: Globe2,
    title: 'Contact form — sub-processors',
    body:
      'The optional contact form is routed through Formspree or Web3Forms (configurable), with a parallel write to a Google Sheets log if enabled. These are the only third parties that receive form submissions. Form fields collected are limited to name, email, project type, and message body. No payment data, no credentials, no PII beyond what a user voluntarily types into an inquiry.',
  },
]

const clientEngagements = [
  {
    icon: Lock,
    title: 'Encryption at rest, client-side field-level where it matters',
    body:
      'For client builds that store customer data — like the regulated BFSI MIS platform on /work/bfsi-mis — we use client-side field-level encryption on sensitive free-text fields before they reach the database. The PostgreSQL instance itself is encrypted at rest via the managed database provider (AWS RDS KMS by default). Keys rotate on a schedule we document in the engagement.',
  },
  {
    icon: ShieldCheck,
    title: 'Tenant isolation via row-level security',
    body:
      'Multi-tenant client builds use PostgreSQL row-level security with scoped roles, so tenancy boundaries survive application bugs. We write a negative-path test suite that exercises every role × scope combination before the system goes live.',
  },
  {
    icon: Globe2,
    title: 'Data residency — pinned to the client\'s jurisdiction',
    body:
      'For India-regulated engagements, primary storage, compute, and model inference are pinned to the AWS Mumbai region (ap-south-1) with no cross-border data movement. For clients in other jurisdictions, we pin to whichever region meets their regulatory constraints (EU for GDPR data controllers, US for HIPAA-in-scope workloads, etc.).',
  },
  {
    icon: Server,
    title: 'Least-privilege identity',
    body:
      'Scoped IAM roles on every service; no wildcards on data-plane resources. Human access to production runs through MFA-enforced identity providers (Cognito, Workload Identity, or the client\'s existing IdP). Access grants are time-limited and auditable.',
  },
]

const compliance = [
  {
    framework: 'GDPR',
    posture:
      'We operate as a data processor when handling customer data inside client systems, and as a data controller for inquiries made to us directly. We will sign a Data Processing Agreement on request before any personal data is shared. Data subject requests routed through us are honored within 30 days of receipt.',
  },
  {
    framework: 'DPDP Act, 2023 (India)',
    posture:
      'Client engagements that fall under DPDP are designed to the Act from day one — not retrofitted. This includes purpose limitation, role-based consent handling, client-side field-level encryption on sensitive free-text, and audit trails for read and write access. The case study on /work/bfsi-mis describes the exact controls for one such build.',
  },
  {
    framework: 'Contractual — MSAs, DPAs, SCCs',
    posture:
      'A DPA is available on request and can be executed before any production data is exchanged. For transfers of EU personal data out of the EEA, we rely on the current Standard Contractual Clauses. We are happy to review a client\'s preferred DPA template as an alternative to ours.',
  },
]

const incidentResponse = {
  window: '72 hours',
  detail:
    'If a confirmed security incident affects data we process on behalf of a client, we notify the client in writing within 72 hours of confirmation. The notification includes the nature of the incident, the categories and approximate volume of data affected, the likely consequences, and the measures taken or proposed to address it. This aligns with GDPR Article 33 and is the baseline we commit to in our standard DPA.',
}

const dataWePublish = [
  'Last PageSpeed Insights run date and the unedited screenshot (below)',
  'Test URL, device strategy, and Lighthouse version',
  'Core Web Vitals: LCP, INP, CLS as reported by PSI — not targets, not goals',
]

export default function SecurityContent() {
  const [imgError, setImgError] = useState(false)
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 md:pt-36 pb-12 md:pb-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-gold transition-colors mb-10"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to home
            </Link>

            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-5">
              Security &amp; data protection
            </p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary tracking-tight mb-6 leading-[1.1]">
              What we protect, how we protect it, and what you can hold us to.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Written for buyers who Ctrl-F for &ldquo;GDPR&rdquo;, &ldquo;DPDP&rdquo;, &ldquo;encryption&rdquo;, and
              &ldquo;DPA&rdquo; before they take a sales call. Every control below is scoped explicitly &mdash;
              this marketing site versus a client engagement &mdash; so nothing conflates the two.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scope distinction callout */}
      <section className="pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-card border border-gold/20 bg-gold/[0.04] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-text-primary mb-2">
                  Two distinct scopes on this page
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  &ldquo;This site&rdquo; refers to <span className="font-mono text-xs">kinyoubi-atelier.github.io</span>
                  &nbsp;&mdash; the marketing surface you&rsquo;re reading now. It stores no customer data. &ldquo;Client
                  engagements&rdquo; refers to the systems we build <em>for</em> clients, which have their own
                  security posture documented per-project in the engagement&rsquo;s own security memo. Do not
                  assume controls from one scope apply to the other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* This site */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium text-gold uppercase tracking-widest mb-3">Scope 1</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              This marketing site
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              A Next.js static export, hosted on GitHub Pages today and routing to Vercel once the custom
              domain ships. No backend, no database, no login, no customer data at rest on our
              infrastructure. The only third parties that receive any inbound data are the sub-processors
              on the optional contact form.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thisSite.map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-text-primary/5 bg-background p-6"
              >
                <item.icon className="h-5 w-5 text-gold mb-3" strokeWidth={1.5} />
                <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client engagements */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium text-gold uppercase tracking-widest mb-3">Scope 2</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Client engagements
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              Default controls we apply to every build that handles customer data. Specific engagements
              get a signed security memo that either adopts these defaults or documents where and why
              they differ. The BFSI MIS build on <Link href="/work/bfsi-mis" className="text-gold hover:underline">/work/bfsi-mis</Link>{' '}
              is a worked example.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientEngagements.map((item) => (
              <div
                key={item.title}
                className="rounded-card border border-text-primary/5 bg-background p-6"
              >
                <item.icon className="h-5 w-5 text-gold mb-3" strokeWidth={1.5} />
                <h3 className="text-base font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance posture */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium text-gold uppercase tracking-widest mb-3">Compliance posture</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Frameworks &amp; contracts
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              We are not SOC 2 Type II audited today. We tell you that up front because the question will
              be asked. What we do commit to is below.
            </p>
          </motion.div>

          <div className="space-y-5">
            {compliance.map((c) => (
              <div
                key={c.framework}
                className="rounded-card border border-text-primary/5 bg-background p-6"
              >
                <div className="flex items-start gap-4">
                  <FileText className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-base font-semibold text-text-primary mb-2">{c.framework}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{c.posture}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident response */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium text-gold uppercase tracking-widest mb-3">Incident response</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Notification within {incidentResponse.window}
            </h2>
            <div className="rounded-card border border-text-primary/5 bg-background-alt p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Clock3 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-text-secondary leading-relaxed">{incidentResponse.detail}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DPA on request */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-card border border-text-primary/5 bg-background p-8 md:p-10"
          >
            <p className="text-xs font-medium text-gold uppercase tracking-widest mb-3">DPA on request</p>
            <h2 className="font-heading text-2xl md:text-3xl text-text-primary tracking-tight mb-4">
              Ready to sign before any data moves
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              A Data Processing Agreement is available on request and can be executed before production
              data is shared with us. We&rsquo;re equally happy to review a client&rsquo;s preferred DPA template.
              Email us and we&rsquo;ll send the current version.
            </p>
            <a
              href="mailto:kinyoubi.atelier@outlook.com?subject=DPA%20request"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-bright transition-colors"
            >
              Request a DPA
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Performance — measured */}
      <section id="performance" className="scroll-mt-24 py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium text-gold uppercase tracking-widest mb-3">
              Performance &mdash; measured, not projected
            </p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-6">
              Core Web Vitals, with the screenshot
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              A performance firm publishing performance claims should publish the evidence. Below is the
              most recent unedited PageSpeed Insights run for this site. No cherry-picked metrics, no
              averaged-across-pages synthesis &mdash; the raw screenshot, the date, and the test URL.
            </p>

            <div className="rounded-card border border-text-primary/5 bg-background-alt p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-sm">
                <div>
                  <div className="text-text-tertiary uppercase tracking-widest text-[11px] mb-1">URL tested</div>
                  <div className="text-text-primary font-mono text-xs break-all">https://kinyoubi-atelier.github.io/</div>
                </div>
                <div>
                  <div className="text-text-tertiary uppercase tracking-widest text-[11px] mb-1">Device strategy</div>
                  <div className="text-text-primary">Mobile (default)</div>
                </div>
                <div>
                  <div className="text-text-tertiary uppercase tracking-widest text-[11px] mb-1">Last measured</div>
                  <div className="text-text-primary" id="psi-date">12 April 2026</div>
                </div>
              </div>

              {/* Drop-in slot. The image at /perf/psi-mobile.png is the
                  uncropped PageSpeed Insights screenshot. /public/perf/README.md
                  contains the exact capture procedure. Until the file is
                  dropped in, this block renders a bordered placeholder with
                  explicit "pending" copy — so a buyer lands on honesty, not
                  a broken image. */}
              {!imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/perf/psi-mobile.png"
                  alt="PageSpeed Insights — mobile run for kinyoubi-atelier.github.io"
                  className="w-full rounded border border-text-primary/10"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="rounded border border-dashed border-text-primary/15 bg-background p-8 text-center">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <span className="font-semibold text-text-primary">Screenshot pending publication.</span>{' '}
                    We won&rsquo;t render a number we haven&rsquo;t measured. The unedited PageSpeed
                    Insights screenshot will appear here, dated, the moment it&rsquo;s saved to{' '}
                    <span className="font-mono text-xs">/public/perf/psi-mobile.png</span>.
                  </p>
                </div>
              )}

              <p className="text-[11px] text-text-tertiary mt-4 leading-relaxed">
                We publish what we can measure. When the custom domain ships and the production URL
                changes, this section is re-captured against the new URL and re-dated.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-text-primary mb-3">What this block publishes</p>
              <ul className="space-y-2">
                {dataWePublish.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-background-alt">
        <div className="max-w-3xl mx-auto">
          <BrushStrokeDivider variant={1} className="mb-10 opacity-30" />
          <p className="text-sm text-text-tertiary leading-relaxed">
            Questions not answered here &mdash; questionnaires, audit attestations, a pre-existing vendor
            template you need us to fill &mdash; email{' '}
            <a
              href="mailto:kinyoubi.atelier@outlook.com?subject=Security%20question"
              className="text-gold hover:underline"
            >
              kinyoubi.atelier@outlook.com
            </a>
            . We respond within 48 business hours.
          </p>
        </div>
      </section>
    </main>
  )
}
