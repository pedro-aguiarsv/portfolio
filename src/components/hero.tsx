import { getCopy, profile, type Locale } from "@/data/site"
import { HeroField } from "@/components/hero-field"

function Reactor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-14 opacity-35 md:opacity-100 -right-[34%] z-0 size-[88vw] max-w-[460px] md:top-1/2 md:-right-[4%] md:size-[min(76vh,720px)] md:max-w-none md:-translate-y-1/2"
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

const buttonBase =
  "inline-flex min-h-12 items-center justify-center px-5 text-sm font-medium transition-[background-color,border-color,transform] duration-150 active:translate-y-px"

export function Hero({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).hero

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-24 pb-14"
    >
      <HeroField />
      <Reactor />
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 sm:px-8">
        <p className="inline-flex items-start gap-2 border border-highlighter/40 bg-background/70 px-3 py-2 font-mono text-xs leading-snug tracking-[0.04em] text-foreground">
          <span aria-hidden="true" className="hud-live mt-1 size-2 shrink-0 rounded-full bg-highlighter" />
          {copy.status}
        </p>
        <h1 className="mt-8 text-[clamp(3.25rem,13vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
          Pedro
          <br />
          Aguiar
        </h1>
        <p className="mt-8 max-w-2xl text-2xl leading-snug font-medium tracking-[-0.02em] md:text-4xl">
          {copy.lead}
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {copy.support}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className={`${buttonBase} bg-primary text-primary-foreground hover:bg-[#8aeeff]`}
          >
            {copy.projects}
          </a>
          <a
            href={profile.cv.pt}
            download
            className={`${buttonBase} border border-foreground/40 hover:border-highlighter hover:text-highlighter`}
          >
            {copy.cvPt}
          </a>
          <a
            href={profile.cv.en}
            download
            className={`${buttonBase} border border-foreground/40 hover:border-highlighter hover:text-highlighter`}
          >
            {copy.cvEn}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className={`${buttonBase} border border-foreground/40 hover:border-highlighter hover:text-highlighter`}
          >
            {copy.linkedin} ↗
          </a>
        </div>
      </div>
    </section>
  )
}
