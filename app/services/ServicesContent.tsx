'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code2, Cpu, Lightbulb, FileSearch } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { Card } from '@/components/ui/Card'
import { FAQAccordion, faqStructuredData } from '@/components/ui/FAQAccordion'
import { ProjectEstimator } from '@/components/ui/ProjectEstimator'

/* ─── Mini diagrams for services ─── */

function DevStackVisual() {
  const items = ['Next.js', 'React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'REST', 'GraphQL']
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {items.map((item) => (
        <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-gold/8 text-gold border border-gold/15 font-medium">
          {item}
        </span>
      ))}
    </div>
  )
}

function ArchitectureVisual() {
  return (
    <svg viewBox="0 0 400 100" className="w-full max-w-sm mt-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="10" width="80" height="36" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <text x="40" y="33" textAnchor="middle" fill="#1A1A1A" fontSize="10" fontFamily="system-ui">Audit</text>

      <path d="M82 28 L98 28" stroke="#a08535" strokeWidth="1.5" />

      <rect x="100" y="10" width="80" height="36" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <text x="140" y="33" textAnchor="middle" fill="#1A1A1A" fontSize="10" fontFamily="system-ui">Design</text>

      <path d="M182 28 L198 28" stroke="#a08535" strokeWidth="1.5" />

      <rect x="200" y="10" width="80" height="36" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <text x="240" y="33" textAnchor="middle" fill="#1A1A1A" fontSize="10" fontFamily="system-ui">Roadmap</text>

      <path d="M282 28 L298 28" stroke="#a08535" strokeWidth="1.5" />

      <rect x="300" y="10" width="80" height="36" rx="8" fill="#142850" />
      <text x="340" y="33" textAnchor="middle" fill="#D4AF61" fontSize="10" fontFamily="system-ui">Deliver</text>

      <text x="200" y="72" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="system-ui">
        Typical consulting engagement flow
      </text>
    </svg>
  )
}

function AgentWorkflowVisual() {
  return (
    <svg viewBox="0 0 400 140" className="w-full max-w-sm mt-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orchestrator */}
      <rect x="130" y="4" width="140" height="36" rx="18" fill="#142850" />
      <text x="200" y="27" textAnchor="middle" fill="#F8F7F4" fontSize="11" fontFamily="system-ui">Orchestrator</text>

      {/* Lines */}
      <line x1="160" y1="40" x2="80" y2="66" stroke="#a08535" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="200" y1="40" x2="200" y2="66" stroke="#a08535" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="240" y1="40" x2="320" y2="66" stroke="#a08535" strokeWidth="1" strokeDasharray="3 2" />

      {/* Workers */}
      <rect x="30" y="66" width="100" height="32" rx="16" fill="#F0EEEA" stroke="#E5E7EB" strokeWidth="1" />
      <text x="80" y="86" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="system-ui">Agent A</text>

      <rect x="150" y="66" width="100" height="32" rx="16" fill="#F0EEEA" stroke="#E5E7EB" strokeWidth="1" />
      <text x="200" y="86" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="system-ui">Agent B</text>

      <rect x="270" y="66" width="100" height="32" rx="16" fill="#F0EEEA" stroke="#E5E7EB" strokeWidth="1" />
      <text x="320" y="86" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="system-ui">Agent C</text>

      {/* Synthesis */}
      <line x1="80" y1="98" x2="170" y2="118" stroke="#a08535" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="200" y1="98" x2="200" y2="118" stroke="#a08535" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="320" y1="98" x2="230" y2="118" stroke="#a08535" strokeWidth="1" strokeDasharray="3 2" />

      <rect x="140" y="118" width="120" height="28" rx="14" fill="#142850" />
      <text x="200" y="136" textAnchor="middle" fill="#D4AF61" fontSize="10" fontFamily="system-ui">Synthesis</text>
    </svg>
  )
}

