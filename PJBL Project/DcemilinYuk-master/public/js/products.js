/* ===== DcemilinYuk - Products Data & Logic ===== */

const DEFAULT_PRODUCTS = [
  { id: 'et1', name: 'Es Teh Manis',        category: 'esteh',    price: 5000,  image: 'img/esteh.png',    description: 'Es teh manis klasik yang menyegarkan, dibuat dari teh pilihan.', rating: 4.8, sold: 1250, badge: 'Populer' },
  { id: 'et2', name: 'Es Teh Tarik',        category: 'esteh',    price: 8000,  image: 'img/esteh.png',    description: 'Es teh tarik dengan susu kental manis, creamy dan nikmat.', rating: 4.7, sold: 980,  badge: '' },
  { id: 'et3', name: 'Es Teh Lemon',        category: 'esteh',    price: 7000,  image: 'img/esteh.png',    description: 'Perpaduan teh segar dengan perasan lemon asli.', rating: 4.6, sold: 756,  badge: 'Baru' },
  { id: 'et4', name: 'Es Teh Susu',         category: 'esteh',    price: 8000,  image: 'img/esteh.png',    description: 'Es teh premium dengan campuran susu segar.', rating: 4.9, sold: 1100, badge: '' },
  { id: 'pi1', name: 'Pop Ice Mangga',      category: 'popice',   price: 5000,  image: 'img/popice.png',   description: 'Pop Ice rasa mangga yang manis dan menyegarkan.', rating: 4.5, sold: 890,  badge: '' },
  { id: 'pi2', name: 'Pop Ice Anggur',      category: 'popice',   price: 5000,  image: 'img/popice.png',   description: 'Pop Ice rasa anggur favorit semua kalangan.', rating: 4.4, sold: 720,  badge: '' },
  { id: 'pi3', name: 'Pop Ice Strawberry',  category: 'popice',   price: 6000,  image: 'img/popice.png',   description: 'Pop Ice strawberry dengan rasa buah segar.', rating: 4.6, sold: 650,  badge: 'Populer' },
  { id: 'pi4', name: 'Pop Ice Coklat',      category: 'popice',   price: 6000,  image: 'img/popice.png',   description: 'Pop Ice coklat yang creamy dan lezat.', rating: 4.3, sold: 580,  badge: '' },
  {
    id: 'ic1', name: 'Es cemil', category: 'icecream', price: 5000,
    image: 'img/escemil.jpeg',
    description: 'Es cemil lezat dengan aneka topping — tersedia porsi 5k dan 10k.',
    rating: 4.9, sold: 1500, badge: 'Best Seller',
    variants: [
      { name: 'Porsi Kecil', price: 5000,  label: '5k'  },
      { name: 'Porsi Besar', price: 10000, label: '10k' }
    ]
  },
  { id: 'ic2', name: 'Es cemil Coklat',    category: 'icecream', price: 10000, image: 'img/escemil.jpeg', description: 'Es cemil dengan topping coklat Belgian yang kaya rasa.', rating: 4.7, sold: 1320, badge: '' },
  { id: 'ic3', name: 'Es cemil Strawberry',category: 'icecream', price: 10000, image: 'img/escemil.jpeg', description: 'Es cemil dengan topping strawberry segar.', rating: 4.9, sold: 980,  badge: 'Baru' },
  { id: 'bl1', name: 'Bolen Pisang',        category: 'bolen',    price: 5000,  image: 'img/bolen.png',    description: 'Bolen pisang renyah dengan isian pisang manis.', rating: 4.7, sold: 2100, badge: 'Best Seller' },
  { id: 'bl2', name: 'Bolen Keju',          category: 'bolen',    price: 7000,  image: 'img/bolen.png',    description: 'Bolen keju dengan lelehan keju yang gurih.', rating: 4.6, sold: 1800, badge: '' },
  { id: 'bl3', name: 'Bolen Coklat',        category: 'bolen',    price: 7000,  image: 'img/bolen.png',    description: 'Bolen dengan isian coklat leleh yang nikmat.', rating: 4.8, sold: 1650, badge: 'Populer' },
  { id: 'bl4', name: 'Bolen Pisang Coklat', category: 'bolen',    price: 8000,  image: 'img/bolen.png',    description: 'Kombinasi pisang dan coklat dalam pastry renyah.', rating: 4.9, sold: 1400, badge: '' },
  // ── MAKANAN BERAT ──
  { id: 'mb1', name: 'Nasi Ayam Bakar',      category: 'makberat', price: 15000, image: 'img/nasiayam1.jpeg', description: 'Nasi ayam bakar hemat, gurih dan lezat dengan sambal spesial.',    rating: 4.8, sold: 320, badge: 'Populer' },
  { id: 'mb2', name: 'Nasi Kotak Ayam Bakar',category: 'makberat', price: 20000, image: 'img/nasiayam2.jpeg', description: 'Nasi kotak ayam bakar lengkap dengan lauk dan sayur.',                 rating: 4.7, sold: 210, badge: '' },
  { id: 'mb3', name: 'Burger Sapi/Ayam',     category: 'makberat', price: 15000, image: 'img/burger.jpeg',   description: 'Burger juicy pilihan daging sapi atau ayam, saus spesial.',        rating: 4.6, sold: 185, badge: '' },
  { id: 'mb4', name: 'Kebab Sapi',           category: 'makberat', price: 12000, image: 'img/kebab.jpeg',    description: 'Kebab sapi dengan sayuran segar dan saus mayonaise pedas.',       rating: 4.5, sold: 160, badge: '' },
  { id: 'mb5', name: 'Mie Geprek Katsu',     category: 'makberat', price: 15000, image: 'img/miegeprek.jpeg', description: 'Mie geprek dengan katsu ayam crispy dan sambal geprek pedas.',    rating: 4.7, sold: 140, badge: 'Baru' },
  { id: 'mb6', name: 'Seblak Rafael',        category: 'makberat', price: 12000, image: 'img/seblak.jpeg',   description: 'Seblak khas Rafael, pedas gurih dengan aneka topping.',            rating: 4.6, sold: 130, badge: '' },
  { id: 'mb7', name: 'Martabak Kulit Lumpia',category: 'makberat', price: 10000, image: 'img/martabak.jpeg', description: 'Martabak telur renyah dengan kulit lumpia tipis, gurih nikmat.',   rating: 4.8, sold: 200, badge: 'Populer' },
  // ── KUE & DESSERT ──
  { id: 'kd1', name: 'Bolu Original',          category: 'kuedessert', price: 20000, image: 'img/bolu.jpeg',         description: 'Bolu lembut dan harum, cocok untuk camilan atau hadiah.',         rating: 4.7, sold: 310, badge: '' },
  { id: 'kd2', name: 'Bolu Potong',            category: 'kuedessert', price: 10000, image: 'img/bolupotong.jpeg',   description: 'Bolu potong lembut tersedia per slice, pas buat camilan harian.', rating: 4.6, sold: 280, badge: '' },
  { id: 'kd3', name: 'Bolu Tape Keju 22cm',    category: 'kuedessert', price: 45000, image: 'img/bolupotong2.jpeg',  description: 'Bolu tape keju 22cm, perpaduan tape yang legit dengan keju asin.', rating: 4.9, sold: 150, badge: 'Populer' },
  { id: 'kd4', name: 'Brownis Choco Chip',     category: 'kuedessert', price: 35000, image: 'img/brownis1.jpeg',     description: 'Brownis choco chip ukuran 20x20, coklat pekat dan moist.',        rating: 4.8, sold: 210, badge: 'Best Seller' },
  { id: 'kd5', name: 'Brownis Choco Chip Mini',category: 'kuedessert', price: 25000, image: 'img/brownis2.jpeg',     description: 'Brownis choco chip ukuran 20x10, pas untuk 4-6 orang.',           rating: 4.7, sold: 190, badge: '' },
  { id: 'kd6', name: 'Brownis Hias',           category: 'kuedessert', price: 50000, image: 'img/brownishias.jpeg',  description: 'Brownis cantik dengan hiasan premium, cocok untuk kado & hampers.', rating: 4.9, sold: 120, badge: 'Baru' },
  { id: 'kd7', name: 'Brownis Choco Cheese',   category: 'kuedessert', price: 40000, image: 'img/brownischeese.jpeg', description: 'Brownis choco cheese tuty fruity, manis asam yang unik.',         rating: 4.8, sold: 140, badge: '' },
  { id: 'kd8', name: 'Bolen Pisang Keju',      category: 'kuedessert', price: 7000,  image: 'img/bolenpisangkeju.jpeg', description: 'Bolen pisang keju renyah dengan kombinasi manis dan gurih.',     rating: 4.8, sold: 560, badge: 'Populer' },
  // ── SNACK & GORENGAN ──
  { id: 'sn1', name: 'Kentang Goreng',          category: 'snack', price: 8000,  image: 'img/kentanggoreng.jpeg', description: 'Kentang goreng crispy, renyah di luar lembut di dalam.',          rating: 4.5, sold: 430, badge: '' },
  { id: 'sn2', name: 'Sosis Bakar',             category: 'snack', price: 8000,  image: 'img/sosisbakar.jpeg',   description: 'Sosis bakar juicy dengan bumbu spesial dan saus pedas manis.',    rating: 4.6, sold: 390, badge: '' },
  { id: 'sn3', name: 'Pisang Goreng Madu',      category: 'snack', price: 7000,  image: 'img/pisanggoreng.jpeg', description: 'Pisang goreng madu crispy manis, camilan favorit semua usia.',    rating: 4.7, sold: 510, badge: 'Populer' },
  { id: 'sn4', name: 'Cireng Salju',            category: 'snack', price: 8000,  image: 'img/cirengSalju.jpeg',  description: 'Cireng salju crispy dengan bumbu balado atau keju, gurih nagih.',  rating: 4.6, sold: 340, badge: '' },
  { id: 'sn5', name: 'Jasuke',                  category: 'snack', price: 8000,  image: 'img/jasuke.jpeg',       description: 'Jagung susu keju, manis gurih creamy, cocok buat camilan sore.',  rating: 4.5, sold: 270, badge: '' },
  { id: 'sn6', name: 'Gabin Fla',               category: 'snack', price: 8000,  image: 'img/gabinfla.jpeg',     description: 'Gabin berisi fla creamy lembut, manis dan bikin ketagihan.',      rating: 4.7, sold: 300, badge: 'Baru' },
  { id: 'sn7', name: 'Risolles',                category: 'snack', price: 5000,  image: 'img/risolles.jpeg',     description: 'Risolles kulit tipis dengan isian ragout ayam creamy dan sayur.', rating: 4.8, sold: 480, badge: 'Populer' },
  { id: 'sn8', name: 'Sambal Geprek',           category: 'snack', price: 5000,  image: 'img/sambalgeprek.jpeg', description: 'Sambal geprek pedas nikmat, cocok sebagai pelengkap makanan.',    rating: 4.5, sold: 220, badge: '' },
  // ── HAMPERS ──
  { id: 'hp1', name: 'Hampers Ayam Bakar',      category: 'hampers', price: 75000, image: 'img/hampers.jpeg',      description: 'Paket hampers ayam bakar lengkap, cocok untuk acara & hadiah.',   rating: 4.9, sold: 85,  badge: 'Best Seller' },
  { id: 'hp2', name: 'Hampers Ayam Bakar Eksklusif', category: 'hampers', price: 95000, image: 'img/hampersayam2.jpeg', description: 'Hampers ayam bakar eksklusif dengan packaging premium.',       rating: 4.8, sold: 60,  badge: '' },
  { id: 'hp3', name: 'Hampers Urap Sayur',      category: 'hampers', price: 65000, image: 'img/hampersUrap.jpeg',  description: 'Paket hampers urap urap sayur segar, sehat dan mengenyangkan.',   rating: 4.7, sold: 45,  badge: 'Baru' }
];

