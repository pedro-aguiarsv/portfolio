# Pedro Aguiar

Portfólio pessoal. Uma página, dois idiomas, organizado como um funil: impressão, qualificação, prova, objeção, conversão.

## Tecnologias

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- shadcn/ui (Button, Sheet, Input, Textarea, Form, Label)
- Framer Motion
- React Hook Form + Zod
- npm

O envio do formulário ainda é simulado. O comentário `TODO Sprint 02: EmailJS` marca onde o e-mail real entra.

## Como rodar

Node 20 ou mais novo.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000/pt](http://localhost:3000/pt). A versão em inglês fica em `/en`.

```bash
npm run build
npm start
```

Na publicação, defina `NEXT_PUBLIC_SITE_URL` com o endereço final. Ele entra no canonical, no Open Graph e no sitemap.

## Estrutura

```text
src/app/[locale]          páginas, metadata e Open Graph
src/components            seções e componentes de interface
src/components/ui         primitives do shadcn/ui
src/data/site.ts          textos em português e inglês, projetos e experiências
```

Para editar copy, projetos ou experiências, mexa só em `src/data/site.ts`.
