# 🍽️ What2Eat — 北大美食轉盤推薦平臺

> **Stop Overthinking, Start Eating.** > 別再糾結，直接開動！

**What2Eat** 是一個專為 **國立臺北大學（NTPU）** 師生打造的美食決策助手。透過直覺的轉盤互動與可愛的 UI 設計，解決每天最讓人頭痛的「午餐吃什麼」難題。

---

## 🧭 功能特色 (Features)

* **⚡ 快速決策 (Decide Now)**
    * **首頁即轉盤**：簡潔的首頁設計，點擊按鈕立即進入篩選流程。
    * **動畫抽籤**：可愛的義大利麵轉盤動畫，模擬抽籤過程。
    * **智慧推薦**：每次抽出 1 間主要餐廳 + 4 間備選餐廳 (Carousel 輪播展示)，提供更多樣的選擇。

* **🍔 精準篩選 (Filters)**
    * 支援依照 **「餐廳類型」** (含健康餐、泰式、火鍋、甜點等 12 種分類)、**「價位」**、**「校門區域（正門/側門/後門）」** 進行多重篩選。

* **❤️ 收藏與詳情 (Favorites & Details)**
    * **我的最愛**：可將喜歡的餐廳加入收藏清單（支援 LocalStorage 儲存，重整不遺失）。
    * **詳細資訊**：提供餐廳評分、評論數、地址與 Google Maps 導航連結。
    * **清單瀏覽**：提供完整的餐廳列表 (Restaurant List)，支援即時關鍵字篩選與詳細資料檢視。

* **📱 響應式設計 (RWD)**
    * 完美支援電腦版與手機版介面。
    * 手機版擁有專屬的粉色系 UI 與優化的觸控體驗。

---

## 🧰 使用技術 (Tech Stack)

| 項目 | 技術 / 工具 |
| --- | --- |
| **核心框架** | **React** (Vite), **TypeScript** |
| **樣式與 RWD** | **Tailwind CSS**, Custom CSS Animations |
| **圖標與素材** | Custom PNG Assets (Food Icons) |
| **資料來源** | Static Mock Data (JSON Array, 130+ 筆餐廳資料) |
| **部署環境** | AWS S3 (Static Website Hosting) |

---

## 🚀 專案設定與安裝

本專案使用 **Vite** 進行建置，請確保您的環境已安裝 Node.js (v18+)。

### 1. Clone 專案
```bash
git clone [your-repo-url]
cd Website-Planning
```

### 2. 安裝依賴套件
```bash
npm install
# 或是
yarn install
```

### 3. 啟動開發伺服器
```bash
npm run dev
# 或是
yarn dev
```
啟動後，請開啟瀏覽器訪問 `http://localhost:5173`。

### 4. 打包部署 (Build)
```bash
npm run build
```
打包後的檔案將位於 dist/ 資料夾中，可直接上傳至靜態網站託管服務。

---

## 👥 開發成員

| 成員   | 角色分工 |
|:------:|:---------:|
| 黃雨涵 | 整體進度掌握 / 使用者體驗優化 / 系統邏輯設計 / Bug 修復 |
| 劉至真 | 前端功能實作 / 網站系統架構設計 |
| 廖苡媃 | 使用者介面設計 / 網站雛型製作 |

