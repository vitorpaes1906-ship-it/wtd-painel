// Entrada do ARTEFATO do Claude (acesso pelo conector Supabase do próprio usuário). Não faz parte do aplicativo hospedado.
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '../src/app/App'
import { createMcpRunner, type McpLike } from '../src/data/mcpRunner'
import type { Repo } from '../src/data/repo'
import { createSqlRepo } from '../src/data/sqlRepo'
import { AuthProvider } from '../src/features/auth/AuthProvider'
import type { AuthGateway } from '../src/features/auth/gateway'
import { createLocalGateway } from '../src/features/auth/localGateway'
import { DataProvider } from '../src/features/data/DataProvider'
import { StateMessage } from '../src/shared/ui/StateMessage'
import { HashRouter } from './router'

const PROJECT_ID = 'lhcjrbfobshtrigoprhc' // projeto Supabase "marketing-vitor"
// Tela de bloqueio local: o código guarda só o hash da senha.
const gateway: AuthGateway = createLocalGateway({ salt: 'wtd-intelligence-v1', hash: 'd61579ab57989f5035ac75e533bc5d89a401611c951a653da8f35cf997862d00' }, (() => { try { return window.sessionStorage } catch { return undefined } })())

function Root() {
  const [repo, setRepo] = useState<Repo | null | undefined>(undefined)
  useEffect(() => {
    const claude = (window as unknown as { claude?: { use?: (n: string) => Promise<McpLike | null> } }).claude
    if (!claude?.use) { setRepo(null); return }
    claude.use('mcp').then((m) => setRepo(m ? createSqlRepo(createMcpRunner(m, PROJECT_ID)) : null), () => setRepo(null))
  }, [])
  if (repo === undefined) return <div className="mx-auto max-w-md p-6"><StateMessage kind="loading" title="Conectando ao Supabase" /></div>
  if (repo === null) return <div className="mx-auto max-w-md p-6"><StateMessage kind="error" title="Abra este link no aplicativo do Claude">O sistema usa o conector do Supabase da sua conta Claude. Abra pelo claude.ai ou pelo app, com o conector Supabase ativo.</StateMessage></div>
  return <HashRouter><AuthProvider gateway={gateway}><DataProvider repo={repo}><App /></DataProvider></AuthProvider></HashRouter>
}
createRoot(document.getElementById('root')!).render(<Root />)
