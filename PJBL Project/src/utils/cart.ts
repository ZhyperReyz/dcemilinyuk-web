import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: number; // index into product.variants
}

const CART_KEY = 'dcemilinyuk_cart';

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(
  items: CartItem[],
  product: Product,
  variantIdx: number = 0
): CartItem[] {
  const existing = items.findIndex(
    i => i.product.id === product.id && i.selectedVariant === variantIdx
  );
  if (existing >= 0) {
    const next = [...items];
    next[existing] = { ...next[existing], quantity: next[existing].quantity + 1 };
    return next;
  }
  return [...items, { product, quantity: 1, selectedVariant: variantIdx }];
}

export function removeFromCart(items: CartItem[], idx: number): CartItem[] {
  return items.filter((_, i) => i !== idx);
}

export function updateQty(items: CartItem[], idx: number, delta: number): CartItem[] {
  const next = [...items];
  const newQty = next[idx].quantity + delta;
  if (newQty <= 0) return items.filter((_, i) => i !== idx);
  next[idx] = { ...next[idx], quantity: newQty };
  return next;
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const variant = item.product.variants?.[item.selectedVariant];
    const price = variant?.price ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function buildWhatsAppMessage(items: CartItem[], storeName: string): string {
  const lines = items.map(item => {
    const variant = item.product.variants?.[item.selectedVariant];
    const price = variant?.price ?? item.product.price;
    const variantLabel = variant ? ` (${variant.label})` : '';
    const subtotal = price * item.quantity;
    return `• ${item.product.name}${variantLabel} x${item.quantity} = Rp ${subtotal.toLocaleString('id-ID')}`;
  });
  const total = cartTotal(items);
  const msg = [
    `Halo ${storeName}!`,
    `Saya ingin memesan:`,
    '',
    ...lines,
    '',
    `*Total: Rp ${total.toLocaleString('id-ID')}*`,
    '',
    'Mohon konfirmasi ketersediaan dan info pengiriman ya. Terima kasih!',
  ].join('\n');
  return encodeURIComponent(msg);
}

export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}
