import type { Config } from 'tailwindcss'

// Todas as cores vêm de tokens CSS (src/index.css). Nenhum hex fora de lá.
const c = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: c('canvas'), surface: c('surface'), sunken: c('sunken'), line: c('line'),
        ink: c('ink'), muted: c('muted'), brand: c('brand'), 'on-brand': c('on-brand'), accent: c('accent'), navy: c('navy'), blue: c('blue'), hero: c('hero'), 'brand-nav': c('brand-on-navy'),
        success: c('success'), warning: c('warning'), danger: c('danger'), info: c('info'),
        demo: c('demo'),
      },
      fontSize: {
        display: ['var(--fs-display)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        title: ['var(--fs-title)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        heading: ['var(--fs-heading)', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['var(--fs-body)', { lineHeight: '1.5' }],
        small: ['var(--fs-small)', { lineHeight: '1.45' }],
        caption: ['var(--fs-caption)', { lineHeight: '1.4' }],
      },
      fontFamily: { sans: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'] },
      borderRadius: { control: 'var(--r-control)', panel: 'var(--r-panel)' },
      boxShadow: { raised: 'var(--shadow-raised)', overlay: 'var(--shadow-overlay)' },
    },
  },
} satisfies Config
