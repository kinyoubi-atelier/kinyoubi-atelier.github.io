import { cn } from '@/lib/utils'
import { asset } from '@/lib/basePath'

/**
 * BrandLockup — Kanji design mark + "Kinyoubi Atelier & Co." gradient text
 */

type BrandVariant = 'light' | 'dark' | 'hero'
type BrandSize = 'sm' | 'md' | 'lg' | 'xl'

interface BrandLockupProps {
  variant?: BrandVariant
  size?: BrandSize
  className?: string
  hideOnMobile?: boolean
  hideOnDesktop?: boolean
}

const logoFile: Record<BrandVariant, string> = {
  light: '/logos/logo-transparent.svg',
  dark: '/logos/logo-on-navy.svg',
  hero: '/logos/logo-transparent.svg',
}

const sizeConfig: Record<BrandSize, {
  logoClass: string
  textClass: string
  gap: string
}> = {
  sm: {
    logoClass: 'h-8 w-auto',
    textClass: 'text-[10px] tracking-[0.18em]',
    gap: 'gap-1',
  },
  md: {
    logoClass: 'h-10 w-auto',
    textClass: 'text-[11px] tracking-[0.2em]',
    gap: 'gap-1.5',
  },
  lg: {
    logoClass: 'h-12 w-auto',
    textClass: 'text-xs tracking-[0.2em]',
    gap: 'gap-1.5',
  },
  xl: {
    logoClass: 'h-14 md:h-16 w-auto',
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(logoFile[variant])}
        alt="Kinyoubi Atelier & Co."
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
