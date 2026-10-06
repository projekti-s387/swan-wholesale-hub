import { Link } from "@tanstack/react-router";
import { ImageOff } from "lucide-react";
import { lineLabel, type Product } from "@/lib/catalog";
import { PriceBlock } from "./PriceBlock";

function StatusPill({ product }: { product: Product }) {
  if (product.status === "available") return null;
  const text = product.status === "coming-soon" ? "Coming soon" : "Confirming availability";
  return (
    <span className="absolute left-3 top-3 rounded-full bg-ember px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ember-foreground">
      {text}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-paper"
      >
        <StatusPill product={product} />
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="size-7" />
            <span className="text-xs">Photography pending</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="eyebrow text-brass-foreground/60">{lineLabel[product.line]}</p>
          <h3 className="mt-1 text-lg leading-snug">
            <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.format}</p>
        </div>

        <div className="mt-auto space-y-3">
          <PriceBlock product={product} />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Case pack: {product.casePack ?? "TBD"}</span>
            <Link
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="font-semibold text-foreground hover:underline"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}