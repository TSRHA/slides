<script setup lang="ts">
/**
 * PolicyPath — the coastline / bathymetric contour motif.
 *
 * A low-opacity SVG texture of nested depth-contour lines that anchors the
 * ocean theme without competing with the text. Reusable across layouts; the
 * `align` prop lets a slide pull the contours to a corner so the copy side
 * stays clean. Motion is a slow, optional drift and is frozen for print.
 */
withDefaults(
  defineProps<{
    /** Overall opacity of the texture. */
    opacity?: number
    /** Enable the slow horizontal drift. */
    animate?: boolean
    /** Which side the densest contours gather toward. */
    align?: 'right' | 'left' | 'center'
  }>(),
  { opacity: 0.5, animate: true, align: 'right' },
)
</script>

<template>
  <div
    class="policy-path"
    :class="[`align-${align}`, { 'is-animated': animate }]"
    :style="{ opacity }"
    aria-hidden="true"
  >
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" fill="none">
      <g stroke="var(--accent)" stroke-opacity="0.5" stroke-width="1">
        <path d="M-40 90 C 180 40, 420 150, 860 70" />
        <path d="M-40 170 C 200 120, 440 230, 860 150" />
      </g>
      <g stroke="var(--ink)" stroke-opacity="0.18" stroke-width="1">
        <path d="M-40 250 C 200 200, 460 320, 860 240" />
        <path d="M-40 330 C 220 285, 470 400, 860 320" />
        <path d="M-40 410 C 220 365, 480 480, 860 400" />
        <path d="M-40 490 C 240 450, 500 560, 860 480" />
        <path d="M-40 560 C 240 525, 520 620, 860 550" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.policy-path {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.policy-path svg {
  position: absolute;
  top: 0;
  height: 100%;
  width: 130%;
}
.align-right svg {
  right: -10%;
}
.align-left svg {
  left: -10%;
  transform: scaleX(-1);
}
.align-center svg {
  left: -15%;
}
.policy-path.is-animated svg {
  animation: contour-drift 24s ease-in-out infinite alternate;
}
@keyframes contour-drift {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-3%);
  }
}
.align-left.is-animated svg {
  animation-name: contour-drift-mirror;
}
@keyframes contour-drift-mirror {
  from {
    transform: scaleX(-1) translateX(0);
  }
  to {
    transform: scaleX(-1) translateX(-3%);
  }
}
@media print {
  .policy-path.is-animated svg {
    animation: none;
  }
}
</style>
