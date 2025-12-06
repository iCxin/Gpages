# 🌌 Creative Personal Homepage / 创意个人主页

A highly interactive, physics-based personal homepage built with React and Matter.js. This project features a unique "falling elements" interface where UI components respond to gravity, collisions, and user interaction, set against a dynamic, immersive backdrop.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Key Features

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

## 🛠 Tech Stack

- **Core**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Physics Engine**: [Matter.js](https://brm.io/matter-js/)
- **Styling**: CSS3 with modern features (Glassmorphism, Animations, Flexbox/Grid)
- **Performance**: Optimized with code splitting, lazy loading, and `will-change` properties.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

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

## 📂 Project Structure

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

## 🎨 Customization

You can easily customize the content by modifying `src/data.js`:
- **`allSkills`**: Add or remove tech stack items (icons, colors, names).
- **`config`**: Update social links and project entries.
- **`poems`**: Change the text displayed in the Danmaku system.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
*Created with ❤️ by [Your Name]*
