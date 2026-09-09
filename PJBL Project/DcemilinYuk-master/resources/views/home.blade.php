@extends('layouts.app')

@section('title', 'DcemilinYuk - Cemilan & Minuman Terbaik')

@section('content')
  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text slide-up">
          <h1>Jajanan <span class="highlight">Favorit</span> Kamu Ada di Sini!</h1>
          <p>Temukan berbagai cemilan dan minuman lezat dari pedagang kecil terpercaya. Pesan langsung via WhatsApp, mudah dan cepat!</p>
          <div class="hero-actions">
            <a href="{{ route('product.index') }}" class="btn btn-primary btn-lg">Lihat Produk</a>
            <button class="btn btn-wa btn-lg" onclick="openWhatsAppGeneral()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.783-.574-5.318-1.562l-.38-.23-3.742.981.998-3.648-.248-.396A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Hubungi via WA
            </button>
          </div>
          <div class="hero-stats">
            <div class="hero-stat"><div class="number">{{ $featured->count() }}+</div><div class="label">Produk</div></div>
            <div class="hero-stat"><div class="number">{{ $categories->count() }}</div><div class="label">Kategori</div></div>
            <div class="hero-stat"><div class="number">WA</div><div class="label">Pesan Mudah</div></div>
          </div>
          <div class="hero-trust">
            <div class="hero-trust-item"><span class="check">✓</span> Terpercaya</div>
            <div class="hero-trust-item"><span class="check">✓</span> Harga Terjangkau</div>
            <div class="hero-trust-item"><span class="check">✓</span> Pesan via WhatsApp</div>
          </div>
        </div>
        <div class="hero-image fade-in">
          <img src="{{ asset('img/hero.png') }}" alt="Cemilan dan minuman DcemilinYuk">
          <div class="hero-blob"></div>
          <div class="hero-floating-badge hero-floating-badge-1">
            <span>1.200+ Pelanggan Puas</span>
          </div>
          <div class="hero-floating-badge hero-floating-badge-2">
            <span>Pesan Cepat via WA</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="section">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-subtitle">Kategori</div>
        <h2>Pilih Kategori Favoritmu</h2>
        <p>Berbagai pilihan cemilan dan minuman dari pedagang kecil terbaik.</p>
      </div>
      <div class="categories-grid" id="categories-grid">
        @foreach($categories as $cat)
        <a href="{{ route('product.index', ['cat' => $cat->id]) }}" class="category-card reveal" style="text-decoration:none;">
          <div class="category-icon"><i class="{{ $cat->icon }}"></i></div>
          <h4>{{ $cat->name }}</h4>
          <p>{{ $cat->description }}</p>
        </a>
        @endforeach
      </div>
    </div>
  </section>

  <!-- Featured Products -->
  <section class="section" style="background: var(--bg-secondary);">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-subtitle">Produk Populer</div>
        <h2>Yang Paling Laris</h2>
        <p>Produk terfavorit yang paling banyak dipesan pelanggan kami.</p>
      </div>
      <div class="products-container" id="featured-products">
        @foreach($featured as $product)
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
          <img src="{{ asset($product->image) }}" alt="{{ $product->name }}" class="card-img" loading="lazy" onerror="handleImgError(this)">
          <div class="card-body">
            <div class="product-category">{{ $catName }}</div>
            <h4 class="card-title">{{ $product->name }}</h4>
            <p class="card-desc">{{ Str::limit($product->description, 60) }}</p>
            <div class="card-footer">
              <div class="card-price">Rp {{ number_format($product->price, 0, ',', '.') }}</div>
            </div>
          </div>
        </div>
        @endforeach
      </div>
      <div style="text-align:center;margin-top:2rem;" class="reveal">
        <a href="{{ route('product.index') }}" class="btn btn-outline">Lihat Semua Produk →</a>
      </div>
    </div>
  </section>

  <!-- How to Order -->
  <section class="section">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-subtitle">Cara Pesan</div>
        <h2>Mudah & Cepat via WhatsApp</h2>
      </div>
      <div class="features-grid">
        <div class="feature-card reveal reveal-delay-1">
          <div class="feature-icon"><i class="fa-solid fa-eye"></i></div>
          <h4>1. Pilih Produk</h4>
          <p>Lihat katalog produk kami dan temukan cemilan atau minuman yang kamu inginkan.</p>
        </div>
        <div class="feature-card reveal reveal-delay-2">
          <div class="feature-icon"><i class="fa-solid fa-comment-dots"></i></div>
          <h4>2. Klik Pesan WA</h4>
          <p>Tekan tombol "Pesan" di produk pilihan. Pesan otomatis akan terbuat di WhatsApp.</p>
        </div>
        <div class="feature-card reveal reveal-delay-3">
          <div class="feature-icon"><i class="fa-solid fa-check"></i></div>
          <h4>3. Konfirmasi & Bayar</h4>
          <p>Diskusikan detail pengiriman dan pembayaran langsung dengan kami via WhatsApp.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="section" style="background: var(--bg-secondary);">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-subtitle">Testimoni</div>
        <h2>Apa Kata Mereka?</h2>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card reveal reveal-delay-1">
          <span class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <div class="testimonial-text">"Es Teh Tariknya enak banget! Segar dan manisnya pas. Sudah langganan tiap minggu!"</div>
          <div class="testimonial-author">
            <div class="testimonial-avatar">A</div>
            <div class="testimonial-info"><div class="name">Aisyah R.</div><div class="role">Pelanggan Setia</div></div>
          </div>
        </div>
        <div class="testimonial-card reveal reveal-delay-2">
          <span class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <div class="testimonial-text">"Bolen Pisangnya renyah dan isian pisangnya banyak. Anak-anak suka semua! Pasti repeat order!"</div>
          <div class="testimonial-author">
            <div class="testimonial-avatar">R</div>
            <div class="testimonial-info"><div class="name">Rizky M.</div><div class="role">Pelanggan Baru</div></div>
          </div>
        </div>
        <div class="testimonial-card reveal reveal-delay-3">
          <span class="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <div class="testimonial-text">"Pengirimannya cepat dan packaging-nya rapi banget. Ice cream sampai masih dingin!"</div>
          <div class="testimonial-author">
            <div class="testimonial-avatar">D</div>
            <div class="testimonial-info"><div class="name">Dewi S.</div><div class="role">Pelanggan Setia</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section">
    <div class="container">
      <div class="cta-banner reveal reveal-scale">
        <h2>Siap Order Sekarang?</h2>
        <p>Chat kami langsung via WhatsApp. Respon cepat, harga terjangkau!</p>
        <button class="btn btn-lg" style="background:#fff;color:var(--primary);" onclick="openWhatsAppGeneral()">
          Hubungi Kami via WA
        </button>
      </div>
    </div>
  </section>
@endsection
