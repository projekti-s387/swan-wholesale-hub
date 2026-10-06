import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, HandCoins, Repeat, Sparkles } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { socialMeta } from "@/lib/seo";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swan Apothecary Wholesale — Stock botanical topicals & pet wellness" },
      {
        name: "description",
        content:
          "Wholesale pricing, case packs, margins and ordering for Swan Apothecary's FireKitty topicals and Happy Pet range. Apply for a trade account.",
      },
      ...socialMeta(
        "Swan Apothecary Wholesale — Stock botanical topicals & pet wellness",
        "Wholesale pricing, case packs, margins and ordering for Swan Apothecary's FireKitty topicals and Happy Pet range.",
      ),
    ],
  }),
  component: Home,
});

const featured = ["firekitty-oil-3oz-roll-on", "muscle-balm", "happy-pet-essential-infusion", "nose-to-tail"];

function Home() {
  const hero = products.filter((p) => featured.includes(p.slug));

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-paper">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-paper/95 via-paper/75 to-paper/30" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <div>
            <p className="eyebrow text-brass-foreground/70">Trade & wholesale</p>
            <h1 className="mt-4 text-balance text-5xl leading-[1.05] sm:text-6xl">
              Small-batch botanical care your customers come back for.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Swan Apothecary makes the FireKitty topical range and the Happy Pet line in small
              batches. This site is for retail buyers: the full range, packaging, wholesale
              pricing, suggested retail and the economics of carrying it.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Apply for a wholesale account <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Browse the catalog
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Pricing is open — no login needed to see wholesale and suggested retail.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {hero.slice(0, 4).map((p) => (
              <div
                key={p.slug}
                className="aspect-square overflow-hidden rounded-lg border border-border/70 bg-card/90 shadow-sm backdrop-blur-sm"
              >
                <img src={p.image} alt={p.name} className="size-full object-contain p-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow text-brass-foreground/70">Why it works on a shelf</p>
        <h2 className="mt-3 max-w-2xl text-4xl">Built to sell, not just to stock.</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: HandCoins,
              title: "Clear margin",
              body: "Every product shows wholesale, suggested retail and the margin side by side. No guesswork in your buying meeting.",
            },
            {
              icon: Repeat,
              title: "Repeat purchase",
              body: "Oils, salves and pet infusions are consumables. Customers who try one come back for the next.",
            },
            {
              icon: Sparkles,
              title: "A name customers ask for",
              body: "FireKitty and Happy Pet arrive with their own following, built over years of direct retail.",
            },
            {
              icon: Boxes,
              title: "A full price ladder",
              body: "From a 0.5 oz counter tin to a complete wellness box — entry points and hero items in one range.",
            },
          ].map((f) => (
            <div key={f.title}>
              <f.icon className="size-6 text-brass" />
              <h3 className="mt-4 text-xl">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Two lines */}
      <section className="border-y border-border bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="eyebrow text-ember">FireKitty & topicals</p>
            <h3 className="mt-3 text-3xl">Warming relief people re-buy.</h3>
            <p className="mt-4 text-muted-foreground">
              Oils, salves, a roll-on, a muscle balm and a transdermal patch. Six ways to meet a
              customer who walked in with a sore shoulder — from a counter tin to a premium jar.
            </p>
            <Link
              to="/catalog"
              search={{ line: "topicals" }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              See the topical range <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="eyebrow text-brass-foreground/70">Happy Pet</p>
            <h3 className="mt-3 text-3xl">The category owners forget to stock.</h3>
            <p className="mt-4 text-muted-foreground">
              Infusions, a topical butter, a gift-ready trio and the Nose to Tail box. Pet wellness
              sells beside human wellness — the same customer buys both in one visit.
            </p>
            <Link
              to="/catalog"
              search={{ line: "pet" }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
            >
              See the pet range <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-brass-foreground/70">Start here</p>
            <h2 className="mt-3 text-4xl">A strong opening order.</h2>
          </div>
          <Link to="/catalog" className="text-sm font-semibold hover:underline">
            View all 12 products →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hero.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="rounded-lg surface-dark px-8 py-14 text-center">
          <h2 className="text-4xl">Ready to carry Swan?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/75">
            Tell us about your store and we will come back with pricing, a suggested opening order
            and lead times.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/apply"
              className="rounded-md bg-brass px-6 py-3 text-sm font-semibold text-brass-foreground transition-opacity hover:opacity-90"
            >
              Apply for an account
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              Talk to the wholesale team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}