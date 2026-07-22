import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SITE } from "@/lib/copy";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: `${SITE.founder} - ${SITE.role}`,
  description:
    "Product Manager freelance. J'aide les porteurs de projet à transformer une idée en projet qui tient debout, du pourquoi profond jusqu'au premier pas concret.",
  openGraph: {
    title: `${SITE.founder} - ${SITE.role}`,
    description:
      "Tu as une idée. Construisons le projet. J'accompagne les porteurs de projet, de la vision au lancement.",
    url: SITE.baseUrl,
    siteName: SITE.name,
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

// Données structurées (Google) : qui est Jan, quel service rend Inawa.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: SITE.founder,
      jobTitle: SITE.role,
      url: SITE.baseUrl,
      sameAs: [
        SITE.socials.linkedin,
        SITE.socials.github,
        SITE.socials.instagram,
      ],
    },
    {
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.baseUrl,
      description:
        "Accompagnement de porteurs de projet par un Product Manager freelance : clarifier la vision, structurer le projet, lancer.",
      founder: { "@type": "Person", name: SITE.founder },
      email: SITE.email,
      areaServed: "FR",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
