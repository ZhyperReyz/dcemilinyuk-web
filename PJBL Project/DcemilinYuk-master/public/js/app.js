/* ===== Main Application — baca config dari config.js ===== */

// Ambil dari CONFIG (config.js) — fallback jika CONFIG belum ada
const WA_NUMBER = (typeof CONFIG !== 'undefined') ? CONFIG.WA_NUMBER : '6282184445857';

// Storage Keys
const STORAGE = {
  THEME:     'dcemilin_theme',
  PRODUCTS:  'dcemilin_products',
  CATEGORIES:'dcemilin_categories'
};

// Utility Functions
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function getStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}

function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Placeholder inline SVG — tidak butuh file eksternal
const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F3F4F6'/%3E%3Cg fill='%23D1D5DB'%3E%3Crect x='150' y='95' width='100' height='75' rx='6'/%3E%3Ccircle cx='170' cy='115' r='10'/%3E%3Cpolygon points='150,170 185,130 210,155 240,120 250,170'/%3E%3C/g%3E%3Ctext x='50%25' y='88%25' font-family='sans-serif' font-size='13' fill='%239CA3AF' text-anchor='middle'%3ETidak ada foto%3C/text%3E%3C/svg%3E";

// Cegah gambar blank: base64 lama / null → ganti inline placeholder
function safeImgSrc(src) {
  if (!src || src.startsWith('data:')) return PLACEHOLDER_IMG;
  return src;
}

// onerror handler — cegah infinite loop
function handleImgError(img) {
  img.onerror = null;
  img.src = PLACEHOLDER_IMG;
}

// Get current page name
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '') || 'index';
  return page.toLowerCase();
}

