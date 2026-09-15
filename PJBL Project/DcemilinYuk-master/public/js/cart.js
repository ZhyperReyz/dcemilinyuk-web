/* ===== DcemilinYuk - Keranjang Belanja ===== */

const CART_KEY = 'dcemilinyuk_cart';

// ── Data ─────────────────────────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty, price, variant) {
  const prod = getProducts().find(p => p.id === productId);
  if (!prod) return;
  const cart = getCart();
  const key  = productId + '|' + (variant || '');
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty = Math.min(99, existing.qty + qty);
  } else {
    cart.push({ key, productId, name: prod.name, image: prod.image, price, variant: variant || '', qty });
  }
  saveCart(cart);
  showAddedToast(prod.name);
}

function removeFromCart(key) {
  saveCart(getCart().filter(i => i.key !== key));
  renderCartItems();
}

function updateCartItemQty(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, Math.min(99, item.qty + delta));
  saveCart(cart);
  renderCartItems();
}

function clearCart() {
  saveCart([]);
  renderCartItems();
}

function updateCartNote(key, note) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.note = note;
  saveCart(cart);
  // Tidak re-render supaya input tidak ter-reset saat mengetik
}

// ── Badge ─────────────────────────────────────────────────────
function updateCartBadge() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

// ── Drawer UI ─────────────────────────────────────────────────
function injectCartDrawer() {
  if (document.getElementById('cart-drawer')) return;
  const waIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

  document.body.insertAdjacentHTML('beforeend', `
    <div id="cart-overlay" onclick="closeCart()"
      style="display:none;position:fixed;inset:0;z-index:4000;background:rgba(0,0,0,0.6);backdrop-filter:blur(3px);transition:opacity 0.25s;"></div>

    <div id="cart-drawer"
      style="display:none;position:fixed;right:0;top:0;bottom:0;width:100%;max-width:400px;z-index:4001;
             background:var(--surface);flex-direction:column;overflow:hidden;
             box-shadow:-8px 0 40px rgba(0,0,0,0.25);transform:translateX(100%);transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <h3 style="margin:0;font-size:1.05rem;font-weight:700;">Keranjang</h3>
          <span id="cart-header-count" style="background:var(--primary);color:#fff;border-radius:99px;font-size:0.72rem;font-weight:700;padding:0.1rem 0.5rem;min-width:20px;text-align:center;">0</span>
        </div>
        <button onclick="closeCart()" style="width:34px;height:34px;border-radius:50%;background:var(--bg);border:1px solid var(--border);font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text);">✕</button>
      </div>
      <div id="cart-items" style="flex:1;overflow-y:auto;padding:0 1rem;"></div>
      <div id="cart-footer" style="padding:1.25rem;border-top:1px solid var(--border);flex-shrink:0;"></div>
    </div>

    <button id="cart-fab" onclick="openCart()"
      style="display:none;position:fixed;bottom:1.5rem;right:1.5rem;z-index:3999;
             width:56px;height:56px;border-radius:50%;background:var(--primary);color:#fff;
             border:none;cursor:pointer;box-shadow:0 4px 20px rgba(249,115,22,0.4);
             align-items:center;justify-content:center;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <span class="cart-badge" style="display:none;position:absolute;top:-4px;right:-4px;background:#EF4444;color:#fff;border-radius:99px;font-size:0.65rem;font-weight:700;min-width:20px;height:20px;align-items:center;justify-content:center;border:2px solid var(--primary);"></span>
    </button>

    <style>
      .cart-iqbtn { width:30px;height:30px;border-radius:50%;border:1px solid var(--border);background:var(--bg);color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:border-color 0.15s;flex-shrink:0; }
      .cart-iqbtn:hover { border-color:var(--primary);color:var(--primary); }
      @keyframes toastUp { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
    </style>
  `);
}

