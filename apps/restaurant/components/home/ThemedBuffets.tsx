'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarDays, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { THEMED_BUFFETS } from '@/lib/constants'
import KenteDivider from '@/components/ui/KenteDivider'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function ThemedBuffets() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.buffet-card', {
      opacity: 0, y: 40, scale: 0.97,
      stagger: 0.08, duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-brand-dark py-24 md:py-32 overflow-hidden">
      {/* Top edge diagonal */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-brand-cream clip-diagonal" />

      <div className="container-site relative">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-5">
            <div className="kente-divider w-12" style={{ height: 4 }} />
            <span className="eyebrow">Themed Buffets</span>
            <div className="kente-divider w-12" style={{ height: 4 }} />
          </div>
          <h2 className="font-playfair text-brand-cream leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
            A Different Africa{' '}
            <span className="italic text-brand-orange">Every Month</span>
          </h2>
          <p className="font-inter text-brand-text-muted text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Six immersive dining journeys — each one a deep-dive into a distinct African subregion's culinary soul.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {THEMED_BUFFETS.map((buffet, i) => (
            <div
              key={buffet.id}
              className="buffet-card group relative overflow-hidden border border-brand-dark-border hover:border-opacity-0 transition-all duration-500 cursor-pointer"
            >
              {/* Color fill on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${buffet.color}22 0%, ${buffet.color}08 100%)` }}
              />

              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 group-hover:w-1.5"
                style={{ backgroundColor: buffet.color }}
              />

              <div className="relative pl-7 pr-6 py-7">
                {/* Index */}
                <div className="flex items-start justify-between mb-5">
                  <span className="font-playfair text-5xl font-bold leading-none"
                    style={{ color: `${buffet.color}25`, lineHeight: 1 }}>
                    0{i + 1}
                  </span>
                  <span
                    className="font-inter text-[10px] uppercase tracking-widest px-3 py-1 border"
                    style={{ color: buffet.color, borderColor: `${buffet.color}40` }}
                  >
                    Monthly
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-playfair text-xl font-semibold text-brand-cream mb-1 group-hover:text-brand-orange transition-colors duration-300"
                  style={{ ...(true ? {} : { color: buffet.color }) }}
                >
                  {buffet.label}
                </h3>
                <p className="font-inter text-[11px] text-brand-text-muted mb-5">{buffet.countries}</p>

                {/* Dishes preview */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {buffet.dishes.map(dish => (
                    <span
                      key={dish}
                      className="font-inter text-[10px] text-brand-text-muted bg-brand-dark-card border border-brand-dark-border px-2.5 py-1"
                    >
                      {dish}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-brand-text-muted group-hover:text-brand-orange transition-colors duration-300">
                  <CalendarDays size={13} />
                  <span className="font-inter text-[11px] uppercase tracking-widest">Check Schedule</span>
                  <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link href="/events" className="btn-primary inline-flex items-center gap-3 px-10 py-4">
            View Full Events Calendar
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <KenteDivider />
      </div>
    </section>
  )
}
