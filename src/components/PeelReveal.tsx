import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BAR_COUNT = 6

export default function PeelReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
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

      gsap.set(content, { opacity: 0, scale: 1.1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })

      for (let i = 0; i < halfIndex; i++) {
        tl.to(bars[i], {
          yPercent: -200,
          duration: 0.8,
          ease: 'power3.inOut',
        }, i * 0.05)
      }

      for (let i = halfIndex; i < BAR_COUNT; i++) {
        tl.to(bars[i], {
          yPercent: 200,
          duration: 0.8,
          ease: 'power3.inOut',
        }, (BAR_COUNT - 1 - i) * 0.05)
      }

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
            <h2 className="heading-lg">Kenapa Pilih <em>Kami?</em></h2>
            <p className="text-body peel__desc">
              Kami berkomitmen menyajikan cemilan dan minuman terbaik dari pedagang kecil lokal.
              Kualitas terjamin, harga terjangkau, dan pelayanan ramah.
            </p>
            <div className="peel__features">
              <div className="peel__feature">
                <span className="peel__feature-icon">🌱</span>
                <div>
                  <h4>Bahan Segar</h4>
                  <p className="text-body">Dibuat setiap hari dengan bahan pilihan berkualitas.</p>
                </div>
              </div>
              <div className="peel__feature">
                <span className="peel__feature-icon">💰</span>
                <div>
                  <h4>Harga Terjangkau</h4>
                  <p className="text-body">Mulai dari Rp 3.000, cocok untuk kantong pelajar.</p>
                </div>
              </div>
              <div className="peel__feature">
                <span className="peel__feature-icon">🚗</span>
                <div>
                  <h4>Pesan Mudah</h4>
                  <p className="text-body">Pesan via WhatsApp, praktis dan cepat.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="peel__image">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Suasana DcemilinYuk"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
