<script setup lang="ts">
defineProps<{
  label?: string
  labelEn?: string
  heading?: string
  lead?: string
}>()
</script>

<template>
  <div class="slide-surface content">
    <PolicyPath :opacity="0.22" align="right" />

    <main class="content-body">
      <SectionLabel v-if="label" :label="label" :en="labelEn" />
      <h2 v-if="heading" class="t-title content-title">{{ heading }}</h2>
      <p v-if="lead" class="content-lead t-body">{{ lead }}</p>
      <div class="content-slot t-body">
        <slot />
      </div>
    </main>

    <SlideFooter />
  </div>
</template>

<style scoped>
.content {
  background:
    radial-gradient(110% 82% at 82% 10%, rgba(88, 194, 176, 0.07), transparent 52%),
    linear-gradient(180deg, var(--sea-deep) 0%, var(--sea-abyss) 100%);
  padding: 3.2rem var(--gutter) calc(var(--footer-h) + 2rem);
}
.content-body {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-title {
  margin-top: 1rem;
  max-width: 25ch;
}
.content-lead {
  margin-top: 0.9rem;
  max-width: 44ch;
  color: var(--ink-muted);
}
.content-slot {
  margin-top: 1.5rem;
  flex: 1 1 auto;
  min-height: 0;
}
</style>
