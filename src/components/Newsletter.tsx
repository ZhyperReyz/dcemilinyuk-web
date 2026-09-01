import { useTextReveal, useScrollReveal } from '../hooks/useScrollReveal'
import './Newsletter.css'

const perks = [
  { icon: '☕', title: 'Free Birthday Drink', desc: 'Any drink, on us, on your birthday.' },
  { icon: '⭐', title: 'Earn Points', desc: '1 point per $1 spent. Redeem for free drinks.' },
  { icon: '🎉', title: 'Early Access', desc: 'Be first to try new seasonal drinks.' },
  { icon: '📢', title: 'Member Events', desc: 'Exclusive workshops and tasting sessions.' },
]

export default function Newsletter() {
  const titleRef = useTextReveal()
  const perksRef = useScrollReveal({ stagger: 0.1 })

  return (
    <section className="newsletter section">
      <div className="container">
        <div className="newsletter__grid">
          {/* Left — Perks */}
          <div className="newsletter__perks">
            <div ref={titleRef} className="newsletter__title heading-lg">
              <span className="text-line">Join the</span>
              <span className="text-line"><em>Inner Circle</em></span>
            </div>
            <p className="text-body newsletter__desc reveal-child">
              Sign up for our loyalty program and get rewarded for every cup.
              It's free, it's easy, and your coffee just got better.
            </p>

            <div ref={perksRef} className="newsletter__perks-grid">
              {perks.map((perk, i) => (
                <div key={i} className="perk reveal-child">
                  <span className="perk__icon">{perk.icon}</span>
                  <div>
                    <h4 className="perk__title">{perk.title}</h4>
                    <p className="text-sm" style={{ textTransform: 'none', letterSpacing: '0' }}>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Signup form */}
          <div className="newsletter__form-wrap">
            <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
              <h3 className="heading-md">Get Started</h3>
              <p className="text-body">Enter your email to join the loyalty program.</p>

              <div className="newsletter__input-group">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="form-input newsletter__input"
                />
                <button type="submit" className="btn-primary">
                  <span>Join</span>
                </button>
              </div>

              <p className="text-sm" style={{ textTransform: 'none', letterSpacing: '0', opacity: 0.6 }}>
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
