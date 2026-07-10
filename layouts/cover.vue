<script setup lang="ts">
/**
 * CoverLayout — the title slide.
 * Structured brand fields arrive as frontmatter (bound by Slidev as props);
 * the default slot is available for an optional supporting line.
 */
defineProps<{
  label?: string
  labelEn?: string
  /** Display title. Named `heading` to avoid colliding with Slidev's
   *  reserved deck-level `title` frontmatter key. */
  heading?: string
  en?: string
  abbr?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="slide-surface cover">
    <PolicyPath :opacity="0.55" align="right" />

    <div class="cover-body">
      <SectionLabel v-if="label" :label="label" :en="labelEn" />

      <h1 class="t-display cover-title">
        <template v-if="heading">{{ heading }}</template>
        <slot v-else />
      </h1>

      <p v-if="en" class="cover-en t-brand-en">{{ en }}</p>

      <div v-if="abbr" class="cover-abbr">
        <span class="rule-accent" aria-hidden="true" />
        <span class="t-brand-en">{{ abbr }}</span>
      </div>

      <p v-if="subtitle" class="cover-subtitle t-body measure">{{ subtitle }}</p>
      <slot v-if="heading" />
    </div>

    <SlideFooter hide-page-number />
  </div>
</template>

<style scoped>
.cover {
  background:
    radial-gradient(120% 90% at 82% 12%, rgba(88, 194, 176, 0.08), transparent 55%),
    linear-gradient(180deg, var(--sea-deep) 0%, var(--sea-abyss) 100%);
}
.cover-body {
  position: absolute;
  left: var(--gutter);
  right: var(--gutter);
  top: 50%;
  transform: translateY(-52%);
}
.cover-title {
  margin: 1.4rem 0 0;
  max-width: 18ch;
}
.cover-en {
  margin-top: 1.1rem;
  font-size: 1.15rem;
  color: var(--ink-muted);
  letter-spacing: 0.03em;
}
.cover-abbr {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 1.6rem;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--accent);
}
.cover-subtitle {
  margin-top: 1.8rem;
}
</style>
