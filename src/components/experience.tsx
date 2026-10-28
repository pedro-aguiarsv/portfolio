import { getCopy, type Locale } from "@/data/site"
import { Section } from "@/components/section"

export function Experience({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).experience

  return (
    <Section id="experience" kicker={copy.kicker} title={copy.title} lead={copy.lead}>
      <ol className="divide-y divide-border border-y border-border">
        {copy.jobs.map((job) => (
          <li key={job.org} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                {job.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.01em]">{job.org}</h3>
              <p className="mt-1 text-muted-foreground">{job.role}</p>
            </div>
            <div className="md:col-span-8">
              {job.path && (
                <p className="mb-3 text-sm font-medium text-highlighter">{job.path}</p>
              )}
              <ul className="space-y-2 leading-relaxed">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-highlighter" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
