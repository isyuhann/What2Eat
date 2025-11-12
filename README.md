# 🍽️ When2Eat — 美食轉盤推薦平臺

一個幫助選擇困難症的我們,快速決定「今天要吃什麼」的可愛小工具✨  
透過直覺的操作介面與輕鬆的互動體驗,只要轉動轉盤,就能幫你選出下一餐的美味去處!

---

## 🧭 專案簡介

**When2Eat** 是一款以「美食推薦」為主題的輕量級網頁應用程式,目標使用者為開發團隊內部小組成員。  
使用者可透過:
- 🍀 **轉盤功能**: 隨機抽選餐廳
- 🍔 **篩選功能**: 依照餐廳分類、價位等 篩選候選清單
- 🌟 **收藏功能**: 收藏喜愛的餐廳,並在轉盤中增加權重,提高中選機率

> 📌 本專案著重於前端互動與 UI/UX 設計,不開放一般校內使用。

---

## 🧰 使用技術

| 項目 | 技術 / 工具 | 說明 |
| --- | --- | --- |
| **前端開發** | **React**, **TypeScript** | 建立網頁介面與互動邏IST |
| **UI 框架** | **Tailwind CSS** | 處理網頁樣式與 RWD |
| **UI 元件** | **shadcn/ui** | 提供基礎 UI 組件 (如 Button) |
| UI/UX 設計 | Figma | 設計網頁版型與互動流程 |
| 後端 (暫不實作) | Django (預留) | 若未來需登入 / 後端運算,可再擴充 |
| API 串接 | Google Map API (規劃中) | 用於顯示餐廳地點 |
| 資料儲存 | React State, LocalStorage (規劃中) | 暫存收藏清單與篩選狀態 |
| 部署平臺 | AWS S3 / Vercel | 以靜態網站形式部署 |

---

## 🚀 專案設定與安裝 (React 版)

本專案已轉型為 React + TypeScript 架構,並使用 Tailwind CSS 進行樣式設計。

### 環境需求
- [Node.js](https://nodejs.org/) (建議 v18 或更高版本)
- npm 或 yarn 套件管理器

### 安裝步驟

1. **Clone 專案**
   ```bash
   git clone [your-repo-url]
   cd Website-Planning

2. **安裝依賴套件**
   ```bash
   npm install
   # 或是
   yarn install

3. **Tailwind CSS 設定**
本專案使用 Tailwind CSS (`index.css` 中包含 `@apply` 語法)。請確保已安裝相關依賴,並在 `package.json` 中有對應的啟動腳本。

* 重要設定檔: `tailwind.config.js`, `postcss.config.js`

4. **啟動開發伺服器** (通常由 Vite 或 Create React App 提供)
   ```bash
   npm run dev
   # 或是
   yarn dev

---

## 🗂️ 功能說明 (依據 App.tsx)

* **🎯 視圖管理 (`viewMode`)**
應用程式可在 `home` (首頁)、`favorites` (收藏列表) 和 `turntable` (轉盤頁) 三種視圖間切換。

* **🍽️ 餐廳分類篩選 (`FiltersPanel`)**
  * 使用者可選擇分類和價位,篩選結果會儲存在 `filters` 狀態中。
  * 按下「套用」後,狀態會更新至 `appliedFilters`,並即時更新 `filteredRestaurants` 列表。
  * 提供 `handleResetFilters` 重設篩選器。

* **❤️ 收藏清單 (`FavoritesList`)**
  * 使用 `handleToggleFavorite` 切換餐廳的 `isFavorite` 狀態。
  * `favoriteRestaurants` 列表會自動更新。
  * 在 `favorites` 視圖中專門顯示收藏列表。

* **🍀 美食轉盤 (`TurntableWheel`)**
轉盤會使用 `filteredRestaurants` (已篩選的餐廳列表) 作為抽選依據。抽選結果透過 `onResult` 回呼,觸發 `handleSpinResult`。

* **🎉 結果彈窗 (`ResultDialog`)
抽中餐廳後 (`selectedRestaurant` 狀態被設定),會彈出 `ResultDialog` 顯示餐廳資訊。可在彈窗中直接切換該餐廳的收藏狀態。

* **📦 非開發前置任務**
  * [X] <s>定義餐廳類別與初始資料</s> (已由 `data/mockRestaurants.ts` 完成)
  * [X] <s>確立色彩主題、LOGO 設計、字體選擇</s> (已由 index.css` 與 `tailwind.config.js` 定義)
  * [ ] 📸 整理餐廳圖片素材 (未來可擴充)[ ] 
  * 📝 撰寫網站文案 (如說明文字、分類標籤)[ ] 
  * 📌 撰寫簡報與展示文件 (供 Demo 使用)

---

## 👥 開發成員
| 成員 | 角色分工 | 技能標籤 |
| --- | --- | --- |
| 黃雨涵 | 系統架構 / 後端開發 / 統籌 | Python、Django (預留)、React、TS、Tailwind |
| 劉至真 | 前端開發 / 文本撰寫 | React、TS、Tailwind CSS |
| 廖苡媃 | UIUX / 素材蒐集 | Figma、非技術支援、素材整理 |

---

## 🌟 未來可能擴充

* `LocalStorage` 儲存: 將 `restaurants` (尤其是 `isFavorite` 狀態) 儲存,避免重整後消失。
* 帳號登入 / 個人化推薦
* 餐廳地點地圖整合 (Google Map)
* AI 推薦對話功能 (Gemini API)
* 資料庫建置與跨裝置收藏同步
