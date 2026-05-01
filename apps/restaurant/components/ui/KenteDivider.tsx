'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface KenteDividerProps {
  animated?: boolean
  className?: string
  height?: number
}

export default function KenteDivider({ animated = true, className = '', height = 5 }: KenteDividerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: ref })

  return (
    <div
      ref={ref}
      className={`w-full ${animated ? 'kente-divider-animated' : 'kente-divider'} ${className}`}
      style={{ height }}
      aria-hidden="true"
    />
  )
}
