import { getCopy, profile, type Locale } from "@/data/site"

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <footer className="border-t border-border px-5 py-8 pb-24 md:pr-14 md:pb-8 md:pl-28">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
          {profile.fullName} · {profile.location}
        </p>
        <p className="max-w-sm font-serif text-xl italic">{copy.footer.line}</p>
      </div>
    </footer>
  )
}
