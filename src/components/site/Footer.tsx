import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 surface-dark">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">Swan Apothecary</p>
          <p className="eyebrow mt-1 text-primary-foreground/60">Wholesale division</p>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Small-batch botanical topicals and pet wellness, made by Robin Swan.
          </p>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Catalog</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/catalog" search={{ line: "topicals" }} className="hover:underline">
                Topicals
              </Link>
            </li>
            <li>
              <Link to="/catalog" search={{ line: "pet" }} className="hover:underline">
                Pet
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:underline">
                Full range
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Buyers</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/terms" className="hover:underline">
                Wholesale terms
              </Link>
            </li>
            <li>
              <Link to="/apply" className="hover:underline">
                Apply for an account
              </Link>
            </li>
            <li>
              <Link to="/order" className="hover:underline">
                Place an order
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/about" className="hover:underline">
                About Robin Swan
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact the wholesale team
              </Link>
            </li>
            <li>
              <a
                href="https://swanapothecary.com"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Retail site
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Swan Apothecary. Trade site for approved buyers.</p>
          <p>
            Statements have not been evaluated by the FDA. Products are not intended to diagnose,
            treat, cure or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}