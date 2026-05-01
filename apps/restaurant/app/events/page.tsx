'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CalendarDays, Clock, MapPin, Users, ChevronRight, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import KenteDivider from '@/components/ui/KenteDivider'
import Link from 'next/link'
import { THEMED_BUFFETS } from '@/lib/constants'

gsap.registerPlugin(useGSAP)

const EVENTS = [
  {
    id:      1,
    title:   'West Africa Month — Grand Buffet',
    type:    'Themed Buffet',
    date:    '2025-06-07',
    display: 'Saturday, 7 June 2025',
    time:    '12:00 – 16:00',
    region:  'West Africa',
    color:   '#E67E22',
    capacity:'120 seats',
    desc:    'An all-day immersion into the bold, smoky, layered flavours of West Africa. Jollof, Egusi, Suya, Kenkey, Thiéboudienne and more. Live drumming and traditional attire encouraged.',
    highlight: true,
  },
  {
    id:      2,
    title:   'Afri-Food Festival 2025',
    type:    'Annual Festival',
    date:    '2025-08-22',
    display: 'Friday–Sunday, 22–24 August 2025',
    time:    '10:00 – 22:00 daily',
    region:  'Pan-Africa',
    color:   '#F7941D',
    capacity:'500+ guests',
    desc:    'Our flagship annual celebration — three days of food, music, dance, storytelling and cultural exhibitions representing all 54 African nations. The biggest event in Kigali\'s cultural calendar.',
    highlight: true,
  },
  {
    id:      3,
    title:   'East Africa Night — Nyama Choma Special',
    type:    'Special Dinner',
    date:    '2025-06-21',
    display: 'Saturday, 21 June 2025',
    time:    '18:00 – 23:00',
    region:  'East Africa',
    color:   '#27AE60',
    capacity:'80 seats',
    desc:    'A dedicated evening celebrating East African grill culture. Open-flame Nyama Choma, pilau, injera, ugali and more. Traditional East African music performance from 20:00.',
    highlight: false,
  },
  {
    id:      4,
    title:   'North Africa Soirée — Moroccan Evenings',
    type:    'Themed Dinner',
    date:    '2025-07-05',
    display: 'Saturday, 5 July 2025',
    time:    '18:30 – 22:30',
    region:  'North Africa',
    color:   '#C0392B',
    capacity:'60 seats',
    desc:    'An intimate evening inspired by the souks of Marrakech. Tagines, bastilla, couscous, mint tea ceremony and live oud music.',
    highlight: false,
  },
  {
    id:      5,
    title:   'Private Dining & Corporate Events',
    type:    'Private Events',
    date:    'Year-round',
    display: 'By appointment',
    time:    'Flexible',
    region:  'Any',
    color:   '#8E44AD',
    capacity:'Up to 80 guests',
    desc:    'Orisirisi offers bespoke private dining experiences — from intimate anniversary dinners to corporate cultural evenings. Tailored menu, dedicated staff and custom cultural entertainment.',
    highlight: false,
  },
]

const TYPES = ['All Events', 'Themed Buffet', 'Annual Festival', 'Special Dinner', 'Themed Dinner', 'Private Events']

