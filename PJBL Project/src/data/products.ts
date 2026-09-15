export interface Category {
  id: string
  name: string
  icon: string
  description: string
}

export interface Product {
  id: string
  category_id: string
  name: string
  description: string
  price: number
  image: string
  badge?: string
  rating: number
  sold: number
  available: boolean
  variants?: { name: string; price: number }[]
}

export const categories: Category[] = [
  { id: 'esteh', name: 'Es Teh', icon: 'fa-solid fa-mug-hot', description: 'Aneka es teh segar dan nikmat.' },
  { id: 'popice', name: 'Pop Ice', icon: 'fa-solid fa-blender', description: 'Pop Ice aneka rasa, manis dan menyegarkan.' },
  { id: 'icecream', name: 'Es Cemil', icon: 'fa-solid fa-ice-cream', description: 'Es cemil lezat dengan aneka topping.' },
  { id: 'bolen', name: 'Bolen', icon: 'fa-solid fa-cookie-bite', description: 'Bolen pisang dan keju renyah.' },
  { id: 'makberat', name: 'Makanan Berat', icon: 'fa-solid fa-utensils', description: 'Makanan berat yang mengenyangkan.' },
  { id: 'kuedessert', name: 'Kue & Dessert', icon: 'fa-solid fa-cake-candles', description: 'Bolu, brownis, dan dessert lezat.' },
  { id: 'snack', name: 'Snack', icon: 'fa-solid fa-fire-burner', description: 'Cemilan gorengan dan snack ringan.' },
  { id: 'hampers', name: 'Hampers', icon: 'fa-solid fa-gift', description: 'Paket hampers untuk hadiah.' },
]

