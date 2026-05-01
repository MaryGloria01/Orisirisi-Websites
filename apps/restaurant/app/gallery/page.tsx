'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ZoomIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import KenteDivider from '@/components/ui/KenteDivider'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const CATS = ['All', 'Food', 'Ambience', 'Events', 'Cultural Shows', 'Buffets']

const GALLERY = [
  { id:  1, label: 'Jollof Rice — Plated',      cat: 'Food',           size: 'tall',   gradient: 'from-[#8B2500] via-[#B03A00] to-[#3D0F00]' },
  { id:  2, label: 'Main Dining Room',           cat: 'Ambience',       size: 'wide',   gradient: 'from-[#0D0D0D] via-[#1C1200] to-[#2A1800]' },
  { id:  3, label: 'Nyama Choma Grill',          cat: 'Food',           size: 'normal', gradient: 'from-[#3D1C00] via-[#6B3300] to-[#1A0A00]' },
  { id:  4, label: 'West Africa Buffet Night',   cat: 'Buffets',        size: 'normal', gradient: 'from-[#5C2800] via-[#8B3E00] to-[#2A1200]' },
  { id:  5, label: 'Traditional Drummers',       cat: 'Cultural Shows', size: 'wide',   gradient: 'from-[#1A0028] via-[#2E0042] to-[#0D0014]' },
  { id:  6, label: 'Moroccan Tagine',            cat: 'Food',           size: 'normal', gradient: 'from-[#2A1400] via-[#4A2500] to-[#1A0D00]' },
  { id:  7, label: 'Outdoor Terrace',            cat: 'Ambience',       size: 'tall',   gradient: 'from-[#001A0A] via-[#002E10] to-[#000D05]' },
  { id:  8, label: 'Afri-Food Festival 2024',    cat: 'Events',         size: 'wide',   gradient: 'from-[#3A1400] via-[#5C2000] to-[#1A0A00]' },
  { id:  9, label: 'Kenkey & Fried Fish',        cat: 'Food',           size: 'normal', gradient: 'from-[#001428] via-[#002040] to-[#000A14]' },
  { id: 10, label: 'Dance Performance',          cat: 'Cultural Shows', size: 'normal', gradient: 'from-[#280014] via-[#400022] to-[#14000A]' },
  { id: 11, label: 'Private Dining Room',        cat: 'Ambience',       size: 'normal', gradient: 'from-[#0A0A00] via-[#181400] to-[#050500]' },
  { id: 12, label: 'East Africa Buffet',         cat: 'Buffets',        size: 'tall',   gradient: 'from-[#001A0A] via-[#003318] to-[#000D05]' },
]

export default function GalleryPage() {
  const pageRef    = useRef<HTMLDivElement>(null)
  const [cat, setCat]     = useState('All')
  const [active, setActive] = useState<number | null>(null)

  useGSAP(() => {
    gsap.from('.gal-entry', { opacity: 0, y: 35, stagger: 0.07, duration: 0.8, ease: 'power3.out', delay: 0.2 })
  }, { scope: pageRef })

  const filtered = cat === 'All' ? GALLERY : GALLERY.filter(g => g.cat === cat)
  const activeItem = GALLERY.find(g => g.id === active)

  return (
    <div ref={pageRef} className="min-h-screen bg-brand-black">

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(247,148,29,0.08) 0%, transparent 55%), linear-gradient(to bottom, #141414, #0A0A0A)' }} />
        <div className="container-site relative">
          <span className="gal-entry eyebrow block mb-4">Gallery</span>
          <h1 className="gal-entry font-playfair text-brand-cream leading-[1.0]" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
            A Glimpse of{' '}
            <span className="italic text-brand-orange">the Experience</span>
          </h1>
          <p className="gal-entry font-cormorant italic text-brand-text-muted mt-5 max-w-xl" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>
            Moments from our dining room, cultural shows, special events and the dishes that tell Africa's story.
          </p>
        </div>
      </section>

      <KenteDivider />

      {/* Filter bar */}
      <div className="sticky top-[60px] z-40 bg-brand-dark/95 backdrop-blur-md border-b border-brand-dark-border/50">
        <div className="container-site py-4 flex gap-2 overflow-x-auto scrollbar-none">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={cn('shrink-0 font-inter text-[11px] uppercase tracking-widest px-5 py-2.5 border transition-all duration-300',
                cat === c ? 'bg-brand-orange text-brand-black border-brand-orange' : 'border-brand-dark-border text-brand-text-muted hover:border-brand-orange hover:text-brand-orange'
              )}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div className="container-site py-16">
        <motion.div layout className="columns-2 md:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  'break-inside-avoid mb-4 group relative cursor-zoom-in overflow-hidden',
                  item.size === 'tall' ? 'aspect-[3/4]' : item.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'
                )}
                onClick={() => setActive(item.id)}
              >
                <div className={cn('absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105', item.gradient)} />
                <div className="absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.4) 0px,rgba(255,255,255,0.4) 1px,transparent 1px,transparent 14px)' }} />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)' }} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/8 transition-all duration-400 flex items-center justify-center">
                  <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-inter text-[11px] uppercase tracking-widest text-brand-text-light">{item.label}</p>
                  <p className="font-inter text-[10px] text-brand-orange mt-0.5">{item.cat}</p>
                </div>

                <div className="absolute inset-0 border border-brand-orange/0 group-hover:border-brand-orange/40 transition-all duration-400" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full aspect-[4/3] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className={cn('absolute inset-0 bg-gradient-to-br', activeItem.gradient)} />
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <p className="eyebrow mb-1">{activeItem.cat}</p>
                  <h3 className="font-playfair text-white text-2xl">{activeItem.label}</h3>
                </div>
              </div>
              <button onClick={() => setActive(null)}
                className="absolute top-5 right-5 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:border-brand-orange hover:text-brand-orange transition-all duration-300">
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
