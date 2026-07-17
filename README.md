# 台灣海洋永續休閒採捕聯盟 · TSRHA 政策簡報

**Taiwan Sustainable Recreational Harvest Alliance (TSRHA)** 的正式 Web Slides 簡報。

目前版本為 **新北市近岸海洋資源管理政策建議**，依照「支持保育、支持科學管理、反對一刀切禁止、提出可執行替代方案」的敘事，完成 11 頁政策溝通簡報，可再擴充為 20–30 頁正式版。

---

## 簡報企劃

### 核心訊息

TSRHA 支持海洋保育與科學管理；反對缺乏公開科學依據、未區分違法商業化壓力與守法非商業休閒採捕的一刀切禁令。聯盟主張以尺寸、數量、季節、保護物種、保育區分級、教育與稽查等工具，建立兼顧保育、永續利用與公平治理的制度。

### 目標受眾

- 新北市與中央海洋／漁業相關主管機關
- 地方民代、議會助理、政策幕僚
- 海洋保育團體、休閒採捕社群與關心公共政策的民眾

### 11 頁架構

1. 封面：新北市近岸海洋資源管理政策建議
2. 我們是誰：聯盟背景、成員與公共政策關切
3. 我們支持什麼：保育、永續、科學、查緝、調節性保護區
4. 我們反對什麼：缺乏公開科學依據的一刀切禁止
5. 草案最大問題：舊框架、程序、科學依據、比例原則、差異化管理
6. 國際案例：澳洲、紐西蘭、夏威夷、地中海常用管理工具
7. 科學調查與論證：調查採捕壓力，而非預設有罪
8. 真正問題：違法濫捕與違法販售
9. 聯盟提出方向：季節、尺寸、數量、保護物種、分級保育區、教育合作
10. 永續漁法尺：尺寸管理需要教育與量測工具
11. 合作夥伴：聯盟願意協助宣導、自律、回報與政策溝通

---

## 技術棧

| 項目 | 使用 |
| --- | --- |
| 簡報框架 | Slidev（`@slidev/cli`） |
| UI | Vue 3 + TypeScript |
| CSS | UnoCSS（`presetWind3`）與自訂設計 tokens |
| 圖表 | Apache ECharts（保留可擴充元件） |
| 套件管理 | pnpm |

- 不使用 React / Next.js / reveal.js。
- 不使用任何遠端 CDN；字型採用本機 / 系統字型，圖表與相依皆由 `node_modules` 打包。

## 指令

```bash
pnpm install     # 安裝相依
pnpm dev         # 本機開發（http://localhost:3030）
pnpm build       # 靜態輸出至 dist/（已設定 GitHub Pages base = /slides/）
pnpm export      # 匯出 PDF 至 export/tsrha-slides.pdf
pnpm export:png  # 匯出 PNG（每頁一張）
pnpm typecheck   # 嚴格型別檢查（vue-tsc）
```

> `pnpm export` 需要 Chromium。首次執行前請安裝一次：
> `pnpm exec playwright install chromium`

## 部署至 GitHub Pages

`.github/workflows/deploy-pages.yml` 會在推送到 `main` 時自動建置並部署。

`build` 已內建 `--base /slides/`（對應 repo 名稱 `slides`）。若日後改名，請同步調整 `package.json` 的 `build` script。

## 專案結構

```
/
├── slides.md                     # 目錄：全域設定 + 以 src 匯入各頁
├── pages/                        # 每頁一個檔案，方便多人分工
│   ├── 01-cover.md
│   ├── 02-who-we-are.md
│   ├── 03-support.md
│   └── ...
├── layouts/
│   ├── cover.vue                 # 封面
│   ├── statement.vue             # 單一核心訊息
│   ├── content.vue               # 一般政策內容頁
│   └── data.vue                  # 圖表 / 資料
├── components/                   # 識別、頁尾、背景紋理、圖表元件
├── data/                         # 型別化資料（示意資料需標明）
└── styles/                       # 設計 tokens 與全域樣式
```

## 設計原則

- **深海藍**為主背景，白 / 淺灰文字，**少量青綠**作為強調色。
- 低飽和、無霓虹漸層；以海岸線 / 等深線紋理作低調層次。
- 每頁只表達一個核心訊息；標題大、正文克制、大量留白。
- 不使用 emoji；繁體中文為主要語言，英文僅作品牌或輔助標示。

## 資料誠信

不得放入虛構或未查證的政策數字。正式簡報如加入統計、法規或研究引用，應在頁面中明確標示來源。
