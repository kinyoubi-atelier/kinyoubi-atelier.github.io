'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  [key: string]: any
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-white hover:bg-gold-bright focus:ring-2 focus:ring-gold focus:ring-offset-2 shadow-sm hover:shadow-md',
  secondary: 'bg-surface-dark text-text-on-dark hover:bg-navy focus:ring-2 focus:ring-navy focus:ring-offset-2',
  ghost: 'bg-transparent text-text-primary border border-text-primary/20 hover:border-gold hover:text-gold focus:ring-2 focus:ring-gold focus:ring-offset-2',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-lg',
  lg: 'px-8 py-4 text-base rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if (href) {
    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href} className={baseStyles} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={baseStyles} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={baseStyles} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
