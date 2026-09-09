import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'
import { products, formatPrice, getWhatsAppUrl } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const bestSellers = products
  .filter(p => p.badge === 'Best Seller' && p.available)
  .slice(0, 4)

export default function Featured() {
  const titleRef = useTextReveal()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.featured-card')
      if (!cards) return

      gsap.set(cards, { y: 60, opacity: 0 })
      gsap.to(cards, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="featured section" id="featured">
      <div className="container">
        <div className="featured__header">
          <div ref={titleRef} className="featured__title heading-lg">
            <span className="text-line">Makanan</span>
            <span className="text-line"><em>Terlaris</em></span>
          </div>
          <p className="text-body featured__subtitle reveal-child">
            Produk terfavorit yang paling banyak dipesan pelanggan kami.
          </p>
        </div>

        <div ref={gridRef} className="featured__grid">
          {bestSellers.map((item, i) => (
            <div key={i} className="featured-card">
              <div className="featured-card__image image-reveal">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/500x300/1c1917/c8956c?text=${encodeURIComponent(item.name)}`
                  }}
                />
              </div>
              <div className="featured-card__content">
                <h3 className="featured-card__title">{item.name}</h3>
                <p className="featured-card__desc text-body">{item.description}</p>
                <div className="featured-card__footer">
                  <span className="featured-card__price">{formatPrice(item.price)}</span>
                  <a
                    href={getWhatsAppUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-text"
                  >
                    Pesan
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