const DEFAULT_CATEGORIES = [
  { id: 'minuman',    name: 'Minuman',           icon: 'fa-solid fa-glass-water',    description: 'Segar & Nikmat' },
  { id: 'esteh',      name: 'Es Teh',           icon: 'fa-solid fa-mug-hot',        description: 'Segar & Nikmat' },
  { id: 'popice',     name: 'Pop Ice',           icon: 'fa-solid fa-snowflake',      description: 'Dingin & Manis' },
  { id: 'icecream',   name: 'Ice Cream',         icon: 'fa-solid fa-ice-cream',      description: 'Premium & Lezat' },
  { id: 'snack',      name: 'Snack & Gorengan',  icon: 'fa-solid fa-drumstick-bite', description: 'Crispy & Nagih' },
  { id: 'bolen',      name: 'Bolen',             icon: 'fa-solid fa-bread-slice',    description: 'Renyah & Gurih' },
  { id: 'kuedessert', name: 'Kue & Dessert',     icon: 'fa-solid fa-cake-candles',   description: 'Manis & Lezat' },
  { id: 'makberat',   name: 'Makanan Berat',     icon: 'fa-solid fa-utensils',       description: 'Mengenyangkan' },
  { id: 'hampers',    name: 'Hampers',           icon: 'fa-solid fa-gift',           description: 'Paket Spesial' }
];

