import { type ReactNode, useEffect, useState } from "react";
import type { FetchState } from "../types/fetchState";
import type { ProductsResponse } from "../types/product";
import { fetchProducts } from "../api/products";

export function CatalogPage(): ReactNode {
    const [productsState, setProductsState] = useState<FetchState<ProductsResponse>>({ status: "pending" });

    useEffect(() => {
        async function loadProducts() {
            try {
                const responseData = await fetchProducts();
                setProductsState({ status: "success", data: responseData });

            } catch (error) {
                setProductsState({
                    status: "error",
                    error: error instanceof Error ? error : new Error("Unknown error"),
                });
            }
        }

        void loadProducts();
    }, []);

    if (productsState.status === "pending") {
        return <div className="text-text-muted">Loading...</div>;
    }

    if (productsState.status === "error") {
        return <div className="text-danger">Error: {productsState.error.message}</div>;
    }

    return (
        <div className="font-mono tabular-nums">
            {productsState.data.products.length} of {productsState.data.total}
        </div>
    );
}
