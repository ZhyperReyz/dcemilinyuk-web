import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', alt: 'Cemilan lezat', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', alt: 'Kopi susu', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80', alt: 'Donat & pastry', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', alt: 'Nasi goreng', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80', alt: 'Roti & bakery', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', alt: 'Salad segar', span: 'normal' },
]

export default function Gallery() {
  const titleRef = useTextReveal()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.gallery-item')
      if (!items) return

      items.forEach((item, i) => {
        const img = item.querySelector('img')

        gsap.set(item, { clipPath: 'inset(100% 0% 0% 0%)' })
        if (img) gsap.set(img, { scale: 1.3 })

        gsap.to(item, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: item,
            start: 'top 60%',
          },
          delay: i * 0.08,
        })

        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 60%',
            },
            delay: i * 0.08,
          })
        }
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="gallery__header">
          <div ref={titleRef} className="gallery__title heading-lg">
            <span className="text-line">Galeri</span>
            <span className="text-line"><em>Kami</em></span>
          </div>
          <p className="text-body gallery__subtitle reveal-child">
            Lihat langsung kelezatan cemilan dan minuman kami.
          </p>
        </div>

        <div ref={gridRef} className="gallery__grid">
          {galleryImages.map((img, i) => (
            <div key={i} className={`gallery-item gallery-item--${img.span}`}>
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-item__overlay">
                <span className="text-sm">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
