import { formatUsd, marginPct, type Product } from "@/lib/catalog";

export function Tbd({ label = "TBD" }: { label?: string }) {
  return (
    <span className="rounded-sm border border-dashed border-brass px-1.5 py-0.5 text-xs font-semibold text-brass-foreground/70">
      {label}
    </span>
  );
}

export function PriceBlock({ product, size = "sm" }: { product: Product; size?: "sm" | "lg" }) {
  const margin = marginPct(product);
  const big = size === "lg";

  return (
    <dl
      className={
        big
          ? "grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border"
          : "grid grid-cols-3 gap-px overflow-hidden rounded-md border border-border bg-border text-sm"
      }
    >
      <div className={big ? "bg-card px-3 py-3" : "bg-card px-2.5 py-2.5"}>
        <dt className={big ? "eyebrow text-muted-foreground" : "text-[10px] font-bold uppercase leading-tight tracking-[0.06em] text-muted-foreground"}>Wholesale</dt>
        <dd className={big ? "mt-1 font-display text-2xl" : "mt-1 font-semibold"}>
          {product.wholesale != null ? formatUsd(product.wholesale) : <Tbd />}
        </dd>
      </div>
      <div className={big ? "bg-card px-3 py-3" : "bg-card px-2.5 py-2.5"}>
        <dt className={big ? "eyebrow text-muted-foreground" : "whitespace-nowrap text-[10px] font-bold uppercase leading-tight tracking-[0.06em] text-muted-foreground"}>{big ? "Suggested retail" : "Retail"}</dt>
        <dd className={big ? "mt-1 font-display text-2xl" : "mt-1 font-semibold"}>
          {product.msrp != null ? formatUsd(product.msrp) : <Tbd />}
        </dd>
      </div>
      <div className={big ? "bg-card px-3 py-3" : "bg-card px-2.5 py-2.5"}>
        <dt className={big ? "eyebrow text-muted-foreground" : "text-[10px] font-bold uppercase leading-tight tracking-[0.06em] text-muted-foreground"}>Margin</dt>
        <dd className={big ? "mt-1 font-display text-2xl" : "mt-1 font-semibold"}>
          {margin != null ? `${margin}%` : <Tbd />}
        </dd>
      </div>
    </dl>
  );
}