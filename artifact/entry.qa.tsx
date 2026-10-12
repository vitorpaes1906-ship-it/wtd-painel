// Variante de TESTE: mesmo aplicativo com repositório em memória (sem Supabase).
import { createRoot } from 'react-dom/client'
import { App } from '../src/app/App'
import { createMemoryRepo } from '../src/data/memoryRepo'
import { AuthProvider } from '../src/features/auth/AuthProvider'
import type { AuthGateway } from '../src/features/auth/gateway'
import { DataProvider } from '../src/features/data/DataProvider'
import { HashRouter } from './router'
const gateway: AuthGateway = { getAccessState: async () => 'authorized', onAuthChange: () => () => undefined, signIn: async () => ({ ok: true }), signOut: async () => undefined, startTotpEnrollment: async () => { throw new Error('x') }, getVerifiedTotpFactorId: async () => null, verifyTotp: async () => ({ ok: true }) }
const repo = createMemoryRepo()
;(window as unknown as { __repo: unknown }).__repo = repo
createRoot(document.getElementById('root')!).render(<HashRouter><AuthProvider gateway={gateway}><DataProvider repo={repo}><App /></DataProvider></AuthProvider></HashRouter>)
