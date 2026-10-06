import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ImageOff, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { formatUsd, getProduct, lineLabel, products } from "@/lib/catalog";
import { PriceBlock, Tbd } from "@/components/site/PriceBlock";
import { ProductCard } from "@/components/site/ProductCard";
import { useOrderDraft } from "@/lib/order-draft";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Swan Apothecary Wholesale" },
          { name: "description", content: "This Swan Apothecary wholesale product is not available." },
          { name: "robots", content: "noindex" },
          ...socialMeta(
            "Product not found — Swan Apothecary Wholesale",
            "This Swan Apothecary wholesale product is not available.",
          ),
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Swan Apothecary Wholesale`;
    return {
      meta: [
        { title },
        { name: "description", content: product.tagline },
        ...socialMeta(title, product.tagline),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { lines, addCases, setCases } = useOrderDraft();
  const cases = lines.find((l) => l.slug === product.slug)?.cases ?? 0;
  const related = products.filter((p) => p.line === product.line && p.slug !== product.slug).slice(0, 3);

  const unavailable = product.status === "coming-soon";

  return (
    <div>
      <div className="mx-auto max-w-6xl px-5 pt-8">
        <Link
          to="/catalog"
          search={{ line: product.line }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to {lineLabel[product.line]}
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border bg-paper">
          {product.image ? (
            <img src={product.image} alt={product.name} className="aspect-square w-full object-contain p-10" />
          ) : (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 text-muted-foreground">
              <ImageOff className="size-10" />
              <span className="text-sm">Product photography pending</span>
            </div>
          )}
        </div>

        <div>
          <p className="eyebrow text-brass-foreground/70">{lineLabel[product.line]}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{product.tagline}</p>

          {product.statusNote && (
            <p className="mt-5 rounded-md border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-foreground">
              {product.statusNote}
            </p>
          )}

          <div className="mt-7">
            <PriceBlock product={product} size="lg" />
            {product.msrpNote && (
              <p className="mt-2 text-xs text-muted-foreground">{product.msrpNote}</p>
            )}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-muted-foreground">Format</dt>
              <dd className="mt-1">{product.format}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Case pack</dt>
              <dd className="mt-1">{product.casePack ?? <Tbd />}</dd>
            </div>
            <div>
              <dt className="eyebrow text-muted-foreground">Case cost</dt>
              <dd className="mt-1">
                {product.casePack != null && product.wholesale != null ? (
                  formatUsd(product.casePack * product.wholesale)
                ) : (
                  <Tbd />
                )}
              </dd>
            </div>
          </dl>

          {/* Order */}
          <div className="mt-8 rounded-lg border border-border bg-card p-5">
            {unavailable ? (
              <>
                <p className="text-sm font-semibold">Not yet available to order</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask us to add you to the launch list and we will contact you the day it is ready.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Notify me at launch
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold">Add to your order sheet</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      type="button"
                      aria-label="Fewer cases"
                      onClick={() => addCases(product.slug, -1)}
                      className="px-3 py-2 hover:bg-accent"
                    >
                      <Minus className="size-4" />
                    </button>
                    <input
                      aria-label="Cases"
                      value={cases}
                      onChange={(e) =>
                        setCases(product.slug, Math.max(0, Number(e.target.value.replace(/\D/g, "")) || 0))
                      }
                      className="w-14 border-x border-border bg-transparent py-2 text-center text-sm"
                    />
                    <button
                      type="button"
                      aria-label="More cases"
                      onClick={() => addCases(product.slug, 1)}
                      className="px-3 py-2 hover:bg-accent"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">cases</span>
                  <button
                    type="button"
                    onClick={() => {
                      addCases(product.slug, 1);
                      toast.success(`${product.name} added to your order sheet`);
                    }}
                    className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Add a case
                  </button>
                  <Link to="/order" className="text-sm font-semibold hover:underline">
                    View order sheet →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="border-y border-border bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl">About this product</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

            <h3 className="mt-10 text-xl">Why it earns shelf space</h3>
            <ul className="mt-4 space-y-3">
              {product.sellingPoints.map((point) => (
                <li key={point} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-brass" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-xl">Ingredients</h3>
            <p className="mt-3 text-muted-foreground">{product.ingredients}</p>
          </div>

          <aside className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-xl">Packaging & handling</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="eyebrow text-muted-foreground">Packaging</dt>
                <dd className="mt-1">{product.shelf.packaging}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Shelf life</dt>
                <dd className="mt-1">{product.shelf.shelfLife}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Storage</dt>
                <dd className="mt-1">{product.shelf.storage}</dd>
              </div>
            </dl>
            <Link
              to="/terms"
              className="mt-6 inline-flex text-sm font-semibold hover:underline"
            >
              Minimums & lead times →
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl">More from {lineLabel[product.line]}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}