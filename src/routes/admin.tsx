import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getProduct } from "@/lib/catalog";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Wholesale desk — Swan Apothecary" },
      { name: "description", content: "Internal desk for Swan Apothecary wholesale enquiries." },
      { name: "robots", content: "noindex" },
      ...socialMeta("Wholesale desk — Swan Apothecary", "Internal Swan Apothecary wholesale desk."),
    ],
  }),
  component: AdminPage,
});

type Tab = "orders" | "applications" | "messages";

function AdminPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("orders");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const isAdmin = useQuery({
    queryKey: ["is-admin", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) throw error;
      return !!data;
    },
  });

  const orders = useQuery({
    queryKey: ["admin-orders"],
    enabled: isAdmin.data === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wholesale_orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const applications = useQuery({
    queryKey: ["admin-applications"],
    enabled: isAdmin.data === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wholesale_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const messages = useQuery({
    queryKey: ["admin-messages"],
    enabled: isAdmin.data === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wholesale_enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function setStatus(
    table: "wholesale_orders" | "wholesale_applications" | "wholesale_enquiries",
    id: string,
    status: string,
    key: string,
  ) {
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) {
      toast.error("Couldn't update that yet.");
      return;
    }
    toast.success(`Marked ${status}`);
    queryClient.invalidateQueries({ queryKey: [key] });
  }

  if (loading || !user || isAdmin.isLoading) {
    return <main className="mx-auto max-w-5xl px-5 py-24 text-sm text-muted-foreground">Loading…</main>;
  }

  if (!isAdmin.data) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-24">
        <h1 className="font-display text-3xl">Swan staff only</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This desk shows buyer applications and orders. Ask Robin to add your login to the staff
          list and it will appear here.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow text-muted-foreground">Internal</p>
      <h1 className="mt-3 font-display text-4xl">Wholesale desk</h1>

      <div className="mt-8 flex gap-2 border-b border-border">
        {(
          [
            ["orders", `Orders (${orders.data?.length ?? 0})`],
            ["applications", `Applications (${applications.data?.length ?? 0})`],
            ["messages", `Messages (${messages.data?.length ?? 0})`],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={
              tab === value
                ? "-mb-px border-b-2 border-foreground px-4 py-2.5 text-sm font-semibold"
                : "-mb-px px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground"
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {tab === "orders" &&
          orders.data?.map((row: Record<string, unknown>) => (
            <Card key={row["id"] as string}>
              <Head
                title={`${row["reference"]} — ${row["business_name"]}`}
                meta={`${new Date(row["created_at"] as string).toLocaleString()} · ${
                  row["payment_preference"] === "card" ? "Card" : "Invoice"
                }`}
                status={row["status"] as string}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                {row["contact_name"] as string} · {row["email"] as string}{" "}
                {row["phone"] ? `· ${row["phone"]}` : ""}
              </p>
              {!!row["ship_to"] && (
                <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                  {row["ship_to"] as string}
                </p>
              )}
              <ul className="mt-3 space-y-1 text-sm">
                {(row["items"] as { slug: string; cases: number }[]).map((item) => (
                  <li key={item.slug}>
                    {item.cases} × {getProduct(item.slug)?.name ?? item.slug}
                  </li>
                ))}
              </ul>
              {!!row["notes"] && <Note>{row["notes"] as string}</Note>}
              <Actions
                options={["new", "confirmed", "shipped", "closed"]}
                current={row["status"] as string}
                onPick={(s) => setStatus("wholesale_orders", row["id"] as string, s, "admin-orders")}
              />
            </Card>
          ))}

        {tab === "applications" &&
          applications.data?.map((row: Record<string, unknown>) => (
            <Card key={row["id"] as string}>
              <Head
                title={`${row["business_name"]} — ${row["store_type"]}`}
                meta={`${row["reference"]} · ${new Date(
                  row["created_at"] as string,
                ).toLocaleString()}`}
                status={row["status"] as string}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                {row["contact_name"] as string} · {row["email"] as string}{" "}
                {row["phone"] ? `· ${row["phone"]}` : ""}
              </p>
              {!!row["website"] && (
                <p className="mt-1 text-sm text-muted-foreground">{row["website"] as string}</p>
              )}
              {!!row["address"] && (
                <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                  {row["address"] as string}
                </p>
              )}
              {!!row["resale_id"] && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Resale / tax ID: {row["resale_id"] as string}
                </p>
              )}
              {!!(row["lines_of_interest"] as string[])?.length && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Interested in: {(row["lines_of_interest"] as string[]).join(", ")}
                </p>
              )}
              {!!row["message"] && <Note>{row["message"] as string}</Note>}
              <Actions
                options={["new", "approved", "on-hold", "declined"]}
                current={row["status"] as string}
                onPick={(s) =>
                  setStatus("wholesale_applications", row["id"] as string, s, "admin-applications")
                }
              />
            </Card>
          ))}

        {tab === "messages" &&
          messages.data?.map((row: Record<string, unknown>) => (
            <Card key={row["id"] as string}>
              <Head
                title={`${row["name"]}${row["business_name"] ? ` — ${row["business_name"]}` : ""}`}
                meta={`${row["reference"]} · ${new Date(
                  row["created_at"] as string,
                ).toLocaleString()}`}
                status={row["status"] as string}
              />
              <p className="mt-2 text-sm text-muted-foreground">{row["email"] as string}</p>
              {!!row["subject"] && <p className="mt-2 font-medium">{row["subject"] as string}</p>}
              <Note>{row["message"] as string}</Note>
              <Actions
                options={["new", "replied", "closed"]}
                current={row["status"] as string}
                onPick={(s) =>
                  setStatus("wholesale_enquiries", row["id"] as string, s, "admin-messages")
                }
              />
            </Card>
          ))}
      </div>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-card p-5">{children}</div>;
}

function Head({ title, meta, status }: { title: string; meta: string; status: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="font-display text-lg">{title}</p>
        <p className="text-xs text-muted-foreground">{meta}</p>
      </div>
      <span className="rounded-full border border-border px-3 py-1 text-xs capitalize">
        {status}
      </span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 whitespace-pre-line rounded-md bg-accent/50 p-3 text-sm">{children}</p>
  );
}

function Actions({
  options,
  current,
  onPick,
}: {
  options: string[];
  current: string;
  onPick: (status: string) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          disabled={option === current}
          onClick={() => onPick(option)}
          className="rounded-md border border-border px-3 py-1.5 text-xs capitalize transition-colors hover:bg-accent disabled:opacity-40"
        >
          {option}
        </button>
      ))}
    </div>
  );
}