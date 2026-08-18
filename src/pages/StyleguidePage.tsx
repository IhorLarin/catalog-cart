import type { ReactNode } from "react"

export function StyleguidePage(): ReactNode {
    return (
        <div className="space-y-12">
            <h1 className="font-display text-3xl uppercase tracking-caps">Styleguide</h1>

            <section className="space-y-4">
                <h2 className="font-display text-lg uppercase tracking-caps text-text-muted">Colors</h2>
                <div className="grid grid-cols-4 gap-4">
                    <Swatch name="page" className="bg-page" />
                    <Swatch name="surface" className="bg-surface" />
                    <Swatch name="surface-sunken" className="bg-surface-sunken" />
                    <Swatch name="line" className="bg-line" />
                    <Swatch name="brand" className="bg-brand" />
                    <Swatch name="brand-hover" className="bg-brand-hover" />
                    <Swatch name="brand-light" className="bg-brand-light" />
                    <Swatch name="brand-tint" className="bg-brand-tint" />
                    <Swatch name="badge" className="bg-badge" />
                    <Swatch name="ok" className="bg-ok" />
                    <Swatch name="warn" className="bg-warn" />
                    <Swatch name="danger" className="bg-danger" />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="font-display text-lg uppercase tracking-caps text-text-muted">Typography</h2>

                <div className="space-y-3 bg-surface p-6">
                    <p className="font-display text-3xl uppercase tracking-caps">Display 3xl — Oswald</p>
                    <p className="font-display text-2xl uppercase tracking-caps">Display 2xl — Oswald</p>
                    <p className="font-display text-lg uppercase tracking-caps">Display lg — Oswald</p>
                    <p className="font-display text-sm uppercase tracking-caps">Display sm — Oswald</p>
                </div>

                <div className="space-y-3 bg-surface p-6">
                    <p className="text-base">Body base — Inter. Опис товару, звичайний текст.</p>
                    <p className="text-sm text-text-subtle">Body sm subtle — другорядний текст</p>
                    <p className="text-xs text-text-muted">Body xs muted — підписи, метадані</p>
                </div>

                <div className="space-y-3 bg-surface p-6">
                    <p className="font-mono tabular-nums text-2xl">$1,598.00</p>
                    <p className="font-mono tabular-nums text-lg">$899.00</p>
                    <p className="font-mono tabular-nums text-sm">4.7 · 194 items</p>
                </div>
            </section>

            // src/pages/StyleguidePage.tsx
            <section className="space-y-4">
                <h2 className="font-display text-lg uppercase tracking-caps text-text-muted">Buttons</h2>

                <div className="flex flex-wrap items-center gap-4 bg-surface p-6">
                    <button className="bg-brand px-6 py-3 font-display text-sm uppercase tracking-caps text-white hover:bg-brand-hover">
                        Add to cart
                    </button>

                    <button className="border border-line-strong px-6 py-3 font-display text-sm uppercase tracking-caps text-text-subtle hover:border-brand hover:text-brand">
                        Secondary
                    </button>

                    <button
                        disabled
                        className="bg-brand px-6 py-3 font-display text-sm uppercase tracking-caps text-white opacity-50"
                    >
                        Disabled
                    </button>

                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-hover">
                        →
                    </button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="font-display text-lg uppercase tracking-caps text-text-muted">Badges</h2>

                <div className="flex flex-wrap items-center gap-4 bg-surface p-6">
                    <span className="bg-badge px-3 py-1 font-mono text-xs text-white">-$50</span>
                    <span className="bg-brand px-3 py-1 font-mono text-xs text-white">-15%</span>
                    <span className="font-display text-xs uppercase tracking-caps text-ok">In stock</span>
                    <span className="font-display text-xs uppercase tracking-caps text-warn">Low stock</span>
                    <span className="font-display text-xs uppercase tracking-caps text-danger">Out of stock</span>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="font-display text-lg uppercase tracking-caps text-text-muted">Skeletons</h2>

                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-surface p-4">
                        <div className="h-48 animate-pulse bg-surface-sunken" />
                        <div className="mt-4 h-4 w-3/4 animate-pulse bg-surface-sunken" />
                        <div className="mt-2 h-4 w-1/3 animate-pulse bg-surface-sunken" />
                    </div>

                    <div className="bg-surface p-4">
                        <div className="h-48 animate-pulse bg-surface-sunken" />
                        <div className="mt-4 h-4 w-3/4 animate-pulse bg-surface-sunken" />
                        <div className="mt-2 h-4 w-1/3 animate-pulse bg-surface-sunken" />
                    </div>

                    <div className="bg-surface p-4">
                        <div className="h-48 animate-pulse bg-surface-sunken" />
                        <div className="mt-4 h-4 w-3/4 animate-pulse bg-surface-sunken" />
                        <div className="mt-2 h-4 w-1/3 animate-pulse bg-surface-sunken" />
                    </div>
                </div>
            </section>
        </div>
    )
}

function Swatch({ name, className }: { name: string; className: string }): ReactNode {
    return (
        <div className="space-y-2">
            <div className={`h-16 rounded-control border border-line ${className}`} />
            <p className="font-mono text-xs text-text-muted">{name}</p>
        </div>
    )
}
