<!--
  TSRHA 簡報 — Pull Request
  請填寫下列說明並勾選檢查清單後再送審。標題建議：`頁面/元件：做了什麼`
-->

## 這個 PR 做了什麼

<!-- 簡述變更內容與動機。動到哪幾頁 / 哪個元件？ -->

-

## 影響範圍

<!-- 勾選有動到的部分 -->

- [ ] `pages/`（新增或修改投影片內容）
- [ ] `layouts/`（版面）
- [ ] `components/`（元件）
- [ ] `data/`（圖表資料）
- [ ] `styles/` 或 `uno.config.ts`（設計 tokens / 樣式）
- [ ] `slides.md`（目錄順序）或其他共享檔 ── **已先與另一位成員溝通**

## 送審前檢查清單

- [ ] `pnpm typecheck` 通過（無型別錯誤、無 `any`）
- [ ] `pnpm build` 通過
- [ ] 用 `pnpm dev` 或 `pnpm export:png` 目視確認：**無溢出、無破版**，方向鍵可翻頁
- [ ] 設計符合規範：深海藍底、少量青綠強調、**無 emoji**、繁中為主、每頁單一核心訊息
- [ ] **無虛構或未經證實的政策數字**；示意資料已明確標示、正式數據附出處
- [ ] 未引入遠端 CDN / webfont；未新增 React・Next・reveal.js
- [ ] 未提交 `node_modules/`、`dist/`、`export/`；`pnpm-lock.yaml` 若有變更已一併提交
- [ ] 已 `git pull --rebase origin main`，無衝突

## 截圖 / 匯出（若有版面變動）

<!-- 貼上 pnpm export:png 產出的頁面截圖，方便 review -->
