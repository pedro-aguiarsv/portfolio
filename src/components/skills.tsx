import { getCopy, type Locale } from "@/data/site"
import { Section } from "@/components/section"

export function Skills({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).skills

  return (
    <Section id="skills" kicker={copy.kicker} title={copy.title} lead={copy.lead}>
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {copy.groups.map((group) => (
          <div key={group.label} className="border-t border-border pt-4">
            <dt className="font-mono text-xs tracking-[0.16em] text-highlighter uppercase">
              {group.label}
            </dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
