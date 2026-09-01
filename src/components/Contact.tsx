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
                @urjacoffee.id
              </p>
            </div>

            <div className="contact__info-block reveal-child">
              <h4 className="text-sm">Follow</h4>
              <div className="contact__socials">
                <a href="https://www.instagram.com/urjacoffee.id?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="contact__social-link">Instagram</a>
                <a href="https://tiktok.com/@urjacoffee.id" target="_blank" rel="noopener noreferrer" className="contact__social-link">TikTok</a>
                <a href="https://twitter.com/urjacoffee" target="_blank" rel="noopener noreferrer" className="contact__social-link">Twitter</a>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="contact__map reveal-child">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4871816188083!2d112.7291802793457!3d-7.299032200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb49f819e28b%3A0x5f0d858e61eb6478!2sUrja!5e0!3m2!1sid!2sus!4v1788235650429!5m2!1sid!2sus"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '4px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Urja Coffee Location"
              />
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
                href="https://www.instagram.com/urjacoffee.id?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
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
                <a href="https://www.instagram.com/urjacoffee.id?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="contact__quick-link">
                  <span className="text-sm">Reserve</span>
                  <span>DM for table booking →</span>
                </a>
                <a href="https://www.instagram.com/urjacoffee.id?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="contact__quick-link">
                  <span className="text-sm">Catering</span>
                  <span>DM for event catering →</span>
                </a>
                <a href="https://www.instagram.com/urjacoffee.id?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="contact__quick-link">
                  <span className="text-sm">Wholesale</span>
                  <span>DM for bean orders →</span>
                </a>
                <a href="https://www.instagram.com/urjacoffee.id?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="contact__quick-link">
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
