import type { ReactNode } from "react"

export function Section({
  id,
  kicker,
  title,
  lead,
  children,
}: {
  id: string
  kicker: string
  title: string
  lead?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-14 border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <p className="font-mono text-xs tracking-[0.2em] text-highlighter uppercase">{kicker}</p>
        <h2
          id={`${id}-title`}
          className="mt-4 max-w-3xl text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl"
        >
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{lead}</p>}
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  )
}
