import { getCopy, type Locale } from "@/data/site"
import { Reveal } from "@/components/reveal"

export function About({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).about

  return (
    <section id="qualificacao">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.2em] text-highlighter uppercase">
          {copy.kicker}
        </p>
        <div className="mt-6 grid items-start gap-10 md:grid-cols-[minmax(0,16rem)_1fr]">
          <img
            src="/pedro-aguiar.jpg"
            alt="Pedro Aguiar"
            className="aspect-[4/5] w-full max-w-[16rem] object-cover object-[center_18%] shadow-[0_0_32px_rgb(60_224_255/0.18)] ring-1 ring-highlighter/55"
          />
          <div>
            <h2 className="font-serif text-4xl leading-[0.95] font-normal tracking-[-0.03em] md:text-6xl">
              {copy.title}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90">
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