// ===== WHATSAPP ORDER =====
function openWhatsApp(productName, price) {
  const formattedPrice = formatCurrency(price);
  const message = encodeURIComponent(
    `Halo DcemilinYuk! Saya ingin memesan:\n\n` +
    `*${productName}*\n` +
    `Harga: ${formattedPrice}\n\n` +
    `Mohon info ketersediaan dan pengirimannya. Terima kasih!`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}

function openWhatsAppGeneral() {
  const message = encodeURIComponent(
    `Halo DcemilinYuk! Saya ingin mengetahui lebih lanjut tentang produk-produk kalian.`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}

// ===== THEME =====
function initTheme() {
  const saved = localStorage.getItem(STORAGE.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  // Inject Font Awesome jika belum ada
  if (!document.getElementById('fa-cdn')) {
    const link = document.createElement('link');
    link.id   = 'fa-cdn';
    link.rel  = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    document.head.appendChild(link);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE.THEME, next);
  const sw = $('#theme-switch');
  if (sw) sw.classList.toggle('dark', next === 'dark');
}

// ===== TOAST =====
function showToast(message, type = 'info') {
  let container = $('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', warning: '!', info: 'i' };
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'i'}</span>
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== NAVBAR =====
function renderNavbar() {
  const container = $('#navbar-container');
  if (!container) return;
  const page = getCurrentPage();

  const navLink = (href, label, id) => {
    const isActive = page === id ? 'active' : '';
    return `<a href="${href}" class="${isActive}">${label}</a>`;
  };

  container.innerHTML = `
    <nav class="navbar" id="main-navbar">
      <div class="container">
        <a href="index.html" class="navbar-brand">
          <span>${(typeof CONFIG !== 'undefined') ? CONFIG.STORE_NAME : 'DcemilinYuk'}</span>
        </a>
        <div class="nav-links">
          ${navLink('index.html', 'Beranda', 'index')}
          ${navLink('Product.html', 'Produk', 'product')}
          ${navLink('About.html', 'Tentang', 'about')}
          ${navLink('Contact.html', 'Kontak', 'contact')}
        </div>
        <div class="nav-actions">
          <div class="theme-switch ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : ''}" id="theme-switch" onclick="toggleTheme()" title="Ganti Tema">
            <div class="theme-switch-thumb">
              <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              <svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            </div>
          </div>
          <button class="btn btn-wa btn-sm" onclick="openWhatsAppGeneral()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            <span class="btn-wa-text">Pesan WA</span>
          </button>
          <button onclick="openCart()" title="Keranjang" style="position:relative;background:transparent;border:1px solid var(--border);border-radius:var(--radius);padding:0.4rem 0.6rem;cursor:pointer;color:var(--text);display:flex;align-items:center;gap:0.35rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cart-badge" style="display:none;background:#EF4444;color:#fff;border-radius:99px;font-size:0.65rem;font-weight:700;min-width:18px;height:18px;align-items:center;justify-content:center;"></span>
          </button>
          <div class="mobile-toggle" onclick="toggleMobileMenu()">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="index.html">Beranda</a>
      <a href="Product.html">Produk</a>
      <a href="About.html">Tentang</a>
      <a href="Contact.html">Kontak</a>
      <a href="#" onclick="openWhatsAppGeneral();return false;" style="color:#25D366;font-weight:600;">Hubungi via WhatsApp</a>
    </div>
  `;
}

function toggleMobileMenu() {
  const menu = $('#mobile-menu');
  if (menu) menu.classList.toggle('active');
}

// ===== FOOTER =====
function renderFooter() {
  const container = $('#footer-container');
  if (!container) return;
  const wa = (typeof CONFIG !== 'undefined') ? CONFIG.WA_NUMBER : WA_NUMBER;
  const ig = (typeof CONFIG !== 'undefined' && CONFIG.INSTAGRAM) ? CONFIG.INSTAGRAM.replace('@','') : '';
  container.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">${(typeof CONFIG !== 'undefined') ? CONFIG.STORE_NAME : 'DcemilinYuk'}</div>
            <p class="footer-desc">${(typeof CONFIG !== 'undefined') ? CONFIG.STORE_DESC_SHORT : 'Katalog cemilan dan minuman terbaik dari pedagang kecil lokal.'}</p>
            <div class="footer-social">
              <a href="https://wa.me/${wa}" target="_blank" class="footer-social-btn" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
              ${ig ? `<a href="https://instagram.com/${ig}" target="_blank" class="footer-social-btn" title="Instagram"><i class="fa-brands fa-instagram"></i></a>` : ''}
            </div>
          </div>
          <div>
            <h4>Menu</h4>
            <div class="footer-links">
              <a href="index.html">Beranda</a>
              <a href="Product.html">Produk</a>
              <a href="About.html">Tentang</a>
              <a href="Contact.html">Kontak</a>
            </div>
          </div>
          <div>
            <h4>Kategori</h4>
            <div class="footer-links" id="footer-categories">
              ${(typeof getCategories === 'function' ? getCategories() : []).map(c => `<a href="Product.html?cat=${c.id}">${c.name}</a>`).join('') || '<a href="Product.html">Lihat Semua</a>'}
            </div>
          </div>
          <div>
            <h4>Kontak</h4>
            <div class="footer-links">
              <a href="https://wa.me/${wa}" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp Kami</a>
              ${ig ? `<a href="https://instagram.com/${ig}" target="_blank"><i class="fa-brands fa-instagram"></i> ${(typeof CONFIG !== 'undefined') ? CONFIG.INSTAGRAM : '@dcemilin_yuk'}</a>` : ''}
              <a href="Contact.html"><i class="fa-solid fa-address-card"></i> Hubungi Kami</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${(typeof CONFIG !== 'undefined') ? CONFIG.COPYRIGHT_YEAR : new Date().getFullYear()} ${(typeof CONFIG !== 'undefined') ? CONFIG.STORE_NAME : 'DcemilinYuk'} &mdash; Dibuat untuk pedagang lokal Indonesia.</p>
        </div>
      </div>
    </footer>
  `;
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderNavbar();
  renderFooter();
  initScrollReveal();
});
