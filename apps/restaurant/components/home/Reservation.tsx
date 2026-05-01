'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, Clock, Users, CheckCircle2, Send } from 'lucide-react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface FormState { name: string; email: string; phone: string; date: string; time: string; guests: string; notes: string }
const INITIAL: FormState = { name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' }

const TIME_SLOTS = ['11:00', '12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00']

const inputClass = [
  'w-full bg-white border border-[rgba(92,58,30,0.18)] text-text-head font-inter text-sm px-4 py-3.5',
  'focus:outline-none focus:border-brand-orange transition-colors duration-300',
  'placeholder:text-text-muted/50',
].join(' ')

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm]     = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useGSAP(() => {
    gsap.from('.res-left', {
      opacity: 0, x: -50, duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
    })
    gsap.from('.res-right', {
      opacity: 0, x: 50, duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
    })
  }, { scope: sectionRef })

  const update = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    /* Production: integrate EmailJS with service/template IDs */
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
    setTimeout(() => { setForm(INITIAL); setStatus('idle') }, 4000)
  }

  return (
    <section ref={sectionRef} className="relative bg-surface-tint py-24 md:py-36 overflow-hidden" id="reserve">
      <div className="absolute inset-0 pointer-events-none glow-orange-left" />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div className="res-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="kente-divider w-12 h-1" />
              <span className="eyebrow">Reservations</span>
            </div>
            <h2 className="font-playfair text-text-head text-section-xl leading-[1.05] mb-6">
              Reserve Your <br />
              <span className="italic text-brand-orange">Table Today</span>
            </h2>
            <p className="font-cormorant text-text-muted text-xl leading-relaxed italic mb-10">
              Every seat at Orisirisi is a front-row pass to Africa's greatest culinary performance.
              Secure yours before it's taken.
            </p>

            {/* Info tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: CalendarDays, label: 'Open Daily',     sub: 'Tue–Sun 11am–10pm' },
                { icon: Clock,        label: 'Buffet Hours',   sub: 'Daily 12pm – 3pm' },
                { icon: Users,        label: 'Private Events', sub: 'Groups up to 80' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="res-info-card bg-white p-5 flex flex-col gap-2 shadow-card">
                  <Icon size={18} className="text-brand-orange" />
                  <p className="font-inter text-sm text-text-head font-medium">{label}</p>
                  <p className="font-inter text-[11px] text-text-muted">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="res-right">
            <div className="res-form-wrap bg-white p-8 md:p-10 shadow-card">
              {/* Corner adinkra marks */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-orange" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange" />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                  >
                    <CheckCircle2 size={48} className="text-brand-orange" />
                    <h3 className="font-playfair text-2xl text-text-head">Reservation Received</h3>
                    <p className="font-inter text-sm text-text-muted max-w-xs">
                      We will confirm your table within 2 hours. Look forward to welcoming you to Africa's table.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <input className={inputClass} type="text"  placeholder="Your Name"     required value={form.name}  onChange={update('name')} />
                      <input className={inputClass} type="tel"   placeholder="Phone Number"           value={form.phone} onChange={update('phone')} />
                    </div>
                    <input className={inputClass} type="email" placeholder="Email Address" required value={form.email} onChange={update('email')} />

                    <div className="grid grid-cols-2 gap-4">
                      <input className={inputClass} type="date" required aria-label="Reservation date" value={form.date} onChange={update('date')}
                        min={new Date().toISOString().split('T')[0]} />
                      <select className={inputClass} required aria-label="Preferred time" value={form.time} onChange={update('time')}>
                        <option value="" disabled>Select Time</option>
                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <select className={inputClass} aria-label="Number of guests" value={form.guests} onChange={update('guests')}>
                      {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="20+">20+ Guests (Private event)</option>
                    </select>

                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={3}
                      placeholder="Special requests, dietary requirements, occasion..."
                      value={form.notes}
                      onChange={update('notes')}
                    />

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center gap-2.5">
                          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                            <Send size={15} />
                          </motion.span>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2.5">
                          <Send size={15} />
                          Confirm Reservation
                        </span>
                      )}
                    </button>

                    <p className="font-inter text-[10px] text-text-muted text-center leading-snug">
                      By submitting you agree to our reservation policy. Cancellations accepted up to 24 hours before.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
