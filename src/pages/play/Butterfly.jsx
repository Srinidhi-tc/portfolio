// ============================================================
// FILE: src/pages/play/ButterflyFeeder.jsx
// PAGE: https://srinidhi-tc.github.io/portfolio/play/butterfly
// BACK BUTTON: window.history.back() — returns to /play thumbnails
// COLOR THEME: earthy green accents on cream/off-white
// ============================================================

import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// ALL STYLES — scoped under .bf-root
// ─────────────────────────────────────────────────────────────
const BF_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,700&family=EB+Garamond:ital,wght@0,400;1,400&family=Inter:wght@300;400;500&display=swap');

.bf-root *, .bf-root *::before, .bf-root *::after { margin:0; padding:0; box-sizing:border-box; }
.bf-root {
  --cream:#f8f5f0; --off-white:#faf9f7; --warm-grey:#e8e4de; --mid-grey:#b8b0a5;
  --dark:#1a1814; --charcoal:#2d2b28;
  --green:#5a7a2a; --green-light:#7a9e3b;
  --font-display:'Playfair Display',Georgia,serif;
  --font-body:'EB Garamond',Georgia,serif;
  --font-ui:'Inter',sans-serif;
  background:var(--off-white); color:var(--dark);
  font-family:var(--font-body); line-height:1.7; overflow-x:hidden;
}

/* ── NAV ── */
.bf-nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:1.2rem 3rem;
  background:rgba(250,249,247,0.92); backdrop-filter:blur(12px);
  border-bottom:1px solid rgba(184,176,165,0.25); transition:box-shadow 0.3s;
}
.bf-nav.scrolled { box-shadow:0 2px 20px rgba(26,24,20,0.06); }

/* BACK BUTTON — plain button styled as text link */
.bf-nav-back {
  font-family:var(--font-ui); font-size:0.72rem; letter-spacing:0.18em;
  text-transform:uppercase; color:var(--mid-grey);
  background:none; border:none; cursor:pointer; padding:0;
  transition:color 0.2s;
}
.bf-nav-back::before { content:'← '; }
.bf-nav-back:hover { color:var(--green); }

.bf-nav-title { font-family:var(--font-display); font-size:0.95rem; font-weight:500; color:var(--charcoal); opacity:0; transition:opacity 0.4s; }
.bf-nav-title.visible { opacity:1; }
.bf-nav-year { font-family:var(--font-ui); font-size:0.72rem; letter-spacing:0.12em; color:var(--mid-grey); }

/* ── REVEAL ANIMATIONS ── */
.bf-reveal { opacity:0; transform:translateY(32px); transition:opacity 0.9s cubic-bezier(.16,1,.3,1),transform 0.9s cubic-bezier(.16,1,.3,1); }
.bf-reveal.visible { opacity:1; transform:translateY(0); }
.bf-reveal-slow { opacity:0; transition:opacity 1.4s ease; }
.bf-reveal-slow.visible { opacity:1; }

/* ── SECTION LABEL ── */
.bf-label { font-family:var(--font-ui); font-size:0.62rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--green); margin-bottom:1.2rem; display:flex; align-items:center; gap:1rem; }
.bf-label::after { content:''; flex:1; max-width:48px; height:1px; background:var(--green); opacity:0.4; }

