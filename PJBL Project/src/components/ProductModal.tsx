import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { Product } from '../data/products'
import { formatPrice, getWhatsAppUrl, categories } from '../data/products'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!product) return
    document.body.style.overflow = 'hidden'

    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      )
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [product])

  const handleClose = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 })
    }
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0, scale: 0.95, y: 20, duration: 0.2,
        onComplete: onClose,
      })
    } else {
      onClose()
    }
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  if (!product) return null

  const badgeClass = product.badge === 'Best Seller' ? 'badge--bestseller'
    : product.badge === 'Baru' ? 'badge--new'
    : product.badge === 'Pedas' ? 'badge--pedas'
    : 'badge--popular'

  return (
    <div ref={overlayRef} className="modal-overlay" onClick={handleClose}>
      <div ref={contentRef} className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Tutup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-image">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1c1917/c8956c?text=${encodeURIComponent(product.name)}`
            }}
          />
          {product.badge && (
            <span className={`product-badge ${badgeClass}`}>{product.badge}</span>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-category">
            {categories.find(c => c.id === product.category_id)?.name ?? product.category_id}
          </div>
          <h2 className="modal-title">{product.name}</h2>
          <p className="modal-desc text-body">{product.description}</p>

          {product.variants && product.variants.length > 0 && (
            <div className="modal-variants">
              <div className="modal-variants-label text-sm">Pilihan</div>
              <div className="modal-variants-list">
                {product.variants.map((v) => (
                  <span key={v.name} className="modal-variant">
                    {v.name} — {formatPrice(v.price)}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="modal-meta">
            <span className="modal-rating">★ {product.rating}</span>
            <span className="modal-sold">{product.sold} terjual</span>
          </div>

          <div className="modal-footer">
            <div className="modal-price">{formatPrice(product.price)}</div>
            <a
              href={getWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Pesan via WA</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
