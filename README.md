# WTD Painel (WTD Intelligence)

Sistema de gestão e inteligência de negócios da WTD Telecom (Sento Sé e Casa Nova): painel executivo, cadastros (clientes, planos, lançamentos financeiros, instalações, chamados, metas), agenda, alertas e relatórios.

- **Front-end:** React + TypeScript + Vite + Tailwind CSS.
- **Banco e login:** Supabase (Postgres, Auth e RLS). Tabelas com prefixo `wtd_` em `supabase/migrations`.
- **Hospedagem:** Netlify (`netlify.toml`).

## Publicar no Netlify
1. *Add new site → Import from Git* e escolha este repositório (build `npm run build:site`, pasta `dist`; já está no `netlify.toml`).
2. Em *Environment variables*, crie `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (chave **anon/publishable**; **nunca** a `service_role`).
3. No Supabase, crie as contas da equipe em *Authentication → Users* e libere cada uma com `supabase/manual/criar_membro.sql`. Desative o cadastro público.

## Desenvolvimento (Node 20+)
```
npm install
cp .env.example .env.local     # preencha as duas variáveis públicas
npm run dev
npm run check                  # typecheck + lint + testes + build
```

## Estrutura
- `src/domain` — cálculos do painel, alertas, relatórios e calendário (sem dependências de tela).
- `src/data` — cadastros (campos, validação), repositórios (Supabase, SQL, memória) e SQL seguro.
- `src/features` — telas (visão geral, inteligência, comercial, financeiro, operacional, alertas, relatórios, agenda, planos, cadastros, administração).
- `src/index.css` — tokens de cor, tipografia e movimento (identidade da WTD).
- `supabase/` — migrações, verificação de segurança e scripts manuais. `docs/` — modelo de dados e acesso.
- `artifact/` — entrada usada na página do Claude (não faz parte do site hospedado).

## Segurança
RLS em todas as tabelas, papéis (admin, gestor, operador, leitor), auditoria imutável e nenhuma chave secreta no navegador. Veja `docs/MODELO_DE_DADOS.md` e `docs/SUPABASE.md`.

## Estado
O fluxo hospedado (login pelo Supabase Auth + build no Netlify) ainda **não foi executado de ponta a ponta**. Rode `npm run check` e faça o primeiro deploy para confirmar.