/* ── HERO ── */
.bf-hero { height:100vh; min-height:640px; position:relative; overflow:hidden; display:flex; align-items:flex-end; padding:0 0 8vh 0; }
.bf-hero-media { position:absolute; inset:0; background:var(--dark); overflow:hidden; }
.bf-hero-placeholder { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:linear-gradient(160deg,#141a0e 0%,#1e2a14 40%,#141a0e 100%); }
.bf-hero-placeholder-inner { text-align:center; opacity:0.14; color:var(--cream); font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; }
.bf-hero-placeholder-inner::before { content:''; display:block; width:80px; height:80px; border:1px solid currentColor; border-radius:50%; margin:0 auto 1rem; }
.bf-hero::after { content:''; position:absolute; inset:0; background:linear-gradient(to top,rgba(26,24,20,0.82) 0%,rgba(26,24,20,0.3) 50%,rgba(26,24,20,0.1) 100%); }
.bf-hero-content { position:relative; z-index:2; width:100%; padding:0 8vw; }
.bf-hero-eyebrow { font-family:var(--font-ui); font-size:0.68rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--green-light); margin-bottom:1.4rem; opacity:0; animation:bfFadeUp 0.8s 0.4s ease forwards; }
.bf-hero-title { font-family:var(--font-display); font-size:clamp(3.5rem,9vw,8rem); font-weight:700; color:var(--cream); line-height:0.95; letter-spacing:-0.02em; margin-bottom:1.8rem; opacity:0; animation:bfFadeUp 1s 0.6s ease forwards; }
.bf-hero-title em { font-style:italic; color:rgba(248,245,240,0.72); }
.bf-hero-sub { max-width:540px; font-size:clamp(1rem,1.4vw,1.18rem); color:rgba(248,245,240,0.72); line-height:1.6; margin-bottom:2.4rem; opacity:0; animation:bfFadeUp 1s 0.9s ease forwards; }
.bf-hero-meta { display:flex; gap:3rem; opacity:0; animation:bfFadeUp 1s 1.2s ease forwards; }
.bf-hero-meta-item { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.16em; text-transform:uppercase; color:rgba(248,245,240,0.45); }
.bf-hero-meta-item strong { display:block; font-weight:400; color:rgba(248,245,240,0.72); font-size:0.78rem; letter-spacing:0.08em; margin-bottom:0.15rem; }
.bf-hero-scroll { position:absolute; bottom:2.5rem; right:8vw; z-index:2; display:flex; flex-direction:column; align-items:center; gap:0.6rem; opacity:0; animation:bfFadeIn 1s 1.8s ease forwards; }
.bf-hero-scroll span { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:0.22em; text-transform:uppercase; color:rgba(248,245,240,0.4); writing-mode:vertical-rl; }
.bf-scroll-line { width:1px; height:60px; background:rgba(248,245,240,0.3); position:relative; overflow:hidden; }
.bf-scroll-line::after { content:''; position:absolute; top:-100%; left:0; width:100%; height:100%; background:var(--green-light); animation:bfScrollDrop 2s 2s cubic-bezier(.4,0,.2,1) infinite; }
@keyframes bfScrollDrop { 0%{top:-100%} 100%{top:200%} }
@keyframes bfFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes bfFadeIn { from{opacity:0} to{opacity:1} }

/* ── IMAGE + MEDIA ── */
.bf-img-ph { width:100%;height:100%;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#e8e4de,#d4cfc8); }
.bf-img-ph span { font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--mid-grey); }
.bf-media { width:100%;aspect-ratio:4/3;background:var(--warm-grey);overflow:hidden;cursor:zoom-in;position:relative; }
.bf-media img { width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;transition:transform 0.7s cubic-bezier(.16,1,.3,1); }
.bf-media:hover img { transform:scale(1.06); }

/* ── SECTION 2 GRID ── */
.bf-experience { padding:12vh 0; background:var(--cream); }
.bf-experience-header { padding:0 8vw; margin-bottom:8vh; }
.bf-experience-header h2 { font-family:var(--font-display);font-size:clamp(2.2rem,4vw,3.8rem);font-weight:400;font-style:italic;line-height:1.15;color:var(--charcoal);max-width:640px; }
.bf-editorial-grid { padding:0 6vw;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem; }
.bf-editorial-item { position:relative;overflow:hidden; }
.bf-editorial-item:nth-child(1){grid-column:1/2;grid-row:1/3;}
.bf-editorial-item:nth-child(2){grid-column:2/3;grid-row:1/2;}
.bf-editorial-item:nth-child(3){grid-column:2/3;grid-row:2/3;}
.bf-editorial-item:nth-child(4){grid-column:1/3;grid-row:3/4;}
.bf-editorial-item:nth-child(1) .bf-media{aspect-ratio:3/4;}
.bf-editorial-item:nth-child(4) .bf-media{aspect-ratio:16/7;}
.bf-caption { margin-top:0.9rem;font-family:var(--font-ui);font-size:0.7rem;letter-spacing:0.06em;color:var(--mid-grey);line-height:1.5; }
.bf-caption-num { font-size:0.58rem;letter-spacing:0.2em;color:var(--green);margin-right:0.8rem; }

/* ── SECTION 3 PROBLEM ── */
.bf-problem { padding:16vh 0;background:var(--off-white); }
.bf-problem-inner { display:grid;grid-template-columns:1fr 1fr;gap:8vw;padding:0 8vw;align-items:center; }
.bf-problem-text h2 { font-family:var(--font-display);font-size:clamp(1.8rem,3vw,3rem);font-weight:500;line-height:1.2;margin-bottom:2rem;color:var(--charcoal); }
.bf-problem-text p { font-size:1.08rem;color:#5a5650;line-height:1.85;margin-bottom:1.4rem; }

/* ── PULL QUOTE ── */
.bf-pullquote { padding:12vh 8vw;background:var(--dark);text-align:center;position:relative;overflow:hidden; }
.bf-pullquote::before { content:'"';position:absolute;top:-0.15em;left:6vw;font-family:var(--font-display);font-size:22rem;color:rgba(255,255,255,0.03);line-height:1;pointer-events:none;user-select:none; }
.bf-pullquote blockquote { font-family:var(--font-display);font-size:clamp(1.8rem,4vw,4rem);font-weight:400;font-style:italic;color:var(--cream);line-height:1.25;max-width:820px;margin:0 auto;position:relative;z-index:1; }
.bf-pullquote cite { display:block;margin-top:2rem;font-family:var(--font-ui);font-size:0.68rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--green-light);font-style:normal; }

/* ── SECTION 4 PARAMETRIC ── */
.bf-parametric { padding:14vh 0;background:var(--cream); }
.bf-parametric-intro { padding:0 8vw;margin-bottom:8vh;display:grid;grid-template-columns:1fr 1fr;gap:8vw;align-items:end; }
.bf-parametric-intro h2 { font-family:var(--font-display);font-size:clamp(2rem,4vw,3.8rem);font-weight:700;line-height:1.05;color:var(--charcoal); }
.bf-parametric-intro p { font-size:1rem;color:#6a6460;line-height:1.8; }
.bf-param-grid { display:grid;grid-template-columns:2fr 1fr 1fr;gap:1rem;padding:0 6vw; }
.bf-param-media { overflow:hidden;background:var(--warm-grey);cursor:zoom-in;position:relative; }
.bf-param-grid > div:nth-child(1) .bf-param-media{aspect-ratio:4/5;}
.bf-param-grid > div:nth-child(2) .bf-param-media{aspect-ratio:3/4;}
.bf-param-grid > div:nth-child(3) .bf-param-media{aspect-ratio:3/4;}
.bf-param-media img { width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;transition:transform 0.7s ease; }
.bf-param-media:hover img { transform:scale(1.05); }
.bf-param-caption { margin-top:0.8rem;font-family:var(--font-ui);font-size:0.68rem;letter-spacing:0.05em;color:var(--mid-grey);line-height:1.5; }
.bf-stats { padding:8vh 8vw 0;display:flex;gap:5vw; }
.bf-stat { flex:1;border-top:1px solid var(--warm-grey);padding-top:1.4rem; }
.bf-stat-value { font-family:var(--font-display);font-size:2.8rem;font-weight:400;color:var(--charcoal);line-height:1;margin-bottom:0.5rem; }
.bf-stat-label { font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--mid-grey); }

/* ── SECTION 5 PROCESS ── */
.bf-process { padding:14vh 0;background:var(--off-white); }
.bf-process-header { padding:0 8vw;margin-bottom:8vh;display:grid;grid-template-columns:1fr 1fr;align-items:end;gap:8vw; }
.bf-process-header h2 { font-family:var(--font-display);font-size:clamp(2rem,3.5vw,3.4rem);font-weight:500;font-style:italic;line-height:1.15;color:var(--charcoal); }
.bf-process-header p { font-size:0.95rem;color:#6a6460;line-height:1.8; }
.bf-process-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;padding:0 6vw; }
.bf-process-media { aspect-ratio:4/3;overflow:hidden;background:var(--warm-grey);cursor:zoom-in;position:relative; }
.bf-process-media img { width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;transition:transform 0.6s ease; }
.bf-process-media:hover img { transform:scale(1.05); }
.bf-process-caption { margin-top:0.7rem;font-family:var(--font-ui);font-size:0.66rem;letter-spacing:0.08em;color:var(--mid-grey); }
.bf-process-caption strong { display:block;font-weight:500;color:var(--charcoal);margin-bottom:0.2rem;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em; }

/* ── SECTION 6 GALLERY ── */
.bf-gallery { padding:8vh 0 14vh;background:var(--dark); }
.bf-gallery-header { padding:0 8vw 6vh; }
.bf-gallery-header h2 { font-family:var(--font-display);font-size:clamp(2rem,4vw,3.8rem);font-weight:400;color:var(--cream);line-height:1.1; }
.bf-gallery-header .bf-label { color:var(--green-light); }
.bf-gallery-header .bf-label::after { background:var(--green-light); }
.bf-gallery-strip { display:flex;gap:1rem;padding:0 6vw;margin-bottom:1rem; }
.bf-g-item { overflow:hidden;flex-shrink:0;cursor:zoom-in;background:#2d2b28;position:relative; }
.bf-g-item img { width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;transition:transform 0.7s ease;opacity:0.88; }
.bf-g-item:hover img { transform:scale(1.05);opacity:1; }
.bf-gallery-row1 .bf-g-item:nth-child(1){width:55%;height:420px;}
.bf-gallery-row1 .bf-g-item:nth-child(2){width:25%;height:420px;}
.bf-gallery-row1 .bf-g-item:nth-child(3){flex:1;height:420px;}
.bf-gallery-row2 .bf-g-item:nth-child(1){width:30%;height:340px;}
.bf-gallery-row2 .bf-g-item:nth-child(2){flex:1;height:340px;}
.bf-gallery-row2 .bf-g-item:nth-child(3){width:28%;height:340px;}
.bf-dark-ph { width:100%;height:100%;position:absolute;inset:0;background:linear-gradient(135deg,#1e1c1a,#2d2b28);display:flex;align-items:center;justify-content:center; }
.bf-dark-ph span { font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(248,245,240,0.2); }

/* ── SECTION 7 TECHNICAL ── */
.bf-technical { padding:14vh 0;background:var(--cream);border-top:1px solid var(--warm-grey); }
.bf-technical-header { padding:0 8vw 6vh;display:flex;align-items:baseline;justify-content:space-between;gap:2rem;flex-wrap:wrap; }
.bf-technical-header h2 { font-family:var(--font-display);font-size:clamp(1.6rem,2.5vw,2.6rem);font-weight:400;color:var(--charcoal); }
.bf-toggle-btn { font-family:var(--font-ui);font-size:0.68rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--mid-grey);cursor:pointer;background:none;border:1px solid var(--warm-grey);padding:0.6rem 1.2rem;transition:border-color 0.2s,color 0.2s; }
.bf-toggle-btn:hover { border-color:var(--green);color:var(--green); }
.bf-docs-content { padding:0 8vw;max-height:0;overflow:hidden;transition:max-height 1.2s cubic-bezier(.4,0,.2,1); }
.bf-docs-content.open { max-height:5000px; }
.bf-docs-grid { display:grid;grid-template-columns:1fr 1fr;gap:4rem 8vw;padding-bottom:6vh; }
.bf-doc-block h3 { font-family:var(--font-display);font-size:1.15rem;font-weight:500;color:var(--charcoal);margin-bottom:1rem;padding-bottom:0.6rem;border-bottom:1px solid var(--warm-grey); }
.bf-doc-block p { font-size:0.92rem;color:#6a6460;line-height:1.8;margin-bottom:0.8rem; }
.bf-doc-block ul { list-style:none;margin:0.6rem 0; }
.bf-doc-block ul li { font-size:0.88rem;color:#6a6460;padding:0.3rem 0;border-bottom:1px solid rgba(232,228,222,0.6);display:flex;align-items:baseline;gap:0.8rem; }
.bf-doc-block ul li::before { content:'—';color:var(--green);font-size:0.7rem;flex-shrink:0; }
.bf-tag-list { display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.8rem; }
.bf-tag { font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;padding:0.35rem 0.8rem;border:1px solid var(--warm-grey);color:var(--mid-grey); }

/* ── RESPONSIVE ── */
@media (max-width:900px) {
  .bf-nav{padding:1rem 1.5rem;}
  .bf-editorial-grid{grid-template-columns:1fr;}
  .bf-editorial-item:nth-child(1),.bf-editorial-item:nth-child(2),
  .bf-editorial-item:nth-child(3),.bf-editorial-item:nth-child(4){grid-column:1;grid-row:auto;}
  .bf-editorial-item:nth-child(1) .bf-media,.bf-editorial-item:nth-child(4) .bf-media{aspect-ratio:4/3;}
  .bf-problem-inner,.bf-parametric-intro,.bf-process-header{grid-template-columns:1fr;}
  .bf-param-grid{grid-template-columns:1fr 1fr;}
  .bf-param-grid > div:nth-child(1){grid-column:1/3;}
  .bf-process-grid{grid-template-columns:1fr 1fr;}
  .bf-gallery-strip{flex-direction:column;}
  .bf-gallery-row1 .bf-g-item,.bf-gallery-row2 .bf-g-item{width:100%!important;height:260px!important;}
  .bf-docs-grid{grid-template-columns:1fr;}
  .bf-stats{flex-direction:column;}
}
@media (max-width:600px) {
  .bf-hero-title{font-size:3rem;}
  .bf-process-grid,.bf-param-grid{grid-template-columns:1fr;}
  .bf-param-grid > div:nth-child(1){grid-column:1;}
}
`;

// ─── Reusable grey placeholder box ───
function ImgPh({ label, dark = false }) {
  return (
    <div style={{
      position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
      background: dark ? "linear-gradient(135deg,#1e1c1a,#2d2b28)" : "linear-gradient(135deg,#e8e4de,#d4cfc8)"
    }}>
      <span style={{fontFamily:"var(--font-ui)",fontSize:"0.62rem",letterSpacing:"0.2em",
        textTransform:"uppercase",color: dark ? "rgba(248,245,240,0.2)" : "var(--mid-grey)"}}>{label}</span>
    </div>
  );
}

export default function ButterflyFeeder() {

  // ── Inject + clean up styles ──
  useEffect(() => {
    const el = document.createElement("style");
    el.id = "bf-styles"; el.textContent = BF_STYLES;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // ── Scroll reveal + nav title ──
  useEffect(() => {
    const nav = document.getElementById("bf-nav");
    const navTitle = document.getElementById("bf-nav-title");
    const hero = document.getElementById("bf-hero");
    const onScroll = () => {
      if (!hero||!nav||!navTitle) return;
      const past = hero.getBoundingClientRect().bottom < 80;
      navTitle.classList.toggle("visible", past);
      nav.classList.toggle("scrolled", past);
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);} });
    }, {threshold:0.12, rootMargin:"0px 0px -60px 0px"});
    document.querySelectorAll(".bf-reveal,.bf-reveal-slow").forEach(el => obs.observe(el));
    return () => { window.removeEventListener("scroll",onScroll); obs.disconnect(); };
  }, []);

  // ── Toggle technical docs ──
  const toggleDocs = () => {
    const c = document.getElementById("bf-docs");
    const b = document.getElementById("bf-toggle-btn");
    const open = c.classList.toggle("open");
    b.textContent = open ? "Collapse Documentation" : "Expand Documentation";
  };

  // ── Back to /play thumbnails ──
  const goBack = () => window.history.back();

  return (
    <div className="bf-root">

      {/* ── NAVIGATION ── */}
      <nav className="bf-nav" id="bf-nav">
        <button className="bf-nav-back" onClick={goBack}>Play</button>
        <span className="bf-nav-title" id="bf-nav-title">Butterfly Feeder</span>
        <span className="bf-nav-year">2024</span>
      </nav>

      {/* ══ SECTION 1 — HERO ══ */}
      <section className="bf-hero" id="bf-hero">
        <div className="bf-hero-media" aria-hidden="true">

          {/* ─── PLACEHOLDER: rename your file → bf-hero.jpg
              Move to: src/assets/bf-hero.jpg
              Shows: outdoor shot of butterfly on flower, or the 3D render ─── */}
          <div className="bf-hero-placeholder">
            <div className="bf-hero-placeholder-inner">bf-hero.jpg</div>
          </div>
          {/* <img src="/src/assets/bf-hero.jpg" alt="Butterfly feeder — hero shot"
               style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.72}} /> */}

        </div>
        <div className="bf-hero-content">
          <p className="bf-hero-eyebrow">Parametric Design · 3D Print · 2024</p>
          <h1 className="bf-hero-title">Butterfly<br /><em>Feeder</em></h1>
          <p className="bf-hero-sub">A parametric coneflower feeder designed in Blender using golden ratio proportions — bridging nature, math, and making to support urban pollinators.</p>
          <div className="bf-hero-meta">
            <div className="bf-hero-meta-item"><strong>Tool</strong>Blender + 3D Print</div>
            <div className="bf-hero-meta-item"><strong>Method</strong>Parametric Design</div>
            <div className="bf-hero-meta-item"><strong>Scale</strong>80mm diameter</div>
          </div>
        </div>
        <div className="bf-hero-scroll" aria-hidden="true"><div className="bf-scroll-line" /><span>Scroll</span></div>
      </section>

      {/* ══ SECTION 2 — FINAL DESIGN ══ */}
      <section className="bf-experience">
        <div className="bf-experience-header bf-reveal">
          <p className="bf-label">Final Design</p>
          <h2>A flower built for<br />wings, not just eyes.</h2>
        </div>
        <div className="bf-editorial-grid">

          {/* ─── PLACEHOLDER: rename → bf-final1.jpg
              Shows: top-down view of the finished 21-petal feeder ─── */}
          <div className="bf-editorial-item bf-reveal" style={{transitionDelay:"0s"}}>
            <div className="bf-media"><ImgPh label="bf-final1.jpg" /></div>
            {/* <img src="/src/assets/bf-final1.jpg" alt="Coneflower feeder top view — 21 petals" /> */}
            <p className="bf-caption"><span className="bf-caption-num">01</span>The coneflower feeder — 21 petals, golden ratio proportions.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-final2.jpg
              Shows: close-up of central bowl / sponge area ─── */}
          <div className="bf-editorial-item bf-reveal" style={{transitionDelay:"0.1s"}}>
            <div className="bf-media"><ImgPh label="bf-final2.jpg" /></div>
            {/* <img src="/src/assets/bf-final2.jpg" alt="Central bowl with sugar water sponge" /> */}
            <p className="bf-caption"><span className="bf-caption-num">02</span>Central sugar-water bowl with nectar sponge retainer.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-final3.jpg
              Shows: side angle showing petal tilt at 60° ─── */}
          <div className="bf-editorial-item bf-reveal" style={{transitionDelay:"0.2s"}}>
            <div className="bf-media"><ImgPh label="bf-final3.jpg" /></div>
            {/* <img src="/src/assets/bf-final3.jpg" alt="Petal tilt — butterfly wing clearance" /> */}
            <p className="bf-caption"><span className="bf-caption-num">03</span>Wider landing petals positioned for butterfly wing clearance.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-final4.jpg
              Shows: macro of foot-grip texture lines on petal surface ─── */}
          <div className="bf-editorial-item bf-reveal" style={{transitionDelay:"0.15s"}}>
            <div className="bf-media"><ImgPh label="bf-final4.jpg" /></div>
            {/* <img src="/src/assets/bf-final4.jpg" alt="Foot-grip texture and drain slit detail" /> */}
            <p className="bf-caption"><span className="bf-caption-num">04</span>Foot-grip texture lines and rain drain slit detail.</p>
          </div>

        </div>
      </section>

      {/* ══ SECTION 3 — THE PROBLEM ══ */}
      <section className="bf-problem">
        <div className="bf-problem-inner">
          <div className="bf-problem-text bf-reveal">
            <p className="bf-label">The Problem</p>
            <h2>Pollinators are<br />disappearing from cities.</h2>
            <p>Butterflies and bees are vital pollinators — but habitat loss and urban sprawl have dramatically reduced their presence. In cities, they have few places to feed.</p>
            <p>This project designs a parametric feeder shaped like a yellow coneflower, with a central bowl for sugar water and a sponge to let pollinators drink safely without drowning.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-problem.jpg
              Shows: butterfly on real coneflower in nature ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0.15s"}}>
            <div className="bf-media" style={{aspectRatio:"3/4",height:"100%"}}><ImgPh label="bf-problem.jpg" /></div>
            {/* <img src="/src/assets/bf-problem.jpg" alt="Butterfly feeding on real coneflower" /> */}
          </div>
        </div>
      </section>

      <div className="bf-pullquote bf-reveal-slow">
        <blockquote>"Designed not just to look like a flower —<br />but to be one."</blockquote>
        <cite>Butterfly Feeder — Design Intent</cite>
      </div>

      {/* ══ SECTION 4 — PARAMETRIC SYSTEM ══ */}
      <section className="bf-parametric">
        <div className="bf-parametric-intro">
          <div className="bf-reveal">
            <p className="bf-label">Parametric System</p>
            <h2>Golden ratio.<br />Fibonacci.<br />Nature.</h2>
          </div>
          <div className="bf-reveal" style={{transitionDelay:"0.12s"}}>
            <p>Petal count (13 → 21), length (25mm → 40mm), and width follow Fibonacci numbers and golden ratio proportions (40/25 = 1.6). The bowl diameter of 21mm was derived from the 80mm flower using a 1:3.8 ratio. These choices mimic real flower growth patterns and visual harmony.</p>
          </div>
        </div>
        <div className="bf-param-grid">

          {/* ─── PLACEHOLDER: rename → bf-flower2.jpg
              Shows: Blender top-down view of Flower 2 (21 petals) ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0s"}}>
            <div className="bf-param-media"><ImgPh label="bf-flower2.jpg" /></div>
            {/* <img src="/src/assets/bf-flower2.jpg" alt="Flower 2 — 21 petals Blender top view" /> */}
            <p className="bf-param-caption">Flower 2 — 21 petals, tighter 17.14° golden spiral arrangement.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-flower1.jpg
              Shows: Blender top-down view of Flower 1 (13 petals) ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0.1s"}}>
            <div className="bf-param-media"><ImgPh label="bf-flower1.jpg" /></div>
            {/* <img src="/src/assets/bf-flower1.jpg" alt="Flower 1 — 13 petals Blender view" /> */}
            <p className="bf-param-caption">Flower 1 — 13 petals, realistic 27.69° rotation spacing.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-disk.jpg
              Shows: Blender view of oval vs circle disk comparison ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0.2s"}}>
            <div className="bf-param-media"><ImgPh label="bf-disk.jpg" /></div>
            {/* <img src="/src/assets/bf-disk.jpg" alt="Food disc — oval vs circle parametric comparison" /> */}
            <p className="bf-param-caption">Food disc: oval vs circle, drain slit, fly-foot grips.</p>
          </div>

        </div>
        <div className="bf-stats">
          {[{val:"1:1.6",lbl:"Golden Ratio"},{val:"21",lbl:"Petals (Fibonacci)"},{val:"40mm",lbl:"Petal Length"},{val:"60°",lbl:"Petal Tilt"}].map(({val,lbl},i) => (
            <div className="bf-stat bf-reveal" key={lbl} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="bf-stat-value">{val}</div>
              <div className="bf-stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 5 — PROCESS ══ */}
      <section className="bf-process">
        <div className="bf-process-header">
          <div className="bf-reveal">
            <p className="bf-label">Process &amp; Iteration</p>
            <h2>From math to<br /><em>something that lands.</em></h2>
          </div>
          <div className="bf-reveal" style={{transitionDelay:"0.1s"}}>
            <p>The petal rotation logic took multiple attempts. Early 3D prints failed due to uneven spacing. The bowl needed multiple iterations to hold the sponge snugly. Petals required printing separately and gluing for structural support.</p>
          </div>
        </div>
        <div className="bf-process-grid">

          {/* ─── PLACEHOLDER: rename → bf-proc1.jpg
              Shows: single petal + disk unit modelled in Blender ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0s"}}>
            <div className="bf-process-media"><ImgPh label="bf-proc1.jpg" /></div>
            {/* <img src="/src/assets/bf-proc1.jpg" alt="Single petal and bowl unit in Blender" /> */}
            <p className="bf-process-caption"><strong>Petal + Disk Base</strong>Single petal and bowl unit modelled first in Blender.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-proc2.jpg
              Shows: Blender Array modifier settings panel ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0.1s"}}>
            <div className="bf-process-media"><ImgPh label="bf-proc2.jpg" /></div>
            {/* <img src="/src/assets/bf-proc2.jpg" alt="Blender Array modifier — radial petal arrangement" /> */}
            <p className="bf-process-caption"><strong>Radial Array</strong>Array modifier used to parametrically rotate petals around Z-axis.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-proc3.jpg
              Shows: guiding measurement lines on disk and petal ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0.2s"}}>
            <div className="bf-process-media"><ImgPh label="bf-proc3.jpg" /></div>
            {/* <img src="/src/assets/bf-proc3.jpg" alt="Guiding measurement lines on disk and petal" /> */}
            <p className="bf-process-caption"><strong>Guiding Lines</strong>Measurement guides for disk radius and petal length.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-proc4.jpg
              Shows: butterfly positioned on petal, wing clearance arrows ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0s"}}>
            <div className="bf-process-media"><ImgPh label="bf-proc4.jpg" /></div>
            {/* <img src="/src/assets/bf-proc4.jpg" alt="Butterfly positioned at petal base — wing clearance study" /> */}
            <p className="bf-process-caption"><strong>Wing Space Study</strong>Petals positioned at base to give butterflies landing clearance.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-proc5.jpg
              Shows: Blender close-up of de-aligned petal points ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0.1s"}}>
            <div className="bf-process-media"><ImgPh label="bf-proc5.jpg" /></div>
            {/* <img src="/src/assets/bf-proc5.jpg" alt="De-aligned petal points for naturalistic mimicry" /> */}
            <p className="bf-process-caption"><strong>Naturalistic Mimicry</strong>De-aligning a few petal points to mimic organic flower irregularity.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bf-proc6.jpg
              Shows: UV-reactive paint research / sunflower UV comparison ─── */}
          <div className="bf-reveal" style={{transitionDelay:"0.2s"}}>
            <div className="bf-process-media"><ImgPh label="bf-proc6.jpg" /></div>
            {/* <img src="/src/assets/bf-proc6.jpg" alt="UV vision research — what butterfly sees vs human" /> */}
            <p className="bf-process-caption"><strong>UV Future Iteration</strong>UV-reactive paint zones planned for butterfly UV vision attraction.</p>
          </div>

        </div>
      </section>

      {/* ══ SECTION 6 — GALLERY ══ */}
      <section className="bf-gallery">
        <div className="bf-gallery-header bf-reveal">
          <p className="bf-label">Gallery</p>
          <h2>The feeder, in full.</h2>
        </div>

        <div className="bf-gallery-strip bf-gallery-row1 bf-reveal">
          {/* ─── PLACEHOLDER: rename → bf-gal-a.jpg — wide hero gallery shot ─── */}
          <div className="bf-g-item"><ImgPh label="bf-gal-a.jpg" dark /></div>
          {/* <img src="/src/assets/bf-gal-a.jpg" alt="Gallery — full feeder shot" /> */}

          {/* ─── PLACEHOLDER: rename → bf-gal-b.jpg — portrait detail shot ─── */}
          <div className="bf-g-item"><ImgPh label="bf-gal-b.jpg" dark /></div>
          {/* <img src="/src/assets/bf-gal-b.jpg" alt="Gallery — petal detail portrait" /> */}

          {/* ─── PLACEHOLDER: rename → bf-gal-c.jpg — Blender render or 3D print photo ─── */}
          <div className="bf-g-item"><ImgPh label="bf-gal-c.jpg" dark /></div>
          {/* <img src="/src/assets/bf-gal-c.jpg" alt="Gallery — 3D print or Blender render" /> */}
        </div>

        <div className="bf-gallery-strip bf-gallery-row2 bf-reveal">
          {/* ─── PLACEHOLDER: rename → bf-gal-d.jpg ─── */}
          <div className="bf-g-item"><ImgPh label="bf-gal-d.jpg" dark /></div>
          {/* ─── PLACEHOLDER: rename → bf-gal-e.jpg ─── */}
          <div className="bf-g-item"><ImgPh label="bf-gal-e.jpg" dark /></div>
          {/* ─── PLACEHOLDER: rename → bf-gal-f.jpg ─── */}
          <div className="bf-g-item"><ImgPh label="bf-gal-f.jpg" dark /></div>
        </div>
      </section>

      {/* ══ SECTION 7 — TECHNICAL DOCUMENTATION ══ */}
      <section className="bf-technical">
        <div className="bf-technical-header">
          <div><p className="bf-label">Section 07</p><h2>Technical Documentation</h2></div>
          <button className="bf-toggle-btn" id="bf-toggle-btn" onClick={toggleDocs}>Expand Documentation</button>
        </div>
        <div className="bf-docs-content" id="bf-docs">
          <div className="bf-docs-grid">
            <div className="bf-doc-block">
              <h3>Project Overview</h3>
              <p>A parametric coneflower feeder designed in Blender to attract and support butterflies and bees in urban environments. The feeder holds a sugar-water soaked sponge in a central bowl and provides landing petals scaled for pollinator use.</p>
              <p>Two parametric variants: Yellow Coneflower (13 petals, realistic) and Creative Parametric version (21 petals, golden spiral).</p>
            </div>
            <div className="bf-doc-block">
              <h3>Parametric Dimensions</h3>
              <ul>
                <li>Petal Length: 25mm → 40mm</li>
                <li>Petal Width: 10mm → 16mm (1:2.5 ratio)</li>
                <li>Petal Count: 13 → 21 (Fibonacci)</li>
                <li>Petal Rotation: 27.69° → 17.14°</li>
                <li>Bowl Diameter: ~12mm → 21mm</li>
                <li>Bowl Depth: ~5mm → 7mm</li>
                <li>Flower Diameter: 50-60mm → 80mm</li>
                <li>Petal Angle: 45° → 60° outward</li>
              </ul>
            </div>
            <div className="bf-doc-block">
              <h3>Design Features</h3>
              <ul>
                <li>Nectar Sponge Retainer — 1mm inner lip × 2mm high</li>
                <li>Landing Grip Texture — 0.5mm micro-embossed steps on petals</li>
                <li>Central Feeding Marker — 0.5mm concentric rings, 3mm spacing</li>
                <li>Modular Base Connector — Ø10mm snap-fit for fences or pots</li>
                <li>Rain Drain Slit — 1mm vertical slit on bowl edge</li>
              </ul>
            </div>
            <div className="bf-doc-block">
              <h3>Tools &amp; Process</h3>
              <ul>
                <li>Blender — parametric 3D modelling with Array modifiers</li>
                <li>Array Modifier — radial petal rotation and scaling</li>
                <li>Boolean Operations — bowl extrusion and bevelling</li>
                <li>Cura — slicing for 3D printing</li>
                <li>PLA filament — yellow (coneflower), red (lantana)</li>
              </ul>
              <div className="bf-tag-list">
                {["Parametric Design","Blender","3D Printing","Golden Ratio","Fibonacci","Urban Ecology","Pollinators","PLA"].map(t=><span className="bf-tag" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
