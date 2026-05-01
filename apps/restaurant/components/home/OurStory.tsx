'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import KenteDivider from '@/components/ui/KenteDivider'
import Link from 'next/link'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const STORY_WORDS = `At Orisirisi, every dish carries a story — of tradition, of land, of people.
From the smoky pots of Lagos to the charcoal grills of Kigali, from
the saffron markets of Marrakech to the harvest feasts of Accra,
we bring Africa's culinary soul to your table. Each meal is
meticulously crafted to honour its cultural roots while
delivering a contemporary dining experience unlike any other.`.replace(/\n/g, ' ').split(' ')

const STATS = [
  { value: '54',   label: 'African nations\nrepresented' },
  { value: '120+', label: 'Dishes on\nour menu' },
  { value: '5',    label: 'African\nsubregions' },
  { value: '1',    label: 'Location:\nKigali, Rwanda' },
]

export default function OurStory() {
  const sectionRef  = useRef<HTMLElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const quoteRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    /* Scroll-scrub word reveal */
    const words = sectionRef.current?.querySelectorAll('.story-word')
    if (words) {
      gsap.fromTo(words,
        { opacity: 0.08, color: '#9A8B7A' },
        {
          opacity: 1,
          color: '#E8D5B7',
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end:   'center 20%',
            scrub: 1.2,
          },
        }
      )
    }

    /* Stats count-up */
    gsap.from('.stat-item', {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 80%',
      },
    })

    /* Quote slide in */
    gsap.from(quoteRef.current, {
      opacity: 0,
      x: -40,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: quoteRef.current,
        start: 'top 80%',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-brand-cream noise-overlay py-24 md:py-36">
      <div className="container-site">

        {/* Top label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="kente-divider w-12" style={{ height: 4 }} />
          <span className="eyebrow">Our Story</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left — headline + story text */}
          <div className="lg:col-span-7">
            <h2 className="font-playfair font-bold text-brand-black leading-[1.05] mb-10"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}>
              A Culinary Celebration <br />
              <span className="italic text-brand-orange">of the Entire Continent</span>
            </h2>

            <p className="font-inter text-base leading-loose text-brand-earth" aria-hidden="true">
              {STORY_WORDS.map((word, i) => (
                <span key={i} className="story-word inline-block mr-[0.28em]" style={{ opacity: 0.08 }}>
                  {word}
                </span>
              ))}
            </p>

            <div className="mt-10">
              <Link href="/about" className="btn-ghost text-sm border-brand-earth text-brand-earth hover:border-brand-orange hover:text-brand-orange inline-flex items-center gap-2.5">
                Our Full Story
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right — pull quote + stats */}
          <div className="lg:col-span-5 flex flex-col gap-12">

            {/* Pull quote */}
            <div ref={quoteRef} className="relative pl-6 border-l-2 border-brand-orange">
              <blockquote className="font-cormorant italic text-brand-black leading-snug"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
                "Every meal tells a story. We don't just serve food — we serve heritage, identity, and belonging."
              </blockquote>
              <cite className="block mt-3 font-inter text-[11px] text-brand-text-muted not-italic tracking-widest uppercase">
                Orisirisi African Restaurant
              </cite>
            </div>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {STATS.map(({ value, label }) => (
                <div key={label} className="stat-item adinkra-border p-5 bg-white/60">
                  <p className="font-playfair text-3xl font-bold text-brand-orange mb-1">{value}</p>
                  <p className="font-inter text-[11px] text-brand-earth uppercase tracking-wide leading-snug"
                    style={{ whiteSpace: 'pre-line' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <KenteDivider />
      </div>
    </section>
  )
}
