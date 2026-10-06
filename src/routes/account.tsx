import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatUsd, getProduct } from "@/lib/catalog";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your wholesale account — Swan Apothecary" },
      {
        name: "description",
        content: "Review your Swan Apothecary wholesale order history and account details.",
      },
      ...socialMeta(
        "Your wholesale account — Swan Apothecary",
        "Order history and account details for Swan Apothecary stockists.",
      ),
    ],
  }),
  component: AccountPage,
});

type OrderRow = {
  id: string;
  reference: string;
  status: string;
  created_at: string;
  payment_preference: string;
  po_number: string;
  items: { slug: string; cases: number }[];
};

function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("business_name, contact_name, account_status")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const orders = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wholesale_orders")
        .select("id, reference, status, created_at, payment_preference, po_number, items")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as OrderRow[];
    },
  });

  if (loading || !user) {
    return <main className="mx-auto max-w-4xl px-5 py-24 text-sm text-muted-foreground">Loading…</main>;
  }

  const status = profile.data?.account_status ?? "pending";

  return (
    <main className="mx-auto max-w-4xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-muted-foreground">Your account</p>
          <h1 className="mt-3 font-display text-4xl">
            {profile.data?.business_name || user.email}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Account status:{" "}
            <span className="font-semibold text-foreground">
              {status === "approved" ? "Approved for invoicing" : "Pending review"}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/order"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Start an order
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent"
          >
            Sign out
          </button>
        </div>
      </div>

      {status !== "approved" && (
        <div className="mt-8 rounded-lg border border-dashed border-brass/60 bg-accent/40 p-5 text-sm">
          Your account is still being reviewed. You can place an order now — Swan will confirm terms
          and payment with you before anything ships. If you haven't sent an application yet,{" "}
          <Link to="/apply" className="underline underline-offset-4">
            apply here
          </Link>
          .
        </div>
      )}

      <h2 className="mt-14 font-display text-2xl">Order history</h2>
      {orders.isLoading && <p className="mt-4 text-sm text-muted-foreground">Loading orders…</p>}
      {orders.data?.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          No orders yet. Build an order sheet from the{" "}
          <Link to="/catalog" className="underline underline-offset-4">
            catalog
          </Link>
          .
        </p>
      )}
      <div className="mt-4 space-y-4">
        {orders.data?.map((order) => (
          <div key={order.id} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{order.reference}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()} ·{" "}
                  {order.payment_preference === "card" ? "Paying by card" : "On invoice"}
                  {order.po_number ? ` · PO ${order.po_number}` : ""}
                </p>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs capitalize">
                {order.status}
              </span>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              {order.items.map((item) => {
                const product = getProduct(item.slug);
                return (
                  <li key={item.slug}>
                    {item.cases} × {product?.name ?? item.slug}
                    {product?.wholesale
                      ? ` — ${formatUsd(product.wholesale * (product.casePack ?? 1) * item.cases)}`
                      : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}