export const products: Product[] = [
  // ── Es Teh ────────────────────────────────
  {
    id: 'et1', category_id: 'esteh', name: 'Es Teh Manis',
    description: 'Es teh manis klasik yang menyegarkan, dibuat dari teh pilihan.',
    price: 5000, image: 'img/products/esteh.png',
    rating: 4.8, sold: 1250, badge: 'Populer', available: true,
  },
  {
    id: 'et2', category_id: 'esteh', name: 'Es Teh Tarik',
    description: 'Es teh tarik dengan susu kental manis, creamy dan nikmat.',
    price: 8000, image: 'img/products/esteh.png',
    rating: 4.7, sold: 980, available: true,
  },
  {
    id: 'et3', category_id: 'esteh', name: 'Es Teh Lemon',
    description: 'Perpaduan teh segar dengan perasan lemon asli.',
    price: 7000, image: 'img/products/esteh.png',
    rating: 4.6, sold: 756, badge: 'Baru', available: true,
  },
  {
    id: 'et4', category_id: 'esteh', name: 'Es Teh Susu',
    description: 'Es teh premium dengan campuran susu segar.',
    price: 8000, image: 'img/products/esteh.png',
    rating: 4.9, sold: 1100, available: true,
  },
  {
    id: 'ts1', category_id: 'esteh', name: 'Es Teh Jeruk',
    description: 'Perpaduan teh segar dan jeruk peras, cocok untuk cuaca panas.',
    price: 7000, image: 'img/products/esteh.png',
    rating: 4.8, sold: 1850, badge: 'Best Seller', available: true,
  },

  // ── Pop Ice ───────────────────────────────
  {
    id: 'pi1', category_id: 'popice', name: 'Pop Ice Mangga',
    description: 'Pop Ice rasa mangga yang manis dan menyegarkan.',
    price: 5000, image: 'img/products/popice.png',
    rating: 4.5, sold: 890, available: true,
  },
  {
    id: 'pi2', category_id: 'popice', name: 'Pop Ice Anggur',
    description: 'Pop Ice rasa anggur favorit semua kalangan.',
    price: 5000, image: 'img/products/popice.png',
    rating: 4.4, sold: 720, available: true,
  },
  {
    id: 'pi3', category_id: 'popice', name: 'Pop Ice Strawberry',
    description: 'Pop Ice strawberry dengan rasa buah segar.',
    price: 6000, image: 'img/products/popice.png',
    rating: 4.6, sold: 650, badge: 'Populer', available: true,
  },
  {
    id: 'pi4', category_id: 'popice', name: 'Pop Ice Coklat',
    description: 'Pop Ice coklat yang creamy dan lezat.',
    price: 6000, image: 'img/products/popice.png',
    rating: 4.3, sold: 580, available: true,
  },
  {
    id: 'ts5', category_id: 'popice', name: 'Pop Ice Alpukat',
    description: 'Pop Ice rasa alpukat creamy, favorit semua kalangan.',
    price: 6000, image: 'img/products/popice.png',
    rating: 4.6, sold: 1050, available: true,
  },

  // ── Es Cemil ──────────────────────────────
  {
    id: 'ic1', category_id: 'icecream', name: 'Es Cemil',
    description: 'Es cemil lezat dengan aneka topping.',
    price: 5000, image: 'img/products/escemil.jpeg',
    rating: 4.9, sold: 1500, badge: 'Best Seller', available: true,
    variants: [
      { name: 'Porsi Kecil', price: 5000 },
      { name: 'Porsi Besar', price: 10000 },
    ],
  },
  {
    id: 'ic2', category_id: 'icecream', name: 'Es Cemil Coklat',
    description: 'Es cemil dengan topping coklat Belgian yang kaya rasa.',
    price: 10000, image: 'img/products/escemil.jpeg',
    rating: 4.7, sold: 1320, available: true,
  },
  {
    id: 'ic3', category_id: 'icecream', name: 'Es Cemil Strawberry',
    description: 'Es cemil dengan topping strawberry segar.',
    price: 10000, image: 'img/products/escemil.jpeg',
    rating: 4.9, sold: 980, badge: 'Baru', available: true,
  },
  {
    id: 'ts3', category_id: 'icecream', name: 'Es Cemil Matcha',
    description: 'Es cemil rasa matcha premium dengan topping mochi.',
    price: 12000, image: 'img/products/escemil.jpeg',
    rating: 4.8, sold: 1100, badge: 'Populer', available: true,
  },

  // ── Bolen ─────────────────────────────────
  {
    id: 'bl1', category_id: 'bolen', name: 'Bolen Pisang',
    description: 'Bolen pisang renyah dengan isian pisang manis.',
    price: 5000, image: 'img/products/bolen.png',
    rating: 4.7, sold: 2100, badge: 'Best Seller', available: true,
  },
  {
    id: 'bl2', category_id: 'bolen', name: 'Bolen Keju',
    description: 'Bolen keju dengan lelehan keju yang gurih.',
    price: 7000, image: 'img/products/bolen.png',
    rating: 4.6, sold: 1800, available: true,
  },
  {
    id: 'bl3', category_id: 'bolen', name: 'Bolen Coklat',
    description: 'Bolen dengan isian coklat leleh yang nikmat.',
    price: 7000, image: 'img/products/bolen.png',
    rating: 4.8, sold: 1650, badge: 'Populer', available: true,
  },
  {
    id: 'bl4', category_id: 'bolen', name: 'Bolen Pisang Coklat',
    description: 'Kombinasi pisang dan coklat dalam pastry renyah.',
    price: 8000, image: 'img/products/bolen.png',
    rating: 4.9, sold: 1400, available: true,
  },
  {
    id: 'ts2', category_id: 'bolen', name: 'Bolen Keju Spesial',
    description: 'Bolen keju spesial dengan double keju mozarella yang meleleh.',
    price: 8000, image: 'img/products/bolen.png',
    rating: 4.9, sold: 1950, badge: 'Best Seller', available: true,
  },

  // ── Makanan Berat ─────────────────────────
  {
    id: 'mb1', category_id: 'makberat', name: 'Nasi Ayam Bakar',
    description: 'Nasi ayam bakar hemat, gurih dan lezat dengan sambal spesial.',
    price: 15000, image: 'img/products/nasiayam1.jpeg',
    rating: 4.8, sold: 320, badge: 'Populer', available: true,
  },
  {
    id: 'mb2', category_id: 'makberat', name: 'Nasi Kotak Ayam Bakar',
    description: 'Nasi kotak ayam bakar lengkap dengan lauk dan sayur.',
    price: 20000, image: 'img/products/nasiayam2.jpeg',
    rating: 4.7, sold: 210, available: true,
  },
  {
    id: 'mb3', category_id: 'makberat', name: 'Burger Sapi/Ayam',
    description: 'Burger juicy pilihan daging sapi atau ayam, saus spesial.',
    price: 15000, image: 'img/products/burger.jpeg',
    rating: 4.6, sold: 185, available: true,
  },
  {
    id: 'mb4', category_id: 'makberat', name: 'Kebab Sapi',
    description: 'Kebab sapi dengan sayuran segar dan saus mayonaise pedas.',
    price: 12000, image: 'img/products/kebab.jpeg',
    rating: 4.5, sold: 160, available: true,
  },
  {
    id: 'mb5', category_id: 'makberat', name: 'Mie Geprek Katsu',
    description: 'Mie geprek dengan katsu ayam crispy dan sambal geprek pedas.',
    price: 15000, image: 'img/products/miegeprek.jpeg',
    rating: 4.7, sold: 140, badge: 'Baru', available: true,
  },
  {
    id: 'mb6', category_id: 'makberat', name: 'Seblak Rafael',
    description: 'Seblak khas Rafael, pedas gurih dengan aneka topping.',
    price: 12000, image: 'img/products/seblak.jpeg',
    rating: 4.6, sold: 130, available: true,
  },
  {
    id: 'mb7', category_id: 'makberat', name: 'Martabak Kulit Lumpia',
    description: 'Martabak telur renyah dengan kulit lumpia tipis, gurih nikmat.',
    price: 10000, image: 'img/products/martabak.jpeg',
    rating: 4.8, sold: 200, badge: 'Populer', available: true,
  },
  {
    id: 'ts4', category_id: 'makberat', name: 'Nasi Ayam Geprek',
    description: 'Nasi ayam geprek crispy dengan sambal pedas level 3-5.',
    price: 15000, image: 'img/products/miegeprek.jpeg',
    rating: 4.7, sold: 980, available: true,
  },

  // ── Kue & Dessert ─────────────────────────
  {
    id: 'kd1', category_id: 'kuedessert', name: 'Bolu Original',
    description: 'Bolu lembut dan harum, cocok untuk camilan atau hadiah.',
    price: 20000, image: 'img/products/bolu.jpeg',
    rating: 4.7, sold: 310, available: true,
  },
  {
    id: 'kd2', category_id: 'kuedessert', name: 'Bolu Potong',
    description: 'Bolu potong lembut tersedia per slice.',
    price: 10000, image: 'img/products/bolupotong.jpeg',
    rating: 4.6, sold: 280, available: true,
  },
  {
    id: 'kd3', category_id: 'kuedessert', name: 'Bolu Tape Keju 22cm',
    description: 'Bolu tape keju 22cm, perpaduan tape yang legit dengan keju asin.',
    price: 45000, image: 'img/products/bolupotong2.jpeg',
    rating: 4.9, sold: 150, badge: 'Populer', available: true,
  },
  {
    id: 'kd4', category_id: 'kuedessert', name: 'Brownis Choco Chip',
    description: 'Brownis choco chip ukuran 20x20, coklat pekat dan moist.',
    price: 35000, image: 'img/products/brownis1.jpeg',
    rating: 4.8, sold: 210, badge: 'Best Seller', available: true,
  },
  {
    id: 'kd5', category_id: 'kuedessert', name: 'Brownis Choco Chip Mini',
    description: 'Brownis choco chip ukuran 20x10.',
    price: 25000, image: 'img/products/brownis2.jpeg',
    rating: 4.7, sold: 190, available: true,
  },
  {
    id: 'kd6', category_id: 'kuedessert', name: 'Brownis Hias',
    description: 'Brownis cantik dengan hiasan premium, cocok untuk kado & hampers.',
    price: 50000, image: 'img/products/brownishias.jpeg',
    rating: 4.9, sold: 120, badge: 'Baru', available: true,
  },
  {
    id: 'kd7', category_id: 'kuedessert', name: 'Brownis Choco Cheese',
    description: 'Brownis choco cheese tuty fruity, manis asam yang unik.',
    price: 40000, image: 'img/products/brownischeese.jpeg',
    rating: 4.8, sold: 140, available: true,
  },
  {
    id: 'kd8', category_id: 'kuedessert', name: 'Bolen Pisang Keju',
    description: 'Bolen pisang keju renyah dengan kombinasi manis dan gurih.',
    price: 7000, image: 'img/products/bolenpisangkeju.jpeg',
    rating: 4.8, sold: 560, badge: 'Populer', available: true,
  },
  {
    id: 'ts6', category_id: 'kuedessert', name: 'Brownis Keju Premium',
    description: 'Brownis keju premium ukuran besar, lembut dan cheesy.',
    price: 45000, image: 'img/products/brownischeese.jpeg',
    rating: 4.9, sold: 1750, badge: 'Best Seller', available: true,
  },

  // ── Snack ─────────────────────────────────
  {
    id: 'sn1', category_id: 'snack', name: 'Kentang Goreng',
    description: 'Kentang goreng crispy, renyah di luar lembut di dalam.',
    price: 8000, image: 'img/products/kentanggoreng.jpeg',
    rating: 4.5, sold: 430, available: true,
  },
  {
    id: 'sn2', category_id: 'snack', name: 'Sosis Bakar',
    description: 'Sosis bakar juicy dengan bumbu spesial.',
    price: 8000, image: 'img/products/sosisbakar.jpeg',
    rating: 4.6, sold: 390, available: true,
  },
  {
    id: 'sn3', category_id: 'snack', name: 'Pisang Goreng Madu',
    description: 'Pisang goreng madu crispy manis.',
    price: 7000, image: 'img/products/pisanggoreng.jpeg',
    rating: 4.7, sold: 510, badge: 'Populer', available: true,
  },
  {
    id: 'sn4', category_id: 'snack', name: 'Cireng Salju',
    description: 'Cireng salju crispy dengan bumbu balado atau keju.',
    price: 8000, image: 'img/products/cirengSalju.jpeg',
    rating: 4.6, sold: 340, available: true,
  },
  {
    id: 'sn5', category_id: 'snack', name: 'Jasuke',
    description: 'Jagung susu keju, manis gurih creamy.',
    price: 8000, image: 'img/products/jasuke.jpeg',
    rating: 4.5, sold: 270, available: true,
  },
  {
    id: 'sn6', category_id: 'snack', name: 'Gabin Fla',
    description: 'Gabin berisi fla creamy lembut.',
    price: 8000, image: 'img/products/gabinfla.jpeg',
    rating: 4.7, sold: 300, badge: 'Baru', available: true,
  },
  {
    id: 'sn7', category_id: 'snack', name: 'Risolles',
    description: 'Risolles kulit tipis dengan isian ragout ayam.',
    price: 5000, image: 'img/products/risolles.jpeg',
    rating: 4.8, sold: 480, badge: 'Populer', available: true,
  },
  {
    id: 'sn8', category_id: 'snack', name: 'Sambal Geprek',
    description: 'Sambal geprek pedas nikmat.',
    price: 5000, image: 'img/products/sambalgeprek.jpeg',
    rating: 4.5, sold: 220, available: true,
  },

  // ── Hampers ───────────────────────────────
  {
    id: 'hp1', category_id: 'hampers', name: 'Hampers Ayam Bakar',
    description: 'Paket hampers ayam bakar lengkap.',
    price: 75000, image: 'img/products/hampers.jpg',
    rating: 4.9, sold: 85, badge: 'Best Seller', available: true,
  },
  {
    id: 'hp2', category_id: 'hampers', name: 'Hampers Ayam Bakar Eksklusif',
    description: 'Hampers ayam bakar eksklusif dengan packaging premium.',
    price: 95000, image: 'img/products/hampersayam2.jpeg',
    rating: 4.8, sold: 60, available: true,
  },
  {
    id: 'hp3', category_id: 'hampers', name: 'Hampers Urap Sayur',
    description: 'Paket hampers urap sayur segar.',
    price: 65000, image: 'img/products/hampersUrap.jpeg',
    rating: 4.7, sold: 45, badge: 'Baru', available: true,
  },
]

export function formatPrice(price: number): string {
  return 'Rp ' + price.toLocaleString('id-ID')
}

export function getWhatsAppUrl(product: Product): string {
  const message = encodeURIComponent(
    `Halo, saya ingin pesan:\n\n*${product.name}*\nHarga: ${formatPrice(product.price)}\n\nMohon info detail dan cara pembayarannya. Terima kasih!`
  )
  return `https://wa.me/6281234567890?text=${message}`
}
