import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// Design tokens are the single source of truth in styles/tokens.css.
// UnoCSS colours below reference those CSS variables so utilities and raw CSS
// never drift apart.
export default defineConfig({
  presets: [presetWind3(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      sea: {
        abyss: 'var(--sea-abyss)',
        deep: 'var(--sea-deep)',
        mid: 'var(--sea-mid)',
        line: 'var(--sea-line)',
      },
      ink: {
        DEFAULT: 'var(--ink)',
        muted: 'var(--ink-muted)',
        faint: 'var(--ink-faint)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        soft: 'var(--accent-soft)',
      },
    },
    fontFamily: {
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
  },
  shortcuts: {
    'slide-surface': 'relative h-full w-full overflow-hidden bg-sea-deep text-ink font-sans',
    'measure': 'max-w-[62ch]',
  },
})
