// src/pages/CatalogPage.tsx
import { type ReactNode, useEffect, useState } from "react";
import type { FetchState } from "../types/fetchState";
import type { ProductsResponse } from "../types/product";
import { fetchProducts } from "../api/products";

export function CatalogPage(): ReactNode {
    // Один стан замість трьох useState (data/loading/error).
    // Завдяки discriminated union суперечливі комбінації
    // ("вантажитися і водночас помилка") неможливо навіть записати
    const [productsState, setProductsState] = useState<FetchState<ProductsResponse>>({ status: "pending" });

    useEffect(() => {
        // Контролер живе тут, а не в api-шарі: тільки компонент знає момент
        // скасування — розмонтування або перезапуск ефекту
        const controller = new AbortController();

        // Сам useEffect не може бути async: він мусить повернути функцію
        // очищення або нічого, а async завжди повертає Promise.
        // Тому async-логіка живе у внутрішній функції
        async function loadProducts() {
            try {
                const responseData = await fetchProducts(controller.signal);
                setProductsState({ status: "success", data: responseData });

            } catch (error) {
                // Скасування — не збій, ми зробили це самі.
                // Перевіряємо факт скасування, а не name === "AbortError":
                // так покриваються і помилки, що прилетіли не з fetch
                if (controller.signal.aborted) return;

                // У catch змінна має тип unknown, не Error:
                // кинути в JS можна будь-що (throw "рядок" валідний)
                setProductsState({
                    status: "error",
                    error: error instanceof Error ? error : new Error("Unknown error"),
                });
            }
        }

        void loadProducts();

        // Функція очищення. React викличе її при розмонтуванні компонента
        // і перед кожним повторним запуском ефекту → запит обірветься
        return () => controller.abort();
    }, []);   // [] — один раз після монтування

    // Три гілки за станом. Порядок важливий: спершу відсіюємо
    // pending і error, і в останній return TypeScript уже ЗНАЄ,
    // що залишився тільки варіант success
    if (productsState.status === "pending") {
        return <div className="text-text-muted">Loading...</div>;
    }

    if (productsState.status === "error") {
        return <div className="text-danger">Error: {productsState.error.message}</div>;
    }

    // Тут немає ?. і ?? — data гарантовано існує завдяки звуженню типу
    return (
        <div className="font-mono tabular-nums">
            {productsState.data.products.length} of {productsState.data.total}
        </div>
    );
}
