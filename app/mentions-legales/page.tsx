import type { Metadata } from "next";
import { SITE } from "@/lib/copy";
import { SiteHeader } from "../_components/site-header";
import { SiteFooter } from "../_components/site-footer";

export const metadata: Metadata = {
  title: `Mentions légales — ${SITE.name}`,
  robots: { index: false },
};

// Stub Lot 0 : contenu légal à compléter en Lot 1 (éditeur, SIRET, hébergeur Aïda, contact).
export default function MentionsLegales() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="font-display text-3xl font-semibold text-navy">
          Mentions légales
        </h1>
        <p className="mt-6 text-ink/80">
          Cette page sera complétée prochainement (éditeur du site, SIRET,
          hébergeur, contact, traitement des données).
        </p>
        <p className="mt-4 text-ink/80">
          Contact : {" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-terracotta hover:underline"
          >
            {SITE.email}
          </a>
        </p>
        <p className="mt-10">
          <a href="/" className="text-sm text-navy hover:text-terracotta">
            ← Retour à l&apos;accueil
          </a>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
