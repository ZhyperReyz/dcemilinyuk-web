import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    text: 'Es Teh Tariknya enak banget! Segar dan manisnya pas. Sudah langganan tiap minggu!',
    author: 'Aisyah R.',
    role: 'Pelanggan Setia',
    stars: 5,
  },
  {
    text: 'Bolen Pisangnya renyah dan isian pisangnya banyak. Anak-anak suka semua! Pasti repeat order!',
    author: 'Rizky M.',
    role: 'Pelanggan Baru',
    stars: 5,
  },
  {
    text: 'Pengirimannya cepat dan packaging-nya rapi banget. Pesanan sampai dengan selamat!',
    author: 'Dewi S.',
    role: 'Pelanggan Setia',
    stars: 5,
  },
]

export default function Testimonials() {
  const titleRef = useTextReveal()
  const [active, setActive] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )
  }, [active])

  const t = testimonials[active]

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-header">
          <div ref={titleRef}>
            <div className="section-subtitle text-sm">Testimoni</div>
            <h2 className="heading-lg">
              <span className="text-line">Apa Kata</span>
              <span className="text-line"><em>Mereka?</em></span>
            </h2>
          </div>
        </div>

        <div className="testimonials-content">
          <div ref={cardRef} className="testimonial-card">
            <div className="testimonial-stars">
              {'★'.repeat(t.stars)}
            </div>
            <div className="testimonial-text">"{t.text}"</div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.author[0]}</div>
              <div className="testimonial-info">
                <div className="testimonial-name">{t.author}</div>
                <div className="testimonial-role text-sm">{t.role}</div>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === active ? 'testimonial-dot--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
