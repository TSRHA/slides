<script setup lang="ts">
/**
 * AnimatedPolicyChart — a thin, robust ECharts wrapper for slides.
 *
 * Responsibilities kept explicit and correct:
 *  - init once the element has a size
 *  - resize via ResizeObserver (container) + window resize
 *  - dispose on unmount (no leaks)
 *  - re-render when the `option` prop changes
 *  - freeze animation in print/export so exported PDFs capture the final,
 *    fully-legible chart (labels never caught mid-animation)
 *
 * Uses the tree-shaken ECharts core build with an explicit module registry
 * and the SVG renderer (crisp vector output in the exported PDF).
 */
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import type { PolicyChartOption } from '../data/policy-demo'

echarts.use([BarChart, GridComponent, TooltipComponent, SVGRenderer])

const props = defineProps<{ option: PolicyChartOption }>()

const host = ref<HTMLDivElement | null>(null)
const instance = shallowRef<echarts.ECharts | null>(null)
let observer: ResizeObserver | null = null

/** Slidev's PDF export loads slides with a `print` flag in the URL. */
function isPrintMode(): boolean {
  if (typeof window === 'undefined') return false
  return /(?:\?|&)print\b/.test(window.location.search) || window.matchMedia?.('print').matches
}

function applyOption(): void {
  if (!instance.value) return
  instance.value.setOption(
    { ...props.option, animation: !isPrintMode() },
    { notMerge: true },
  )
}

function handleResize(): void {
  instance.value?.resize()
}

onMounted(() => {
  if (!host.value) return
  instance.value = echarts.init(host.value, undefined, { renderer: 'svg' })
  applyOption()

  observer = new ResizeObserver(handleResize)
  observer.observe(host.value)
  window.addEventListener('resize', handleResize)
})

watch(
  () => props.option,
  () => applyOption(),
  { deep: true },
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  observer?.disconnect()
  observer = null
  instance.value?.dispose()
  instance.value = null
})
</script>

<template>
  <div ref="host" class="animated-policy-chart" />
</template>

<style scoped>
.animated-policy-chart {
  width: 100%;
  height: 100%;
  min-height: 0;
}
</style>
