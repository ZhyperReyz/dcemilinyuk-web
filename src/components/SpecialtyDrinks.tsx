import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTextReveal } from '../hooks/useScrollReveal'
import './SpecialtyDrinks.css'

/**
 * Ref: Hover Effects/2 — text chars disperse on hover, background image appears
 * Uses real URJA menu data as signature drinks
 */

const signatureDrinks = [
  {
    name: 'Putih',
    desc: 'Kopi susu klasik racikan URJA',
    price: 'Rp 28.000',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
  {
    name: 'Legit',
    desc: 'Kopi susu manis dengan salted foam dan saus butterscotch',
    price: 'Rp 28.000',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
  },
  {
    name: 'Enerji',
    desc: 'Espresso dengan tambahan Red Bull Energy Drink',
    price: 'Rp 32.000',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
  },
  {
    name: 'Aurora',
    desc: 'Perpaduan jeruk, asam-manis, dan teh telang beraroma lembut',
    price: 'Rp 28.000',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80',
  },
]

export default function SpecialtyDrinks() {
  const titleRef = useTextReveal()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll('.specialty-item')

    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
        }
      )
    }, listRef)

    return () => ctx.revert()
  }, [])

  // Text scatter on hover — ref: Hover Effects/2
  useEffect(() => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll('.specialty-item')

    items.forEach((item) => {
      const nameEl = item.querySelector('.specialty-item__name')
      const bgEl = item.querySelector('.specialty-item__bg') as HTMLElement
      const descEl = item.querySelector('.specialty-item__desc')

      if (!nameEl || !bgEl || !descEl) return

      const text = nameEl.textContent || ''
      nameEl.innerHTML = ''
      ;[...text].forEach((char) => {
        const span = document.createElement('span')
        span.className = 'specialty-char'
        span.textContent = char === ' ' ? '\u00A0' : char
        nameEl.appendChild(span)
      })

      const chars = nameEl.querySelectorAll('.specialty-char')

      item.addEventListener('mouseenter', () => {
        gsap.to(bgEl, { opacity: 0.3, duration: 0.4 })
        gsap.to(chars, {
          x: () => gsap.utils.random(-30, 30),
          y: () => gsap.utils.random(-20, 20),
          rotation: () => gsap.utils.random(-15, 15),
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.01,
        })
        gsap.to(descEl, { opacity: 1, y: 0, duration: 0.4, delay: 0.1 })
      })

      item.addEventListener('mouseleave', () => {
        gsap.to(bgEl, { opacity: 0, duration: 0.3 })
        gsap.to(chars, {
          x: 0, y: 0, rotation: 0, duration: 0.5, ease: 'power3.out', stagger: 0.01,
        })
        gsap.to(descEl, { opacity: 0, y: 10, duration: 0.3 })
      })
    })
  }, [])

  return (
    <section className="specialty section" id="specialty">
      <div className="container">
        <div ref={titleRef} className="specialty__title heading-lg">
          <span className="text-line">Signature</span>
          <span className="text-line"><em>Drinks</em></span>
        </div>
        <p className="text-body specialty__subtitle reveal-child">
          Hover untuk lihat yang membuat setiap minuman spesial.
        </p>

        <div ref={listRef} className="specialty__list">
          {signatureDrinks.map((drink, i) => (
            <div key={i} className="specialty-item">
              <div className="specialty-item__bg" style={{ backgroundImage: `url(${drink.image})` }} />
              <div className="specialty-item__content">
                <span className="specialty-item__price">{drink.price}</span>
                <h3 className="specialty-item__name">{drink.name}</h3>
                <p className="specialty-item__desc text-body">{drink.desc}</p>
              </div>
              <div className="specialty-item__line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
