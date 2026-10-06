import { Link } from "@tanstack/react-router";
import { Menu, ClipboardList, UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useOrderDraft } from "@/lib/order-draft";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/catalog", label: "Catalog" },
  { to: "/terms", label: "Wholesale terms" },
  { to: "/about", label: "About Swan Apothecary" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { totalCases } = useOrderDraft();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-[78px] max-w-6xl items-center gap-6 px-5">
        <Link
          to="/"
          className="flex shrink-0 flex-col items-stretch"
          onClick={() => setOpen(false)}
        >
          <img src="/products/logo-tight.png" alt="Swan Apothecary" className="h-12 w-auto" />
          <span className="mt-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase leading-none tracking-[0.32em] text-brass">
            <span className="h-px flex-1 bg-brass/50" />
            Wholesale
            <span className="h-px flex-1 bg-brass/50" />
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-foreground/75 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/order"
            className="relative inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <ClipboardList className="size-4" />
            <span className="hidden sm:inline">Order sheet</span>
            {totalCases > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-ember text-[11px] font-bold text-ember-foreground">
                {totalCases}
              </span>
            )}
          </Link>
          <Link
            to={user ? "/account" : "/auth"}
            className="hidden items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent sm:inline-flex"
          >
            <UserRound className="size-4" />
            {user ? "My account" : "Sign in"}
          </Link>
          <Link
            to="/apply"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 lg:inline-flex"
          >
            Apply for an account
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border md:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      <div className={cn("border-t border-border bg-paper md:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2">
          {[
            ...nav,
            { to: "/apply", label: "Apply for an account" } as const,
            user
              ? ({ to: "/account", label: "My account" } as const)
              : ({ to: "/auth", label: "Sign in" } as const),
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}