export const locales = ["pt", "en"] as const

export type Locale = (typeof locales)[number]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pedroaguiar-psi.vercel.app"

export const profile = {
  name: "Pedro Aguiar",
  fullName: "Pedro Aguiar Gouvea",
  email: "pedro.asvgouvea@gmail.com",
  phone: "(31) 98720-7828",
  phoneHref: "https://wa.me/5531987207828",
  linkedin: "https://www.linkedin.com/in/pedroaguiargouvea/",
  github: "https://github.com/pedro-aguiarsv",
  location: "Nova Lima",
  cv: { pt: "/Pedro_Aguiar_CV_PT.pdf", en: "/Pedro_Aguiar_CV_EN.pdf" },
} as const

type Link = { label: string; href: string }

type Project = {
  name: string
  status: string
  mvp?: boolean
  problem: string
  built: string
  stack: string[]
  links: Link[]
  note?: string
}

type Job = {
  org: string
  role: string
  period: string
  path?: string
  bullets: string[]
}

export type Copy = {
  meta: { title: string; description: string }
  skip: string
  nav: { projects: string; experience: string; skills: string; about: string; contact: string }
  navLabel: string
  hero: {
    status: string
    lead: string
    support: string
    projects: string
    cvPt: string
    cvEn: string
    linkedin: string
  }
  projects: {
    kicker: string
    title: string
    lead: string
    problem: string
    built: string
    stack: string
    items: Project[]
  }
  experience: { kicker: string; title: string; lead: string; jobs: Job[] }
  skills: { kicker: string; title: string; lead: string; groups: { label: string; items: string[] }[] }
  about: {
    kicker: string
    title: string
    paragraphs: string[]
    facts: { label: string; value: string }[]
    awards: string
    photoAlt: string
  }
  contact: {
    kicker: string
    title: string
    lead: string
    formTitle: string
    support: string
    sending: string
    send: string
    fields: { name: string; email: string; message: string }
    placeholders: { name: string; email: string; message: string }
    errors: { name: string; email: string; message: string; send: string }
    done: { title: string; body: string }
    toast: string
  }
  footer: { line: string }
}

