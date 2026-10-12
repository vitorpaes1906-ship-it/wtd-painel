# Supabase e acesso

O banco já está aplicado no projeto **marketing-vitor** (tabelas `wtd_*`, com RLS e auditoria).

## Uso pelo link do Claude (agora)
O sistema publicado como página do Claude acessa o banco pelo **seu conector Supabase** (somente a ferramenta `execute_sql`). Funciona só para quem abre o link com o conector ativo na própria conta Claude, ou seja, para você. Nesse modo o acesso ao banco tem as permissões do conector (administrador do projeto), e a RLS não se aplica; por isso o link é privado e não deve ser compartilhado.

## Uso pela equipe (aplicativo hospedado)
Para a equipe usar com login e permissões por papel:
1. Hospedar o projeto no Netlify: subir a pasta para um repositório no GitHub e importar em *Add new site → Import from Git* (o `netlify.toml` já traz o comando `npm run build:site` e a pasta `dist`).
2. Variáveis: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (chave **anon/publishable**, nunca a service_role).
3. Em Authentication > Users, criar cada pessoa; depois liberar com `supabase/manual/criar_membro.sql`.
4. No painel (Authentication): desativar cadastro público e ativar "leaked password protection". Esses ajustes valem para o projeto inteiro.
O aplicativo hospedado usa `src/data/supabaseRepo.ts`; **ainda não foi executado contra o Supabase real**.

## Pontos de atenção
- `wtd_papel()` é executável por usuários logados de propósito: retorna só o papel de quem chama e é usada pelas políticas de RLS.
- O Supabase aponta "leaked password protection" desativado: é configuração do projeto (afeta também o outro sistema).
