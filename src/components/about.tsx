import { getCopy, type Locale } from "@/data/site"
import { Reveal } from "@/components/reveal"

export function About({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).about

  return (
    <section id="qualificacao" className="scroll-mt-24 px-5 py-24 md:py-32 md:pr-14 md:pl-28">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.2em] text-highlighter uppercase">
          {copy.kicker}
        </p>
        <div className="mt-6 grid gap-12 md:grid-cols-12">
          <h2 className="font-serif text-4xl leading-[0.95] font-normal tracking-[-0.03em] md:col-span-5 md:text-6xl">
            {copy.title}
          </h2>
          <div className="md:col-span-6 md:col-start-7">
            <div className="space-y-5 text-base leading-relaxed text-foreground/90">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-10 border-t border-border">
              {copy.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-1 border-b border-border py-4 md:grid-cols-[8rem_1fr] md:gap-6"
                >
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    {fact.label}
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-mono text-xs tracking-[0.04em] text-muted-foreground">
              {copy.awards}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
