import { useEffect } from "react";

/* ─────────────────────────────────────────────
   Heart of Insomnia — Editorial Magazine Page
   Drop-in replacement for CaseStudyLayout.
   All styles are injected into <head> once on
   mount and cleaned up on unmount.
───────────────────────────────────────────── */

const HOI_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap');

.hoi-root *, .hoi-root *::before, .hoi-root *::after { margin:0; padding:0; box-sizing:border-box; }

.hoi-root {
  --cream: #f8f5f0;
  --off-white: #faf9f7;
  --warm-grey: #e8e4de;
  --mid-grey: #b8b0a5;
  --dark: #1a1814;
  --charcoal: #2d2b28;
  --red: #8b1a1a;
  --red-light: #a52020;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'EB Garamond', Georgia, serif;
  --font-ui: 'Inter', sans-serif;
  background: var(--off-white);
  color: var(--dark);
  font-family: var(--font-body);
  line-height: 1.7;
  overflow-x: hidden;
}

/* ── STICKY NAV ── */
.hoi-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 3rem;
  background: rgba(250,249,247,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(184,176,165,0.25);
  transition: box-shadow 0.3s;
}
.hoi-nav.scrolled { box-shadow: 0 2px 20px rgba(26,24,20,0.06); }
.hoi-nav-back {
  font-family: var(--font-ui);
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--mid-grey);
  text-decoration: none;
  transition: color 0.2s;
}
.hoi-nav-back:hover { color: var(--red); }
.hoi-nav-back::before { content: '← '; }
.hoi-nav-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: var(--charcoal);
  opacity: 0;
  transition: opacity 0.4s;
}
.hoi-nav-title.visible { opacity: 1; }
.hoi-nav-year {
  font-family: var(--font-ui);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--mid-grey);
}

/* ── REVEAL ANIMATIONS ── */
.hoi-reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1);
}
.hoi-reveal.visible { opacity: 1; transform: translateY(0); }
.hoi-reveal-slow { opacity: 0; transition: opacity 1.4s ease; }
.hoi-reveal-slow.visible { opacity: 1; }

/* ── SECTION LABEL ── */
.hoi-label {
  font-family: var(--font-ui);
  font-size: 0.62rem;
  font-weight: 400;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.hoi-label::after {
  content: '';
  flex: 1;
  max-width: 48px;
  height: 1px;
  background: var(--red);
  opacity: 0.4;
}

/* ── HERO ── */
.hoi-hero {
  height: 100vh;
  min-height: 640px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 0 0 8vh 0;
}
.hoi-hero-media {
  position: absolute;
  inset: 0;
  background: var(--dark);
  overflow: hidden;
}
.hoi-hero-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #1a1814 0%, #2d2520 40%, #1a1814 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.hoi-hero-placeholder-inner {
  text-align: center;
  opacity: 0.15;
  color: var(--cream);
  font-family: var(--font-ui);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.hoi-hero-placeholder-inner::before {
  content: '';
  display: block;
  width: 80px; height: 80px;
  border: 1px solid currentColor;
  border-radius: 50%;
  margin: 0 auto 1rem;
}
.hoi-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(26,24,20,0.82) 0%, rgba(26,24,20,0.3) 50%, rgba(26,24,20,0.1) 100%);
}
.hoi-hero img.hoi-hero-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.72;
  animation: hoiHeroZoom 10s ease forwards;
}
@keyframes hoiHeroZoom {
  from { transform: scale(1.08); }
  to   { transform: scale(1.0); }
}
.hoi-hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 8vw;
}
.hoi-hero-eyebrow {
  font-family: var(--font-ui);
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--red-light);
  margin-bottom: 1.4rem;
  opacity: 0;
  animation: hoiFadeUp 0.8s 0.4s ease forwards;
}
.hoi-hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-weight: 700;
  color: var(--cream);
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin-bottom: 1.8rem;
  opacity: 0;
  animation: hoiFadeUp 1s 0.6s ease forwards;
}
.hoi-hero-title em {
  font-style: italic;
  color: rgba(248,245,240,0.72);
}
.hoi-hero-sub {
  max-width: 540px;
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  color: rgba(248,245,240,0.72);
  line-height: 1.6;
  margin-bottom: 2.4rem;
  opacity: 0;
  animation: hoiFadeUp 1s 0.9s ease forwards;
}
.hoi-hero-meta {
  display: flex;
  gap: 3rem;
  opacity: 0;
  animation: hoiFadeUp 1s 1.2s ease forwards;
}
.hoi-hero-meta-item {
  font-family: var(--font-ui);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(248,245,240,0.45);
}
.hoi-hero-meta-item strong {
  display: block;
  font-weight: 400;
  color: rgba(248,245,240,0.72);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  margin-bottom: 0.15rem;
}
.hoi-hero-scroll {
  position: absolute;
  bottom: 2.5rem; right: 8vw;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  opacity: 0;
  animation: hoiFadeIn 1s 1.8s ease forwards;
}
.hoi-hero-scroll span {
  font-family: var(--font-ui);
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(248,245,240,0.4);
  writing-mode: vertical-rl;
}
.hoi-scroll-line {
  width: 1px; height: 60px;
  background: rgba(248,245,240,0.3);
  position: relative;
  overflow: hidden;
}
.hoi-scroll-line::after {
  content: '';
  position: absolute;
  top: -100%; left: 0;
  width: 100%; height: 100%;
  background: var(--red-light);
  animation: hoiScrollDrop 2s 2s cubic-bezier(.4,0,.2,1) infinite;
}
@keyframes hoiScrollDrop {
  0%   { top: -100%; }
  100% { top: 200%; }
}
@keyframes hoiFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes hoiFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── IMAGE / VIDEO PLACEHOLDERS ── */
.hoi-img-placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #e8e4de 0%, #d4cfc8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
}
.hoi-img-placeholder span {
  font-family: var(--font-ui);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mid-grey);
}

