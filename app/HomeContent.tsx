'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  Code2,
  Lightbulb,
  FileSearch,
  Layers,
  Zap,
  Shield,
  GitBranch,
  CheckCircle2,
  ArrowDown,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { BrandLockup } from '@/components/ui/BrandLockup'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Testimonials } from '@/components/ui/Testimonials'
import { TechStack } from '@/components/ui/TechStack'
import { SITE } from '@/lib/constants'

/* ─── Data ─── */

const services = [
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Next.js for server-rendered React with automatic code-splitting. TypeScript for compile-time safety across the stack. PostgreSQL for relational integrity where your data demands it. We ship to Vercel and AWS with CI/CD baked in — not bolted on.',
    href: '/services#software-development',
  },
  {
    icon: Lightbulb,
    title: 'Technical Consulting',
    description: 'Node.js event loops vs. Python concurrency models. Monolith-first or microservices from day one. PostgreSQL vs. a document store for your access patterns. We help teams make architecture decisions grounded in how the technology actually behaves under load.',
    href: '/services#technical-consulting',
  },
  {
    icon: FileSearch,
    title: 'Regulatory & Contract Research',
    description: 'Structured research methodology — identify applicable frameworks, organize findings by jurisdiction and severity, and deliver actionable briefs. We parse regulatory language and contract clauses into summaries your team can act on. Alongside legal counsel, never in place of them.',
    href: '/services#regulatory-research',
  },
]


const processSteps = [
  {
    number: '01',
    title: 'Understand',
    description: 'We listen. Deep-dive into your constraints, goals, and existing systems before writing a line of code.',
  },
  {
    number: '02',
    title: 'Architect',
    description: 'System design, technology selection, and an implementation roadmap. No surprises down the line.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Parallel workstreams, continuous integration, weekly demos. You see progress every week.',
  },
  {
    number: '04',
    title: 'Ship',
    description: 'Production deployment, monitoring, documentation, and handoff. The system runs without us.',
  },
]

const stats = [
  { value: '7+', label: 'Years in quantitative analysis' },
  { value: '4', label: 'Disciplines integrated' },
  { value: '48h', label: 'Average response time' },
  { value: '95+', label: 'Lighthouse performance target' },
]

const capabilities = [
  {
    icon: Layers,
    title: 'Multi-Agent Orchestration',
    description: 'We build AI systems where orchestrators decompose problems and workers execute in parallel.',
  },
  {
    icon: GitBranch,
    title: 'Systematized Pipelines',
    description: 'Every build follows a structured pipeline — from requirements to deployment, nothing is ad hoc.',
  },
  {
    icon: Shield,
    title: 'Regulatory Research',
    description: 'Tiered research methodology that scales from landscape scans to full compliance mapping.',
  },
  {
    icon: Zap,
    title: 'Accelerated Timelines',
    description: 'Our systematized approach means faster delivery without cutting corners on quality.',
  },
]

/* ─── Inline SVG Components ─── */

function HeroPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

function OrchestratorDiagram() {
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <svg viewBox="0 0 420 190" className="w-full min-w-[320px] max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Orchestrator node */}
        <rect x="140" y="8" width="140" height="46" rx="23" fill="#142850" />
        <text x="210" y="37" textAnchor="middle" fill="#F8F7F4" fontSize="14" fontFamily="system-ui" fontWeight="500">Orchestrator</text>

        {/* Connection lines */}
        <line x1="175" y1="54" x2="70" y2="96" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="210" y1="54" x2="210" y2="96" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="245" y1="54" x2="350" y2="96" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Worker nodes */}
        <rect x="10" y="96" width="120" height="42" rx="21" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
        <text x="70" y="122" textAnchor="middle" fill="#1A1A1A" fontSize="13" fontFamily="system-ui">Worker A</text>

        <rect x="150" y="96" width="120" height="42" rx="21" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
        <text x="210" y="122" textAnchor="middle" fill="#1A1A1A" fontSize="13" fontFamily="system-ui">Worker B</text>

        <rect x="290" y="96" width="120" height="42" rx="21" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
        <text x="350" y="122" textAnchor="middle" fill="#1A1A1A" fontSize="13" fontFamily="system-ui">Worker C</text>

        {/* Synthesis lines */}
        <line x1="70" y1="138" x2="170" y2="160" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="210" y1="138" x2="210" y2="160" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="350" y1="138" x2="250" y2="160" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Synthesis node */}
        <rect x="150" y="156" width="120" height="32" rx="16" fill="#142850" />
        <text x="210" y="177" textAnchor="middle" fill="#D4AF61" fontSize="13" fontFamily="system-ui" fontWeight="500">Synthesis</text>
      </svg>
    </div>
  )
}

