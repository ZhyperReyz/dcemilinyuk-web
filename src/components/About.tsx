import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const titleRef = useTextReveal()
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageRef.current) return
    const img = imageRef.current.querySelector('img')
    if (!img) return

    gsap.set(imageRef.current, { clipPath: 'inset(100% 0% 0% 0%)' })
    gsap.set(img, { scale: 1.3 })

    gsap.to(imageRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.6,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    gsap.to(img, {
      scale: 1,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    const nums = statsRef.current.querySelectorAll('.about-stat__number')

    nums.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0')
      gsap.fromTo(el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: function() {
            el.textContent = Math.round(gsap.getProperty(el, 'innerText') as number).toString()
          },
        }
      )
    })
  }, [])

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div ref={imageRef} className="about-image">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
              alt="Pedagang lokal DcemilinYuk"
            />
          </div>

          <div className="about-content">
            <div ref={titleRef} className="about-title">
              <div className="section-subtitle text-sm">Tentang Kami</div>
              <h2 className="heading-lg">Dibuat untuk <span className="text-accent">Pedagang Lokal</span></h2>
            </div>

            <p className="text-body about-desc reveal-child">
              DcemilinYuk adalah platform katalog yang membantu pedagang kecil lokal Indonesia
              menjangkau lebih banyak pelanggan. Kami menyediakan berbagai cemilan dan minuman
              berkualitas dengan harga terjangkau.
            </p>

            <p className="text-body about-desc reveal-child">
              Dengan memesan melalui WhatsApp, prosesnya mudah dan cepat. Tidak perlu ribet,
              langsung chat dan pesan!
            </p>

            <div ref={statsRef} className="about-stats">
              <div className="about-stat">
                <div className="about-stat__number" data-target="1200">0</div>
                <div className="about-stat__label text-sm">Pelanggan Puas</div>
              </div>
              <div className="about-stat">
                <div className="about-stat__number" data-target="15">0</div>
                <div className="about-stat__label text-sm">Produk Tersedia</div>
              </div>
              <div className="about-stat">
                <div className="about-stat__number" data-target="5">0</div>
                <div className="about-stat__label text-sm">Kategori</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
