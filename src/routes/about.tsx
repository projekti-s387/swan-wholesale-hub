import { createFileRoute, Link } from "@tanstack/react-router";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Swan Apothecary — the story behind the range" },
      {
        name: "description",
        content:
          "Robin Swan makes the FireKitty topicals and Happy Pet range in small batches. The maker story your staff can use on the shop floor.",
      },
      ...socialMeta(
        "About Swan Apothecary — the story behind the range",
        "Robin Swan makes the FireKitty topicals and Happy Pet range in small batches. The maker story your staff can use on the shop floor.",
      ),
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow text-brass-foreground/70">About</p>
          <h1 className="mt-3 max-w-3xl text-5xl">
            A maker-led brand your customers can meet on the label.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Swan Apothecary is Robin Swan's small-batch botanical practice. Everything in this
            catalog is made in-house, in quantities small enough that each batch is checked by the
            person whose name is on the jar.
          </p>
          <p>
            That is the part your staff can sell. Customers browsing a wellness shelf are choosing
            between a dozen unfamiliar labels; a real maker, a real story and a range with a
            following behind it is what makes one of them get picked up.
          </p>
          <p>
            The FireKitty line grew out of customers asking for the warming oil by name. Happy Pet
            followed the same route — people who trusted the topicals for themselves started asking
            what they could use for their animals.
          </p>
          <p>
            Full company background, lab results and Robin's media appearances live on the retail
            site at{" "}
            <a
              href="https://swanapothecary.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground underline"
            >
              swanapothecary.com
            </a>
            .
          </p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl">What we give stockists</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="border-l-2 border-brass/40 pl-4">Product photography and copy</li>
              <li className="border-l-2 border-brass/40 pl-4">Shelf talkers and staff training notes</li>
              <li className="border-l-2 border-brass/40 pl-4">Testers for the topical range</li>
              <li className="border-l-2 border-brass/40 pl-4">A named contact on the wholesale team</li>
            </ul>
          </div>
          <div className="rounded-lg surface-dark p-6">
            <h2 className="text-xl">Two lines, one customer</h2>
            <p className="mt-3 text-sm text-primary-foreground/75">
              The person buying a muscle balm is very often the person who will buy something for
              their dog on the same visit. Carrying both lines raises basket size without adding a
              new customer type.
            </p>
            <Link to="/catalog" className="mt-5 inline-flex text-sm font-semibold underline">
              See the full range
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}