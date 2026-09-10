import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80', alt: 'Suasana kedai' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Interior hangat' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', alt: 'Area duduk' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', alt: 'Latte art' },
  { src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80', alt: 'Pour over' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', alt: 'Secangkir kopi' },
]

export default function HorizontalScroll() {
  const titleRef = useTextReveal()
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const strip = stripRef.current
    if (!container || !strip) return

    // Disable horizontal scroll animation on mobile
    if (window.innerWidth <= 768) {
      const items = strip.querySelectorAll('.hscroll__item')
      items.forEach((item) => {
        gsap.set(item, { scale: 1, opacity: 1 })
        const label = item.querySelector('.hscroll__item-label')
        if (label) gsap.set(label, { opacity: 1, y: 0 })
      })
      return
    }

    const ctx = gsap.context(() => {
      const items = strip.querySelectorAll('.hscroll__item')

      const getTotalWidth = () => strip.scrollWidth - window.innerWidth

      const scrollTween = gsap.to(strip, {
        x: () => -getTotalWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'center center',
          end: () => `+=${getTotalWidth()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      items.forEach((item, i) => {
        gsap.set(item, { scale: 0.9 })

        gsap.to(item, {
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: () => `left+=${(i / items.length) * getTotalWidth() - window.innerWidth * 0.3} center`,
            end: () => `left+=${(i / items.length) * getTotalWidth() + window.innerWidth * 0.3} center`,
            scrub: 1,
            containerAnimation: scrollTween,
          },
        })

        const label = item.querySelector('.hscroll__item-label')
        if (label) {
          gsap.fromTo(label,
            { opacity: 0, y: 15 },
            {
              opacity: 1, y: 0, duration: 0.5,
              scrollTrigger: {
                trigger: container,
                start: () => `left+=${(i / items.length) * getTotalWidth() - window.innerWidth * 0.2} center`,
                end: () => `left+=${(i / items.length) * getTotalWidth()} center`,
                scrub: 1,
                containerAnimation: scrollTween,
              },
            }
          )
        }
      })
    }, containerRef)

    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 800)

    return () => {
      clearTimeout(refreshTimeout)
      ctx.revert()
    }
  }, [])

  return (
    <section className="hscroll" id="horizontal">
      <div className="container">
        <div ref={titleRef} className="hscroll__title heading-lg">
          <span className="text-line">Suasana</span>
          <span className="text-line"><em>DcemilinYuk</em></span>
        </div>
        <p className="text-body hscroll__subtitle reveal-child">
          Scroll ke bawah untuk menjelajahi — konten bergerak horizontal.
        </p>
      </div>

      <div ref={containerRef} className="hscroll__container">
        <div ref={stripRef} className="hscroll__strip">
          {images.map((img, i) => (
            <div key={i} className="hscroll__item">
              <div className="hscroll__item-image">
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
              <span className="hscroll__item-label text-sm">{img.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
