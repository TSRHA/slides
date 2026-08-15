---
layout: content
---

<figure class="afternoon-questions-fullscreen">
  <img src="./images/afternoon-questions-qr.png" alt="下午綜合座談現場提問 QR Code" />
</figure>

<style>
.afternoon-questions-fullscreen {
  margin: 0;
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: #ffffff;
  z-index: 5;
}
.afternoon-questions-fullscreen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
:global(.slidev-page-9 .content) {
  padding: 0 !important;
  overflow: hidden !important;
}
:global(.slidev-page-9 .content-body) {
  position: absolute !important;
  inset: 0 !important;
  height: auto !important;
  width: 100% !important;
  z-index: 6 !important;
}
:global(.slidev-page-9 .content-slot) {
  margin: 0 !important;
  position: absolute !important;
  inset: 0 !important;
}
:global(.slidev-page-9 .policy-path),
:global(.slidev-page-9 .slide-footer) {
  display: none !important;
}
</style>
