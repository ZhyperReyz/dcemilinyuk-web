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
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    const strip = stripRef.current
    if (!container || !strip || !section) return

    const ctx = gsap.context(() => {
      // Slide-in entrance when reaching the section
      gsap.fromTo(section,
        { xPercent: 15, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.8,
          },
        }
      )

      const items = strip.querySelectorAll('.hscroll__item')
      const totalWidth = strip.scrollWidth - window.innerWidth

      // Main horizontal scroll
      const scrollTween = gsap.to(strip, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Per-item animations
      items.forEach((item, i) => {
        gsap.set(item, { scale: 0.85, opacity: 0.3 })

        gsap.to(item, {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: () => `left+=${(i / items.length) * totalWidth - window.innerWidth * 0.3} center`,
            end: () => `left+=${(i / items.length) * totalWidth + window.innerWidth * 0.3} center`,
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
                start: () => `left+=${(i / items.length) * totalWidth - window.innerWidth * 0.2} center`,
                end: () => `left+=${(i / items.length) * totalWidth} center`,
                scrub: 1,
                containerAnimation: scrollTween,
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hscroll" id="horizontal">
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
