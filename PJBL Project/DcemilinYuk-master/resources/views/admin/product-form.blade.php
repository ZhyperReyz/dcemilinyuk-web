@extends('layouts.admin')

@push('styles')
<style>
  .form-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-lg); max-width:640px; margin:0 auto; overflow:hidden; }
  .form-card-header { padding:1.5rem; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  .form-card-header h2 { margin:0; font-size:1.25rem; }
  .form-card-body { padding:1.5rem; }
  .form-group { margin-bottom:1.25rem; }
  .form-label { display:block; font-weight:600; font-size:0.9rem; margin-bottom:0.4rem; color:var(--text); }
  .form-input, .form-select, .form-textarea { width:100%; padding:0.75rem 1rem; border:1px solid var(--border); border-radius:var(--radius); background:var(--bg); color:var(--text); font-size:0.9rem; font-family:var(--font-body); transition:var(--transition-fast); }
  .form-input:focus, .form-select:focus, .form-textarea:focus { outline:none; border-color:var(--primary); box-shadow:0 0 0 3px rgba(249,115,22,0.1); }
  .form-textarea { resize:vertical; min-height:80px; }
  .form-hint { font-size:0.8rem; color:var(--text-secondary); margin-top:4px; }
  .form-error { color:#DC2626; font-size:0.82rem; margin-top:4px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
  .form-check { display:flex; align-items:center; gap:0.5rem; cursor:pointer; }
  .form-check input[type="checkbox"] { width:18px; height:18px; accent-color:var(--primary); cursor:pointer; }
  .img-preview-wrap { margin-top:0.5rem; position:relative; }
  .img-preview { width:100%; max-height:200px; object-fit:cover; border-radius:var(--radius); border:1px solid var(--border); }
  .form-actions { display:flex; gap:0.75rem; margin-top:1.5rem; }
  .form-actions .btn { flex:1; justify-content:center; }
  @media (max-width:600px) { .form-row { grid-template-columns:1fr; } }
</style>
@endpush

@section('content')
<div class="container" style="padding:2rem 1.5rem;">

  <div class="form-card">
    <div class="form-card-header">
      <h2>{{ $product ? 'Edit Produk' : 'Tambah Produk Baru' }}</h2>
      <a href="{{ route('admin.index') }}" class="btn btn-outline btn-sm">&larr; Kembali</a>
    </div>

    <div class="form-card-body">
      <form action="{{ $product ? route('admin.product.update', $product->id) : route('admin.product.store') }}"
            method="POST" enctype="multipart/form-data">
        @csrf
        @if($product) @method('PUT') @endif

        {{-- Nama Produk --}}
        <div class="form-group">
          <label class="form-label">Nama Produk *</label>
          <input type="text" name="name" class="form-input" placeholder="cth: Es Teh Manis"
                 value="{{ old('name', $product->name ?? '') }}" required>
          @error('name') <div class="form-error">{{ $message }}</div> @enderror
        </div>

        {{-- Kategori & Harga --}}
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Kategori *</label>
            <select name="category_id" class="form-select" required>
              <option value="">-- Pilih Kategori --</option>
              @foreach($categories as $cat)
                <option value="{{ $cat->id }}" {{ old('category_id', $product->category_id ?? '') == $cat->id ? 'selected' : '' }}>
                  {{ $cat->name }}
                </option>
              @endforeach
            </select>
            @error('category_id') <div class="form-error">{{ $message }}</div> @enderror
          </div>
          <div class="form-group">
            <label class="form-label">Harga (Rp) *</label>
            <input type="number" name="price" class="form-input" placeholder="cth: 5000" min="0"
                   value="{{ old('price', $product->price ?? '') }}" required>
            @error('price') <div class="form-error">{{ $message }}</div> @enderror
          </div>
        </div>

        {{-- Deskripsi --}}
        <div class="form-group">
          <label class="form-label">Deskripsi</label>
          <textarea name="description" class="form-textarea" placeholder="Deskripsi singkat tentang produk...">{{ old('description', $product->description ?? '') }}</textarea>
          @error('description') <div class="form-error">{{ $message }}</div> @enderror
        </div>

        {{-- Badge & Ketersediaan --}}
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Badge</label>
            <select name="badge" class="form-select">
              <option value="">-- Tanpa Badge --</option>
              @foreach(['Populer', 'Best Seller', 'Baru'] as $b)
                <option value="{{ $b }}" {{ old('badge', $product->badge ?? '') == $b ? 'selected' : '' }}>{{ $b }}</option>
              @endforeach
            </select>
          </div>
          <div class="form-group" style="display:flex;align-items:flex-end;padding-bottom:0.25rem;">
            <label class="form-check">
              <input type="checkbox" name="available" value="1"
                     {{ old('available', $product->available ?? true) ? 'checked' : '' }}>
              <span>Produk tersedia (aktif)</span>
            </label>
          </div>
        </div>

        {{-- Foto Produk --}}
        <div class="form-group">
          <label class="form-label">Foto Produk</label>
          <input type="file" name="image" class="form-input" accept="image/*" onchange="previewImg(this)">
          <p class="form-hint">Maks 2MB. Format: JPG, PNG, WEBP.</p>
          @error('image') <div class="form-error">{{ $message }}</div> @enderror

          <div class="img-preview-wrap">
            @if($product && $product->image)
              <img src="{{ asset($product->image) }}" alt="Preview" class="img-preview" id="img-preview"
                   onerror="this.style.display='none'">
            @else
              <img src="" alt="Preview" class="img-preview" id="img-preview" style="display:none;">
            @endif
          </div>
        </div>

        {{-- Actions --}}
        <div class="form-actions">
          <a href="{{ route('admin.index') }}" class="btn btn-outline">Batal</a>
          <button type="submit" class="btn btn-primary">
            {{ $product ? 'Simpan Perubahan' : 'Tambah Produk' }}
          </button>
        </div>
      </form>
    </div>
  </div>

</div>
@endsection

@push('scripts')
<script>
function previewImg(input) {
  const preview = document.getElementById('img-preview');
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = e => { preview.src = e.target.result; preview.style.display = 'block'; };
    reader.readAsDataURL(input.files[0]);
  }
}
</script>
@endpush
