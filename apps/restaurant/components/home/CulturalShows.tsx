'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Music2, Mic2, Drama, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import KenteDivider from '@/components/ui/KenteDivider'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PERFORMANCES = [
  { icon: Music2,  label: 'Live Music',    desc: 'Traditional and contemporary African musicians perform nightly.' },
  { icon: Drama,   label: 'Dance Shows',   desc: 'Authentic cultural dance from across the continent.' },
  { icon: Mic2,    label: 'Storytelling',  desc: 'African oral traditions brought to life at your table.' },
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
    <section ref={sectionRef} className="relative bg-brand-cream py-24 md:py-32 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — visual panel */}
          <div className="cultural-left relative">
            <div
              className="relative w-full aspect-[4/5] overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse 70% 50% at 30% 30%, rgba(247,148,29,0.35) 0%, transparent 55%),
                  radial-gradient(ellipse 50% 60% at 70% 70%, rgba(212,160,23,0.2) 0%, transparent 50%),
                  linear-gradient(135deg, #1C0800 0%, #2A1200 40%, #1A0A00 100%)
                `,
              }}
            >
              {/* Decorative overlay pattern */}
              <div className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg,transparent,transparent 22px,rgba(247,148,29,0.5) 22px,rgba(247,148,29,0.5) 23px),
                    repeating-linear-gradient(90deg,transparent,transparent 22px,rgba(247,148,29,0.3) 22px,rgba(247,148,29,0.3) 23px)
                  `,
                }}
              />

              {/* Central icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 border-2 border-brand-orange/60 flex items-center justify-center animate-pulse-glow">
                  <Music2 size={36} className="text-brand-orange" />
                </div>
                <p className="font-cormorant italic text-brand-text-light text-2xl text-center px-8">
                  "Dining is just the beginning"
                </p>
              </div>

              {/* Kente bottom strip */}
              <div className="absolute bottom-0 left-0 right-0 kente-divider" style={{ height: 5 }} />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-brand-orange p-6 text-brand-black shadow-orange-md">
              <p className="font-playfair text-3xl font-bold leading-none">7</p>
              <p className="font-inter text-[10px] font-semibold uppercase tracking-widest mt-1">Nights<br/>a Week</p>
            </div>
          </div>

          {/* Right — copy */}
          <div className="cultural-right">
            <div className="flex items-center gap-4 mb-6">
              <div className="kente-divider w-12" style={{ height: 4 }} />
              <span className="eyebrow">Cultural Shows</span>
            </div>
            <h2 className="font-playfair text-brand-black leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Where Food Meets <br />
              <span className="italic text-brand-orange">African Soul</span>
            </h2>
            <p className="font-inter text-brand-earth text-base leading-relaxed mb-10">
              At Orisirisi, every evening is a celebration. Our cultural performances bring Africa's
              living traditions to life — music, dance, and storytelling that transform a dinner into
              an unforgettable immersion.
            </p>

            <div className="perf-list space-y-5 mb-10">
              {PERFORMANCES.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="perf-item flex items-start gap-5">
                  <div className="w-10 h-10 border border-brand-orange/30 bg-white shrink-0 flex items-center justify-center mt-0.5">
                    <Icon size={17} className="text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-playfair text-base font-semibold text-brand-black mb-1">{label}</h4>
                    <p className="font-inter text-sm text-brand-earth leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/events" className="btn-ghost text-sm border-brand-earth text-brand-earth hover:border-brand-orange hover:text-brand-orange inline-flex items-center gap-2.5">
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
