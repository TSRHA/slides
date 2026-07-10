<script setup lang="ts">
/**
 * SectionLabel — a small, quiet eyebrow used to name a slide's section.
 * Traditional Chinese leads; the English line is optional supporting text.
 */
defineProps<{
  label: string
  en?: string
}>()
</script>

<template>
  <div class="section-label">
    <span class="rule-accent" aria-hidden="true" />
    <span class="zh">{{ label }}</span>
    <span v-if="en" class="en t-brand-en">{{ en }}</span>
  </div>
</template>

<style scoped>
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
}
.section-label .zh {
  font-size: 0.95rem;
  letter-spacing: 0.16em;
  color: var(--ink);
}
.section-label .en {
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
</style>
