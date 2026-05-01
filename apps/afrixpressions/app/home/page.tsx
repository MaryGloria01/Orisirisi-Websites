'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, ArrowDown } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   AfriXpressions — Home Page
   Phase 2 full build will include:
   - Cinematic preloader with African proverb kinetic typography
   - Three.js animated Africa globe
   - 8-section cultural wheel navigator
   - Parallax heritage gallery
   - Rwanda showcase section
   - Interactive 54-nation cultural atlas
   This scaffold delivers the hero and teaser structure.
───────────────────────────────────────────────────────────────────────────── */

const PROVERB = '"Until the lion learns to write, every story will glorify the hunter."'
const PROVERB_ATTR = '— African Proverb'

export default function AfriXpressionsHome() {
  const [ready, setReady]       = useState(false)
  const [shown, setShown]       = useState(false)
  const canvasRef               = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const t = setTimeout(() => { setReady(true); setTimeout(() => setShown(true), 200) }, 400)
    return () => clearTimeout(t)
  }, [])

  /* Ambient particle canvas — green + orange palette */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    type P = { x:number; y:number; r:number; vx:number; vy:number; a:number; va:number; green:boolean }
    const pts: P[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.4 + 0.1),
      a: Math.random() * 0.5 + 0.1,
      va: (Math.random() - 0.5) * 0.006,
      green: Math.random() > 0.5,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += p.va
        if (p.a <= 0.05 || p.a >= 0.65) p.va *= -1
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.green ? `rgba(45,125,50,${p.a})` : `rgba(247,148,29,${p.a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const SECTIONS = [
    { label: 'Art & Visual Expressions',      color: '#F7941D' },
    { label: 'Cuisine & Food Culture',        color: '#2D7D32' },
    { label: 'Music & Performing Arts',       color: '#C0392B' },
    { label: 'Fashion & Textile',             color: '#8E44AD' },
    { label: 'Languages & Literature',        color: '#2980B9' },
    { label: 'History & Heritage',            color: '#D4A017' },
    { label: 'Innovation & Knowledge',        color: '#27AE60' },
    { label: 'African Brotherhood',           color: '#E67E22' },
  ]

  return (
    <main className="min-h-screen bg-brand-black overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Layered dark-green-earth background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 70% 50% at 20% 40%, rgba(45,125,50,0.16) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(247,148,29,0.1) 0%, transparent 50%), linear-gradient(160deg, #0A1208 0%, #0A0A0A 40%, #050505 100%)' }}
          />
          {/* Tribal geometric overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(45,125,50,0.6) 20px,rgba(45,125,50,0.6) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(247,148,29,0.4) 20px,rgba(247,148,29,0.4) 21px)' }}
          />
        </div>

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(5,5,5,0.75) 100%)' }}
        />

        <div className="relative z-10 container-site text-center flex flex-col items-center gap-8 pt-24">
          {/* Proverb — animates in first */}
          <AnimatePresence>
            {shown && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="max-w-2xl"
              >
                <p className="font-cormorant italic text-brand-text-muted leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)' }}>
                  {PROVERB}
                </p>
                <p className="font-inter text-[10px] text-brand-orange uppercase tracking-widest mt-2">{PROVERB_ATTR}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kente */}
          <motion.div
            className="w-20 kente-divider"
            style={{ height: 4 }}
            initial={{ scaleX: 0 }}
            animate={shown ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          {/* Main headline */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-playfair text-brand-cream leading-[1.0]"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
              initial={{ y: 100, opacity: 0 }}
              animate={shown ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              A Renaissance of
            </motion.h1>
          </div>

          <div className="overflow-hidden -mt-4">
            <motion.h1
              className="text-shimmer-green font-playfair italic leading-[1.0]"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
              initial={{ y: 100, opacity: 0 }}
              animate={shown ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Everything African
            </motion.h1>
          </div>

          <motion.p
            className="font-cormorant text-brand-text-light max-w-2xl leading-relaxed"
            style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={shown ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.9 }}
          >
            An Afro-centric integrative cultural hub in Kigali, Rwanda — where the continent's past,
            present and future converge. You can feel the entire continent at one location.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={shown ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <Link href="/hub" className="btn-primary text-sm px-10 py-4">
              Begin Your Journey
              <ChevronRight size={15} />
            </Link>
            <a href="https://orisirisiafricanrestaurant.com" className="btn-ghost text-sm px-10 py-4">
              Visit the Restaurant
            </a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={shown ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="font-inter text-[10px] text-brand-text-muted tracking-widest uppercase">Explore</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ArrowDown size={16} className="text-brand-green" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 kente-divider" style={{ height: 5 }} />
      </section>

      {/* ── Hub Preview ── */}
      <section className="bg-brand-dark py-28">
        <div className="container-site">
          <div className="text-center mb-16">
            <span className="eyebrow-green block mb-4">The Hub</span>
            <h2 className="font-playfair text-brand-cream leading-[1.05]" style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
              Eight Worlds. <span className="italic text-brand-orange">One Location.</span>
            </h2>
            <p className="font-inter text-brand-text-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Explore art, cuisine, music, fashion, language, history, innovation and the brotherhood that unites Africa.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SECTIONS.map((s, i) => (
              <div
                key={s.label}
                className="group relative border border-brand-dark-border hover:border-opacity-0 p-7 cursor-pointer transition-all duration-400 overflow-hidden"
                style={{ '--hover-color': s.color } as React.CSSProperties}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${s.color}18, transparent)` }}
                />
                <span
                  className="font-playfair text-5xl font-bold leading-none opacity-10 group-hover:opacity-20 transition-opacity duration-300 select-none"
                  style={{ color: s.color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-playfair text-base text-brand-cream mt-4 group-hover:text-white transition-colors duration-300 leading-snug">
                  {s.label}
                </p>
                <div className="w-8 h-0.5 mt-3 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: s.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming Soon banner ── */}
      <section className="bg-brand-black py-24 border-t border-brand-dark-border">
        <div className="container-site text-center">
          <div className="w-24 kente-divider mx-auto mb-10" style={{ height: 4 }} />
          <p className="font-cormorant italic text-brand-text-muted text-2xl mb-3">
            Full platform launching — Phase 2 build in progress.
          </p>
          <h3 className="font-playfair text-brand-cream text-3xl mb-8">
            Rwanda. Africa. The World.
          </h3>
          <a href="https://orisirisiafrica.com" className="btn-ghost text-sm px-8 py-4 inline-flex items-center gap-2.5">
            Visit Orisirisi Africa
            <ChevronRight size={14} />
          </a>
        </div>
      </section>
    </main>
  )
}
