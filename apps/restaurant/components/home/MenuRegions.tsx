'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AFRICA_REGIONS } from '@/lib/constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function MenuRegions() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string | null>(null)

  useGSAP(() => {
    gsap.from('.region-card', {
      opacity: 0, x: -30,
      stagger: 0.1, duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
    gsap.from('.map-area', {
      opacity: 0, scale: 0.9,
      duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
    })
  }, { scope: sectionRef })

  const activeRegion = AFRICA_REGIONS.find(r => r.id === active)

  return (
    <section ref={sectionRef} className="relative bg-brand-cream py-24 md:py-36 overflow-hidden">
      <div className="container-site">

        <div className="flex items-center gap-4 mb-5">
          <div className="kente-divider w-12" style={{ height: 4 }} />
          <span className="eyebrow">Explore by Region</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <h2 className="font-playfair text-brand-black leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}>
            One Menu,{' '}
            <span className="italic text-brand-orange">Five Regions</span>
          </h2>
          <Link href="/menu" className="btn-ghost text-xs px-6 py-3 border-brand-earth text-brand-earth hover:border-brand-orange hover:text-brand-orange inline-flex items-center gap-2">
            Full Menu
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Region list */}
          <div className="space-y-3">
            {AFRICA_REGIONS.map(region => (
              <button
                key={region.id}
                onMouseEnter={() => setActive(region.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(region.id)}
                onBlur={() => setActive(null)}
                className={cn(
                  'region-card w-full text-left p-5 flex items-center gap-5',
                  'border transition-all duration-400 group',
                  active === region.id
                    ? 'border-brand-orange bg-white shadow-card-hover'
                    : 'border-brand-cream-warm bg-white/50 hover:border-brand-orange/50 hover:bg-white'
                )}
              >
                {/* Color swatch */}
                <div
                  className="w-1.5 h-14 shrink-0 transition-all duration-300"
                  style={{ backgroundColor: active === region.id ? region.color : '#D0C4B4' }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className={cn(
                      'font-playfair text-lg font-semibold transition-colors duration-300',
                      active === region.id ? 'text-brand-orange' : 'text-brand-black group-hover:text-brand-orange'
                    )}>
                      {region.label}
                    </h3>
                    <span className="font-inter text-[11px] text-brand-text-muted shrink-0">
                      {region.countries} countries · {region.dishCount} dishes
                    </span>
                  </div>
                  <p className="font-inter text-sm text-brand-text-muted mt-1 leading-snug">
                    {region.description}
                  </p>
                </div>

                <ArrowRight size={16} className={cn(
                  'shrink-0 transition-all duration-300',
                  active === region.id ? 'text-brand-orange translate-x-1' : 'text-brand-text-muted opacity-0 group-hover:opacity-100'
                )} />
              </button>
            ))}
          </div>

          {/* Stylised map / visual area */}
          <div className="map-area relative aspect-[4/5] lg:aspect-auto lg:h-[560px] flex items-center justify-center">

            {/* Simplified Africa silhouette — pure CSS */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className="relative w-[260px] h-[360px] md:w-[300px] md:h-[420px]"
                style={{
                  background: active
                    ? `radial-gradient(ellipse 60% 60% at 50% 45%, ${activeRegion?.color}30 0%, transparent 65%), #E8D5B7`
                    : '#E8D5B7',
                  clipPath: 'polygon(48% 0%, 72% 2%, 88% 10%, 96% 22%, 100% 38%, 94% 55%, 82% 68%, 78% 82%, 65% 95%, 54% 100%, 44% 95%, 32% 82%, 18% 72%, 8% 58%, 2% 40%, 4% 24%, 14% 12%, 28% 4%)',
                  transition: 'background 0.5s ease',
                }}
              >
                {/* Region dots */}
                {AFRICA_REGIONS.map((region, i) => {
                  const pos = [
                    { top: '55%', left: '28%' }, // West
                    { top: '55%', left: '68%' }, // East
                    { top: '18%', left: '52%' }, // North
                    { top: '82%', left: '52%' }, // South
                    { top: '55%', left: '48%' }, // Central
                  ][i]
                  return (
                    <div
                      key={region.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ ...pos }}
                    >
                      <div
                        className={cn('rounded-full transition-all duration-300', active === region.id ? 'animate-pulse-glow' : '')}
                        style={{
                          width: active === region.id ? 16 : 10,
                          height: active === region.id ? 16 : 10,
                          backgroundColor: region.color,
                          boxShadow: active === region.id ? `0 0 20px ${region.color}80` : 'none',
                        }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Active region info overlay */}
              {activeRegion && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-brand-cream-warm p-4">
                  <p className="font-inter text-[10px] text-brand-text-muted uppercase tracking-widest mb-1">{activeRegion.countries} Countries</p>
                  <h4 className="font-playfair text-lg font-semibold text-brand-black mb-1" style={{ color: activeRegion.color }}>
                    {activeRegion.label}
                  </h4>
                  <p className="font-inter text-sm text-brand-earth">{activeRegion.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
