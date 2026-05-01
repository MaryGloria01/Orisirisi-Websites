import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import '@/styles/globals.css'

const playfair  = Playfair_Display({ subsets:['latin'], variable:'--font-playfair', display:'swap', weight:['400','600','700','900'], style:['normal','italic'] })
const cormorant = Cormorant_Garamond({ subsets:['latin'], variable:'--font-cormorant', display:'swap', weight:['300','400','500','600'], style:['normal','italic'] })
const inter     = Inter({ subsets:['latin'], variable:'--font-inter', display:'swap' })

export const metadata: Metadata = {
  title: { default: 'AfriXpressions — A Renaissance of Everything African', template: '%s | AfriXpressions' },
  description: 'AfriXpressions is an Afro-centric integrative cultural hub in Kigali, Rwanda — where Africans and lovers of Africa come together to celebrate, share and explore the continent\'s rich heritage.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="bg-brand-black text-brand-text-light antialiased">{children}</body>
    </html>
  )
}
