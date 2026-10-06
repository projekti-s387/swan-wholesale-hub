import { createFileRoute, Link } from "@tanstack/react-router";
import { TERMS } from "@/lib/catalog";
import { Tbd } from "@/components/site/PriceBlock";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Wholesale terms — Swan Apothecary" },
      {
        name: "description",
        content:
          "Order minimums, lead times, payment terms, shipping, returns and merchandising support for Swan Apothecary retail partners.",
      },
      ...socialMeta(
        "Wholesale terms — Swan Apothecary",
        "Order minimums, lead times, payment terms, shipping, returns and merchandising support for Swan Apothecary retail partners.",
      ),
    ],
  }),
  component: Terms,
});

function Value({ value }: { value: string | number | null }) {
  if (value == null) return <Tbd />;
  return <span>{value}</span>;
}

const sections = [
  {
    title: "How an account is opened",
    body: [
      "Submit the wholesale application with your store details and resale or tax ID.",
      "We review and come back within two business days with pricing confirmation and a suggested opening order for your store type.",
      "Once approved you can order directly from this site at any time.",
    ],
  },
  {
    title: "Shipping",
    body: [
      "Orders ship from Swan Apothecary in the United States.",
      "Freight is quoted on the order confirmation and added to your invoice.",
      "Split shipments are possible when part of an order is in production — we will always ask before splitting.",
    ],
  },
  {
    title: "Reorders",
    body: [
      "Approved accounts reorder from the same order sheet on this site — your details carry across.",
      "Reorders carry a lower minimum than an opening order.",
      "We will flag any item on extended lead time before you confirm.",
    ],
  },
  {
    title: "Returns & damages",
    body: [
      "Report shortages or transit damage within seven days of delivery with photographs and we will replace at no cost.",
      "Wholesale stock is not returnable for change of mind.",
      "Any product with a genuine quality fault is replaced or credited in full.",
    ],
  },
  {
    title: "Merchandising support",
    body: [
      "Product photography, ingredient copy and shelf talkers are available to every stockist.",
      "Testers are available for the topical range so customers can try before they buy.",
      "We can supply staff training notes so your team can speak confidently about the range.",
    ],
  },
];

function Terms() {
  const facts = [
    { label: "Opening order minimum", value: TERMS.openingOrder },
    { label: "Reorder minimum", value: TERMS.reorderMinimum },
    { label: "Lead time — first order", value: TERMS.leadTimeNew },
    { label: "Lead time — reorders", value: TERMS.leadTimeReorder },
    { label: "Payment terms", value: TERMS.paymentTerms },
    { label: "Free freight threshold", value: TERMS.freeFreightAt },
  ];

  return (
    <div>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow text-brass-foreground/70">For buyers</p>
          <h1 className="mt-3 max-w-2xl text-5xl">Wholesale terms.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Everything you need to plan a first order. Figures marked TBD are being confirmed and
            will be published here as soon as they are final.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="bg-card px-5 py-6">
              <p className="eyebrow text-muted-foreground">{f.label}</p>
              <p className="mt-2 font-display text-2xl">
                <Value value={f.value} />
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl">Paying for an order</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="rounded-md border border-border bg-paper p-5">
              <p className="eyebrow text-brass-foreground/70">Option one</p>
              <h3 className="mt-2 text-xl">Invoice</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Approved accounts submit an order here and receive an invoice on agreed terms. Best
                for established stockists placing regular reorders.
              </p>
            </div>
            <div className="rounded-md border border-border bg-paper p-5">
              <p className="eyebrow text-brass-foreground/70">Option two</p>
              <h3 className="mt-2 text-xl">Pay by card</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pay for the order up front by card. Usually the fastest route for a first order,
                and it gets your stock into production straight away.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-2xl">{s.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {s.body.map((line) => (
                  <li key={line} className="border-l-2 border-brass/40 pl-4">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-lg surface-dark px-8 py-12 text-center">
          <h2 className="text-3xl">Questions before you commit?</h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/75">
            The wholesale team will walk you through pricing, margins and a suggested opening order
            for your store.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/apply"
              className="rounded-md bg-brass px-6 py-3 text-sm font-semibold text-brass-foreground hover:opacity-90"
            >
              Apply for an account
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}