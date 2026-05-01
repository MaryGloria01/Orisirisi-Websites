import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react'
import KenteDivider from '@/components/ui/KenteDivider'
import { NAV_LINKS, SITE } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-black border-t border-brand-dark-border/40">
      <KenteDivider animated={false} />

      <div className="container-site py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/home" className="inline-flex flex-col leading-none mb-6">
              <span className="font-playfair text-2xl font-bold text-brand-cream">ORISIRISI</span>
              <span className="font-inter text-[9px] font-medium text-brand-orange tracking-[0.28em] uppercase mt-0.5">
                African Restaurant
              </span>
            </Link>
            <p className="font-cormorant text-brand-text-muted text-lg leading-relaxed mb-8 italic">
              "Every meal is a journey through Africa's diverse flavours."
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Facebook,  href: '#', label: 'Facebook' },
                { Icon: Twitter,   href: '#', label: 'Twitter / X' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-brand-dark-border flex items-center justify-center text-brand-text-muted hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="eyebrow mb-6">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-brand-text-muted hover:text-brand-orange transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-[1px] bg-brand-dark-border group-hover:bg-brand-orange group-hover:w-6 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Platforms */}
          <div>
            <h4 className="eyebrow mb-6">Our Platforms</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={SITE.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <p className="font-inter text-sm text-brand-cream group-hover:text-brand-orange transition-colors duration-300">Orisirisi Africa</p>
                  <p className="font-inter text-xs text-brand-text-muted mt-0.5">The parent platform</p>
                </a>
              </li>
              <li>
                <a
                  href={SITE.hubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <p className="font-inter text-sm text-brand-cream group-hover:text-brand-orange transition-colors duration-300">AfriXpressions</p>
                  <p className="font-inter text-xs text-brand-text-muted mt-0.5">Cultural hub · Kigali</p>
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="eyebrow mb-4">Opening Hours</h4>
              <div className="space-y-1.5 font-inter text-sm text-brand-text-muted">
                <p>Monday – Friday: 11:00 – 22:00</p>
                <p>Saturday: 10:00 – 23:00</p>
                <p>Sunday: 10:00 – 21:00</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-brand-orange mt-0.5 shrink-0" />
                <span className="font-inter text-sm text-brand-text-muted leading-relaxed">{SITE.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brand-orange shrink-0" />
                <a href={`tel:${SITE.phone}`} className="font-inter text-sm text-brand-text-muted hover:text-brand-orange transition-colors duration-300">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brand-orange shrink-0" />
                <a href={`mailto:${SITE.email}`} className="font-inter text-sm text-brand-text-muted hover:text-brand-orange transition-colors duration-300 break-all">
                  {SITE.email}
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                href="/book"
                className="btn-primary text-xs px-6 py-3 w-full justify-center"
              >
                Reserve Your Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-dark-border/30">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-[11px] text-brand-text-muted">
            &copy; {year} Orisirisi African Restaurant. A sub-unit of Orisirisi Africa Limited.
          </p>
          <div className="flex gap-5">
            <Link href="#" className="font-inter text-[11px] text-brand-text-muted hover:text-brand-orange transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="font-inter text-[11px] text-brand-text-muted hover:text-brand-orange transition-colors duration-300">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
