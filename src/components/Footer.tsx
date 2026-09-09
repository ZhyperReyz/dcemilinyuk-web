export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">DcemilinYuk</div>
            <p className="footer-desc text-body">Katalog cemilan dan minuman terbaik dari pedagang kecil lokal.</p>
          </div>
          <div>
            <h4>Menu</h4>
            <div className="footer-links">
              <a href="#hero">Beranda</a>
              <a href="#products">Produk</a>
              <a href="#about">Tentang</a>
              <a href="#contact">Kontak</a>
            </div>
          </div>
          <div>
            <h4>Bantuan</h4>
            <div className="footer-links">
              <a href="#howto">Cara Pesan</a>
              <a href="#">FAQ</a>
              <a href="#">Ketentuan Layanan</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DcemilinYuk &mdash; Dibuat untuk pedagang lokal Indonesia.</p>
        </div>
      </div>
    </footer>
  )
}
