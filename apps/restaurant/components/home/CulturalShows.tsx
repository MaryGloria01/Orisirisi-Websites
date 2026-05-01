'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Music2, Mic2, Drama, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import KenteDivider from '@/components/ui/KenteDivider'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const ICON_DELAYS = ['[animation-delay:0s]', '[animation-delay:0.6s]', '[animation-delay:1.2s]'] as const

const PERFORMANCES = [
  { icon: Music2, label: 'Live Music',   desc: 'Traditional and contemporary African musicians perform nightly.' },
  { icon: Drama,  label: 'Dance Shows',  desc: 'Authentic cultural dance from across the continent.' },
  { icon: Mic2,   label: 'Storytelling', desc: 'African oral traditions brought to life at your table.' },
]

export default function CulturalShows() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.cultural-left', {
      opacity: 0, x: -40, duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    })
    gsap.from('.cultural-right', {
      opacity: 0, x: 40, duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    })
    gsap.from('.perf-item', {
      opacity: 0, y: 30,
      stagger: 0.12, duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.perf-list', start: 'top 80%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-surface-warm py-24 md:py-32 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — rich visual art panel */}
          <div className="cultural-left relative">
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-brand-earth">
              {/* Kente strip top bar */}
              <div className="absolute top-0 left-0 right-0 kente-divider h-[6px]" />

              {/* Warm radial glow */}
              <div className="absolute inset-0 glow-orange-center opacity-50" />

              {/* Decorative grid pattern */}
              <div className="absolute inset-0 kente-bg opacity-20" />

              {/* Stacked performance icons */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-10">
                <div className="flex gap-8">
                  {[Music2, Drama, Mic2].map((Icon, i) => (
                    <div
                      key={i}
                      className={`w-14 h-14 border border-brand-orange/50 bg-brand-orange/10 flex items-center justify-center animate-float ${ICON_DELAYS[i]}`}
                    >
                      <Icon size={22} className="text-brand-orange" />
                    </div>
                  ))}
                </div>
                <p className="font-cormorant italic text-white/80 text-2xl text-center leading-snug">
                  "Where food meets the African soul"
                </p>
                <div className="kente-divider w-20 h-[3px]" />
                <p className="font-inter text-[11px] text-brand-orange tracking-[0.22em] uppercase">
                  Live Every Night
                </p>
              </div>

              {/* Bottom kente strip */}
              <div className="absolute bottom-0 left-0 right-0 kente-divider" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-brand-orange p-6 shadow-orange-glow">
              <p className="font-playfair text-3xl font-bold text-white leading-none">7</p>
              <p className="font-inter text-[10px] text-white font-semibold uppercase tracking-widest mt-1">Nights<br/>a Week</p>
            </div>
          </div>

          {/* Right — copy */}
          <div className="cultural-right">
            <div className="flex items-center gap-4 mb-6">
              <div className="kente-divider w-12 h-1" />
              <span className="eyebrow">Cultural Shows</span>
            </div>
            <h2 className="font-playfair text-text-head text-section-xl leading-[1.05] mb-5">
              Where Food Meets <br />
              <span className="italic text-brand-orange">African Soul</span>
            </h2>
            <p className="font-inter text-text-body text-base leading-relaxed mb-10">
              At Orisirisi, every evening is a celebration. Our cultural performances bring Africa's
              living traditions to life — music, dance, and storytelling that transform a dinner into
              an unforgettable immersion.
            </p>

            <div className="perf-list space-y-5 mb-10">
              {PERFORMANCES.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="perf-item flex items-start gap-5">
                  <div className="w-10 h-10 border border-brand-orange/25 bg-white shadow-card shrink-0 flex items-center justify-center mt-0.5">
                    <Icon size={17} className="text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-base font-semibold text-text-head mb-1">{label}</h4>
                    <p className="font-inter text-sm text-text-body leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/events" className="btn-ghost text-sm inline-flex items-center gap-2.5">
              Upcoming Shows
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <KenteDivider />
      </div>
    </section>
  )
}
