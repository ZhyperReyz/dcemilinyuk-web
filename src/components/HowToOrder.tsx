import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    icon: 'fa-solid fa-eye',
    title: 'Pilih Produk',
    desc: 'Lihat katalog produk kami dan temukan cemilan atau minuman yang kamu inginkan.',
  },
  {
    num: '02',
    icon: 'fa-solid fa-comment-dots',
    title: 'Klik Pesan WA',
    desc: 'Tekan tombol "Pesan" di produk pilihan. Pesan otomatis akan terbuat di WhatsApp.',
  },
  {
    num: '03',
    icon: 'fa-solid fa-check',
    title: 'Konfirmasi & Bayar',
    desc: 'Diskusikan detail pengiriman dan pembayaran langsung dengan kami via WhatsApp.',
  },
]

export default function HowToOrder() {
  const titleRef = useTextReveal()
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('.step-card')

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section className="section" id="howto">
      <div className="container">
        <div className="section-header">
          <div ref={titleRef}>
            <div className="section-subtitle text-sm">Cara Pesan</div>
            <h2 className="heading-lg">
              <span className="text-line">Mudah & Cepat</span>
              <span className="text-line">via <em>WhatsApp</em></span>
            </h2>
          </div>
        </div>

        <div ref={cardsRef} className="steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="step-card">
              <div className="step-card__num">{step.num}</div>
              <div className="step-card__icon">
                <i className={step.icon}></i>
              </div>
              <h4 className="step-card__title">{step.title}</h4>
              <p className="step-card__desc text-body">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
