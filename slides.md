---
# ─────────────────────────────────────────────────────────────
# 台灣海洋永續休閒採捕聯盟 · TSRHA — Slidev 簡報模板
#
# 本檔僅保留「全域設定 + 投影片目錄」。每一頁的內容拆分到 pages/ 之下，
# 以 `src` 匯入。多位成員可各自維護不同檔案，降低 slides.md 的合併衝突。
# 新增頁面：在 pages/ 建立 md，並於下方新增一段 `src` 匯入即可。
# ─────────────────────────────────────────────────────────────
theme: default
title: 台灣海洋永續休閒採捕聯盟 · TSRHA
titleTemplate: '%s'
info: |
  台灣海洋永續休閒採捕聯盟
  Taiwan Sustainable Recreational Harvest Alliance (TSRHA)
  正式簡報模板 — 3 頁樣本，架構可擴充至 20–30 頁。
lang: zh-TW
class: text-left
mdc: true
transition: fade
colorSchema: dark
# 使用本機 / 系統字型，不下載任何遠端 webfont（無 CDN）。
fonts:
  provider: none
  sans: PingFang TC
  serif: Songti TC
# 第 1 頁（封面）內容來自 pages/01-cover.md
src: ./pages/01-cover.md
---

---
src: ./pages/02-statement.md
---

---
src: ./pages/03-data.md
---
