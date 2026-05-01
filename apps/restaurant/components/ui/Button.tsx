import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center gap-2.5 font-inter font-semibold transition-all duration-300 cursor-pointer',
    'disabled:opacity-40 disabled:cursor-not-allowed select-none',
    {
      'btn-primary': variant === 'primary',
      'btn-ghost':   variant === 'ghost',
      'text-brand-orange hover:text-brand-gold underline-offset-4 hover:underline text-sm': variant === 'text',
    },
    {
      'text-xs px-6 py-3':  size === 'sm',
      'text-sm px-8 py-4':  size === 'md',
      'text-base px-10 py-5': size === 'lg',
    },
    className
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {children}
        </a>
      )
    }
    return <Link href={href} className={base}>{children}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
