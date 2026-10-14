export const locales = ["pt", "en"] as const

export type Locale = (typeof locales)[number]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const profile = {
  name: "Pedro Aguiar",
  fullName: "Pedro Aguiar Gouvea",
  email: "pedro.asvgouvea@gmail.com",
  phone: "(31) 98720-7828",
  phoneHref: "https://wa.me/5531987207828",
  linkedin: "https://www.linkedin.com/in/pedroaguiargouvea/",
  github: "https://github.com/pedro-aguiarsv",
  location: "Nova Lima",
} as const

type Project = {
  year: string
  name: string
  summary: string
  body: string
  stack?: string[]
  repo?: string
  live?: string
  featured?: boolean
}

type Role = {
  title: string
  period: string
  summary: string
  current?: boolean
}

type Experience = {
  org: string
  note?: string
  roles: Role[]
}

export type Copy = {
  meta: { title: string; description: string }
  skip: string
  cta: string
  secondary: string
  nav: { about: string; projects: string; experience: string; contact: string }
  railLabel: string
  menu: string
  close: string
  stages: { id: string; label: string }[]
  hero: { kicker: string; lead: string; support: string }
  about: {
    kicker: string
    title: string
    paragraphs: string[]
    facts: { label: string; value: string }[]
    awards: string
  }
  projects: {
    kicker: string
    title: string
    lead: string
    order: string
    repo: string
    live: string
    items: Project[]
  }
  tools: {
    kicker: string
    title: string
    groups: { label: string; items: string[] }[]
  }
  experience: {
    kicker: string
    title: string
    lead: string
    groups: Experience[]
  }
  contact: {
    kicker: string
    title: string
    lead: string
    formTitle: string
    support: string
    sending: string
    fields: {
      name: string
      email: string
      message: string
    }
    placeholders: { name: string; email: string; message: string }
    errors: { name: string; email: string; message: string; send: string }
    receipt: {
      title: string
      event: string
      eventValue: string
      source: string
      sourceValue: string
      reply: string
      replyValue: string
      note: string
      body: string
    }
    toast: string
  }
  footer: { line: string }
}

const projectsPt: Project[] = [
  {
    year: "2025",
    name: "plausible_alerta",
    stack: ["JavaScript"],
    repo: "https://github.com/pedro-aguiarsv/plausible_alerta",
    summary:
      "Queda de tráfego descoberta no dia seguinte é relatório. No mesmo dia, é ação.",
    body: "Um script coleta, compara a hora atual com as anteriores e marca a variação. O aviso sai quando o número desvia, não quando alguém lembra de abrir o painel.",
  },
  {
    year: "2026",
    name: "Prospecção",
    summary: "Mensagem fria sem nada para mostrar é pedido. Com um mockup, é conversa.",
    body: "Um script acha leads e gera mockups em escala. A abordagem chega com uma peça na frente, não com um parágrafo genérico.",
  },
  {
    year: "2026",
    name: "(In)finitudes",
    featured: true,
    stack: ["Astro", "TypeScript"],
    repo: "https://github.com/pedro-aguiarsv/infinitudes-portal",
    live: "https://infinitudes.com.br",
    summary: "Livro, podcast e comunidade não podem morar em três links perdidos.",
    body: "Portal do (In)finitudes, projeto cultural de Eleonora Santos sobre finitude, saúde e cuidados paliativos. Eu entrei no desenvolvimento técnico. O livro, o podcast Divã Infinito e o resto do acervo se encontram no mesmo lugar.",
  },
]

const projectsEn: Project[] = [
  {
    year: "2025",
    name: "plausible_alerta",
    stack: ["JavaScript"],
    repo: "https://github.com/pedro-aguiarsv/plausible_alerta",
    summary: "A traffic drop found the next day is a report. The same day, it is an action.",
    body: "A script collects, compares the current hour with the ones before it, and marks the swing. The alert fires when the number moves, not when someone remembers the dashboard.",
  },
  {
    year: "2026",
    name: "Outreach",
    summary: "A cold note with nothing to show is a favor. With a mockup, it is a conversation.",
    body: "A script finds leads and generates mockups at scale. The outreach arrives with a piece in front, not a generic paragraph.",
  },
  {
    year: "2026",
    name: "(In)finitudes",
    featured: true,
    stack: ["Astro", "TypeScript"],
    repo: "https://github.com/pedro-aguiarsv/infinitudes-portal",
    live: "https://infinitudes.com.br",
    summary: "A book, a podcast, and a community cannot live on three lost links.",
    body: "Portal for (In)finitudes, a cultural project by Eleonora Santos on finitude, health, and palliative care. I joined on the technical build. The book, the Divã Infinito podcast, and the rest of the archive meet in one place.",
  },
]

