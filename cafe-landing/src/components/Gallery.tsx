import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'
import './Gallery.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ref: Grid Animations/3 (ElasticGridScroll) — staggered grid entrance
 * Ref: Scroll Animation/22 (ImagePixelLoading) — clip-path reveal
 */

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80', alt: 'Latte art', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80', alt: 'Coffee beans', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', alt: 'Morning coffee', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&q=80', alt: 'Espresso machine', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80', alt: 'Pour over', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&q=80', alt: 'Cafe interior', span: 'normal' },
]

export default function Gallery() {
  const titleRef = useTextReveal()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.gallery-item')
      if (!items) return

      // Clip-path reveal for each image — Ref: Scroll Animation/22
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
            <span className="text-line">The</span>
            <span className="text-line"><em>Experience</em></span>
          </div>
          <p className="text-body gallery__subtitle reveal-child">
            A glimpse into our space — where warmth meets craft.
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
