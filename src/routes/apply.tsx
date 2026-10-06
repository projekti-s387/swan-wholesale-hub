import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitApplication } from "@/lib/wholesale.functions";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply for a wholesale account — Swan Apothecary" },
      {
        name: "description",
        content:
          "Open a Swan Apothecary trade account. Tell us about your store and we come back with pricing and a suggested opening order within two business days.",
      },
      ...socialMeta(
        "Apply for a wholesale account — Swan Apothecary",
        "Open a Swan Apothecary trade account. Tell us about your store and we come back within two business days.",
      ),
    ],
  }),
  component: Apply,
});

const storeTypes = [
  "Independent retail / boutique",
  "Pharmacy or health store",
  "Spa, salon or wellness studio",
  "Clinic or practitioner",
  "Gym, studio or recovery centre",
  "Pet store or groomer",
  "Veterinary practice",
  "Online retailer",
  "Distributor",
  "Other",
];

const field =
  "mt-1.5 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
const labelCls = "eyebrow text-muted-foreground";

function Apply() {
  const send = useServerFn(submitApplication);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  if (reference) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <CheckCircle2 className="mx-auto size-12 text-brass" />
        <h1 className="mt-6 text-4xl">Application received.</h1>
        <p className="mt-4 text-muted-foreground">
          Your reference is <span className="font-semibold text-foreground">{reference}</span>. The
          wholesale team will be in touch within two business days with pricing and a suggested
          opening order for your store.
        </p>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-border bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow text-brass-foreground/70">Open an account</p>
          <h1 className="mt-3 max-w-2xl text-5xl">Apply for a wholesale account.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            A few details about your store is all we need. We reply within two business days with
            confirmed pricing, lead times and a suggested opening order.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <form
          className="space-y-6 rounded-lg border border-border bg-card p-7"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setSending(true);
            try {
              const result = await send({
                data: {
                  businessName: String(fd.get("businessName") ?? ""),
                  storeType: String(fd.get("storeType") ?? ""),
                  website: String(fd.get("website") ?? ""),
                  contactName: String(fd.get("contactName") ?? ""),
                  email: String(fd.get("email") ?? ""),
                  phone: String(fd.get("phone") ?? ""),
                  address: String(fd.get("address") ?? ""),
                  resaleId: String(fd.get("resaleId") ?? ""),
                  linesOfInterest: fd.getAll("lines").map(String),
                  message: String(fd.get("message") ?? ""),
                },
              });
              setReference(result.reference);
            } catch {
              toast.error("We couldn't send that. Please check the form and try again.");
            } finally {
              setSending(false);
            }
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="businessName">
                Business name *
              </label>
              <input id="businessName" name="businessName" required className={field} />
            </div>

            <div>
              <label className={labelCls} htmlFor="storeType">
                Type of business *
              </label>
              <select id="storeType" name="storeType" required defaultValue="" className={field}>
                <option value="" disabled>
                  Select…
                </option>
                {storeTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls} htmlFor="website">
                Website or social
              </label>
              <input id="website" name="website" className={field} />
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
              <label className={labelCls} htmlFor="resaleId">
                Resale / tax ID
              </label>
              <input id="resaleId" name="resaleId" className={field} />
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="address">
                Store address
              </label>
              <input id="address" name="address" className={field} />
            </div>
          </div>

          <fieldset>
            <legend className={labelCls}>Lines you are interested in</legend>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {[
                { value: "topicals", label: "FireKitty & topicals" },
                { value: "pet", label: "Happy Pet" },
                { value: "both", label: "The full range" },
              ].map((o) => (
                <label key={o.value} className="flex items-center gap-2">
                  <input type="checkbox" name="lines" value={o.value} className="size-4" />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className={labelCls} htmlFor="message">
              Anything else we should know?
            </label>
            <textarea id="message" name="message" rows={4} className={field} />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Submit application"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            We only use these details to set up your trade account.
          </p>
        </form>
      </section>
    </div>
  );
}