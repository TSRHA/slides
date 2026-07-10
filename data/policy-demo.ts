import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type {
  GridComponentOption,
  TooltipComponentOption,
} from 'echarts/components'

/**
 * Composed ECharts option type — only the pieces this template registers.
 * Shared with <AnimatedPolicyChart> so props stay strongly typed (no `any`).
 */
export type PolicyChartOption = ComposeOption<
  BarSeriesOption | GridComponentOption | TooltipComponentOption
>

/**
 * The four management pillars of a sustainable recreational-harvest framework.
 * These are a conceptual structure, not statistics.
 */
export interface Pillar {
  readonly zh: string
  readonly en: string
  /**
   * Illustrative relative emphasis on a 0–100 scale, used only to demonstrate
   * the chart component. NOT an official figure or measured statistic.
   */
  readonly emphasis: number
}

export const policyPillars: readonly Pillar[] = [
  { zh: '科學監測', en: 'Science & Monitoring', emphasis: 82 },
  { zh: '採捕規範', en: 'Harvest Rules', emphasis: 74 },
  { zh: '棲地保育', en: 'Habitat Protection', emphasis: 68 },
  { zh: '社群參與', en: 'Community Stewardship', emphasis: 60 },
]

const ink = '#f2f7fb'
const inkMuted = '#a7bccd'
const accent = '#58c2b0'
const gridLine = 'rgba(255,255,255,0.08)'

/**
 * Demonstration chart option for the DataLayout sample slide.
 * Horizontal bars keep the long Chinese category labels readable.
 */
export const policyDemoOption: PolicyChartOption = {
  grid: { top: 8, right: 56, bottom: 8, left: 8, containLabel: true },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(6,21,35,0.94)',
    borderColor: gridLine,
    textStyle: { color: ink, fontSize: 13 },
    // Make the illustrative nature explicit even on hover.
    valueFormatter: (value) => `${value} · 示意`,
  },
  xAxis: {
    type: 'value',
    min: 0,
    max: 100,
    splitLine: { lineStyle: { color: gridLine } },
    axisLabel: { color: inkMuted, fontSize: 12 },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'category',
    inverse: true,
    data: policyPillars.map((p) => p.zh),
    axisLabel: { color: ink, fontSize: 16, fontWeight: 600, margin: 16 },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      type: 'bar',
      barWidth: '46%',
      data: policyPillars.map((p) => p.emphasis),
      itemStyle: { color: accent, borderRadius: [0, 3, 3, 0] },
      label: {
        show: true,
        position: 'right',
        color: inkMuted,
        fontSize: 13,
        formatter: '{c}',
      },
      // Grow-from-left entrance; frozen in print via the component.
      animationDuration: 900,
      animationEasing: 'cubicOut',
      animationDelay: (idx: number) => idx * 120,
    },
  ],
}
