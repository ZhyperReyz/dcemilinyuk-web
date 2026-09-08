import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PeelReveal.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ref: Hero Animations/4 (Dimaac) — horizon peel intro
 * Horizontal bars split from center: top bars slide UP, bottom bars slide DOWN
 * revealing the content underneath.
 */

const BAR_COUNT = 6

export default function PeelReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      // Create bars
      const barsContainer = section.querySelector('.peel__bars')
      if (!barsContainer) return

      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.createElement('div')
        bar.className = 'peel__bar'
        bar.style.height = `${100 / BAR_COUNT}%`
        bar.style.top = `${(i / BAR_COUNT) * 100}%`
        barsContainer.appendChild(bar)
      }

      const bars = barsContainer.querySelectorAll('.peel__bar')
      const halfIndex = BAR_COUNT / 2

      // Set initial state
      gsap.set(content, { opacity: 0, scale: 1.1 })

      // Scroll-triggered peel animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })

      // Top bars slide UP
      for (let i = 0; i < halfIndex; i++) {
        tl.to(bars[i], {
          yPercent: -200,
          duration: 0.8,
          ease: 'power3.inOut',
        }, i * 0.05)
      }

      // Bottom bars slide DOWN
      for (let i = halfIndex; i < BAR_COUNT; i++) {
        tl.to(bars[i], {
          yPercent: 200,
          duration: 0.8,
          ease: 'power3.inOut',
        }, (BAR_COUNT - 1 - i) * 0.05)
      }

      // Content fades in
      tl.to(content, {
        opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
      }, 0.3)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="peel section">
      <div className="peel__bars" />
      <div ref={contentRef} className="peel__content container">
        <div className="peel__grid">
          <div className="peel__text">
            <h2 className="heading-lg">Crafted with <em>Intention</em></h2>
            <p className="text-body peel__desc">
              Every bean we roast is hand-selected from single-origin farms.
              We believe in transparency — from farm to cup, you know exactly
              where your coffee comes from and who grew it.
            </p>
            <div className="peel__features">
              <div className="peel__feature">
                <span className="peel__feature-icon">🌱</span>
                <div>
                  <h4>Direct Trade</h4>
                  <p className="text-body">Sourced directly from farmers in 12 countries.</p>
                </div>
              </div>
              <div className="peel__feature">
                <span className="peel__feature-icon">🔥</span>
                <div>
                  <h4>Small Batch</h4>
                  <p className="text-body">Roasted weekly in batches of 10kg or less.</p>
                </div>
              </div>
              <div className="peel__feature">
                <span className="peel__feature-icon">♻️</span>
                <div>
                  <h4>Sustainable</h4>
                  <p className="text-body">Compostable cups, zero-waste roasting process.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="peel__image">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
              alt="Coffee roasting process"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
