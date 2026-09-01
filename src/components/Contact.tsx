import { useTextReveal } from '../hooks/useScrollReveal'
import './Contact.css'

/**
 * Contact section — links to Instagram for inquiries
 */
export default function Contact() {
  const titleRef = useTextReveal()

  return (
    <section className="contact section" id="contact">
      <div className="container">
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
                DM us on Instagram<br />
                @urjacoffee
              </p>
            </div>

            <div className="contact__info-block reveal-child">
              <h4 className="text-sm">Follow</h4>
              <div className="contact__socials">
                <a href="https://instagram.com/urjacoffee" target="_blank" rel="noopener noreferrer" className="contact__social-link">Instagram</a>
                <a href="https://tiktok.com/@urjacoffee" target="_blank" rel="noopener noreferrer" className="contact__social-link">TikTok</a>
                <a href="https://twitter.com/urjacoffee" target="_blank" rel="noopener noreferrer" className="contact__social-link">Twitter</a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="contact__map-placeholder reveal-child">
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

          {/* Right — Instagram CTA */}
          <div className="contact__cta">
            <div className="contact__cta-card reveal-child">
              <div className="contact__cta-icon">📸</div>
              <h3 className="heading-md">Chat with us on Instagram</h3>
              <p className="text-body">
                For reservations, catering inquiries, wholesale beans,
                or just to say hi — send us a DM!
              </p>
              <a
                href="https://instagram.com/urjacoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Open Instagram</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="contact__cta-card reveal-child">
              <div className="contact__cta-icon">💬</div>
              <h3 className="heading-md">Quick Links</h3>
              <div className="contact__quick-links">
                <a href="https://instagram.com/urjacoffee" target="_blank" rel="noopener noreferrer" className="contact__quick-link">
                  <span className="text-sm">Reserve</span>
                  <span>DM for table booking →</span>
                </a>
                <a href="https://instagram.com/urjacoffee" target="_blank" rel="noopener noreferrer" className="contact__quick-link">
                  <span className="text-sm">Catering</span>
                  <span>DM for event catering →</span>
                </a>
                <a href="https://instagram.com/urjacoffee" target="_blank" rel="noopener noreferrer" className="contact__quick-link">
                  <span className="text-sm">Wholesale</span>
                  <span>DM for bean orders →</span>
                </a>
                <a href="https://instagram.com/urjacoffee" target="_blank" rel="noopener noreferrer" className="contact__quick-link">
                  <span className="text-sm">Collab</span>
                  <span>DM for partnerships →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
