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
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-[rgba(92,58,30,0.12)]">
      <div
        ref={barRef}
        className="h-full bg-brand-orange origin-left scale-x-0"
      />
    </div>
  )
}
