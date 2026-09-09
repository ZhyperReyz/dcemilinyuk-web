<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login - DcemilinYuk</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <style>
    body { background: var(--bg); }
    #login-screen {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--bg) 0%, var(--bg-secondary) 100%);
    }
    .login-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: 3rem;
      width: 100%;
      max-width: 400px;
      box-shadow: var(--shadow-xl);
      text-align: center;
    }
    .login-logo {
      font-family: var(--font-heading);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    .login-subtitle {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }
    .form-input {
      width: 100%;
      padding: 0.85rem 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: 1rem;
      background: var(--bg);
      color: var(--text);
    }
    .text-danger { color: #ef4444; font-size: 0.85rem; margin-bottom: 1rem; display: block; }
  </style>
</head>
<body>
  <div id="login-screen">
    <div class="login-card reveal">
      <div class="login-logo">DcemilinYuk</div>
      <div class="login-subtitle">Admin Panel Login</div>
      
      @if ($errors->any())
        <div class="text-danger">
            {{ $errors->first() }}
        </div>
      @endif

      <form action="{{ route('login.post') }}" method="POST">
        @csrf
        <div class="form-group">
          <input type="email" name="email" class="form-input" placeholder="Email Admin" required value="{{ old('email') }}">
        </div>
        <div class="form-group">
          <input type="password" name="password" class="form-input" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Masuk</button>
      </form>
      <a href="{{ url('/') }}" style="display:block; margin-top:1.5rem; color:var(--text-secondary); text-decoration:none; font-size:0.9rem;">&larr; Kembali ke Beranda</a>
    </div>
  </div>
</body>
</html>
