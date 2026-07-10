/**
 * Type shims for the Slidev template globals used in this template.
 * Slidev injects these onto every slide component at runtime; here we describe
 * only the surface we actually use, so the strict type-check stays honest
 * without pulling Slidev's build-time source into the program.
 */
import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    /** Deck navigation state (page position, totals, …). */
    $nav: {
      currentPage: number
      total: number
    }
    /** 1-based page number of the current slide component. */
    $page: number
  }
}

export {}
