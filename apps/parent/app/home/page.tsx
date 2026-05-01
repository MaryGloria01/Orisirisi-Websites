import Link from 'next/link'

/* ─────────────────────────────────────────────────────────────────────────────
   Orisirisi Africa Limited — Home Page
   Full build coming in Phase 2 (after restaurant site is deployed).
   This scaffold holds the structure so the monorepo builds clean.
───────────────────────────────────────────────────────────────────────────── */
export default function ParentHomePage() {
  return (
    <main className="min-h-screen bg-brand-black flex flex-col items-center justify-center gap-8 px-6">
      <div className="text-center max-w-3xl">
        <p className="eyebrow mb-5">Orisirisi Africa Limited</p>
        <h1 className="font-playfair text-brand-cream leading-[1.0] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
          Reviving Our Roots.<br />
          <span className="italic text-brand-orange">Shaping Our Future.</span>
        </h1>
        <p className="font-cormorant italic text-brand-text-muted text-xl leading-relaxed mb-10">
          The parent platform is under construction. In the meantime, experience the continent through our restaurant and cultural hub.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://orisirisiafricanrestaurant.com" className="btn-primary text-sm px-8 py-4">
            Visit the Restaurant
          </a>
          <a href="https://afrixpressions.com" className="btn-ghost text-sm px-8 py-4">
            AfriXpressions Hub
          </a>
        </div>
      </div>
      <div className="w-full max-w-lg kente-divider" style={{ height: 5 }} />
    </main>
  )
}
