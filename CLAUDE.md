# CLAUDE.md

給 Claude Code 的專案協作指南。本 repo 由**兩位以上成員**同時以 Claude Code 協作，
請每個 session 開始前先讀完本檔，並遵守以下慣例。

---

## 專案是什麼

**台灣海洋永續休閒採捕聯盟（Taiwan Sustainable Recreational Harvest Alliance, TSRHA）**
的正式簡報模板。以 Slidev 製作 Web Slides，目前有 3 頁樣本，架構須能擴充至 20–30 頁。

- 技術棧：**Slidev + Vue 3 + TypeScript + UnoCSS + Apache ECharts**，套件管理用 **pnpm**。
- 禁止：React / Next.js / reveal.js、任何**遠端 CDN**（字型走系統字，圖表由 node_modules 打包）。
- 部署：推到 `main` 由 `.github/workflows/deploy-pages.yml` 自動建置並發佈到 GitHub Pages
  （<https://tsrha.github.io/slides/>）。

## 常用指令

```bash
pnpm install     # 安裝相依
pnpm dev         # 本機開發 http://localhost:3030
pnpm build       # 靜態輸出 dist/（已內建 --base /slides/）
pnpm export      # 匯出 PDF 到 export/tsrha-slides.pdf
pnpm export:png  # 匯出 PNG（每頁一張，便於視覺檢查）
pnpm typecheck   # 嚴格型別檢查（vue-tsc）
```

> `pnpm export` 首次需先安裝一次瀏覽器：`pnpm exec playwright install chromium`。

**送出前一定要跑過 `pnpm typecheck` 與 `pnpm build`，兩者都是 CI 關卡。**
改到版面或圖表時，用 `pnpm export:png` 匯出並用眼睛確認「無溢出、無破版」。

## 目錄結構

```
slides.md            目錄檔：只有全域設定 + 用 src 匯入各頁（改動需協調，見下）
pages/               一頁一檔的內容（NN-名稱.md）── 這是新增/編輯投影片的地方
layouts/             版面：cover.vue / statement.vue / data.vue
components/          元件：AllianceMark / SectionLabel / SlideFooter /
                          PolicyPath / AnimatedPolicyChart
data/                型別化資料（如 policy-demo.ts）
styles/              tokens.css（設計 tokens）＋ index.css（全域樣式）
style.css            根樣式入口（Slidev 自動載入，import styles/*）
uno.config.ts        UnoCSS 設定（色票對應 tokens.css 的 CSS 變數）
shims.d.ts           Slidev 模板全域（$nav 等）的型別宣告
```

---

## 多人協作規則（重要）

1. **一頁一檔、以檔案認領工作。** 新增投影片 = 在 `pages/` 建一個 `NN-名稱.md`，
   再到 `slides.md` 加一段 `src` 匯入。兩人各改各的 `pages/*.md`，幾乎不會衝突。
2. **分支 + PR，不要直接推 `main`。** 開 feature 分支 → PR → 合併。合併後自動部署。
3. **動到「共享檔」前先溝通**（Slack / PR 留言）：`slides.md`（目錄順序）、
   `styles/tokens.css`、`layouts/*`、`components/*`、`uno.config.ts`、`package.json`。
   這些檔案兩人同時改最容易衝突。
4. **committed：** `pnpm-lock.yaml` 必須提交，確保雙方與 CI 安裝一致。
   **不 commit：** `node_modules/`、`dist/`、`export/`（已在 `.gitignore`）。
5. **開工前 `git pull --rebase`**，收工前 `pnpm typecheck && pnpm build` 再推。
6. commit 訊息用中文即可，說明「動了哪一頁 / 哪個元件、為什麼」。

## 這個專案的地雷（踩過的坑，務必遵守）

- **`title` 是 Slidev 保留字**，不會傳進 layout。封面／資料頁的標題請用 **`heading`**
  這個 frontmatter 欄位（cover.vue / data.vue 已如此設計）。
- **`<script setup>` 是「單頁」作用域，不是整份 deck。** 要在某頁用資料，
  就在**那一頁**的 md 內 import（例：`pages/03-data.md` import `../data/policy-demo`）。
- **TypeScript 鎖在 5.x。** 不要升到 7（原生 port），`vue-tsc` 尚不相容會壞掉。
- **字型 `fonts.provider: none`**：只用系統字，不得引入遠端 webfont。
- **base path 是 `/slides/`**（對應 repo 名）。若 repo 改名，要同步改 `package.json` 的
  `build` script。
- **設計 tokens 單一來源在 `styles/tokens.css`**；UnoCSS 色票（`sea/ink/accent`）
  都指向這些 CSS 變數，改色只改 tokens.css，不要在各元件寫死顏色。

## 設計原則（改內容/版面時遵守）

- 深海藍為主背景、白/淺灰文字、**少量青綠**強調；無高飽和漸層、無霓虹。
- 每頁**只講一個核心訊息**；標題大、正文克制、大量留白。
- 不用密集卡片牆、浮動圓角方塊、**不用 emoji**。
- **繁體中文為主**，英文僅作品牌或輔助標示。

## ECharts 元件慣例

- 用 tree-shaken 的 `echarts/core` + 明確 `echarts.use([...])` 註冊模組，**不要**整包 import。
- 圖表資料放 `data/`，並**型別化**（`PolicyChartOption` 之類，**不要用 `any`**）。
- `AnimatedPolicyChart` 已處理 init / resize（ResizeObserver）/ dispose，並在
  **列印/匯出時凍結動畫**（避免 PDF 缺字）；沿用此元件即可。

## 資料誠信（硬規則）

**不得放入虛構或未經證實的政策數字。** `data/policy-demo.ts` 是**示意資料**，
頁面已用 caption 標示「非官方統計」。正式數據請以查證後的來源替換，並保留出處。
