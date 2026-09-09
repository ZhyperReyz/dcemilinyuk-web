import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasCompleted = useRef(false)

  useEffect(() => {
    const duration = 2500
    const steps = 100
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current++
      setCount(current)
      if (current >= steps) {
        clearInterval(timer)
        if (!hasCompleted.current) {
          hasCompleted.current = true
          setTimeout(() => {
            if (containerRef.current) {
              gsap.to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power4.inOut',
                onComplete,
              })
            } else {
              onComplete()
            }
          }, 300)
        }
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div ref={containerRef} className="preloader">
      <div className="preloader__inner">
        <div className="preloader__brand">DcemilinYuk</div>
        <div className="preloader__counter">
          <span ref={counterRef}>{String(count).padStart(3, '0')}</span>
        </div>
        <div className="preloader__subtitle">Cemilan & Minuman Favorit</div>
      </div>
    </div>
  )
}
