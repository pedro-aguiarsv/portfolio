import { getCopy, locales, type Locale } from "@/data/site"

const sections = ["projects", "experience", "skills", "about", "contact"] as const

export function SiteNav({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="flex min-h-11 items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-highlighter" />
          Pedro Aguiar
        </a>
        <nav aria-label={copy.navLabel} className="hidden items-center gap-1 lg:flex">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex min-h-11 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {copy.nav[id]}
            </a>
          ))}
        </nav>
        <div className="flex items-center font-mono text-xs tracking-[0.16em] uppercase">
          {locales.map((item, index) => (
            <span key={item} className="flex items-center">
              {index > 0 && (
                <span aria-hidden="true" className="text-muted-foreground">
                  /
                </span>
              )}
              <a
                href={`/${item}`}
                hrefLang={item === "pt" ? "pt-BR" : "en"}
                aria-current={item === locale ? "page" : undefined}
                className={`flex min-h-11 min-w-11 items-center justify-center ${
                  item === locale ? "text-highlighter" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </a>
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
