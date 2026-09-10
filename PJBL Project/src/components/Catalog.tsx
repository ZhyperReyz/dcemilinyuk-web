import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, CATEGORIES, type Category } from '../data/products';
import { type CartItem, addToCart, formatRupiah } from '../utils/cart';
import './Catalog.css';

gsap.registerPlugin(ScrollTrigger);

interface CatalogProps {
  cartItems: CartItem[];
  onCartChange: (items: CartItem[]) => void;
}

const BADGE_COLORS: Record<string, string> = {
  'Best Seller': 'amber',
  'Baru':        'avocado',
  'Favorit':     'lilac',
  'Pedas':       'chili',
};

function StarRating({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

/* ── Awwwards Scroll Animation/6 Staggered3DGridAnimations + Grid Animations/8 HoverGrid ── */
export default function Catalog({ cartItems, onCartChange }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState('semua');
  const [addedIds, setAddedIds]             = useState<Record<string, boolean>>({});
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const gridRef   = useRef<HTMLDivElement>(null);
  const tabsRef   = useRef<HTMLDivElement>(null);
  const headRef   = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'semua'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category_id === activeCategory);

  /* ─ Section heading reveal ─ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const head = headRef.current;
      if (!head) return;
      gsap.fromTo(head.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: head, start: 'top 85%' },
        }
      );
      gsap.fromTo(tabsRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: tabsRef.current, start: 'top 88%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  /* ─ Grid stagger (Staggered3DGrid pattern) ─ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.prod-card');
      if (!cards || cards.length === 0) return;

      gsap.fromTo(cards,
        { opacity: 0, y: 60, rotateX: -12, scale: 0.93 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          stagger: { amount: 0.55, grid: 'auto', from: 'start' },
          duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        }
      );
    });
    return () => ctx.revert();
  }, [filtered]);

  /* 3D Tilt hover (HoverGrid pattern) */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 12, rotateX: -y * 9, scale: 1.02,
      duration: 0.35, ease: 'power2.out',
      transformPerspective: 800,
    });
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.5, ease: 'power3.out',
    });
  };

  const handleAddToCart = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !product.available) return;
    const variantIdx = selectedVariants[productId] ?? 0;
    const newCart = addToCart(cartItems, product, variantIdx);
    onCartChange(newCart);

    /* Bounce animation feedback */
    setAddedIds(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [productId]: false })), 900);
  };

  const handleVariantChange = (productId: string, idx: number) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: idx }));
  };

  const handleCategoryChange = (catId: string) => {
    const grid = gridRef.current;
    if (!grid) { setActiveCategory(catId); return; }
    gsap.to(grid, {
      opacity: 0, y: 20, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(catId);
        gsap.to(grid, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' });
      },
    });
  };

  const activeCat = CATEGORIES.find(c => c.id === activeCategory)!;

  return (
    <section id="catalog" className="section catalog">
      <div className="container">
        {/* Heading */}
        <div ref={headRef} className="catalog-head">
          <p className="section-eyebrow">Menu Pilihan Kami</p>
          <h2 className="section-title">Katalog <span className="text-amber">Produk</span></h2>
          <p className="section-sub">Semua dibuat fresh, tanpa bahan pengawet. Pesan sebelum kehabisan!</p>
        </div>

        {/* Category filter tabs */}
        <div ref={tabsRef} className="cat-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
              style={{ '--cat-color': cat.color } as React.CSSProperties}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <span className="cat-tab-icon">{cat.icon}</span>
              <span className="cat-tab-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Product count */}
        <div className="catalog-meta">
          <span>{filtered.length} produk</span>
          {activeCategory !== 'semua' && (
            <span className="catalog-meta-desc">{activeCat.description}</span>
          )}
        </div>

        {/* Product grid (Staggered3DGrid) */}
        <div ref={gridRef} className="prod-grid">
          {filtered.map(product => {
            const variantIdx = selectedVariants[product.id] ?? 0;
            const variant    = product.variants?.[variantIdx];
            const price      = variant?.price ?? product.price;
            const isAdded    = addedIds[product.id];
            const badgeColor = product.badge ? BADGE_COLORS[product.badge] ?? 'amber' : null;

            return (
              <div
                key={product.id}
                className={`prod-card card ${!product.available ? 'prod-card--unavail' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Badge */}
                {product.badge && (
                  <span className={`prod-badge badge badge-${badgeColor}`}>
                    {product.badge}
                  </span>
                )}

                {/* Image placeholder (emoji) */}
                <div
                  className="prod-image"
                  style={{ background: product.imageBg }}
                >
                  <span className="prod-emoji">{product.image}</span>
                  {!product.available && (
                    <div className="prod-unavail-overlay">Habis</div>
                  )}
                </div>

                {/* Info */}
                <div className="prod-body">
                  <div className="prod-meta">
                    <div className="prod-meta-left">
                      <StarRating rating={product.rating} />
                      <span className="prod-rating">{product.rating}</span>
                    </div>
                    <span className="prod-sold">{product.sold.toLocaleString('id-ID')} terjual</span>
                  </div>

                  <h3 className="prod-name">{product.name}</h3>
                  <p className="prod-desc">{product.description}</p>

                  {/* Variants */}
                  {product.variants && product.variants.length > 1 && (
                    <div className="prod-variants">
                      {product.variants.map((v, i) => (
                        <button
                          key={i}
                          className={`prod-variant ${variantIdx === i ? 'active' : ''}`}
                          onClick={() => handleVariantChange(product.id, i)}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="prod-footer">
                    <div className="prod-price">{formatRupiah(price)}</div>
                    <button
                      className={`prod-add-btn ${isAdded ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product.id)}
                      disabled={!product.available}
                      aria-label={`Tambah ${product.name} ke keranjang`}
                    >
                      {isAdded
                        ? <span>✓</span>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      }
                      {isAdded ? 'Ditambah!' : 'Keranjang'}
                    </button>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="prod-shine" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
