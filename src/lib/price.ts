/**
 * Ціна з урахуванням знижки.
 * discountPercentage з API — це ПРОЦЕНТ (15.5), а не сума і не кінцева ціна.
 * Округлюємо до копійок: 760.6549... → 760.65
 */
export function getDiscountedPrice(price: number, discountPercentage: number): number {
    const discounted = price - (price * discountPercentage) / 100

    return Math.round(discounted * 100) / 100
}

/**
 * Число → рядок для виводу: 1598 → "$1,598.00"
 * Intl.NumberFormat сам ставить символ валюти, розділювач тисяч
 * і два знаки після коми — робити це руками не треба.
 */
const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
})
export function formatPrice(value: number): string {
    return priceFormatter.format(value)
}
