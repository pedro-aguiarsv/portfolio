import { getCopy, type Locale } from "@/data/site"
import { HeroField } from "@/components/hero-field"
import { Button } from "@/components/ui/button"

function Crop({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`absolute size-4 border-highlighter/70 ${className}`} />
  )
}

function Reactor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-14 -right-[34%] z-0 size-[88vw] max-w-[460px] md:top-1/2 md:-right-[4%] md:size-[min(76vh,720px)] md:max-w-none md:-translate-y-1/2"
    >
      <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgb(126_231_255/0.16),transparent_68%)]" />
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <circle cx="200" cy="200" r="188" fill="none" stroke="rgb(126 231 255 / 0.2)" strokeWidth="1" />
        <g className="hud-spin">
          <circle
            cx="200"
            cy="200"
            r="164"
            fill="none"
            stroke="rgb(126 231 255 / 0.72)"
            strokeWidth="1.25"
            strokeDasharray="48 18 12 140"
          />
          <circle
            cx="200"
            cy="200"
            r="164"
            fill="none"
            stroke="rgb(226 177 90 / 0.85)"
            strokeWidth="2"
            strokeDasharray="10 340"
          />
        </g>
        <g className="hud-spin-rev">
          <circle
            cx="200"
            cy="200"
            r="126"
            fill="none"
            stroke="rgb(126 231 255 / 0.4)"
            strokeWidth="1"
            strokeDasharray="2 9"
          />
        </g>
        <circle cx="200" cy="200" r="78" fill="none" stroke="rgb(126 231 255 / 0.28)" strokeWidth="1" />
        <circle cx="200" cy="200" r="5" fill="rgb(126 231 255 / 0.95)" />
        <path
          d="M200 22 V48 M200 352 V378 M22 200 H48 M352 200 H378"
          stroke="rgb(126 231 255 / 0.5)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

export function Hero({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <section
      id="impressao"
      className="relative flex min-h-[100svh] w-full max-w-full min-w-0 flex-col overflow-hidden px-5 pt-24 pb-16 md:pr-14 md:pl-64"
    >
      <HeroField />
      <Reactor />
      <Crop className="top-20 left-5 z-10 border-t border-l md:left-64" />
      <Crop className="top-20 right-5 z-10 border-t border-r md:right-14" />
      <Crop className="bottom-6 left-5 z-10 border-b border-l md:left-64" />
      <Crop className="right-5 bottom-6 z-10 border-r border-b md:right-14" />

      <p className="relative z-10 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        {copy.hero.kicker}
      </p>
      <h1 className="relative z-10 mt-6 h-[1.9em] max-w-full overflow-hidden font-serif text-[clamp(3.15rem,14.5vw,11.5rem)] leading-[0.85] font-normal tracking-[-0.045em]">
        Pedro
        <br />
        Aguiar
      </h1>
      <div className="relative z-10 mt-auto grid w-full min-w-0 items-end gap-8 pt-16 md:grid-cols-12">
        <p className="min-w-0 max-w-full font-serif text-[1.65rem] leading-[1.15] italic sm:text-3xl md:col-span-6 md:text-[2.6rem]">
          {copy.hero.lead}
        </p>
        <div className="flex min-w-0 flex-col gap-6 md:col-span-5 md:col-start-8">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            {copy.hero.support}
          </p>
          <div className="flex min-h-12 flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              asChild
              className="h-12 rounded-none px-5 font-mono text-xs tracking-[0.14em] uppercase shadow-[0_0_24px_rgb(126_231_255/0.28)] hover:bg-[#bff4ff]"
            >
              <a href="#conversao">{copy.cta}</a>
            </Button>
            <a
              href="#prova"
              className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase underline decoration-border underline-offset-4 hover:text-foreground"
            >
              {copy.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