function PipelineDiagram() {
  const steps = ['Requirements', 'Architecture', 'Build', 'Test', 'Deploy']
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4">
      <svg viewBox="0 0 520 80" className="w-full min-w-[340px] max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {steps.map((step, i) => (
          <g key={step}>
            <rect x={i * 104} y="20" width="92" height="42" rx="21" fill={i === 4 ? '#142850' : '#F0EEEA'} stroke="#a08535" strokeWidth="1.5" />
            <text x={i * 104 + 46} y="46" textAnchor="middle" fill={i === 4 ? '#F8F7F4' : '#1A1A1A'} fontSize="12" fontFamily="system-ui" fontWeight="500">{step}</text>
            {i < steps.length - 1 && (
              <line x1={i * 104 + 94} y1="41" x2={i * 104 + 102} y2="41" stroke="#a08535" strokeWidth="1.5" />
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ─── Page Component ─── */

export default function HomeContent() {
  const scrollRef = useRef(null)

  return (
    <>
      {/* ──────────────────────────────────────────────
          SECTION 1: Hero
      ────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] w-full flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
        <HeroPattern />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Design mark + word mark */}
            <div className="mb-10">
              <BrandLockup variant="hero" size="xl" />
            </div>

            {/* Headline */}
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 text-balance leading-tight">
              We build software that ships.
              <br />
              <span className="text-gold">Complexity, handled.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              A software development studio that moves fast on hard problems — from backend architecture to regulatory compliance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start a conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                What we build
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-text-tertiary select-none">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4 text-gold/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 2: Tech Stack
      ────────────────────────────────────────────── */}
      <TechStack />

      {/* ──────────────────────────────────────────────
          SECTION 3: Services
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-80px' }}
            className="mb-14"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">What we do</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight max-w-xl">
              Three ways we help teams ship faster
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <a href={service.href} className="block h-full">
                  <Card hoverable className="h-full group cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center mb-5">
                      <service.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 4: Process — "How We Work"
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Process</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark tracking-tight max-w-lg">
              How every engagement works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector line (desktop only) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%_-_8px)] w-[calc(100%_-_40px)] h-px bg-gold/20" />
                )}
                <div className="text-4xl font-heading text-gold/30 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-text-on-dark mb-2">{step.title}</h3>
                <p className="text-sm text-text-on-dark/60 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Pipeline diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-text-on-dark/10"
          >
            <PipelineDiagram />
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 5: Capabilities Visual Grid
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Capabilities</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight max-w-lg">
              What sets us apart
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="p-6 md:p-8 rounded-card border border-text-primary/5 hover:border-gold/20 transition-colors h-full">
                  <cap.icon className="h-6 w-6 text-gold mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{cap.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Orchestrator diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-background-alt rounded-card p-8 md:p-12"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-6 text-center">Multi-Agent Architecture</p>
            <OrchestratorDiagram />
            <p className="text-xs text-text-tertiary text-center mt-6">
              Proprietary framework. © 2026 Kinyoubi Atelier & Co.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 6: Stats / Numbers
      ────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-background-alt border-y border-text-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 7: Credibility / Founder Signal
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Founder photo */}
            <div className="relative mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/founder-ankit.jpg"
                alt={SITE.founder}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-center grayscale shadow-soft"
              />
              <div className="absolute -inset-0.5 rounded-full border border-gold/20 pointer-events-none" />
            </div>

            <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-text-primary leading-relaxed tracking-tight">
              Backgrounds in aerospace engineering, quantitative analysis, and systems architecture.
              We bring structure to complexity.
            </p>
            <p className="text-text-secondary mt-6">
              — {SITE.founder}, Founder
            </p>
          </motion.div>
          <BrushStrokeDivider variant={1} className="mt-14" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 8: What You Get (Checklist)
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Every engagement</p>
              <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight mb-4">
                What you get
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                We don't just write code and disappear. Every engagement includes the structure, documentation, and thinking that makes your investment last.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                'Production-ready, tested code',
                'Architecture documentation',
                'Deployment & CI/CD setup',
                'Knowledge transfer & handoff',
                'Post-launch support window',
                'Weekly progress demos',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-text-primary">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 9: Portfolio / Built with Care
      ────────────────────────────────────────────── */}
      <section id="built-with-care" className="scroll-mt-24 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Built with care</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight">
              The proof is in the work
            </h2>
            <p className="text-text-secondary mt-4 max-w-xl">
              A small, growing portfolio — from live client sites to the one you're reading now.
            </p>
          </motion.div>

          {/*
            ── Featured project: Roobaroo ──
            Temporary minimal card. Previous copy on this block described
            Roobaroo as a "multi-tenant school management system" with
            fabricated portal roles, institutions and AWS Amplify tags.
            That was wrong — Roobaroo is a restaurant website. Until the
            real case study copy is written with the founder, we render a
            restrained stub that only states verifiable facts: it's a
            live client project and here is the link.
          */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <a
              href="https://roobaroo.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt transition-colors duration-300 p-8 md:p-12">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-bright font-heading text-sm font-semibold">R</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-tertiary uppercase tracking-widest mb-0.5">Client project</p>
                    <h3 className="text-xl font-semibold text-text-primary">Roobaroo</h3>
                  </div>
                  <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5 flex-shrink-0">
                    View live site
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </motion.div>

          {/*
            ── Featured project: Archive automation ──
            Python pipeline for an LPG distributorship — reconciled ~4,000
            scanned KYC records against an Excel master, normalised 116
            fuzzy-duplicate locality names, and published the result to
            Google Drive with clickable hyperlinks back into the sheet.
            Client name omitted under DPDPA 2023 confidentiality; all
            metrics and stack details come from Ankit's own write-up.
          */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <a href="/work/archive-automation" className="group block">
              <div className="rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt transition-colors duration-300 p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-bright font-heading text-sm font-semibold">A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-tertiary uppercase tracking-widest mb-0.5">Client project · Operations automation</p>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Rebuilding a 4,000-record consumer archive</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      A Python pipeline for an LPG distributorship: reconcile a decade of scanned KYC records against a fragmented spreadsheet, normalise fuzzy-duplicate locality names, and hand back an archive staff could actually navigate.
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5 flex-shrink-0">
                    Read case study
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>

                {/* Metric strip — all numbers from Ankit's verified write-up */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-text-primary/5">
                  {[
                    { num: '3,905', label: 'Records reconciled' },
                    { num: '796', label: 'Folders generated' },
                    { num: '116', label: 'Fuzzy duplicates merged' },
                    { num: '~14 hrs', label: 'Manual work replaced' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="font-heading text-2xl text-gold mb-1 tracking-tight">{m.num}</div>
                      <div className="text-[11px] text-text-tertiary uppercase tracking-widest leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </motion.div>

          {/*
            BFSI MIS case study — regulated financial institution engagement.
            All specific client identifiers are redacted under confidentiality
            obligations. Content is load-bearing on Ankit's signed founder
            attestation on the case study page itself.
          */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <a href="/work/bfsi-mis" className="group block">
              <div className="rounded-card border border-text-primary/5 hover:border-gold/25 bg-background-alt transition-colors duration-300 p-8 md:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-bright font-heading text-sm font-semibold">M</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-tertiary uppercase tracking-widest mb-0.5">Client project · BFSI · Regulated SaaS</p>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Compliance-first MIS platform for a regulated financial institution</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      A multi-site Management Information System engineered from day one for RBI alignment and DPDP Act readiness — secure data foundation, offline-first capture, and an AI-assisted insight layer, all hosted in-region.
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gold group-hover:underline inline-flex items-center gap-1.5 flex-shrink-0">
                    Read case study
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>

                {/* Stack chips in place of metrics — this phase is foundation work, no KPIs published */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-text-primary/5">
                  {[
                    'Flutter',
                    'AWS ap-south-1 · Mumbai',
                    'PostgreSQL (FLE + RLS)',
                    'Amazon Bedrock',
                    'Cognito + MFA',
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="text-[11px] uppercase tracking-widest text-text-secondary bg-background border border-text-primary/10 rounded-full px-3 py-1.5"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </motion.div>

          {/* ── This site's performance cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { metric: '95+', label: 'Lighthouse score', detail: 'Performance, accessibility, SEO' },
              { metric: '<2.5s', label: 'Largest contentful paint', detail: 'Optimised fonts, lazy loading' },
              { metric: '0', label: 'Layout shift', detail: 'Stable, predictable rendering' },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card bordered className="text-center h-full">
                  <div className="text-3xl md:text-4xl font-heading text-gold mb-2">{card.metric}</div>
                  <div className="text-sm font-semibold text-text-primary mb-1">{card.label}</div>
                  <div className="text-xs text-text-tertiary">{card.detail}</div>
                  <div className="text-[10px] text-text-tertiary/60 mt-2 uppercase tracking-widest">This site</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 10: Testimonials (hidden until populated)
      ────────────────────────────────────────────── */}
      <Testimonials />

      {/* ──────────────────────────────────────────────
          SECTION 11: Final CTA
      ────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-surface-dark relative overflow-hidden">
        {/* Decorative gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Ready to build something?
            </h2>
            <p className="text-text-on-dark/60 mb-10 text-lg max-w-md mx-auto">
              Tell us about your project. We'll respond within 48 hours with how we'd approach it.
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