// Urutan tampil: Minuman → Snack & Gorengan → Bolen → Kue & Dessert → Makanan Berat → Hampers
const CATEGORY_ORDER = [
  'minuman', 'esteh', 'popice', 'icecream',   // Minuman
  'snack',                          // Snack & Gorengan
  'bolen',                          // Bolen
  'kuedessert',                     // Kue & Dessert
  'makberat',                       // Makanan Berat
  'hampers'                         // Hampers
];

// Gunakan cache dari supabase.js (_products, _categories)
// Fallback ke DEFAULT jika belum init
function getProducts()   { return _products   || DEFAULT_PRODUCTS; }
function getCategories() { return _categories || DEFAULT_CATEGORIES; }

// ===== VARIANT & QTY HELPERS =====
function changeVariant(btn, price, label) {
  const card = btn.closest('.product-card');
  card.querySelectorAll('.variant-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  card.dataset.currentPrice = price;
  card.dataset.currentVariant = label;
  const priceEl = card.querySelector('.card-price');
  if (priceEl) priceEl.textContent = formatCurrency(price);
}

function changeQty(btn, delta) {
  const card = btn.closest('.product-card');
  const qtyEl = card.querySelector('.qty-value');
  let qty = parseInt(qtyEl.textContent) + delta;
  if (qty < 1) qty = 1;
  if (qty > 99) qty = 99;
  qtyEl.textContent = qty;
}

function orderProductCard(btn) {
  btn.stopPropagation ? btn.stopPropagation() : null;
  const card  = btn.closest('.product-card');
  const id    = card.dataset.id;
  const prods = getProducts();
  const prod  = prods.find(p => p.id === id);
  if (!prod) return;

  const price   = parseInt(card.dataset.currentPrice  || prod.price);
  const variant = card.dataset.currentVariant || '';
  const qty     = parseInt(card.querySelector('.qty-value')?.textContent || '1');
  const total   = price * qty;

  const variantText = variant ? ` (${variant})` : '';
  const message = encodeURIComponent(
    `Halo DcemilinYuk! Saya mau pesan:\n\n` +
    `*${prod.name}${variantText}*\n` +
    `Harga satuan: ${formatCurrency(price)}\n` +
    `Jumlah: ${qty} porsi\n` +
    `Total: *${formatCurrency(total)}*\n\n` +
    `Mohon konfirmasi ketersediaan ya! Terima kasih`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}

function addToCartFromCard(btn) {
  const card    = btn.closest('.product-card');
  const id      = card.dataset.id;
  const prod    = getProducts().find(p => p.id === id);
  if (!prod) return;
  const price   = parseInt(card.dataset.currentPrice  || prod.price);
  const variant = card.dataset.currentVariant || '';
  const qty     = parseInt(card.querySelector('.qty-value')?.textContent || '1');
  if (typeof addToCart === 'function') addToCart(id, qty, price, variant);
}

// ===== PRODUCT DETAIL MODAL =====
let _pdProduct = null;

function _injectPdModal() {
  if (document.getElementById('pd-overlay')) return;
  const waIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;
  const div = document.createElement('div');
  div.innerHTML = `
  <div id="pd-overlay" onclick="closePdModal()" style="display:none;position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.75);display:none;align-items:flex-end;justify-content:center;backdrop-filter:blur(4px);">
    <div id="pd-card" onclick="event.stopPropagation()" style="background:var(--surface);border-radius:1.25rem 1.25rem 0 0;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;position:relative;animation:pdSlideUp 0.3s ease;">
      <button onclick="closePdModal()" style="position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.55);color:#fff;font-size:1.1rem;z-index:10;display:flex;align-items:center;justify-content:center;">✕</button>
      <img id="pd-img" alt="Foto produk" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:1.25rem 1.25rem 0 0;display:block;">
      <div style="padding:1.25rem;">
        <span id="pd-cat" style="font-size:0.72rem;font-weight:700;color:var(--primary);text-transform:uppercase;letter-spacing:0.06em;"></span>
        <h2 id="pd-name" style="font-size:1.4rem;font-weight:700;margin:0.25rem 0 0.5rem;"></h2>
        <p id="pd-desc" style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:0.75rem;line-height:1.6;"></p>
        <div id="pd-rating" style="display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;margin-bottom:0.75rem;"></div>
        <div id="pd-variants"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin:0.875rem 0;">
          <span id="pd-price" style="font-size:1.5rem;font-weight:700;color:var(--primary);"></span>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <button class="qty-btn" style="width:44px;height:44px;font-size:1.3rem;" onclick="pdQty(-1)">−</button>
            <span id="pd-qty" style="min-width:32px;text-align:center;font-size:1.1rem;font-weight:700;">1</span>
            <button class="qty-btn" style="width:44px;height:44px;font-size:1.3rem;" onclick="pdQty(1)">+</button>
          </div>
        </div>
        <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
          <button id="pd-cart-btn" style="flex:1;padding:0.875rem;border:none;border-radius:var(--radius);background:var(--primary);color:#fff;cursor:pointer;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;font-size:0.95rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Tambah ke Keranjang
          </button>
          <button id="pd-order-btn" class="btn-wa-sm" style="flex:1;justify-content:center;display:flex;align-items:center;gap:7px;font-size:0.9rem;padding:0.875rem;">${waIcon} Langsung Pesan</button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.appendChild(div.firstElementChild);
  // Inject smooth animation keyframes
  if (!document.getElementById('pd-style')) {
    const s = document.createElement('style');
    s.id = 'pd-style';
    s.textContent = `
      @keyframes pdSlideUp   { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes pdSlideDown { from { transform: translateY(0);    opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
      @keyframes pdFadeIn    { from { opacity: 0; } to { opacity: 1; } }
      @keyframes pdFadeOut   { from { opacity: 1; } to { opacity: 0; } }
      #pd-card { animation: pdSlideUp 0.35s cubic-bezier(0.34,1.1,0.64,1) both; }
      #pd-overlay { animation: pdFadeIn 0.25s ease both; }
    `;
    document.head.appendChild(s);
  }
}

function showProductModal(productId) {
  _injectPdModal();
  const prod = getProducts().find(p => p.id === productId);
  if (!prod) return;
  _pdProduct = prod;

  const cats    = getCategories();
  const catName = cats.find(c => c.id === prod.category)?.name || prod.category;

  let variants = null;
  if (prod.variants) {
    variants = typeof prod.variants === 'string'
      ? (() => { try { return JSON.parse(prod.variants); } catch { return null; } })()
      : prod.variants;
  }

  const defPrice   = variants ? variants[0].price : prod.price;
  const defVariant = variants ? variants[0].label : '';

  const overlay = document.getElementById('pd-overlay');
  overlay.dataset.currentPrice   = defPrice;
  overlay.dataset.currentVariant = defVariant;

  const img = document.getElementById('pd-img');
  // Reset dulu, kasih background loading
  img.src = '';
  img.style.background = 'var(--bg-secondary)';
  // Base64 data URL yang tersimpan di DB (legacy) sering truncated & tidak trigger onerror
  // Langsung fallback ke placeholder agar modal tidak blank
  const imgSrc = prod.image || '';
  if (!imgSrc || imgSrc.startsWith('data:')) {
    img.src = PLACEHOLDER_IMG;
  } else {
    img.src = imgSrc;
    img.onerror = () => handleImgError(img);
  }
  document.getElementById('pd-cat').textContent   = catName;
  document.getElementById('pd-name').textContent  = prod.name;
  document.getElementById('pd-desc').textContent  = prod.description;
  document.getElementById('pd-rating').innerHTML  = `<span style="color:#F59E0B;">${renderStars(prod.rating)}</span><span style="color:var(--text-muted);">(${prod.sold} terjual)</span>`;
  document.getElementById('pd-price').textContent = formatCurrency(defPrice);
  document.getElementById('pd-qty').textContent   = '1';

  const varEl = document.getElementById('pd-variants');
  varEl.innerHTML = variants ? `
    <div class="variant-selector">
      <span class="variant-label">Pilih Porsi:</span>
      <div class="variant-pills">
        ${variants.map((v, i) => `<button class="variant-pill ${i===0?'active':''}" onclick="pdVariant(this,${v.price},'${v.label}')">${v.label}</button>`).join('')}
      </div>
    </div>` : '';

  document.getElementById('pd-cart-btn').onclick  = pdAddToCart;
  document.getElementById('pd-order-btn').onclick = pdOrder;
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closePdModal() {
  const o    = document.getElementById('pd-overlay');
  const card = document.getElementById('pd-card');
  if (!o) return;
  // Animasi smooth sebelum disembunyikan
  card.style.animation = 'pdSlideDown 0.28s cubic-bezier(0.4,0,1,1) both';
  o.style.animation    = 'pdFadeOut 0.28s ease both';
  setTimeout(() => {
    o.style.display    = 'none';
    card.style.animation = '';
    o.style.animation    = '';
    document.body.style.overflow = '';
  }, 280);
}

function pdVariant(btn, price, label) {
  document.querySelectorAll('#pd-overlay .variant-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const o = document.getElementById('pd-overlay');
  o.dataset.currentPrice   = price;
  o.dataset.currentVariant = label;
  document.getElementById('pd-price').textContent = formatCurrency(price);
}

function pdQty(delta) {
  const el = document.getElementById('pd-qty');
  let q = parseInt(el.textContent) + delta;
  if (q < 1) q = 1; if (q > 99) q = 99;
  el.textContent = q;
}

function pdAddToCart() {
  if (!_pdProduct) return;
  const o       = document.getElementById('pd-overlay');
  const price   = parseInt(o.dataset.currentPrice || _pdProduct.price);
  const variant = o.dataset.currentVariant || '';
  const qty     = parseInt(document.getElementById('pd-qty').textContent) || 1;
  if (typeof addToCart === 'function') {
    addToCart(_pdProduct.id, qty, price, variant);
    closePdModal();
  }
}

function pdOrder() {
  if (!_pdProduct) return;
  const o       = document.getElementById('pd-overlay');
  const price   = parseInt(o.dataset.currentPrice   || _pdProduct.price);
  const variant = o.dataset.currentVariant || '';
  const qty     = parseInt(document.getElementById('pd-qty').textContent) || 1;
  const total   = price * qty;
  const vt      = variant ? ` (${variant})` : '';
  const msg     = encodeURIComponent(
    `Halo DcemilinYuk! Saya mau pesan:\n\n` +
    `*${_pdProduct.name}${vt}*\n` +
    `Harga satuan: ${formatCurrency(price)}\n` +
    `Jumlah: ${qty} porsi\n` +
    `Total: *${formatCurrency(total)}*\n\n` +
    `Mohon konfirmasi ketersediaan ya! Terima kasih`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

// ===== RENDER =====
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

function renderProductCard(product) {
  const cats    = getCategories();
  const catName = cats.find(c => c.id === product.category)?.name || product.category;
  const badgeClass = product.badge === 'Best Seller' ? 'sale' : product.badge === 'Baru' ? 'new' : '';
  const available   = product.available !== false; // default: tersedia

  // Parse variants (bisa string JSON dari Supabase atau array dari DEFAULT)
  let variants = null;
  if (product.variants) {
    variants = typeof product.variants === 'string'
      ? (() => { try { return JSON.parse(product.variants); } catch { return null; } })()
      : product.variants;
  }

  const defaultPrice   = variants ? variants[0].price : product.price;
  const defaultVariant = variants ? variants[0].label : '';

  const waIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

  const variantHtml = variants ? `
    <div class="variant-selector" onclick="event.stopPropagation()">
      <span class="variant-label">Pilih Porsi:</span>
      <div class="variant-pills">
        ${variants.map((v, i) => `
          <button class="variant-pill ${i === 0 ? 'active' : ''}"
            onclick="event.stopPropagation();changeVariant(this, ${v.price}, '${v.label}')"
            title="${v.name}">${v.label}</button>`).join('')}
      </div>
    </div>` : '';

  return `
    <div class="card product-card reveal${available ? '' : ' sold-out'}" data-id="${product.id}" data-current-price="${defaultPrice}" data-current-variant="${defaultVariant}" onclick="showProductModal('${product.id}')" style="cursor:pointer;">
      ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
      ${!available ? '<span class="badge-habis">HABIS</span>' : ''}
      <img src="${safeImgSrc(product.image)}" alt="${product.name}" class="card-img" loading="lazy" onerror="handleImgError(this)">
      <div class="card-body">
        <div class="product-category">${catName}</div>
        <h4 class="card-title">${product.name}</h4>
        <p class="card-text">${product.description}</p>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="count">(${product.sold} terjual)</span>
        </div>
        ${variantHtml}
        <div class="card-footer" style="border:none;padding:0;margin-top:0.75rem;" onclick="event.stopPropagation()">
          <div class="card-bottom-row">
            <span class="card-price">${formatCurrency(defaultPrice)}</span>
            <div class="qty-selector">
              <button class="qty-btn" ${!available ? 'disabled' : ''} onclick="event.stopPropagation();changeQty(this, -1)">−</button>
              <span class="qty-value">1</span>
              <button class="qty-btn" ${!available ? 'disabled' : ''} onclick="event.stopPropagation();changeQty(this, 1)">+</button>
            </div>
          </div>
          ${available
            ? `<button class="btn-add-cart btn-order-full" onclick="event.stopPropagation();addToCartFromCard(this)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Tambah ke Keranjang
               </button>`
            : `<button class="btn-sold-out btn-order-full" disabled>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                Stok Habis
               </button>`
          }
        </div>
      </div>
    </div>`;
}

function filterProducts(category = 'all', search = '', sort = 'popular') {
  let list = [...getProducts()];
  if (category !== 'all') list = list.filter(p => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  switch (sort) {
    case 'price-low':  list.sort((a, b) => a.price - b.price); break;
    case 'price-high': list.sort((a, b) => b.price - a.price); break;
    case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    default:           list.sort((a, b) => b.sold - a.sold);
  }
  return list;
}

function renderProducts(container, products) {
  const el = typeof container === 'string' ? $(container) : container;
  if (!el) return;
  if (!products.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon"></div><h3>Produk tidak ditemukan</h3><p>Coba kata kunci lain.</p></div>`;
    return;
  }

  const cats = getCategories();

  // Kelompokkan produk berdasarkan kategori masing-masing
  const grouped = {};
  products.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  // Urutkan ID kategori yang ada berdasarkan CATEGORY_ORDER, yang tidak ada di order ditaruh di akhir
  const renderOrder = Object.keys(grouped).sort((a, b) => {
    const idxA = CATEGORY_ORDER.indexOf(a);
    const idxB = CATEGORY_ORDER.indexOf(b);
    const valA = idxA === -1 ? 999 : idxA;
    const valB = idxB === -1 ? 999 : idxB;
    return valA - valB;
  });

  let html = '';
  renderOrder.forEach(catId => {
    const items = grouped[catId];
    if (!items || !items.length) return;
    const cat = cats.find(c => c.id === catId);
    const catName = cat ? cat.name : catId;
    html += `
      <div class="product-section reveal" style="margin-bottom:2.5rem;">
        <div class="product-section-header">
          <h3 class="product-section-title">${catName}</h3>
          <span class="product-section-count">${items.length} produk</span>
        </div>
        <div class="products-grid">
          ${items.map(renderProductCard).join('')}
        </div>
      </div>`;
  });

  el.innerHTML = html;
  if (typeof initScrollReveal === 'function') initScrollReveal();
}

function renderCategories(containerId) {
  const el = $(containerId);
  if (!el) return;
  el.innerHTML = getCategories().map(cat => {
    // Kalau icon dimulai 'fa-' → render Font Awesome <i>, kalau tidak → emoji biasa
    const iconHtml = cat.icon && cat.icon.startsWith('fa-')
      ? `<i class="${cat.icon}"></i>`
      : cat.icon;
    return `
      <div class="category-card reveal" onclick="window.location.href='Product.html?cat=${cat.id}'">
        <div class="category-icon">${iconHtml}</div>
        <h4>${cat.name}</h4>
        <p>${cat.description || ''}</p>
      </div>`;
  }).join('');
}
