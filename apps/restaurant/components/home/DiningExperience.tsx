'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { UtensilsCrossed, ChefHat, Wine, Globe, Music2, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DINING_OPTIONS } from '@/lib/constants'
import KenteDivider from '@/components/ui/KenteDivider'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ICON_MAP = { UtensilsCrossed, ChefHat, Wine, Globe, Music2, Star } as const
type IconKey = keyof typeof ICON_MAP

export default function DiningExperience() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.exp-card', {
      opacity: 0, y: 50, scale: 0.96,
      stagger: 0.09, duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    })
    gsap.from('.exp-heading', {
      opacity: 0, y: 30, duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-brand-black py-24 md:py-36">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(92,58,30,0.12) 0%, transparent 50%)' }}
      />

      <div className="container-site">
        <div className="exp-heading mb-16 max-w-2xl">
          <div className="flex items-center gap-4 mb-5">
            <div className="kente-divider w-12" style={{ height: 4 }} />
            <span className="eyebrow">The Experience</span>
          </div>
          <h2 className="font-playfair text-brand-cream leading-[1.05]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}>
            Dining is{' '}
            <span className="italic text-brand-orange">Just the Beginning</span>
          </h2>
          <p className="font-inter text-brand-text-muted text-base leading-relaxed mt-4">
            Six ways to experience the African continent through cuisine, culture, and community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DINING_OPTIONS.map((opt, i) => {
            const Icon = ICON_MAP[opt.icon as IconKey]
            return (
              <div
                key={opt.id}
                className={cn(
                  'exp-card group relative overflow-hidden cursor-pointer',
                  'border border-brand-dark-border hover:border-brand-orange/40',
                  'transition-all duration-500 hover:shadow-card-hover',
                  i === 4 ? 'lg:col-span-2' : '',
                )}
              >
                {/* Gradient fill */}
                <div className={cn('absolute inset-0 bg-gradient-to-br transition-all duration-700', opt.gradient,
                  'group-hover:scale-[1.03]')} />

                {/* Hover orange wash */}
                <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/5 transition-all duration-500" />

                {/* Card glow */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(247,148,29,0.1) 0%, transparent 60%)' }} />

                <div className="relative p-8 flex flex-col gap-5" style={{ minHeight: i === 4 ? 220 : 260 }}>
                  {/* Icon */}
                  <div className="w-12 h-12 border border-brand-orange/30 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange/10 transition-all duration-300">
                    {Icon && <Icon size={20} className="text-brand-orange" />}
                  </div>

                  <div className={cn('flex', i === 4 ? 'flex-row items-center gap-10' : 'flex-col gap-3')}>
                    <div>
                      <h3 className="font-playfair text-xl text-brand-cream font-semibold group-hover:text-brand-orange transition-colors duration-300">
                        {opt.title}
                      </h3>
                      <p className="font-inter text-sm text-brand-text-muted mt-2 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                    {i === 4 && (
                      <div className="shrink-0">
                        <span className="font-inter text-[11px] text-brand-orange border border-brand-orange/40 px-4 py-2 uppercase tracking-widest">
                          Live Nightly
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover arrow */}
                  <div className="mt-auto opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="font-inter text-[10px] text-brand-orange tracking-widest uppercase flex items-center gap-1.5">
                      Learn more
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                        <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Corner adinkra mark */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-orange/20 group-hover:border-brand-orange/60 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-brand-orange/20 group-hover:border-brand-orange/60 transition-colors duration-300" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-24">
        <KenteDivider />
      </div>
    </section>
  )
}
