import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Buyer sign in — Swan Apothecary Wholesale" },
      {
        name: "description",
        content:
          "Sign in to your Swan Apothecary wholesale account to place orders and review your order history.",
      },
      ...socialMeta(
        "Buyer sign in — Swan Apothecary Wholesale",
        "Stockist sign in for Swan Apothecary wholesale ordering.",
      ),
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) navigate({ to: "/account" });
  }, [loading, session, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
            data: { business_name: businessName, contact_name: contactName },
          },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your address, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/account" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      toast.error("Google sign-in didn't work. Try again or use your email and password.");
    }
  }

  return (
    <main className="mx-auto max-w-md px-5 py-20">
      <p className="eyebrow text-muted-foreground">Stockist access</p>
      <h1 className="mt-3 font-display text-4xl">
        {mode === "signin" ? "Sign in to your account" : "Create your buyer login"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Pricing is open to everyone — a login is only for placing orders and keeping your order
        history in one place. New to Swan?{" "}
        <Link to="/apply" className="underline underline-offset-4">
          Apply for a wholesale account
        </Link>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === "signup" && (
          <>
            <Field label="Business name" value={businessName} onChange={setBusinessName} required />
            <Field label="Your name" value={contactName} onChange={setContactName} required />
          </>
        )}
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="w-full rounded-md border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
      >
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "signin" ? "No login yet?" : "Already have a login?"}{" "}
        <button
          type="button"
          className="font-semibold text-foreground underline underline-offset-4"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin" ? "Create one" : "Sign in"}
        </button>
      </p>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground/40"
      />
    </label>
  );
}