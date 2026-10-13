"use client"

import { useEffect, useState } from "react"
import { getCopy, type Locale } from "@/data/site"

export function FunnelRail({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)

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

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50 h-[3px] bg-border md:hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-highlighter"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <nav
        aria-label={copy.railLabel}
        className="fixed top-0 left-0 z-40 hidden h-svh w-16 md:block"
      >
        <div className="absolute top-28 bottom-28 left-3 w-px bg-border">
          <div
            className="w-full origin-top bg-highlighter"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <ol className="absolute top-28 right-1 bottom-28 flex flex-col justify-between">
          {copy.stages.map((stage, index) => {
            const isActive = index === active
            return (
              <li key={stage.id}>
                <a
                  href={`#${stage.id}`}
                  aria-current={isActive ? "step" : undefined}
                  className={`font-mono text-[10px] tracking-[0.16em] uppercase [writing-mode:vertical-rl] rotate-180 ${
                    isActive ? "text-highlighter" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {stage.label}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
      <p className="sr-only" aria-live="polite">
        {copy.railLabel}: {copy.stages[active]?.label}
      </p>
    </>
  )
}
