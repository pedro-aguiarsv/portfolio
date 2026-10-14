import { getCopy, profile, type Locale } from "@/data/site"

const links = [
  { href: "#qualificacao", key: "about" },
  { href: "#prova", key: "projects" },
  { href: "#objecao", key: "experience" },
  { href: "#conversao", key: "contact" },
] as const

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <footer className="border-t border-highlighter/25 px-5 py-6 sm:px-7">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4">
        <nav aria-label={copy.railLabel} className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.16em] text-highlighter uppercase hover:text-foreground"
            >
              {copy.nav[link.key]}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            {profile.fullName} · {profile.location}
          </p>
          <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            {copy.footer.line}
          </p>
        </div>
      </div>
    </footer>
  )
}
