import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import './Navigation.css'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'split', label: 'Process' },
  { id: 'menu', label: 'Menu' },
  { id: 'specialty', label: 'Specialty' },
  { id: 'horizontal', label: 'Space' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const linksRef = useRef<(HTMLButtonElement | null)[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const btnLabelRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(false)

  useEffect(() => {
    if (!panelRef.current || !btnLabelRef.current || !contentRef.current) return
    const links = linksRef.current.filter(Boolean)
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } })

    tl.to(panelRef.current, {
      width: '100vw', height: '100vh', borderRadius: 0, duration: 0.8,
    }, 0)
    tl.to(contentRef.current, { opacity: 1, duration: 0.3 }, 0.3)
    tl.to(btnLabelRef.current, { yPercent: -100, duration: 0.3 }, 0.1)
    tl.fromTo(links,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.05 },
      0.3
    )
    tl.fromTo('.nav-panel__footer',
      { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.5
    )

    tlRef.current = tl
    return () => { tl.kill() }
  }, [])

  const toggle = useCallback(() => {
    const tl = tlRef.current
    if (!tl) return

    if (isOpenRef.current) {
      // Currently open → close
      tl.reverse()
      isOpenRef.current = false
      setIsOpen(false)
    } else {
      // Currently closed → open
      tl.play()
      isOpenRef.current = true
      setIsOpen(true)
    }
  }, [])

  const scrollTo = (id: string) => {
    // Close panel first
    if (isOpenRef.current) {
      tlRef.current?.reverse()
      isOpenRef.current = false
      setIsOpen(false)
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
  }

  // Simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`topnav ${scrolled ? 'topnav--scrolled' : ''} ${isOpen ? 'topnav--open' : ''}`}>
        <button className="topnav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>URJA</button>
        <button className="topnav__menu-btn" onClick={toggle} aria-label="Toggle menu">
          <span className="topnav__btn-label">
            <span ref={btnLabelRef} className="topnav__btn-text">
              <span>Menu</span>
              <span>Close</span>
            </span>
          </span>
        </button>
      </header>

      <div className={`nav-panel ${isOpen ? 'nav-panel--open' : ''}`}>
        <div ref={panelRef} className="nav-panel__bg" />
        <div ref={contentRef} className="nav-panel__content" style={{ opacity: 0 }}>
          <nav className="nav-panel__links">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => { linksRef.current[i] = el }}
                className="nav-panel__link"
                onClick={() => scrollTo(item.id)}
              >
                <span className="nav-panel__link-number">0{i + 1}</span>
                <span className="nav-panel__link-label">{item.label}</span>
                <span className="nav-panel__link-arrow">→</span>
              </button>
            ))}
          </nav>
          <div className="nav-panel__footer">
            <div className="nav-panel__footer-col">
              <span className="text-sm">Visit</span>
              <p>127 Roastery Lane<br />Arts District</p>
            </div>
            <div className="nav-panel__footer-col">
              <span className="text-sm">Hours</span>
              <p>7am — 9pm Daily</p>
            </div>
            <div className="nav-panel__footer-col">
              <span className="text-sm">Social</span>
              <p>Instagram · TikTok</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
