import { useState, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

import Preloader from './components/Preloader'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import InteractiveSplit from './components/InteractiveSplit'
import PeelReveal from './components/PeelReveal'
import Menu from './components/Menu'
import SpecialtyDrinks from './components/SpecialtyDrinks'
import HorizontalScroll from './components/HorizontalScroll'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Events from './components/Events'
import Reservation from './components/Reservation'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

/**
 * URJA — Artisan Coffee
 *
 * Sections:
 * 1. Hero               — text reveal + parallax bg
 * 2. About              — story + stats
 * 3. InteractiveSplit   — mouse-controlled image split (ref: Hover Effects/1)
 * 4. PeelReveal         — horizontal bars peel away (ref: Hero Animations/4)
 * 5. Menu               — category tabs + items
 * 6. SpecialtyDrinks    — text scatter on hover (ref: Hover Effects/2)
 * 7. HorizontalScroll   — horizontal gallery (ref: Hero Animations/2)
 * 8. Gallery            — clip-path image reveals
 * 9. Testimonials       — rotating quotes
 * 10. Events            — workshops
 * 11. Reservation       — booking form
 * 12. Newsletter        — loyalty signup
 * 13. Contact           — info + form
 * 14. Footer            — links
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

        <About />
        <div className="section-divider" />

        <InteractiveSplit />
        <div className="section-divider" />

        <PeelReveal />
        <div className="section-divider" />

        <Menu />
        <div className="section-divider" />

        <SpecialtyDrinks />
        <div className="section-divider" />

        <HorizontalScroll />

        <Gallery />
        <div className="section-divider" />

        <Testimonials />
        <div className="section-divider" />

        <Events />
        <div className="section-divider" />

        <Reservation />
        <div className="section-divider" />

        <Newsletter />
        <div className="section-divider" />

        <Contact />
        <Footer />
      </main>
    </div>
  )
}
