import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'
import { products, formatPrice, getWhatsAppUrl } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const bestSellers = products
  .filter(p => p.available)
  .sort((a, b) => b.sold - a.sold)
  .slice(0, 8)

export default function Featured() {
  const titleRef = useTextReveal()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = gridRef.current?.querySelector('.featured-hero')
      const items = gridRef.current?.querySelectorAll('.featured-item')

      if (hero) {
        gsap.set(hero, { x: -60, opacity: 0 })
        gsap.to(hero, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
        })
      }

      if (items) {
        gsap.set(items, { x: 60, opacity: 0 })
        gsap.to(items, {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
        })
      }
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="featured section" id="featured">
      <div className="container">
        <div className="section-header">
          <div ref={titleRef}>
            <div className="section-subtitle text-sm">Best Seller</div>
            <h2 className="heading-lg">
              <span className="text-line">Makanan</span>
              <span className="text-line"><em>Terlaris</em></span>
            </h2>
          </div>
          <p className="text-body">Produk favorit yang paling banyak dipesan pelanggan kami.</p>
        </div>

        <div ref={gridRef} className="featured-layout">
          {/* Hero card - large, left side */}
          {bestSellers[0] && (
            <div className="featured-hero">
              <div className="featured-hero__image">
                <img
                  src={bestSellers[0].image}
                  alt={bestSellers[0].name}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/600x700/1565C0/ffffff?text=${encodeURIComponent(bestSellers[0].name)}`
                  }}
                />
                <div className="featured-hero__gradient" />
                <div className="featured-hero__badge">No. 1</div>
              </div>
              <div className="featured-hero__content">
                <h3 className="featured-hero__name">{bestSellers[0].name}</h3>
                <p className="featured-hero__desc">{bestSellers[0].description}</p>
                <div className="featured-hero__bottom">
                  <span className="featured-hero__price">{formatPrice(bestSellers[0].price)}</span>
                  <a
                    href={getWhatsAppUrl(bestSellers[0])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-primary--sm"
                  >
                    <span>Pesan Sekarang</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Stacked items - right side */}
          <div className="featured-stack">
            {bestSellers.slice(1).map((item, i) => (
              <div key={i} className="featured-item">
                <div className="featured-item__num">{String(i + 2).padStart(2, '0')}</div>
                <div className="featured-item__image">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/200x200/1565C0/ffffff?text=${encodeURIComponent(item.name)}`
                    }}
                  />
                </div>
                <div className="featured-item__info">
                  <h4 className="featured-item__name">{item.name}</h4>
                  <span className="featured-item__price">{formatPrice(item.price)}</span>
                </div>
                <a
                  href={getWhatsAppUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-item__link"
                >
                  Pesan
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
