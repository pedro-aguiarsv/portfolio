import { ImageResponse } from "next/og"
import { isLocale } from "@/data/site"

export const alt = "Pedro Aguiar"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : "pt"
  const line = locale === "en" ? "You're already in the funnel." : "Você já entrou no funil."
  const cta = locale === "en" ? "Let's talk" : "Quero conversar"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04070d",
          color: "#e7f2fb",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6 }}>PEDRO AGUIAR · NOVA LIMA</div>
        <div style={{ fontSize: 76, fontStyle: "italic", lineHeight: 1.05, maxWidth: 900 }}>
          {line}
        </div>
        <div
          style={{
            display: "flex",
            background: "#3ce0ff",
            color: "#041018",
            fontSize: 28,
            padding: "16px 22px",
            alignSelf: "flex-start",
          }}
        >
          {cta}
        </div>
      </div>
    ),
    size
  )
}
