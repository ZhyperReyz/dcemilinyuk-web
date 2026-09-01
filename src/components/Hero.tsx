import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word reveal — simple and fast
      const words = titleRef.current?.querySelectorAll('.hero-word')
      if (words) {
        gsap.set(words, { y: 40, opacity: 0 })
        gsap.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.05,
          delay: 0.3,
        })
      }

      // Content fade in
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Background — CSS only, no GSAP parallax */}
      <div className="hero-bg">
        <div className="hero-bg-image" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80')`,
        }} />
        <div className="hero-bg-overlay" />
      </div>

      <div ref={contentRef} className="hero__content container">
        <div className="hero-eyebrow text-sm reveal-child">
          <span className="hero-eyebrow__line" />
          <span>Artisan Coffee Experience</span>
        </div>

        <h1 ref={titleRef} className="heading-xl hero-title">
          <span className="hero-line">
            <span className="hero-word">Where</span>{' '}
            <span className="hero-word">Every</span>{' '}
            <span className="hero-word">Cup</span>
          </span>
          <span className="hero-line">
            <span className="hero-word hero-word--accent">Tells</span>{' '}
            <span className="hero-word">a</span>{' '}
            <span className="hero-word hero-word--italic">Story</span>
          </span>
        </h1>

        <div className="hero-subtitle">
          <p className="hero-sub-item text-body">
            Single-origin beans, roasted in small batches.
          </p>
          <p className="hero-sub-item text-body">
            Crafted with intention. Served with soul.
          </p>
        </div>

        <div className="hero-cta-group">
          <button className="btn-primary" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Explore Our Menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <a href="https://www.instagram.com/urjacoffee.id?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Follow on Instagram
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span className="text-sm">Scroll</span>
      </div>
    </section>
  )
}
