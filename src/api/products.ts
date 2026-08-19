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

// Скільки товарів на сторінці. На Кроці 5 з нього рахуватиметься
// кількість сторінок: Math.ceil(total / PAGE_SIZE)
const PAGE_SIZE = 20;

/**
 * Шар доступу до даних: тільки запит і перевірка відповіді.
 * Помилку НЕ ловить — у функції немає UI, показати її нема де.
 * Ловить той, хто викликав (CatalogPage), бо тільки він має стан і розмітку.
 */
export async function fetchProducts(signal?: AbortSignal): Promise<ProductsResponse> {
    // signal опціональний: функцію можна викликати і без скасування (тести).
    // { signal } — скорочення від { signal: signal }, це об'єкт опцій fetch
    const response =
        await fetch(`${BASE_URL}/products?limit=${PAGE_SIZE}&skip=0`, { signal });

    // ГОЛОВНА ПАСТКА fetch: він НЕ кидає виняток на 404 і 500.
    // .catch спрацює тільки на мережевих збоях (немає інтернету, CORS),
    // а HTTP-помилка приїде як звичайна відповідь → перевіряємо руками
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    // response.json() теж повертає Promise, але async його "сплющить",
    // тому подвійної обгортки Promise<Promise<T>> не буде
    return response.json();
}
