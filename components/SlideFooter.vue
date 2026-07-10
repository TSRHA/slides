<script setup lang="ts">
/**
 * SlideFooter — persistent identity strip at the foot of every slide.
 * Left: alliance mark + name. Right: page position via Slidev's injected
 * `$nav` template global (typed in shims.d.ts).
 */
withDefaults(
  defineProps<{
    /** Hide the page counter (e.g. on the cover). */
    hidePageNumber?: boolean
  }>(),
  { hidePageNumber: false },
)

const pad = (n: number): string => String(n).padStart(2, '0')
</script>

<template>
  <footer class="slide-footer">
    <div class="left">
      <AllianceMark :size="22" />
      <span class="name">台灣海洋永續休閒採捕聯盟<span class="sep">·</span><span class="abbr">TSRHA</span></span>
    </div>
    <div v-if="!hidePageNumber" class="right t-brand-en">
      {{ pad($nav.currentPage) }}<span class="slash">/</span>{{ pad($nav.total) }}
    </div>
  </footer>
</template>

<style scoped>
.slide-footer {
  position: absolute;
  left: var(--gutter);
  right: var(--gutter);
  bottom: 1.4rem;
  height: var(--footer-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--sea-line);
  padding-top: 0.9rem;
}
.left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.name {
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: var(--ink-muted);
}
.name .sep {
  margin: 0 0.5rem;
  color: var(--ink-faint);
}
.name .abbr {
  letter-spacing: 0.12em;
  color: var(--ink);
}
.right {
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  color: var(--ink-muted);
}
.right .slash {
  margin: 0 0.3rem;
  color: var(--ink-faint);
}
</style>
