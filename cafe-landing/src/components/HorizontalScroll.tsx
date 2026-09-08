import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'
import './HorizontalScroll.css'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80', alt: 'Cafe interior' },
  { src: 'https://images.unsplash.com/photo-1559925398-09797111c53d?w=800&q=80', alt: 'Coffee bar' },
  { src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80', alt: 'Seating area' },
  { src: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80', alt: 'Latte art' },
  { src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80', alt: 'Pour over' },
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80', alt: 'Cup detail' },
]

export default function HorizontalScroll() {
  const titleRef = useTextReveal()
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const strip = stripRef.current
    if (!container || !strip) return

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
          <span className="text-line">Our</span>
          <span className="text-line"><em>Space</em></span>
        </div>
        <p className="text-body hscroll__subtitle reveal-child">
          Scroll down to explore — content moves horizontally.
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
