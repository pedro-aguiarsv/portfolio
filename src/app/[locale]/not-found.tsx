import Link from "next/link"

export default function NotFound() {
  return (
    <main id="conteudo" className="px-5 py-40 md:pl-64">
      <p className="font-mono text-[11px] tracking-[0.2em] text-highlighter uppercase">404</p>
      <h1 className="mt-4 font-serif text-5xl">Essa página não existe.</h1>
      <p className="mt-3 text-muted-foreground">This page does not exist.</p>
      <div className="mt-8 flex gap-6 font-mono text-xs tracking-[0.14em] uppercase">
        <Link href="/pt" className="underline underline-offset-4">
          PT
        </Link>
        <Link href="/en" className="underline underline-offset-4">
          EN
        </Link>
      </div>
    </main>
  )
}