/* ── EDITORIAL MEDIA ── */
.hoi-editorial-media {
  width: 100%; aspect-ratio: 4/3;
  background: var(--warm-grey);
  overflow: hidden;
  cursor: zoom-in;
  position: relative;
}
.hoi-editorial-media img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(.16,1,.3,1);
  display: block;
}
.hoi-editorial-media:hover img { transform: scale(1.06); }

/* ── SECTION 2 — EXPERIENCE ── */
.hoi-experience {
  padding: 12vh 0;
  background: var(--cream);
}
.hoi-experience-header {
  padding: 0 8vw;
  margin-bottom: 8vh;
}
.hoi-experience-header h2 {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.15;
  color: var(--charcoal);
  max-width: 640px;
}
.hoi-editorial-grid {
  padding: 0 6vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.hoi-editorial-item { position: relative; overflow: hidden; }
.hoi-editorial-item:nth-child(1) { grid-column: 1 / 2; grid-row: 1 / 3; }
.hoi-editorial-item:nth-child(2) { grid-column: 2 / 3; grid-row: 1 / 2; }
.hoi-editorial-item:nth-child(3) { grid-column: 2 / 3; grid-row: 2 / 3; }
.hoi-editorial-item:nth-child(4) { grid-column: 1 / 3; grid-row: 3 / 4; }
.hoi-editorial-item:nth-child(1) .hoi-editorial-media { aspect-ratio: 3/4; }
.hoi-editorial-item:nth-child(4) .hoi-editorial-media { aspect-ratio: 16/7; }
.hoi-caption {
  margin-top: 0.9rem;
  font-family: var(--font-ui);
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: var(--mid-grey);
  line-height: 1.5;
}
.hoi-caption-num {
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  color: var(--red);
  margin-right: 0.8rem;
}

/* ── SECTION 3 — PROBLEM ── */
.hoi-problem {
  padding: 16vh 0;
  background: var(--off-white);
}
.hoi-problem-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8vw;
  padding: 0 8vw;
  align-items: center;
}
.hoi-problem-text h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 3rem);
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 2rem;
  color: var(--charcoal);
}
.hoi-problem-text p {
  font-family: var(--font-body);
  font-size: 1.08rem;
  color: #5a5650;
  line-height: 1.85;
  margin-bottom: 1.4rem;
}

