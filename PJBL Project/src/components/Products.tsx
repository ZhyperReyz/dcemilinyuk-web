import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products, categories, formatPrice, getWhatsAppUrl } from '../data/products'
import ProductModal from './ProductModal'

gsap.registerPlugin(ScrollTrigger)

function isDesktop(): boolean {
  return window.innerWidth > 768
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<null | typeof products[0]>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === 'all'
    ? products.filter(p => p.available)
    : products.filter(p => p.available && p.category_id === activeCategory)

  const handleProductClick = useCallback((product: typeof products[0]) => {
    if (isDesktop()) {
      setSelectedProduct(product)
    }
    // On mobile: do nothing special, the WA link handles it
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.product-card')

    gsap.fromTo(cards,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.03 }
    )
  }, [activeCategory])

  useEffect(() => {
    if (!gridRef.current) return
    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 85%',
      onEnter: () => {
        const cards = gridRef.current!.querySelectorAll('.product-card')
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.05 }
        )
      },
      once: true,
    })
  }, [])

  return (
    <>
      <section className="section" id="products" style={{ background: 'var(--color-bg-warm)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-subtitle text-sm">Produk</div>
            <h2 className="heading-lg">Semua <em>Produk</em> Kami</h2>
            <p className="text-body">Pilih cemilan dan minuman favoritmu, lalu pesan via WhatsApp!</p>
          </div>

          <div className="product-tabs">
            <button
              className={`product-tab ${activeCategory === 'all' ? 'product-tab--active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`product-tab ${activeCategory === cat.id ? 'product-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="products-grid">
            {filtered.map((product) => {
              const badgeClass = product.badge === 'Best Seller' ? 'badge--bestseller'
                : product.badge === 'Baru' ? 'badge--new'
                : product.badge === 'Pedas' ? 'badge--pedas'
                : 'badge--popular'

              return (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: isDesktop() ? 'pointer' : 'default' }}
                >
                  {product.badge && (
                    <span className={`product-badge ${badgeClass}`}>{product.badge}</span>
                  )}
                  <div className="product-card__img-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card__img"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/400x300/1c1917/c8956c?text=${encodeURIComponent(product.name)}`
                      }}
                    />
                  </div>
                  <div className="product-card__body">
                    <div className="product-card__category">
                      {categories.find(c => c.id === product.category_id)?.name ?? product.category_id}
                    </div>
                    <h4 className="product-card__name">{product.name}</h4>
                    <p className="product-card__desc text-body">{product.description}</p>
                    <div className="product-card__footer">
                      <div className="product-card__price">{formatPrice(product.price)}</div>
                      <div className="product-card__meta">
                        <span className="product-card__rating">★ {product.rating}</span>
                        <span className="product-card__sold">{product.sold} terjual</span>
                      </div>
                    </div>
                    <a
                      href={getWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary product-card__btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Pesan via WA</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
