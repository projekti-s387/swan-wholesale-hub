import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const applicationSchema = z.object({
  businessName: z.string().min(1).max(200),
  storeType: z.string().min(1).max(100),
  website: z.string().max(300).optional().default(""),
  contactName: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(60).optional().default(""),
  address: z.string().max(400).optional().default(""),
  resaleId: z.string().max(100).optional().default(""),
  linesOfInterest: z.array(z.string().max(50)).default([]),
  message: z.string().max(2000).optional().default(""),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { saveApplication } = await import("./wholesale.server");
    return saveApplication(data);
  });

const orderSchema = z.object({
  businessName: z.string().min(1).max(200),
  contactName: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(60).optional().default(""),
  shipTo: z.string().max(400).optional().default(""),
  paymentPreference: z.enum(["invoice", "card"]),
  poNumber: z.string().max(100).optional().default(""),
  notes: z.string().max(2000).optional().default(""),
  lines: z
    .array(z.object({ slug: z.string().max(100), cases: z.number().int().min(1).max(999) }))
    .min(1),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { saveOrder } = await import("./wholesale.server");
    return saveOrder(data);
  });

const enquirySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  businessName: z.string().max(200).optional().default(""),
  subject: z.string().max(200).optional().default(""),
  message: z.string().min(1).max(2000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { saveEnquiry } = await import("./wholesale.server");
    return saveEnquiry(data);
  });