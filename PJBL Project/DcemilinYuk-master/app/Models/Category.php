<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'name', 'icon', 'description'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
