"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { getCopy, locales, type Locale } from "@/data/site"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const nav = [
  { key: "about", href: "#qualificacao" },
  { key: "projects", href: "#prova" },
  { key: "experience", href: "#objecao" },
  { key: "contact", href: "#conversao" },
] as const

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const [scrolled, setScrolled] = useState(false)
  const [dock, setDock] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const hero = document.getElementById("impressao")
      const contact = document.getElementById("conversao")
      if (!hero || !contact) return
      const heroGone = hero.getBoundingClientRect().bottom < 40
      const contactNear = contact.getBoundingClientRect().top < window.innerHeight * 0.72
      setDock(heroGone && !contactNear)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = nav.map((item) => ({
    href: item.href,
    label: copy.nav[item.key],
  }))

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 md:pl-16 ${
          scrolled ? "bg-background/85 backdrop-blur-md" : ""
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-5 md:px-8">
          <a
            href="#impressao"
            className="font-mono text-xs tracking-[0.18em] uppercase"
          >
            Pedro Aguiar
          </a>
          <nav aria-label={copy.menu} className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase">
              {locales.map((item, index) => (
                <span key={item}>
                  {index > 0 && <span className="text-muted-foreground"> / </span>}
                  <a
                    href={`/${item}`}
                    hrefLang={item === "pt" ? "pt-BR" : "en"}
                    aria-current={item === locale ? "page" : undefined}
                    className={item === locale ? "text-highlighter" : "text-muted-foreground hover:text-foreground"}
                  >
                    {item}
                  </a>
                </span>
              ))}
            </div>
            <Button
              asChild
              variant={scrolled ? "default" : "outline"}
              className={`hidden h-10 rounded-none px-4 font-mono text-[11px] tracking-[0.14em] uppercase sm:inline-flex ${
                scrolled ? "hover:bg-[#e7ff73]" : "border-border bg-transparent text-foreground hover:bg-card"
              }`}
            >
              <a href="#conversao">{copy.cta}</a>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 rounded-none border-border lg:hidden"
                  aria-label={copy.menu}
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="w-full! max-w-none! gap-0 border-0 bg-[#12110e] p-0 text-[#ede6d6] sm:max-w-none!"
              >
                <SheetHeader className="flex-row items-center justify-between px-6 pt-8">
                  <SheetTitle className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    {copy.menu}
                  </SheetTitle>
                  <SheetDescription className="sr-only">{copy.railLabel}</SheetDescription>
                  <SheetClose className="font-mono text-xs tracking-[0.16em] uppercase">
                    {copy.close}
                  </SheetClose>
                </SheetHeader>
                <nav className="flex flex-1 flex-col justify-center gap-6 px-6" aria-label={copy.menu}>
                  {links.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a href={link.href} className="font-serif text-5xl leading-none">
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="px-6 pb-10">
                  <SheetClose asChild>
                    <Button asChild className="h-12 w-full rounded-none font-mono text-xs tracking-[0.14em] uppercase">
                      <a href="#conversao">{copy.cta}</a>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {dock && (
        <a
          href="#conversao"
          className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-center bg-highlighter font-mono text-xs tracking-[0.16em] text-ink uppercase sm:hidden"
        >
          {copy.cta}
        </a>
      )}
    </>
  )
}
