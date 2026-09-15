import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { type CartItem, removeFromCart, updateQty, cartTotal, buildWhatsAppMessage, formatRupiah } from '../utils/cart';
import { ADMIN_WA, STORE_NAME } from '../data/products';
import './Cart.css';

interface CartProps {
  items: CartItem[];
  open: boolean;
  onClose: () => void;
  onCartChange: (items: CartItem[]) => void;
}

/* ── Floating cart drawer with GSAP slide-in ─── */
export default function Cart({ items, open, onClose, onCartChange }: CartProps) {
  const drawerRef  = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const prevOpen   = useRef(false);

  useEffect(() => {
    const drawer  = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return;

    if (open && !prevOpen.current) {
      /* Open: slide in from right */
      document.body.style.overflow = 'hidden';
      gsap.set(drawer, { x: '100%', display: 'flex' });
      gsap.set(backdrop, { display: 'block', opacity: 0 });
      gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(drawer, { x: '0%', duration: 0.5, ease: 'power4.out' });
    } else if (!open && prevOpen.current) {
      /* Close: slide out */
      document.body.style.overflow = '';
      gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(drawer, {
        x: '100%', duration: 0.45, ease: 'power3.in',
        onComplete: () => {
          gsap.set(drawer, { display: 'none' });
          gsap.set(backdrop, { display: 'none' });
        },
      });
    }
    prevOpen.current = open;
  }, [open]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    const msg = buildWhatsAppMessage(items, STORE_NAME);
    window.open(`https://wa.me/${ADMIN_WA}?text=${msg}`, '_blank');
  };

  const total = cartTotal(items);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="cart-backdrop"
        style={{ display: 'none' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div ref={drawerRef} className="cart-drawer" style={{ display: 'none' }}>
        <div className="cart-header">
          <div className="cart-header-left">
            <h2 className="cart-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Keranjang
            </h2>
            <span className="cart-count">{items.length} item</span>
          </div>
          <button className="cart-close" onClick={onClose} aria-label="Tutup keranjang">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Keranjang kamu masih kosong</p>
              <button className="btn btn-outline" onClick={onClose} style={{ marginTop: 16 }}>
                Lihat Katalog
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {items.map((item, idx) => {
                const variant = item.product.variants?.[item.selectedVariant];
                const price   = variant?.price ?? item.product.price;
                const subtotal = price * item.quantity;
                return (
                  <div key={`${item.product.id}-${item.selectedVariant}`} className="cart-item">
                    <div className="cart-item-img" style={{ background: item.product.imageBg }}>
                      <span>{item.product.image}</span>
                    </div>
                    <div className="cart-item-body">
                      <div className="cart-item-name">{item.product.name}</div>
                      {variant && <div className="cart-item-variant">{variant.label}</div>}
                      <div className="cart-item-footer">
                        <div className="cart-item-price">{formatRupiah(subtotal)}</div>
                        <div className="cart-item-qty">
                          <button
                            className="cart-qty-btn"
                            onClick={() => onCartChange(updateQty(items, idx, -1))}
                            aria-label="Kurangi"
                          >−</button>
                          <span className="cart-qty-val">{item.quantity}</span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => onCartChange(updateQty(items, idx, 1))}
                            aria-label="Tambah"
                          >+</button>
                        </div>
                        <button
                          className="cart-remove"
                          onClick={() => onCartChange(removeFromCart(items, idx))}
                          aria-label="Hapus"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with total + checkout */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total Pesanan</span>
              <span className="cart-total-amount">{formatRupiah(total)}</span>
            </div>
            <p className="cart-note">
              💬 Pesanan akan dikirim sebagai pesan WhatsApp ke admin
            </p>
            <button className="btn btn-wa cart-checkout" onClick={handleCheckout}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.1 1.523 5.823L.053 23.369a.75.75 0 0 0 .916.978l5.882-1.545A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
              Pesan via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
