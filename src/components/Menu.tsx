import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useTextReveal } from '../hooks/useScrollReveal'
import './Menu.css'

export const categories = [
  'Kopi',
  'Kopi Kaleng',
  'Penyegar',
  'Powder',
  'Teh',
  'Klasik & Spesial',
  'Makanan',
  'Cemilan',
]

export interface MenuItem {
  name: string
  desc?: string
  price: string
  spicy?: boolean
}

export const menuData: Record<string, MenuItem[]> = {
  'Kopi': [
    { name: 'Putih', price: '28.000', desc: 'Kopi susu klasik racikan URJA' },
    { name: 'Legit', price: '28.000', desc: 'Kopi susu manis dengan salted foam dan saus butterscotch' },
    { name: 'Kalpatharu', price: '28.000', desc: 'Kopi susu manis rasa bolu pisang' },
    { name: 'Mentigi', price: '28.000', desc: 'Kopi susu manis rasa blueberry dengan sentuhan cheesecake' },
    { name: 'Monaghan', price: '28.000', desc: 'Kopi susu manis dengan sirup rasa baileys 100% halal' },
    { name: 'Sativa', price: '32.000', desc: 'Kopi susu klasik dengan susu alternatif oats' },
    { name: 'Persik', price: '28.000', desc: 'Americano dengan sentuhan rasa lychee dan peach' },
    { name: 'Birru', price: '28.000', desc: 'Americano dengan sentuhan rasa blueberry' },
    { name: 'Enerji', price: '32.000', desc: 'Espresso dengan tambahan Red Bull Energy Drink' },
  ],
  'Kopi Kaleng': [
    { name: 'Putih', price: '32.000 / 38.000', desc: 'Kopi susu klasik racikan URJA' },
    { name: 'Arrum', price: '32.000 / 38.000', desc: 'Kopi susu manis dengan campuran sirup pandan' },
    { name: 'Puspa', price: '32.000 / 38.000', desc: 'Kopi susu manis dengan sentuhan floral' },
    { name: 'Badam', price: '32.000 / 38.000', desc: 'Kopi susu manis rasa kacang pistachio' },
    { name: 'Mendikai', price: '32.000 / 38.000', desc: 'Kopi susu manis dan segar rasa semangka' },
  ],
  'Penyegar': [
    { name: 'Aurora', price: '28.000', desc: 'Perpaduan jeruk, asam-manis, dan teh telang beraroma lembut' },
    { name: 'Selimun', price: '28.000', desc: 'Kombinasi segar semangka manis dan lime yang asam' },
    { name: 'Minty Fizz', price: '28.000', desc: 'Perpaduan citrus dan apel mint yang menyegarkan' },
    { name: 'Citrus Boost', price: '28.000', desc: 'Kombinasi buah-buahan tropikal yang asam dan manis' },
  ],
  'Powder': [
    { name: 'Coklat', price: '32.000' },
    { name: 'Matcha', price: '32.000' },
    { name: 'Coklat Pistachia', price: '36.000' },
    { name: 'Strawberry Matcha', price: '36.000' },
  ],
  'Teh': [
    { name: 'Lychee Tea', price: '26.000' },
    { name: 'Mixed Berry Tea', price: '26.000' },
    { name: 'Strawberry Peach Tea', price: '26.000' },
    { name: 'Apple Mint Tea', price: '26.000' },
  ],
  'Klasik & Spesial': [
    { name: 'Black / White / Manual Brew', price: '28.000', desc: 'Klasik untuk penikmat sejati' },
    { name: 'Dirty', price: '32.000', desc: 'Espresso shot di atas susu dingin' },
    { name: 'Mont Blanc', price: '32.000' },
    { name: 'Bomb', price: '32.000' },
    { name: 'Air Mineral', price: '8.000' },
  ],
  'Makanan': [
    { name: 'Mie Karet Ayam', price: '38.000' },
    { name: 'Nasi Goreng', price: '38.000' },
    { name: 'Nasi Ayam Sambal Matah', price: '38.000', spicy: true },
    { name: 'Nasi Ayam Sambal Ijo', price: '38.000', spicy: true },
    { name: 'Nasi Ayam Buttermilk', price: '38.000' },
    { name: 'Nasi Ayam Telur Asin', price: '38.000' },
    { name: 'Nasi Daging Sambal Matah', price: '38.000', spicy: true },
    { name: 'Nasi Daging Sambal Ijo', price: '38.000', spicy: true },
  ],
  'Cemilan': [
    { name: 'French Fries', price: '28.000' },
    { name: 'Cireng', price: '28.000' },
    { name: 'Tahu Cabe Garam', price: '28.000' },
    { name: 'Corn Ribs', price: '28.000' },
    { name: 'Sweet Potato', price: '32.000' },
    { name: 'Sampler', price: '35.000' },
    { name: 'Chicken Wing', price: '35.000' },
  ],
}

export default function Menu() {
  const titleRef = useTextReveal()
  const [active, setActive] = useState('Kopi')
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.menu-card')
    if (cards.length === 0) return
    gsap.fromTo(cards,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.03 }
    )
  }, [active])

  const items = menuData[active] || []

  return (
    <section className="menu section" id="menu">
      <div className="container">
        <div className="menu__header">
          <div ref={titleRef} className="menu__title heading-lg">
            <span className="text-line">Menu</span>
            <span className="text-line"><em>URJA</em></span>
          </div>
          <p className="text-body menu__subtitle reveal-child">
            Kopi, minuman, dan makanan — dibuat dengan sepenuh hati.
          </p>
        </div>

        {/* Category tabs */}
        <div className="menu__tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`menu__tab ${active === cat ? 'menu__tab--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items */}
        <div ref={gridRef} className="menu__grid">
          {items.map((item, i) => (
            <div key={`${active}-${i}`} className="menu-card">
              <div className="menu-card__header">
                <div className="menu-card__name-wrap">
                  <h3 className="menu-card__name">
                    {item.name}
                    {item.spicy && (
                      <span className="menu-card__spicy" title="Pedas">
                        🌶️ Pedas
                      </span>
                    )}
                  </h3>
                </div>
                <div className="menu-card__line" />
                <span className="menu-card__price">Rp {item.price}</span>
              </div>
              {item.desc && (
                <p className="menu-card__desc text-body">{item.desc}</p>
              )}
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="menu__notes">
          <p className="text-sm" style={{ textTransform: 'none', letterSpacing: '0' }}>
            *Harga belum termasuk PPN
          </p>
          <p className="text-sm" style={{ textTransform: 'none', letterSpacing: '0' }}>
            #ngopidiurja
          </p>
        </div>

        <div className="menu__footer reveal-child">
          <p className="text-body">Follow kami di Instagram</p>
          <a href="https://instagram.com/urjacoffee" target="_blank" rel="noopener noreferrer" className="btn-outline">
            @urjacoffee
          </a>
        </div>
      </div>
    </section>
  )
}
