'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import Preloader       from '@/components/home/Preloader'
import Hero            from '@/components/home/Hero'
import OurStory        from '@/components/home/OurStory'
import SignatureDishes from '@/components/home/SignatureDishes'
import DiningExperience from '@/components/home/DiningExperience'
import MenuRegions     from '@/components/home/MenuRegions'
import ThemedBuffets   from '@/components/home/ThemedBuffets'
import Reservation     from '@/components/home/Reservation'
import CulturalShows   from '@/components/home/CulturalShows'
import Testimonials    from '@/components/home/Testimonials'
import GalleryPreview  from '@/components/home/GalleryPreview'

export default function HomePage() {
  const [isReady, setIsReady]         = useState(false)
  const [showLoader, setShowLoader]   = useState(true)

  useEffect(() => {
    /* Only show the preloader on the first visit per session */
    const seen = sessionStorage.getItem('orisirisi_loaded')
    if (seen) {
      setShowLoader(false)
      setIsReady(true)
    }
  }, [])

  const handleLoaderComplete = () => {
    sessionStorage.setItem('orisirisi_loaded', '1')
    setIsReady(true)
  }

  return (
    <>
      {showLoader && <Preloader onComplete={handleLoaderComplete} />}
      <main className="overflow-x-hidden">
        <Hero            isReady={isReady} />
        <OurStory />
        <SignatureDishes />
        <DiningExperience />
        <MenuRegions />
        <ThemedBuffets />
        <Reservation />
        <CulturalShows />
        <Testimonials />
        <GalleryPreview />
      </main>
    </>
  )
}
