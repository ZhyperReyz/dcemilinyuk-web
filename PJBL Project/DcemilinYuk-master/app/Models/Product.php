<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'category_id', 'name', 'description',
        'price', 'image', 'badge', 'rating', 'sold',
        'available', 'variants',
    ];

    protected $casts = [
        'price'     => 'integer',
        'rating'    => 'float',
        'sold'      => 'integer',
        'available' => 'boolean',
        'variants'  => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
