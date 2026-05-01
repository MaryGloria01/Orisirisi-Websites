'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getCountryFlag } from '@/lib/utils'
import KenteDivider from '@/components/ui/KenteDivider'
import Link from 'next/link'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const REGIONS = ['All', 'West Africa', 'East Africa', 'North Africa', 'Southern Africa', 'Central Africa', 'Diaspora', 'Drinks']

const MENU_ITEMS = [
  /* West Africa */
  { id: 1,  name: 'Signature Jollof Rice',      region: 'West Africa',   country: 'Nigeria',  flag: 'NG', cat: 'Mains',    price: '14,000', desc: 'Slow-cooked party jollof with smoky base, seasoned tomato sauce, choice of chicken or goat.' },
  { id: 2,  name: 'Egusi Soup & Fufu',           region: 'West Africa',   country: 'Nigeria',  flag: 'NG', cat: 'Mains',    price: '16,000', desc: 'Melon seed soup, palm oil, leafy greens, assorted meat and stockfish. Served with pounded yam or fufu.' },
  { id: 3,  name: 'Pepper Soup',                 region: 'West Africa',   country: 'Nigeria',  flag: 'NG', cat: 'Starters', price: '10,000', desc: 'Bold, aromatic goat-meat broth with native spices and scent leaves.' },
  { id: 4,  name: 'Kenkey & Fried Fish',          region: 'West Africa',   country: 'Ghana',    flag: 'GH', cat: 'Mains',    price: '13,000', desc: 'Fermented corn dumpling served with whole fried tilapia and spicy pepper-groundnut sauce.' },
  { id: 5,  name: 'Waakye',                       region: 'West Africa',   country: 'Ghana',    flag: 'GH', cat: 'Mains',    price: '11,000', desc: 'Rice and beans with shito, gari, fried plantain, boiled egg and meat of choice.' },
  { id: 6,  name: 'Thiéboudienne',               region: 'West Africa',   country: 'Senegal',  flag: 'SN', cat: 'Mains',    price: '15,000', desc: 'Senegal\'s national dish — fish and rice cooked in rich tomato and tamarind broth.' },
  /* East Africa */
  { id: 7,  name: 'Nyama Choma Platter',         region: 'East Africa',   country: 'Rwanda',   flag: 'RW', cat: 'Grills',   price: '22,000', desc: 'Slow-roasted goat marinated in East African spices. Served with kachumbari, chapati and ugali.' },
  { id: 8,  name: 'Pilau Rice',                  region: 'East Africa',   country: 'Kenya',    flag: 'KE', cat: 'Mains',    price: '12,000', desc: 'Spiced rice with whole spices, caramelised onion, slow-braised beef.' },
  { id: 9,  name: 'Injera & Doro Wat',           region: 'East Africa',   country: 'Ethiopia', flag: 'ET', cat: 'Mains',    price: '17,000', desc: 'Spongy teff flatbread served with Ethiopian chicken stew and berbere spice blend.' },
  { id: 10, name: 'Matoke',                       region: 'East Africa',   country: 'Uganda',   flag: 'UG', cat: 'Sides',    price: '8,000',  desc: 'Steamed green bananas in a spiced groundnut and tomato sauce.' },
  /* North Africa */
  { id: 11, name: 'Aromatic Lamb Tagine',        region: 'North Africa',  country: 'Morocco',  flag: 'MA', cat: 'Mains',    price: '21,000', desc: 'Tender lamb slow-braised with ras el hanout, preserved lemon, olives and honey. Served with couscous.' },
  { id: 12, name: 'Chicken Bastilla',            region: 'North Africa',  country: 'Morocco',  flag: 'MA', cat: 'Mains',    price: '18,000', desc: 'Flaky pastilla filled with spiced chicken, almonds, egg and a dusting of cinnamon and icing sugar.' },
  { id: 13, name: 'Shakshuka',                   region: 'North Africa',  country: 'Tunisia',  flag: 'TN', cat: 'Starters', price: '10,000', desc: 'Poached eggs in a rich cumin-spiced tomato and pepper sauce with fresh herbs.' },
  /* Southern Africa */
  { id: 14, name: 'Braai Mixed Platter',         region: 'Southern Africa',country: 'S. Africa',flag: 'ZA', cat: 'Grills',   price: '24,000', desc: 'Boerewors, lamb chops and chicken sosaties from the open fire. Served with pap, chakalaka and coleslaw.' },
  { id: 15, name: 'Pap & Chakalaka',             region: 'Southern Africa',country: 'S. Africa',flag: 'ZA', cat: 'Sides',    price: '7,000',  desc: 'Creamy maize porridge with spicy bean and vegetable relish.' },
  /* Central Africa */
  { id: 16, name: 'Ndolé',                       region: 'Central Africa', country: 'Cameroon', flag: 'CM', cat: 'Mains',    price: '16,000', desc: 'Bitter leaf stew slow-cooked with peanuts, crayfish and smoked fish or beef.' },
  { id: 17, name: 'Poulet DG',                   region: 'Central Africa', country: 'Cameroon', flag: 'CM', cat: 'Mains',    price: '18,000', desc: 'Director General\'s chicken — fried chicken with plantain, vegetables in rich tomato sauce.' },
  /* Diaspora */
  { id: 18, name: 'Afro Fusion Jerk Chicken',   region: 'Diaspora',       country: 'Caribbean',flag: 'JM', cat: 'Mains',    price: '16,000', desc: 'Scotch-bonnet marinated chicken, chargrilled, served with rice and peas and festival dumpling.' },
  /* Drinks */
  { id: 19, name: 'Zobo Hibiscus Cooler',        region: 'Drinks',         country: 'Nigeria',  flag: 'NG', cat: 'Drinks',   price: '4,500',  desc: 'Chilled hibiscus flower drink with ginger, pineapple and honey. Non-alcoholic.' },
  { id: 20, name: 'Tamarind Ginger Lemonade',    region: 'Drinks',         country: 'East Africa',flag:'KE', cat: 'Drinks',   price: '4,500',  desc: 'House-pressed tamarind with fresh ginger, lemon and a pinch of chilli.' },
  { id: 21, name: 'Spiced Rooibos Tea',          region: 'Drinks',         country: 'S. Africa',flag: 'ZA', cat: 'Drinks',   price: '3,500',  desc: 'South African rooibos brewed with cinnamon, cardamom, cloves and steamed milk.' },
  { id: 22, name: 'Fresh Fruit Smoothie',        region: 'Drinks',         country: 'Pan-Africa',flag:'NG', cat: 'Drinks',   price: '5,000',  desc: 'Daily selection of fresh-pressed tropical fruits. Ask your server for today\'s blend.' },
]

