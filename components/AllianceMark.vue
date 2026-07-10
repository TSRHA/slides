<script setup lang="ts">
/**
 * AllianceMark — the TSRHA identity mark.
 *
 * A self-contained SVG: three stacked sea-surface / depth-contour arcs rising
 * from a horizon line, evoking waves and bathymetric lines. Pure vector, no
 * external assets. Optionally renders the wordmark alongside.
 */
withDefaults(
  defineProps<{
    /** Mark height in pixels. */
    size?: number
    /** Show the "TSRHA" wordmark and full name beside the mark. */
    withWordmark?: boolean
  }>(),
  { size: 40, withWordmark: false },
)
</script>

<template>
  <div class="alliance-mark" :class="{ 'has-wordmark': withWordmark }">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="台灣海洋永續休閒採捕聯盟 TSRHA"
    >
      <!-- depth contours -->
      <path
        d="M6 30c4-6 10-9 18-9s14 3 18 9"
        stroke="var(--accent)"
        stroke-width="2.2"
        stroke-linecap="round"
      />
      <path
        d="M10 37c3-4.2 7.6-6.4 14-6.4S35 32.8 38 37"
        stroke="var(--ink)"
        stroke-opacity="0.55"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <path
        d="M15 43c2-2.4 4.8-3.6 9-3.6s7 1.2 9 3.6"
        stroke="var(--ink)"
        stroke-opacity="0.3"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <!-- surface / sun marker -->
      <circle cx="24" cy="14" r="4.4" stroke="var(--accent)" stroke-width="2.2" />
    </svg>

    <div v-if="withWordmark" class="wordmark">
      <span class="abbr t-brand-en">TSRHA</span>
      <span class="full">台灣海洋永續休閒採捕聯盟</span>
    </div>
  </div>
</template>

<style scoped>
.alliance-mark {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}
.wordmark {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.wordmark .abbr {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--ink);
}
.wordmark .full {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--ink-muted);
}
</style>
