<script setup lang="ts">
/**
 * DataLayout — a headed figure. Title/section on the left rail, the chart (or
 * any figure passed as the default slot) fills the main stage, with a caption
 * strip below for sourcing / illustrative-data disclaimers.
 */
defineProps<{
  label?: string
  labelEn?: string
  /** Figure heading. Named `heading` to avoid Slidev's reserved `title` key,
   *  which is consumed as the slide title and not passed to the layout. */
  heading?: string
  caption?: string
}>()
</script>

<template>
  <div class="slide-surface data">
    <div class="data-head">
      <SectionLabel v-if="label" :label="label" :en="labelEn" />
      <h2 v-if="heading" class="t-title data-title">{{ heading }}</h2>
    </div>

    <div class="data-stage">
      <slot />
    </div>

    <p v-if="caption" class="data-caption">{{ caption }}</p>

    <SlideFooter />
  </div>
</template>

<style scoped>
.data {
  background: linear-gradient(180deg, var(--sea-deep) 0%, var(--sea-abyss) 100%);
  display: flex;
  flex-direction: column;
  padding: 3.4rem var(--gutter) calc(var(--footer-h) + 2rem);
}
.data-head {
  flex: none;
}
.data-title {
  margin-top: 1rem;
  max-width: 28ch;
}
.data-stage {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 1.6rem;
}
.data-caption {
  flex: none;
  margin-top: 1rem;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  color: var(--ink-faint);
}
</style>
