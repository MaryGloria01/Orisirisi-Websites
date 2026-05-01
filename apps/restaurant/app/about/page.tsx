'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import KenteDivider from '@/components/ui/KenteDivider'
import { SITE } from '@/lib/constants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const VALUES = [
  { title: 'Authenticity',   desc: 'Every dish is researched, sourced and prepared to honour its cultural origins. We never compromise on genuineness.' },
  { title: 'Education',      desc: 'We explain every menu item — its history, cultural context and the people who created it. A meal is a lesson.' },
  { title: 'Community',      desc: 'We celebrate the brotherhood concept central to African socio-cultural frameworks — sharing a table is sharing life.' },
  { title: 'Excellence',     desc: 'World-class culinary standards applied to African cuisine. The continent deserves the finest expression of its food.' },
]

const MILESTONES = [
  { year: '2022', title: 'Orisirisi Africa Founded',    desc: 'Orisirisi Africa Limited established in Kigali, Rwanda with a vision for continental food tourism and cultural celebration.' },
  { year: '2023', title: 'Concept Development',         desc: 'Restaurant concept designed, team assembled, and the mission to bring 54 African cuisines under one roof formalised.' },
  { year: '2024', title: 'Restaurant Opens',            desc: 'Orisirisi African Restaurant opens its doors in Kigali — the pioneer branch of what will become a pan-African dining institution.' },
  { year: '2025', title: 'First Afri-Food Festival',    desc: 'The inaugural Afri-Food Festival unites culinary talent, cultural performers and food enthusiasts from across the continent.' },
  { year: '2026', title: 'AfriXpressions Hub',          desc: 'The AfriXpressions cultural hub breaks ground — a permanent home for African cultural heritage, art and storytelling.' },
]

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.ab-entry', { opacity: 0, y: 35, stagger: 0.09, duration: 0.9, ease: 'power3.out', delay: 0.2 })
    gsap.from('.milestone-item', {
      opacity: 0, x: -30,
      stagger: 0.12, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.milestones', start: 'top 75%' },
    })
    gsap.from('.value-card', {
      opacity: 0, y: 30,
      stagger: 0.1, duration: 0.75, ease: 'power3.out',
      scrollTrigger: { trigger: '.values-grid', start: 'top 75%' },
    })
  }, { scope: pageRef })

  return (
    <div ref={pageRef} className="min-h-screen bg-brand-black">

      {/* Hero */}
      <section className="relative pt-44 pb-28 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 60%, rgba(92,58,30,0.2) 0%, transparent 55%), linear-gradient(to bottom, #141414, #0A0A0A)' }} />
        <div className="container-site relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="ab-entry eyebrow block mb-5">Our Story</span>
            <h1 className="ab-entry font-playfair text-brand-cream leading-[1.0]" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
              A Sub-Unit of <br />
              <span className="italic text-brand-orange">Orisirisi Africa</span>
            </h1>
            <p className="ab-entry font-cormorant italic text-brand-text-muted mt-6 leading-relaxed" style={{ fontSize: 'clamp(1.1rem,1.8vw,1.5rem)' }}>
              We are more than a restaurant. We are a cultural institution —
              celebrating, preserving and sharing Africa's richest traditions through the universal language of food.
            </p>
          </div>
          <div className="ab-entry relative aspect-square max-w-sm ml-auto">
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse, rgba(247,148,29,0.15), transparent 65%), linear-gradient(135deg, #1C0800, #0A0A0A)', clipPath: 'polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-10 text-center">
              <p className="font-playfair text-6xl font-bold text-brand-orange leading-none">54</p>
              <p className="eyebrow">Nations. One Table.</p>
              <div className="w-12 kente-divider my-2" style={{ height: 3 }} />
              <p className="font-cormorant italic text-brand-text-muted text-xl">Pioneer Branch, Kigali, Rwanda</p>
            </div>
          </div>
        </div>
      </section>

      <KenteDivider />

      {/* Mission & Vision */}
      <section className="bg-brand-cream py-24">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[
            { label: 'Mission', title: 'Why We Exist',
              text: 'To advance social integration and foster people-to-people interactions across Africa through continental food tourism, cultural dining hubs and social- and culture-driven events that support cultural expression and African storytelling.' },
            { label: 'Vision',  title: 'Where We Are Going',
              text: 'To become Africa\'s leading private-sector–driven platform for telling African stories, celebrating cultural expressions, nurturing affinity and creating vibrant meeting points for Africans and friends of Africa worldwide.' },
          ].map(({ label, title, text }) => (
            <div key={label} className="p-10 border border-brand-cream-warm relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-orange" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange" />
              <p className="eyebrow mb-4" style={{ color: '#5C3A1E' }}>{label}</p>
              <h2 className="font-playfair text-brand-black text-2xl mb-5">{title}</h2>
              <p className="font-cormorant italic text-brand-earth leading-relaxed" style={{ fontSize: '1.2rem' }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-brand-black py-24">
        <div className="container-site">
          <h2 className="font-playfair text-brand-cream text-3xl mb-14">What We Stand For</h2>
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="value-card border border-brand-dark-border p-8 hover:border-brand-orange/40 transition-all duration-400 group">
                <div className="w-10 h-0.5 bg-brand-orange mb-6 group-hover:w-full transition-all duration-500" />
                <h3 className="font-playfair text-xl text-brand-cream mb-3 group-hover:text-brand-orange transition-colors duration-300">{v.title}</h3>
                <p className="font-inter text-sm text-brand-text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-brand-dark py-24">
        <div className="container-site">
          <h2 className="font-playfair text-brand-cream text-3xl mb-16">Our Journey</h2>
          <div className="milestones relative">
            {/* Vertical line */}
            <div className="absolute left-[88px] top-0 bottom-0 w-[1px] bg-brand-dark-border" />
            <div className="space-y-0">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="milestone-item flex gap-10 relative pb-12 last:pb-0">
                  <div className="w-[88px] shrink-0 flex justify-end pt-1">
                    <span className="font-playfair text-lg font-bold text-brand-orange">{m.year}</span>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-[84px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-orange border-2 border-brand-black" />
                  <div className="flex-1 pl-8">
                    <h3 className="font-playfair text-xl text-brand-cream mb-2">{m.title}</h3>
                    <p className="font-inter text-sm text-brand-text-muted leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Orisirisi Africa link */}
      <section className="bg-brand-cream py-20">
        <KenteDivider animated={false} />
        <div className="container-site pt-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="eyebrow mb-3" style={{ color: '#5C3A1E' }}>Part of a Bigger Story</p>
            <h2 className="font-playfair text-brand-black text-3xl">Orisirisi Africa Limited</h2>
            <p className="font-inter text-brand-earth mt-3 max-w-lg text-sm leading-relaxed">
              Our parent platform is dedicated to reviving African cultural values, promoting cross-continental collaboration and driving food tourism across the continent. The restaurant is just the beginning.
            </p>
          </div>
          <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer"
            className="btn-ghost border-brand-earth text-brand-earth hover:border-brand-orange hover:text-brand-orange inline-flex items-center gap-3 px-8 py-4 text-sm shrink-0">
            Visit Orisirisi Africa
            <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </div>
  )
}
