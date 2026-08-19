import type { ReactNode } from "react";
import { Link, Outlet } from "react-router";

export function Layout(): ReactNode {
    return (
        <div className="min-h-screen bg-page">
            <header className="bg-surface">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <Link to="/catalog" className="font-display text-xl uppercase tracking-caps text-brand">
                        Shop
                    </Link>

                    <nav className="flex items-center gap-6 font-display text-sm uppercase tracking-caps">
                        <Link to="/catalog" className="text-text-subtle hover:text-brand">Catalog</Link>
                        <Link to="/cart" className="text-text-subtle hover:text-brand">Cart</Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
}
