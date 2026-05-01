'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { getCountryFlag } from '@/lib/utils'
import KenteDivider from '@/components/ui/KenteDivider'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.testi-card', {
      opacity: 0, y: 50,
      stagger: 0.14, duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-surface-mid py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none glow-orange-mid" />

      <div className="container-site">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-5">
            <div className="kente-divider w-12 h-1" />
            <span className="eyebrow">Voices From Our Table</span>
            <div className="kente-divider w-12 h-1" />
          </div>
          <h2 className="font-playfair text-text-head text-section-lg leading-[1.05]">
            What Our Guests{' '}
            <span className="italic text-brand-orange">Are Saying</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="testi-card group relative bg-white adinkra-card border border-[rgba(92,58,30,0.08)] hover:border-brand-orange/25 p-8 transition-all duration-500 hover:shadow-card-hover"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-brand-orange/15 mb-6 group-hover:text-brand-orange/35 transition-colors duration-300" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-brand-orange fill-brand-orange" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-cormorant italic text-text-body text-[1.15rem] leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-[rgba(92,58,30,0.08)]">
                <div className="w-10 h-10 bg-surface border border-[rgba(92,58,30,0.1)] flex items-center justify-center text-xl">
                  {getCountryFlag(t.flag)}
                </div>
                <div>
                  <p className="font-inter text-sm text-text-head font-medium">{t.name}</p>
                  <p className="font-inter text-[11px] text-text-muted">{t.role}</p>
                  <p className="font-inter text-[10px] text-brand-orange uppercase tracking-widest">{t.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <KenteDivider />
      </div>
    </section>
  )
}
