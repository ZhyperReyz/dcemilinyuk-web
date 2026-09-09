import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutContact.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutContact() {
  const aboutRef   = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* About reveal */
      const aboutItems = aboutRef.current?.querySelectorAll('.about-reveal');
      aboutItems?.forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 87%' },
          }
        );
      });

      /* Contact reveal */
      const contactItems = contactRef.current?.querySelectorAll('.contact-reveal');
      contactItems?.forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── ABOUT ── */}
      <section ref={aboutRef} id="about" className="section about-section">
        <div className="glow" style={{ width:500, height:500, background:'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', top:0, left:'-10%' }} />
        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <p className="section-eyebrow about-reveal">Tentang Kami</p>
              <h2 className="section-title about-reveal">
                Warung Cemilan<br />
                <span style={{ color: 'var(--amber)' }}>Sejak 2018</span>
              </h2>
              <p className="about-text about-reveal">
                DcemilinYuk berawal dari dapur kecil Bu Dewi di RT 04, Sleman — menjajakan keripik singkong balado ke tetangga. 
                Sekarang kami melayani ribuan pelanggan setiap bulan dengan tetap mempertahankan cita rasa rumahan yang otentik.
              </p>
              <p className="about-text about-reveal">
                Semua produk dibuat <strong>fresh tanpa pengawet</strong>, menggunakan bahan lokal pilihan, dan dikemas dengan cinta 
                untuk memastikan kamu mendapat jajanan terbaik langsung dari sumbernya.
              </p>
              <div className="about-values about-reveal">
                {[
                  { icon: '🌾', title: 'Bahan Lokal', desc: 'Dari petani sekitar' },
                  { icon: '🔥', title: 'Fresh Daily', desc: 'Produksi setiap hari' },
                  { icon: '💚', title: 'Tanpa Pengawet', desc: 'Sehat & alami' },
                  { icon: '🚀', title: 'Cepat Diproses', desc: 'Siap dalam 24 jam' },
                ].map(v => (
                  <div key={v.title} className="about-value-item">
                    <span className="about-value-icon">{v.icon}</span>
                    <div>
                      <div className="about-value-title">{v.title}</div>
                      <div className="about-value-desc">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-right about-reveal">
              <div className="about-card card">
                <div className="about-card-emoji">🏪</div>
                <h3>DcemilinYuk</h3>
                <p>Jl. Raya Sleman No. 47, Yogyakarta</p>
                <div className="about-stats">
                  {[
                    { val: '6+', label: 'Tahun Berdiri' },
                    { val: '10K+', label: 'Pelanggan' },
                    { val: '10', label: 'Produk' },
                    { val: '4.9⭐', label: 'Rating' },
                  ].map(s => (
                    <div key={s.label} className="about-stat">
                      <div className="about-stat-val">{s.val}</div>
                      <div className="about-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="about-testimonials">
                {[
                  { name: 'Rina S.', msg: 'Onde-ondenya enak banget! Gula merahnya lumer sempurna 🤤', rating: 5 },
                  { name: 'Budi P.', msg: 'Keripik singkong balado level 5 bikin nagih, udah langganan 2 tahun!', rating: 5 },
                ].map((t, i) => (
                  <div key={i} className="testimonial card">
                    <div className="testimonial-header">
                      <div className="testimonial-avatar">{t.name[0]}</div>
                      <div>
                        <div className="testimonial-name">{t.name}</div>
                        <div className="stars">{'★'.repeat(t.rating)}</div>
                      </div>
                    </div>
                    <p className="testimonial-msg">"{t.msg}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={contactRef} id="contact" className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left">
              <p className="section-eyebrow contact-reveal">Hubungi Kami</p>
              <h2 className="section-title contact-reveal">Ada Pertanyaan?<br /><span style={{ color: 'var(--amber)' }}>Kami Siap!</span></h2>
              <p className="section-sub contact-reveal" style={{ marginBottom: 32 }}>
                Pesan langsung via WhatsApp, atau kunjungi warung kami. Kami melayani dengan sepenuh hati 💛
              </p>

              <div className="contact-info contact-reveal">
                {[
                  { icon: '📍', label: 'Alamat', value: 'Jl. Raya Sleman No. 47, Yogyakarta 55511' },
                  { icon: '📞', label: 'Telepon', value: '+62 812-3456-7890' },
                  { icon: '⏰', label: 'Jam Buka', value: 'Senin–Sabtu, 07.00–20.00 WIB' },
                  { icon: '📱', label: 'WhatsApp', value: '+62 812-3456-7890 (Admin)' },
                ].map(info => (
                  <div key={info.label} className="contact-info-row">
                    <span className="contact-info-icon">{info.icon}</span>
                    <div>
                      <div className="contact-info-label">{info.label}</div>
                      <div className="contact-info-value">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-ctas contact-reveal">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20DcemilinYuk!%20Saya%20ingin%20tanya%20tentang%20produk."
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-wa"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.1 1.523 5.823L.053 23.369a.75.75 0 0 0 .916.978l5.882-1.545A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                  Chat WhatsApp
                </a>
                <button className="btn btn-outline" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                  Lihat Menu
                </button>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="contact-map-wrap contact-reveal">
              <div className="contact-map card">
                <div className="contact-map-pin">📍</div>
                <div className="contact-map-label">
                  <strong>DcemilinYuk</strong>
                  <span>Jl. Raya Sleman No. 47</span>
                  <span>Yogyakarta, Jawa Tengah</span>
                </div>
                <div className="contact-map-grid" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
