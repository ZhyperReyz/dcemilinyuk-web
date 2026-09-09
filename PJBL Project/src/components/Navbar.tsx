import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CartItem, cartCount } from '../utils/cart';
import './Navbar.css';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Katalog', href: '#catalog' },
  { label: 'Tentang', href: '#about' },
  { label: 'Kontak', href: '#contact' },
];

/* ── Implements Awwwards Navigation Menus/1:
   - Shutter open (two panels rotate inward)
   - Line-by-line stagger reveal
   - Word mask on nav links
─────────────────────────────────────────── */
export default function Navbar({ cartItems, onOpenCart, theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [animating, setAnimating]   = useState(false);
  const menuRef    = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const linksRef   = useRef<HTMLAnchorElement[]>([]);
  const navRef     = useRef<HTMLElement>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);
  const count      = cartCount(cartItems);

  /* Scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Build GSAP timeline (Awwwards Nav/1 jump shutter) */
  useEffect(() => {
    const menu = menuRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!menu || !left || !right) return;

    /* Set initial state */
    gsap.set(left, { rotateY: -90, transformOrigin: 'left center' });
    gsap.set(right, { rotateY: 90, transformOrigin: 'right center' });
    const spans = linksRef.current.map(a => a?.querySelector('span')).filter(Boolean);
    gsap.set(spans, { y: '110%' });

    tlRef.current = gsap.timeline({ paused: true })
      .to([left, right], {
        rotateY: 0,
        duration: 0.8,
        ease: 'power4.inOut',
        stagger: 0,
      })
      .to(spans, {
        y: '0%',
        duration: 0.65,
        stagger: 0.07,
        ease: 'power3.out',
      }, '-=0.3');

    return () => { tlRef.current?.kill(); };
  }, []);

  const openMenu = () => {
    if (animating) return;
    menuRef.current!.style.display = 'block';
    requestAnimationFrame(() => {
      menuRef.current!.classList.add('open');
      setMenuOpen(true);
      tlRef.current?.play();
    });
  };

  const closeMenu = () => {
    if (animating) return;
    setAnimating(true);
    tlRef.current?.reverse().then(() => {
      menuRef.current!.classList.remove('open');
      menuRef.current!.style.display = 'none';
      setMenuOpen(false);
      setAnimating(false);
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <a href="#hero" className="navbar__logo"
             onClick={e => { e.preventDefault(); document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span className="navbar__logo-icon">🍡</span>
            <span><em>D</em>cemilin<em>Yuk</em></span>
          </a>

          {/* Desktop links */}
          <div className="navbar__links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                 className="navbar__link"
                 onClick={e => handleNavClick(e, l.href)}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Theme toggle */}
          <button className="navbar__theme" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Cart */}
          <button className="navbar__cart" onClick={onOpenCart} aria-label="Buka keranjang">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {count > 0 && <span className="navbar__cart-badge">{count}</span>}
          </button>

          {/* Hamburger */}
          <button
            className={`navbar__burger ${menuOpen ? 'open' : ''}`}
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Fullscreen menu */}
      <div ref={menuRef} className="fullscreen-menu" style={{ display: 'none' }}>
        <div className="menu-shutter">
          <div ref={leftRef} className="menu-shutter__left" />
          <div ref={rightRef} className="menu-shutter__right" />
        </div>
        <div className="menu-content">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              ref={el => { if (el) linksRef.current[i] = el; }}
              onClick={e => handleNavClick(e, l.href)}
            >
              <span>{l.label}</span>
            </a>
          ))}
        </div>
        <div className="menu-footer">
          <span>© 2025 DcemilinYuk</span>
          <span>Warung Cemilan Lokal 🌶️</span>
        </div>
      </div>
    </>
  );
}
