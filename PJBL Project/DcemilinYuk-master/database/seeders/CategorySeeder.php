<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['id' => 'minuman',    'name' => 'Minuman',          'icon' => 'fa-solid fa-glass-water',    'description' => 'Segar & Nikmat'],
            ['id' => 'esteh',      'name' => 'Es Teh',           'icon' => 'fa-solid fa-mug-hot',        'description' => 'Segar & Nikmat'],
            ['id' => 'popice',     'name' => 'Pop Ice',           'icon' => 'fa-solid fa-snowflake',      'description' => 'Dingin & Manis'],
            ['id' => 'icecream',   'name' => 'Ice Cream',         'icon' => 'fa-solid fa-ice-cream',      'description' => 'Premium & Lezat'],
            ['id' => 'snack',      'name' => 'Snack & Gorengan',  'icon' => 'fa-solid fa-drumstick-bite', 'description' => 'Crispy & Nagih'],
            ['id' => 'bolen',      'name' => 'Bolen',             'icon' => 'fa-solid fa-bread-slice',    'description' => 'Renyah & Gurih'],
            ['id' => 'kuedessert', 'name' => 'Kue & Dessert',     'icon' => 'fa-solid fa-cake-candles',   'description' => 'Manis & Lezat'],
            ['id' => 'makberat',   'name' => 'Makanan Berat',     'icon' => 'fa-solid fa-utensils',       'description' => 'Mengenyangkan'],
            ['id' => 'hampers',    'name' => 'Hampers',           'icon' => 'fa-solid fa-gift',           'description' => 'Paket Spesial'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['id' => $cat['id']], $cat);
        }
    }
}
