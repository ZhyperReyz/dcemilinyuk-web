import { useState, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

import Preloader from './components/Preloader'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import PeelReveal from './components/PeelReveal'
import About from './components/About'
import Featured from './components/Featured'
import Gallery from './components/Gallery'
import SpecialtyDrinks from './components/SpecialtyDrinks'
import HorizontalScroll from './components/HorizontalScroll'
import HowToOrder from './components/HowToOrder'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

/**
 * DcemilinYuk — Cemilan & Minuman
 *
 * Sections:
 * 1. Hero             — word-by-word text reveal + parallax bg
 * 2. Categories       — category cards with scroll reveal
 * 3. Products         — product grid with filter tabs
 * 4. PeelReveal       — peel animation "Kenapa Pilih Kami"
 * 5. About            — clip-path image reveal + stat counters
 * 6. Featured         — best seller cards
 * 7. SpecialtyDrinks  — signature items with text scatter hover
 * 8. Gallery          — food photos with clip-path reveals
 * 9. HorizontalScroll — horizontal gallery of food photos
 * 10. HowToOrder      — step cards
 * 11. Testimonials    — auto-rotating quotes
 * 12. CTA             — WhatsApp call-to-action
 * 13. Footer
 */
export default function App() {
  const [loaded, setLoaded] = useState(false)

  useLenis()

  useEffect(() => {
    const progressBar = document.getElementById('scroll-progress')
    if (!progressBar) return
    gsap.to(progressBar, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    })
  }, [])

  const handlePreloaderComplete = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="grain" />
      <div className="scroll-progress" id="scroll-progress" />
      <Navigation />

      <main className={`main ${loaded ? 'main--visible' : ''}`}>
        <Hero />
        <div className="section-divider" />

        <Categories />
        <div className="section-divider" />

        <Products />
        <div className="section-divider" />

        <PeelReveal />
        <div className="section-divider" />

        <Featured />
        <div className="section-divider" />

        <SpecialtyDrinks />
        <div className="section-divider" />

        <Gallery />
        <div className="section-divider" />

        <HorizontalScroll />

        <About />
        <div className="section-divider" />

        <HowToOrder />
        <div className="section-divider" />

        <Testimonials />

        <CTA />
        <Footer />
      </main>
    </div>
  )
}
