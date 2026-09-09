import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function Categories() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.cat-card')

    gsap.set(cards, { y: 40, opacity: 0 })
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section className="section" id="categories">
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle text-sm">Kategori</div>
          <h2 className="heading-lg">Pilih Kategori <em>Favoritmu</em></h2>
          <p className="text-body">Berbagai pilihan cemilan dan minuman dari pedagang kecil terbaik.</p>
        </div>

        <div ref={gridRef} className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="cat-card">
              <div className="cat-card__icon">
                <i className={cat.icon}></i>
              </div>
              <h4 className="cat-card__name">{cat.name}</h4>
              <p className="cat-card__desc text-body">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
