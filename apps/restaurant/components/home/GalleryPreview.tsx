'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const GALLERY_TILES = [
  { id: 1, label: 'Jollof Rice', aspect: 'row-span-2', gradient: 'from-[#8B2500] via-[#B03A00] to-[#3D0F00]' },
  { id: 2, label: 'Dining Room', aspect: '',           gradient: 'from-[#1A0A00] via-[#2A1500] to-[#0A0500]' },
  { id: 3, label: 'Cultural Show',aspect: '',          gradient: 'from-[#001A3A] via-[#002A5C] to-[#000D1A]' },
  { id: 4, label: 'Tagine',      aspect: 'row-span-2', gradient: 'from-[#3D1C00] via-[#6B3300] to-[#1A0A00]' },
  { id: 5, label: 'Chef at Work',aspect: '',           gradient: 'from-[#0A1A00] via-[#162900] to-[#050D00]' },
  { id: 6, label: 'Nyama Choma', aspect: '',           gradient: 'from-[#3A0000] via-[#5C1A00] to-[#1A0000]' },
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
    <section ref={sectionRef} className="relative bg-brand-black py-24 md:py-32">
      <div className="container-site">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="kente-divider w-12" style={{ height: 4 }} />
              <span className="eyebrow">Gallery</span>
            </div>
            <h2 className="font-playfair text-brand-cream leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}>
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
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-3" style={{ height: 'min(70vh, 600px)' }}>
          {GALLERY_TILES.map((tile, i) => (
            <div
              key={tile.id}
              className={cn(
                'gallery-tile group relative overflow-hidden cursor-pointer',
                tile.aspect,
              )}
            >
              {/* Image placeholder — replace with real images */}
              <div className={cn('absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105', tile.gradient)} />

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.02] transition-opacity duration-500"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg,rgba(255,255,255,0.4) 0px,rgba(255,255,255,0.4) 1px,transparent 1px,transparent 14px)`,
                }}
              />

              {/* Vignette */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                <p className="font-inter text-[11px] text-brand-text-light uppercase tracking-widest">{tile.label}</p>
              </div>

              {/* Center icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 border border-white/60 flex items-center justify-center backdrop-blur-sm">
                  <ImageIcon size={16} className="text-white" />
                </div>
              </div>

              {/* Orange ring on hover */}
              <div className="absolute inset-0 border border-brand-orange/0 group-hover:border-brand-orange/50 transition-all duration-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
