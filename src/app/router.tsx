import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Layout } from "./Layout";
import { CatalogPage } from "../pages/CatalogPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { StyleguidePage } from "../pages/StyleguidePage"
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRouter(): ReactNode {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Navigate to="/catalog" replace />} />
                    <Route path="catalog" element={<CatalogPage />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="styleguide" element={<StyleguidePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
