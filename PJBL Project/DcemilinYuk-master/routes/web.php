<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AdminController;

// ── Public Routes ─────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/product', [ProductController::class, 'index'])->name('product.index');
Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');

Route::view('/about', 'about')->name('about');
Route::view('/contact', 'contact')->name('contact');

// ── Auth Routes ───────────────────────────────────────────
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login'])->name('login.post');
Route::post('logout', [LoginController::class, 'logout'])->name('logout');

// ── Admin Routes (auth required) ─────────────────────────
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');

    // Produk CRUD
    Route::get('/product/create', [AdminController::class, 'createProduct'])->name('admin.product.create');
    Route::post('/product', [AdminController::class, 'storeProduct'])->name('admin.product.store');
    Route::get('/product/{id}/edit', [AdminController::class, 'editProduct'])->name('admin.product.edit');
    Route::put('/product/{id}', [AdminController::class, 'updateProduct'])->name('admin.product.update');
    Route::delete('/product/{id}', [AdminController::class, 'deleteProduct'])->name('admin.product.delete');

    // Kategori
    Route::post('/category', [AdminController::class, 'storeCategory'])->name('admin.category.store');
    Route::delete('/category/{id}', [AdminController::class, 'deleteCategory'])->name('admin.category.delete');
});
