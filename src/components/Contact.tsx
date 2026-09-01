import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTextReveal, useScrollReveal } from '../hooks/useScrollReveal'
import './Contact.css'

/**
 * Ref: Scroll Animation/30 (OneElementScroll)
 * Ref: Hero Animations/11 (EntranceAnimationForImages)
 */
export default function Contact() {
  const titleRef = useTextReveal()
  const formRef = useScrollReveal({ stagger: 0.12, y: 40 })
  const mapRef = useRef<HTMLDivElement>(null)

  // Map parallax — Ref: Scroll Animation/30
  useEffect(() => {
    if (!mapRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(mapRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="contact section" id="contact">
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className="contact__title heading-lg">
          <span className="text-line">Get in</span>
          <span className="text-line"><em>Touch</em></span>
        </div>

        <div className="contact__grid">
          {/* Left — Info */}
          <div className="contact__info">
            <div className="contact__info-block reveal-child">
              <h4 className="text-sm">Visit Us</h4>
              <p className="text-body">
                127 Roastery Lane<br />
                Arts District, Downtown<br />
                Open 7am — 9pm Daily
              </p>
            </div>

            <div className="contact__info-block reveal-child">
              <h4 className="text-sm">Contact</h4>
              <p className="text-body">
                hello@urjacoffee.co<br />
                +1 (555) 024-7891
              </p>
            </div>

            <div className="contact__info-block reveal-child">
              <h4 className="text-sm">Follow</h4>
              <div className="contact__socials">
                <a href="#" className="contact__social-link">Instagram</a>
                <a href="#" className="contact__social-link">Twitter</a>
                <a href="#" className="contact__social-link">TikTok</a>
              </div>
            </div>

            {/* Decorative map-like element */}
            <div ref={mapRef} className="contact__map-placeholder">
              <div className="contact__map-pin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                  <circle cx="12" cy="9" r="2.5" fill="var(--color-bg)"/>
                </svg>
                <span className="text-sm">127 Roastery Lane</span>
              </div>
              <div className="contact__map-grid">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="contact__map-line-h" />
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={formRef} className="contact__form-wrap">
            <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group reveal-child">
                <label className="text-sm" htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" className="form-input" />
              </div>

              <div className="form-group reveal-child">
                <label className="text-sm" htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="your@email.com" className="form-input" />
              </div>

              <div className="form-group reveal-child">
                <label className="text-sm" htmlFor="subject">Subject</label>
                <select id="subject" className="form-input form-select">
                  <option value="">Select a topic</option>
                  <option value="reservation">Table Reservation</option>
                  <option value="catering">Catering Inquiry</option>
                  <option value="wholesale">Wholesale Beans</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group reveal-child">
                <label className="text-sm" htmlFor="message">Message</label>
                <textarea id="message" rows={4} placeholder="Tell us what you're thinking..." className="form-input form-textarea" />
              </div>

              <button type="submit" className="btn-primary form-submit reveal-child">
                <span>Send Message</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
