import { SITE, LANDING } from "@/lib/copy";
import { SiteHeader } from "./_components/site-header";
import { SiteFooter } from "./_components/site-footer";
import { ContactForm } from "./_components/contact-form";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 0%, #ffffff 0%, var(--color-cream) 45%, var(--color-sand) 100%)",
          }}
        >
          <div className="mx-auto max-w-3xl px-6 pb-24 pt-20 text-center md:pt-28">
            <p className="inline-block rounded-full border border-border bg-cream/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {LANDING.hero.eyebrow}
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-navy md:text-6xl">
              {LANDING.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/80">
              {LANDING.hero.lead}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted">
              {LANDING.hero.sub}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-full bg-terracotta px-7 py-3.5 text-base font-medium text-cream shadow-sm transition-all hover:bg-terracotta-deep hover:shadow-md sm:w-auto"
              >
                {LANDING.hero.ctaPrimary}
              </a>
              <a
                href="#contact"
                className="w-full rounded-full border border-navy/25 px-7 py-3.5 text-base font-medium text-navy transition-colors hover:bg-navy hover:text-cream sm:w-auto"
              >
                {LANDING.hero.ctaSecondary}
              </a>
            </div>
            <p className="mt-5 text-sm text-muted">{LANDING.hero.note}</p>
          </div>
        </section>

        {/* POUR QUI + PROMESSE */}
        <section className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-cream p-8">
              <h2 className="font-display text-2xl font-semibold text-navy">
                {LANDING.pourQui.title}
              </h2>
              <p className="mt-4 text-ink/85">{LANDING.pourQui.body}</p>
            </div>
            <div className="rounded-2xl border border-border bg-cream p-8">
              <h2 className="font-display text-2xl font-semibold text-navy">
                {LANDING.promesse.title}
              </h2>
              <p className="mt-4 text-ink/85">{LANDING.promesse.body}</p>
              <p className="mt-5 font-display text-lg font-medium text-terracotta">
                {LANDING.promesse.quote}
              </p>
            </div>
          </div>
        </section>

        {/* METHODE - la descente top-down */}
        <section id="methode" className="scroll-mt-24 bg-sand">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
            <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
              {LANDING.methode.title}
            </h2>
            <p className="mt-4 text-ink/80">{LANDING.methode.intro}</p>
            <ol className="mt-10 space-y-0 border-l-2 border-terracotta/30">
              {LANDING.methode.strates.map((strate) => (
                <li key={strate.num} className="relative pb-8 pl-8 last:pb-0">
                  <span className="absolute -left-[0.95rem] flex h-7 w-7 items-center justify-center rounded-full bg-terracotta text-xs font-semibold text-cream">
                    {strate.num}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-navy">
                    {strate.name}
                  </h3>
                  <p className="mt-1 text-ink/80">{strate.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* LES BONNES QUESTIONS */}
        <section id="questions" className="scroll-mt-24">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
            <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
              {LANDING.questions.title}
            </h2>
            <p className="mt-4 text-ink/80">{LANDING.questions.intro}</p>
            <ul className="mt-8 space-y-4">
              {LANDING.questions.items.map((q, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-xl border border-border bg-cream p-5"
                >
                  <span className="font-display text-lg font-semibold text-ocre">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink/85">{q}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-xl font-medium text-navy">
              {LANDING.questions.closing}
            </p>
          </div>
        </section>

        {/* TEMOIGNAGES (placeholders) */}
        <section className="bg-navy text-cream">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                {LANDING.temoignages.title}
              </h2>
              <span className="rounded-full border border-cream/30 px-3 py-1 text-xs text-cream/70">
                {LANDING.temoignages.note}
              </span>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {LANDING.temoignages.items.map((t, i) => (
                <figure
                  key={i}
                  className="rounded-2xl border border-cream/15 bg-cream/5 p-6"
                >
                  <blockquote className="text-cream/85">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold">{t.author}</span>
                    <span className="text-cream/60"> - {t.context}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* REALISATIONS */}
        <section id="realisations" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
              {LANDING.realisations.title}
            </h2>
            <p className="mt-4 max-w-2xl text-ink/80">
              {LANDING.realisations.intro}
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {LANDING.realisations.items.map((p) => (
                <div
                  key={p.name}
                  className="flex gap-5 rounded-2xl border border-border bg-cream p-6 transition-shadow hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.icon}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-semibold text-navy">
                        {p.name}
                      </h3>
                      <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs text-muted">
                        {p.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink/80">{p.body}</p>
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-terracotta hover:underline"
                      >
                        Voir le projet →
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24 bg-sand">
          <div className="mx-auto max-w-2xl px-6 py-20 md:py-24">
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
                {LANDING.contact.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink/80">
                {LANDING.contact.body}
              </p>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-terracotta px-8 py-4 text-base font-medium text-cream shadow-sm transition-all hover:bg-terracotta-deep hover:shadow-md"
              >
                {LANDING.contact.ctaCalendly}
              </a>
              <p className="mt-8 text-sm text-muted">{LANDING.contact.formIntro}</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