const copy = {
  pt: {
    meta: {
      title: "Pedro Aguiar — Engenharia de Software, dados e automação",
      description:
        "Pedro Aguiar, Nova Lima. Estudante de Engenharia de Software (PUC Minas) e fundador da Vekt e da Toketow. Busca estágio ou vaga júnior em TI, remoto ou híbrido em BH.",
    },
    skip: "Pular para o conteúdo",
    navLabel: "Seções da página",
    nav: {
      projects: "Projetos",
      experience: "Experiência",
      skills: "Competências",
      about: "Sobre",
      contact: "Contato",
    },
    hero: {
      status: "Disponível para trabalho",
      lead: "Construo sistemas que automatizam operação: do CRM ao código.",
      support:
        "Estudante de Engenharia de Software na PUC Minas. Passei 2 anos na Costa Ventures, de estagiário a coordenador, e hoje sou fundador da Vekt e da Toketow. Foco em IA aplicada: automações que economizam horas e ferramentas no ar.",
      projects: "Ver projetos",
      cvPt: "Baixar currículo (PT)",
      cvEn: "Download CV (EN)",
      linkedin: "LinkedIn",
    },
    projects: {
      kicker: "Projetos",
      title: "O que eu construí",
      lead: "Seis projetos, os quatro primeiros com IA aplicada e automação em uso real. Cada um com o problema, o que foi feito e a stack.",
      problem: "Problema",
      built: "O que construí",
      stack: "Stack",
      items: [
        {
          name: "Bot Health",
          status: "Em uso diário",
          problem:
            "Registrar treino e saúde exige vários apps, e nenhum responde com base no seu próprio histórico.",
          built:
            "App de treino e saúde mobile-first (PWA) com bot no Telegram e um assistente de IA que lê o histórico do usuário. Integra dados do Garmin por cron.",
          stack: ["Next.js 16", "TypeScript", "Drizzle", "Neon Postgres", "Gemini", "Telegram"],
          links: [{ label: "Ver no ar", href: "https://bot-health.vercel.app" }],
          note: "Código privado.",
        },
        {
          name: "Pipeline de prospecção com IA",
          status: "Uso próprio",
          problem:
            "Prospectar comércio local à mão é lento, e mensagem genérica sem nada para mostrar não vira conversa.",
          built:
            "Pipeline que mapeia, enriquece e pontua leads e gera mensagens personalizadas com a API do Gemini.",
          stack: ["Python", "SQLite", "Gemini API"],
          links: [],
          note: "Código privado.",
        },
        {
          name: "Alerta de receita",
          status: "Código público",
          problem:
            "Site com custo e pouca receita só é percebido quando alguém abre o painel, em geral tarde.",
          built:
            "Automação que cruza dados de ClickHouse e Plausible Analytics e avisa no Discord os sites com queda de receita, rodando por GitHub Actions.",
          stack: ["Python", "GitHub Actions", "ClickHouse", "Plausible", "Discord"],
          links: [{ label: "Repositório", href: "https://github.com/pedro-aguiarsv/alertas" }],
        },
        {
          name: "Store On",
          status: "Em produção, com cliente pagante",
          problem:
            "Pequenos vendedores precisam de uma loja própria com pagamento e frete funcionando, sem montar tudo do zero.",
          built:
            "SaaS de e-commerce white-label multi-tenant: Checkout Bricks com split (application_fee), frete Correios ou Melhor Envio com OAuth por vendedor, e isolamento por storeId. A vitrine pública é a Casa Lume, uma loja fictícia.",
          stack: ["Next.js 16", "Prisma", "Neon", "Mercado Pago", "Melhor Envio", "Correios"],
          links: [
            { label: "Demo", href: "https://storeon.up.railway.app/store/loja-demo" },
            { label: "Vitrine", href: "https://github.com/pedro-aguiarsv/store-on-showcase" },
          ],
          note: "Código do produto é privado.",
        },
        {
          name: "(In)finitudes",
          status: "No ar",
          problem:
            "Livro, podcast e comunidade de um projeto cultural sobre finitude e cuidados paliativos estavam espalhados em links soltos.",
          built:
            "Portal editorial do projeto de Eleonora Santos, onde entrei no desenvolvimento técnico. O livro, o podcast Divã Infinito e o acervo ficam no mesmo lugar.",
          stack: ["Astro", "TypeScript"],
          links: [
            { label: "Ver no ar", href: "https://infinitudes.com.br" },
            { label: "Repositório", href: "https://github.com/pedro-aguiarsv/infinitudes-portal" },
          ],
        },
        {
          name: "SaaS de laudos",
          status: "MVP",
          mvp: true,
          problem:
            "Laudo em PDF comum não prova que é autêntico nem que não foi alterado depois de emitido.",
          built:
            "MVP com dados isolados por empresa (RLS), geração de PDF imutável e verificação pública por QR Code com hash.",
          stack: ["Next.js", "Supabase", "Postgres RLS"],
          links: [],
          note: "Código privado.",
        },
      ],
    },
    experience: {
      kicker: "Experiência",
      title: "Onde já trabalhei",
      lead: "Dois anos em operação e retenção, e agora produtos próprios.",
      jobs: [
        {
          org: "Vekt e Toketow (MEI)",
          role: "Fundador e desenvolvedor",
          period: "jul 2026 — atual",
          bullets: [
            "Sites e landing pages para pequenos negócios (Framer, React/Vite, Astro), do briefing ao deploy na Vercel.",
            "Pipeline de prospecção em Python e SQLite, com mensagens personalizadas por IA.",
            "SaaS de e-commerce (Store On) com Mercado Pago e Melhor Envio, com a primeira cliente pagante em produção.",
            "Venda consultiva de placas NFC e serviços digitais para o comércio local de BH.",
          ],
        },
        {
          org: "Costa Ventures (publisher)",
          role: "Coordenador de Retenção",
          period: "mai 2024 — jul 2026 · 2 anos e 2 meses",
          path: "Estagiário → Analista → Coordenador de Operações → Coordenador de Retenção",
          bullets: [
            "Automações que eliminaram cerca de 7 horas de trabalho manual por dia, somando diferentes fluxos.",
            "Retenção por e-mail e CRM (ActiveCampaign), com fluxos de onboarding, reativação e win-back e testes A/B de abertura, clique e conversão.",
            "Acompanhamento diário de KPIs (churn, reativação, LTV, ROAS) e dashboards de performance para priorizar o que importa.",
            "Supervisão de automações em Node.js e APIs, na ponte entre Negócios e TI.",
            "Gestão de backlog, priorizando as demandas de maior impacto no ROAS.",
          ],
        },
        {
          org: "IBMEX Consultoria Júnior",
          role: "Consultor Comercial",
          period: "jul 2023 — abr 2024",
          bullets: [
            "Prospecção ativa e gestão de pipeline no CRM (Moskit), com propostas sob medida e aumento da conversão.",
          ],
        },
        {
          org: "Best Brownie",
          role: "Proprietário e administrador",
          period: "ago 2017 — dez 2021",
          bullets: [
            "Gestão de ponta a ponta de um microempreendimento por 4 anos: fluxo de caixa, estoque e análise de mercado.",
          ],
        },
      ],
    },
    skills: {
      kicker: "Competências",
      title: "O que eu uso de verdade",
      lead: "Só o que aparece nos projetos e no trabalho acima.",
      groups: [
        {
          label: "Código",
          items: ["Python", "TypeScript", "React", "Next.js", "Node.js", "SQL"],
        },
        {
          label: "Dados e IA",
          items: ["Postgres", "ClickHouse", "APIs de LLM (Gemini, OpenAI)", "GA4"],
        },
        { label: "Automação e entrega", items: ["GitHub Actions", "Make", "Zapier", "Git"] },
        { label: "Negócio", items: ["CRM", "Testes A/B", "KPIs"] },
      ],
    },
    about: {
      kicker: "Sobre",
      title: "Da ponte entre negócio e TI para o código",
      paragraphs: [
        "Fui de estagiário a coordenador em 2 anos na Costa Ventures, na ponte entre negócio e TI. Hoje estudo Engenharia de Software e construo produtos próprios: um SaaS de e-commerce, um bot de saúde com IA e um pipeline de prospecção.",
        "Procuro estágio ou vaga júnior onde eu possa juntar dados, automação e produto.",
      ],
      facts: [
        { label: "Formação", value: "Engenharia de Software, PUC Minas (2026 — 2029, noturno)" },
        { label: "Idiomas", value: "Português nativo, inglês avançado" },
        { label: "Local", value: "Nova Lima, MG. Remoto ou híbrido em BH." },
        { label: "Busco", value: "Estágio ou vaga júnior em TI: IA, dados, front-end e produto" },
      ],
      awards:
        "Medalha de ouro no Canguru de Matemática Brasil. Premiado na Olimpíada Brasileira de Matemática (OBM).",
      photoAlt: "Retrato de Pedro Aguiar",
    },
    contact: {
      kicker: "Contato",
      title: "Vamos conversar",
      lead: "Estágio ou vaga júnior em TI. Mande o contexto da vaga ou do projeto que eu respondo por e-mail.",
      formTitle: "Deixe uma mensagem",
      support: "Resposta por e-mail. Sem newsletter.",
      sending: "Enviando…",
      send: "Enviar mensagem",
      fields: { name: "Nome", email: "E-mail", message: "Mensagem" },
      placeholders: {
        name: "Seu nome",
        email: "voce@email.com",
        message: "A vaga, o projeto, ou os dois. Uma frase já serve.",
      },
      errors: {
        name: "Informe seu nome.",
        email: "E-mail incompleto.",
        message: "Escreva uma frase sobre a vaga ou o projeto.",
        send: "Não consegui enviar. Escreva direto para o e-mail ao lado.",
      },
      done: {
        title: "Mensagem enviada",
        body: "Obrigado. Respondo por e-mail.",
      },
      toast: "Mensagem enviada.",
    },
    footer: { line: "Feito em Next.js. Atualizado em outubro de 2026." },
  },
  en: {
    meta: {
      title: "Pedro Aguiar — Software Engineering, data and automation",
      description:
        "Pedro Aguiar, Nova Lima, Brazil. Software Engineering student (PUC Minas) and founder of Vekt and Toketow. Looking for an internship or junior IT role, remote or hybrid in Belo Horizonte.",
    },
    skip: "Skip to content",
    navLabel: "Page sections",
    nav: {
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      about: "About",
      contact: "Contact",
    },
    hero: {
      status: "Open to work",
      lead: "I build systems that automate operations: from CRM to code.",
      support:
        "Software Engineering student at PUC Minas. I spent 2 years at Costa Ventures, from intern to coordinator, and I now run Vekt and Toketow as founder. I focus on applied AI: automations that save hours and tools that ship.",
      projects: "See projects",
      cvPt: "Download CV (PT)",
      cvEn: "Download CV (EN)",
      linkedin: "LinkedIn",
    },
    projects: {
      kicker: "Projects",
      title: "What I have built",
      lead: "Six projects, the first four applying AI and automation in real use. Each with the problem, what I built and the stack.",
      problem: "Problem",
      built: "What I built",
      stack: "Stack",
      items: [
        {
          name: "Bot Health",
          status: "In daily use",
          problem:
            "Tracking workouts and health takes several apps, and none of them answers based on your own history.",
          built:
            "Mobile-first workout and health app (PWA) with a Telegram bot and an AI assistant that reads the user's history. It pulls Garmin data through a cron job.",
          stack: ["Next.js 16", "TypeScript", "Drizzle", "Neon Postgres", "Gemini", "Telegram"],
          links: [{ label: "View live", href: "https://bot-health.vercel.app" }],
          note: "Private code.",
        },
        {
          name: "AI prospecting pipeline",
          status: "Own use",
          problem:
            "Prospecting local businesses by hand is slow, and a generic message with nothing to show does not start a conversation.",
          built:
            "Pipeline that maps, enriches and scores leads and writes personalised messages with the Gemini API.",
          stack: ["Python", "SQLite", "Gemini API"],
          links: [],
          note: "Private code.",
        },
        {
          name: "Revenue alert",
          status: "Public code",
          problem:
            "A site with cost and little revenue is only noticed when someone opens the dashboard, usually late.",
          built:
            "Automation that cross-checks ClickHouse and Plausible Analytics data and posts to Discord the sites whose revenue dropped, running on GitHub Actions.",
          stack: ["Python", "GitHub Actions", "ClickHouse", "Plausible", "Discord"],
          links: [{ label: "Repository", href: "https://github.com/pedro-aguiarsv/alertas" }],
        },
        {
          name: "Store On",
          status: "In production, with a paying customer",
          problem:
            "Small sellers need their own store with payments and shipping working, without building everything from scratch.",
          built:
            "White-label multi-tenant e-commerce SaaS: Checkout Bricks with a payment split (application_fee), Correios or Melhor Envio shipping with OAuth per seller, and storeId isolation. The public storefront is Casa Lume, a fictional shop.",
          stack: ["Next.js 16", "Prisma", "Neon", "Mercado Pago", "Melhor Envio", "Correios"],
          links: [
            { label: "Demo", href: "https://storeon.up.railway.app/store/loja-demo" },
            { label: "Showcase", href: "https://github.com/pedro-aguiarsv/store-on-showcase" },
          ],
          note: "Product code is private.",
        },
        {
          name: "(In)finitudes",
          status: "Live",
          problem:
            "The book, podcast and community of a cultural project on finitude and palliative care were scattered across loose links.",
          built:
            "Editorial portal for Eleonora Santos's project, where I joined the technical build. The book, the Divã Infinito podcast and the archive now live in one place.",
          stack: ["Astro", "TypeScript"],
          links: [
            { label: "View live", href: "https://infinitudes.com.br" },
            { label: "Repository", href: "https://github.com/pedro-aguiarsv/infinitudes-portal" },
          ],
        },
        {
          name: "Inspection report SaaS",
          status: "MVP",
          mvp: true,
          problem:
            "A plain PDF report cannot prove it is authentic or that it was not changed after being issued.",
          built:
            "MVP with per-company data isolation (RLS), immutable PDF generation and public verification through a QR code with a hash.",
          stack: ["Next.js", "Supabase", "Postgres RLS"],
          links: [],
          note: "Private code.",
        },
      ],
    },
    experience: {
      kicker: "Experience",
      title: "Where I have worked",
      lead: "Two years in operations and retention, and now my own products.",
      jobs: [
        {
          org: "Vekt and Toketow (sole proprietorship)",
          role: "Founder and developer",
          period: "Jul 2026 — present",
          bullets: [
            "Websites and landing pages for small businesses (Framer, React/Vite, Astro), from brief to deploy on Vercel.",
            "Prospecting pipeline in Python and SQLite, with AI-personalised messages.",
            "E-commerce SaaS (Store On) with Mercado Pago and Melhor Envio; first paying customer in production.",
            "Consultative sales of NFC plates and digital services to local businesses in Belo Horizonte.",
          ],
        },
        {
          org: "Costa Ventures (publisher)",
          role: "Retention Coordinator",
          period: "May 2024 — Jul 2026 · 2 years 2 months",
          path: "Intern → Analyst → Operations Coordinator → Retention Coordinator",
          bullets: [
            "Automations that removed about 7 hours of manual work per day, across different flows.",
            "Retention through email and CRM (ActiveCampaign): onboarding, reactivation and win-back flows, with A/B tests on opens, clicks and conversion.",
            "Daily tracking of KPIs (churn, reactivation, LTV, ROAS) and performance dashboards to set priorities.",
            "Oversight of Node.js and API automations, bridging Business and IT.",
            "Backlog management, prioritising the demands with the biggest ROAS impact.",
          ],
        },
        {
          org: "IBMEX Consultoria Júnior",
          role: "Commercial Consultant",
          period: "Jul 2023 — Apr 2024",
          bullets: [
            "Active prospecting and pipeline management in the CRM (Moskit), with tailored proposals and higher conversion.",
          ],
        },
        {
          org: "Best Brownie",
          role: "Owner and manager",
          period: "Aug 2017 — Dec 2021",
          bullets: [
            "End-to-end management of a micro-business for 4 years: cash flow, inventory and market analysis.",
          ],
        },
      ],
    },
    skills: {
      kicker: "Skills",
      title: "What I actually use",
      lead: "Only what shows up in the projects and work above.",
      groups: [
        {
          label: "Code",
          items: ["Python", "TypeScript", "React", "Next.js", "Node.js", "SQL"],
        },
        {
          label: "Data and AI",
          items: ["Postgres", "ClickHouse", "LLM APIs (Gemini, OpenAI)", "GA4"],
        },
        { label: "Automation and delivery", items: ["GitHub Actions", "Make", "Zapier", "Git"] },
        { label: "Business", items: ["CRM", "A/B testing", "KPIs"] },
      ],
    },
    about: {
      kicker: "About",
      title: "From the bridge between business and IT to code",
      paragraphs: [
        "I went from intern to coordinator in 2 years at Costa Ventures, bridging business and IT. Today I study Software Engineering and build my own products: an e-commerce SaaS, a health bot with AI and a prospecting pipeline.",
        "I am looking for an internship or junior role where I can combine data, automation and product.",
      ],
      facts: [
        { label: "Education", value: "Software Engineering, PUC Minas (2026 — 2029, evening)" },
        { label: "Languages", value: "Portuguese native, English advanced" },
        { label: "Location", value: "Nova Lima, MG. Remote or hybrid in Belo Horizonte." },
        { label: "Looking for", value: "Internship or junior IT role: AI, data, front-end and product" },
      ],
      awards:
        "Gold medal at the Brazilian Kangaroo Math contest. Awarded at the Brazilian Math Olympiad (OBM).",
      photoAlt: "Portrait of Pedro Aguiar",
    },
    contact: {
      kicker: "Contact",
      title: "Let's talk",
      lead: "Internship or junior IT role. Send the context of the role or project and I will reply by email.",
      formTitle: "Leave a message",
      support: "Reply by email. No newsletter.",
      sending: "Sending…",
      send: "Send message",
      fields: { name: "Name", email: "Email", message: "Message" },
      placeholders: {
        name: "Your name",
        email: "you@email.com",
        message: "The role, the project, or both. One sentence is enough.",
      },
      errors: {
        name: "Please enter your name.",
        email: "That email is incomplete.",
        message: "Write a sentence about the role or project.",
        send: "I could not send it. Please write to the email beside this form.",
      },
      done: {
        title: "Message sent",
        body: "Thank you. I will reply by email.",
      },
      toast: "Message sent.",
    },
    footer: { line: "Built with Next.js. Updated October 2026." },
  },
} satisfies Record<Locale, Copy>

export function getCopy(locale: Locale): Copy {
  return copy[locale]
}
