import type { Metadata } from "next";
import { SITE } from "@/lib/copy";
import { SiteHeader } from "../_components/site-header";
import { SiteFooter } from "../_components/site-footer";

export const metadata: Metadata = {
  title: `Mentions légales - ${SITE.name}`,
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="font-display text-3xl font-semibold text-navy">
          Mentions légales
        </h1>

        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-navy">Éditeur</h2>
          <p className="mt-3 text-ink/85">
            Ce site est édité par {SITE.founder}, {SITE.role}.
            <br />
            Statut juridique, SIREN/SIRET et adresse : à compléter.
            <br />
            Contact :{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-terracotta hover:underline"
            >
              {SITE.email}
            </a>
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-navy">
            Directeur de la publication
          </h2>
          <p className="mt-3 text-ink/85">{SITE.founder}</p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-navy">Hébergement</h2>
          <p className="mt-3 text-ink/85">
            Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Allemagne.
            <br />
            Site :{" "}
            <a
              href="https://www.hetzner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta hover:underline"
            >
              hetzner.com
            </a>
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-navy">
            Propriété intellectuelle
          </h2>
          <p className="mt-3 text-ink/85">
            L'ensemble des contenus de ce site (textes, identité visuelle, code)
            est la propriété de {SITE.founder}, sauf mention contraire. Toute
            reproduction sans autorisation est interdite.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-navy">
            Données personnelles
          </h2>
          <p className="mt-3 text-ink/85">
            Les informations transmises via le formulaire de contact ou par email
            servent uniquement à répondre à ta demande et ne sont jamais cédées à
            des tiers. Tu peux demander leur suppression à tout moment en écrivant
            à{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-terracotta hover:underline"
            >
              {SITE.email}
            </a>
            .
          </p>
        </section>

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
