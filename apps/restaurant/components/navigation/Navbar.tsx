'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [hidden, setHidden]       = useState(false)
  const pathname                   = usePathname()
  const lastScrollY                = useRef(0)
  const navRef                     = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > lastScrollY.current && y > 200)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navVariants = {
    visible: { y: 0,     opacity: 1, transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } },
    hidden:  { y: -100,  opacity: 0, transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } },
  }

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0,    transition: { duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] } },
    open:   { opacity: 1, height: 'auto', transition: { duration: 0.4,  ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        variants={navVariants}
        animate={hidden && !menuOpen ? 'hidden' : 'visible'}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-[rgba(92,58,30,0.12)] py-3 shadow-warm'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-site flex items-center justify-between">

          {/* Logo */}
          <Link href="/home" className="group flex flex-col leading-none">
            <span className={cn(
              'font-playfair text-xl font-bold tracking-tight transition-colors duration-300',
              scrolled ? 'text-text-head group-hover:text-brand-orange' : 'text-white group-hover:text-brand-orange'
            )}>
              ORISIRISI
            </span>
            <span className="font-inter text-[9px] font-medium text-brand-orange tracking-[0.28em] uppercase mt-0.5">
              African Restaurant
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'relative font-inter text-[13px] font-medium tracking-wide transition-colors duration-300',
                    'after:absolute after:bottom-[-3px] after:left-0 after:h-[1px] after:bg-brand-orange',
                    'after:transition-all after:duration-300',
                    pathname === href
                      ? 'text-brand-orange after:w-full'
                      : scrolled
                        ? 'text-text-body hover:text-text-head after:w-0 hover:after:w-full'
                        : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="https://orisirisiafrica.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 font-inter text-[11px] hover:text-brand-orange transition-colors duration-300',
                scrolled ? 'text-text-muted' : 'text-white/70'
              )}
              style={{ letterSpacing: '0.08em' }}
            >
              <ExternalLink size={11} />
              Orisirisi Africa
            </a>
            <Link
              href="/book"
              className="btn-primary text-[12px] px-6 py-3"
            >
              Reserve a Table
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className={cn(
              'lg:hidden p-2 hover:text-brand-orange transition-colors duration-300',
              scrolled ? 'text-text-body' : 'text-white'
            )}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
                : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-md border-t border-[rgba(92,58,30,0.1)]"
            >
              <div className="container-site py-6 flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'block py-3.5 px-4 font-playfair text-2xl border-b border-[rgba(92,58,30,0.08)] transition-all duration-300',
                        pathname === href
                          ? 'text-brand-orange'
                          : 'text-text-head hover:text-brand-orange hover:pl-7'
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-5">
                  <Link
                    href="/book"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Reserve a Table
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
