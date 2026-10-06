export const SITE_URL = "https://wholesale.swanapothecary.com";
export const SHARE_IMAGE_URL = `${SITE_URL}/og-image.jpg`;

export function socialMeta(title: string, description: string) {
  return [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:image", content: SHARE_IMAGE_URL },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Swan Apothecary wholesale botanical care collection" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SHARE_IMAGE_URL },
  ];
}