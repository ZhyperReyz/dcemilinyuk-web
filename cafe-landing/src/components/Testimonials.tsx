import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useTextReveal } from '../hooks/useScrollReveal'
import './Testimonials.css'

const reviews = [
  {
    text: "Naam Coffee changed how I think about coffee. The Ethiopian Yirgacheffe is unlike anything I've had — bright, complex, and absolutely addictive.",
    author: 'Sarah M.',
    role: 'Coffee Enthusiast',
    rating: 5,
  },
  {
    text: "We hold all our client meetings here. The space is beautiful, the wifi is fast, and the cortado is always perfect. Couldn't ask for more.",
    author: 'James K.',
    role: 'Creative Director, Studio Void',
    rating: 5,
  },
  {
    text: "Best cold brew in the city. Period. The cold brew tonic is my go-to summer drink — refreshing without being too sweet.",
    author: 'Alex T.',
    role: 'Local Regular',
    rating: 5,
  },
  {
    text: "I've been coming here every Saturday for two years. The baristas know my name, my order, and always have a smile. This is community.",
    author: 'Maya L.',
    role: 'Writer & Freelancer',
    rating: 5,
  },
]

export default function Testimonials() {
  const titleRef = useTextReveal()
  const [active, setActive] = useState(0)
  const quoteRef = useRef<HTMLDivElement>(null)

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Animate quote change
  useEffect(() => {
    if (!quoteRef.current) return
    const el = quoteRef.current

    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
  }, [active])

  const current = reviews[active]

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div ref={titleRef} className="testimonials__title heading-lg">
          <span className="text-line">What People</span>
          <span className="text-line"><em>Say</em></span>
        </div>

        <div className="testimonials__content">
          <div className="testimonials__quote-wrap" ref={quoteRef}>
            {/* Quote marks */}
            <svg className="testimonials__quote-mark" width="48" height="36" viewBox="0 0 48 36" fill="none">
              <path d="M0 36V20.4C0 13.6 1.6 8.4 4.8 4.8C8 1.2 12.4 0 18 0V8C14.8 8 12.2 8.8 10.2 10.4C8.2 12 7.2 14.2 7.2 17H18V36H0ZM28 36V20.4C28 13.6 29.6 8.4 32.8 4.8C36 1.2 40.4 0 46 0V8C42.8 8 40.2 8.8 38.2 10.4C36.2 12 35.2 14.2 35.2 17H46V36H28Z" fill="currentColor"/>
            </svg>

            <blockquote className="testimonials__text heading-md">
              "{current.text}"
            </blockquote>

            <div className="testimonials__author">
              <div className="testimonials__author-info">
                <span className="testimonials__author-name">{current.author}</span>
                <span className="text-sm">{current.role}</span>
              </div>
              <div className="testimonials__stars">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="var(--color-accent)">
                    <path d="M8 0l2.47 5.01L16 5.81l-4 3.9.94 5.5L8 12.27l-4.94 2.94.94-5.5-4-3.9 5.53-.8z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Dots navigation */}
          <div className="testimonials__dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
