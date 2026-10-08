export const product = {
  name: 'Aura One',
  tagline: 'Adaptive noise-cancelling headphones',
  price: 349,
  rating: 4.9,
  reviews: 2184,
  image: '/images/aura-one.png',
  colors: [
    { id: 'graphite', label: 'Graphite', swatch: 'oklch(0.32 0.01 260)' },
    { id: 'silver', label: 'Silver', swatch: 'oklch(0.86 0.005 255)' },
    { id: 'midnight', label: 'Midnight', swatch: 'oklch(0.3 0.08 262)' },
  ],
  specs: [
    { label: 'Battery', value: '60h' },
    { label: 'ANC', value: '-42dB' },
    { label: 'Weight', value: '254g' },
  ],
} as const

export type ColorId = (typeof product.colors)[number]['id']

export const TAX_RATE = 0.08

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
