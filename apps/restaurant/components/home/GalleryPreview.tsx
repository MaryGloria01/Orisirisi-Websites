'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* Warm, colourful light-palette gradients — rich art tiles without photos */
const GALLERY_TILES = [
  { id: 1, label: 'Jollof Rice',   span: 'row-span-2', gradient: 'from-[#E8450A] via-[#C8380A] to-[#7A1E00]' },
  { id: 2, label: 'Dining Room',   span: '',           gradient: 'from-[#D4A017] via-[#B88A00] to-[#6B5000]' },
  { id: 3, label: 'Cultural Show', span: '',           gradient: 'from-[#2D7D32] via-[#1B5E20] to-[#0A3010]' },
  { id: 4, label: 'Tagine',        span: 'row-span-2', gradient: 'from-[#C0392B] via-[#962D23] to-[#4A1510]' },
  { id: 5, label: 'Chef at Work',  span: '',           gradient: 'from-[#F7941D] via-[#D4780A] to-[#7A4000]' },
  { id: 6, label: 'Nyama Choma',   span: '',           gradient: 'from-[#8E44AD] via-[#6C3483] to-[#3A1A4A]' },
]

export default function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.gallery-tile', {
      opacity: 0, scale: 0.94,
      stagger: 0.07, duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-surface py-24 md:py-32">
      <div className="container-site">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="kente-divider w-12 h-1" />
              <span className="eyebrow">Gallery</span>
            </div>
            <h2 className="font-playfair text-text-head text-section-lg leading-[1.05]">
              A Glimpse of{' '}
              <span className="italic text-brand-orange">the Experience</span>
            </h2>
          </div>
          <Link href="/gallery" className="btn-ghost text-xs px-6 py-3 inline-flex items-center gap-2.5 shrink-0">
            Full Gallery
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-3 h-[min(70vh,600px)]">
          {GALLERY_TILES.map(tile => (
            <div
              key={tile.id}
              className={cn('gallery-tile group relative overflow-hidden cursor-pointer', tile.span)}
            >
              {/* Colourful gradient art tile */}
              <div className={cn('absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105', tile.gradient)} />

              {/* Diagonal texture */}
              <div className="absolute inset-0 gallery-stripe-overlay opacity-[0.06] group-hover:opacity-[0.03] transition-opacity duration-500" />

              {/* Bottom vignette */}
              <div className="absolute inset-0 gallery-vignette" />

              {/* Label — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <p className="font-inter text-[11px] text-white/90 uppercase tracking-widest">{tile.label}</p>
              </div>

              {/* Centre icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 border border-white/60 flex items-center justify-center backdrop-blur-sm">
                  <ImageIcon size={16} className="text-white" />
                </div>
              </div>

              {/* Orange border ring on hover */}
              <div className="absolute inset-0 border border-brand-orange/0 group-hover:border-brand-orange/60 transition-all duration-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
