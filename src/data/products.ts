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
  { id: 'cemilan', name: 'Cemilan', icon: 'fa-solid fa-cookie-bite', description: 'Cemilan renyah dan lezat untuk menemani harimu.' },
  { id: 'minuman', name: 'Minuman', icon: 'fa-solid fa-glass-water', description: 'Minuman segar dan nikmat, cocok untuk cuaca apapun.' },
  { id: 'makanan', name: 'Makanan', icon: 'fa-solid fa-utensils', description: 'Makanan berat yang mengenyangkan dan lezat.' },
  { id: 'frozen', name: 'Frozen Food', icon: 'fa-solid fa-snowflake', description: 'Frozen food praktis, tinggal goreng!' },
  { id: 'kue', name: 'Kue & Pastry', icon: 'fa-solid fa-cake-candles', description: 'Kue basah dan kering untuk segala acara.' },
]

export const products: Product[] = [
  {
    id: 'es-teh-tarik-abc1',
    category_id: 'minuman',
    name: 'Es Teh Tarik',
    description: 'Teh tarik premium dengan rasa creamy dan manis yang pas. Disajikan dingin dengan busa yang lembut.',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80',
    badge: 'Best Seller',
    rating: 4.8,
    sold: 342,
    available: true,
  },
  {
    id: 'bolen-pisang-maju1',
    category_id: 'kue',
    name: 'Bolen Pisang',
    description: 'Bolen pisang homemade dengan kulit renyah dan isian pisang yang melimpah. Dibuat segar setiap hari.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1609126953519-7f4a5b1e9e58?w=500&q=80',
    badge: 'Best Seller',
    rating: 4.9,
    sold: 521,
    available: true,
  },
  {
    id: 'risol-mayones-mp1',
    category_id: 'cemilan',
    name: 'Risol Mayo',
    description: 'Risol isi mayo dan smoked beef, dibalut tepung roti yang renyah. Cocok untuk camilan atau lauk.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80',
    badge: 'Popular',
    rating: 4.7,
    sold: 891,
    available: true,
  },
  {
    id: 'donat-kentang-topping1',
    category_id: 'kue',
    name: 'Donat Kentang',
    description: 'Donat kentang empuk dengan berbagai pilihan topping: coklat, matcha, tiramisu, atau strawberry.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&q=80',
    badge: 'Baru',
    rating: 4.6,
    sold: 234,
    available: true,
    variants: [
      { name: 'Coklat', price: 5000 },
      { name: 'Matcha', price: 6000 },
      { name: 'Tiramisu', price: 6000 },
      { name: 'Strawberry', price: 6000 },
    ],
  },
  {
    id: 'lemper-ayam-trad1',
    category_id: 'makanan',
    name: 'Lemper Ayam',
    description: 'Lemper ayam tradisional dengan isian ayam bumbu kuning yang gurih. Dibungkus daun pisang.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&q=80',
    rating: 4.5,
    sold: 167,
    available: true,
  },
  {
    id: 'siomay-ayam-mp1',
    category_id: 'cemilan',
    name: 'Siomay Ayam',
    description: 'Siomay ayam kukus dengan tekstur kenyal dan rasa gurih. Disajikan dengan saus kacang pedas.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&q=80',
    rating: 4.4,
    sold: 456,
    available: true,
  },
  {
    id: 'kopi-susu-ko1',
    category_id: 'minuman',
    name: 'Kopi Susu',
    description: 'Kopi susu kekinian dengan campuran espresso robusta dan susu segar. Manis dan creamy.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80',
    badge: 'Baru',
    rating: 4.7,
    sold: 198,
    available: true,
  },
  {
    id: 'lumpiah-ayam-cr1',
    category_id: 'cemilan',
    name: 'Lumpiah Sayur',
    description: 'Lumpiah isi sayuran dan ayam cincang, digoreng renyah. Cocok sebagai teman ngeteh.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1609183480237-ccf9872941ca?w=500&q=80',
    rating: 4.3,
    sold: 312,
    available: true,
  },
  {
    id: 'nasi-uduk-kom1',
    category_id: 'makanan',
    name: 'Nasi Uduk Komplit',
    description: 'Nasi uduk harum dengan lauk ayam goreng, tempe, tahu, sambal, dan lalapan segar.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80',
    badge: 'Best Seller',
    rating: 4.8,
    sold: 289,
    available: true,
  },
  {
    id: 'piscok-lumer1',
    category_id: 'cemilan',
    name: 'Piscok Lumer',
    description: 'Pisang coklat lumer yang digoreng dengan kulit lumpia renyah. Coklatnya meleleh di mulut!',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&q=80',
    badge: 'Popular',
    rating: 4.6,
    sold: 678,
    available: true,
  },
  {
    id: 'sosis-bakar-mp1',
    category_id: 'cemilan',
    name: 'Sosis Bakar',
    description: 'Sosis ayam premium yang dibakar dengan bumbu BBQ manis pedas. Diberi topping saus.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80',
    rating: 4.5,
    sold: 445,
    available: true,
  },
  {
    id: 'chicken-katsu1',
    category_id: 'makanan',
    name: 'Chicken Katsu',
    description: 'Chicken katsu tepung dengan daging ayam yang juicy. Disajikan dengan nasi dan saus curry.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80',
    badge: 'Baru',
    rating: 4.7,
    sold: 156,
    available: true,
  },
  {
    id: 'bakso-mercon1',
    category_id: 'makanan',
    name: 'Bakso Mercon',
    description: 'Bakso pedas level 5 dengan isian cabai rawit di dalamnya. Hati-hati, sangat pedas!',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80',
    badge: 'Pedas',
    rating: 4.4,
    sold: 234,
    available: true,
    variants: [
      { name: 'Level 3', price: 12000 },
      { name: 'Level 5', price: 12000 },
      { name: 'Level 7', price: 13000 },
    ],
  },
  {
    id: 'es-kepiting-saus1',
    category_id: 'minuman',
    name: 'Es Kepiting Saus Telur',
    description: 'Minuman segar rasa buah-buahan dengan topping kepingan es warna-warni.',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500&q=80',
    rating: 4.3,
    sold: 178,
    available: true,
  },
  {
    id: 'tahu-gejrot1',
    category_id: 'cemilan',
    name: 'Tahu Gejrot',
    description: 'Tahu goreng dengan bumbu kacang pedas manis. Olahan tahu khas Cirebon yang menggugah selera.',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80',
    rating: 4.5,
    sold: 345,
    available: true,
  },
  {
    id: 'swee-potato-frozen1',
    category_id: 'frozen',
    name: 'Sweet Potato Fries',
    description: 'Ungu goreng beku, tinggal goreng di rumah. Cocok sebagai stok camilan.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80',
    rating: 4.2,
    sold: 89,
    available: true,
  },
]

export function formatPrice(price: number): string {
  return 'Rp ' + price.toLocaleString('id-ID')
}

export function getWhatsAppUrl(product: Product): string {
  const message = encodeURIComponent(
    `Halo, saya ingin pesan:\n\n📌 *${product.name}*\n💰 Harga: ${formatPrice(product.price)}\n\nMohon info detail dan cara pembayarannya. Terima kasih! 🙏`
  )
  return `https://wa.me/6281234567890?text=${message}`
}