const copy = {
  pt: {
    meta: {
      title: "Pedro Aguiar — o caminho até o clique",
      description:
        "Pedro Aguiar, Nova Lima. Retenção, prospecção e portais. Disponível para vaga remota ou PJ.",
    },
    skip: "Pular para o conteúdo",
    cta: "Quero conversar",
    secondary: "Ver a prova",
    nav: {
      about: "Sobre",
      projects: "Projetos",
      experience: "Experiência",
      contact: "Contato",
    },
    railLabel: "Etapas da página",
    menu: "Menu",
    close: "Fechar",
    stages: [
      { id: "impressao", label: "Impressão" },
      { id: "qualificacao", label: "Qualificação" },
      { id: "prova", label: "Prova" },
      { id: "objecao", label: "Objeção" },
      { id: "conversao", label: "Conversão" },
    ],
    hero: {
      kicker: "impressão · nova lima",
      lead: "Você já entrou no funil.",
      support:
        "Coordenador de Retenção na Costa Ventures. Engenharia de Software na PUC Minas, 2º período. Vaga remota ou PJ.",
    },
    about: {
      kicker: "qualificação",
      title: "Chega de biografia. Direto ao ponto!",
      paragraphs: [
        "Pedro Aguiar, Nova Lima. Coordenador de Retenção na Costa Ventures, um publisher. Segundo período de Engenharia de Software na PUC Minas.",
        "O trabalho de hoje é segurar assinante: e-mail, CRM, teste A/B, churn e LTV. A operação escala por fluxo, não por mais gente. Estou passando a construir isso em código, não só a operar.",
        "Não procuro freela sem fim. Procuro vaga remota ou PJ, com dono claro e número na mesa.",
      ],
      facts: [
        {
          label: "Formação",
          value: "Engenharia de Software, PUC Minas. 2º período, 2026—2029.",
        },
        { label: "Atuação", value: "IA, Desenvolvimento, CRM e Automação." },
        {
          label: "Interesse",
          value: "Front-end, back-end, automações e IA.",
        },
        {
          label: "Objetivo",
          value:
            "Uma cadeira remota, ou um PJ, em que o código mexe com quem fica e com quem chega.",
        },
      ],
      awards:
        "Ouro no Canguru de Matemática. Premiado na Olimpíada Brasileira de Matemática.",
    },
    projects: {
      kicker: "prova",
      title: "Do mais antigo ao que está no ar.",
      lead: "Três peças. Nenhuma é landing de curso.",
      order: "antigo → recente",
      repo: "Repositório",
      live: "No ar",
      items: projectsPt,
    },
    tools: {
      kicker: "o que entra no funil",
      title: "Ferramenta empilhada não é skill.",
      groups: [
        {
          label: "Retenção",
          items: ["E-mail", "CRM", "Teste A/B", "GA4", "GTM"],
        },
        { label: "Mídia", items: ["Google Ads"] },
        {
          label: "Código",
          items: ["JavaScript", "TypeScript", "Node.js", "Astro", "HTML", "CSS", "SQL"],
        },
        { label: "Rotina", items: ["Git", "Notion", "Planilhas"] },
      ],
    },
    experience: {
      kicker: "objeção",
      title: "A pergunta justa: isso existe fora da aula?",
      lead: "Existe. Na Costa Ventures eu fui de estágio a coordenação de retenção. A PUC Minas vem junto. Não é ela que segura o site.",
      groups: [
        {
          org: "Costa Ventures",
          note: "Publisher",
          roles: [
            {
              title: "Coordenador de Retenção",
              period: "jan 2026 — atual",
              current: true,
              summary:
                "E-mail, CRM e teste A/B para cortar churn e subir LTV. Onboarding, reativação e win-back saem sozinhos. A base é segmentada. A operação cresce sem crescer a equipe.",
            },
            {
              title: "Coordenador de Operações",
              period: "nov 2025 — jan 2026",
              summary:
                "A fila entra por ROAS. No meio do caminho, automações em Node.js e APIs, entre o negócio e o TI.",
            },
            {
              title: "Analista de Operações",
              period: "set 2024 — nov 2025",
              summary:
                "Redesenhei fluxo interno e montei dashboard de performance. Onde o processo vazava dinheiro, eu fechava.",
            },
            {
              title: "Estagiário de Gestão de Operações",
              period: "mai 2024 — set 2024",
              summary:
                "KPI todo dia, processo financeiro, e tarefa manual saindo do caminho.",
            },
          ],
        },
        {
          org: "IBMEX Consultoria Júnior",
          roles: [
            {
              title: "Consultor Comercial",
              period: "jul 2023 — abr 2024",
              summary:
                "Prospecção ativa e pipeline no Moskit. Proposta feita para aquele cliente, não para todos. A conversão subiu.",
            },
          ],
        },
        {
          org: "Best Brownie",
          roles: [
            {
              title: "Proprietário",
              period: "ago 2017 — dez 2021",
              summary:
                "Quatro anos de microempresa. Caixa, estoque e o mercado. Eu era o dono e o turno.",
            },
          ],
        },
      ],
    },
    contact: {
      kicker: "conversão",
      title: "Fecha aqui.",
      lead: "Vaga remota ou PJ. Manda o contexto. Eu respondo no e-mail.",
      formTitle: "Deixa a mensagem",
      support: "Sem anexo. Sem newsletter.",
      sending: "Enviando…",
      fields: { name: "Nome", email: "E-mail", message: "Mensagem" },
      placeholders: {
        name: "Seu nome",
        email: "voce@email.com",
        message: "A vaga, o projeto, ou os dois. Uma frase já serve.",
      },
      errors: {
        name: "Sem nome eu não sei quem responde.",
        email: "E-mail incompleto.",
        message: "Uma frase. O que é a vaga ou o projeto?",
        send: "Não saiu. Confere o EmailJS e tenta de novo.",
      },
      receipt: {
        title: "Convertido",
        event: "evento",
        eventValue: "mensagem",
        source: "origem",
        sourceValue: "este site",
        reply: "resposta",
        replyValue: "por e-mail",
        note: "Registrado neste protótipo. O e-mail de verdade entra na próxima etapa.",
        body: "Você não leu um sobre mim. Desceu até o contato. É esse o trabalho.",
      },
      toast: "Registrado neste protótipo.",
    },
    footer: { line: "Você chegou no fim. Isso é uma conversão." },
  },
  en: {
    meta: {
      title: "Pedro Aguiar — the path to the click",
      description:
        "Pedro Aguiar, Nova Lima. Retention, outreach, and portals. Open to remote roles or contract work.",
    },
    skip: "Skip to content",
    cta: "Let's talk",
    secondary: "Show the proof",
    nav: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    railLabel: "Page stages",
    menu: "Menu",
    close: "Close",
    stages: [
      { id: "impressao", label: "Impression" },
      { id: "qualificacao", label: "Qualification" },
      { id: "prova", label: "Proof" },
      { id: "objecao", label: "Objection" },
      { id: "conversao", label: "Conversion" },
    ],
    hero: {
      kicker: "impression · nova lima",
      lead: "You're already in the funnel.",
      support:
        "Retention coordinator at Costa Ventures. Software engineering at PUC Minas, 2nd term. Remote role or contract.",
    },
    about: {
      kicker: "qualification",
      title: "Skip the biography. Straight to the point.",
      paragraphs: [
        "Pedro Aguiar, Nova Lima. Retention coordinator at Costa Ventures, a publisher. Second term of Software Engineering at PUC Minas.",
        "The job today is keeping subscribers: email, CRM, A/B tests, churn, and LTV. The operation scales through flows, not through more people. I am moving from running that to building it.",
        "I am not looking for endless freelance. I want a remote role or a contract, with a clear owner and a number on the table.",
      ],
      facts: [
        {
          label: "Education",
          value: "Software Engineering, PUC Minas. 2nd term, 2026—2029.",
        },
        { label: "Work", value: "AI, development, CRM, and automation." },
        {
          label: "Interest",
          value: "Front-end, back-end, automation, and AI.",
        },
        {
          label: "Goal",
          value:
            "A remote seat, or a contract, where the code changes who stays and who arrives.",
        },
      ],
      awards: "Gold at Kangaroo Math. Awarded at the Brazilian Math Olympiad.",
    },
    projects: {
      kicker: "proof",
      title: "From the oldest to what is live now.",
      lead: "Three builds. None of them is a class landing page.",
      order: "oldest → latest",
      repo: "Repository",
      live: "Live",
      items: projectsEn,
    },
    tools: {
      kicker: "what actually enters the funnel",
      title: "A pile of tools is not a skill.",
      groups: [
        { label: "Retention", items: ["Email", "CRM", "A/B tests", "GA4", "GTM"] },
        { label: "Media", items: ["Google Ads"] },
        {
          label: "Code",
          items: ["JavaScript", "TypeScript", "Node.js", "Astro", "HTML", "CSS", "SQL"],
        },
        { label: "Routine", items: ["Git", "Notion", "Spreadsheets"] },
      ],
    },
    experience: {
      kicker: "objection",
      title: "The fair question: does this exist outside class?",
      lead: "It does. At Costa Ventures I went from intern to retention coordinator. PUC Minas rides along. It does not carry the site.",
      groups: [
        {
          org: "Costa Ventures",
          note: "Publisher",
          roles: [
            {
              title: "Retention Coordinator",
              period: "Jan 2026 — now",
              current: true,
              summary:
                "Email, CRM, and A/B tests to cut churn and raise LTV. Onboarding, reactivation, and win-back run on their own. The list is segmented. The operation grows without growing the team.",
            },
            {
              title: "Operations Coordinator",
              period: "Nov 2025 — Jan 2026",
              summary:
                "The queue is ordered by ROAS. In the middle of it, Node.js and API automations, between the business and IT.",
            },
            {
              title: "Operations Analyst",
              period: "Sep 2024 — Nov 2025",
              summary:
                "I redesigned internal flows and built a performance dashboard. Where the process was leaking money, I closed it.",
            },
            {
              title: "Operations Management Intern",
              period: "May 2024 — Sep 2024",
              summary: "Daily KPIs, financial process, and manual work taken off the path.",
            },
          ],
        },
        {
          org: "IBMEX Consultoria Júnior",
          roles: [
            {
              title: "Commercial Consultant",
              period: "Jul 2023 — Apr 2024",
              summary:
                "Active prospecting and a pipeline in Moskit. Proposals written for that client, not for everyone. Conversion went up.",
            },
          ],
        },
        {
          org: "Best Brownie",
          roles: [
            {
              title: "Owner",
              period: "Aug 2017 — Dec 2021",
              summary:
                "Four years of a small company. Cash, inventory, and the market. I was the owner and the shift.",
            },
          ],
        },
      ],
    },
    contact: {
      kicker: "conversion",
      title: "It closes here.",
      lead: "Remote role or contract. Send the context. I reply by email.",
      formTitle: "Leave the message",
      support: "No attachment. No newsletter.",
      sending: "Sending…",
      fields: { name: "Name", email: "Email", message: "Message" },
      placeholders: {
        name: "Your name",
        email: "you@email.com",
        message: "The role, the project, or both. One sentence is enough.",
      },
      errors: {
        name: "No name, and I don't know who I'm answering.",
        email: "That email is incomplete.",
        message: "One sentence. What is the role or the project?",
        send: "It did not go out. Check EmailJS and try again.",
      },
      receipt: {
        title: "Converted",
        event: "event",
        eventValue: "message",
        source: "source",
        sourceValue: "this site",
        reply: "reply",
        replyValue: "by email",
        note: "Saved in this prototype. Real email comes in the next step.",
        body: "You did not read an about page. You reached the contact. That is the work.",
      },
      toast: "Saved in this prototype.",
    },
    footer: { line: "You reached the end. That is a conversion." },
  },
} satisfies Record<Locale, Copy>

export function getCopy(locale: Locale): Copy {
  return copy[locale]
}
