import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatUsd, getProduct, TERMS } from "@/lib/catalog";
import { useOrderDraft } from "@/lib/order-draft";
import { submitOrder } from "@/lib/wholesale.functions";
import { Tbd } from "@/components/site/PriceBlock";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Place a wholesale order — Swan Apothecary" },
      {
        name: "description",
        content:
          "Build your Swan Apothecary order sheet by the case, choose invoice or card payment, and send it to the wholesale team.",
      },
      ...socialMeta(
        "Place a wholesale order — Swan Apothecary",
        "Build your order sheet by the case, choose invoice or card payment, and send it to the wholesale team.",
      ),
    ],
  }),
  component: OrderPage,
});

const field =
  "mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
const labelCls = "eyebrow text-muted-foreground";

function OrderPage() {
  const { lines, addCases, setCases, clear, totalCases } = useOrderDraft();
  const send = useServerFn(submitOrder);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const rows = lines
    .map((l) => ({ line: l, product: getProduct(l.slug) }))
    .filter((r): r is { line: typeof r.line; product: NonNullable<typeof r.product> } => !!r.product);

  const totalUnits = rows.reduce(
    (sum, r) => sum + (r.product.casePack != null ? r.product.casePack * r.line.cases : 0),
    0,
  );
  const priced = rows.every((r) => r.product.casePack != null && r.product.wholesale != null);
  const totalValue = priced
    ? rows.reduce((sum, r) => sum + r.product.casePack! * r.product.wholesale! * r.line.cases, 0)
    : null;

  if (reference) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <CheckCircle2 className="mx-auto size-12 text-brass" />
        <h1 className="mt-6 text-4xl">Order request sent.</h1>
        <p className="mt-4 text-muted-foreground">
          Your reference is <span className="font-semibold text-foreground">{reference}</span>. We
          will confirm availability, freight and the final total before anything is charged or
          invoiced.
        </p>
        <Link to="/catalog" className="mt-8 inline-flex text-sm font-semibold underline">
          Back to the catalog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow text-brass-foreground/70">Place an order</p>
          <h1 className="mt-3 max-w-2xl text-5xl">Your order sheet.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Build the order by the case, then send it. Nothing is charged at this step — we confirm
            stock, freight and the final total first.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Items</h2>
            {rows.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear sheet
              </button>
            )}
          </div>

          {rows.length === 0 ? (
            <div className="mt-5 rounded-lg border border-dashed border-border bg-card p-10 text-center">
              <p className="text-muted-foreground">Your order sheet is empty.</p>
              <Link
                to="/catalog"
                className="mt-5 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Browse the catalog
              </Link>
            </div>
          ) : (
            <ul className="mt-5 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
              {rows.map(({ line, product }) => (
                <li key={product.slug} className="flex flex-wrap items-center gap-4 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-16 rounded-md bg-paper object-contain p-1.5"
                  />
                  <div className="min-w-40 flex-1">
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="font-semibold hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {product.casePack != null
                        ? `${product.casePack} units per case`
                        : "Case pack TBD"}
                      {product.wholesale != null && ` · ${formatUsd(product.wholesale)} per unit`}
                    </p>
                  </div>
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      type="button"
                      aria-label="Fewer cases"
                      onClick={() => addCases(product.slug, -1)}
                      className="px-2.5 py-2 hover:bg-accent"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <input
                      aria-label={`Cases of ${product.name}`}
                      value={line.cases}
                      onChange={(e) =>
                        setCases(product.slug, Math.max(0, Number(e.target.value.replace(/\D/g, "")) || 0))
                      }
                      className="w-12 border-x border-border bg-transparent py-2 text-center text-sm"
                    />
                    <button
                      type="button"
                      aria-label="More cases"
                      onClick={() => addCases(product.slug, 1)}
                      className="px-2.5 py-2 hover:bg-accent"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <div className="w-24 text-right text-sm font-semibold">
                    {product.casePack != null && product.wholesale != null ? (
                      formatUsd(product.casePack * product.wholesale * line.cases)
                    ) : (
                      <Tbd />
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => setCases(product.slug, 0)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            <div className="bg-card px-4 py-4">
              <p className="eyebrow text-muted-foreground">Cases</p>
              <p className="mt-1 font-display text-2xl">{totalCases}</p>
            </div>
            <div className="bg-card px-4 py-4">
              <p className="eyebrow text-muted-foreground">Units</p>
              <p className="mt-1 font-display text-2xl">{totalUnits > 0 ? totalUnits : <Tbd />}</p>
            </div>
            <div className="bg-card px-4 py-4">
              <p className="eyebrow text-muted-foreground">Order value</p>
              <p className="mt-1 font-display text-2xl">
                {totalValue != null ? formatUsd(totalValue) : <Tbd />}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {TERMS.openingOrder == null
              ? "Minimum opening order is still being confirmed — we will tell you if your order falls short of it."
              : `Minimum opening order: ${formatUsd(TERMS.openingOrder)}.`}{" "}
            Freight is quoted on confirmation.
          </p>
        </div>

        <form
          className="h-fit space-y-5 rounded-lg border border-border bg-card p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            if (rows.length === 0) {
              toast.error("Add at least one item to your order sheet first.");
              return;
            }
            const fd = new FormData(e.currentTarget);
            setSending(true);
            try {
              const result = await send({
                data: {
                  businessName: String(fd.get("businessName") ?? ""),
                  contactName: String(fd.get("contactName") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  phone: String(fd.get("phone") ?? ""),
                  shipTo: String(fd.get("shipTo") ?? ""),
                  paymentPreference:
                    String(fd.get("paymentPreference") ?? "invoice") === "card" ? "card" : "invoice",
                  poNumber: String(fd.get("poNumber") ?? ""),
                  notes: String(fd.get("notes") ?? ""),
                  lines: rows.map((r) => ({ slug: r.product.slug, cases: r.line.cases })),
                },
              });
              clear();
              setReference(result.reference);
            } catch {
              toast.error("We couldn't send that order. Please check the form and try again.");
            } finally {
              setSending(false);
            }
          }}
        >
          <h2 className="text-2xl">Your details</h2>

          <div>
            <label className={labelCls} htmlFor="businessName">
              Business name *
            </label>
            <input id="businessName" name="businessName" required className={field} />
          </div>
          <div>
            <label className={labelCls} htmlFor="contactName">
              Your name *
            </label>
            <input id="contactName" name="contactName" required className={field} />
          </div>
          <div>
            <label className={labelCls} htmlFor="email">
              Email *
            </label>
            <input id="email" name="email" type="email" required className={field} />
          </div>
          <div>
            <label className={labelCls} htmlFor="phone">
              Phone
            </label>
            <input id="phone" name="phone" className={field} />
          </div>
          <div>
            <label className={labelCls} htmlFor="shipTo">
              Ship to
            </label>
            <textarea id="shipTo" name="shipTo" rows={3} className={field} />
          </div>
          <div>
            <label className={labelCls} htmlFor="poNumber">
              PO number
            </label>
            <input id="poNumber" name="poNumber" className={field} />
          </div>

          <fieldset>
            <legend className={labelCls}>How would you like to pay?</legend>
            <div className="mt-3 space-y-2 text-sm">
              <label className="flex items-start gap-3 rounded-md border border-border p-3">
                <input type="radio" name="paymentPreference" value="invoice" defaultChecked className="mt-1" />
                <span>
                  <span className="font-semibold">Invoice</span>
                  <span className="block text-xs text-muted-foreground">
                    For approved accounts on agreed terms.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 rounded-md border border-border p-3">
                <input type="radio" name="paymentPreference" value="card" className="mt-1" />
                <span>
                  <span className="font-semibold">Pay by card</span>
                  <span className="block text-xs text-muted-foreground">
                    We send a secure payment link once the order is confirmed.
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          <div>
            <label className={labelCls} htmlFor="notes">
              Notes
            </label>
            <textarea id="notes" name="notes" rows={3} className={field} />
          </div>

          <button
            type="submit"
            disabled={sending || rows.length === 0}
            className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send order request"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Not a stockist yet?{" "}
            <Link to="/apply" className="underline">
              Apply for an account
            </Link>
            .
          </p>
        </form>
      </section>
    </div>
  );
}