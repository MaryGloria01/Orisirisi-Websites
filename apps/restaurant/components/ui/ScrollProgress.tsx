'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start:  'top top',
        end:    'bottom bottom',
        scrub:  0.3,
      },
    })
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-brand-dark-border">
      <div
        ref={barRef}
        className="h-full bg-brand-orange origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
