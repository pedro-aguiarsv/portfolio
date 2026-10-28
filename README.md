# Pedro Aguiar

Portfólio profissional para a disciplina DIAW, Engenharia de Software, PUC Minas. O site apresenta trajetória, projetos, experiências e contato em português e inglês.

O nome fica no núcleo. Sobre, Projetos, Experiência e Contato são círculos ligados a ele. O clique abre a janela daquele tema.

Repositório: [github.com/pedro-aguiarsv/portfolio](https://github.com/pedro-aguiarsv/portfolio)

Site publicado: [pedroaguiar-psi.vercel.app/pt](https://pedroaguiar-psi.vercel.app/pt). Inglês: [/en](https://pedroaguiar-psi.vercel.app/en).

## Status

Publicado na Vercel.

## Funcionalidades

- Sobre, com formação, atuação, interesses, objetivo e foto, em português e inglês
- Projetos do mais antigo ao mais recente, com descrição, tecnologias e links quando existem
- Experiências com empresa, cargo, período e descrição
- Contato com e-mail, WhatsApp, LinkedIn e GitHub
- Formulário de nome, e-mail e mensagem, com validação e envio por EmailJS
- Layout responsivo

## Tecnologias

- Next.js 16 (App Router) e React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui e Radix
- React Hook Form e Zod
- Framer Motion, carregado só depois do envio do formulário
- EmailJS (`@emailjs/browser`)
- Sonner

Não há back-end nem banco. O envio do formulário sai do navegador pelo EmailJS.

## Instalação e execução

Node 20 ou mais novo.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra [http://localhost:3000/pt](http://localhost:3000/pt). Inglês: `/en`.

```bash
npm run build
npm start
```

### Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Serviço do EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Template com `from_name`, `from_email`, `message`, `reply_to` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Chave pública do EmailJS |
| `NEXT_PUBLIC_SITE_URL` | Endereço final, usado no canonical, Open Graph e sitemap |

## Estrutura

```text
public/pedro-aguiar.jpg          foto
src/app/[locale]                 páginas, metadata e Open Graph
src/components/orbit-hub.tsx     núcleo, círculos e janelas
src/components/hud-nav.tsx       topo
src/components/site-footer.tsx   rodapé e links das seções
src/components                   seções de cada janela
src/components/ui                primitives do shadcn/ui
src/data/site.ts                 textos, projetos e experiências
.env.example                     modelo das variáveis
```

Para editar copy, projetos ou experiências, mexa em `src/data/site.ts`.

## Demonstração

<img src="public/pedro-aguiar.jpg" alt="Pedro Aguiar" width="280">

## Autor

Pedro Aguiar Gouvea. Engenharia de Software, PUC Minas, 2º período. Nova Lima.

- GitHub: [pedro-aguiarsv](https://github.com/pedro-aguiarsv)
- LinkedIn: [pedroaguiargouvea](https://www.linkedin.com/in/pedroaguiargouvea/)
- E-mail: pedro.asvgouvea@gmail.com
