import { getCopy, type Locale } from "@/data/site"
import { Reveal } from "@/components/reveal"

export function Experience({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).experience

  return (
    <section id="objecao" className="scroll-mt-24 px-5 py-24 md:py-32 md:pr-14 md:pl-64">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.2em] text-highlighter uppercase">
          {copy.kicker}
        </p>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[0.95] font-normal tracking-[-0.03em] md:text-6xl">
          {copy.title}
        </h2>
        <p className="mt-5 max-w-2xl text-muted-foreground">{copy.lead}</p>
      </Reveal>

      <div className="mt-16 space-y-16">
        {copy.groups.map((group) => (
          <Reveal key={group.org}>
            <section aria-labelledby={group.org.replace(/\s+/g, "-")}>
              <h3
                id={group.org.replace(/\s+/g, "-")}
                className="font-mono text-xs tracking-[0.18em] uppercase"
              >
                {group.org}
                {group.note ? <span className="text-muted-foreground"> · {group.note}</span> : null}
              </h3>
              <ol className="mt-6">
                {group.roles.map((role) => (
                  <li
                    key={role.title}
                    className={`border-t py-6 ${
                      role.current ? "border-highlighter border-l-4 pl-5" : "border-border"
                    }`}
                  >
                    <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                      {role.period}
                    </p>
                    <p className={`mt-2 font-serif tracking-[-0.03em] ${role.current ? "text-4xl md:text-5xl" : "text-2xl"}`}>
                      {role.title}
                    </p>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {role.summary}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
