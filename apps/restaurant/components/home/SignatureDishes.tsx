'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SIGNATURE_DISHES } from '@/lib/constants'
import { getCountryFlag } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function SignatureDishes() {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    /* Title reveal */
    gsap.from('.dishes-title-word', {
      opacity: 0, y: 50,
      stagger: 0.08, duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })

    /* Cards stagger */
    gsap.from('.dish-card', {
      opacity: 0, y: 60, scale: 0.95,
      stagger: 0.1, duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: trackRef.current, start: 'top 80%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-brand-dark py-24 md:py-36 overflow-hidden">

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(247,148,29,0.04) 0%, transparent 60%)' }} />

      <div className="container-site mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="kente-divider w-12" style={{ height: 4 }} />
              <span className="eyebrow">Signature Dishes</span>
            </div>
            <h2 className="font-playfair leading-[1.0]" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
              {['From', 'Coast', 'to', 'Coast'].map((w, i) => (
                <span key={i} className={cn('dishes-title-word inline-block mr-4', i === 3 ? 'italic text-brand-orange' : 'text-brand-cream')}>
                  {w}
                </span>
              ))}
            </h2>
          </div>
          <Link href="/menu" className="btn-ghost text-xs px-6 py-3 shrink-0 inline-flex items-center gap-2.5">
            Full Menu
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="scroll-snap-x flex gap-5 px-6 md:px-10 xl:px-16 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {SIGNATURE_DISHES.map((dish, i) => (
          <DishCard
            key={dish.id}
            dish={dish}
            index={i}
            isActive={active === i}
            onHover={() => setActive(i)}
          />
        ))}

        {/* End CTA card */}
        <div className="snap-start shrink-0 w-[280px] sm:w-[320px] h-[440px] border border-dashed border-brand-dark-border flex flex-col items-center justify-center gap-4 text-center px-8">
          <p className="font-cormorant italic text-brand-text-muted text-xl">
            120+ more dishes awaiting you
          </p>
          <Link href="/menu" className="btn-primary text-xs px-6 py-3 inline-flex items-center gap-2">
            View Full Menu
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2.5 mt-8">
        {SIGNATURE_DISHES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActive(i)
              const cards = trackRef.current?.querySelectorAll('.dish-card')
              cards?.[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            }}
            className={cn(
              'transition-all duration-300',
              i === active
                ? 'w-6 h-1.5 bg-brand-orange'
                : 'w-1.5 h-1.5 rounded-full bg-brand-dark-border hover:bg-brand-text-muted'
            )}
            aria-label={`Go to dish ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function DishCard({
  dish,
  isActive,
  onHover,
}: {
  dish: typeof SIGNATURE_DISHES[number]
  index: number
  isActive: boolean
  onHover: () => void
}) {
  return (
    <div
      className={cn(
        'dish-card snap-start shrink-0 w-[280px] sm:w-[320px] h-[440px] relative',
        'overflow-hidden transition-all duration-500 cursor-pointer group',
        isActive ? 'ring-1 ring-brand-orange shadow-card-hover' : 'shadow-card hover:ring-1 hover:ring-brand-orange/40'
      )}
      onMouseEnter={onHover}
      onFocus={onHover}
      tabIndex={0}
    >
      {/* Gradient background (replaces photo) */}
      <div className={cn('absolute inset-0 bg-gradient-to-br transition-all duration-700', dish.gradient,
        'group-hover:scale-105')}
        style={{ transformOrigin: 'center' }}
      />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 12px)`,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-7 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="font-inter text-[28px]">{getCountryFlag(dish.countryCode)}</span>
          <span className="eyebrow bg-black/40 backdrop-blur-sm px-3 py-1.5 text-[10px]">
            {dish.region}
          </span>
        </div>

        <div>
          <h3 className="font-playfair text-2xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors duration-300">
            {dish.name}
          </h3>
          <p className="font-inter text-[11px] text-brand-text-muted mb-4 tracking-wide uppercase">
            {dish.country}
          </p>
          <p className={cn(
            'font-cormorant text-brand-text-light text-[1.05rem] leading-snug italic',
            'max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500'
          )}>
            {dish.description}
          </p>
          <div className={cn(
            'mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400'
          )}>
            <Link href="/menu" className="inline-flex items-center gap-1.5 text-brand-orange font-inter text-[11px] font-medium tracking-wide uppercase">
              View Recipe
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Active glow */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 40px rgba(247,148,29,0.12)' }}
        />
      )}
    </div>
  )
}
