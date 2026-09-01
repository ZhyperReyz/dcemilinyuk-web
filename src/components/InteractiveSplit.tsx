import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useTextReveal } from '../hooks/useScrollReveal'
import './InteractiveSplit.css'

/**
 * Ref: Hover Effects/1 — mouse-controlled image width split
 * Two images side by side, mouse position controls the split ratio.
 * "Our Process" — left: green beans, right: roasted beans
 */
export default function InteractiveSplit() {
  const titleRef = useTextReveal()
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const targetRef = useRef(50)
  const currentRef = useRef(50)

  const animate = useCallback(() => {
    const delta = targetRef.current - currentRef.current
    currentRef.current += delta * 0.08

    if (leftRef.current && rightRef.current) {
      const leftW = 66.66 - currentRef.current * 0.33
      const rightW = 33.33 + currentRef.current * 0.33
      leftRef.current.style.width = `${leftW}%`
      rightRef.current.style.width = `${rightW}%`
    }

    if (Math.abs(delta) > 0.1) {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      targetRef.current = Math.max(0, Math.min(100, x))
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    section.addEventListener('mousemove', handleMouseMove)
    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <section ref={sectionRef} className="split section" id="split">
      <div className="container">
        <div ref={titleRef} className="split__title heading-lg">
          <span className="text-line">From Bean</span>
          <span className="text-line">to <em>Cup</em></span>
        </div>
        <p className="text-body split__subtitle reveal-child">
          Move your mouse across to explore our process.
        </p>
      </div>

      <div className="split__images">
        <div ref={leftRef} className="split__left">
          <img
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&q=80"
            alt="Green coffee beans"
            loading="lazy"
          />
          <div className="split__label">
            <span className="text-sm">Green Beans</span>
          </div>
        </div>
        <div ref={rightRef} className="split__right">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80"
            alt="Roasted coffee beans"
            loading="lazy"
          />
          <div className="split__label">
            <span className="text-sm">Roasted</span>
          </div>
        </div>
      </div>
    </section>
  )
}
