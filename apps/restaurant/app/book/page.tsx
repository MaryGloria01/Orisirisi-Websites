'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Clock, Users, MapPin, Phone, Mail, CheckCircle2, Send, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import KenteDivider from '@/components/ui/KenteDivider'

gsap.registerPlugin(useGSAP)

const TIME_SLOTS  = ['11:00', '12:00', '13:00', '14:00', '15:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']
const OCCASIONS   = ['No special occasion', 'Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Family Gathering', 'Celebration', 'Other']
const SEATING     = ['Indoor — Main Dining Room', 'Outdoor — Garden Terrace', 'Private Dining Room (groups 10+)', 'Bar Counter Seats', 'No preference']

interface Form {
  name: string; email: string; phone: string; date: string; time: string
  guests: string; occasion: string; seating: string; notes: string
}
const INIT: Form = { name:'', email:'', phone:'', date:'', time:'', guests:'2', occasion: OCCASIONS[0], seating: SEATING[4], notes:'' }

export default function BookPage() {
  const pageRef  = useRef<HTMLDivElement>(null)
  const [form, setForm]     = useState<Form>(INIT)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [step, setStep]     = useState<1 | 2>(1)

  useGSAP(() => {
    gsap.from('.book-entry', { opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.2 })
  }, { scope: pageRef })

  const up = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  const next = (e: React.FormEvent) => { e.preventDefault(); setStep(2) }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 2000))
    setStatus('success')
  }

  const inp = 'w-full bg-white/5 border border-brand-dark-border text-brand-text-light font-inter text-[13px] px-5 py-4 focus:outline-none focus:border-brand-orange transition-colors duration-300 placeholder:text-brand-text-muted/40'
  const sel = `${inp} cursor-pointer appearance-none`

  return (
    <div ref={pageRef} className="min-h-screen bg-brand-black">

      {/* ── Hero ── */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 70% 40%, rgba(247,148,29,0.1) 0%, transparent 55%), linear-gradient(to bottom, #141414, #0A0A0A)' }}
        />
        <div className="container-site relative">
          <span className="book-entry eyebrow block mb-4">Reservations</span>
          <h1 className="book-entry font-playfair text-brand-cream leading-[1.0]" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
            Secure Your Seat <br />
            <span className="italic text-brand-orange">at Africa's Table</span>
          </h1>
          <p className="book-entry font-cormorant italic text-brand-text-muted mt-5 max-w-xl" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}>
            Every seat is a front-row pass to Africa's greatest culinary performance.
          </p>
        </div>
      </section>

      <KenteDivider />

      {/* ── Main layout ── */}
      <section className="container-site py-24">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">

          {/* ── Left: Info column ── */}
          <aside className="xl:col-span-4 space-y-10">

            {/* Info tiles */}
            <div className="book-entry">
              <h3 className="eyebrow mb-6">Plan Your Visit</h3>
              <div className="space-y-4">
                {[
                  { icon: CalendarDays, title: 'Opening Days',  body: 'Tuesday through Sunday' },
                  { icon: Clock,        title: 'Service Hours', body: '11:00 – 22:00 daily\nBuffet: 12:00 – 15:00' },
                  { icon: Users,        title: 'Group Dining',  body: 'Private room available\nfor groups of 10 or more' },
                  { icon: MapPin,       title: 'Location',      body: 'Kigali, Rwanda\n(full address upon confirmation)' },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex gap-4 p-5 border border-brand-dark-border">
                    <div className="w-10 h-10 border border-brand-orange/30 shrink-0 flex items-center justify-center">
                      <Icon size={16} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="font-inter text-[11px] uppercase tracking-widest text-brand-text-muted mb-1">{title}</p>
                      <p className="font-inter text-sm text-brand-cream leading-snug whitespace-pre-line">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="book-entry border border-brand-dark-border p-7">
              <h3 className="eyebrow mb-5">Prefer to Call?</h3>
              <div className="space-y-3">
                <a href="tel:+250XXXXXXXXX" className="flex items-center gap-3 font-inter text-sm text-brand-text-light hover:text-brand-orange transition-colors duration-300">
                  <Phone size={14} className="text-brand-orange" />
                  +250 XXX XXX XXX
                </a>
                <a href="mailto:hello@orisirisiafricanrestaurant.com" className="flex items-center gap-3 font-inter text-sm text-brand-text-light hover:text-brand-orange transition-colors duration-300 break-all">
                  <Mail size={14} className="text-brand-orange" />
                  hello@orisirisiafricanrestaurant.com
                </a>
              </div>
            </div>

            {/* Policy note */}
            <div className="book-entry pl-4 border-l-2 border-brand-orange/40">
              <p className="font-inter text-[12px] text-brand-text-muted leading-relaxed">
                Reservations are held for 15 minutes past the booked time. Cancellations must be made at least 24 hours in advance.
                For groups of 10 or more, please contact us directly.
              </p>
            </div>
          </aside>

          {/* ── Right: Form ── */}
          <div className="xl:col-span-8">
            <div className="book-entry border border-brand-dark-border relative">
              {/* Corner marks */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-brand-orange" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-brand-orange" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-brand-orange" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-brand-orange" />

              {/* Step indicator */}
              {status !== 'success' && (
                <div className="flex border-b border-brand-dark-border">
                  {[1, 2].map(s => (
                    <button
                      key={s}
                      onClick={() => s < step && setStep(s as 1 | 2)}
                      className={cn(
                        'flex-1 py-5 font-inter text-[12px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5',
                        step === s
                          ? 'bg-brand-orange text-brand-black font-semibold'
                          : s < step
                            ? 'text-brand-orange cursor-pointer hover:bg-brand-dark-card'
                            : 'text-brand-text-muted cursor-default'
                      )}
                    >
                      <span className={cn('w-5 h-5 rounded-full border flex items-center justify-center text-[10px]',
                        step === s ? 'border-brand-black bg-brand-black text-brand-orange' : 'border-current'
                      )}>{s}</span>
                      {s === 1 ? 'Date & Time' : 'Your Details'}
                    </button>
                  ))}
                </div>
              )}

              <div className="p-10 md:p-14">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 py-20 text-center">
                      <CheckCircle2 size={56} className="text-brand-orange" />
                      <h3 className="font-playfair text-brand-cream text-3xl">Reservation Confirmed</h3>
                      <p className="font-cormorant italic text-brand-text-muted text-xl max-w-md">
                        We will send a confirmation to <span className="text-brand-orange">{form.email}</span>. We look forward to welcoming you.
                      </p>
                      <button onClick={() => { setForm(INIT); setStep(1); setStatus('idle') }} className="btn-ghost text-sm mt-4 px-8 py-3">
                        Make Another Reservation
                      </button>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.form key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={next} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="eyebrow text-[10px]">Date</label>
                          <input className={inp} type="date" required value={form.date} onChange={up('date')}
                            min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="space-y-2">
                          <label className="eyebrow text-[10px]">Time</label>
                          <select className={sel} required value={form.time} onChange={up('time')}>
                            <option value="" disabled>Select a time slot</option>
                            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="eyebrow text-[10px]">Number of Guests</label>
                          <select className={sel} value={form.guests} onChange={up('guests')}>
                            {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                            <option value="20+">20+ Guests</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="eyebrow text-[10px]">Seating Preference</label>
                          <select className={sel} value={form.seating} onChange={up('seating')}>
                            {SEATING.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="eyebrow text-[10px]">Occasion</label>
                        <select className={sel} value={form.occasion} onChange={up('occasion')}>
                          {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>

                      <button type="submit" className="btn-primary w-full justify-center py-5 text-sm mt-4">
                        Continue to Your Details
                        <ChevronRight size={15} />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.form key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={submit} className="space-y-6">
                      {/* Summary banner */}
                      <div className="bg-brand-dark-card border border-brand-orange/20 px-6 py-4 flex flex-wrap gap-6">
                        <div><p className="eyebrow text-[9px] mb-0.5">Date</p><p className="font-inter text-sm text-brand-cream">{form.date}</p></div>
                        <div><p className="eyebrow text-[9px] mb-0.5">Time</p><p className="font-inter text-sm text-brand-cream">{form.time}</p></div>
                        <div><p className="eyebrow text-[9px] mb-0.5">Guests</p><p className="font-inter text-sm text-brand-cream">{form.guests}</p></div>
                        <div><p className="eyebrow text-[9px] mb-0.5">Occasion</p><p className="font-inter text-sm text-brand-cream">{form.occasion}</p></div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="eyebrow text-[10px]">Full Name</label>
                          <input className={inp} type="text" required placeholder="Your full name" value={form.name} onChange={up('name')} />
                        </div>
                        <div className="space-y-2">
                          <label className="eyebrow text-[10px]">Phone Number</label>
                          <input className={inp} type="tel" placeholder="+250 XXX XXX XXX" value={form.phone} onChange={up('phone')} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="eyebrow text-[10px]">Email Address</label>
                        <input className={inp} type="email" required placeholder="your@email.com" value={form.email} onChange={up('email')} />
                      </div>

                      <div className="space-y-2">
                        <label className="eyebrow text-[10px]">Special Requests</label>
                        <textarea className={`${inp} resize-none`} rows={4}
                          placeholder="Dietary requirements, allergies, special arrangements, accessibility needs..."
                          value={form.notes} onChange={up('notes')} />
                      </div>

                      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center py-5 text-sm disabled:opacity-60">
                        {status === 'sending'
                          ? <span className="flex items-center gap-2.5"><Send size={15} className="animate-spin" />Sending...</span>
                          : <span className="flex items-center gap-2.5"><Send size={15} />Confirm Reservation</span>}
                      </button>
                      <p className="font-inter text-[11px] text-brand-text-muted text-center">
                        By confirming you agree to our reservation and cancellation policy.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
