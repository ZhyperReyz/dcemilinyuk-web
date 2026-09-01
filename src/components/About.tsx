import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTextReveal } from '../hooks/useScrollReveal'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ref: Scroll Animation/30 (OneElementScroll) — text reveal
 * Ref: Hero Animations/11 (EntranceAnimationForImages) — image clip reveal
 */
export default function About() {
  const textRef = useTextReveal()
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path image reveal — Ref: Hero Animations/11
      if (imageRef.current) {
        const img = imageRef.current.querySelector('img')
        gsap.set(imageRef.current, { clipPath: 'inset(100% 0% 0% 0%)' })
        if (img) gsap.set(img, { scale: 1.3 })

        gsap.to(imageRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: imageRef.current, start: 'top 82%' },
        })

        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: imageRef.current, start: 'top 82%' },
          })
        }
      }

      // Stats fade in
      if (statsRef.current) {
        const stats = statsRef.current.querySelectorAll('.stat')
        gsap.fromTo(stats,
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 88%' },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__grid">
          <div ref={imageRef} className="about__image-col">
            <div className="about__image image-reveal">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
                alt="Coffee being poured"
                loading="lazy"
              />
            </div>
            <div className="about__image-accent" />
          </div>

          <div className="about__text-col">
            <div className="about__label text-sm reveal-child">
              <span className="about__label-line" />
              Our Story
            </div>

            <div ref={textRef} className="about__title heading-lg">
              <span className="text-line">Born from a</span>
              <span className="text-line">passion for the</span>
              <span className="text-line">perfect <em>roast</em></span>
            </div>

            <p className="about__desc text-body reveal-child">
              Founded in 2019 in the heart of the city, URJA started as a small
              garage roastery with a big dream: to bring specialty-grade coffee
              to everyone, without pretension.
            </p>

            <p className="about__desc text-body reveal-child">
              We source directly from farmers in Ethiopia, Colombia, and Guatemala.
              Every bean is hand-selected, small-batch roasted, and brewed with precision.
            </p>
          </div>
        </div>

        <div ref={statsRef} className="about__stats">
          <div className="stat">
            <span className="stat-number">6+</span>
            <span className="stat-label text-sm">Years Roasting</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">12</span>
            <span className="stat-label text-sm">Origin Countries</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label text-sm">Cups Served</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label text-sm">Specialty Grade</span>
          </div>
        </div>
      </div>
    </section>
  )
}
