import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = Montserrat({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "unexpectedjourneymx.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: { default: "Unexpected Journey | Aventuras infinitas", template: "%s | Unexpected Journey" },
    description: "Campamentos nacionales e internacionales para jóvenes de 7 a 17 años. Experiencias de viaje transformadoras, seguras y memorables.",
    icons: { icon: "/brand-mark.png", shortcut: "/brand-mark.png" },
    openGraph: {
      title: "Unexpected Journey | Descubre tu mundo",
      description: "Campamentos nacionales e internacionales. Vive aventuras infinitas.",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Descubre tu mundo, vive aventuras infinitas" }],
      locale: "es_MX",
      type: "website",
    },
    twitter: { card: "summary_large_image", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${sans.variable} ${display.variable}`}>{children}</body></html>;
}
