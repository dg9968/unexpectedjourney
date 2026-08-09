import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "unexpectedjourneymx.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: { default: "Unexpected Journey | Campamentos que abren el mundo", template: "%s | Unexpected Journey" },
    description: "Campamentos nacionales e internacionales para niños y jóvenes de 7 a 17 años, con acompañamiento profesional de principio a fin.",
    icons: { icon: "/logo.webp", shortcut: "/logo.webp" },
    openGraph: {
      title: "Unexpected Journey | Campamentos que abren el mundo",
      description: "Experiencias seguras y formativas para estudiantes de 7 a 17 años.",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Unexpected Journey — Campamentos que abren el mundo" }],
      locale: "es_MX",
      type: "website",
    },
    twitter: { card: "summary_large_image", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${sans.variable} ${display.variable}`}>{children}</body></html>;
}
