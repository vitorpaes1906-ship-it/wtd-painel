// Roteador mínimo (hash) apenas para a PRÉ-VISUALIZAÇÃO; o projeto usa react-router-dom.
import { Children, createContext, isValidElement, useContext, useEffect, useState, type ReactElement, type ReactNode } from 'react'
const Ctx = createContext<{ path: string; rest: ReactNode[] }>({ path: '/', rest: [] })
const get = () => (location.hash.replace(/^#/, '') || '/').split('?')[0]
export function HashRouter({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(get())
  useEffect(() => { const f = () => setPath(get()); window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f) }, [])
  return <Ctx.Provider value={{ path, rest: [] }}>{children}</Ctx.Provider>
}
export const useLocation = () => ({ pathname: useContext(Ctx).path })
export function Route(_: { path?: string; element?: ReactNode; children?: ReactNode }) { return null }
type R = ReactElement<{ path?: string; element?: ReactNode; children?: ReactNode }>
function find(children: ReactNode, path: string, star: boolean): ReactNode[] | null {
  for (const c of Children.toArray(children)) {
    if (!isValidElement(c)) continue
    const r = c as R, { path: p, element, children: kids } = r.props
    if (p === undefined) { const inner = find(kids, path, star); if (inner) return [element, ...inner] }
    else if (p === '*' ? star : p === path) return [element]
  }
  return null
}
export function Routes({ children }: { children: ReactNode }) {
  const { path } = useContext(Ctx)
  const chain = find(children, path, false) ?? find(children, path, true) ?? []
  const render = (i: number): ReactNode => i >= chain.length ? null : <Ctx.Provider value={{ path, rest: chain.slice(i + 1) }}>{chain[i]}</Ctx.Provider>
  return <>{render(0)}</>
}
export function Outlet() {
  const { path, rest } = useContext(Ctx)
  if (!rest.length) return null
  return <Ctx.Provider value={{ path, rest: rest.slice(1) }}>{rest[0]}</Ctx.Provider>
}
export function Navigate({ to }: { to: string; replace?: boolean }) {
  useEffect(() => { if (get() !== to) location.replace('#' + to) }, [to])
  return null
}
export function NavLink({ to, className, children, onClick }: { to: string; end?: boolean; onClick?: () => void; className: (s: { isActive: boolean }) => string; children: ReactNode }) {
  const active = useContext(Ctx).path === to
  return <a href={'#' + to} onClick={onClick} aria-current={active ? 'page' : undefined} className={className({ isActive: active })}>{children}</a>
}
