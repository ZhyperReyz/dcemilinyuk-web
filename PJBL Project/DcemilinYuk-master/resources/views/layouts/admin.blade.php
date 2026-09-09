<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>@yield('title', 'Admin Panel - DcemilinYuk')</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <style>
    .admin-header { background:var(--surface); border-bottom:1px solid var(--border); padding:1rem 0; margin-bottom:2rem; position:sticky; top:0; z-index:100; }
    .admin-header-inner { max-width:1200px; margin:0 auto; padding:0 1.5rem; display:flex; align-items:center; justify-content:space-between; }
    .admin-brand { font-family:var(--font-heading); font-weight:700; font-size:1.25rem; color:var(--primary); }
    .admin-brand span { font-size:0.8rem; background:var(--primary); color:white; padding:2px 8px; border-radius:var(--radius-full); margin-left:8px; font-weight:600; }
    .admin-header-actions { display:flex; gap:0.75rem; align-items:center; }
  </style>
  @stack('styles')
</head>
<body style="background: var(--bg);">

  <header class="admin-header">
    <div class="admin-header-inner">
      <a href="{{ route('admin.index') }}" style="text-decoration:none;"><div class="admin-brand">DcemilinYuk <span>Admin</span></div></a>
      <div class="admin-header-actions">
        <a href="{{ url('/') }}" target="_blank" class="btn btn-outline btn-sm">Lihat Web</a>
        <form action="{{ route('logout') }}" method="POST" style="display:inline;">
          @csrf
          <button type="submit" class="btn btn-primary btn-sm">Keluar</button>
        </form>
      </div>
    </div>
  </header>

  <div id="admin-panel" style="padding-bottom:4rem; min-height:100vh;">
    @yield('content')
  </div>

  <script src="{{ asset('js/app.js') }}"></script>
  @stack('scripts')
</body>
</html>
