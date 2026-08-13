---
layout: cover
heading: 海洋保育，不只是禁止利用。
subtitle: 從善智永續利用談臺灣沿岸海洋治理
---

<div class="seminar-cover-block">
  <div class="seminar-section-title">講者</div>
  <div class="speaker-grid">
    <div class="speaker-card">
      <img src="./images/speaker-chen.jpg" alt="陳昭倫教授" />
      <div>
        <strong>陳昭倫 教授</strong>
        <span>第一場｜生態保育</span>
      </div>
    </div>
    <div class="speaker-card">
      <img src="./images/speaker-wen.jpg" alt="溫國彰教授" />
      <div>
        <strong>溫國彰 教授</strong>
        <span>第二場｜資源管理</span>
      </div>
    </div>
    <div class="speaker-card">
      <img src="./images/speaker-tsai.jpg" alt="蔡政良教授" />
      <div>
        <strong>蔡政良 教授</strong>
        <span>第三場｜在地文化</span>
      </div>
    </div>
  </div>

  <div class="organizer-panel">
    <div class="seminar-section-title">主辦單位 <span>依筆畫排序</span></div>
    <div class="organizer-grid">
      <span>中央研究院生物多樣性研究中心珊瑚礁研究室</span>
      <span>臺北醫學大學通識教育中心</span>
      <span>國立台灣海洋大學海洋休閒產業暨遊艇發展中心</span>
      <span>東海大學生態與環境研究中心</span>
      <span>台灣海洋永續休閒採捕聯盟</span>
      <span>台灣自由潛水發展協會</span>
    </div>
  </div>
</div>

<style>
:global(.slide-surface.cover .cover-body) {
  left: calc(var(--gutter) * 0.72) !important;
  right: calc(var(--gutter) * 0.72) !important;
  transform: translateY(-50%) !important;
}
:global(.slide-surface.cover .cover-title) {
  width: 100% !important;
  max-width: none !important;
  white-space: nowrap !important;
  font-size: clamp(1.95rem, 3.35vw, 2.7rem) !important;
  line-height: 1.12 !important;
  letter-spacing: -0.04em !important;
}
:global(.slide-surface.cover .cover-subtitle) {
  margin-top: 1.05rem !important;
}
:global(.slide-surface.cover .slide-footer) {
  display: none !important;
}
.seminar-cover-block {
  width: min(48rem, 100%);
  margin-top: 1.35rem;
}
.seminar-section-title {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  color: var(--accent);
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 0.14em;
}
.seminar-section-title span {
  color: var(--ink-faint);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.08em;
}
.speaker-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 0.5rem;
}
.speaker-card {
  display: grid;
  grid-template-columns: 4.45rem 1fr;
  gap: 0.62rem;
  align-items: center;
  border: 1px solid rgba(88, 194, 176, 0.32);
  background: rgba(255, 255, 255, 0.035);
  padding: 0.48rem;
}
.speaker-card img {
  width: 4.45rem;
  height: 4.45rem;
  object-fit: cover;
}
.speaker-card strong {
  display: block;
  color: var(--ink);
  font-size: 0.95rem;
  line-height: 1.28;
}
.speaker-card span {
  display: block;
  color: var(--ink-faint);
  font-size: 0.68rem;
  line-height: 1.35;
  margin-top: 0.14rem;
}
.organizer-panel {
  margin-top: 0.95rem;
  border-top: 1px solid rgba(88, 194, 176, 0.34);
  padding-top: 0.68rem;
}
.organizer-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.32rem 0.7rem;
  margin-top: 0.42rem;
  color: var(--ink-muted);
  font-size: 0.66rem;
  line-height: 1.45;
}
.organizer-grid span {
  min-width: 0;
  overflow-wrap: anywhere;
}
</style>
