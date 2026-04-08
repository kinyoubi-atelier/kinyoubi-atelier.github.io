'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RotateCcw } from 'lucide-react'

/**
 * Project Estimator Widget
 *
 * Interactive widget that lets visitors self-qualify by selecting
 * service type, scope, and timeline preference. Returns a ballpark
 * engagement range (weeks, not dollars) to set expectations.
 */

type ServiceType = 'software' | 'consulting' | 'ai-workflow' | 'research'
type Scope = 'small' | 'medium' | 'large'
type Timeline = 'standard' | 'accelerated'

interface Estimate {
  weeks: string
  description: string
}

const serviceLabels: Record<ServiceType, string> = {
  software: 'Software Development',
  consulting: 'Technical Consulting',
  'ai-workflow': 'AI-Powered Workflow',
  research: 'Regulatory Research',
}

const scopeLabels: Record<Scope, string> = {
  small: 'Focused (single feature or module)',
  medium: 'Standard (multi-feature system)',
  large: 'Complex (full platform or migration)',
}

const timelineLabels: Record<Timeline, string> = {
  standard: 'Standard',
  accelerated: 'Accelerated',
}

function getEstimate(service: ServiceType, scope: Scope, timeline: Timeline): Estimate {
  const matrix: Record<ServiceType, Record<Scope, Record<Timeline, Estimate>>> = {
    software: {
      small: {
        standard: { weeks: '2–4 weeks', description: 'A focused build — single feature, API, or module with testing and deployment.' },
        accelerated: { weeks: '1–2 weeks', description: 'Compressed timeline with parallel workstreams and daily syncs.' },
      },
      medium: {
        standard: { weeks: '6–10 weeks', description: 'Multi-feature application with architecture planning, build, and deployment.' },
        accelerated: { weeks: '4–6 weeks', description: 'Parallel development tracks with weekly demos and continuous delivery.' },
      },
      large: {
        standard: { weeks: '12–20 weeks', description: 'Full platform build or migration with phased delivery milestones.' },
        accelerated: { weeks: '8–14 weeks', description: 'Aggressive but structured timeline with dedicated resources.' },
      },
    },
    consulting: {
      small: {
        standard: { weeks: '1–2 weeks', description: 'Architecture review or technology audit with written recommendations.' },
        accelerated: { weeks: '3–5 days', description: 'Intensive review sprint with rapid turnaround.' },
      },
      medium: {
        standard: { weeks: '3–6 weeks', description: 'System design engagement with documentation and implementation roadmap.' },
        accelerated: { weeks: '2–3 weeks', description: 'Compressed design sprint with hands-on prototyping.' },
      },
      large: {
        standard: { weeks: '8–12 weeks', description: 'Full technical strategy engagement with ongoing advisory.' },
        accelerated: { weeks: '5–8 weeks', description: 'Fast-tracked strategy with parallel workstreams.' },
      },
    },
    'ai-workflow': {
      small: {
        standard: { weeks: '3–5 weeks', description: 'Single workflow automation with AI integration and testing.' },
        accelerated: { weeks: '2–3 weeks', description: 'Rapid prototyping to production pipeline.' },
      },
      medium: {
        standard: { weeks: '6–10 weeks', description: 'Multi-agent system with orchestration, verification, and deployment.' },
        accelerated: { weeks: '4–7 weeks', description: 'Accelerated build with iterative agent refinement.' },
      },
      large: {
        standard: { weeks: '12–18 weeks', description: 'Enterprise workflow platform with multiple agent systems and monitoring.' },
        accelerated: { weeks: '8–12 weeks', description: 'Phased rollout with early production milestones.' },
      },
    },
    research: {
      small: {
        standard: { weeks: '1–2 weeks', description: 'Targeted research brief on a specific regulation or contract.' },
        accelerated: { weeks: '3–5 days', description: 'Rapid scan with key findings summary.' },
      },
      medium: {
        standard: { weeks: '3–5 weeks', description: 'Comprehensive landscape analysis with compliance mapping.' },
        accelerated: { weeks: '2–3 weeks', description: 'Focused deep-dive with prioritized findings.' },
      },
      large: {
        standard: { weeks: '6–10 weeks', description: 'Full regulatory framework analysis with workflow recommendations.' },
        accelerated: { weeks: '4–6 weeks', description: 'Multi-track research with parallel workstreams.' },
      },
    },
  }

  return matrix[service][scope][timeline]
}

export function ProjectEstimator() {
  const [service, setService] = useState<ServiceType | null>(null)
  const [scope, setScope] = useState<Scope | null>(null)
  const [timeline, setTimeline] = useState<Timeline | null>(null)
  const [showResult, setShowResult] = useState(false)

  const step = !service ? 1 : !scope ? 2 : !timeline ? 3 : 4

  const reset = () => {
    setService(null)
    setScope(null)
    setTimeline(null)
    setShowResult(false)
  }

  const estimate = service && scope && timeline ? getEstimate(service, scope, timeline) : null

  const handleTimeline = (t: Timeline) => {
    setTimeline(t)
    // Short delay before showing result for a smoother feel
    setTimeout(() => setShowResult(true), 200)
  }

  const optionClass = (selected: boolean) =>
    `w-full text-left p-4 rounded-lg border transition-all text-sm ${
      selected
        ? 'border-gold bg-gold/5 text-text-primary'
        : 'border-text-primary/10 hover:border-gold/30 text-text-secondary hover:text-text-primary'
    }`

  return (
    <div className="bg-surface-card border border-text-primary/5 rounded-card p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-gold uppercase tracking-widest mb-1">Estimate</p>
          <h3 className="font-heading text-xl text-text-primary tracking-tight">
            What does a typical engagement look like?
          </h3>
        </div>
        {step > 1 && (
          <button
            onClick={reset}
            className="text-xs text-text-tertiary hover:text-gold flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex gap-1 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              s <= step ? 'bg-gold' : 'bg-text-primary/10'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Service Type */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <p className="text-sm text-text-secondary mb-4">What type of engagement are you considering?</p>
            {(Object.entries(serviceLabels) as [ServiceType, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setService(key)} className={optionClass(false)}>
                {label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Step 2: Scope */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <p className="text-sm text-text-secondary mb-4">
              <span className="text-gold font-medium">{serviceLabels[service!]}</span> — what's the scope?
            </p>
            {(Object.entries(scopeLabels) as [Scope, string][]).map(([key, label]) => (
              <button key={key} onClick={() => setScope(key)} className={optionClass(false)}>
                {label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Step 3: Timeline */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <p className="text-sm text-text-secondary mb-4">Timeline preference?</p>
            {(Object.entries(timelineLabels) as [Timeline, string][]).map(([key, label]) => (
              <button key={key} onClick={() => handleTimeline(key)} className={optionClass(false)}>
                {label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Result */}
        {showResult && estimate && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-background-alt rounded-lg p-6 mb-4">
              <p className="text-xs text-text-tertiary uppercase tracking-widest mb-2">Typical engagement</p>
              <p className="text-3xl font-heading text-text-primary mb-2">{estimate.weeks}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{estimate.description}</p>
            </div>
            <p className="text-xs text-text-tertiary mb-4">
              This is a rough guide based on similar engagements. Every project is different — let's talk specifics.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
            >
              Discuss your project <ArrowRight className="h-3 w-3" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
