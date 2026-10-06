import { createFileRoute, Link } from "@tanstack/react-router";
import { products, type Line } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";
import { socialMeta } from "@/lib/seo";

type Search = { line?: Line };

export const Route = createFileRoute("/catalog")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const line = search["line"];
    return line === "topicals" || line === "pet" ? { line } : {};
  },
  head: () => ({
    meta: [
      { title: "Wholesale catalog — Swan Apothecary" },
      {
        name: "description",
        content:
          "The full Swan Apothecary wholesale range: FireKitty topicals and Happy Pet products with wholesale price, suggested retail, margin and case pack.",
      },
      ...socialMeta(
        "Wholesale catalog — Swan Apothecary",
        "FireKitty topicals and Happy Pet products with wholesale price, suggested retail, margin and case pack.",
      ),
    ],
  }),
  component: Catalog,
});

const filters = [
  { key: undefined, label: "All products" },
  { key: "topicals" as const, label: "Topicals" },
  { key: "pet" as const, label: "Pet" },
];

function Catalog() {
  const { line } = Route.useSearch();
  const shown = line ? products.filter((p) => p.line === line) : products;

  return (
    <div>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow text-brass-foreground/70">Wholesale catalog</p>
          <h1 className="mt-3 max-w-2xl text-5xl">The full range, with the numbers attached.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Every product shows its wholesale price, suggested retail and your margin. Wholesale
            pricing and case packs marked TBD are being confirmed with Robin and will be filled in
            shortly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <Link
              key={f.label}
              to="/catalog"
              search={f.key ? { line: f.key } : {}}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                line === f.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-accent",
              )}
            >
              {f.label}
            </Link>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">{shown.length} products</span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="mt-14 rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl">Need a printable line sheet?</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Once wholesale pricing and case packs are confirmed we will publish a downloadable line
            sheet and order form here for buyers who prefer paper or PDF in a buying meeting.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Request a line sheet
          </Link>
        </div>
      </section>
    </div>
  );
}