import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import '@/styles/globals.css'

const playfair  = Playfair_Display({ subsets:['latin'], variable:'--font-playfair', display:'swap', weight:['400','600','700','900'], style:['normal','italic'] })
const cormorant = Cormorant_Garamond({ subsets:['latin'], variable:'--font-cormorant', display:'swap', weight:['300','400','500','600'], style:['normal','italic'] })
const inter     = Inter({ subsets:['latin'], variable:'--font-inter', display:'swap' })

export const metadata: Metadata = {
  title: { default: 'Orisirisi Africa Limited', template: '%s | Orisirisi Africa' },
  description: 'Orisirisi Africa Limited is dedicated to celebrating and revitalising African cultural values, driving food tourism and fostering people-to-people connections across the continent.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="bg-brand-black text-brand-text-light antialiased">{children}</body>
    </html>
  )
}
