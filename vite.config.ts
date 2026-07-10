import { defineConfig } from 'vite'

// Slidev reads and merges this Vite config on top of its own.
// Kept intentionally light: dependency pre-bundling hints for ECharts and
// no remote asset resolution (all packages are local node_modules).
export default defineConfig({
  optimizeDeps: {
    include: [
      'echarts/core',
      'echarts/charts',
      'echarts/components',
      'echarts/renderers',
    ],
  },
})
