---
# 第 3 頁 — 資料 / DataLayout
# 圖表為可重用元件，資料來自型別化的 data/policy-demo.ts。
layout: data
label: 管理架構
labelEn: Framework
heading: 永續休閒採捕的四項管理支柱
caption: 示意資料，僅供版型與元件展示，非官方統計或政策數字。Illustrative sample data — not official statistics.
---

<script setup lang="ts">
// Typed demo option lives in data/ — keeps chart logic out of the markdown body.
import { policyDemoOption } from '../data/policy-demo'
</script>

<AnimatedPolicyChart :option="policyDemoOption" />
