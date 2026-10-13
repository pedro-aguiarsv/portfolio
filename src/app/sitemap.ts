import type { MetadataRoute } from "next"
import { siteUrl } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/pt`,
      lastModified: new Date(),
      alternates: { languages: { "pt-BR": `${siteUrl}/pt`, en: `${siteUrl}/en` } },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      alternates: { languages: { "pt-BR": `${siteUrl}/pt`, en: `${siteUrl}/en` } },
    },
  ]
}
