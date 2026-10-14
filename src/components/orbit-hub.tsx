"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Dialog } from "radix-ui"
import { getCopy, type Locale } from "@/data/site"

type Panel = "about" | "projects" | "experience" | "contact"

const hashFor: Record<Panel, string> = {
  about: "qualificacao",
  projects: "prova",
  experience: "objecao",
  contact: "conversao",
}

const panelFromHash: Record<string, Panel> = {
  qualificacao: "about",
  prova: "projects",
  objecao: "experience",
  conversao: "contact",
}

function wedge(center: number) {
  const polar = (deg: number, radius: number) => {
    const angle = ((deg - 90) * Math.PI) / 180
    return [200 + Math.cos(angle) * radius, 200 + Math.sin(angle) * radius]
  }
  const start = center - 16
  const end = center + 16
  const outer = 178
  const inner = 142
  const [x0, y0] = polar(start, outer)
  const [x1, y1] = polar(end, outer)
  const [x2, y2] = polar(end, inner)
  const [x3, y3] = polar(start, inner)
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${outer} ${outer} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} A ${inner} ${inner} 0 0 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z`
}

const wedges = [45, 135, 225, 315].map((center) => wedge(center))

const outerTicks = Array.from({ length: 120 }, (_, index) => {
  const angle = (index / 120) * Math.PI * 2 - Math.PI / 2
  const major = index % 10 === 0
  const inner = major ? 186 : 192
  return {
    x1: 200 + Math.cos(angle) * inner,
    y1: 200 + Math.sin(angle) * inner,
    x2: 200 + Math.cos(angle) * 199,
    y2: 200 + Math.sin(angle) * 199,
    major,
  }
})

const ticks = Array.from({ length: 72 }, (_, index) => {
  const angle = (index / 72) * Math.PI * 2 - Math.PI / 2
  const major = index % 6 === 0
  const inner = major ? 164 : 174
  const outer = 188
  return {
    x1: 200 + Math.cos(angle) * inner,
    y1: 200 + Math.sin(angle) * inner,
    x2: 200 + Math.cos(angle) * outer,
    y2: 200 + Math.sin(angle) * outer,
    major,
  }
})

type Trace = {
  d: string
  delay: string
  joints: { x: number; y: number }[]
  tip: { x: number; y: number }
}

export function OrbitHub({
  locale,
  panels,
}: {
  locale: Locale
  panels: Record<Panel, ReactNode>
}) {
  const copy = getCopy(locale)
  const [panel, setPanel] = useState<Panel | null>(null)
  const [traces, setTraces] = useState<Trace[]>([])
  const stageRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Partial<Record<Panel, HTMLButtonElement | null>>>({})

  const nodes: {
    id: Panel
    label: string
    code: string
    place: string
    labelPlace: string
    delay: string
  }[] = [
    {
      id: "about",
      label: copy.nav.about,
      code: "01",
      place: "top-[15%] left-1/2 lg:top-[18%] lg:left-[27%]",
      labelPlace: "bottom-[calc(100%+0.4rem)]",
      delay: "0s",
    },
    {
      id: "projects",
      label: copy.nav.projects,
      code: "02",
      place: "top-1/2 left-[90%] lg:top-[18%] lg:left-[73%]",
      labelPlace: "top-[calc(100%+0.45rem)] lg:top-auto lg:bottom-[calc(100%+0.4rem)]",
      delay: "0.4s",
    },
    {
      id: "experience",
      label: copy.nav.experience,
      code: "03",
      place: "top-[74%] left-1/2 lg:top-[82%] lg:left-[73%]",
      labelPlace: "top-[calc(100%+0.45rem)]",
      delay: "0.9s",
    },
    {
      id: "contact",
      label: copy.nav.contact,
      code: "04",
      place: "top-1/2 left-[10%] lg:top-[82%] lg:left-[27%]",
      labelPlace: "top-[calc(100%+0.45rem)]",
      delay: "1.3s",
    },
  ]

  useEffect(() => {
    const openFromHash = () => {
      const next = panelFromHash[window.location.hash.slice(1)]
      setPanel(next ?? null)
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const measure = () => {
      const current = stageRef.current
      const core = coreRef.current
      if (!current || !core) return
      const bounds = current.getBoundingClientRect()
      const coreBox = core.getBoundingClientRect()
      const cx = coreBox.left + coreBox.width / 2 - bounds.left
      const cy = coreBox.top + coreBox.height / 2 - bounds.top
      const ring = (coreBox.width / 2) * 0.975
      const ids: { id: Panel; delay: string }[] = [
        { id: "about", delay: "0s" },
        { id: "projects", delay: "0.45s" },
        { id: "experience", delay: "0.9s" },
        { id: "contact", delay: "1.35s" },
      ]

      const next: Trace[] = []
      for (const item of ids) {
        const el = nodeRefs.current[item.id]
        if (!el) continue
        const box = el.getBoundingClientRect()
        const nx = box.left + box.width / 2 - bounds.left
        const ny = box.top + box.height / 2 - bounds.top
        const nr = box.width / 2
        const dx = nx - cx
        const dy = ny - cy
        const span = Math.hypot(dx, dy)
        if (span < 1) continue

        if (Math.abs(dx) < 56 || Math.abs(dy) < 56) {
          const ux = dx / span
          const uy = dy / span
          const x1 = nx - ux * (nr + 6)
          const y1 = ny - uy * (nr + 6)
          const x2 = cx + ux * ring
          const y2 = cy + uy * ring
          next.push({
            d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`,
            delay: item.delay,
            joints: [],
            tip: { x: x2, y: y2 },
          })
          continue
        }

        const signX = Math.sign(dx) || 1
        const startX = nx - signX * (nr + 6)
        const startY = ny
        const runY = Math.abs(startY - cy) > ring - 12 ? cy + Math.sign(dy || 1) * ring * 0.62 : startY
        const half = Math.sqrt(Math.max(0, ring * ring - (runY - cy) ** 2))
        const endX = cx + signX * half
        const endY = runY
        const mid = (startX + endX) / 2
        const elbowX = signX < 0
          ? Math.max(startX + 18, Math.min(endX - 26, mid))
          : Math.min(startX - 18, Math.max(endX + 26, mid))
        next.push({
          d: `M ${startX.toFixed(1)} ${startY.toFixed(1)} H ${elbowX.toFixed(1)} V ${endY.toFixed(1)} H ${endX.toFixed(1)}`,
          delay: item.delay,
          joints: [
            { x: elbowX, y: startY },
            { x: elbowX, y: endY },
          ],
          tip: { x: endX, y: endY },
        })
      }
      setTraces(next)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [locale])

  function choose(next: Panel | null) {
    setPanel(next)
    const hash = next ? `#${hashFor[next]}` : "#impressao"
    window.history.replaceState(null, "", hash)
  }

  return (
    <div id="impressao" className="relative min-h-svh px-3 pt-14 pb-4 sm:px-6">
      <div className="hud-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <span className="pointer-events-none absolute top-16 left-3 size-7 border-t border-l border-highlighter/70 sm:left-6" />
      <span className="pointer-events-none absolute top-16 right-3 size-7 border-t border-r border-highlighter/70 sm:right-6" />
      <span className="pointer-events-none absolute bottom-3 left-3 size-7 border-b border-l border-highlighter/70 sm:left-6" />
      <span className="pointer-events-none absolute right-3 bottom-3 size-7 border-r border-b border-highlighter/70 sm:right-6" />

      <div ref={stageRef} className="relative mx-auto h-[calc(100svh-4.5rem)] max-h-[860px] w-full max-w-[1240px]">
        <div className="pointer-events-none absolute inset-x-8 top-1 hidden h-3 items-end justify-between lg:flex" aria-hidden="true">
          {Array.from({ length: 42 }, (_, index) => (
            <span key={index} className={`w-px bg-highlighter/50 ${index % 6 === 0 ? "h-3" : "h-1.5"}`} />
          ))}
        </div>

        <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-[min(78vw,54vh,520px)] -translate-x-1/2 -translate-y-1/2 lg:size-[min(50vw,66vh,700px)]" aria-hidden="true">
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <circle cx="200" cy="200" r="199" fill="none" stroke="rgb(60 224 255 / 0.28)" strokeWidth="1" />
            <circle cx="200" cy="200" r="168" fill="none" stroke="rgb(60 224 255 / 0.16)" strokeWidth="1" />
            {outerTicks.map((tick, index) => (
              <line
                key={index}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={tick.major ? "rgb(60 224 255 / 0.8)" : "rgb(60 224 255 / 0.28)"}
                strokeWidth={tick.major ? 1.4 : 0.6}
              />
            ))}
            <g className="hud-spin-rev">
              {wedges.map((path) => (
                <path key={path} d={path} fill="rgb(60 224 255 / 0.07)" stroke="rgb(60 224 255 / 0.7)" strokeWidth="1" />
              ))}
            </g>
            <g className="hud-spin-mid">
              <circle cx="200" cy="200" r="124" fill="none" stroke="rgb(60 224 255 / 0.45)" strokeWidth="1.4" strokeDasharray="16 28 4 40" />
            </g>
          </svg>
        </div>

        <aside className="pointer-events-none absolute top-1/2 left-0 z-20 hidden w-40 -translate-y-1/2 lg:block">
          <img
            src="/pedro-aguiar.jpg"
            alt=""
            className="mb-4 size-16 rounded-full object-cover object-[center_18%] ring-1 ring-highlighter/70 shadow-[0_0_18px_rgb(60_224_255/0.25)]"
          />
          <div className="mb-4 flex items-center gap-2">
            <span className="relative grid size-9 place-items-center">
              <span className="gauge-ring absolute inset-0 rounded-full border border-dashed border-highlighter/70" />
              <span className="hud-live size-1.5 rounded-full bg-highlighter shadow-[0_0_8px_#3ce0ff]" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-highlighter uppercase">Sys 01</span>
          </div>
          {(locale === "pt"
            ? [
                ["Base", "Nova Lima"],
                ["Agora", "Coordenador de Retenção · Costa Ventures"],
                ["Atuação", "IA, Desenvolvimento, CRM e Automação"],
                ["Vaga", "Remota ou PJ"],
              ]
            : [
                ["Base", "Nova Lima"],
                ["Now", "Retention coordinator, Costa Ventures"],
                ["Work", "AI, development, CRM, and automation"],
                ["Opening", "Remote or contract"],
              ]
          ).map(([label, value]) => (
            <div key={label} className="border-l border-highlighter/45 py-2 pl-3">
              <p className="font-mono text-[10px] tracking-[0.18em] text-highlighter uppercase">{label}</p>
              <p className="mt-1 max-w-[9.5rem] text-[13px] leading-snug text-foreground/90">{value}</p>
            </div>
          ))}
        </aside>

        <aside className="pointer-events-none absolute top-1/2 right-0 z-20 hidden w-44 -translate-y-1/2 text-right lg:block">
          <div className="mb-4 flex items-center justify-end gap-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-highlighter uppercase">Sys 02</span>
            <span className="relative grid size-9 place-items-center">
              <span className="gauge-ring absolute inset-0 rounded-full border border-dashed border-highlighter/70" style={{ animationDirection: "reverse" }} />
              <span className="size-1.5 rounded-full bg-highlighter shadow-[0_0_8px_#3ce0ff]" />
            </span>
          </div>
          {(locale === "pt"
            ? [
                ["Formação", "Engenharia de Software", "PUC Minas · 2º período"],
                ["Interesse", "Front-end, back-end,", "automações e IA"],
              ]
            : [
                ["Education", "Software Engineering", "PUC Minas · 2nd term"],
                ["Interest", "Front-end, back-end,", "automation and AI"],
              ]
          ).map(([label, line, extra]) => (
            <div key={label} className="border-r border-highlighter/45 py-2 pr-3">
              <p className="font-mono text-[10px] tracking-[0.18em] text-highlighter uppercase">{label}</p>
              <p className="mt-1 text-[13px] leading-snug text-foreground/90">
                {line}
                <br />
                {extra}
              </p>
            </div>
          ))}
        </aside>
        <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <filter id="trace-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {traces.map((trace) => (
            <g key={trace.d} filter="url(#trace-glow)">
              <path d={trace.d} fill="none" stroke="#3ce0ff" strokeWidth="1.35" strokeOpacity="0.55" strokeLinejoin="round" strokeLinecap="round" />
              <path
                d={trace.d}
                fill="none"
                stroke="#d7fbff"
                strokeWidth="1.35"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray="7 12"
                className="hud-flow"
                style={{ animationDelay: trace.delay }}
              />
              {trace.joints.map((joint) => (
                <circle key={`${joint.x}-${joint.y}`} cx={joint.x} cy={joint.y} r="2.3" fill="#3ce0ff" />
              ))}
              <circle cx={trace.tip.x} cy={trace.tip.y} r="2.6" fill="#e9fdff" />
            </g>
          ))}
        </svg>

        <div ref={coreRef} className="absolute top-1/2 left-1/2 z-10 size-[min(40vw,28vh,430px)] -translate-x-1/2 -translate-y-1/2 sm:size-[min(40vw,46vh,440px)]">
          <div className="hud-breathe pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(60_224_255/0.22),transparent_68%)]" />
          <div className="hud-sweep pointer-events-none absolute inset-0 rounded-full" />
          <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <filter id="ring-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="200" cy="200" r="196" fill="none" stroke="rgb(60 224 255 / 0.22)" strokeWidth="1" />
            {ticks.map((tick, index) => (
              <line
                key={index}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={tick.major ? "rgb(60 224 255 / 0.9)" : "rgb(60 224 255 / 0.35)"}
                strokeWidth={tick.major ? 1.6 : 0.7}
              />
            ))}
            <g className="hud-spin-slow" filter="url(#ring-glow)">
              <circle cx="200" cy="200" r="154" fill="none" stroke="#3ce0ff" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="86 16 22 18 10 210" />
            </g>
            <g className="hud-spin-mid">
              <circle cx="200" cy="200" r="136" fill="none" stroke="rgb(60 224 255 / 0.55)" strokeWidth="1" strokeDasharray="2 8" />
            </g>
            <g className="hud-spin-fast" filter="url(#ring-glow)">
              <circle cx="200" cy="200" r="118" fill="none" stroke="#7af0ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="46 250" />
            </g>
            <g className="hud-spin-rev">
              <circle cx="200" cy="200" r="104" fill="none" stroke="rgb(60 224 255 / 0.4)" strokeWidth="1" strokeDasharray="18 10 4 28" />
            </g>
            <path d="M200 28 V48 M200 352 V372 M28 200 H48 M352 200 H372" stroke="rgb(60 224 255 / 0.75)" strokeWidth="1.2" />
            <circle cx="200" cy="200" r="86" fill="rgb(4 8 14 / 0.78)" stroke="rgb(60 224 255 / 0.55)" strokeWidth="1.2" />
          </svg>
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-[24%] text-center">
            <h1 className="font-mono text-[clamp(1rem,3.1vw,1.85rem)] leading-[1.15] font-normal tracking-[0.14em] text-white uppercase [text-shadow:0_0_18px_rgb(60_224_255/0.5)]">
              Pedro
              <br />
              Aguiar
            </h1>
          </div>
        </div>

        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            ref={(element) => {
              nodeRefs.current[node.id] = element
            }}
            onClick={() => choose(node.id)}
            className={`gauge group absolute z-20 size-14 -translate-x-1/2 -translate-y-1/2 sm:size-[5.4rem] ${node.place}`}
          >
            <span className="absolute inset-0 rounded-full border border-highlighter/45 bg-[#04070d]/75 shadow-[0_0_18px_rgb(60_224_255/0.18)] transition duration-500 group-hover:border-highlighter group-hover:shadow-[0_0_28px_rgb(60_224_255/0.45)]" />
            <span className="gauge-ring absolute inset-[3px] rounded-full border border-dashed border-highlighter/70" style={{ animationDelay: node.delay }} />
            <span className="absolute inset-[10px] rounded-full border border-highlighter/25 sm:inset-4" />
            <span className="absolute inset-[18px] hidden rounded-full border border-highlighter/15 sm:block" />
            <span className="relative font-mono text-[11px] tracking-[0.14em] text-highlighter sm:text-xs">{node.code}</span>
            <span className={`absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.18em] whitespace-nowrap text-foreground/90 uppercase sm:text-[11px] ${node.labelPlace}`}>
              {node.label}
            </span>
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-2 flex items-center justify-between gap-2 font-mono text-[9px] tracking-[0.14em] text-highlighter/85 uppercase lg:hidden">
        <span>Costa Ventures</span>
        <span className="h-px flex-1 bg-highlighter/30" />
        <span>PUC Minas</span>
        <span className="h-px flex-1 bg-highlighter/30" />
        <span>{locale === "pt" ? "Remoto / PJ" : "Remote / PJ"}</span>
      </div>

      <Dialog.Root open={panel !== null} onOpenChange={(open) => !open && choose(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px]" />
          <Dialog.Content className="hud-frame fixed top-1/2 left-1/2 z-50 max-h-[min(88svh,860px)] w-[min(960px,calc(100%-1.5rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-5 md:p-10">
            <span className="pointer-events-none absolute top-2 left-2 size-3 border-t border-l border-highlighter" />
            <span className="pointer-events-none absolute top-2 right-2 size-3 border-t border-r border-highlighter" />
            <span className="pointer-events-none absolute bottom-2 left-2 size-3 border-b border-l border-highlighter" />
            <span className="pointer-events-none absolute right-2 bottom-2 size-3 border-r border-b border-highlighter" />
            <div className="mb-6 flex items-center justify-between gap-4">
              <Dialog.Title className="font-mono text-[11px] tracking-[0.22em] text-highlighter uppercase">
                {panel ? copy.nav[panel] : copy.menu}
              </Dialog.Title>
              <Dialog.Close className="font-mono text-xs tracking-[0.16em] uppercase">
                {copy.close}
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              {panel ? copy.nav[panel] : copy.menu}
            </Dialog.Description>
            {panel ? panels[panel] : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
