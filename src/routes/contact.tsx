import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CheckCircle2, Mail, Globe } from "lucide-react";
import { toast } from "sonner";
import { submitEnquiry } from "@/lib/wholesale.functions";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the wholesale team — Swan Apothecary" },
      {
        name: "description",
        content:
          "Questions about pricing, margins, lead times or an opening order? Reach the Swan Apothecary wholesale team directly.",
      },
      ...socialMeta(
        "Contact the wholesale team — Swan Apothecary",
        "Questions about pricing, margins, lead times or an opening order? Reach the Swan Apothecary wholesale team.",
      ),
    ],
  }),
  component: Contact,
});

const field =
  "mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
const labelCls = "eyebrow text-muted-foreground";

function Contact() {
  const send = useServerFn(submitEnquiry);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  return (
    <div>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow text-brass-foreground/70">Contact</p>
          <h1 className="mt-3 max-w-2xl text-5xl">Talk to the wholesale team.</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <Mail className="size-5 text-brass" />
            <h2 className="mt-3 text-xl">Wholesale enquiries</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact details for the wholesale salesperson will be published here once the role is
              filled. Until then, messages sent through this form reach Swan directly.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <Globe className="size-5 text-brass" />
            <h2 className="mt-3 text-xl">Retail customers</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Shopping for yourself rather than a store? Everything is available at{" "}
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
          <div className="rounded-lg surface-dark p-6">
            <h2 className="text-xl">Ready to open an account?</h2>
            <p className="mt-2 text-sm text-primary-foreground/75">
              The application takes about two minutes.
            </p>
            <Link to="/apply" className="mt-4 inline-flex text-sm font-semibold underline">
              Apply for a wholesale account
            </Link>
          </div>
        </div>

        {reference ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-10 text-center">
            <CheckCircle2 className="size-10 text-brass" />
            <h2 className="mt-5 text-3xl">Message sent.</h2>
            <p className="mt-3 text-muted-foreground">
              Your reference is <span className="font-semibold text-foreground">{reference}</span>.
              We usually reply within one business day.
            </p>
          </div>
        ) : (
          <form
            className="space-y-5 rounded-lg border border-border bg-card p-7"
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              setSending(true);
              try {
                const result = await send({
                  data: {
                    name: String(fd.get("name") ?? ""),
                    email: String(fd.get("email") ?? ""),
                    businessName: String(fd.get("businessName") ?? ""),
                    subject: String(fd.get("subject") ?? ""),
                    message: String(fd.get("message") ?? ""),
                  },
                });
                setReference(result.reference);
              } catch {
                toast.error("We couldn't send that. Please try again.");
              } finally {
                setSending(false);
              }
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="name">
                  Your name *
                </label>
                <input id="name" name="name" required className={field} />
              </div>
              <div>
                <label className={labelCls} htmlFor="email">
                  Email *
                </label>
                <input id="email" name="email" type="email" required className={field} />
              </div>
              <div>
                <label className={labelCls} htmlFor="businessName">
                  Business
                </label>
                <input id="businessName" name="businessName" className={field} />
              </div>
              <div>
                <label className={labelCls} htmlFor="subject">
                  Subject
                </label>
                <input id="subject" name="subject" className={field} />
              </div>
            </div>
            <div>
              <label className={labelCls} htmlFor="message">
                Message *
              </label>
              <textarea id="message" name="message" rows={7} required className={field} />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}