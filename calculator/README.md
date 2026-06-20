# DevCalc Pro 🚀
> A premium, dark futuristic, fully responsive developer-oriented calculator application. Designed and built with a premium glassmorphic aesthetic, custom key transition animations, persistent calculations history, and physical keyboard mapping.

---

## ✨ Features

- **Modern Glassmorphic UI**: High-fidelity dark mode backdrop with neon glow elements, frosted overlays, and clean Google Fonts typography.
- **Intuitive Calculations display**: Dual display configuration to isolate current calculations and live result outputs separately.
- **Persistent History Log**: Local storage integrated side-drawer displaying history of equations. Click any history tile to load it back into the active panel.
- **Dual Themes**: Smoothly transition between dark futuristic neon and light crystal themes. Keeps preference saved across reloads.
- **Tactile Micro-Animations**: Active hover, press states, and keyboard-activated scales to match native physical buttons.
- **Total Physical Keyboard Bindings**: Work effortlessly with standard keys (`0-9`, `.`, `+`, `-`, `*`, `/`, `%`, `Enter`, `Backspace`, `Escape`).
- **Precision Floating Point & Safety Handling**: Corrects JavaScript arithmetic errors (like `0.1 + 0.2`) and catches mathematical issues (like dividing by zero).

---

## ⌨️ Keyboard Shortcuts

| Calculator Button | Physical Keyboard Key | Function |
|:---|:---|:---|
| **`0` – `9`** | `0` – `9` | Appends numbers to active expression |
| **`.`** | `.` | Inserts decimal point |
| **`+`** | `+` | Add operator |
| **`-`** | `-` | Subtract operator |
| **`×`** | `*` | Multiply operator |
| **`÷`** | `/` | Divide operator |
| **`%`** | `%` | Percentage operator |
| **`=`** | `Enter` or `=` | Evaluates current equation |
| **`⌫`** | `Backspace` | Deletes last character |
| **`C`** | `Escape` or `C` | Clears display and expression |

---

## 🛠️ Technology Stack

- **Structure**: Semantic HTML5 markup
- **Style**: Custom CSS variables, responsive Grid/Flexbox, dynamic animations, and `@media` queries
- **Logic**: Vanilla ES6 JavaScript (No external frameworks or libraries)
- **Typography & Icons**: Google Fonts (Outfit & Roboto Mono) and inline SVGs

---

## 📂 Project Structure

```text
calculator/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
└── README.md
```

---

## 🎨 Design Philosophy
DevCalc Pro aligns with modern SaaS design guidelines:
- **Depth**: Glass layers with border saturation and multiple floating blur spheres.
- **Color Consistency**: Uses Cyan to Purple gradients for active action triggers (`=`).
- **Tactility**: Pressing a key scales it down (`transform: scale(0.92)`). Pressing physical keys flashes corresponding virtual keys.

---

## 👨‍💻 Project Branding
- **Project Name**: `DevCalc Pro`
- **Designed & Developed by**: `Bhabani Sankar Biswal`
