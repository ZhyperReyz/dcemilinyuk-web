import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTextReveal } from '../hooks/useScrollReveal'

const signatureItems = [
  {
    name: 'Es Teh Tarik',
    desc: 'Teh tarik premium dengan rasa creamy dan manis yang pas',
    price: 'Rp 8.000',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
  {
    name: 'Bolen Pisang',
    desc: 'Bolen pisang homemade dengan kulit renyah dan isian pisang melimpah',
    price: 'Rp 15.000',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80',
  },
  {
    name: 'Risol Mayo',
    desc: 'Risol isi mayo dan smoked beef, dibalut tepung roti yang renyah',
    price: 'Rp 3.000',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
  },
  {
    name: 'Kopi Susu',
    desc: 'Kopi susu kekinian dengan campuran espresso dan susu segar',
    price: 'Rp 12.000',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
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
          <span className="text-line">Menu</span>
          <span className="text-line"><em>Signature</em></span>
        </div>
        <p className="text-body specialty__subtitle reveal-child">
          Hover untuk lihat yang membuat setiap menu spesial.
        </p>

        <div ref={listRef} className="specialty__list">
          {signatureItems.map((item, i) => (
            <div key={i} className="specialty-item">
              <div className="specialty-item__bg" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="specialty-item__content">
                <span className="specialty-item__price">{item.price}</span>
                <h3 className="specialty-item__name">{item.name}</h3>
                <p className="specialty-item__desc text-body">{item.desc}</p>
              </div>
              <div className="specialty-item__line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