/* ── PULL QUOTE ── */
.hoi-pullquote {
  padding: 12vh 8vw;
  background: var(--dark);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.hoi-pullquote::before {
  content: '"';
  position: absolute;
  top: -0.15em; left: 6vw;
  font-family: var(--font-display);
  font-size: 22rem;
  color: rgba(255,255,255,0.03);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.hoi-pullquote blockquote {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 4rem);
  font-weight: 400;
  font-style: italic;
  color: var(--cream);
  line-height: 1.25;
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.hoi-pullquote cite {
  display: block;
  margin-top: 2rem;
  font-family: var(--font-ui);
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--red-light);
  font-style: normal;
}

/* ── SECTION 4 — INTERACTION ── */
.hoi-interaction { padding: 14vh 0; background: var(--cream); }
.hoi-interaction-intro {
  padding: 0 8vw;
  margin-bottom: 8vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8vw;
  align-items: end;
}
.hoi-interaction-intro h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.8rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--charcoal);
}
.hoi-interaction-intro p { font-size: 1rem; color: #6a6460; line-height: 1.8; }
.hoi-sensor-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  padding: 0 6vw;
}
.hoi-sensor-media {
  overflow: hidden;
  background: var(--warm-grey);
  cursor: zoom-in;
  position: relative;
}
.hoi-sensor-grid > div:nth-child(1) .hoi-sensor-media { aspect-ratio: 4/5; }
.hoi-sensor-grid > div:nth-child(2) .hoi-sensor-media { aspect-ratio: 3/4; }
.hoi-sensor-grid > div:nth-child(3) .hoi-sensor-media { aspect-ratio: 3/4; }
.hoi-sensor-media img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.7s cubic-bezier(.16,1,.3,1);
}
.hoi-sensor-media:hover img { transform: scale(1.06); }
.hoi-sensor-caption {
  margin-top: 0.8rem;
  font-family: var(--font-ui);
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  color: var(--mid-grey);
  line-height: 1.5;
}
.hoi-stats {
  padding: 8vh 8vw 0;
  display: flex;
  gap: 5vw;
}
.hoi-stat {
  flex: 1;
  border-top: 1px solid var(--warm-grey);
  padding-top: 1.4rem;
}
.hoi-stat-value {
  font-family: var(--font-display);
  font-size: 2.8rem;
  font-weight: 400;
  color: var(--charcoal);
  line-height: 1;
  margin-bottom: 0.5rem;
}
.hoi-stat-label {
  font-family: var(--font-ui);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--mid-grey);
}