function renderCartItems() {
  const cart   = getCart();
  const itemEl = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  const hCount = document.getElementById('cart-header-count');
  if (!itemEl) return;

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  if (hCount) hCount.textContent = totalItems;

  if (cart.length === 0) {
    itemEl.innerHTML = `
      <div style="text-align:center;padding:3rem 1rem;color:var(--text-secondary);">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="opacity:0.25;margin-bottom:1rem;display:block;margin-left:auto;margin-right:auto;">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p style="margin:0;font-weight:600;">Keranjang masih kosong</p>
        <p style="font-size:0.85rem;margin-top:0.25rem;opacity:0.7;">Pilih produk dan tambahkan ke keranjang</p>
      </div>`;
    if (footer) footer.innerHTML = '';
    return;
  }

  const waIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;

  itemEl.innerHTML = `<div style="padding:0.25rem 0;">` + cart.map(item => `
    <div style="display:flex;gap:0.75rem;padding:0.875rem 0;border-bottom:1px solid var(--border);">
      <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:0.625rem;flex-shrink:0;" onerror="this.src='img/placeholder.png'">
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:0.88rem;line-height:1.3;margin-bottom:0.1rem;">${item.name}${item.variant ? `<span style="font-size:0.75rem;color:var(--primary);font-weight:500;"> · ${item.variant}</span>` : ''}</div>
        <div style="font-size:0.85rem;color:var(--primary);font-weight:700;margin-bottom:0.45rem;">${formatCurrency(item.price)}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:0.4rem;">
            <button class="cart-iqbtn" onclick="updateCartItemQty('${item.key}', -1)">−</button>
            <span style="min-width:22px;text-align:center;font-weight:700;font-size:0.9rem;">${item.qty}</span>
            <button class="cart-iqbtn" onclick="updateCartItemQty('${item.key}', 1)">+</button>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span style="font-size:0.82rem;color:var(--text-secondary);font-weight:600;">${formatCurrency(item.price * item.qty)}</span>
            <button onclick="removeFromCart('${item.key}')" style="width:26px;height:26px;border-radius:50%;background:#FEE2E2;color:#DC2626;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.78rem;" title="Hapus">✕</button>
          </div>
        </div>
        <input type="text" placeholder="Catatan: tanpa sambal, extra pedas, dll..." value="${item.note || ''}"
          oninput="updateCartNote('${item.key}', this.value)"
          style="margin-top:0.5rem;width:100%;padding:0.35rem 0.6rem;border:1px solid var(--border);border-radius:0.5rem;background:var(--bg);color:var(--text);font-size:0.78rem;outline:none;box-sizing:border-box;"
          onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
      </div>
    </div>
  `).join('') + `</div>`;

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  if (footer) footer.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.875rem;">
      <span style="color:var(--text-secondary);font-size:0.88rem;">Total (${totalItems} item)</span>
      <span style="font-weight:700;font-size:1.2rem;color:var(--primary);">${formatCurrency(total)}</span>
    </div>
    <div style="display:flex;gap:0.5rem;">
      <button onclick="clearCart()" style="padding:0.75rem 0.875rem;border:1px solid var(--border);border-radius:var(--radius);background:transparent;color:var(--text);cursor:pointer;font-size:0.82rem;white-space:nowrap;">Kosongkan</button>
      <button onclick="checkoutCart()" style="flex:1;padding:0.75rem;border:none;border-radius:var(--radius);background:#25D366;color:#fff;cursor:pointer;font-weight:600;display:flex;align-items:center;justify-content:center;gap:0.5rem;font-size:0.9rem;">
        ${waIcon} Pesan Semua via WA
      </button>
    </div>
  `;
}

// ── Open / Close ──────────────────────────────────────────────
function openCart() {
  injectCartDrawer();
  renderCartItems();
  const overlay = document.getElementById('cart-overlay');
  const drawer  = document.getElementById('cart-drawer');
  overlay.style.display = 'block';
  drawer.style.display  = 'flex';
  requestAnimationFrame(() => { drawer.style.transform = 'translateX(0)'; });
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer  = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer) return;
  drawer.style.transform = 'translateX(100%)';
  overlay.style.opacity  = '0';
  setTimeout(() => {
    drawer.style.display  = 'none';
    overlay.style.display = 'none';
    overlay.style.opacity = '';
    document.body.style.overflow = '';
  }, 310);
}

// ── Checkout ──────────────────────────────────────────────────
function checkoutCart() {
  const cart = getCart();
  if (!cart.length) return;
  const total      = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const lines      = cart.map(i => {
    const vt   = i.variant ? ` (${i.variant})` : '';
    const note = i.note ? `\n   Catatan: ${i.note}` : '';
    return `• ${i.name}${vt} \u00d7${i.qty} = ${formatCurrency(i.price * i.qty)}${note}`;
  }).join('\n');
  const msg = encodeURIComponent(
    `Halo DcemilinYuk! Saya mau pesan:\n\n${lines}\n\n` +
    `\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\nTotal (${totalItems} item): *${formatCurrency(total)}*\n\n` +
    `Mohon konfirmasi ketersediaan ya! Terima kasih \ud83d\ude4f`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

// ── Toast ─────────────────────────────────────────────────────
function showAddedToast(name) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:5rem;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:0.6rem 1.1rem;border-radius:2rem;font-size:0.82rem;z-index:9999;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.35);display:flex;align-items:center;gap:0.5rem;animation:toastUp 0.25s ease;';
  t.innerHTML = `<span style="color:#4ade80;font-weight:700;">✓</span> <strong>${name}</strong> masuk keranjang`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.transition = 'opacity 0.3s'; t.style.opacity = '0'; }, 2000);
  setTimeout(() => t.remove(), 2400);
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectCartDrawer();
  updateCartBadge();
  const fab = document.getElementById('cart-fab');
  if (fab) fab.style.display = 'flex';
});
