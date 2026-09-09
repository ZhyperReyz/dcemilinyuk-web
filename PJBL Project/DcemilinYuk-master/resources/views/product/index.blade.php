@extends('layouts.app')

@section('title', 'Produk - DcemilinYuk')

@section('content')
  <section class="section" style="margin-top: var(--navbar-height); padding-top: 3rem;">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-subtitle">Katalog</div>
        <h2>Semua Produk</h2>
        <p>Pilih kategori atau cari produk favoritmu.</p>
      </div>

      <!-- Filter Category -->
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:2rem;" class="reveal">
        <a href="{{ route('product.index') }}" class="btn {{ !request('cat') ? 'btn-primary' : 'btn-outline' }}" style="font-size:0.85rem;">Semua</a>
        @foreach($categories as $cat)
          <a href="{{ route('product.index', ['cat' => $cat->id]) }}" class="btn {{ request('cat') == $cat->id ? 'btn-primary' : 'btn-outline' }}" style="font-size:0.85rem;">{{ $cat->name }}</a>
        @endforeach
      </div>

      <!-- Products Grid -->
      <div class="products-container" id="all-products">
        @php
          $filtered = request('cat') ? $products->where('category_id', request('cat')) : $products;
        @endphp

        @forelse($filtered as $product)
        @php
          $catName = $product->category->name ?? $product->category_id;
          $badgeClass = match($product->badge) {
            'Best Seller' => 'badge-bestseller',
            'Baru' => 'badge-new',
            default => 'badge-popular',
          };
        @endphp
        <div class="card product-card reveal" data-id="{{ $product->id }}" data-current-price="{{ $product->price }}" data-current-variant="" style="cursor:pointer;">
          @if($product->badge)
            <span class="product-badge {{ $badgeClass }}">{{ $product->badge }}</span>
          @endif
          @if(!$product->available)
            <span class="badge-habis">HABIS</span>
          @endif
          <img src="{{ asset($product->image) }}" alt="{{ $product->name }}" class="card-img" loading="lazy" onerror="handleImgError(this)">
          <div class="card-body">
            <div class="product-category">{{ $catName }}</div>
            <h4 class="card-title">{{ $product->name }}</h4>
            <p class="card-desc">{{ Str::limit($product->description, 60) }}</p>
            <div class="card-footer">
              <div class="card-price">Rp {{ number_format($product->price, 0, ',', '.') }}</div>
              <div class="card-actions">
                <button class="qty-btn" onclick="event.stopPropagation();changeQty(this,-1)">-</button>
                <span class="qty-value">1</span>
                <button class="qty-btn" onclick="event.stopPropagation();changeQty(this,1)">+</button>
              </div>
            </div>
            <button class="btn btn-primary btn-sm" style="width:100%;margin-top:0.75rem;" onclick="event.stopPropagation();orderProductCard(this)">
              <i class="fa-solid fa-cart-shopping"></i> Tambah ke Keranjang
            </button>
          </div>
        </div>
        @empty
        <div style="text-align:center;padding:3rem;color:var(--text-secondary);">
          <p>Tidak ada produk ditemukan di kategori ini.</p>
        </div>
        @endforelse
      </div>
    </div>
  </section>
@endsection
