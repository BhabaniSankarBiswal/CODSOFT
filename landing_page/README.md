# InnovateX 2026 – National Hackathon & Technology Festival Landing Page

InnovateX 2026 is a world-class, premium, fully responsive event landing page designed for a national-level technology festival and hackathon. With a dark, futuristic cyberpunk-inspired aesthetic, the design draws students, developers, startup founders, and recruiters alike, looking like an elite industry event rather than a standard internship project.

---

## 🌟 Premium Features

- **Dark Futuristic Visuals**: Rich, harmonious dark colors combined with gradient accents (cyan, purple, magenta) and smooth micro-animations.
- **Glassmorphic UI**: Clean translucent cards utilizing `backdrop-filter: blur()`, subtle borders, and glow borders.
- **Canvas Particle Background**: A high-performance canvas element rendering moving nodes and connections that push away from user hover, automatically pausing offscreen to optimize CPU usage.
- **Interactive Mouse-Following Glows**: Individual card grids listen for cursor movement to draw a bright radial glow matching the mouse coordinates.
- **Animated Statistics Counters**: Intersection Observer-based numeric counters that trigger and animate up on scrolling into view.
- **Interactive Schedule Timeline**: Structured timeline categorized by Day 1, Day 2, and Day 3 tabs with modern styling.
- **AJAX-driven Form Submissions**: Both Registration and Contact forms are fully integrated with [FormSubmit's AJAX API](https://formsubmit.co), using client-side validation and showing custom success/error boxes without raw page redirects.
- **Mobile-First Responsiveness**: Handheld, tablet, laptop, and ultra-wide desktop layouts with a custom CSS hamburger overlay.
- **Strict SEO & Accessibility**: Semantic HTML5 tags, comprehensive meta information, Open Graph tags, and keyboard access attributes.

---

## 📂 Project Structure

```text
landing_page/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── images/
        ├── speaker_ai_expert.png
        ├── speaker_founder.png
        ├── speaker_architect.png
        ├── speaker_cybersec.png
        ├── testimonial_dev.png
        ├── testimonial_founder.png
        ├── testimonial_student.png
        └── testimonial_mentor.png
```

---

## 🚀 Running Locally

You can open the project in any modern web browser.

### Option 1: File Explorer (Static)
1. Navigate to the project root directory.
2. Double-click the `index.html` file to open it directly in your default browser.

### Option 2: Live Server (Recommended)
Running through an HTTP server ensures all assets, custom fonts, icons, and AJAX form submissions run correctly without CORS blocks.

#### Using Python
Run the following terminal command from the root folder:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

#### Using Node.js (npx)
Run the following terminal command:
```bash
npx live-server
```
This automatically boots a local dev server and opens it in your default browser.

---

## 🛠️ Technology Stack
- **Structure**: Semantic HTML5
- **Style**: Custom Vanilla CSS3 (no styling frameworks)
- **Logic**: Vanilla ES6 JavaScript (zero heavy dependencies)
- **Typography**: Space Grotesk & Inter via Google Fonts
- **Icons**: FontAwesome CDN
- **Mock Faces**: Custom professional High-Resolution portraits
