@extends('layouts.admin')

@push('styles')
<style>
  .admin-stats { display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem; margin-bottom:2rem; }
  .admin-stat-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:1.25rem; text-align:center; }
  .admin-stat-card .stat-num { font-family:var(--font-heading); font-size:2rem; font-weight:700; color:var(--primary); }
  .admin-stat-card .stat-label { font-size:0.85rem; color:var(--text-secondary); margin-top:4px; }
  .admin-tabs { display:flex; gap:0.5rem; border-bottom:2px solid var(--border); margin-bottom:1.5rem; }
  .admin-tab { padding:0.75rem 1.5rem; font-weight:600; font-size:0.9rem; color:var(--text-secondary); cursor:pointer; border:none; background:none; border-bottom:2px solid transparent; margin-bottom:-2px; transition:var(--transition-fast); font-family:var(--font-body); }
  .admin-tab:hover { color:var(--primary); }
  .admin-tab.active { color:var(--primary); border-bottom-color:var(--primary); }
  .admin-tab-content { display:none; }
  .admin-tab-content.active { display:block; }
  .admin-products-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:1rem; }
  .admin-product-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden; display:flex; flex-direction:column; transition:var(--transition); }
  .admin-product-card:hover { box-shadow:var(--shadow-md); }
  .admin-product-img { width:100%; height:160px; object-fit:cover; background:var(--bg-secondary); }
  .admin-product-info { padding:1rem; flex:1; }
  .admin-product-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:0.5rem; gap:0.5rem; }
  .admin-product-actions { display:flex; gap:0.5rem; flex-shrink:0; }
  .admin-product-name { font-weight:600; font-size:0.95rem; }
  .admin-product-desc { font-size:0.82rem; color:var(--text-secondary); margin-bottom:0.5rem; display:-webkit-box; -webkit-line-clamp:2; line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .admin-product-price { font-weight:700; color:var(--primary); font-size:1rem; }
  .admin-btn { padding:0.3rem 0.75rem; border-radius:var(--radius-sm); font-size:0.8rem; font-weight:600; cursor:pointer; border:none; transition:var(--transition-fast); font-family:var(--font-body); }
  .admin-btn-edit { background:var(--primary-light); color:var(--primary); }
  .admin-btn-edit:hover { background:var(--primary); color:white; }
  .admin-btn-delete { background:#FEE2E2; color:#DC2626; }
  .admin-btn-delete:hover { background:#DC2626; color:white; }
  .admin-cat-tag { display:inline-block; background:var(--bg-secondary); color:var(--text-secondary); font-size:0.75rem; padding:2px 8px; border-radius:var(--radius-full); }
  .admin-badge-tag { display:inline-block; background:var(--primary-light); color:var(--primary); font-size:0.75rem; padding:2px 8px; border-radius:var(--radius-full); font-weight:600; }
  .admin-section-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:1.5rem; margin-bottom:1.5rem; }
  .admin-section-card h4 { margin-bottom:1rem; }
  .admin-cat-item { display:flex; align-items:center; gap:1rem; padding:0.75rem 1rem; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); margin-bottom:0.5rem; }
  .cat-icon { font-size:1.25rem; width:36px; text-align:center; }
  .cat-details { flex:1; }
  .cat-details strong { display:block; font-size:0.95rem; }
  .cat-id { font-size:0.8rem; color:var(--text-secondary); }
  .admin-avail-off { opacity:0.5; }
  .toast-msg { position:fixed; top:80px; right:1.5rem; z-index:9999; padding:0.85rem 1.5rem; border-radius:var(--radius-md); font-weight:600; font-size:0.9rem; animation:slideInRight 0.3s; box-shadow:var(--shadow-lg); }
  .toast-success { background:#DCFCE7; color:#16A34A; border:1px solid #BBF7D0; }
  .toast-error { background:#FEE2E2; color:#DC2626; border:1px solid #FECACA; }
  @keyframes slideInRight { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }
  @media (max-width:768px) { .admin-products-grid { grid-template-columns:1fr; } .admin-cat-layout { grid-template-columns:1fr !important; } }
</style>
@endpush

@section('content')
<div class="container" style="padding-top:1rem;">

  {{-- Flash Messages --}}
  @if(session('success'))
    <div class="toast-msg toast-success" id="toast">{{ session('success') }}</div>
  @endif
  @if(session('error'))
    <div class="toast-msg toast-error" id="toast">{{ session('error') }}</div>
  @endif

  {{-- Stats --}}
  <div class="admin-stats">
    <div class="admin-stat-card">
      <div class="stat-num">{{ $products->count() }}</div>
      <div class="stat-label">Total Produk</div>
    </div>
    <div class="admin-stat-card">
      <div class="stat-num">{{ $categories->count() }}</div>
      <div class="stat-label">Kategori</div>
    </div>
    <div class="admin-stat-card">
      <div class="stat-num">{{ $products->where('available', true)->count() }}</div>
      <div class="stat-label">Produk Aktif</div>
    </div>
  </div>

  {{-- Tabs --}}
  <div class="admin-tabs">
    <button class="admin-tab active" onclick="switchTab('products')">Produk</button>
    <button class="admin-tab" onclick="switchTab('categories')">Kategori</button>
  </div>

  {{-- TAB: PRODUCTS --}}
  <div class="admin-tab-content active" id="tab-products">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; flex-wrap:wrap; gap:0.75rem;">
      <h3 style="margin:0;">Daftar Produk</h3>
      <a href="{{ route('admin.product.create') }}" class="btn btn-primary">+ Tambah Produk</a>
    </div>

    <div class="admin-products-grid">
      @forelse($products as $product)
      <div class="admin-product-card {{ $product->available ? '' : 'admin-avail-off' }}">
        <img src="{{ asset($product->image) }}" alt="{{ $product->name }}" class="admin-product-img"
             onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27300%27 viewBox=%270 0 400 300%27%3E%3Crect width=%27400%27 height=%27300%27 fill=%27%23f3f4f6%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 font-family=%27sans-serif%27 font-size=%2716%27 fill=%27%239ca3af%27 text-anchor=%27middle%27 dominant-baseline=%27middle%27%3ETidak ada foto%3C/text%3E%3C/svg%3E'">
        <div class="admin-product-info">
          <div class="admin-product-top">
            <div class="admin-product-name">{{ $product->name }}</div>
            <div class="admin-product-actions">
              <a href="{{ route('admin.product.edit', $product->id) }}" class="admin-btn admin-btn-edit">Edit</a>
              <form action="{{ route('admin.product.delete', $product->id) }}" method="POST" onsubmit="return confirm('Yakin mau hapus produk ini?')">
                @csrf @method('DELETE')
                <button type="submit" class="admin-btn admin-btn-delete">Hapus</button>
              </form>
            </div>
          </div>
          <div class="admin-product-desc">{{ $product->description }}</div>
          <div class="admin-product-price">Rp {{ number_format($product->price, 0, ',', '.') }}</div>
          <div style="margin-top:0.5rem;">
            <span class="admin-cat-tag">{{ $product->category->name ?? $product->category_id }}</span>
            @if($product->badge)
              <span class="admin-badge-tag">{{ $product->badge }}</span>
            @endif
            @unless($product->available)
              <span style="background:#FEE2E2;color:#DC2626;font-size:0.75rem;padding:2px 8px;border-radius:var(--radius-full);font-weight:600;">NONAKTIF</span>
            @endunless
          </div>
        </div>
      </div>
      @empty
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-secondary);">
        <p>Belum ada produk. Klik <strong>+ Tambah Produk</strong> untuk memulai!</p>
      </div>
      @endforelse
    </div>
  </div>

  {{-- TAB: CATEGORIES --}}
  <div class="admin-tab-content" id="tab-categories">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;" class="admin-cat-layout">
      <div class="admin-section-card">
        <h4>Kategori Saat Ini</h4>
        @forelse($categories as $cat)
        <div class="admin-cat-item">
          <div class="cat-icon"><i class="{{ $cat->icon }}"></i></div>
          <div class="cat-details">
            <strong>{{ $cat->name }}</strong>
            <span class="cat-id">ID: {{ $cat->id }} &middot; {{ $cat->products()->count() }} produk</span>
          </div>
          <form action="{{ route('admin.category.delete', $cat->id) }}" method="POST" onsubmit="return confirm('Hapus kategori {{ $cat->name }}?')">
            @csrf @method('DELETE')
            <button type="submit" class="admin-btn admin-btn-delete">Hapus</button>
          </form>
        </div>
        @empty
        <p style="color:var(--text-secondary);">Belum ada kategori.</p>
        @endforelse
      </div>

      <div class="admin-section-card">
        <h4>Tambah Kategori Baru</h4>
        <form action="{{ route('admin.category.store') }}" method="POST">
          @csrf
          <div class="form-group">
            <label class="form-label">Nama Kategori *</label>
            <input type="text" name="name" class="form-input" placeholder="cth: Minuman Hangat" required>
          </div>
          <div class="form-group">
            <label class="form-label">Icon (Font Awesome class)</label>
            <input type="text" name="icon" class="form-input" placeholder="cth: fa-solid fa-mug-hot">
            <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Cari icon di <a href="https://fontawesome.com/icons" target="_blank" style="color:var(--primary);">fontawesome.com/icons</a></p>
          </div>
          <div class="form-group">
            <label class="form-label">Deskripsi singkat</label>
            <input type="text" name="description" class="form-input" placeholder="cth: Hangat & Nyaman">
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;">Tambah Kategori</button>
        </form>
      </div>
    </div>
  </div>

</div>
@endsection

@push('scripts')
<script>
  // Tab switching
  function switchTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    event.target.classList.add('active');
  }

  // Auto-dismiss toast
  const toast = document.getElementById('toast');
  if (toast) setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 3000);
</script>
@endpush
