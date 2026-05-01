'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Instagram, Facebook, Twitter } from 'lucide-react'
import KenteDivider from '@/components/ui/KenteDivider'
import { SITE } from '@/lib/constants'

gsap.registerPlugin(useGSAP)

interface Form { name: string; email: string; subject: string; message: string }
const INIT: Form = { name: '', email: '', subject: '', message: '' }

export default function ContactPage() {
  const pageRef   = useRef<HTMLDivElement>(null)
  const [form, setForm]     = useState<Form>(INIT)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  useGSAP(() => {
    gsap.from('.ct-entry', { opacity: 0, y: 35, stagger: 0.09, duration: 0.9, ease: 'power3.out', delay: 0.2 })
  }, { scope: pageRef })

  const up = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
  }

  const inp = 'w-full bg-white/5 border border-brand-dark-border text-brand-text-light font-inter text-[13px] px-5 py-4 focus:outline-none focus:border-brand-orange transition-colors duration-300 placeholder:text-brand-text-muted/40'

  return (
    <div ref={pageRef} className="min-h-screen bg-brand-black">

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 15% 50%, rgba(247,148,29,0.1) 0%, transparent 55%), linear-gradient(to bottom, #141414, #0A0A0A)' }} />
        <div className="container-site relative">
          <span className="ct-entry eyebrow block mb-4">Get in Touch</span>
          <h1 className="ct-entry font-playfair text-brand-cream leading-[1.0]" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
            We'd Love to{' '}
            <span className="italic text-brand-orange">Hear From You</span>
          </h1>
          <p className="ct-entry font-cormorant italic text-brand-text-muted mt-5 max-w-xl" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>
            Reservations, events, partnerships or just to say hello — our team is always ready.
          </p>
        </div>
      </section>

      <KenteDivider />

      <section className="container-site py-24">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">

          {/* Left info column */}
          <aside className="xl:col-span-4 space-y-8">
            <div className="ct-entry">
              <h3 className="eyebrow mb-7">Contact Details</h3>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address',  value: 'Kigali, Rwanda', link: null },
                  { icon: Phone,  label: 'Phone',    value: SITE.phone,       link: `tel:${SITE.phone}` },
                  { icon: Mail,   label: 'Email',    value: SITE.email,       link: `mailto:${SITE.email}` },
                  { icon: Clock,  label: 'Hours',    value: 'Tue–Sun: 11:00 – 22:00', link: null },
                ].map(({ icon: Icon, label, value, link }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-brand-orange/30 shrink-0 flex items-center justify-center mt-0.5">
                      <Icon size={15} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="font-inter text-[10px] uppercase tracking-widest text-brand-text-muted mb-0.5">{label}</p>
                      {link
                        ? <a href={link} className="font-inter text-sm text-brand-cream hover:text-brand-orange transition-colors duration-300">{value}</a>
                        : <p className="font-inter text-sm text-brand-cream">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ct-entry">
              <h3 className="eyebrow mb-5">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: 'Instagram', href: '#' },
                  { icon: Facebook,  label: 'Facebook',  href: '#' },
                  { icon: Twitter,   label: 'Twitter/X', href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-11 h-11 border border-brand-dark-border flex items-center justify-center text-brand-text-muted hover:border-brand-orange hover:text-brand-orange transition-all duration-300">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="ct-entry">
              <div
                className="w-full aspect-video border border-brand-dark-border flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #141400, #001A0D, #0A0014)' }}
              >
                <div className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(247,148,29,0.4) 20px,rgba(247,148,29,0.4) 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(247,148,29,0.3) 20px,rgba(247,148,29,0.3) 21px)' }}
                />
                <MapPin size={28} className="text-brand-orange" />
                <p className="font-inter text-[12px] text-brand-text-muted text-center px-6">
                  Map integration coming soon.<br />Kigali, Rwanda.
                </p>
              </div>
            </div>
          </aside>

          {/* Right — contact form */}
          <div className="xl:col-span-8">
            <div className="ct-entry border border-brand-dark-border relative p-10 md:p-14">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-brand-orange" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-brand-orange" />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-5 py-16 text-center">
                    <CheckCircle2 size={52} className="text-brand-orange" />
                    <h3 className="font-playfair text-brand-cream text-3xl">Message Received</h3>
                    <p className="font-cormorant italic text-brand-text-muted text-xl max-w-sm">
                      Thank you for reaching out. A member of our team will respond within 24 hours.
                    </p>
                    <button onClick={() => { setForm(INIT); setStatus('idle') }} className="btn-ghost text-sm mt-4 px-8 py-3">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} className="space-y-6">
                    <div className="mb-8">
                      <h2 className="font-playfair text-brand-cream text-2xl mb-2">Send a Message</h2>
                      <p className="font-inter text-sm text-brand-text-muted">
                        For reservations we recommend using our <a href="/book" className="text-brand-orange hover:underline">dedicated booking page</a>.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="eyebrow text-[10px]">Your Name</label>
                        <input className={inp} type="text" required placeholder="Full name" value={form.name} onChange={up('name')} />
                      </div>
                      <div className="space-y-2">
                        <label className="eyebrow text-[10px]">Email Address</label>
                        <input className={inp} type="email" required placeholder="your@email.com" value={form.email} onChange={up('email')} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="eyebrow text-[10px]">Subject</label>
                      <select className={`${inp} cursor-pointer appearance-none`} value={form.subject} onChange={up('subject')} required>
                        <option value="" disabled>Select a subject</option>
                        {['General Enquiry', 'Private Event / Catering', 'Partnership / Collaboration', 'Media & Press', 'Feedback', 'Other'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="eyebrow text-[10px]">Message</label>
                      <textarea className={`${inp} resize-none`} rows={7} required
                        placeholder="Write your message here..."
                        value={form.message} onChange={up('message')} />
                    </div>

                    <button type="submit" disabled={status === 'sending'}
                      className="btn-primary w-full justify-center py-5 text-sm disabled:opacity-60">
                      {status === 'sending'
                        ? <span className="flex items-center gap-2.5"><Send size={15} className="animate-spin" />Sending...</span>
                        : <span className="flex items-center gap-2.5"><Send size={15} />Send Message</span>}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