/* ── SECTION 5 — PROCESS ── */
.hoi-process { padding: 14vh 0; background: var(--off-white); }
.hoi-process-header {
  padding: 0 8vw;
  margin-bottom: 8vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 8vw;
}
.hoi-process-header h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3.4rem);
  font-weight: 500;
  font-style: italic;
  line-height: 1.15;
  color: var(--charcoal);
}
.hoi-process-header p { font-size: 0.95rem; color: #6a6460; line-height: 1.8; }
.hoi-process-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0 6vw;
}
.hoi-process-media {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--warm-grey);
  cursor: zoom-in;
  position: relative;
}
.hoi-process-media img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.6s ease;
}
.hoi-process-media:hover img { transform: scale(1.05); }
.hoi-process-caption {
  margin-top: 0.7rem;
  font-family: var(--font-ui);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  color: var(--mid-grey);
}
.hoi-process-caption strong {
  display: block;
  font-weight: 500;
  color: var(--charcoal);
  margin-bottom: 0.2rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ── SECTION 6 — GALLERY ── */
.hoi-gallery { padding: 8vh 0 14vh; background: var(--dark); }
.hoi-gallery-header { padding: 0 8vw 6vh; }
.hoi-gallery-header h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.8rem);
  font-weight: 400;
  color: var(--cream);
  line-height: 1.1;
}
.hoi-gallery-header .hoi-label { color: var(--red-light); }
.hoi-gallery-header .hoi-label::after { background: var(--red-light); }
.hoi-gallery-strip {
  display: flex;
  gap: 1rem;
  padding: 0 6vw;
  margin-bottom: 1rem;
  align-items: stretch;
}
.hoi-g-item {
  overflow: hidden;
  flex-shrink: 0;
  cursor: zoom-in;
  background: #2d2b28;
  position: relative;
}
.hoi-g-item img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.7s ease, opacity 0.3s;
  opacity: 0.88;
}
.hoi-g-item:hover img { transform: scale(1.05); opacity: 1; }
.hoi-gallery-row1 .hoi-g-item:nth-child(1) { width: 55%; height: 420px; }
.hoi-gallery-row1 .hoi-g-item:nth-child(2) { width: 25%; height: 420px; }
.hoi-gallery-row1 .hoi-g-item:nth-child(3) { flex: 1; height: 420px; }
.hoi-gallery-row2 .hoi-g-item:nth-child(1) { width: 30%; height: 340px; }
.hoi-gallery-row2 .hoi-g-item:nth-child(2) { flex: 1; height: 340px; }
.hoi-gallery-row2 .hoi-g-item:nth-child(3) { width: 28%; height: 340px; }
.hoi-dark-placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #1e1c1a 0%, #2d2b28 100%);
  display: flex; align-items: center; justify-content: center;
  position: absolute; inset: 0;
}
.hoi-dark-placeholder span {
  font-family: var(--font-ui);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(248,245,240,0.2);
}

/* ── VIDEO PLACEHOLDER ── */
.hoi-video-placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #1e1c1a 0%, #2d2b28 100%);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 1rem;
  cursor: pointer;
  position: absolute; inset: 0;
}
.hoi-play-btn {
  width: 56px; height: 56px;
  border: 1px solid rgba(248,245,240,0.4);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.2s, background 0.2s;
}
.hoi-play-btn::after {
  content: '';
  border: solid rgba(248,245,240,0.7);
  border-width: 8px 0 8px 14px;
  border-color: transparent transparent transparent rgba(248,245,240,0.7);
  margin-left: 3px;
}
.hoi-video-placeholder:hover .hoi-play-btn {
  border-color: var(--red-light);
  background: rgba(139,26,26,0.15);
}
.hoi-video-label {
  font-family: var(--font-ui);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(248,245,240,0.35);
}

/* ── SECTION 7 — TECHNICAL ── */
.hoi-technical {
  padding: 14vh 0;
  background: var(--cream);
  border-top: 1px solid var(--warm-grey);
}
.hoi-technical-header {
  padding: 0 8vw 6vh;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}
