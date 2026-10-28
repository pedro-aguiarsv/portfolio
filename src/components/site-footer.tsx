import { getCopy, profile, type Locale } from "@/data/site"

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
          {profile.fullName} · {profile.location}
        </p>
        <p className="text-sm text-muted-foreground">{copy.footer.line}</p>
      </div>
    </footer>
  )
}
