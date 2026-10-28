import { getCopy, type Locale } from "@/data/site"
import { Section } from "@/components/section"

export function Projects({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).projects

  return (
    <Section id="projects" kicker={copy.kicker} title={copy.title} lead={copy.lead}>
      <ol className="grid gap-5 lg:grid-cols-2">
        {copy.items.map((project, index) => (
          <li key={project.name}>
            <article className="group flex h-full flex-col border border-border bg-card p-6 transition-colors duration-200 hover:border-highlighter/60 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  className={`border px-2 py-1 font-mono text-xs tracking-[0.08em] uppercase ${
                    project.mvp
                      ? "border-amber-300/60 text-amber-300"
                      : "border-highlighter/50 text-highlighter"
                  }`}
                >
                  {project.status}
                </p>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                {project.name}
              </h3>
              <dl className="mt-6 space-y-5 text-base leading-relaxed">
                <div>
                  <dt className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {copy.problem}
                  </dt>
                  <dd className="mt-1">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {copy.built}
                  </dt>
                  <dd className="mt-1">{project.built}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {copy.stack}
                  </dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <li
                          key={item}
                          className="bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-6">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex min-h-11 items-center font-mono text-xs tracking-[0.12em] text-highlighter uppercase underline decoration-highlighter/40 underline-offset-4 hover:decoration-highlighter"
                  >
                    {link.label} ↗
                  </a>
                ))}
                {project.note && (
                  <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
                    {project.note}
                  </p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
