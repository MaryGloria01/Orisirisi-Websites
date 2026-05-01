'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, ArrowRight, Flame } from 'lucide-react'
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
    gsap.from('.dishes-title-word', {
      opacity: 0, y: 50,
      stagger: 0.08, duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
    gsap.from('.dish-card', {
      opacity: 0, y: 60, scale: 0.95,
      stagger: 0.1, duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: trackRef.current, start: 'top 80%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-white py-24 md:py-36 overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-80 pointer-events-none glow-orange-topleft opacity-60" />

      <div className="container-site mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="kente-divider w-12 h-1" />
              <span className="eyebrow">Signature Dishes</span>
            </div>
            <h2 className="font-playfair text-section-2xl leading-[1.0]">
              {['From', 'Coast', 'to', 'Coast'].map((w, i) => (
                <span key={i} className={cn('dishes-title-word inline-block mr-4', i === 3 ? 'italic text-brand-orange' : 'text-text-head')}>
                  {w}
                </span>
              ))}
            </h2>
            <p className="font-inter text-text-muted text-sm mt-3 max-w-lg leading-relaxed">
              Hand-picked from all corners of the continent — each dish tells the story of a people, a land, a tradition.
            </p>
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
        <div className="snap-start shrink-0 w-[280px] sm:w-[320px] h-[440px] border border-dashed border-[rgba(92,58,30,0.2)] bg-surface flex flex-col items-center justify-center gap-5 text-center px-8">
          <div className="w-14 h-14 border border-brand-orange/30 flex items-center justify-center">
            <Flame size={24} className="text-brand-orange" />
          </div>
          <p className="font-cormorant italic text-text-muted text-xl leading-snug">
            120+ more dishes <br />awaiting you
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
            type="button"
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
                : 'w-1.5 h-1.5 rounded-full bg-[rgba(92,58,30,0.2)] hover:bg-text-muted'
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
        isActive ? 'ring-2 ring-brand-orange shadow-card-hover' : 'shadow-card hover:ring-1 hover:ring-brand-orange/50'
      )}
      onMouseEnter={onHover}
      onFocus={onHover}
      tabIndex={0}
    >
      {/* Rich gradient background */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br transition-all duration-700 origin-center group-hover:scale-105',
        dish.gradient,
      )} />

      {/* Diagonal stripe texture */}
      <div className="absolute inset-0 dish-stripe-overlay opacity-[0.07]" />

      {/* Bottom vignette for text legibility */}
      <div className="absolute inset-0 dish-vignette" />

      {/* Content */}
      <div className="absolute inset-0 p-7 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-3xl">{getCountryFlag(dish.countryCode)}</span>
            <span className="font-inter text-[9px] text-white/70 tracking-widest uppercase">{dish.country}</span>
          </div>
          <span className="eyebrow bg-black/50 backdrop-blur-sm px-3 py-1.5 text-[9px] text-brand-orange">
            {dish.region}
          </span>
        </div>

        <div>
          <h3 className="font-playfair text-2xl font-bold text-white mb-1 group-hover:text-brand-orange transition-colors duration-300">
            {dish.name}
          </h3>
          <p className={cn(
            'font-cormorant text-white/75 text-[1.05rem] leading-snug italic',
            'max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500'
          )}>
            {dish.description}
          </p>
          <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
            <Link href="/menu" className="inline-flex items-center gap-1.5 text-brand-orange font-inter text-[11px] font-medium tracking-wide uppercase">
              View on Menu
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {isActive && <div className="absolute inset-0 pointer-events-none dish-active-glow" />}
    </div>
  )
}
