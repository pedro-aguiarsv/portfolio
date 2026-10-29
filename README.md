# Pedro Aguiar

Portfólio profissional para a disciplina DIAW, Engenharia de Software, PUC Minas. O site apresenta trajetória, projetos, experiências e contato em português e inglês.

Página única de rolagem, sem nada escondido atrás de clique: abertura com o nome e a disponibilidade, projetos, experiência, competências, sobre e contato. O campo animado (HUD) aparece só no hero.

Repositório: [github.com/pedro-aguiarsv/portfolio](https://github.com/pedro-aguiarsv/portfolio)

Site publicado: [pedroaguiar-psi.vercel.app/pt](https://pedroaguiar-psi.vercel.app/pt). Inglês: [/en](https://pedroaguiar-psi.vercel.app/en).

## Status

Publicado na Vercel.

## Funcionalidades

- Hero com status de disponibilidade e atalhos: ver projetos, baixar o currículo (PT e EN) e LinkedIn
- Projetos de IA aplicada e produtos próprios, cada um com o problema, o que foi construído, a stack e os links
- Experiência com empresa, cargo, período e descrição
- Competências e sobre, em português e inglês
- Contato com e-mail, WhatsApp, LinkedIn e GitHub
- Formulário de nome, e-mail e mensagem, com validação e envio por EmailJS
- Layout responsivo

## Tecnologias

- Next.js 16 (App Router) e React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui e Radix
- React Hook Form e Zod
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
public/Pedro_Aguiar_CV_PT.pdf    currículo em português (e _EN.pdf em inglês)
src/app/[locale]                 página, metadata e imagem Open Graph (pt e en)
src/components/hero.tsx          abertura; hero-field.tsx é o campo animado
src/components/site-nav.tsx      navegação do topo
src/components/projects.tsx      projetos (about, experience, skills e contact são as demais seções)
src/components/site-footer.tsx   rodapé
src/components/ui                primitives do shadcn/ui
src/data/site.ts                 textos, projetos e experiências (PT e EN)
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
