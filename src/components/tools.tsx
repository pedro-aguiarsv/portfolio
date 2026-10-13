import { getCopy, type Locale } from "@/data/site"
import { Reveal } from "@/components/reveal"

export function Tools({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).tools

  return (
    <section id="ferramentas" className="scroll-mt-24 border-y border-border px-5 py-16 md:pr-14 md:pl-28">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          {copy.kicker}
        </p>
        <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight font-normal md:text-5xl">
          {copy.title}
        </h2>
        <dl className="mt-10 grid gap-8 md:grid-cols-4">
          {copy.groups.map((group) => (
            <div key={group.label}>
              <dt className="font-mono text-[11px] tracking-[0.16em] text-highlighter uppercase">
                {group.label}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-foreground/90">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