.hoi-technical-header h2 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.5vw, 2.6rem);
  font-weight: 400;
  color: var(--charcoal);
}
.hoi-toggle-btn {
  font-family: var(--font-ui);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mid-grey);
  cursor: pointer;
  background: none;
  border: 1px solid var(--warm-grey);
  padding: 0.6rem 1.2rem;
  transition: border-color 0.2s, color 0.2s;
}
.hoi-toggle-btn:hover { border-color: var(--red); color: var(--red); }
.hoi-docs-content {
  padding: 0 8vw;
  max-height: 0;
  overflow: hidden;
  transition: max-height 1.2s cubic-bezier(.4,0,.2,1);
}
.hoi-docs-content.open { max-height: 4000px; }
.hoi-docs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem 8vw;
  padding-bottom: 6vh;
}
.hoi-doc-block h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--charcoal);
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--warm-grey);
}
.hoi-doc-block p {
  font-size: 0.92rem;
  color: #6a6460;
  line-height: 1.8;
  margin-bottom: 0.8rem;
}
.hoi-doc-block ul { list-style: none; margin: 0.6rem 0; }
.hoi-doc-block ul li {
  font-size: 0.88rem;
  color: #6a6460;
  padding: 0.3rem 0;
  border-bottom: 1px solid rgba(232,228,222,0.6);
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
}
.hoi-doc-block ul li::before {
  content: '—';
  color: var(--red);
  font-size: 0.7rem;
  flex-shrink: 0;
}
.hoi-tag-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.8rem; }
.hoi-tag {
  font-family: var(--font-ui);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--warm-grey);
  color: var(--mid-grey);
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .hoi-nav { padding: 1rem 1.5rem; }
  .hoi-hero-content { padding: 0 6vw; }
  .hoi-editorial-grid { grid-template-columns: 1fr; gap: 1rem; }
  .hoi-editorial-item:nth-child(1),
  .hoi-editorial-item:nth-child(2),
  .hoi-editorial-item:nth-child(3),
  .hoi-editorial-item:nth-child(4) { grid-column: 1; grid-row: auto; }
  .hoi-editorial-item:nth-child(1) .hoi-editorial-media { aspect-ratio: 4/3; }
  .hoi-editorial-item:nth-child(4) .hoi-editorial-media { aspect-ratio: 4/3; }
  .hoi-problem-inner { grid-template-columns: 1fr; gap: 4vh; }
  .hoi-interaction-intro { grid-template-columns: 1fr; gap: 3vh; }
  .hoi-sensor-grid { grid-template-columns: 1fr 1fr; }
  .hoi-sensor-grid > div:nth-child(1) { grid-column: 1 / 3; }
  .hoi-process-header { grid-template-columns: 1fr; gap: 3vh; }
  .hoi-process-grid { grid-template-columns: 1fr 1fr; }
  .hoi-gallery-strip { flex-direction: column; }
  .hoi-gallery-row1 .hoi-g-item,
  .hoi-gallery-row2 .hoi-g-item { width: 100% !important; height: 260px !important; }
  .hoi-docs-grid { grid-template-columns: 1fr; gap: 2rem; }
  .hoi-stats { flex-direction: column; gap: 2vh; }
  .hoi-technical-header { flex-direction: column; }
}
@media (max-width: 600px) {
  .hoi-hero-title { font-size: 3rem; }
  .hoi-hero-meta { gap: 2rem; flex-wrap: wrap; }
  .hoi-process-grid { grid-template-columns: 1fr; }
  .hoi-sensor-grid { grid-template-columns: 1fr; }
  .hoi-sensor-grid > div:nth-child(1) { grid-column: 1; }
}
`;

/* ─── Placeholder components ─── */
function ImgPlaceholder({ label, dark = false }) {
  return (
    <div
      style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        background: dark
          ? "linear-gradient(135deg,#1e1c1a 0%,#2d2b28 100%)"
          : "linear-gradient(135deg,#e8e4de 0%,#d4cfc8 100%)",
      }}
    >
      <span style={{
        fontFamily: "var(--font-ui)", fontSize: "0.62rem",
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: dark ? "rgba(248,245,240,0.2)" : "var(--mid-grey)",
      }}>{label}</span>
    </div>
  );
}

function VideoPlaceholder({ label }) {
  return (
    <div className="hoi-video-placeholder">
      <div className="hoi-play-btn" />
      <span className="hoi-video-label">{label}</span>
    </div>
  );
}

/* ─── Main component ─── */
export default function HeartOfInsomnia() {
  /* Inject scoped styles */
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "hoi-styles";
    styleEl.textContent = HOI_STYLES;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  /* Scroll animations */
  useEffect(() => {
    const nav = document.getElementById("hoi-nav");
    const navTitle = document.getElementById("hoi-nav-title");
    const hero = document.getElementById("hoi-hero");

    const onScroll = () => {
      if (!hero || !nav || !navTitle) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom < 80) {
        navTitle.classList.add("visible");
        nav.classList.add("scrolled");
      } else {
        navTitle.classList.remove("visible");
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const reveals = document.querySelectorAll(".hoi-reveal, .hoi-reveal-slow");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const toggleDocs = () => {
    const content = document.getElementById("hoi-docs");
    const btn = document.getElementById("hoi-toggle-btn");
    const isOpen = content.classList.toggle("open");
    btn.textContent = isOpen ? "Collapse Documentation" : "Expand Documentation";
  };

  return (
    <div className="hoi-root">

      {/* ── NAV ── */}
      <nav className="hoi-nav" id="hoi-nav">
        <a href="/play" className="hoi-nav-back">Play</a>
        <span className="hoi-nav-title" id="hoi-nav-title">Heart of Insomnia</span>
        <span className="hoi-nav-year">2024</span>
      </nav>

      {/* ══ SECTION 1 — HERO ══ */}
      <section className="hoi-hero" id="hoi-hero">
        <div className="hoi-hero-media" aria-hidden="true">
          <div className="hoi-hero-placeholder">
            <div className="hoi-hero-placeholder-inner">
              hero.jpg
            </div>
          </div>
          {/* Replace placeholder with real assets: */}
          {/* <img className="hoi-hero-img" src="/src/assets/hero.jpg" alt="Heart of Insomnia installation" /> */}
          {/* Or video: <video autoPlay muted loop playsInline className="hoi-hero-img" style={{objectFit:"cover",width:"100%",height:"100%"}}><source src="/src/assets/hero.mp4" type="video/mp4"/></video> */}
        </div>

        <div className="hoi-hero-content">
          <p className="hoi-hero-eyebrow">Interactive Installation · 2024</p>
          <h1 className="hoi-hero-title">Heart of<br /><em>Insomnia</em></h1>
          <p className="hoi-hero-sub">
            An interactive installation exploring loneliness, validation, and emotional dependency in digital spaces — where a like becomes a heartbeat.
          </p>
          <div className="hoi-hero-meta">
            <div className="hoi-hero-meta-item"><strong>Medium</strong>Physical + Digital</div>
            <div className="hoi-hero-meta-item"><strong>Tools</strong>p5.js, Arduino</div>
            <div className="hoi-hero-meta-item"><strong>Type</strong>Thesis Installation</div>
          </div>
        </div>

        <div className="hoi-hero-scroll" aria-hidden="true">
          <div className="hoi-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ══ SECTION 2 — FINAL EXPERIENCE ══ */}
      <section className="hoi-experience">
        <div className="hoi-experience-header hoi-reveal">
          <p className="hoi-label">Final Experience</p>
          <h2>The installation, as it lives<br />and breathes in the world.</h2>
        </div>

        <div className="hoi-editorial-grid">
          {[
            { file: "gallery1.jpg", caption: "The installation responding to human proximity.", num: "01", delay: "0s" },
            { file: "gallery2.jpg", caption: "Digital validation translated into physical interaction.", num: "02", delay: "0.1s" },
            { file: "gallery3.jpg", caption: "Heart-shaped ripple reacting in real time.", num: "03", delay: "0.2s" },
            { file: "gallery4.jpg", caption: "Users instinctively interacting with the system.", num: "04", delay: "0.15s" },
          ].map(({ file, caption, num, delay }) => (
            <div className="hoi-editorial-item hoi-reveal" key={num} style={{ transitionDelay: delay }}>
              <div className="hoi-editorial-media">
                <ImgPlaceholder label={file} />
                {/* <img src={`/src/assets/${file}`} alt={caption} loading="lazy" style={{position:"relative",zIndex:1}} /> */}
              </div>
              <p className="hoi-caption"><span className="hoi-caption-num">{num}</span>{caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 3 — THE PROBLEM ══ */}
      <section className="hoi-problem">
        <div className="hoi-problem-inner">
          <div className="hoi-problem-text hoi-reveal">
            <p className="hoi-label">The Problem</p>
            <h2>Emotion, quantified and<br />reduced to a number.</h2>
            <p>Social platforms quantify attention through likes, views, and reactions. Over time, emotional reassurance becomes tied to numbers rather than meaningful connection.</p>
            <p>People increasingly seek emotional comfort through digital feedback loops — a pattern that feels invisible yet shapes how we relate to ourselves and each other.</p>
          </div>
          <div className="hoi-reveal" style={{ transitionDelay: "0.15s" }}>
            <div className="hoi-editorial-media" style={{ aspectRatio: "3/4", height: "100%" }}>
              <ImgPlaceholder label="problem.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <div className="hoi-pullquote hoi-reveal-slow">
        <blockquote>"What happens when<br />validation becomes physical?"</blockquote>
        <cite>Heart of Insomnia — Core Question</cite>
      </div>

      {/* ══ SECTION 4 — INTERACTION ══ */}
      <section className="hoi-interaction">
        <div className="hoi-interaction-intro">
          <div className="hoi-reveal">
            <p className="hoi-label">Interaction System</p>
            <h2>Proximity.<br />Ripple.<br />Presence.</h2>
          </div>
          <div className="hoi-reveal" style={{ transitionDelay: "0.12s" }}>
            <p>An ultrasonic sensor detects human proximity and triggers expanding heart-shaped ripples rendered in p5.js. Sound transforms the interaction into something visceral — something felt, not merely seen.</p>
          </div>
        </div>

        <div className="hoi-sensor-grid">
          {[
            { file: "ripple.jpg",   caption: "Responsive visuals expand as viewers approach the work." },
            { file: "sensor.jpg",   caption: "Ultrasonic sensing triggers emotional feedback." },
            { file: "p5screen.jpg", caption: "Sound transforms interaction into emotional presence." },
          ].map(({ file, caption }, i) => (
            <div className="hoi-reveal" key={file} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="hoi-sensor-media">
                <ImgPlaceholder label={file} />
              </div>
              <p className="hoi-sensor-caption">{caption}</p>
            </div>
          ))}
        </div>

        <div className="hoi-stats">
          {[
            { val: "3",   lbl: "Proximity Zones" },
            { val: "∞",   lbl: "Ripple Iterations" },
            { val: "1:1", lbl: "Human–System Dialogue" },
            { val: "♥",   lbl: "Core Visual Form" },
          ].map(({ val, lbl }, i) => (
            <div className="hoi-stat hoi-reveal" key={lbl} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="hoi-stat-value">{val}</div>
              <div className="hoi-stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 5 — PROCESS ══ */}
      <section className="hoi-process">
        <div className="hoi-process-header">
          <div className="hoi-reveal">
            <p className="hoi-label">Process &amp; Iteration</p>
            <h2>Failures that<br /><em>led somewhere true.</em></h2>
          </div>
          <div className="hoi-reveal" style={{ transitionDelay: "0.1s" }}>
            <p>Early versions felt mechanical and emotionally distant. Replacing synthetic sounds with recorded audio created a more immersive response. Interaction zones were simplified to make engagement feel effortless and intuitive.</p>
          </div>
        </div>

        <div className="hoi-process-grid">
          {[
            { file: "process1.jpg", title: "Blender Prototype",  desc: "Early 3D modelling of the heart form before digital rendering." },
            { file: "process2.jpg", title: "Interaction Test",   desc: "Testing sensor range and ripple trigger zones." },
            { file: "process3.jpg", title: "Coding Process",     desc: "p5.js visual rendering and Arduino serial communication." },
            { file: "process4.jpg", title: "Failed Iteration",   desc: "Version two — too cold, too mechanical. Abandoned." },
            { file: "process5.jpg", title: "Sound Design",       desc: "Replacing synthetic tones with organic heartbeat recordings." },
            { file: "process6.jpg", title: "Installation Setup", desc: "Final physical arrangement of hardware and projection surface." },
          ].map(({ file, title, desc }, i) => (
            <div className="hoi-reveal" key={file} style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
              <div className="hoi-process-media">
                <ImgPlaceholder label={file} />
              </div>
              <p className="hoi-process-caption"><strong>{title}</strong>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 6 — GALLERY WALL ══ */}
      <section className="hoi-gallery">
        <div className="hoi-gallery-header hoi-reveal">
          <p className="hoi-label">Gallery</p>
          <h2>The work, in full.</h2>
        </div>

        <div className="hoi-gallery-strip hoi-gallery-row1 hoi-reveal">
          <div className="hoi-g-item"><ImgPlaceholder label="gallery-a.jpg" dark /></div>
          <div className="hoi-g-item"><ImgPlaceholder label="gallery-b.jpg" dark /></div>
          <div className="hoi-g-item"><VideoPlaceholder label="process.mp4" /></div>
        </div>

        <div className="hoi-gallery-strip hoi-gallery-row2 hoi-reveal">
          <div className="hoi-g-item"><ImgPlaceholder label="gallery-c.jpg" dark /></div>
          <div className="hoi-g-item"><ImgPlaceholder label="gallery-d.jpg" dark /></div>
          <div className="hoi-g-item"><VideoPlaceholder label="final.mp4" /></div>
        </div>
      </section>

      {/* ══ SECTION 7 — TECHNICAL DOCUMENTATION ══ */}
      <section className="hoi-technical" id="hoi-technical">
        <div className="hoi-technical-header">
          <div>
            <p className="hoi-label">Section 07</p>
            <h2>Technical Documentation</h2>
          </div>
          <button className="hoi-toggle-btn" id="hoi-toggle-btn" onClick={toggleDocs}>
            Expand Documentation
          </button>
        </div>

        <div className="hoi-docs-content" id="hoi-docs">
          <div className="hoi-docs-grid">

            <div className="hoi-doc-block">
              <h3>Project Overview</h3>
              <p>Heart of Insomnia is an interactive installation that translates the psychology of digital validation into a physical, sensory experience. Visitors interact with a large projection displaying a heart-shaped ripple system that responds to their proximity.</p>
              <p>The piece explores how social media attention metrics have restructured emotional dependency, making the invisible mechanics of validation feel tangible and embodied.</p>
            </div>

            <div className="hoi-doc-block">
              <h3>Technical Stack</h3>
              <ul>
                <li>p5.js — generative visual rendering and animation</li>
                <li>Arduino Uno — microcontroller and sensor interface</li>
                <li>HC-SR04 Ultrasonic Sensor — proximity detection</li>
                <li>Serial communication — Arduino to browser bridge</li>
                <li>Web Audio API — spatial and reactive sound design</li>
                <li>Blender — 3D concept prototyping</li>
              </ul>
            </div>

            <div className="hoi-doc-block">
              <h3>Interaction Design</h3>
              <p>The ultrasonic sensor continuously measures the distance between the viewer and the installation. This distance maps to three distinct proximity zones, each triggering different ripple intensities, colours, and audio feedback.</p>
              <ul>
                <li>Zone 1 (far) — slow, faint ripples, ambient sound</li>
                <li>Zone 2 (mid) — faster ripples, mid-intensity audio</li>
                <li>Zone 3 (close) — rapid expansion, deep heartbeat sound</li>
              </ul>
            </div>

            <div className="hoi-doc-block">
              <h3>Visual System</h3>
              <p>The heart-shaped ripple is drawn parametrically using p5.js. Each ripple is an expanding bezier curve that fades over time, creating a layered, ghosted visual effect. Colour temperature shifts from cool blue at distance to warm crimson up close.</p>
              <p>The animation runs at 60fps and is fully responsive to sensor input with under 40ms latency.</p>
            </div>

            <div className="hoi-doc-block">
              <h3>Sound Design</h3>
              <p>Sound was a critical iteration point. Synthetic tones in early versions felt clinical. Replacing them with processed recordings of actual heartbeats, layered with ambient breath, created the emotional resonance the installation required.</p>
              <ul>
                <li>Layered heartbeat recordings (processed in Audacity)</li>
                <li>Ambient breath and room tone</li>
                <li>Panning and spatial audio based on viewer position</li>
                <li>Volume and tempo tied to proximity zone</li>
              </ul>
            </div>

            <div className="hoi-doc-block">
              <h3>Installation Notes</h3>
              <p>The installation was designed for a darkened gallery space of approximately 4m × 4m. The projection surface is 2m wide, positioned at eye level. The ultrasonic sensor is mounted subtly below the projection, hidden within the housing.</p>
              <p>Optimal viewing and interaction distance is 0.5m – 3m from the projection surface.</p>
              <div className="hoi-tag-list">
                {["Physical Computing","Generative Art","Social Commentary","Thesis Work","p5.js","Arduino","Sound Design","Interactive"].map(t => (
                  <span className="hoi-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
