'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const LETTERS = 'ORISIRISI'.split('')

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase]     = useState<'enter' | 'hold' | 'exit'>('enter')
  const [count, setCount]     = useState(0)
  const barRef                 = useRef<HTMLDivElement>(null)
  const counterRef             = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    /* Animate loading bar and counter */
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        width: '100%',
        duration: 2.2,
        ease: 'power2.inOut',
      })

      gsap.to({ val: 0 }, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: function () {
          setCount(Math.round(this.targets()[0].val))
        },
      })
    })

    const holdTimer = setTimeout(() => setPhase('hold'), 2300)
    const exitTimer = setTimeout(() => {
      setPhase('exit')
      setTimeout(onComplete, 800)
    }, 2800)

    return () => {
      ctx.revert()
      clearTimeout(holdTimer)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-black overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(247,148,29,0.08) 0%, transparent 65%)' }} />
          </div>

          {/* Restaurant name — letters stagger in */}
          <div className="flex items-end gap-0 mb-2 overflow-hidden">
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                transition={{
                  delay: 0.08 + i * 0.06,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="font-playfair font-bold text-brand-cream"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1 }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="eyebrow text-brand-orange mb-16"
          >
            African Restaurant · Kigali, Rwanda
          </motion.p>

          {/* Loading bar track */}
          <div className="w-[260px] sm:w-[380px] relative">
            <div className="w-full h-[1px] bg-brand-dark-border/60 overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-brand-orange"
                style={{ width: '0%' }}
              />
            </div>

            {/* Counter */}
            <div className="flex justify-between items-center mt-3">
              <span className="font-inter text-[10px] text-brand-text-muted tracking-widest uppercase">
                Loading
              </span>
              <span
                ref={counterRef}
                className="font-inter text-[11px] text-brand-orange font-medium tabular-nums"
              >
                {count}%
              </span>
            </div>
          </div>

          {/* Bottom kente strip — slides in */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 kente-divider"
            style={{ height: 6 }}
            initial={{ scaleX: 0, transformOrigin: 'left center' }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 2, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
