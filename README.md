# 台灣海洋永續休閒採捕聯盟 · TSRHA 簡報模板

**Taiwan Sustainable Recreational Harvest Alliance (TSRHA)** 的正式 Web Slides 簡報模板。

以 [Slidev](https://sli.dev) + Vue 3 + TypeScript + UnoCSS + Apache ECharts 建置，
本階段提供 **3 頁樣本**（封面 / 主張 / 資料），架構可持續擴充至 20–30 頁正式簡報。

---

## 技術棧

| 項目 | 使用 |
| --- | --- |
| 簡報框架 | Slidev（`@slidev/cli`） |
| UI | Vue 3 + TypeScript |
| CSS | UnoCSS（`presetWind3`） |
| 圖表 | Apache ECharts（tree-shaken core + SVG renderer） |
| 套件管理 | pnpm |

- 不使用 React / Next.js / reveal.js。
- 不使用任何遠端 CDN；字型採用本機 / 系統字型，圖表與相依皆由 `node_modules` 打包。
- 所有相依都寫入 `package.json`。

## 指令

```bash
pnpm install     # 安裝相依
pnpm dev         # 本機開發（http://localhost:3030）
pnpm build       # 靜態輸出至 dist/（已設定 GitHub Pages base = /slides/）
pnpm export      # 匯出 PDF 至 export/tsrha-slides.pdf
pnpm export:png  # 匯出 PNG（每頁一張）
pnpm typecheck   # 嚴格型別檢查（vue-tsc，無 any）
```

> `pnpm export` 需要 Chromium。首次執行前請安裝一次：
> `pnpm exec playwright install chromium`

## 部署至 GitHub Pages

`.github/workflows/deploy-pages.yml` 會在推送到 `main` 時自動建置並部署。
於 repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions** 即可。

`build` 已內建 `--base /slides/`（對應 repo 名稱 `slides`）。若日後改名，請同步調整 `package.json` 的 `build` script。

## 專案結構

```
/
├── slides.md                     # 目錄：全域設定 + 以 src 匯入各頁
├── pages/                        # 每頁一個檔案，方便多人分工
│   ├── 01-cover.md
│   ├── 02-statement.md
│   └── 03-data.md
├── style.css                     # 根樣式入口（載入 styles/*）
├── uno.config.ts                 # UnoCSS 設定（色彩對應設計 tokens）
├── vite.config.ts                # Vite 覆寫（ECharts 預打包）
├── tsconfig.json
├── package.json
├── components/
│   ├── AllianceMark.vue          # 聯盟識別標記（純 SVG）
│   ├── SectionLabel.vue          # 段落標籤（中文為主 + 英文輔助）
│   ├── SlideFooter.vue           # 頁尾（識別 + 頁碼）
│   ├── PolicyPath.vue            # 海岸線 / 等深線紋理（低透明度背景）
│   └── AnimatedPolicyChart.vue   # ECharts 封裝（init / resize / dispose）
├── layouts/
│   ├── cover.vue                 # CoverLayout   — 封面
│   ├── statement.vue             # StatementLayout — 單一核心訊息
│   └── data.vue                  # DataLayout    — 圖表 / 資料
├── data/
│   └── policy-demo.ts            # 示意圖表資料（型別化，非官方數字）
├── styles/
│   ├── tokens.css                # 設計 tokens（色彩 / 字型 / 節奏）
│   └── index.css                 # 全域樣式與字級
├── public/images/                # 本機圖片（documentary 影像）
└── .github/workflows/
    └── deploy-pages.yml
```

## 設計原則

- **深海藍**為主背景，白 / 淺灰文字，**少量青綠**作為強調色。
- 低飽和、無霓虹漸層；以海岸線 / 等深線紋理作低調層次。
- 每頁只表達一個核心訊息；標題大、正文克制、大量留白。
- 不使用密集卡片牆、浮動圓角方塊或 emoji。
- 繁體中文為主要語言，英文僅作品牌或輔助標示。

所有色彩、字型與節奏集中在 `styles/tokens.css`，UnoCSS 色票直接引用這些 CSS 變數，
避免工具類與原生 CSS 產生分歧。

## 擴充新頁

1. 於 `pages/` 新增一個 md（例如 `pages/04-timeline.md`），指定 `layout`：

   ```md
   ---
   layout: statement
   label: 段落名稱
   labelEn: Section Name
   ---

   這裡是單一核心訊息，重點可用 **強調**。
   ```

2. 於 `slides.md` 新增一段匯入：

   ```md
   ---
   src: ./pages/04-timeline.md
   ---
   ```

需要圖表時，於 `data/` 新增型別化的 ECharts option，再以
`<AnimatedPolicyChart :option="yourOption" />` 置入 `data` 版面即可。

## 多人協作建議

- **一頁一檔**：內容拆分到 `pages/`，`slides.md` 僅保留目錄，
  兩位以上成員可各自維護不同頁面，大幅降低合併衝突。
- **鎖定工具鏈**：`package.json` 的 `packageManager` 已固定 pnpm 版本，
  並提交 `pnpm-lock.yaml`，確保每位成員與 CI 安裝結果一致。
- **以 PR 協作**：建議於 GitHub 開啟 `main` 分支保護，透過 Pull Request 合併；
  合併後 `deploy-pages.yml` 會自動重新部署。
- **送審前檢查**：提交前執行 `pnpm typecheck` 與 `pnpm build`，
  兩者皆為 CI 可加入的關卡。

## 資料誠信

`data/policy-demo.ts` 為**示意資料**，用於展示圖表元件與版面，
並非官方統計或政策數字；投影片頁面亦以 caption 明確標示。
正式簡報請以查證後的資料替換，切勿沿用示意數字。
