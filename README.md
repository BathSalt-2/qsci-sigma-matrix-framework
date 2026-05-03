# QSCI — Quantum Intelligence Hub
### Powered by Or4cl3 AI Solutions

> *Ethical. Powerful. Intelligent.*

QSCI is a full-stack quantum-inspired AI intelligence hub — an immersive, visually rich web application built on React + Vite that brings the full PRD to life across five core AI modules, a real-time dashboard, and a conversational AI assistant.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
npm run build   # Production build
npm run preview # Preview build
```

---

## Application Flow

```
Landing Page  →  Loading Screen  →  Dashboard
                                        ↓
                          QCC · ALCI · EOM · NQAM · QTSE · Chat
```

---

## Core Modules

| Module | ID | Description |
|--------|----|-------------|
| Quantum Cognitive Core | `qcc` | Real-time processing visualization, node status, radar performance |
| Adaptive Learning CI | `alci` | Training progress, knowledge mastery, interactive RAG demo |
| Ethical Oversight Module | `eom` | DERE compliance scores, decision log, 30-day audit trend |
| NeuroQuantum Affective Module | `nqam` | Emotional state timeline, EI metrics, distribution analysis |
| Quantum Temporal-Symbolic Engine | `qtse` | Pattern analysis, anomaly detection, scenario projections |
| AI Assistant | `chat` | Contextual conversational interface with module-aware responses |

---

## Tech Stack

- **React 18** + **Vite 5** — Modern component architecture and fast dev/build
- **Tailwind CSS 3** — Utility-first styling with custom quantum theme
- **Recharts 2** — Area, Bar, Line, Radar, Pie chart visualizations
- **Canvas API** — Particle network background system
- **Google Fonts** — Orbitron (headings), Inter (body), JetBrains Mono (code/data)

---

## Structure

```
src/
├── App.jsx                        # State-based page router
├── index.css                      # Global styles, CSS animations, quantum theme
├── components/
│   ├── ParticleBackground.jsx     # Canvas particle network
│   ├── QSCILogo.jsx               # SVG holographic logo with CSS 3D spin
│   ├── LandingPage.jsx            # Entry page with CTA
│   ├── LoadingScreen.jsx          # Boot sequence with progress bar
│   ├── Sidebar.jsx                # Navigation sidebar
│   ├── Dashboard.jsx              # Main hub with widgets + charts
│   ├── ChatInterface.jsx          # AI assistant chat
│   └── sections/
│       ├── QCC.jsx
│       ├── ALCI.jsx
│       ├── EOM.jsx
│       ├── NQAM.jsx
│       └── QTSE.jsx
```

---

*QSCI v2.1 · Or4cl3 AI Solutions · PRD v1.0*
