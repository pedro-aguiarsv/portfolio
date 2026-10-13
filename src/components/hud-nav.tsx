"use client"

import { useEffect, useState } from "react"
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

const sectionName: Record<string, "about" | "projects" | "experience" | "contact" | undefined> = {
  qualificacao: "about",
  prova: "projects",
  objecao: "experience",
  conversao: "contact",
}

export function HudNav({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [dock, setDock] = useState(false)

  const stages = copy.stages.map((stage, index) => ({
    ...stage,
    index: String(index + 1).padStart(2, "0"),
    title: sectionName[stage.id] ? copy.nav[sectionName[stage.id]!] : stage.label,
  }))

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)

        const marker = window.scrollY + window.innerHeight * 0.38
        let current = 0
        copy.stages.forEach((stage, index) => {
          const el = document.getElementById(stage.id)
          if (el && el.offsetTop <= marker) current = index
        })
        setActive(current)

        const hero = document.getElementById("impressao")
        const contact = document.getElementById("conversao")
        if (!hero || !contact) return
        const heroGone = hero.getBoundingClientRect().bottom < 40
        const contactNear = contact.getBoundingClientRect().top < window.innerHeight * 0.72
        setDock(heroGone && !contactNear)
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [copy.stages])

  const current = stages[active]

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-highlighter/15 bg-background/80 backdrop-blur-md md:pl-64">
        <div className="flex h-16 items-center justify-between gap-3 px-5 md:px-8">
          <a href="#impressao" className="font-mono text-xs tracking-[0.18em] uppercase">
            Pedro Aguiar
          </a>
          <p className="hidden min-w-0 items-baseline gap-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase sm:flex">
            <span className="text-highlighter">{current?.index}</span>
            <span className="truncate text-foreground">{current?.title}</span>
            {current && current.title !== current.label && (
              <span className="truncate text-highlighter/80">{current.label}</span>
            )}
          </p>
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
              className="hidden h-10 rounded-none px-4 font-mono text-[11px] tracking-[0.14em] uppercase shadow-[0_0_18px_rgb(126_231_255/0.28)] hover:bg-[#bff4ff] sm:inline-flex"
            >
              <a href="#conversao">{copy.cta}</a>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 rounded-none border-highlighter/40 md:hidden"
                  aria-label={copy.menu}
                >
                  <DialMark active={active} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="w-full! max-w-none! gap-0 border-0 bg-[#070b12] p-0 text-[#e7f2fb] sm:max-w-none!"
              >
                <SheetHeader className="flex-row items-center justify-between px-6 pt-8">
                  <SheetTitle className="font-mono text-xs tracking-[0.18em] text-highlighter uppercase">
                    {current?.index} · {current?.label}
                  </SheetTitle>
                  <SheetDescription className="sr-only">{copy.railLabel}</SheetDescription>
                  <SheetClose className="font-mono text-xs tracking-[0.16em] uppercase">
                    {copy.close}
                  </SheetClose>
                </SheetHeader>
                <nav className="flex flex-1 items-center px-6" aria-label={copy.menu}>
                  <StageList stages={stages} active={active} progress={progress} large />
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

      <nav
        aria-label={copy.railLabel}
        className="fixed top-0 left-0 z-40 hidden h-svh w-60 items-center px-4 md:flex"
      >
        <StageList stages={stages} active={active} progress={progress} compact />
      </nav>

      <p className="sr-only" aria-live="polite">
        {copy.railLabel}: {current?.title}. {current?.label}
      </p>

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

function StageList({
  stages,
  active,
  progress,
  large = false,
  compact = false,
}: {
  stages: { id: string; index: string; title: string; label: string }[]
  active: number
  progress: number
  large?: boolean
  compact?: boolean
}) {
  return (
    <div className={`flex w-full items-center ${large ? "gap-6" : "gap-3"}`}>
      <svg
        viewBox="0 0 48 220"
        className={large ? "h-72 w-12 shrink-0" : "h-56 w-9 shrink-0"}
        aria-hidden="true"
      >
        <path
          d="M40 8 C 6 36, 6 184, 40 212"
          fill="none"
          stroke="rgb(28 48 68)"
          strokeWidth="1"
        />
        <path
          d="M40 8 C 6 36, 6 184, 40 212"
          fill="none"
          stroke="#7ee7ff"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
        <circle cx="40" cy={8 + progress * 204} r="2.5" fill="#7ee7ff" />
      </svg>
      <ol className={`flex min-w-0 flex-1 flex-col ${large ? "gap-5" : "gap-2.5"}`}>
        {stages.map((stage, index) => {
          const isActive = index === active
          return (
            <li key={stage.id}>
              <a
                href={`#${stage.id}`}
                aria-current={isActive ? "step" : undefined}
                className={`group flex items-baseline gap-2 border-l py-0.5 pl-2 ${
                  isActive
                    ? "border-highlighter text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`font-mono text-[10px] tracking-[0.14em] ${isActive ? "text-highlighter" : ""}`}>
                  {stage.index}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block font-mono tracking-[0.12em] uppercase ${
                      large ? "text-2xl" : "text-[11px]"
                    }`}
                  >
                    {stage.title}
                  </span>
                  {!compact && stage.title !== stage.label && (
                    <span className="mt-0.5 block font-mono text-[10px] tracking-[0.14em] text-highlighter/70 uppercase">
                      {stage.label}
                    </span>
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function DialMark({ active }: { active: number }) {
  const angle = -80 + active * 40
  const rad = (angle * Math.PI) / 180
  const x = 12 + Math.cos(rad) * 6
  const y = 12 + Math.sin(rad) * 6
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx={x} cy={y} r="1.6" fill="#7ee7ff" />
    </svg>
  )
}