export default function EventsPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState('All Events')
  const [open, setOpen]     = useState<number | null>(null)

  useGSAP(() => {
    gsap.from('.ev-entry', { opacity: 0, y: 40, stagger: 0.08, duration: 0.9, ease: 'power3.out', delay: 0.2 })
  }, { scope: pageRef })

  const visible = filter === 'All Events' ? EVENTS : EVENTS.filter(e => e.type === filter)

  return (
    <div ref={pageRef} className="min-h-screen bg-brand-black">

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 85% 30%, rgba(212,160,23,0.1) 0%, transparent 55%), linear-gradient(to bottom, #141414, #0A0A0A)' }} />
        <div className="container-site relative">
          <span className="ev-entry eyebrow block mb-4">Events & Experiences</span>
          <h1 className="ev-entry font-playfair text-brand-cream leading-[1.0]" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
            Calendar of <br />
            <span className="italic text-brand-orange">African Celebrations</span>
          </h1>
          <p className="ev-entry font-cormorant italic text-brand-text-muted mt-5 max-w-2xl" style={{ fontSize: 'clamp(1.1rem,1.8vw,1.5rem)' }}>
            Themed buffets, cultural shows, special dinners and our flagship Afri-Food Festival —
            each one a window into the heart of a different African community.
          </p>
        </div>
      </section>

      <KenteDivider />

      {/* Filter bar */}
      <div className="sticky top-[60px] z-40 bg-brand-dark/95 backdrop-blur-md border-b border-brand-dark-border/50">
        <div className="container-site py-4 flex gap-2 overflow-x-auto scrollbar-none">
          {TYPES.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={cn('shrink-0 font-inter text-[11px] uppercase tracking-widest px-5 py-2.5 border transition-all duration-300',
                filter === t ? 'bg-brand-orange text-brand-black border-brand-orange' : 'border-brand-dark-border text-brand-text-muted hover:border-brand-orange hover:text-brand-orange'
              )}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Events list */}
      <div className="container-site py-20">
        <div className="space-y-5">
          <AnimatePresence>
            {visible.map((ev) => (
              <motion.div key={ev.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}>
                <div
                  className={cn('border transition-all duration-400 overflow-hidden cursor-pointer',
                    ev.highlight ? 'border-brand-orange/50 hover:border-brand-orange' : 'border-brand-dark-border hover:border-brand-orange/40'
                  )}
                  onClick={() => setOpen(open === ev.id ? null : ev.id)}
                >
                  <div className="flex items-stretch">
                    {/* Color bar */}
                    <div className="w-1.5 shrink-0" style={{ backgroundColor: ev.color }} />

                    <div className="flex-1 p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                        {/* Date block */}
                        <div className="lg:w-52 shrink-0">
                          <p className="font-inter text-[11px] uppercase tracking-widest mb-1" style={{ color: ev.color }}>{ev.type}</p>
                          <p className="font-inter text-sm text-brand-cream">{ev.display}</p>
                          <p className="font-inter text-[12px] text-brand-text-muted mt-0.5">{ev.time}</p>
                        </div>

                        {/* Title */}
                        <div className="flex-1">
                          <h3 className="font-playfair text-xl lg:text-2xl text-brand-cream">{ev.title}</h3>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <span className="flex items-center gap-1.5 font-inter text-[11px] text-brand-text-muted">
                              <MapPin size={11} className="text-brand-orange" /> Kigali, Rwanda
                            </span>
                            <span className="flex items-center gap-1.5 font-inter text-[11px] text-brand-text-muted">
                              <Users size={11} className="text-brand-orange" /> {ev.capacity}
                            </span>
                            <span className="flex items-center gap-1.5 font-inter text-[11px] text-brand-text-muted">
                              <Clock size={11} className="text-brand-orange" /> {ev.time}
                            </span>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="shrink-0 flex items-center gap-3">
                          <ChevronRight size={18} className={cn('text-brand-text-muted transition-transform duration-300', open === ev.id ? 'rotate-90' : '')} />
                        </div>
                      </div>

                      {/* Expandable body */}
                      <AnimatePresence>
                        {open === ev.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}>
                            <div className="pt-6 mt-6 border-t border-brand-dark-border/50 flex flex-col lg:flex-row gap-8 items-start">
                              <p className="font-cormorant italic text-brand-text-light leading-relaxed flex-1" style={{ fontSize: '1.15rem' }}>{ev.desc}</p>
                              <Link href="/book" className="btn-primary text-xs px-8 py-3.5 shrink-0 inline-flex items-center gap-2">
                                Reserve for This Event
                                <ChevronRight size={13} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Monthly buffet calendar */}
      <section className="bg-brand-dark py-24">
        <KenteDivider animated={false} />
        <div className="container-site pt-16">
          <h2 className="font-playfair text-brand-cream text-3xl mb-12">Monthly Buffet Schedule</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {THEMED_BUFFETS.map((b, i) => (
              <div key={b.id} className="border border-brand-dark-border p-5 hover:border-opacity-0 transition-all duration-400 group"
                style={{ borderColor: 'inherit' }}>
                <div className="w-full h-1 mb-4" style={{ backgroundColor: b.color }} />
                <p className="font-inter text-[10px] text-brand-text-muted mb-1">Month {i + 1}</p>
                <h4 className="font-playfair text-sm text-brand-cream group-hover:text-brand-orange transition-colors duration-300">{b.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