export default function MenuPage() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [query, setQuery]               = useState('')
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.menu-hero-text', {
      opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.2,
    })
  }, { scope: pageRef })

  const filtered = MENU_ITEMS.filter(item => {
    const matchRegion = activeRegion === 'All' || item.region === activeRegion
    const matchQuery  = query === '' || item.name.toLowerCase().includes(query.toLowerCase()) || item.country.toLowerCase().includes(query.toLowerCase())
    return matchRegion && matchQuery
  })

  const categories = [...new Set(filtered.map(i => i.cat))]

  return (
    <div ref={pageRef} className="min-h-screen bg-brand-black">

      {/* ── Page Hero ── */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(247,148,29,0.12) 0%, transparent 55%), linear-gradient(to bottom, #141414, #0A0A0A)' }}
        />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(247,148,29,0.5) 18px,rgba(247,148,29,0.5) 19px),repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(247,148,29,0.3) 18px,rgba(247,148,29,0.3) 19px)' }}
        />
        <div className="container-site relative">
          <span className="menu-hero-text eyebrow block mb-5">The Menu</span>
          <h1 className="menu-hero-text font-playfair text-brand-cream leading-[1.0]" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
            Taste the{' '}
            <span className="italic text-brand-orange">Entire Continent</span>
          </h1>
          <p className="menu-hero-text font-cormorant text-brand-text-muted mt-5 max-w-xl leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>
            Every dish carries a story of land, people, and tradition — from Lagos to Marrakech, Accra to Johannesburg.
          </p>
        </div>
      </section>

      <KenteDivider />

      {/* ── Filters bar ── */}
      <div className="sticky top-[60px] z-40 bg-brand-dark/95 backdrop-blur-md border-b border-brand-dark-border/50">
        <div className="container-site py-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">

          {/* Region tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={cn(
                  'shrink-0 font-inter text-[11px] uppercase tracking-widest px-5 py-2.5 border transition-all duration-300 whitespace-nowrap',
                  activeRegion === r
                    ? 'bg-brand-orange text-brand-black border-brand-orange'
                    : 'border-brand-dark-border text-brand-text-muted hover:border-brand-orange hover:text-brand-orange'
                )}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative shrink-0 lg:w-72">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-muted" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search dishes or country..."
              className="w-full bg-brand-dark-card border border-brand-dark-border text-brand-text-light font-inter text-[13px] pl-10 pr-4 py-2.5 focus:outline-none focus:border-brand-orange transition-colors duration-300 placeholder:text-brand-text-muted/40"
            />
          </div>
        </div>
      </div>

      {/* ── Menu items by category ── */}
      <div className="container-site py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion + query}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {categories.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-cormorant italic text-brand-text-muted text-2xl">No dishes found.</p>
              </div>
            ) : (
              categories.map(cat => (
                <div key={cat} className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-playfair text-2xl text-brand-cream">{cat}</h2>
                    <div className="flex-1 h-[1px] bg-brand-dark-border" />
                    <span className="font-inter text-[11px] text-brand-text-muted">
                      {filtered.filter(i => i.cat === cat).length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {filtered.filter(i => i.cat === cat).map((item, idx) => (
                      <div
                        key={item.id}
                        className={cn(
                          'group flex gap-5 p-6 border-b border-brand-dark-border hover:bg-brand-dark-card transition-all duration-300',
                          idx % 2 === 0 ? 'lg:border-r' : ''
                        )}
                      >
                        {/* Gradient swatch */}
                        <div className="w-20 h-20 shrink-0 relative overflow-hidden">
                          <div className="absolute inset-0"
                            style={{ background: `linear-gradient(135deg, hsl(${item.id * 22 % 360}, 60%, 25%), hsl(${item.id * 22 % 360}, 40%, 12%))` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-2xl">
                            {getCountryFlag(item.flag)}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1.5">
                            <h3 className="font-playfair text-lg text-brand-cream group-hover:text-brand-orange transition-colors duration-300 leading-tight">
                              {item.name}
                            </h3>
                            <span className="font-inter text-sm text-brand-orange font-semibold shrink-0">
                              RWF {item.price}
                            </span>
                          </div>
                          <p className="font-inter text-[11px] text-brand-orange uppercase tracking-widest mb-2">
                            {item.country} · {item.region}
                          </p>
                          <p className="font-cormorant italic text-brand-text-muted leading-snug" style={{ fontSize: '1.05rem' }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom CTA ── */}
      <section className="bg-brand-dark py-24 text-center">
        <KenteDivider />
        <div className="container-site pt-16">
          <p className="font-cormorant italic text-brand-text-muted text-2xl mb-3">Ready to experience the continent?</p>
          <h2 className="font-playfair text-brand-cream text-4xl mb-8">Reserve Your Table</h2>
          <Link href="/book" className="btn-primary inline-flex items-center gap-3 px-12 py-5 text-sm">
            Book Now
            <ChevronRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
