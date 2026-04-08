'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BrushStrokeDivider } from '@/components/ui/BrushStrokeDivider'
import { IPNotice } from '@/components/ui/IPNotice'

/* ─── SVG Diagrams ─── */

function OrchestratorDiagram() {
  return (
    <svg viewBox="0 0 560 260" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Planning phase */}
      <rect x="210" y="8" width="140" height="44" rx="22" fill="#142850" />
      <text x="280" y="35" textAnchor="middle" fill="#F8F7F4" fontSize="13" fontFamily="system-ui" fontWeight="500">Orchestrator</text>
      <text x="280" y="65" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="system-ui">Planning & Decomposition</text>

      {/* Arrows down */}
      <path d="M200 72 L100 108" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrowGold)" />
      <path d="M280 72 L280 108" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M360 72 L460 108" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Workers */}
      <rect x="30" y="108" width="140" height="48" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <text x="100" y="128" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontFamily="system-ui" fontWeight="500">Worker A</text>
      <text x="100" y="144" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Isolated context</text>

      <rect x="210" y="108" width="140" height="48" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <text x="280" y="128" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontFamily="system-ui" fontWeight="500">Worker B</text>
      <text x="280" y="144" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Parallel execution</text>

      <rect x="390" y="108" width="140" height="48" rx="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <text x="460" y="128" textAnchor="middle" fill="#1A1A1A" fontSize="12" fontFamily="system-ui" fontWeight="500">Worker C</text>
      <text x="460" y="144" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">Verification loops</text>

      {/* Arrows to synthesis */}
      <path d="M100 156 L220 196" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M280 156 L280 196" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M460 156 L340 196" stroke="#a08535" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Synthesis */}
      <rect x="190" y="196" width="180" height="44" rx="22" fill="#142850" />
      <text x="280" y="216" textAnchor="middle" fill="#D4AF61" fontSize="12" fontFamily="system-ui" fontWeight="500">Synthesis & Delivery</text>
      <text x="280" y="253" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="system-ui">Graceful error recovery built in</text>

      <defs>
        <marker id="arrowGold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#a08535" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  )
}

