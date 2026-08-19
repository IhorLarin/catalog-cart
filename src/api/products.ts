/* ============================================================
 * Частина 1.1 — шар доступу до даних
 *
 * Один файл, одна функція. Її задача: сходити на DummyJSON.
 * Перевірити відповідь, повернути типізовані дані.
 *
 * Що треба знати:
 * - endpoint: https://dummyjson.com/products?limit=20&skip=0
 * - повертає обʼєкт форми ProductsResponse — тип уже є в types/product.ts
 * - fetch НЕ кидає виняток на 404 і 500 (та сама пастка з Film Search)
 *   → перевіряти response.ok вручну
 * - функція async, повертає Promise<ProductsResponse>
 * ============================================================ */

import type { ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com";
const PAGE_SIZE = 20;

export async function fetchProducts(): Promise<ProductsResponse> {
    const response = await fetch(`${BASE_URL}/products?limit=${PAGE_SIZE}&skip=0`);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}
