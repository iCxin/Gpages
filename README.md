# 🌌 创意个人主页 / Creative Personal Homepage

[简体中文](#简体中文) | [English](#english) | [繁體中文](#繁體中文)

---

<a name="简体中文"></a>
## 简体中文

一个基于 React 和 Matter.js 构建的高度交互式、物理驱动的个人主页。本项目拥有独特的“重力掉落”界面，所有的 UI 组件（如个人简介、技能标签、社交链接）都会像真实物体一样受到重力影响、发生碰撞并响应用户的拖拽操作，背景则是动态且沉浸的极客风格星空。

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

### ✨ 核心特性

- **物理引擎驱动 UI**: 所有的核心元素（头像、技能栈、社交按钮）都是物理实体，使用 [Matter.js](https://brm.io/matter-js/) 引擎模拟真实的掉落、堆叠和碰撞效果。
- **沉浸式环境**:
  - **3D 星空**: 基于 HTML5 Canvas 实现的具有景深感和闪烁效果的 3D 星空，包含流星划过。
  - **动态光照**: 交互式月亮，带有大气光晕和漂浮的云层。
  - **极光特效**: 细腻的 CSS 动画极光背景。
- **丰富的交互**:
  - **自由拖拽**: 页面上的元素可以随意拖拽和投掷。
  - **弹幕诗歌**: 顾名思义。
  - **右键菜单**: 自定义右键菜单，可快速进行设置（如开关弹幕、刷新）。
- **响应式设计**: 智能适应各种屏幕尺寸，并带有边界管理，防止元素飞出屏幕。
- **极客装饰**: 背景包含巨大的实时时钟和漂浮的代码符号，营造开发者专属的审美氛围。

### 🛠 技术栈

- **核心框架**: [React 18](https://reactjs.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **物理引擎**: [Matter.js](https://brm.io/matter-js/)
- **样式设计**: CSS3 (包含 Glassmorphism 玻璃拟态, 关键帧动画, Flexbox/Grid 布局)
- **性能优化**: 代码分割 (Code Splitting), 懒加载 (Lazy Loading), `will-change` 渲染优化。

### 🚀 快速开始

#### 环境要求

- Node.js (v14 或更高版本)
- npm 或 yarn

#### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/iCxin/Gpages.git
   cd Gpages
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

### 📂 项目结构

```
src/
├── components/
│   ├── MainContent.jsx    # 核心物理容器 & 元素渲染
│   ├── Starfield.jsx      # 3D 星空 Canvas 动画
│   ├── BackgroundDecor.jsx# 巨大时钟 & 漂浮代码符号
│   ├── Moon.jsx           # 交互式月亮组件
│   ├── Aurora.jsx         # CSS 极光背景
│   ├── Clouds.jsx         # 漂浮云层
│   ├── Danmaku.jsx        # 弹幕诗歌
│   ├── ContextMenu.jsx    # 自定义右键菜单
│   └── Footer.jsx         # 网站底部备案栏
├── data.js                # 配置文件 (技能、链接、内容)
├── App.jsx                # 应用主入口
└── index.css              # 全局样式 & 动画定义
```

### 🎨 个性化定制

你可以通过修改 `src/data.js` 轻松自定义内容：
- **`allSkills`**: 添加或删除技术栈条目（图标、颜色、名称）。
- **`config`**: 更新社交链接和项目作品条目。
- **`poems`**: 修改弹幕诗歌中显示的文本内容。

### 📄 许可证

本项目开源并基于 [MIT License](LICENSE) 许可证发布。

---

<a name="english"></a>
## English

A highly interactive, physics-based personal homepage built with React and Matter.js. This project features a unique "falling elements" interface where UI components respond to gravity, collisions, and user interaction, set against a dynamic, immersive backdrop.

### ✨ Key Features

- **Physics-Driven UI**: All main elements (profile, skills, social links) are physical bodies that fall, stack, and interact using the [Matter.js](https://brm.io/matter-js/) physics engine.
- **Immersive Environment**:
  - **3D Starfield**: A depth-aware, twinkling starfield with meteor showers implemented via HTML5 Canvas.
  - **Dynamic Lighting**: Interactive moon with atmospheric glow and floating clouds.
  - **Aurora Effect**: Subtle, animated aurora borealis background.
- **Interactive Elements**:
  - Drag and drop any element on the screen.
  - "Danmaku" (bullet screen) comment system with toggle control.
  - Context menu for quick access to settings.
- **Responsive Design**: Adapts to various screen sizes with intelligent boundary management.
- **Geeky Decor**: Background features a giant real-time clock and floating code symbols for a developer-centric aesthetic.

### 🛠 Tech Stack

- **Core**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Physics Engine**: [Matter.js](https://brm.io/matter-js/)
- **Styling**: CSS3 with modern features (Glassmorphism, Animations, Flexbox/Grid)
- **Performance**: Optimized with code splitting, lazy loading, and `will-change` properties.

### 🚀 Getting Started

#### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-homepage.git
   cd personal-homepage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### 📂 Project Structure

```
src/
├── components/
│   ├── MainContent.jsx    # Core physics container & element rendering
│   ├── Starfield.jsx      # 3D starfield canvas animation
│   ├── BackgroundDecor.jsx# Giant clock & floating symbols
│   ├── Moon.jsx           # Interactive moon component
│   ├── Aurora.jsx         # CSS-based aurora background
│   ├── Clouds.jsx         # Floating cloud layers
│   ├── Danmaku.jsx        # Bullet screen comment system
│   ├── ContextMenu.jsx    # Custom right-click menu
│   └── Footer.jsx         # Site footer
├── data.js                # Configuration for skills, links, and content
├── App.jsx                # Main application entry
└── index.css              # Global styles & animations
```

### 🎨 Customization

You can easily customize the content by modifying `src/data.js`:
- **`allSkills`**: Add or remove tech stack items (icons, colors, names).
- **`config`**: Update social links and project entries.
- **`poems`**: Change the text displayed in the Danmaku system.

### 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<a name="繁體中文"></a>
## 繁體中文

一個基於 React 和 Matter.js 構建的高度交互式、物理驅動的個人主頁。本項目擁有獨特的「重力掉落」界面，所有的 UI 組件（如個人簡介、技能標籤、社交連結）都會像真實物體一樣受到重力影響、發生碰撞並響應用戶的拖拽操作，背景則是動態且沉浸的極客風格星空。

### ✨ 核心特性

- **物理引擎驅動 UI**: 所有的核心元素（頭像、技能棧、社交按鈕）都是物理實體，使用 [Matter.js](https://brm.io/matter-js/) 引擎模擬真實的掉落、堆疊和碰撞效果。
- **沉浸式環境**:
  - **3D 星空**: 基於 HTML5 Canvas 實現的具有景深感和閃爍效果的 3D 星空，包含流星劃過。
  - **動態光照**: 交互式月亮，帶有大氣光暈和漂浮的雲層。
  - **極光特效**: 細膩的 CSS 動畫極光背景。
- **豐富的交互**:
  - **自由拖拽**: 頁面上的元素可以隨意拖拽和投擲。
  - **彈幕系統**: 內置「彈幕」評論系統，支持開關控制，增加互動感。
  - **右鍵菜單**: 自定義右鍵菜單，可快速進行設置（如開關彈幕、刷新）。
- **響應式設計**: 智能適應各種屏幕尺寸，並帶有邊界管理，防止元素飛出屏幕。
- **極客裝飾**: 背景包含巨大的實時時鐘和漂浮的代碼符號，營造開發者專屬的審美氛圍。

### 🛠 技術棧

- **核心框架**: [React 18](https://reactjs.org/)
- **構建工具**: [Vite](https://vitejs.dev/)
- **物理引擎**: [Matter.js](https://brm.io/matter-js/)
- **樣式設計**: CSS3 (包含 Glassmorphism 玻璃擬態, 關鍵幀動畫, Flexbox/Grid 佈局)
- **性能優化**: 代碼分割 (Code Splitting), 懶加載 (Lazy Loading), `will-change` 渲染優化。

### 🚀 快速開始

#### 環境要求

- Node.js (v14 或更高版本)
- npm 或 yarn

#### 安裝步驟

1. **克隆倉庫**
   ```bash
   git clone https://github.com/yourusername/personal-homepage.git
   cd personal-homepage
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發服務器**
   ```bash
   npm run dev
   ```

4. **構建生產版本**
   ```bash
   npm run build
   ```

### 📂 項目結構

```
src/
├── components/
│   ├── MainContent.jsx    # 核心物理容器 & 元素渲染
│   ├── Starfield.jsx      # 3D 星空 Canvas 動畫
│   ├── BackgroundDecor.jsx# 巨大時鐘 & 漂浮代碼符號
│   ├── Moon.jsx           # 交互式月亮組件
│   ├── Aurora.jsx         # CSS 極光背景
│   ├── Clouds.jsx         # 漂浮雲層
│   ├── Danmaku.jsx        # 彈幕評論系統
│   ├── ContextMenu.jsx    # 自定義右鍵菜單
│   └── Footer.jsx         # 網站底部備案欄
├── data.js                # 配置文件 (技能、連結、內容)
├── App.jsx                # 應用主入口
└── index.css              # 全局樣式 & 動畫定義
```

### 🎨 個性化定製

你可以通過修改 `src/data.js` 輕鬆自定義內容：
- **`allSkills`**: 添加或刪除技術棧條目（圖標、顏色、名稱）。
- **`config`**: 更新社交連結和項目作品條目。
- **`poems`**: 修改彈幕系統中顯示的文本內容。

### 📄 許可證

本項目開源並基於 [MIT License](LICENSE) 許可證發布。

---

> 🤖 **Note / 说明**: 
> 本文档多语言版本由 **Gemini 3 Pro** 翻译生成。
> Multilingual versions of this document were translated and generated by **Gemini 3 Pro**.
> 本文檔多語言版本由 **Gemini 3 Pro** 翻譯生成。
