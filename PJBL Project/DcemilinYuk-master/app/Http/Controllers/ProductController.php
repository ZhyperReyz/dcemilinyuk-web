<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $products   = Product::with('category')->where('available', true)->get();

        return view('product.index', compact('categories', 'products'));
    }

    public function show(string $id)
    {
        $product    = Product::with('category')->findOrFail($id);
        $related    = Product::where('category_id', $product->category_id)
                        ->where('id', '!=', $id)
                        ->where('available', true)
                        ->take(4)
                        ->get();

        return view('product.show', compact('product', 'related'));
    }
}
