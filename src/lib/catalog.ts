export type Line = "topicals" | "pet";

export type Product = {
  slug: string;
  name: string;
  line: Line;
  /** Short size / format descriptor shown on cards. */
  format: string;
  image: string;
  /** Current retail price on swanapothecary.com, in USD. */
  msrp: number | null;
  msrpNote?: string;
  /** Wholesale unit price. null = still to be confirmed by Swan. */
  wholesale: number | null;
  /** Units per case. null = to be confirmed. */
  casePack: number | null;
  status: "available" | "confirming" | "coming-soon";
  statusNote?: string;
  tagline: string;
  description: string;
  /** Why it earns its place on a shelf. */
  sellingPoints: string[];
  shelf: {
    packaging: string;
    shelfLife: string;
    storage: string;
  };
  /** Ingredient summary — confirm against current batch labels before print. */
  ingredients: string;
};

export const PRICING_CONFIRMED = true;

export const TERMS = {
  openingOrder: null as number | null,
  reorderMinimum: null as number | null,
  leadTimeNew: null as string | null,
  leadTimeReorder: null as string | null,
  paymentTerms: null as string | null,
  freeFreightAt: null as number | null,
};

export const products: Product[] = [
  {
    slug: "fire-kitty-oil",
    name: "Fire Kitty Oil",
    line: "topicals",
    format: "Infused body oil · multiple sizes",
    image: "/products/firekitty-oil.png",
    msrp: 34.95,
    msrpNote: "$34.95 – $104.95 depending on size",
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "The original warming oil that built the FireKitty following.",
    description:
      "A warming, botanically infused body oil applied directly to sore muscles and stiff joints. It is the product customers come back for and the one that introduces most buyers to the FireKitty line.",
    sellingPoints: [
      "Highest repeat-purchase rate in the topical range",
      "Offered in several sizes, so it works as both a trial item and a hero SKU",
      "Recognised by name — customers ask for FireKitty specifically",
    ],
    shelf: {
      packaging: "Glass bottle with label — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical infusion in a carrier oil base — full list to confirm.",
  },
  {
    slug: "firekitty-infused-salve",
    name: "FireKitty Infused Salve",
    line: "topicals",
    format: "Infused salve · full size",
    image: "/products/firekitty-salve.png",
    msrp: 249.5,
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "The full-strength salve — the premium anchor of the range.",
    description:
      "A rich, concentrated salve for targeted relief. This is the highest-ticket topical in the line and sets the quality reference point for everything around it on the shelf.",
    sellingPoints: [
      "Highest unit value in the topical range",
      "Anchors the price ladder and makes the 0.5 oz feel like an easy first purchase",
      "Suits clinics, wellness practices and premium retail",
    ],
    shelf: {
      packaging: "Wide-mouth jar with label — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical infusion in a butter and wax base — full list to confirm.",
  },
  {
    slug: "firekitty-infused-salve-05oz",
    name: "FireKitty Infused Salve 0.5 oz",
    line: "topicals",
    format: "Infused salve · 0.5 oz",
    image: "/products/firekitty-salve-05.png",
    msrp: 49.99,
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "The trial size that turns browsers into regulars.",
    description:
      "The same salve in a purse-sized 0.5 oz tin. Priced as an approachable entry point, it is the item to put at the counter and the one that leads customers up to the full-size jar.",
    sellingPoints: [
      "Impulse price point — ideal for counter and gift placement",
      "Direct upgrade path to the full-size salve",
      "Small footprint, high units per linear foot",
    ],
    shelf: {
      packaging: "0.5 oz tin — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical infusion in a butter and wax base — full list to confirm.",
  },
  {
    slug: "firekitty-oil-3oz-roll-on",
    name: "FireKitty Oil 3oz Roll-On",
    line: "topicals",
    format: "Roll-on applicator · 3 oz",
    image: "/products/firekitty-rollon.png",
    msrp: 74.94,
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "Mess-free application — the easiest topical to demo in store.",
    description:
      "FireKitty Oil in a 3 oz roll-on. The applicator removes the main objection to oils on a shelf: customers can try it cleanly, and it travels in a bag without leaking.",
    sellingPoints: [
      "Demonstrable at the counter without mess",
      "Travel-friendly format that sells well alongside the full-size oil",
      "Newest format in the line — good reason for existing stockists to reorder",
    ],
    shelf: {
      packaging: "3 oz roll-on bottle — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical infusion in a carrier oil base — full list to confirm.",
  },
  {
    slug: "muscle-balm",
    name: "Muscle Balm",
    line: "topicals",
    format: "Balm · jar",
    image: "/products/muscle-balm.png",
    msrp: 74.95,
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "The everyday recovery balm for active customers.",
    description:
      "A firmer balm formulated for muscle recovery after exertion. It sells outside the wellness aisle too — gyms, studios, physio practices and sports retail all move this one.",
    sellingPoints: [
      "Broadest customer appeal in the range — no wellness knowledge needed to buy it",
      "Strong fit for gyms, studios and recovery clinics",
      "Mid price point that sits comfortably between the 0.5 oz and full salve",
    ],
    shelf: {
      packaging: "Jar with label — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical infusion in a butter and wax base — full list to confirm.",
  },
  {
    slug: "transdermal-patch",
    name: "Transdermal Patch",
    line: "topicals",
    format: "Patch",
    image: "/products/transdermal-patch.png",
    msrp: 104.95,
    wholesale: null,
    casePack: null,
    status: "confirming",
    statusNote: "Wholesale availability being confirmed with Robin.",
    tagline: "Long-wear, targeted, and unlike anything else on the shelf.",
    description:
      "A transdermal patch for extended, targeted application. It gives a retailer something genuinely differentiated to talk about and suits customers who want to apply once and forget it.",
    sellingPoints: [
      "Format no competing brand on the shelf is likely to carry",
      "Long-wear appeal for customers who dislike reapplying",
      "Compact packaging — very little shelf space per unit",
    ],
    shelf: {
      packaging: "Sealed pouch — count per pack to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "To confirm.",
  },
  {
    slug: "happy-pet-essential-infusion",
    name: "Happy Pet Essential Infusion",
    line: "pet",
    format: "Oral infusion · multiple sizes",
    image: "/products/happy-pet-essential.png",
    msrp: 69.99,
    msrpNote: "$69.99 – $159.00 depending on size",
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "The cornerstone of the Happy Pet line.",
    description:
      "The everyday infusion for dogs and cats, offered in more than one size so a store can carry a trial size and a value size side by side.",
    sellingPoints: [
      "Consumable — drives a predictable reorder cycle",
      "Two price points from one SKU family",
      "Natural companion sale to any topical purchase for the owner",
    ],
    shelf: {
      packaging: "Dropper bottle with carton — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical infusion in a carrier oil base — full list to confirm.",
  },
  {
    slug: "happy-pet-topical-butter",
    name: "Happy Pet Topical Butter",
    line: "pet",
    format: "Topical butter · jar",
    image: "/products/happy-pet-butter.png",
    msrp: 194.0,
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "For paws, noses and dry patches — the topical side of Happy Pet.",
    description:
      "A rich botanical butter for external use on pets. It rounds out the Happy Pet offer so a store can sell both the internal and the external side of the routine.",
    sellingPoints: [
      "Pairs directly with the Essential Infusion for a two-item basket",
      "Premium unit value within the pet category",
      "Visible, tactile product — demos easily on a counter",
    ],
    shelf: {
      packaging: "Jar with label — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical butter base — full list to confirm.",
  },
  {
    slug: "happy-pet-trio-infusion-2oz",
    name: "Happy Pet Trio Infusion 2oz",
    line: "pet",
    format: "Set of three · 2 oz each",
    image: "/products/happy-pet-trio.png",
    msrp: 149.99,
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "Three infusions in one ready-made gift.",
    description:
      "A trio of 2 oz infusions packaged together. It sells as a gift without any merchandising work from the retailer, which makes it a strong fourth-quarter item.",
    sellingPoints: [
      "Gift-ready out of the case — no bundling labour in store",
      "Raises average basket size against single bottles",
      "Seasonal upside around the holidays",
    ],
    shelf: {
      packaging: "Three 2 oz bottles in a set — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical infusions in a carrier oil base — full list to confirm.",
  },
  {
    slug: "nose-to-tail",
    name: "Nose to Tail: Complete Wellness in a Box",
    line: "pet",
    format: "Curated box set",
    image: "/products/nose-to-tail.png",
    msrp: 309.94,
    msrpNote: "Currently shown against a $460.00 component value",
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "The complete Happy Pet routine in one box.",
    description:
      "A curated box bringing the Happy Pet range together as a single purchase. It is the highest-ticket item in the pet category and the clearest statement piece for a store display.",
    sellingPoints: [
      "Highest ticket in the pet line — one sale moves real revenue",
      "Built-in value story against buying the components separately",
      "Display piece that draws customers to the rest of the range",
    ],
    shelf: {
      packaging: "Printed box set — contents and dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Per component product — full list to confirm.",
  },
  {
    slug: "topical-infused-botanical-butter-05oz",
    name: "Topical Infused Botanical Butter 0.5 oz",
    line: "pet",
    format: "Topical butter · 0.5 oz",
    image: "/products/botanical-butter-05.png",
    msrp: 39.99,
    wholesale: null,
    casePack: null,
    status: "available",
    tagline: "Small-format butter at an easy first-purchase price.",
    description:
      "The botanical butter in a 0.5 oz size. A low-commitment way for a customer to try the line, and an easy add-on at the register.",
    sellingPoints: [
      "Entry price point into the Happy Pet range",
      "Counter and add-on placement",
      "Leads directly to the full-size Topical Butter",
    ],
    shelf: {
      packaging: "0.5 oz tin — full dimensions to confirm",
      shelfLife: "To confirm",
      storage: "Cool, dry, out of direct sunlight",
    },
    ingredients: "Botanical butter base — full list to confirm.",
  },
  {
    slug: "better-body-butter",
    name: "Better Body Butter",
    line: "topicals",
    format: "Body butter · size to confirm",
    image: "",
    msrp: null,
    wholesale: null,
    casePack: null,
    status: "coming-soon",
    statusNote: "Launch date, final details and photography pending from Robin.",
    tagline: "The next addition to the Swan topical range.",
    description:
      "A new body butter joining the topical line. Final size, packaging, ingredients and photography are still being finalised — this page goes live with full details as soon as they are confirmed.",
    sellingPoints: [
      "New launch — first-mover advantage for early stockists",
      "Extends the topical range beyond targeted relief into daily care",
    ],
    shelf: {
      packaging: "To confirm",
      shelfLife: "To confirm",
      storage: "To confirm",
    },
    ingredients: "To confirm.",
  },
];

/** Wholesale is exactly 50% of suggested retail (confirmed by Swan). */
export const WHOLESALE_RATE = 0.5;
for (const p of products) {
  if (p.msrp != null) p.wholesale = Math.round(p.msrp * WHOLESALE_RATE * 100) / 100;
}

export const lineLabel: Record<Line, string> = {
  topicals: "Topicals",
  pet: "Pet",
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatUsd(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

/** Retailer margin in percent, or null when wholesale is not yet set. */
export function marginPct(p: Product) {
  if (p.wholesale == null || p.msrp == null || p.msrp === 0) return null;
  return Math.round(((p.msrp - p.wholesale) / p.msrp) * 100);
}