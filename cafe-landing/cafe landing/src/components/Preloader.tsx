import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Preloader.css'

/**
 * Ref: Hero Animations/20 (cinematic-loader-entrance)
 * Ref: Hero Animations/25 (Loader-main)
 */
interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Reveal curtain
          gsap.to(preloaderRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1,
            ease: 'power4.inOut',
            onComplete,
          })
        }
      })

      // Counter animation
      if (counterRef.current) {
        tl.fromTo(counterRef.current,
          { innerText: 0 },
          {
            innerText: 100,
            duration: 2.2,
            ease: 'power2.inOut',
            snap: { innerText: 1 },
            onUpdate() {
              if (counterRef.current) {
                const val = Math.round(
                  gsap.getProperty(counterRef.current, 'innerText') as number
                )
                counterRef.current.textContent = String(val).padStart(2, '0')
              }
            }
          },
          0
        )
      }

      // Logo fade in
      tl.fromTo('.preloader__logo',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.3
      )

      // Tagline
      tl.fromTo('.preloader__tagline',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0.8
      )
    }, preloaderRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader__inner">
        <div className="preloader__logo">NAAM</div>
        <div className="preloader__tagline text-sm">Artisan Coffee</div>
        <div className="preloader__counter">
          <span ref={counterRef} className="preloader__number">00</span>
          <span className="preloader__percent">%</span>
        </div>
      </div>
      <div className="preloader__line" />
    </div>
  )
}
