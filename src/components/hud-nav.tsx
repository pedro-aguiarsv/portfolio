import { locales, type Locale } from "@/data/site"

export function HudNav({ locale }: { locale: Locale }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="relative flex h-14 items-center justify-between gap-3 px-5 sm:px-7">
        <a href="#impressao" className="pointer-events-auto flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase">
          <span className="hud-live size-1.5 rounded-full bg-highlighter shadow-[0_0_10px_#3ce0ff]" />
          Pedro Aguiar
        </a>
        <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.22em] text-highlighter uppercase sm:text-[11px] sm:tracking-[0.28em]">
          {locale === "pt" ? "Núcleo" : "Core"}
        </p>
        <div className="pointer-events-auto font-mono text-[11px] tracking-[0.18em] uppercase">
          {locales.map((item, index) => (
            <span key={item}>
              {index > 0 && <span className="text-muted-foreground"> / </span>}
              <a
                href={`/${item}`}
                hrefLang={item === "pt" ? "pt-BR" : "en"}
                aria-current={item === locale ? "page" : undefined}
                className={item === locale ? "text-highlighter" : "text-muted-foreground hover:text-foreground"}
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
