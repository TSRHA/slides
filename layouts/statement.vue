<script setup lang="ts">
/**
 * StatementLayout — one core message, large, on generous whitespace.
 * The statement itself is the slide body (default slot). A short attribution
 * or context line can follow via the `note` slot.
 */
defineProps<{
  label?: string
  labelEn?: string
}>()
</script>

<template>
  <div class="slide-surface statement">
    <PolicyPath :opacity="0.35" align="left" />

    <div class="statement-body">
      <SectionLabel v-if="label" :label="label" :en="labelEn" />

      <div class="statement-text t-statement measure">
        <slot />
      </div>

      <div class="statement-note t-body">
        <slot name="note" />
      </div>
    </div>

    <SlideFooter />
  </div>
</template>

<style scoped>
.statement {
  background: linear-gradient(180deg, var(--sea-deep) 0%, var(--sea-abyss) 100%);
}
.statement-body {
  position: absolute;
  left: var(--gutter);
  right: var(--gutter);
  top: 50%;
  transform: translateY(-54%);
}
.statement-text {
  margin-top: 1.8rem;
  max-width: 24ch;
}
.statement-text :deep(strong) {
  color: var(--accent);
  font-weight: 700;
}
.statement-note {
  margin-top: 1.8rem;
  color: var(--ink-faint);
}
</style>
