<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $featured   = Product::where('available', true)
                        ->orderByDesc('sold')
                        ->take(8)
                        ->get();

        return view('home', compact('categories', 'featured'));
    }
}
