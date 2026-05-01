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

/* Static colour classes for each region — avoids dynamic inline styles on non-map elements */
const REGION_CLS: Record<string, { swatch: string; text: string; dot: string; dotSm: string; shadow: string }> = {
  west:    { swatch: 'bg-[#E67E22]', text: 'text-[#E67E22]', dot: 'bg-[#E67E22]', dotSm: 'w-2.5 h-2.5', shadow: 'shadow-[0_0_20px_rgba(230,126,34,0.5)]' },
  east:    { swatch: 'bg-[#27AE60]', text: 'text-[#27AE60]', dot: 'bg-[#27AE60]', dotSm: 'w-2.5 h-2.5', shadow: 'shadow-[0_0_20px_rgba(39,174,96,0.5)]'   },
  north:   { swatch: 'bg-[#C0392B]', text: 'text-[#C0392B]', dot: 'bg-[#C0392B]', dotSm: 'w-2.5 h-2.5', shadow: 'shadow-[0_0_20px_rgba(192,57,43,0.5)]'   },
  south:   { swatch: 'bg-[#8E44AD]', text: 'text-[#8E44AD]', dot: 'bg-[#8E44AD]', dotSm: 'w-2.5 h-2.5', shadow: 'shadow-[0_0_20px_rgba(142,68,173,0.5)]'  },
  central: { swatch: 'bg-[#2980B9]', text: 'text-[#2980B9]', dot: 'bg-[#2980B9]', dotSm: 'w-2.5 h-2.5', shadow: 'shadow-[0_0_20px_rgba(41,128,185,0.5)]'  },
}

/* Clip-path polygon that loosely resembles the African continent */
const AFRICA_CLIP = 'polygon(48% 0%, 72% 2%, 88% 10%, 96% 22%, 100% 38%, 94% 55%, 82% 68%, 78% 82%, 65% 95%, 54% 100%, 44% 95%, 32% 82%, 18% 72%, 8% 58%, 2% 40%, 4% 24%, 14% 12%, 28% 4%)'

/* Approximate positions of each region within the silhouette */
const DOT_POSITIONS = [
  { top: '55%', left: '28%' }, // West
  { top: '55%', left: '68%' }, // East
  { top: '18%', left: '52%' }, // North
  { top: '82%', left: '52%' }, // South
  { top: '55%', left: '48%' }, // Central
]

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
  const activeCls    = active ? REGION_CLS[active] : null

  return (
    <section ref={sectionRef} className="relative bg-surface-mid py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none glow-orange-topright opacity-40" />
      <div className="container-site">

        <div className="flex items-center gap-4 mb-5">
          <div className="kente-divider w-12 h-1" />
          <span className="eyebrow">Explore by Region</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <h2 className="font-playfair text-text-head text-section-lg leading-[1.05]">
            One Menu,{' '}
            <span className="italic text-brand-orange">Five Regions</span>
          </h2>
          <Link href="/menu" className="btn-ghost text-xs px-6 py-3 inline-flex items-center gap-2">
            Full Menu
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Region list */}
          <div className="space-y-3">
            {AFRICA_REGIONS.map(region => {
              const cls = REGION_CLS[region.id]
              const isActive = active === region.id
              return (
                <button
                  type="button"
                  key={region.id}
                  onMouseEnter={() => setActive(region.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(region.id)}
                  onBlur={() => setActive(null)}
                  className={cn(
                    'region-card w-full text-left p-5 flex items-center gap-5',
                    'border transition-all duration-400 group',
                    isActive
                      ? 'border-brand-orange bg-white shadow-card-hover'
                      : 'border-[rgba(92,58,30,0.1)] bg-white/60 hover:border-brand-orange/40 hover:bg-white'
                  )}
                >
                  {/* Colour swatch */}
                  <div className={cn(
                    'w-1.5 shrink-0 transition-all duration-300',
                    isActive ? cn('h-14', cls?.swatch) : 'h-14 bg-[rgba(92,58,30,0.15)]'
                  )} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className={cn(
                        'font-playfair text-lg font-semibold transition-colors duration-300',
                        isActive ? cls?.text : 'text-text-head group-hover:text-brand-orange'
                      )}>
                        {region.label}
                      </h3>
                      <span className="font-inter text-[11px] text-text-muted shrink-0">
                        {region.countries} countries · {region.dishCount} dishes
                      </span>
                    </div>
                    <p className="font-inter text-sm text-text-muted mt-1 leading-snug">
                      {region.description}
                    </p>
                  </div>

                  <ArrowRight size={16} className={cn(
                    'shrink-0 transition-all duration-300',
                    isActive ? cn('translate-x-1', cls?.text) : 'text-text-muted opacity-0 group-hover:opacity-100'
                  )} />
                </button>
              )
            })}
          </div>

          {/* Stylised Africa silhouette map */}
          <div className="map-area relative aspect-[4/5] lg:aspect-auto lg:h-[560px] flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">

              {/* Continent shape — inline styles here are unavoidable for the dynamic radial gradient + clip-path */}
              <div
                className="relative w-[260px] h-[360px] md:w-[300px] md:h-[420px] transition-all duration-500"
                style={{
                  background: activeRegion
                    ? `radial-gradient(ellipse 60% 60% at 50% 45%, ${activeRegion.color}30 0%, transparent 65%), #E8D5B7`
                    : '#E8D5B7',
                  clipPath: AFRICA_CLIP,
                }}
              >
                {/* Region dots — dynamic size/colour/shadow via inline is necessary here */}
                {AFRICA_REGIONS.map((region, i) => {
                  const cls = REGION_CLS[region.id]
                  const isActive = active === region.id
                  return (
                    <div
                      key={region.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={DOT_POSITIONS[i]}
                    >
                      <div
                        className={cn(
                          'rounded-full transition-all duration-300',
                          cls?.dot,
                          isActive ? cn('w-4 h-4', cls?.shadow) : 'w-2.5 h-2.5',
                          isActive ? 'animate-pulse-ring' : '',
                        )}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Active region info overlay */}
              {activeRegion && activeCls && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-[rgba(92,58,30,0.1)] p-4">
                  <p className="font-inter text-[10px] text-text-muted uppercase tracking-widest mb-1">{activeRegion.countries} Countries</p>
                  <h4 className={cn('font-playfair text-lg font-semibold mb-1', activeCls.text)}>
                    {activeRegion.label}
                  </h4>
                  <p className="font-inter text-sm text-text-body">{activeRegion.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
