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
    <section ref={sectionRef} className="relative bg-brand-dark py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(247,148,29,0.04) 0%, transparent 60%)' }}
      />

      <div className="container-site">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-5">
            <div className="kente-divider w-12" style={{ height: 4 }} />
            <span className="eyebrow">Voices From Our Table</span>
            <div className="kente-divider w-12" style={{ height: 4 }} />
          </div>
          <h2 className="font-playfair text-brand-cream leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}>
            What Our Guests{' '}
            <span className="italic text-brand-orange">Are Saying</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="testi-card group relative border border-brand-dark-border hover:border-brand-orange/40 p-8 transition-all duration-500 hover:shadow-card-hover"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-card-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Quote icon */}
              <Quote size={32} className="text-brand-orange/20 mb-6 group-hover:text-brand-orange/40 transition-colors duration-300" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-brand-orange fill-brand-orange" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-cormorant italic text-brand-text-light text-[1.15rem] leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-brand-dark-border">
                <div className="w-10 h-10 bg-brand-dark-card border border-brand-dark-border flex items-center justify-center text-xl">
                  {getCountryFlag(t.flag)}
                </div>
                <div>
                  <p className="font-inter text-sm text-brand-cream font-medium">{t.name}</p>
                  <p className="font-inter text-[11px] text-brand-text-muted">{t.role}</p>
                  <p className="font-inter text-[10px] text-brand-orange uppercase tracking-widest">{t.country}</p>
                </div>
              </div>

              {/* Corner marks */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-brand-orange/20 group-hover:border-brand-orange/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-brand-orange/20 group-hover:border-brand-orange/60 transition-colors duration-300" />
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
