import { SITE, LANDING } from "@/lib/copy";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-navy"
        >
          {SITE.name}
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {LANDING.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink/80 transition-colors hover:text-terracotta"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-navy-deep"
        >
          Échanger
        </a>
      </div>
    </header>
  );
}
