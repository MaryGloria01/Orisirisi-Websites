import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'

const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-playfair',
  display:  'swap',
  weight:   ['400', '500', '600', '700', '800', '900'],
  style:    ['normal', 'italic'],
})

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  variable: '--font-cormorant',
  display:  'swap',
  weight:   ['300', '400', '500', '600'],
  style:    ['normal', 'italic'],
})

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

export const metadata: Metadata = {
  title: {
    default:  'Orisirisi African Restaurant — Kigali, Rwanda',
    template: '%s | Orisirisi African Restaurant',
  },
  description:
    'Orisirisi African Restaurant is the go-to destination for authentic African cuisine in Kigali, Rwanda. Explore dishes from all 54 African nations, monthly themed buffets, cultural shows, and the annual Afri-Food Festival.',
  keywords: [
    'African restaurant Kigali', 'African cuisine Rwanda', 'Jollof rice Rwanda',
    'African food Kigali', 'Orisirisi restaurant', 'themed buffet Kigali',
    'cultural dining Rwanda', 'African food tourism',
  ],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    siteName:    'Orisirisi African Restaurant',
    title:       'Orisirisi African Restaurant — Every Meal is a Journey Through Africa',
    description: 'Authentic African cuisine from all 54 nations. Pioneer branch in Kigali, Rwanda.',
  },
  twitter: {
    card:  'summary_large_image',
    title: 'Orisirisi African Restaurant',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#F7941D',
  width:      'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="bg-surface text-text-head antialiased">
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
