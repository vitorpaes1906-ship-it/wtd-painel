// Variante SOMENTE PARA CAPTURAS DE TELA: dados gerados localmente em memória (não faz parte do produto).
import { createRoot } from 'react-dom/client'
import { App } from '../src/app/App'
import { createMemoryRepo } from '../src/data/memoryRepo'
import { AuthProvider } from '../src/features/auth/AuthProvider'
import type { AuthGateway } from '../src/features/auth/gateway'
import { DataProvider } from '../src/features/data/DataProvider'
import { HashRouter } from './router'

let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
const iso = (d: Date) => d.toISOString().slice(0, 10), ago = (n: number) => iso(new Date(Date.now() - n * 864e5))
const servicos = ['Fibra 100 Mb', 'Fibra 300 Mb', 'Fibra 500 Mb', 'Link empresarial'].map((nome, i) => ({ id: `s${i}`, nome, tipo: i === 3 ? 'empresarial' : 'plano', valor_mensal: 70 + i * 40, ativo: true }))
const clientes: Record<string, unknown>[] = [], lancamentos: Record<string, unknown>[] = [], instalacoes: Record<string, unknown>[] = [], chamados: Record<string, unknown>[] = []
for (let i = 0; i < 260; i++) {
  const cidade = rnd() < 0.6 ? 'sento-se' : 'casa-nova', ativ = Math.floor(rnd() * 540), cancelado = rnd() < 0.12 && ativ > 20
  clientes.push({ id: `c${i}`, nome: `Cliente ${i + 1}`, telefone: null, cidade, servico_id: `s${Math.floor(rnd() * 4)}`, status: cancelado ? 'cancelado' : 'ativo', data_ativacao: ago(ativ), data_cancelamento: cancelado ? ago(Math.floor(rnd() * ativ)) : null, motivo_cancelamento: null, observacao: null })
}
for (let m = 0; m < 12; m++) for (const cidade of ['sento-se', 'casa-nova']) for (let k = 0; k < 6; k++) {
  const rec = k < 4; lancamentos.push({ id: `l${m}${cidade}${k}`, tipo: rec ? 'receita' : 'despesa', data: ago(m * 30 + k * 4 + 2), descricao: rec ? `Mensalidades ${servicos[k].nome}` : k === 4 ? 'Material de rede' : 'Salários', categoria: rec ? 'Mensalidade' : 'Despesas', valor: rec ? 2500 + rnd() * 4000 : 1800 + rnd() * 2500, cidade, servico_id: rec ? servicos[k].id : null, cliente_id: null, status: rnd() < 0.1 ? 'atrasado' : 'pago', forma_pagamento: 'pix', observacao: null })
}
for (let i = 0; i < 30; i++) instalacoes.push({ id: `i${i}`, cliente_id: null, cidade: i % 3 ? 'sento-se' : 'casa-nova', endereco: null, status: i < 9 ? 'pendente' : 'concluida', data_solicitacao: ago(Math.floor(rnd() * 70)), data_agendada: null, data_encerramento: i < 9 ? null : ago(Math.floor(rnd() * 20)), observacao: null })
for (let i = 0; i < 40; i++) chamados.push({ id: `k${i}`, cliente_id: null, cidade: i % 2 ? 'sento-se' : 'casa-nova', assunto: 'Sem sinal', prioridade: 'media', status: i < 12 ? 'aberto' : 'resolvido', aberto_em: new Date(Date.now() - Math.floor(rnd() * 60) * 864e5 - 3e7).toISOString(), resolvido_em: i < 12 ? null : new Date(Date.now() - Math.floor(rnd() * 5) * 864e5).toISOString(), observacao: null })
const nextMonth = new Date(); nextMonth.setUTCDate(1); nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 3)
const repo = createMemoryRepo({ servicos, clientes, lancamentos, instalacoes, chamados, metas: [{ id: 'm1', cidade: null, mes: iso(nextMonth), meta_clientes: 260 }] })
const gateway: AuthGateway = { getAccessState: async () => 'authorized', onAuthChange: () => () => undefined, signIn: async () => ({ ok: true }), signOut: async () => undefined, startTotpEnrollment: async () => { throw new Error('x') }, getVerifiedTotpFactorId: async () => null, verifyTotp: async () => ({ ok: true }) }
createRoot(document.getElementById('root')!).render(<HashRouter><AuthProvider gateway={gateway}><DataProvider repo={repo}><App /></DataProvider></AuthProvider></HashRouter>)