function BuildPipelineDiagram() {
  const steps = [
    { label: 'Requirements', sub: 'Constraints & goals' },
    { label: 'Architecture', sub: 'System design' },
    { label: 'Implementation', sub: 'Parallel workstreams' },
    { label: 'Testing', sub: 'Automated + manual' },
    { label: 'Deployment', sub: 'Staged rollout' },
  ]
  return (
    <svg viewBox="0 0 600 120" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {steps.map((step, i) => {
        const x = i * 120
        const isLast = i === steps.length - 1
        return (
          <g key={step.label}>
            <rect x={x} y="20" width="108" height="56" rx="12"
              fill={isLast ? '#142850' : '#FFFFFF'}
              stroke={isLast ? '#142850' : '#E5E7EB'}
              strokeWidth="1.5"
            />
            <text x={x + 54} y="44" textAnchor="middle"
              fill={isLast ? '#F8F7F4' : '#1A1A1A'}
              fontSize="11" fontFamily="system-ui" fontWeight="500"
            >{step.label}</text>
            <text x={x + 54} y="60" textAnchor="middle"
              fill={isLast ? '#D4AF61' : '#9CA3AF'}
              fontSize="9" fontFamily="system-ui"
            >{step.sub}</text>
            {!isLast && (
              <path d={`M${x + 110} 48 L${x + 118} 48`} stroke="#a08535" strokeWidth="1.5" />
            )}
          </g>
        )
      })}
      {/* Progress line underneath */}
      <rect x="0" y="96" width="600" height="4" rx="2" fill="#F0EEEA" />
      <rect x="0" y="96" width="600" height="4" rx="2" fill="url(#progressGrad)" />
      <defs>
        <linearGradient id="progressGrad" x1="0" y1="0" x2="600" y2="0">
          <stop offset="0%" stopColor="#a08535" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#a08535" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ResearchDiagram() {
  const tiers = [
    { label: 'Tier 1', title: 'Landscape Scan', desc: 'What exists, what applies', color: '#F0EEEA' },
    { label: 'Tier 2', title: 'Deep Research', desc: 'Statute & contract analysis', color: '#F0EEEA' },
    { label: 'Tier 3', title: 'Compliance Map', desc: 'Requirements & gaps', color: '#F0EEEA' },
    { label: 'Tier 4', title: 'Counsel Brief', desc: 'Structured deliverable', color: '#142850' },
  ]
  return (
    <svg viewBox="0 0 560 180" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {tiers.map((tier, i) => {
        const x = i * 140
        const isLast = i === tiers.length - 1
        return (
          <g key={tier.label}>
            {/* Tier badge */}
            <rect x={x + 30} y="8" width="68" height="24" rx="12" fill={isLast ? '#142850' : '#a08535'} opacity={isLast ? 1 : 0.15} />
            <text x={x + 64} y="24" textAnchor="middle" fill={isLast ? '#D4AF61' : '#a08535'} fontSize="10" fontFamily="system-ui" fontWeight="600">{tier.label}</text>

            {/* Main card */}
            <rect x={x + 4} y="44" width="120" height="72" rx="12"
              fill={isLast ? '#142850' : '#FFFFFF'}
              stroke={isLast ? '#142850' : '#E5E7EB'}
              strokeWidth="1.5"
            />
            <text x={x + 64} y="72" textAnchor="middle"
              fill={isLast ? '#F8F7F4' : '#1A1A1A'}
              fontSize="12" fontFamily="system-ui" fontWeight="500"
            >{tier.title}</text>
            <text x={x + 64} y="92" textAnchor="middle"
              fill={isLast ? '#D4AF61' : '#9CA3AF'}
              fontSize="10" fontFamily="system-ui"
            >{tier.desc}</text>

            {/* Arrow */}
            {i < tiers.length - 1 && (
              <path d={`M${x + 126} 80 L${x + 142} 80`} stroke="#a08535" strokeWidth="1.5" markerEnd="url(#arrowGold2)" />
            )}
          </g>
        )
      })}
      {/* Bottom annotation */}
      <text x="280" y="150" textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
        Each tier is documented, cited, and calibrated to complexity
      </text>

      <defs>
        <marker id="arrowGold2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#a08535" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  )
}

function BarbellDiagram() {
  return (
    <svg viewBox="0 0 480 140" className="w-full max-w-md mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Conservative core */}
      <circle cx="120" cy="60" r="52" fill="#142850" opacity="0.08" />
      <circle cx="120" cy="60" r="40" fill="#142850" opacity="0.12" />
      <text x="120" y="55" textAnchor="middle" fill="#142850" fontSize="11" fontFamily="system-ui" fontWeight="600">Conservative</text>
      <text x="120" y="70" textAnchor="middle" fill="#142850" fontSize="11" fontFamily="system-ui" fontWeight="600">Core</text>
      <text x="120" y="92" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="system-ui">Predictable outcomes</text>

      {/* Connection bar */}
      <rect x="170" y="56" width="140" height="8" rx="4" fill="#F0EEEA" />
      <rect x="170" y="56" width="140" height="8" rx="4" fill="url(#barbellGrad)" />
      <text x="240" y="50" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="system-ui">Hard boundary</text>

      {/* Active position */}
      <circle cx="360" cy="60" r="52" fill="#a08535" opacity="0.08" />
      <circle cx="360" cy="60" r="40" fill="#a08535" opacity="0.12" />
      <text x="360" y="55" textAnchor="middle" fill="#a08535" fontSize="11" fontFamily="system-ui" fontWeight="600">Active</text>
      <text x="360" y="70" textAnchor="middle" fill="#a08535" fontSize="11" fontFamily="system-ui" fontWeight="600">Position</text>
      <text x="360" y="92" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="system-ui">Calculated variance</text>

      <text x="240" y="132" textAnchor="middle" fill="#6B7280" fontSize="10" fontFamily="system-ui">The two never mix.</text>

      <defs>
        <linearGradient id="barbellGrad" x1="170" y1="0" x2="310" y2="0">
          <stop offset="0%" stopColor="#142850" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#9CA3AF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#a08535" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─── Page ─── */

interface CapabilitySection {
  label: string
  title: string
  description: string
  diagram: React.ReactNode
}

const sections: CapabilitySection[] = [
  {
    label: 'AI Workflow Architecture',
    title: 'Orchestrator-Worker Pattern',
    description:
      'We build multi-agent systems where a lead orchestrator handles planning, task decomposition, and synthesis. Worker agents execute in parallel with isolated contexts, specific tool access, and built-in verification loops. On failure, the system degrades gracefully.',
    diagram: <OrchestratorDiagram />,
  },
  {
    label: 'Development Process',
    title: 'Systematized Build Pipeline',
    description:
      'Every engagement follows a structured process — from requirements to deployment. Parallel workstreams, automated testing, staged rollout. The pipeline produces consistent, high-quality output regardless of project complexity.',
    diagram: <BuildPipelineDiagram />,
  },
  {
    label: 'Research Methodology',
    title: 'Tiered Research Framework',
    description:
      'Not every question requires the same depth. Our research methodology scales from landscape scans to full compliance mapping, with each tier documented and cited. The final deliverable is always a structured briefing ready for legal counsel.',
    diagram: <ResearchDiagram />,
  },
  {
    label: 'Risk Thinking',
    title: 'The Barbell Principle',
    description:
      'Separate what must be preserved from what can absorb variance. A conservative core generates predictable outcomes. A defined-risk active position accepts calculated variance with hard boundaries. This principle applies to project architecture, resource allocation, and technology selection.',
    diagram: <BarbellDiagram />,
  },
]

export default function CapabilitiesContent() {
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
            <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">Capabilities</p>
            <h1 className="font-heading text-hero-sm md:text-hero text-text-primary mb-6 tracking-tight">
              How we think
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Frameworks, not formulas. Each engagement adapts these approaches to your specific terrain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capability Sections */}
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`py-20 md:py-28 px-6 md:px-12 ${index % 2 === 0 ? 'bg-background-alt' : ''}`}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="text-sm font-medium text-gold uppercase tracking-widest mb-4">
                {section.label}
              </p>
              <h2 className="font-heading text-display-sm md:text-display text-text-primary mb-6 tracking-tight">
                {section.title}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-3xl">
                {section.description}
              </p>

              {/* Diagram */}
              <div className="bg-surface-card rounded-card border border-text-primary/5 p-6 md:p-10 shadow-card overflow-x-auto">
                {section.diagram}
              </div>

              <IPNotice className="mt-4" />
            </motion.div>
          </div>
        </section>
      ))}

      {/* Brush stroke */}
      <div className="py-8">
        <BrushStrokeDivider variant={0} />
      </div>

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
              Apply these frameworks to your challenge.
            </h2>
            <p className="text-text-on-dark/60 mb-10 text-lg">
              We'd love to hear what you're building.
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
