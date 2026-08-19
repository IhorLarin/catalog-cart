import { type ReactNode } from "react";
import type { Product } from "../types/product";
import { formatPrice, getDiscountedPrice } from "../lib/price";

type ProductCardProps = {
    product: Product
}

export function ProductCard({ product }: ProductCardProps): ReactNode {
    return (
        <article className="bg-surface p-4">
            <div className="relative">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="aspect-square w-full object-contain"
                />
                <span className="absolute bottom-0 left-0 bg-badge px-3 py-1 font-mono text-xs text-white">
                    -{Math.round(product.discountPercentage)}%
                </span>
            </div>
            <h3 className="mt-4 font-display text-sm uppercase tracking-caps">
                {product.title}
            </h3>

            <p className="mt-1 text-xs text-text-muted">
                {product.category}
            </p>

            <div className="mt-3 flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-lg">
                    {formatPrice(getDiscountedPrice(product.price, product.discountPercentage))}
                </span>

                {product.discountPercentage > 0 && (
                    <span className="font-mono tabular-nums text-xs text-text-muted line-through">
                        {formatPrice(product.price)}
                    </span>
                )}
            </div>
        </article>
    );
}
