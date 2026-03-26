# 🚀 The Life of a Developer

> An immersive, Awwwards-style interactive storytelling website for the "Life of a Developer" hackathon theme.

## ✨ Features

- **6 Story Sections**: Hero → Learning → Debugging → Deadline → Coffee → Victory
- **Custom Cursor** with lag effect and hover states
- **Boot Loader** with terminal animation
- **Scroll Progress Bar** + Side Navigation Dots
- **Parallax** hero background
- **Interactive Bug-Fix Cards** — click to fix errors
- **Skill Cards** with hover-reveal progress bars
- **Live Countdown Clock** with color-change on critical time
- **Notification Inbox** with dismissible cards
- **Coffee Energy Slider** — controls cup fill, steam, thoughts
- **Achievement Cards** — click to claim
- **Floating Code Particles** + Star field
- **Scroll-triggered reveals** with directional animations
- **Glassmorphism UI** throughout
- **Noise texture overlay** for depth
- **Dark theme** with neon accents

## 🛠 Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lucide React

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Then open `http://localhost:5173`

## 📁 Project Structure

```
life-of-developer/
├── src/
│   ├── components/
│   │   ├── Loader.jsx          # Terminal boot screen
│   │   ├── Navbar.jsx          # Progress bar + nav dots
│   │   ├── CustomCursor.jsx    # Custom cursor with lerp
│   │   ├── HeroSection.jsx     # Full-screen intro
│   │   ├── LearningSection.jsx # Skills + code editor
│   │   ├── DebuggingSection.jsx# Interactive bug fixing
│   │   ├── DeadlineSection.jsx # Chaos mode + countdown
│   │   ├── CoffeeSection.jsx   # Energy slider + cup
│   │   ├── VictorySection.jsx  # Achievements + timeline
│   │   ├── FloatingParticles.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── storyContent.js     # All copy and data
│   ├── hooks/
│   │   └── useScrollAnimations.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

## 🏆 Hackathon Checklist

- ✅ React-based
- ✅ 6 story sections (exceeds required 5)
- ✅ 2+ scroll interactions (parallax + reveals)
- ✅ 3+ interactive elements (bug cards, coffee slider, achievement cards, tabs, notifications)
- ✅ 3+ animations (loader, particles, reveals, hover effects, cup fill)
- ✅ Fully responsive

## 🎨 Design

- **Font**: Syne (display) + JetBrains Mono (code) + DM Sans (body)
- **Colors**: Deep void black, electric cyan `#00d4ff`, plasma purple `#a855f7`, cyber green `#06ffa5`, ember orange `#ff6b35`
- **Style**: Glassmorphism + neon glows + noise overlay + grid backgrounds

---

