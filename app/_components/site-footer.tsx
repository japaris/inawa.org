import { SITE, LANDING } from "@/lib/copy";

export function SiteFooter() {
  // Année figée pour éviter tout décalage d'hydratation ; à rendre dynamique plus tard.
  const year = 2026;

  return (
    <footer className="border-t border-border bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <p className="font-display text-lg text-navy">{LANDING.footer.values}</p>
        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted">
          <a
            href={SITE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-terracotta"
          >
            LinkedIn
          </a>
          <a
            href={SITE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-terracotta"
          >
            GitHub
          </a>
          <a
            href={SITE.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-terracotta"
          >
            Instagram
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-terracotta"
          >
            {SITE.email}
          </a>
        </nav>
        <p className="mt-8 text-sm text-muted">
          © {year} {SITE.name} — {LANDING.footer.rights}
          {" · "}
          <a
            href="/mentions-legales"
            className="underline-offset-2 hover:text-terracotta hover:underline"
          >
            {LANDING.footer.legal}
          </a>
        </p>
      </div>
    </footer>
  );
}
