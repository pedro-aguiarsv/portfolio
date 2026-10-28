import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { SiteFooter } from "@/components/site-footer"
import { Skills } from "@/components/skills"
import { getCopy, isLocale, profile, siteUrl } from "@/data/site"

const Contact = dynamic(() => import("@/components/contact").then((mod) => mod.Contact))

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const copy = getCopy(raw)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    email: profile.email,
    url: `${siteUrl}/${raw}`,
    jobTitle: raw === "pt" ? "Fundador e estudante de Engenharia de Software" : "Founder and Software Engineering student",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nova Lima",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "PUC Minas",
    },
    image: `${siteUrl}/pedro-aguiar.jpg`,
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: copy.skills.groups.flatMap((group) => group.items),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="conteudo">
        <Hero locale={raw} />
        <Projects locale={raw} />
        <Experience locale={raw} />
        <Skills locale={raw} />
        <About locale={raw} />
        <Contact locale={raw} />
      </main>
      <SiteFooter locale={raw} />
    </>
  )
}
