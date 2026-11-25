export function formatPrice(price: number): string {
  return `$${price.toFixed(0)} USD`;
}