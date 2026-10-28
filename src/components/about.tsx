import { getCopy, type Locale } from "@/data/site"
import { Section } from "@/components/section"

export function About({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).about

  return (
    <Section id="about" kicker={copy.kicker} title={copy.title}>
      <div className="grid items-start gap-10 md:grid-cols-[16rem_1fr] md:gap-14">
        <img
          src="/pedro-aguiar.jpg"
          alt={copy.photoAlt}
          width={256}
          height={320}
          className="aspect-[4/5] w-full max-w-[16rem] object-cover object-[center_18%] ring-1 ring-border"
        />
        <div>
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
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
                <dt className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  {fact.label}
                </dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">{copy.awards}</p>
        </div>
      </div>
    </Section>
  )
}