function ResearchVisual() {
  const tiers = ['Scan', 'Research', 'Map', 'Brief']
  return (
    <div className="flex items-center gap-3 mt-6 flex-wrap">
      {tiers.map((tier, i) => (
        <div key={tier} className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-full text-xs font-medium ${i === tiers.length - 1 ? 'bg-navy text-gold-bright' : 'bg-background-alt text-text-secondary border border-text-primary/10'}`}>
            {tier}
          </div>
          {i < tiers.length - 1 && (
            <ArrowRight className="h-3 w-3 text-gold" />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Service Data ─── */

interface ServiceData {
  icon: React.ElementType
  label: string
  title: string
  description: string
  deliverables: string[]
  visual: React.ReactNode
  disclaimer?: string
}

const services: ServiceData[] = [
  {
    icon: Code2,
    label: 'Software Development',
    title: 'Production-ready code, modern stacks, fast timelines.',
    description:
      'We build web applications, backend systems, APIs, and automation workflows. Our timelines are fast because we\'ve systematized how we work — not because we cut corners.',
    deliverables: ['Web applications', 'REST & GraphQL APIs', 'Backend services', 'Workflow automation', 'CI/CD pipelines'],
    visual: <DevStackVisual />,
  },
  {
    icon: Lightbulb,
    label: 'Technical Consulting',
    title: 'Senior-level thinking, without the full-time hire.',
    description:
      'For teams that need architecture expertise, technology selection guidance, or hands-on implementation support. We help teams make decisions they won\'t regret in six months.',
    deliverables: ['Architecture decision records', 'System design documents', 'Technical audits', 'Implementation roadmaps'],
    visual: <ArchitectureVisual />,
  },
  {
    icon: Cpu,
    label: 'AI-Powered Workflow Development',
    title: 'Intelligent automation that replaces manual processes.',
    description:
      'We build multi-agent orchestration systems, document processing pipelines, and AI-assisted workflows. An orchestrator decomposes complex problems into parallel tasks — each with verification loops and graceful error recovery.',
    deliverables: ['Multi-agent systems', 'Document processing pipelines', 'AI workflow automation', 'LLM integrations'],
    visual: <AgentWorkflowVisual />,
  },
  {
    icon: FileSearch,
    label: 'Regulatory Research & Contract Analysis',
    title: 'Move fast without stepping on landmines.',
    description:
      'We research regulatory requirements, analyze contracts, and design compliance workflows. Structured methodology — tiered by complexity and severity. We work alongside legal counsel, not in place of them.',
    deliverables: ['Regulatory landscape research', 'Contract analysis reports', 'Compliance workflow design', 'Research memoranda'],
    visual: <ResearchVisual />,
    disclaimer: 'We provide research and analysis to support decision-making. We do not provide legal advice or representation. For legal matters, we recommend working with qualified legal counsel.',
  },
]

/* ─── FAQ Data ─── */

const faqItems = [
  {
    question: 'How quickly can you start on a new project?',
    answer: 'Typically within 1–2 weeks. We keep our pipeline lean specifically so we can onboard fast. After an initial discovery call, we provide a scope document and can begin work as soon as it\'s approved.',
  },
  {
    question: 'Do you work with startups or only established companies?',
    answer: 'Both. We\'ve worked with early-stage founders who need an MVP built fast, and with established teams that need senior-level architecture support. The common thread is a clear problem and a willingness to collaborate.',
  },
  {
    question: 'What does "accelerated timelines" actually mean?',
    answer: 'We\'ve systematized our development workflow so that parallel workstreams, structured reviews, and automated testing happen concurrently rather than sequentially. This means faster delivery without cutting corners on quality or documentation.',
  },
  {
    question: 'Can you work with our existing codebase?',
    answer: 'Absolutely. Many of our engagements start with a codebase audit. We assess the current architecture, identify bottlenecks or technical debt, and either refactor in place or build new modules that integrate cleanly.',
  },
  {
    question: 'What happens after the project is delivered?',
    answer: 'Every engagement includes documentation, knowledge transfer, and a post-launch support window. We don\'t build systems that depend on us to run — the goal is always a clean handoff.',
  },
  {
    question: 'Do you provide legal advice?',
    answer: 'No. Our regulatory research and contract analysis services support decision-making, but we do not provide legal advice or representation. We recommend working with qualified legal counsel for legal matters.',
  },
]

/* ─── Page ─── */

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Services</p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 tracking-tight">
              What we build
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Software, systems, and research — each delivered with engineering precision and the speed your timeline demands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, index) => {
        const Icon = service.icon
        const isAlt = index % 2 === 0
        return (
          <section
            key={service.label}
            className={`py-20 md:py-28 px-6 md:px-12 ${isAlt ? 'bg-background-alt' : ''}`}
          >
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16">
                  {/* Content (3/5) */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                      </div>
                      <p className="text-sm font-medium text-gold uppercase tracking-widest">
                        {service.label}
                      </p>
                    </div>

                    <h2 className="font-heading text-display-sm text-text-primary mb-5 tracking-tight leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-lg text-text-secondary leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-3 py-1.5 rounded-lg bg-surface-card text-text-secondary border border-text-primary/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {service.disclaimer && (
                      <p className="text-sm text-text-tertiary border-l-2 border-gold/30 pl-4 mt-8 max-w-xl">
                        {service.disclaimer}
                      </p>
                    )}
                  </div>

                  {/* Visual (2/5) */}
                  <div className="md:col-span-2 flex items-start justify-center">
                    <Card bordered className="w-full p-6">
                      <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">{service.label}</p>
                      {service.visual}
                    </Card>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* Brush stroke */}
      <div className="py-8">
        <BrushStrokeDivider variant={1} />
      </div>

      {/* ──────────────────────────────────────────────
          Project Estimator + FAQ
      ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-background-alt">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Estimator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ProjectEstimator />
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-1">FAQ</p>
              <h3 className="font-heading text-xl text-text-primary tracking-tight mb-6">
                Common questions
              </h3>
              <FAQAccordion items={faqItems} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData(faqItems)) }}
      />

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-display-sm md:text-display text-text-on-dark mb-4 tracking-tight">
              Every engagement begins with a conversation.
            </h2>
            <p className="text-text-on-dark/60 mb-10 text-lg">
              Tell us about your project and we'll outline an approach.
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
