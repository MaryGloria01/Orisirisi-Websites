'use client'

import { useRef, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  splitBy?: 'words' | 'chars' | 'lines'
  delay?: number
  stagger?: number
  scrub?: boolean
  once?: boolean
}

export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  splitBy = 'words',
  delay = 0,
  stagger = 0.05,
  scrub = false,
  once = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  const parts = useMemo(() => {
    if (splitBy === 'chars') return text.split('')
    if (splitBy === 'words') return text.split(' ')
    return [text]
  }, [text, splitBy])

  useGSAP(() => {
    const items = containerRef.current?.querySelectorAll('.anim-part')
    if (!items || items.length === 0) return

    const tl = gsap.fromTo(
      items,
      { opacity: 0, y: splitBy === 'chars' ? 20 : 40, rotateX: splitBy === 'chars' ? 20 : 0 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: scrub ? 1 : 0.8,
        stagger: scrub ? stagger * 0.5 : stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: scrub
          ? {
              trigger: containerRef.current,
              start: 'top 85%',
              end:   'bottom 40%',
              scrub: 1,
              toggleActions: 'play none none none',
            }
          : {
              trigger: containerRef.current,
              start: 'top 88%',
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
      }
    )

    return () => { tl.kill() }
  }, { scope: containerRef })

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
      className={cn('overflow-hidden', className)}
      style={{ perspective: '600px' }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          className="anim-part inline-block gsap-hide"
          style={{ whiteSpace: splitBy === 'words' ? 'pre' : 'normal' }}
        >
          {part}
          {splitBy === 'words' && i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
