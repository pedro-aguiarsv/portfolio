"use client"

import { useEffect, useRef } from "react"

type Dot = {
  hx: number
  hy: number
  x: number
  y: number
  accent: 0 | 1 | 2
}

const REACH = 160

export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d", { alpha: true })
    if (!canvas || !ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pointer = { x: -9999, y: -9999, inside: false }
    let dots: Dot[] = []
    let frame = 0
    let running = false
    let visible = true

    const paint = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)

      if (!reduce && pointer.inside) {
        ctx.lineWidth = 1
        for (let i = 0; i < dots.length; i++) {
          const a = dots[i]
          const ad = Math.hypot(a.hx - pointer.x, a.hy - pointer.y)
          if (ad > REACH) continue
          for (let j = i + 1; j < dots.length; j++) {
            const b = dots[j]
            if (Math.hypot(b.hx - pointer.x, b.hy - pointer.y) > REACH) continue
            const span = Math.hypot(a.x - b.x, a.y - b.y)
            if (span > 52) continue
            const alpha = (1 - span / 52) * (1 - ad / REACH) * 0.42
            ctx.strokeStyle = `rgba(214, 255, 63, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const dot of dots) {
        const near =
          !reduce && pointer.inside
            ? Math.max(0, 1 - Math.hypot(dot.hx - pointer.x, dot.hy - pointer.y) / REACH)
            : 0
        const radius = (dot.accent ? 1.8 : 1.15) + near * 1.1
        if (dot.accent === 1) ctx.fillStyle = `rgba(214, 255, 63, ${0.55 + near * 0.4})`
        else if (dot.accent === 2) ctx.fillStyle = `rgba(226, 61, 43, ${0.4 + near * 0.35})`
        else ctx.fillStyle = `rgba(237, 230, 214, ${0.2 + near * 0.55})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      let moving = false
      for (const dot of dots) {
        let tx = dot.hx
        let ty = dot.hy
        if (!reduce && pointer.inside) {
          const dx = dot.hx - pointer.x
          const dy = dot.hy - pointer.y
          const dist = Math.hypot(dx, dy) || 1
          if (dist < REACH) {
            const force = (1 - dist / REACH) ** 2
            tx += (dx / dist) * force * 16
            ty += (dy / dist) * force * 16
          }
        }
        dot.x += (tx - dot.x) * 0.16
        dot.y += (ty - dot.y) * 0.16
        if (Math.abs(tx - dot.x) > 0.3 || Math.abs(ty - dot.y) > 0.3) moving = true
      }
      paint()
      if (moving && visible) frame = requestAnimationFrame(step)
      else running = false
    }

    const start = () => {
      if (running || reduce || !visible) return
      running = true
      frame = requestAnimationFrame(step)
    }

    const layout = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const gap = width < 720 ? 46 : 34
      const next: Dot[] = []
      const cols = Math.ceil(width / gap)
      const rows = Math.ceil(height / gap)
      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const shift = ((row * 17 + col * 13) % 7) - 3
          const mark = (row * 3 + col * 5) % 19
          const accent: Dot["accent"] = mark === 0 ? 1 : mark === 7 ? 2 : 0
          const x = col * gap + gap * 0.45 + shift
          const y = row * gap + gap * 0.3
          next.push({ hx: x, hy: y, x, y, accent })
        }
      }
      dots = next
      paint()
    }

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      pointer.x = x
      pointer.y = y
      pointer.inside = inside
      start()
    }

    const onLeave = () => {
      pointer.inside = false
      start()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible && frame) cancelAnimationFrame(frame)
      if (!visible) running = false
    })
    observer.observe(canvas)

    const resize = new ResizeObserver(() => layout())
    resize.observe(canvas)
    layout()

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("pointerdown", onMove, { passive: true })
      window.addEventListener("blur", onLeave)
    }

    return () => {
      observer.disconnect()
      resize.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      window.removeEventListener("blur", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  )
}
