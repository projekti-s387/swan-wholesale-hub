import { getRequest } from "@tanstack/react-start/server";
import type { ApplicationInput, EnquiryInput, OrderInput } from "./wholesale.functions";

/** Persistence for wholesale submissions. Writes with the privileged client
 * because submissions are public and must never be readable from the browser. */

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Resolve the signed-in buyer, if the caller happens to have a session. */
async function currentUserId(): Promise<string | null> {
  try {
    const request = getRequest();
    const header = request?.headers?.get("authorization");
    if (!header?.startsWith("Bearer ")) return null;
    const token = header.slice(7);
    if (token.split(".").length !== 3) return null;
    const db = await admin();
    const { data, error } = await db.auth.getClaims(token);
    if (error || !data?.claims?.sub) return null;
    return data.claims.sub as string;
  } catch {
    return null;
  }
}

function makeRef(prefix: string) {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

export async function saveApplication(data: ApplicationInput) {
  const db = await admin();
  const reference = makeRef("APP");
  const { error } = await db.from("wholesale_applications").insert({
    reference,
    user_id: await currentUserId(),
    business_name: data.businessName,
    store_type: data.storeType,
    website: data.website,
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    resale_id: data.resaleId,
    lines_of_interest: data.linesOfInterest,
    message: data.message,
  });
  if (error) {
    console.error("[wholesale] application insert failed", error);
    throw new Error("Could not save application");
  }
  return { ok: true as const, reference };
}

export async function saveOrder(data: OrderInput) {
  const db = await admin();
  const reference = makeRef("ORD");
  const { error } = await db.from("wholesale_orders").insert({
    reference,
    user_id: await currentUserId(),
    business_name: data.businessName,
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    ship_to: data.shipTo,
    payment_preference: data.paymentPreference,
    po_number: data.poNumber,
    notes: data.notes,
    items: data.lines,
  });
  if (error) {
    console.error("[wholesale] order insert failed", error);
    throw new Error("Could not save order");
  }
  return { ok: true as const, reference };
}

export async function saveEnquiry(data: EnquiryInput) {
  const db = await admin();
  const reference = makeRef("MSG");
  const { error } = await db.from("wholesale_enquiries").insert({
    reference,
    name: data.name,
    email: data.email,
    business_name: data.businessName,
    subject: data.subject,
    message: data.message,
  });
  if (error) {
    console.error("[wholesale] enquiry insert failed", error);
    throw new Error("Could not save message");
  }
  return { ok: true as const, reference };
}