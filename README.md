# Premium Developer Portfolio - Bhabani Sankar Biswal

A world-class, premium personal portfolio website designed for **Bhabani Sankar Biswal** — a Computer Science Engineering student specializing in full-stack, AI, and blockchain systems. This portfolio is engineered to impress top-tier tech recruiters (Google, Microsoft, Amazon, Meta, OpenAI, Nvidia) and drive internship and placement opportunities.

---

## 🚀 Key Features

- **Modern 2026 UI/UX**: Designed using modern visual concepts including glassmorphism, glowing micro-borders, deep shadow configurations, and custom radial-gradients.
- **Full Theme Interactivity**: Persistent dark and light modes toggleable via a custom switcher, backed by browser local storage.
- **Hardware Accelerated Particles Backdrop**: Responsive canvas particle system supporting mouse-gravity attraction and fluid resizing.
- **Dynamic Typewriter**: Loops between high-priority developer specializations matching recruiter searches.
- **Numeric Count-up Stats**: Animated counter widgets ticking up to show Bhabani's CGPA (9.23), project counts, and award milestones.
- **Fully Responsive Grid & Mobile Layout**: Optimized across breakpoints (mobile, tablet, desktop, ultrawide viewports) with a slide-out drawer menu.
- **Detailed Project Cards & Modals**: Signature showcase (ASPIRE_PLAN, AgroTech, TaskTide) complete with problem statement, solutions, outcomes, and code repositories.
- **Interactive CV Preview**: Sleek code-editor styled CV layout showing education highlights and leadership roles.
- **Accessible & SEO Ready**: Structured using semantic HTML5, screen-reader friendly ARIA tags, JSON-LD Person Schema, and descriptive meta properties.

---

## 🛠️ Technology Stack

- **Structure**: Semantic HTML5 markup
- **Styling**: Vanilla CSS3 (Custom design system with custom properties/variables, flexbox, CSS grids)
- **Logistics & Interactivity**: Native Vanilla JavaScript (ES6+, Intersection Observer API, Canvas API)
- **Dependencies**: **Zero** external libraries or frameworks (No React, Tailwind, Bootstrap, or jQuery) to ensure maximum speed and a 95+ Lighthouse score.

---

## 📂 Project Structure

```
portfolio/
├── index.html          # Core content structure, SEO parameters & Schema
├── css/
│   └── style.css       # Layouts, variables, transitions & keyframe effects
├── js/
│   └── script.js       # Theme switcher, particle systems, metrics & validation
├── assets/
│   ├── images/
│   │   └── profile.jpg # Professional headshot photo
│   ├── icons/          # Inline custom SVG paths inside HTML
│   └── resume/         # Location to hold the printable resume PDF
└── README.md           # Documentation guide
```

---

## ⚙️ Setup & Execution Instructions

This portfolio is fully self-contained and does not require a build process.

### Method 1: Local Server (Recommended for Testing API behaviors and absolute asset routing)
1. Navigate to the project root folder:
   ```bash
   cd portfolio
   ```
2. Launch a lightweight HTTP server using `npx`:
   ```bash
   npx -y http-server
   ```
3. Open the highlighted local URL (usually `http://localhost:8080`) in your browser.

### Method 2: Direct Execution
1. Double-click the `index.html` file in your system file explorer to open it instantly inside any modern browser.

---

## 🔧 Customization Guidelines

### Adding/Modifying Typewriter Roles
To change the skills rotating on the hero page, modify the string array inside [script.js](file:///C:/Users/bhaba/Desktop/CodSoft/portfolio/js/script.js#L111):
```javascript
const roles = [
  'Full Stack Developer',
  'AI & RAG Developer',
  'Blockchain Developer',
  'Computer Science Student',
  'ISIH Winner (2024 & 2025)'
];
```

### Adding New Projects
1. Add a new card block inside `index.html` with a descriptive category tag:
   ```html
   <div class="project-card glass-panel reveal-fade-up" data-categories="your-tag">
      ...
   </div>
   ```
2. Append your project parameters inside the `projectDetailsStore` object in `script.js` to enable detail modals:
   ```javascript
   your_project_key: {
     title: "Project Title",
     type: "Sub-Type",
     problem: "Challenge Description",
     solution: "How you resolved it",
     features: ["Feature 1", "Feature 2"],
     tech: "HTML, CSS, JS",
     github: "https://github.com/...",
     live: "https://..."
   }
   ```

### Customizing the Profile Photo
Replace the file `assets/images/profile.jpg` with your own cropped professional square headshot.
