import './Footer.css'

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__logo">NAAM</div>
            <p className="text-body">
              Artisan coffee, roasted with care in the heart of the city.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="text-sm footer__col-title">Pages</h4>
            <div className="footer__links">
              {['about', 'menu', 'gallery', 'events', 'contact'].map((id: string) => (
                <button key={id} className="footer__link" onClick={() => scrollTo(id)}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="text-sm footer__col-title">Hours</h4>
            <p className="text-body">
              Mon — Fri: 7am — 9pm<br />
              Sat — Sun: 8am — 10pm
            </p>
          </div>

          <div className="footer__col">
            <h4 className="text-sm footer__col-title">Connect</h4>
            <div className="footer__links">
              <a href="#" className="footer__link">Instagram</a>
              <a href="#" className="footer__link">TikTok</a>
              <a href="#" className="footer__link">Twitter</a>
              <a href="https://www.instagram.com/naamcoffee.id?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="footer__link">Instagram DM</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="text-sm">© 2026 NAAM Coffee. All rights reserved.</p>
          <p className="text-sm">Crafted with ☕ and intention</p>
        </div>
      </div>
    </footer>
  )
}
