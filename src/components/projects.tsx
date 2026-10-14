import { getCopy, type Locale } from "@/data/site"
import { Reveal } from "@/components/reveal"

export function Projects({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).projects

  return (
    <section id="prova">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <p className="font-mono text-[11px] tracking-[0.2em] text-highlighter uppercase">
            {copy.kicker}
          </p>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            {copy.order}
          </p>
        </div>
        <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[0.95] font-normal tracking-[-0.03em] md:text-6xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">{copy.lead}</p>
      </Reveal>

      <ol className="mt-16">
        {copy.items.map((project, index) => {
          const number = String(index + 1).padStart(2, "0")
          if (project.featured) {
            return (
              <li key={project.name} className="mt-16">
                <Reveal>
                  <article className="hud-frame relative px-6 py-12 md:-mr-14 md:px-12 md:py-16">
                    <p className="font-mono text-sm tracking-[0.18em] text-highlighter">
                      {number} · {project.year}
                    </p>
                    <h3 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.9] font-normal tracking-[-0.04em] md:text-8xl">
                      {project.name}
                    </h3>
                    <p className="mt-8 max-w-xl font-serif text-2xl leading-snug italic">
                      {project.summary}
                    </p>
                    <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                      {project.body}
                    </p>
                    <ProjectMeta project={project} repoLabel={copy.repo} liveLabel={copy.live} />
                  </article>
                </Reveal>
              </li>
            )
          }

          return (
            <li key={project.name} className="border-t border-border py-10">
              <Reveal>
                <article className="group grid gap-4 md:grid-cols-12">
                  <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground md:col-span-2">
                    {number}
                    <span className="mt-2 block text-foreground">{project.year}</span>
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-4xl leading-none font-normal tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1 md:text-5xl">
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-xl font-serif text-xl italic">{project.summary}</p>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {project.body}
                    </p>
                    <ProjectMeta project={project} repoLabel={copy.repo} liveLabel={copy.live} />
                  </div>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function ProjectMeta({
  project,
  repoLabel,
  liveLabel,
}: {
  project: {
    stack?: string[]
    repo?: string
    live?: string
  }
  repoLabel: string
  liveLabel: string
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      {project.stack && project.stack.length > 0 && (
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          {project.stack.join(" · ")}
        </p>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-[11px] tracking-[0.14em] uppercase underline decoration-border underline-offset-4 hover:text-highlighter"
        >
          {repoLabel}
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-[11px] tracking-[0.14em] text-highlighter uppercase underline decoration-highlighter/40 underline-offset-4"
        >
          {liveLabel}
        </a>
      )}
    </div>
  )
}
