import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../data/products';
import { CartItem, addToCart, formatRupiah } from '../utils/cart';
import './BestSellers.css';

gsap.registerPlugin(ScrollTrigger);

interface BestSellersProps {
  cartItems: CartItem[];
  onCartChange: (items: CartItem[]) => void;
}

const BEST = PRODUCTS.filter(p => p.badge === 'Best Seller' && p.available);

/* ── Awwwards Scroll Animation/38 Sticky Cards pattern ── */
export default function BestSellers({ cartItems, onCartChange }: BestSellersProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = listRef.current?.querySelectorAll('.bs-card');
      if (!cards) return;

      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0,
            duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 86%' },
          }
        );
      });

      /* Infinite marquee for sold count strip */
      const marquee = sectionRef.current?.querySelector('.bs-marquee-track');
      if (marquee) {
        const clone = marquee.cloneNode(true) as HTMLElement;
        marquee.parentElement?.appendChild(clone);
        gsap.to([marquee, clone], {
          xPercent: -100,
          ease: 'none',
          repeat: -1,
          duration: 18,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="bestsellers" className="section bs-section">
      <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
      <div className="container">
        <p className="section-eyebrow">Paling Diminati</p>
        <h2 className="section-title">Best <span style={{ color: 'var(--amber)' }}>Seller</span> Kami</h2>
      </div>

      {/* Marquee (glitchandgrit pattern adapted) */}
      <div className="bs-marquee">
        <div className="bs-marquee-track">
          {[...BEST, ...BEST].map((p, i) => (
            <span key={i} className="bs-marquee-item">
              {p.name} <span className="bs-marquee-sep">✦</span> {p.sold.toLocaleString('id-ID')} terjual
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div ref={listRef} className="bs-list">
          {BEST.map((product, i) => (
            <div key={product.id} className="bs-card card">
              <div className="bs-card-num">0{i + 1}</div>
              <div className="bs-card-img" style={{ background: product.imageBg }}>
                <span>{product.image}</span>
              </div>
              <div className="bs-card-body">
                <div className="bs-card-meta">
                  <span className="badge badge-amber">{product.badge}</span>
                  <span className="bs-sold">⭐ {product.rating} · {product.sold.toLocaleString('id-ID')} terjual</span>
                </div>
                <h3 className="bs-card-name">{product.name}</h3>
                <p className="bs-card-desc">{product.description}</p>
                <div className="bs-card-footer">
                  <div className="bs-card-price">{formatRupiah(product.price)}</div>
                  <button
                    className="btn btn-amber"
                    style={{ padding: '10px 20px', fontSize: '0.82rem' }}
                    onClick={() => onCartChange(addToCart(cartItems, product, 0))}
                  >
                    + Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
