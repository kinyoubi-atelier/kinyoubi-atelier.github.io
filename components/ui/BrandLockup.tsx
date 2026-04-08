import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * BrandLockup — Kanji design mark + "Kinyoubi Atelier & Co." gradient text
 *
 * Renders the kanji logo with the company word mark below it,
 * styled with a gold → navy gradient fade. Used everywhere the
 * brand identity appears: header, footer, hero.
 *
 * Variants:
 * - "light"  → gold-to-navy gradient (for light backgrounds)
 * - "dark"   → gold-to-cream gradient (for dark backgrounds like footer)
 * - "hero"   → larger version for the homepage hero section
 *
 * Size presets:
 * - "sm"  → header mobile (logo h-8, text ~10px)
 * - "md"  → header desktop (logo h-10, text ~11px)
 * - "lg"  → footer (logo h-12, text ~12px)
 * - "xl"  → homepage hero (logo h-14–16, text ~13px)
 */

type BrandVariant = 'light' | 'dark' | 'hero'
type BrandSize = 'sm' | 'md' | 'lg' | 'xl'

interface BrandLockupProps {
  variant?: BrandVariant
  size?: BrandSize
  className?: string
  /** When true, hides on certain breakpoints (used in header for responsive) */
  hideOnMobile?: boolean
  hideOnDesktop?: boolean
}

const logoSrc: Record<BrandVariant, string> = {
  light: '/logos/logo-transparent.svg',
  dark: '/logos/logo-on-navy.svg',
  hero: '/logos/logo-transparent.svg',
}

const sizeConfig: Record<BrandSize, {
  logoClass: string
  logoWidth: number
  logoHeight: number
  textClass: string
  gap: string
}> = {
  sm: {
    logoClass: 'h-8 w-auto',
    logoWidth: 128,
    logoHeight: 32,
    textClass: 'text-[10px] tracking-[0.18em]',
    gap: 'gap-1',
  },
  md: {
    logoClass: 'h-10 w-auto',
    logoWidth: 160,
    logoHeight: 40,
    textClass: 'text-[11px] tracking-[0.2em]',
    gap: 'gap-1.5',
  },
  lg: {
    logoClass: 'h-12 w-auto',
    logoWidth: 200,
    logoHeight: 50,
    textClass: 'text-xs tracking-[0.2em]',
    gap: 'gap-1.5',
  },
  xl: {
    logoClass: 'h-14 md:h-16 w-auto',
    logoWidth: 256,
    logoHeight: 64,
    textClass: 'text-[11px] md:text-[13px] tracking-[0.22em]',
    gap: 'gap-2',
  },
}

export function BrandLockup({
  variant = 'light',
  size = 'md',
  className = '',
  hideOnMobile = false,
  hideOnDesktop = false,
}: BrandLockupProps) {
  const config = sizeConfig[size]
  const gradientClass = variant === 'dark' ? 'brand-gradient-dark' : 'brand-gradient-light'

  return (
    <div
      className={cn(
        'flex flex-col items-center',
        config.gap,
        hideOnMobile && 'hidden md:flex',
        hideOnDesktop && 'md:hidden flex',
        className,
      )}
    >
      <Image
        src={logoSrc[variant]}
        alt="Kinyoubi Atelier & Co."
        width={config.logoWidth}
        height={config.logoHeight}
        priority={size === 'sm' || size === 'md'}
        className={cn(
          config.logoClass,
          variant === 'hero' && 'opacity-70',
        )}
      />
      <span
        className={cn(
          'font-sans font-semibold uppercase bg-clip-text text-transparent select-none',
          gradientClass,
          config.textClass,
        )}
        aria-label="Kinyoubi Atelier & Co."
      >
        Kinyoubi Atelier & Co.
      </span>
    </div>
  )
}
