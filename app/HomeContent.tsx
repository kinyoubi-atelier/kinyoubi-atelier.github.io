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
import { SITE } from '@/lib/constants'

/* ─── Data ─── */

const services = [
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Web applications, backend systems, and APIs — built with modern stacks, shipped production-ready.',
    href: '/services',
  },
  {
    icon: Lightbulb,
    title: 'Technical Consulting',
    description: 'Architecture reviews, system design, and hands-on support for teams that need senior thinking.',
    href: '/services',
  },
  {
    icon: FileSearch,
    title: 'Regulatory & Contract Research',
    description: 'Compliance navigation, contract analysis, and research workflows — move fast, step carefully.',
    href: '/services',
  },
]

const techStack = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Python',
  'Tailwind CSS', 'PostgreSQL', 'Vercel', 'AWS',
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
    <svg viewBox="0 0 480 200" className="w-full max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orchestrator node */}
      <rect x="170" y="10" width="140" height="44" rx="22" fill="#142850" />
      <text x="240" y="37" textAnchor="middle" fill="#F8F7F4" fontSize="13" fontFamily="system-ui">Orchestrator</text>

      {/* Connection lines */}
      <line x1="200" y1="54" x2="80" y2="100" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="240" y1="54" x2="240" y2="100" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="280" y1="54" x2="400" y2="100" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Worker nodes */}
      <rect x="20" y="100" width="120" height="40" rx="20" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
      <text x="80" y="125" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontFamily="system-ui">Worker A</text>

      <rect x="180" y="100" width="120" height="40" rx="20" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
      <text x="240" y="125" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontFamily="system-ui">Worker B</text>

      <rect x="340" y="100" width="120" height="40" rx="20" fill="#F0EEEA" stroke="#a08535" strokeWidth="1.5" />
      <text x="400" y="125" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontFamily="system-ui">Worker C</text>

      {/* Synthesis lines */}
      <line x1="80" y1="140" x2="200" y2="170" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="240" y1="140" x2="240" y2="170" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="400" y1="140" x2="280" y2="170" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Synthesis node */}
      <rect x="180" y="165" width="120" height="32" rx="16" fill="#142850" />
      <text x="240" y="186" textAnchor="middle" fill="#D4AF61" fontSize="12" fontFamily="system-ui">Synthesis</text>
    </svg>
  )
}

function PipelineDiagram() {
  const steps = ['Requirements', 'Architecture', 'Build', 'Test', 'Deploy']
  return (
    <svg viewBox="0 0 520 80" className="w-full max-w-xl mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {steps.map((step, i) => (
        <g key={step}>
          <rect x={i * 104} y="20" width="90" height="40" rx="20" fill={i === 4 ? '#142850' : '#F0EEEA'} stroke="#a08535" strokeWidth="1.5" />
          <text x={i * 104 + 45} y="45" textAnchor="middle" fill={i === 4 ? '#F8F7F4' : '#1A1A1A'} fontSize="11" fontFamily="system-ui">{step}</text>
          {i < steps.length - 1 && (
            <line x1={i * 104 + 92} y1="40" x2={i * 104 + 102} y2="40" stroke="#a08535" strokeWidth="1.5" />
          )}
        </g>
      ))}
    </svg>
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10"
        >
          <ArrowDown className="h-5 w-5 text-text-tertiary" />
        </motion.div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 2: Tech Stack Marquee
      ────────────────────────────────────────────── */}
      <section className="py-12 border-y border-text-primary/5 bg-background-alt overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-xs font-medium text-text-tertiary uppercase tracking-widest text-center mb-6">
            Technologies we work with
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {techStack.map((tech) => (
              <span key={tech} className="text-sm md:text-base font-medium text-text-secondary/70 hover:text-gold transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

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
          >
            <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-text-primary leading-relaxed tracking-tight">
              Backgrounds in aerospace engineering, quantitative analysis, and systems architecture.
              We bring structure to complexity.
            </p>
            <p className="text-text-secondary mt-6">
              — The team at Kinyoubi Atelier & Co.
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
          SECTION 9: Future Work / Portfolio Teaser
      ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-3">Built with care</p>
            <h2 className="font-heading text-display-sm md:text-display text-text-primary tracking-tight">
              The proof is in the work
            </h2>
            <p className="text-text-secondary mt-4 max-w-lg mx-auto">
              This website is itself a demonstration of what we build — modern, fast, accessible, and designed to convert.
            </p>
          </motion.div>

          {/* Feature cards showcasing the site itself */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { metric: '95+', label: 'Lighthouse score', detail: 'Performance, accessibility, SEO' },
              { metric: '<2.5s', label: 'Largest contentful paint', detail: 'Optimized fonts, lazy loading' },
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
