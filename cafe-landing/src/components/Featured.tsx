import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTextReveal } from '../hooks/useScrollReveal'
import './Featured.css'

const specials = [
  {
    tag: 'New',
    title: 'Ethiopian Pour Over',
    desc: 'Bright citrus notes with a floral jasmine finish. Light roast, hand-poured to order.',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
  },
  {
    tag: 'Seasonal',
    title: 'Maple Oat Latte',
    desc: 'Organic maple syrup, creamy oat milk, our house espresso. Perfect for autumn mornings.',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80',
  },
  {
    tag: 'Popular',
    title: 'Cold Brew Tonic',
    desc: '24-hour cold brew topped with artisan tonic water and a twist of orange peel.',
    price: '$5.80',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80',
  },
  {
    tag: 'Chef\'s Pick',
    title: 'Matcha Croissant',
    desc: 'House-made croissant filled with ceremonial matcha cream and white chocolate.',
    price: '$4.50',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=500&q=80',
  },
]

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
            <span className="text-line">What's</span>
            <span className="text-line"><em>Brewing</em></span>
          </div>
          <p className="text-body featured__subtitle reveal-child">
            Our current favorites — rotated weekly with seasonal ingredients.
          </p>
        </div>

        <div ref={gridRef} className="featured__grid">
          {specials.map((item, i) => (
            <div key={i} className="featured-card">
              <div className="featured-card__image image-reveal">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="featured-card__content">
                <span className="featured-card__tag text-sm">{item.tag}</span>
                <h3 className="featured-card__title">{item.title}</h3>
                <p className="featured-card__desc text-body">{item.desc}</p>
                <div className="featured-card__footer">
                  <span className="featured-card__price">{item.price}</span>
                  <button className="btn-text">
                    Order Now
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
