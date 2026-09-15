<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Product;
use App\Models\Category;

class AdminController extends Controller
{
    // ── Dashboard ──────────────────────────────────────────
    public function index()
    {
        $products   = Product::with('category')->orderBy('name')->get();
        $categories = Category::orderBy('name')->get();
        return view('admin.index', compact('products', 'categories'));
    }

    // ── Tambah Produk (form) ──────────────────────────────
    public function createProduct()
    {
        $categories = Category::orderBy('name')->get();
        return view('admin.product-form', [
            'product'    => null,
            'categories' => $categories,
        ]);
    }

    // ── Simpan Produk Baru ────────────────────────────────
    public function storeProduct(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price'       => 'required|integer|min:0',
            'description' => 'nullable|string|max:1000',
            'badge'       => 'nullable|string|max:50',
            'available'   => 'nullable',
            'image'       => 'nullable|image|max:2048',
        ]);

        $data['id']        = Str::slug($data['name']) . '-' . Str::random(5);
        $data['available']  = $request->has('available');
        $data['rating']     = 0;
        $data['sold']       = 0;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('product-images', 'public');
            $data['image'] = 'storage/' . $path;
        }

        Product::create($data);

        return redirect()->route('admin.index')->with('success', 'Produk berhasil ditambahkan!');
    }

    // ── Edit Produk (form) ────────────────────────────────
    public function editProduct(string $id)
    {
        $product    = Product::findOrFail($id);
        $categories = Category::orderBy('name')->get();
        return view('admin.product-form', compact('product', 'categories'));
    }

    // ── Update Produk ─────────────────────────────────────
    public function updateProduct(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price'       => 'required|integer|min:0',
            'description' => 'nullable|string|max:1000',
            'badge'       => 'nullable|string|max:50',
            'available'   => 'nullable',
            'image'       => 'nullable|image|max:2048',
        ]);

        $data['available'] = $request->has('available');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('product-images', 'public');
            $data['image'] = 'storage/' . $path;
        }

        $product->update($data);

        return redirect()->route('admin.index')->with('success', 'Produk berhasil diupdate!');
    }

    // ── Hapus Produk ──────────────────────────────────────
    public function deleteProduct(string $id)
    {
        Product::findOrFail($id)->delete();
        return redirect()->route('admin.index')->with('success', 'Produk berhasil dihapus!');
    }

    // ── Tambah Kategori ───────────────────────────────────
    public function storeCategory(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:100',
            'icon'        => 'nullable|string|max:100',
            'description' => 'nullable|string|max:255',
        ]);

        $data['id'] = Str::slug($data['name']);

        Category::updateOrCreate(['id' => $data['id']], $data);

        return redirect()->route('admin.index')->with('success', 'Kategori berhasil ditambahkan!');
    }

    // ── Hapus Kategori ────────────────────────────────────
    public function deleteCategory(string $id)
    {
        $category = Category::findOrFail($id);

        if ($category->products()->count() > 0) {
            return redirect()->route('admin.index')->with('error', 'Kategori tidak bisa dihapus karena masih ada produk di dalamnya!');
        }

        $category->delete();
        return redirect()->route('admin.index')->with('success', 'Kategori berhasil dihapus!');
    }
}
