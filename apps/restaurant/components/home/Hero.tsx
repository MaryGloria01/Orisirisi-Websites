'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface HeroProps { isReady: boolean }

export default function Hero({ isReady }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const bgRef        = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  /* Parallax on background */
  useGSAP(() => {
    if (!bgRef.current) return
    gsap.to(bgRef.current, {
      yPercent: 35,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end:   'bottom top',
        scrub: 1.5,
      },
    })
  }, { scope: containerRef })

  /* Floating particles (canvas) */
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type Particle = { x: number; y: number; r: number; vx: number; vy: number; alpha: number; va: number }

    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.5 + 0.15),
      alpha: Math.random() * 0.6 + 0.1,
      va: (Math.random() - 0.5) * 0.008,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.alpha += p.va
        if (p.alpha <= 0.05 || p.alpha >= 0.75) p.va *= -1
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(247,148,29,${p.alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const stagger = 0.12
  const baseDelay = 0.3

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Deep cinematic background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-hero-gradient" />
        {/* Subtle woven texture overlay */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(247,148,29,0.4) 18px,rgba(247,148,29,0.4) 19px),
                              repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(247,148,29,0.25) 18px,rgba(247,148,29,0.25) 19px)`,
          }}
        />
      </div>

      {/* Floating particles */}
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,10,10,0.8) 100%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 container-site text-center flex flex-col items-center gap-6 pt-24">

        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 24 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Orisirisi African Restaurant &nbsp;·&nbsp; Pioneer Branch, Kigali Rwanda
        </motion.p>

        {/* Headline line 1 */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-playfair font-bold text-brand-cream leading-[1.0]"
            style={{ fontSize: 'clamp(3.2rem, 7.5vw, 7rem)' }}
            initial={{ y: 100, opacity: 0 }}
            animate={isReady ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: baseDelay + stagger, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Every Meal is a
          </motion.h1>
        </div>

        {/* Headline line 2 — orange italic */}
        <div className="overflow-hidden -mt-3">
          <motion.h1
            className="font-playfair italic text-brand-orange leading-[1.0] text-shimmer"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}
            initial={{ y: 100, opacity: 0 }}
            animate={isReady ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: baseDelay + stagger * 2, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Journey Through Africa
          </motion.h1>
        </div>

        {/* Kente divider */}
        <motion.div
          className="w-24 kente-divider my-1"
          style={{ height: 4 }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isReady ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: baseDelay + stagger * 3, duration: 0.8 }}
        />

        {/* Subheadline */}
        <motion.p
          className="font-cormorant text-brand-text-light max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + stagger * 4, duration: 0.8 }}
        >
          Discover 54 nations on one plate. A curated celebration of Africa's richest culinary traditions —
          authentically prepared, passionately served.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 24 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + stagger * 5, duration: 0.8 }}
        >
          <Link href="/book" className="btn-primary text-sm px-10 py-4">
            Reserve Your Table
            <ChevronRight size={15} />
          </Link>
          <Link href="/menu" className="btn-ghost text-sm px-10 py-4">
            Explore the Menu
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-brand-dark-border/30"
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : {}}
          transition={{ delay: baseDelay + stagger * 6, duration: 0.8 }}
        >
          {[
            { num: '54',    label: 'Nations Represented' },
            { num: '120+',  label: 'Dishes on the Menu' },
            { num: '6',     label: 'Regional Buffets' },
            { num: '1',     label: 'Unforgettable Journey' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-playfair text-2xl font-bold text-brand-orange">{num}</p>
              <p className="font-inter text-[11px] text-brand-text-muted tracking-wide uppercase mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : {}}
        transition={{ delay: baseDelay + stagger * 7, duration: 0.8 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="font-inter text-[10px] text-brand-text-muted tracking-widest uppercase group-hover:text-brand-orange transition-colors duration-300">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-brand-orange" />
        </motion.div>
      </motion.div>

      {/* Bottom kente strip */}
      <div className="absolute bottom-0 left-0 right-0 kente-divider-animated" style={{ height: 5 }} />
    </section>
  )
}
