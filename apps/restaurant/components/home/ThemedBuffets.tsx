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

/* Static per-buffet colour classes — avoids dynamic inline styles */
const BUFFET_CLS: Record<string, {
  bar: string; hover: string; num: string; badge: string; badgeBorder: string
}> = {
  west:     { bar: 'bg-[#E67E22]', hover: 'group-hover:bg-[#E67E22]/8',  num: 'text-[#E67E22]/20', badge: 'text-[#E67E22]', badgeBorder: 'border-[#E67E22]/40' },
  east:     { bar: 'bg-[#27AE60]', hover: 'group-hover:bg-[#27AE60]/8',  num: 'text-[#27AE60]/20', badge: 'text-[#27AE60]', badgeBorder: 'border-[#27AE60]/40' },
  north:    { bar: 'bg-[#C0392B]', hover: 'group-hover:bg-[#C0392B]/8',  num: 'text-[#C0392B]/20', badge: 'text-[#C0392B]', badgeBorder: 'border-[#C0392B]/40' },
  south:    { bar: 'bg-[#8E44AD]', hover: 'group-hover:bg-[#8E44AD]/8',  num: 'text-[#8E44AD]/20', badge: 'text-[#8E44AD]', badgeBorder: 'border-[#8E44AD]/40' },
  central:  { bar: 'bg-[#2980B9]', hover: 'group-hover:bg-[#2980B9]/8',  num: 'text-[#2980B9]/20', badge: 'text-[#2980B9]', badgeBorder: 'border-[#2980B9]/40' },
  diaspora: { bar: 'bg-brand-orange', hover: 'group-hover:bg-brand-orange/8', num: 'text-brand-orange/20', badge: 'text-brand-orange', badgeBorder: 'border-brand-orange/40' },
}

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
    <section ref={sectionRef} className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div className="container-site relative">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-5">
            <div className="kente-divider w-12 h-1" />
            <span className="eyebrow">Themed Buffets</span>
            <div className="kente-divider w-12 h-1" />
          </div>
          <h2 className="font-playfair text-text-head text-section-xl leading-[1.05]">
            A Different Africa{' '}
            <span className="italic text-brand-orange">Every Month</span>
          </h2>
          <p className="font-inter text-text-muted text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Six immersive dining journeys — each one a deep-dive into a distinct African subregion's culinary soul.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {THEMED_BUFFETS.map((buffet, i) => {
            const cls = BUFFET_CLS[buffet.id] ?? BUFFET_CLS.diaspora
            return (
              <div
                key={buffet.id}
                className="buffet-card group relative overflow-hidden bg-surface border border-[rgba(92,58,30,0.08)] hover:shadow-card-hover hover:border-transparent transition-all duration-500 cursor-pointer"
              >
                {/* Colour wash on hover */}
                <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500', cls.hover)} />

                {/* Left accent bar */}
                <div className={cn('absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all duration-500', cls.bar)} />

                <div className="relative pl-7 pr-6 py-7">
                  {/* Index + badge */}
                  <div className="flex items-start justify-between mb-5">
                    <span className={cn('font-playfair text-5xl font-bold leading-none', cls.num)}>
                      0{i + 1}
                    </span>
                    <span className={cn('font-inter text-[10px] uppercase tracking-widest px-3 py-1 border', cls.badge, cls.badgeBorder)}>
                      Monthly
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-xl font-semibold text-text-head mb-1 group-hover:text-brand-orange transition-colors duration-300">
                    {buffet.label}
                  </h3>
                  <p className="font-inter text-[11px] text-text-muted mb-5">{buffet.countries}</p>

                  {/* Dish tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {buffet.dishes.map(dish => (
                      <span
                        key={dish}
                        className="font-inter text-[10px] text-text-muted bg-white border border-[rgba(92,58,30,0.1)] px-2.5 py-1"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-text-muted group-hover:text-brand-orange transition-colors duration-300">
                    <CalendarDays size={13} />
                    <span className="font-inter text-[11px] uppercase tracking-widest">Check Schedule</span>
                    <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            )
          })}
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
