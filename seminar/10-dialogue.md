---
layout: content
label: 對話提案
labelEn: Dialogue Proposal
heading: 今天的研討會，可以成為治理轉型的起點
lead: 我們希望在生態保育、資源管理、在地文化之間，提出一個可被討論、修正與試辦的政策框架。
---

<div class="dialogue-closing-grid">
  <div class="problem-list closing-points">
    <div><strong>給保育社群</strong>我們支持更高保育標準，也願意把自律、回報與教育納入共同責任。</div>
    <div><strong>給主管機關</strong>請把地方限制從工具名稱，提升為風險、證據、比例與回報制度。</div>
    <div><strong>給學界</strong>請協助把資料缺口轉成調查設計，而不是讓缺資料直接變成永久排除。</div>
    <div><strong>給在地社群</strong>共同把海洋使用者變成守護者、通報者與文化傳承者。</div>
  </div>

  <div class="fb-qr-card">
    <div class="fb-qr-kicker">現場掃描加入</div>
    <img src="./images/tsrha-fb-qr.png" alt="台灣海洋永續休閒採捕聯盟官方 Facebook QR Code" />
    <strong>台灣海洋永續休閒採捕聯盟</strong>
    <span>官方 Facebook</span>
  </div>
</div>

<style>
.dialogue-closing-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 11.6rem;
  gap: 1.15rem;
  align-items: start;
}
.closing-points {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.72rem 1rem;
}
.closing-points div {
  padding-top: 0.62rem;
}
.fb-qr-card {
  border: 1px solid rgba(88, 194, 176, 0.42);
  background: rgba(255, 255, 255, 0.045);
  padding: 0.66rem 0.66rem 0.72rem;
  text-align: center;
  color: var(--ink);
}
.fb-qr-kicker {
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  margin-bottom: 0.42rem;
}
.fb-qr-card img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #fff;
  padding: 0.28rem;
  margin-bottom: 0.5rem;
}
.fb-qr-card strong {
  display: block;
  font-size: 0.78rem;
  line-height: 1.35;
}
.fb-qr-card span {
  display: block;
  margin-top: 0.16rem;
  color: var(--ink-muted);
  font-size: 0.7rem;
}
:global(.content .content-slot) {
  margin-top: 0.9rem !important;
}
:global(.slidev-page-6 .slide-footer) {
  display: none !important;
}
</style>
