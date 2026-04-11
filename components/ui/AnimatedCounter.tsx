/**
 * Static stat display.
 *
 * This used to be a Framer Motion in-view counter that counted up from 0
 * when scrolled into view. That was the source of the "0+" flash on the
 * homepage hero — first paint rendered `0 + suffix` until the in-view
 * observer fired (and if the viewport already included the section on
 * load, the observer race could leave it at 0 indefinitely on some
 * browsers).
 *
 * It's now a dumb passthrough. No hooks, no animation, no in-view gate.
 * If you want a number to change over time, compute the new value and
 * re-render the page — don't animate to it.
 *
 * Kept as a named export so any lingering imports don't break the build.
 */

interface AnimatedCounterProps {
  value: string
  label: string
  /** @deprecated retained for API compatibility, ignored. */
  duration?: number
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-heading text-text-primary mb-2">
        {value}
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </div>
  )
}
