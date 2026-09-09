@extends('layouts.app')

@section('title', 'Tentang Kami - DcemilinYuk')

@push('styles')
<style>
    .about-hero { padding: 6rem 0 4rem; margin-top: var(--navbar-height); position: relative; overflow: hidden; }
    .about-hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; }
    .about-hero-text h1 { font-size: 2.75rem; margin-bottom: 1.25rem; line-height: 1.15; }
    .about-hero-text h1 .highlight {
      background: linear-gradient(135deg, #F97316 0%, #FBBF24 50%, #F97316 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientText 3s ease infinite;
    }
    .about-hero-text p { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8; margin-bottom: 2rem; }
    .about-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
    .about-hero-img-wrap { position: relative; }
    .about-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
    .stat-card { text-align: center; padding: 2rem 1.25rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
    .stat-card .number { font-family: var(--font-heading); font-size: 2.5rem; font-weight: 800; color: var(--primary); line-height: 1; }
    .stat-card .label { font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px; font-weight: 500; }
    @media (max-width: 768px) {
      .values-layout { grid-template-columns: 1fr !important; }
      .about-hero-inner { grid-template-columns: 1fr; gap: 2rem; }
      .about-hero-text h1 { font-size: 2rem; }
      .about-stats { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 480px) {
      .about-hero-actions { flex-direction: column; }
      .about-hero-actions .btn { width: 100%; justify-content: center; }
    }
</style>
@endpush

@section('content')
  <section class="about-hero">
    <div class="container">
      <div class="about-hero-inner">
        <div class="about-hero-text reveal">
          <div class="section-subtitle">Tentang Kami</div>
          <h1>Menghubungkan <span class="highlight">Pedagang Kecil</span><br>dengan Pelanggan</h1>
          <p>DcemilinYuk lahir dari keyakinan bahwa setiap pedagang kecil berhak mendapatkan kesempatan yang sama untuk berkembang. Kami hadir sebagai jembatan antara pedagang lokal terbaik dengan pelanggan yang mencari cemilan dan minuman berkualitas.</p>
          <div class="about-hero-actions">
            <a href="{{ route('product.index') }}" class="btn btn-primary btn-lg">Lihat Produk Kami</a>
            <a href="{{ route('contact') }}" class="btn btn-outline btn-lg">Hubungi Kami</a>
          </div>
        </div>
        <div class="about-hero-img-wrap reveal">
          <img src="{{ asset('img/hero.png') }}" alt="Tim DcemilinYuk" class="about-story-img">
          <div class="hero-blob" style="top:-30px;right:-30px;width:300px;height:300px;"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background: var(--bg-secondary);">
    <div class="container">
      <div class="about-stats">
        <div class="stat-card reveal reveal-delay-1"><div class="number">16+</div><div class="label">Produk Tersedia</div></div>
        <div class="stat-card reveal reveal-delay-2"><div class="number">4</div><div class="label">Kategori Pilihan</div></div>
        <div class="stat-card reveal reveal-delay-3"><div class="number">200+</div><div class="label">Pelanggan Puas</div></div>
        <div class="stat-card reveal reveal-delay-4"><div class="number">500+</div><div class="label">Pesanan Selesai</div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="about-story">
        <div class="about-story-content reveal reveal-left">
          <div class="section-subtitle">Cerita Kami</div>
          <h2>Dari Satu Lapak Kecil, Jadi Platform Digital</h2>
          <p>DcemilinYuk dimulai dari kegelisahan melihat pedagang kecil di sekitar kami kesulitan menjangkau lebih banyak pelanggan. Produk mereka berkualitas, harganya terjangkau, tapi visibilitasnya terbatas.</p>
          <p>Kami percaya teknologi harusnya bisa membantu semua orang. Maka lahirlah DcemilinYuk: katalog digital yang memudahkan pemesanan langsung via WhatsApp, tanpa ribet, tanpa biaya tersembunyi.</p>
          <div class="hero-trust" style="margin-top:1.5rem;">
            <div class="hero-trust-item"><span class="check">&#10003;</span> Produk Berkualitas</div>
            <div class="hero-trust-item"><span class="check">&#10003;</span> Harga Transparan</div>
            <div class="hero-trust-item"><span class="check">&#10003;</span> Pesan Mudah via WA</div>
          </div>
        </div>
        <div class="about-story-img-wrap reveal reveal-right" style="position:relative;">
          <img src="{{ asset('img/hero.png') }}" alt="Cerita DcemilinYuk" class="about-story-img">
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background: var(--bg-secondary);">
    <div class="container">
      <div class="section-header reveal">
        <div class="section-subtitle">Nilai Kami</div>
        <h2>Apa yang Kami Pegang Teguh</h2>
        <p>Tiga pilar utama yang menjadi landasan setiap keputusan di DcemilinYuk.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;" class="values-layout">
        <div class="value-card reveal reveal-delay-1"><div class="value-icon" style="font-family:var(--font-heading);font-weight:800;color:var(--primary);font-size:1.1rem;">01</div><div class="value-content"><h4>Memberdayakan UMKM</h4><p>Membantu pedagang kecil menjangkau lebih banyak pelanggan tanpa biaya platform yang memberatkan.</p></div></div>
        <div class="value-card reveal reveal-delay-2"><div class="value-icon" style="font-family:var(--font-heading);font-weight:800;color:var(--primary);font-size:1.1rem;">02</div><div class="value-content"><h4>Kualitas Terjamin</h4><p>Setiap produk dikurasi dengan teliti. Standar kebersihan, rasa, dan keautentikan selalu kami jaga.</p></div></div>
        <div class="value-card reveal reveal-delay-3"><div class="value-icon" style="font-family:var(--font-heading);font-weight:800;color:var(--primary);font-size:1.1rem;">03</div><div class="value-content"><h4>Harga yang Adil</h4><p>Tanpa markup berlebih. Harga yang tertera adalah harga langsung dari pedagang ke pelanggan.</p></div></div>
        <div class="value-card reveal reveal-delay-1"><div class="value-icon" style="font-family:var(--font-heading);font-weight:800;color:var(--primary);font-size:1.1rem;">04</div><div class="value-content"><h4>Kemudahan Pemesanan</h4><p>Pesan langsung via WhatsApp. Tidak perlu install aplikasi baru, tidak perlu daftar akun.</p></div></div>
        <div class="value-card reveal reveal-delay-2"><div class="value-icon" style="font-family:var(--font-heading);font-weight:800;color:var(--primary);font-size:1.1rem;">05</div><div class="value-content"><h4>Hubungan Langsung</h4><p>Pelanggan terhubung langsung dengan pedagang. Lebih personal, lebih transparan.</p></div></div>
        <div class="value-card reveal reveal-delay-3"><div class="value-icon" style="font-family:var(--font-heading);font-weight:800;color:var(--primary);font-size:1.1rem;">06</div><div class="value-content"><h4>Ekonomi Lokal</h4><p>Setiap pesanan yang masuk langsung menggerakkan ekonomi pedagang lokal di sekitar kita.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-banner reveal reveal-scale">
        <h2>Siap Jadi Bagian dari Komunitas DcemilinYuk?</h2>
        <p>Temukan cemilan favorit kamu atau hubungi kami langsung via WhatsApp.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;">
          <a href="{{ route('product.index') }}" class="btn btn-lg" style="background:#fff;color:var(--primary);font-weight:700;">Lihat Produk &rarr;</a>
          <button class="btn btn-lg btn-wa" onclick="openWhatsAppGeneral()">Chat WhatsApp</button>
        </div>
      </div>
    </div>
  </section>
@endsection
