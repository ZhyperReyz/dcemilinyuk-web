<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="DcemilinYuk - Katalog cemilan dan minuman dari pedagang kecil lokal.">
    <title>@yield('title', 'DcemilinYuk')</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    @stack('styles')
</head>
<body>
    <!-- NAVBAR -->
    <nav class="navbar" id="main-navbar">
        <div class="container">
            <a href="{{ url('/') }}" class="navbar-brand">
                <span>DcemilinYuk</span>
            </a>
            <div class="nav-links">
                <a href="{{ url('/') }}" class="{{ request()->is('/') ? 'active' : '' }}">Beranda</a>
                <a href="{{ url('/product') }}" class="{{ request()->is('product') ? 'active' : '' }}">Produk</a>
                <a href="{{ url('/about') }}" class="{{ request()->is('about') ? 'active' : '' }}">Tentang</a>
                <a href="{{ url('/contact') }}" class="{{ request()->is('contact') ? 'active' : '' }}">Kontak</a>
            </div>
            <div class="nav-actions">
                <div class="theme-switch" id="theme-switch" onclick="toggleTheme()" title="Ganti Tema">
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
                    <span class="cart-badge" id="nav-cart-badge" style="display:none;background:#EF4444;color:#fff;border-radius:99px;font-size:0.65rem;font-weight:700;min-width:18px;height:18px;align-items:center;justify-content:center;"></span>
                </button>
                <div class="mobile-toggle" onclick="toggleMobileMenu()">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
        <a href="{{ url('/') }}">Beranda</a>
        <a href="{{ url('/product') }}">Produk</a>
        <a href="{{ url('/about') }}">Tentang</a>
        <a href="{{ url('/contact') }}">Kontak</a>
        <a href="#" onclick="openWhatsAppGeneral();return false;" style="color:#25D366;font-weight:600;">Hubungi via WhatsApp</a>
    </div>

    <!-- CONTENT -->
    <main>
        @yield('content')
    </main>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div class="footer-brand">DcemilinYuk</div>
                    <p class="footer-desc">Katalog cemilan dan minuman terbaik dari pedagang kecil lokal.</p>
                </div>
                <div>
                    <h4>Menu</h4>
                    <div class="footer-links">
                        <a href="{{ url('/') }}">Beranda</a>
                        <a href="{{ url('/product') }}">Produk</a>
                        <a href="{{ url('/about') }}">Tentang</a>
                        <a href="{{ url('/contact') }}">Kontak</a>
                    </div>
                </div>
                <div>
                    <h4>Bantuan</h4>
                    <div class="footer-links">
                        <a href="#">Cara Pesan</a>
                        <a href="#">FAQ</a>
                        <a href="#">Ketentuan Layanan</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; {{ date('Y') }} DcemilinYuk &mdash; Dibuat untuk pedagang lokal Indonesia.</p>
            </div>
        </div>
    </footer>

    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/products.js') }}"></script>
    <script src="{{ asset('js/cart.js') }}"></script>
    <script>
        // Override renderNavbar and renderFooter so app.js doesn't inject it anymore
        window.renderNavbar = function() {};
        window.renderFooter = function() {};
        // Make sure theme init runs
        initTheme();
    </script>
    @stack('scripts')
</body>
</html>
