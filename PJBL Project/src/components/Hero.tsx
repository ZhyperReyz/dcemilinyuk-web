import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll('.hero-word')
      if (words) {
        gsap.set(words, { y: 40, opacity: 0 })
        gsap.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.05,
          delay: 2.8,
        })
      }

      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 3.2 }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-bg-image" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1920&q=80')`,
        }} />
        <div className="hero-bg-overlay" />
      </div>

      <div ref={contentRef} className="hero__content container">
        <div className="hero-eyebrow reveal-child">
          <span className="hero-eyebrow__line" />
          <span>Cemilan & Minuman Terbaik</span>
        </div>

        <h1 ref={titleRef} className="heading-xl hero-title">
          <span className="hero-line">
            <span className="hero-word">Jajanan</span>{' '}
            <span className="hero-word hero-word--accent">Favorit</span>
          </span>
          <span className="hero-line">
            <span className="hero-word">Kamu</span>{' '}
            <span className="hero-word">Ada</span>{' '}
            <span className="hero-word hero-word--italic">di Sini</span>
          </span>
        </h1>

        <div className="hero-subtitle">
          <p className="hero-sub-item">
            Temukan berbagai cemilan dan minuman lezat dari pedagang kecil terpercaya.
          </p>
          <p className="hero-sub-item">
            Pesan langsung via WhatsApp, mudah dan cepat!
          </p>
        </div>

        <div className="hero-cta-group">
          <button className="btn-primary" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Lihat Produk</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span className="text-sm">Scroll</span>
      </div>
    </section>
  )
}
