// Validação mínima equivalente ao uso de zod em schemas.ts (somente PRÉ-VISUALIZAÇÃO).
type Rule = (v: string) => string | null
class Str {
  rules: Rule[] = []; doTrim = false
  trim() { this.doTrim = true; return this }
  min(n: number, m: string) { this.rules.push((v) => (v.length < n ? m : null)); return this }
  max(n: number, m: string) { this.rules.push((v) => (v.length > n ? m : null)); return this }
  email(m: string) { this.rules.push((v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : m)); return this }
  regex(r: RegExp, m: string) { this.rules.push((v) => (r.test(v) ? null : m)); return this }
  run(x: unknown) { const v = this.doTrim ? String(x ?? '').trim() : String(x ?? ''); for (const r of this.rules) { const e = r(v); if (e) return { v, e } } return { v, e: null } }
}
export const z = {
  string: () => new Str(),
  object: (shape: Record<string, Str>) => ({
    safeParse(input: Record<string, unknown>) {
      const issues: { path: string[]; message: string }[] = []; const data: Record<string, string> = {}
      for (const [k, f] of Object.entries(shape)) { const { v, e } = f.run(input[k]); data[k] = v; if (e) issues.push({ path: [k], message: e }) }
      return issues.length ? { success: false as const, error: { issues } } : { success: true as const, data }
    },
  }),
}
