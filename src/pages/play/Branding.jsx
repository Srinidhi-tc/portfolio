// ============================================================
// FILE: src/pages/play/BadmintonPlan.jsx
// PAGE: https://srinidhi-tc.github.io/portfolio/play/branding
// BACK BUTTON: window.history.back() — returns to /play thumbnails
// COLOR THEME: black background, gold accents (matching the brand)
// ============================================================

import { useEffect } from "react";

const BP_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,700&family=EB+Garamond:ital,wght@0,400;1,400&family=Inter:wght@300;400;500&display=swap');

.bp-root *, .bp-root *::before, .bp-root *::after { margin:0; padding:0; box-sizing:border-box; }
.bp-root {
  --cream:#f8f5f0; --off-white:#faf9f7; --warm-grey:#e8e4de; --mid-grey:#b8b0a5;
  --dark:#13110e; --charcoal:#2d2b28;
  --gold:#c9a84c; --gold-light:#e8c96b;
  --font-display:'Playfair Display',Georgia,serif;
  --font-body:'EB Garamond',Georgia,serif;
  --font-ui:'Inter',sans-serif;
  background:var(--off-white); color:var(--dark);
  font-family:var(--font-body); line-height:1.7; overflow-x:hidden;
}

/* ── NAV — dark gold themed ── */
.bp-nav {
  position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:1.2rem 3rem;
  background:rgba(19,17,14,0.94); backdrop-filter:blur(12px);
  border-bottom:1px solid rgba(201,168,76,0.2); transition:box-shadow 0.3s;
}
.bp-nav.scrolled { box-shadow:0 2px 20px rgba(13,11,8,0.4); }

/* BACK BUTTON */
.bp-nav-back {
  font-family:var(--font-ui); font-size:0.72rem; letter-spacing:0.18em;
  text-transform:uppercase; color:rgba(201,168,76,0.6);
  background:none; border:none; cursor:pointer; padding:0; transition:color 0.2s;
}
.bp-nav-back::before { content:'← '; }
.bp-nav-back:hover { color:var(--gold); }

.bp-nav-title { font-family:var(--font-display); font-size:0.95rem; font-weight:500; color:var(--gold-light); opacity:0; transition:opacity 0.4s; }
.bp-nav-title.visible { opacity:1; }
.bp-nav-year { font-family:var(--font-ui); font-size:0.72rem; letter-spacing:0.12em; color:rgba(201,168,76,0.4); }

/* ── REVEAL ANIMATIONS ── */
.bp-reveal { opacity:0; transform:translateY(32px); transition:opacity 0.9s cubic-bezier(.16,1,.3,1),transform 0.9s cubic-bezier(.16,1,.3,1); }
.bp-reveal.visible { opacity:1; transform:translateY(0); }
.bp-reveal-slow { opacity:0; transition:opacity 1.4s ease; }
.bp-reveal-slow.visible { opacity:1; }

/* ── GOLD SECTION LABEL ── */
.bp-label { font-family:var(--font-ui); font-size:0.62rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--gold); margin-bottom:1.2rem; display:flex; align-items:center; gap:1rem; }
.bp-label::after { content:''; flex:1; max-width:48px; height:1px; background:var(--gold); opacity:0.4; }

/* ── HERO — full dark, gold text ── */
.bp-hero { height:100vh; min-height:640px; position:relative; overflow:hidden; display:flex; align-items:flex-end; padding:0 0 8vh 0; background:var(--dark); }
.bp-hero-media { position:absolute; inset:0; overflow:hidden; }
.bp-hero-placeholder { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:linear-gradient(160deg,#13110e 0%,#1e1a10 40%,#13110e 100%); }
.bp-hero-placeholder-inner { text-align:center; opacity:0.14; color:var(--gold); font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; }
.bp-hero-placeholder-inner::before { content:''; display:block; width:80px; height:80px; border:1px solid currentColor; border-radius:50%; margin:0 auto 1rem; }
.bp-hero::after { content:''; position:absolute; inset:0; background:linear-gradient(to top,rgba(13,11,8,0.92) 0%,rgba(13,11,8,0.3) 60%,rgba(13,11,8,0.1) 100%); }
.bp-hero::before { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(to right,transparent,var(--gold),transparent); z-index:3; }
.bp-hero-content { position:relative; z-index:2; width:100%; padding:0 8vw; }
.bp-hero-eyebrow { font-family:var(--font-ui); font-size:0.68rem; letter-spacing:0.28em; text-transform:uppercase; color:var(--gold); margin-bottom:1.4rem; opacity:0; animation:bpFadeUp 0.8s 0.4s ease forwards; }
.bp-hero-title { font-family:var(--font-display); font-size:clamp(3.5rem,9vw,8rem); font-weight:700; color:var(--cream); line-height:0.95; letter-spacing:-0.02em; margin-bottom:1.8rem; opacity:0; animation:bpFadeUp 1s 0.6s ease forwards; }
.bp-hero-title em { font-style:italic; color:var(--gold-light); }
.bp-hero-sub { max-width:540px; font-size:clamp(1rem,1.4vw,1.18rem); color:rgba(248,245,240,0.65); line-height:1.6; margin-bottom:2.4rem; opacity:0; animation:bpFadeUp 1s 0.9s ease forwards; }
.bp-hero-meta { display:flex; gap:3rem; opacity:0; animation:bpFadeUp 1s 1.2s ease forwards; }
.bp-hero-meta-item { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.16em; text-transform:uppercase; color:rgba(201,168,76,0.45); }
.bp-hero-meta-item strong { display:block; font-weight:400; color:var(--gold-light); font-size:0.78rem; letter-spacing:0.08em; margin-bottom:0.15rem; }
.bp-hero-scroll { position:absolute; bottom:2.5rem; right:8vw; z-index:2; display:flex; flex-direction:column; align-items:center; gap:0.6rem; opacity:0; animation:bpFadeIn 1s 1.8s ease forwards; }
.bp-hero-scroll span { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:0.22em; text-transform:uppercase; color:rgba(201,168,76,0.4); writing-mode:vertical-rl; }
.bp-scroll-line { width:1px; height:60px; background:rgba(201,168,76,0.2); position:relative; overflow:hidden; }
.bp-scroll-line::after { content:''; position:absolute; top:-100%; left:0; width:100%; height:100%; background:var(--gold); animation:bpScrollDrop 2s 2s cubic-bezier(.4,0,.2,1) infinite; }
@keyframes bpScrollDrop { 0%{top:-100%} 100%{top:200%} }
@keyframes bpFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes bpFadeIn { from{opacity:0} to{opacity:1} }

/* ── IMAGE MEDIA ── */
.bp-media { width:100%;aspect-ratio:4/3;background:var(--warm-grey);overflow:hidden;cursor:zoom-in;position:relative; }
.bp-media img { width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;transition:transform 0.7s cubic-bezier(.16,1,.3,1); }
.bp-media:hover img { transform:scale(1.06); }

/* ── SECTIONS 2-6 same grid pattern as HeartOfInsomnia ── */
.bp-experience { padding:12vh 0;background:var(--cream); }
.bp-experience-header { padding:0 8vw;margin-bottom:8vh; }
.bp-experience-header h2 { font-family:var(--font-display);font-size:clamp(2.2rem,4vw,3.8rem);font-weight:400;font-style:italic;line-height:1.15;color:var(--charcoal);max-width:640px; }
.bp-editorial-grid { padding:0 6vw;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem; }
.bp-editorial-item { position:relative;overflow:hidden; }
.bp-editorial-item:nth-child(1){grid-column:1/2;grid-row:1/3;}
.bp-editorial-item:nth-child(2){grid-column:2/3;grid-row:1/2;}
.bp-editorial-item:nth-child(3){grid-column:2/3;grid-row:2/3;}
.bp-editorial-item:nth-child(4){grid-column:1/3;grid-row:3/4;}
.bp-editorial-item:nth-child(1) .bp-media{aspect-ratio:3/4;}
.bp-editorial-item:nth-child(4) .bp-media{aspect-ratio:16/7;}
.bp-caption { margin-top:0.9rem;font-family:var(--font-ui);font-size:0.7rem;letter-spacing:0.06em;color:var(--mid-grey);line-height:1.5; }
.bp-caption-num { font-size:0.58rem;letter-spacing:0.2em;color:var(--gold);margin-right:0.8rem; }

.bp-story { padding:16vh 0;background:var(--off-white); }
.bp-story-inner { display:grid;grid-template-columns:1fr 1fr;gap:8vw;padding:0 8vw;align-items:center; }
.bp-story-text h2 { font-family:var(--font-display);font-size:clamp(1.8rem,3vw,3rem);font-weight:500;line-height:1.2;margin-bottom:2rem;color:var(--charcoal); }
.bp-story-text p { font-size:1.08rem;color:#5a5650;line-height:1.85;margin-bottom:1.4rem; }

.bp-pullquote { padding:12vh 8vw;background:var(--dark);text-align:center;position:relative;overflow:hidden; }
.bp-pullquote::before { content:'"';position:absolute;top:-0.15em;left:6vw;font-family:var(--font-display);font-size:22rem;color:rgba(201,168,76,0.04);line-height:1;pointer-events:none;user-select:none; }
.bp-pullquote blockquote { font-family:var(--font-display);font-size:clamp(1.8rem,4vw,4rem);font-weight:400;font-style:italic;color:var(--cream);line-height:1.25;max-width:820px;margin:0 auto;position:relative;z-index:1; }
.bp-pullquote cite { display:block;margin-top:2rem;font-family:var(--font-ui);font-size:0.68rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);font-style:normal; }

.bp-branding { padding:14vh 0;background:var(--dark); }
.bp-branding-intro { padding:0 8vw;margin-bottom:8vh;display:grid;grid-template-columns:1fr 1fr;gap:8vw;align-items:end; }
.bp-branding-intro h2 { font-family:var(--font-display);font-size:clamp(2rem,4vw,3.8rem);font-weight:700;line-height:1.05;color:var(--cream); }
.bp-branding-intro p { font-size:1rem;color:rgba(248,245,240,0.55);line-height:1.8; }
.bp-brand-grid { display:grid;grid-template-columns:2fr 1fr 1fr;gap:1rem;padding:0 6vw; }
.bp-brand-media { overflow:hidden;background:#1e1c1a;cursor:zoom-in;position:relative; }
.bp-brand-grid > div:nth-child(1) .bp-brand-media{aspect-ratio:4/3;}
.bp-brand-grid > div:nth-child(2) .bp-brand-media{aspect-ratio:3/4;}
.bp-brand-grid > div:nth-child(3) .bp-brand-media{aspect-ratio:3/4;}
.bp-brand-media img { width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;transition:transform 0.7s ease;opacity:0.9; }
.bp-brand-media:hover img { transform:scale(1.05);opacity:1; }
.bp-brand-caption { margin-top:0.8rem;font-family:var(--font-ui);font-size:0.68rem;letter-spacing:0.05em;color:rgba(201,168,76,0.5);line-height:1.5; }

.bp-stats { padding:8vh 8vw 0;display:flex;gap:5vw; }
.bp-stat { flex:1;border-top:1px solid rgba(201,168,76,0.2);padding-top:1.4rem; }
.bp-stat-value { font-family:var(--font-display);font-size:2.8rem;font-weight:400;color:var(--gold);line-height:1;margin-bottom:0.5rem; }
.bp-stat-label { font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(201,168,76,0.5); }

.bp-process { padding:14vh 0;background:var(--off-white); }
.bp-process-header { padding:0 8vw;margin-bottom:8vh;display:grid;grid-template-columns:1fr 1fr;align-items:end;gap:8vw; }
.bp-process-header h2 { font-family:var(--font-display);font-size:clamp(2rem,3.5vw,3.4rem);font-weight:500;font-style:italic;line-height:1.15;color:var(--charcoal); }
.bp-process-header p { font-size:0.95rem;color:#6a6460;line-height:1.8; }
.bp-process-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;padding:0 6vw; }
.bp-process-media { aspect-ratio:4/3;overflow:hidden;background:var(--warm-grey);cursor:zoom-in;position:relative; }
.bp-process-media img { width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;transition:transform 0.6s ease; }
.bp-process-media:hover img { transform:scale(1.05); }
.bp-process-caption { margin-top:0.7rem;font-family:var(--font-ui);font-size:0.66rem;letter-spacing:0.08em;color:var(--mid-grey); }
.bp-process-caption strong { display:block;font-weight:500;color:var(--charcoal);margin-bottom:0.2rem;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em; }

.bp-gallery { padding:8vh 0 14vh;background:var(--dark); }
.bp-gallery-header { padding:0 8vw 6vh; }
.bp-gallery-header h2 { font-family:var(--font-display);font-size:clamp(2rem,4vw,3.8rem);font-weight:400;color:var(--cream);line-height:1.1; }
.bp-gallery-header .bp-label { color:var(--gold); }
.bp-gallery-header .bp-label::after { background:var(--gold); }
.bp-gallery-strip { display:flex;gap:1rem;padding:0 6vw;margin-bottom:1rem; }
.bp-g-item { overflow:hidden;flex-shrink:0;cursor:zoom-in;background:#1e1c1a;position:relative; }
.bp-g-item img { width:100%;height:100%;object-fit:cover;display:block;position:relative;z-index:1;transition:transform 0.7s ease;opacity:0.88; }
.bp-g-item:hover img { transform:scale(1.05);opacity:1; }
.bp-gallery-row1 .bp-g-item:nth-child(1){width:55%;height:420px;}
.bp-gallery-row1 .bp-g-item:nth-child(2){width:25%;height:420px;}
.bp-gallery-row1 .bp-g-item:nth-child(3){flex:1;height:420px;}
.bp-gallery-row2 .bp-g-item:nth-child(1){width:30%;height:340px;}
.bp-gallery-row2 .bp-g-item:nth-child(2){flex:1;height:340px;}
.bp-gallery-row2 .bp-g-item:nth-child(3){width:28%;height:340px;}
.bp-dark-ph { width:100%;height:100%;position:absolute;inset:0;background:linear-gradient(135deg,#1e1c1a,#2a2718);display:flex;align-items:center;justify-content:center; }
.bp-dark-ph span { font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(201,168,76,0.25); }

.bp-technical { padding:14vh 0;background:var(--cream);border-top:1px solid var(--warm-grey); }
.bp-technical-header { padding:0 8vw 6vh;display:flex;align-items:baseline;justify-content:space-between;gap:2rem;flex-wrap:wrap; }
.bp-technical-header h2 { font-family:var(--font-display);font-size:clamp(1.6rem,2.5vw,2.6rem);font-weight:400;color:var(--charcoal); }
.bp-toggle-btn { font-family:var(--font-ui);font-size:0.68rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--mid-grey);cursor:pointer;background:none;border:1px solid var(--warm-grey);padding:0.6rem 1.2rem;transition:border-color 0.2s,color 0.2s; }
.bp-toggle-btn:hover { border-color:var(--gold);color:var(--gold); }
.bp-docs-content { padding:0 8vw;max-height:0;overflow:hidden;transition:max-height 1.2s cubic-bezier(.4,0,.2,1); }
.bp-docs-content.open { max-height:5000px; }
.bp-docs-grid { display:grid;grid-template-columns:1fr 1fr;gap:4rem 8vw;padding-bottom:6vh; }
.bp-doc-block h3 { font-family:var(--font-display);font-size:1.15rem;font-weight:500;color:var(--charcoal);margin-bottom:1rem;padding-bottom:0.6rem;border-bottom:1px solid var(--warm-grey); }
.bp-doc-block p { font-size:0.92rem;color:#6a6460;line-height:1.8;margin-bottom:0.8rem; }
.bp-doc-block ul { list-style:none;margin:0.6rem 0; }
.bp-doc-block ul li { font-size:0.88rem;color:#6a6460;padding:0.3rem 0;border-bottom:1px solid rgba(232,228,222,0.6);display:flex;align-items:baseline;gap:0.8rem; }
.bp-doc-block ul li::before { content:'—';color:var(--gold);font-size:0.7rem;flex-shrink:0; }
.bp-tag-list { display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.8rem; }
.bp-tag { font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;padding:0.35rem 0.8rem;border:1px solid var(--warm-grey);color:var(--mid-grey); }

@media (max-width:900px) {
  .bp-nav{padding:1rem 1.5rem;}
  .bp-editorial-grid{grid-template-columns:1fr;}
  .bp-editorial-item:nth-child(1),.bp-editorial-item:nth-child(2),
  .bp-editorial-item:nth-child(3),.bp-editorial-item:nth-child(4){grid-column:1;grid-row:auto;}
  .bp-editorial-item:nth-child(1) .bp-media,.bp-editorial-item:nth-child(4) .bp-media{aspect-ratio:4/3;}
  .bp-story-inner,.bp-branding-intro,.bp-process-header{grid-template-columns:1fr;}
  .bp-brand-grid{grid-template-columns:1fr 1fr;}
  .bp-brand-grid > div:nth-child(1){grid-column:1/3;}
  .bp-process-grid{grid-template-columns:1fr 1fr;}
  .bp-gallery-strip{flex-direction:column;}
  .bp-gallery-row1 .bp-g-item,.bp-gallery-row2 .bp-g-item{width:100%!important;height:260px!important;}
  .bp-docs-grid{grid-template-columns:1fr;}
  .bp-stats{flex-direction:column;}
}
@media (max-width:600px) {
  .bp-hero-title{font-size:3rem;}
  .bp-process-grid{grid-template-columns:1fr;}
  .bp-brand-grid{grid-template-columns:1fr;}
  .bp-brand-grid > div:nth-child(1){grid-column:1;}
}
`;

function ImgPh({ label, dark = false }) {
  return (
    <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
      background:dark?"linear-gradient(135deg,#1e1c1a,#2a2718)":"linear-gradient(135deg,#e8e4de,#d4cfc8)"}}>
      <span style={{fontFamily:"var(--font-ui)",fontSize:"0.62rem",letterSpacing:"0.2em",
        textTransform:"uppercase",color:dark?"rgba(201,168,76,0.25)":"var(--mid-grey)"}}>{label}</span>
    </div>
  );
}

export default function BadmintonPlan() {

  useEffect(() => {
    const el = document.createElement("style");
    el.id = "bp-styles"; el.textContent = BP_STYLES;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  useEffect(() => {
    const nav = document.getElementById("bp-nav");
    const navTitle = document.getElementById("bp-nav-title");
    const hero = document.getElementById("bp-hero");
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
    document.querySelectorAll(".bp-reveal,.bp-reveal-slow").forEach(el => obs.observe(el));
    return () => { window.removeEventListener("scroll",onScroll); obs.disconnect(); };
  }, []);

  const toggleDocs = () => {
    const c = document.getElementById("bp-docs");
    const b = document.getElementById("bp-toggle-btn");
    const open = c.classList.toggle("open");
    b.textContent = open ? "Collapse Documentation" : "Expand Documentation";
  };

  // ── Back to /play thumbnails ──
  const goBack = () => window.history.back();

  return (
    <div className="bp-root">

      {/* ── NAVIGATION ── */}
      <nav className="bp-nav" id="bp-nav">
        <button className="bp-nav-back" onClick={goBack}>Play</button>
        <span className="bp-nav-title" id="bp-nav-title">The Badminton Plan</span>
        <span className="bp-nav-year">2024</span>
      </nav>

      {/* ══ SECTION 1 — HERO ══ */}
      <section className="bp-hero" id="bp-hero">
        <div className="bp-hero-media" aria-hidden="true">

          {/* ─── PLACEHOLDER: rename → bp-hero.jpg
              Shows: wide shot of the finished badminton court on the school terrace,
              or the court at night with lighting ─── */}
          <div className="bp-hero-placeholder">
            <div className="bp-hero-placeholder-inner">bp-hero.jpg</div>
          </div>
          {/* <img src="/src/assets/bp-hero.jpg" alt="The Badminton Plan — finished court aerial view"
               style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.5}} /> */}

        </div>
        <div className="bp-hero-content">
          <p className="bp-hero-eyebrow">Spatial Design · Branding · Civil Execution · 2024</p>
          <h1 className="bp-hero-title">The Badminton<br /><em>Plan</em></h1>
          <p className="bp-hero-sub">Converting a school rooftop into an Olympic-standard badminton court — from civil engineering and safety regulations to branding, signage, and a working business.</p>
          <div className="bp-hero-meta">
            <div className="bp-hero-meta-item"><strong>Location</strong>Mylapore, Chennai</div>
            <div className="bp-hero-meta-item"><strong>Court</strong>Olympic Standard</div>
            <div className="bp-hero-meta-item"><strong>Role</strong>Designer + Executor</div>
          </div>
        </div>
        <div className="bp-hero-scroll" aria-hidden="true"><div className="bp-scroll-line" /><span>Scroll</span></div>
      </section>

      {/* ══ SECTION 2 — THE COURT ══ */}
      <section className="bp-experience">
        <div className="bp-experience-header bp-reveal">
          <p className="bp-label">The Court</p>
          <h2>A rooftop transformed<br />into a place of play.</h2>
        </div>
        <div className="bp-editorial-grid">

          {/* ─── PLACEHOLDER: rename → bp-court1.jpg
              Shows: finished court — full wide angle from one end ─── */}
          <div className="bp-editorial-item bp-reveal" style={{transitionDelay:"0s"}}>
            <div className="bp-media"><ImgPh label="bp-court1.jpg" /></div>
            {/* <img src="/src/assets/bp-court1.jpg" alt="Finished Olympic standard court — wide angle" /> */}
            <p className="bp-caption"><span className="bp-caption-num">01</span>The finished Olympic-standard court on the school terrace.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-court2.jpg
              Shows: wooden sports flooring close-up, or shed structure ─── */}
          <div className="bp-editorial-item bp-reveal" style={{transitionDelay:"0.1s"}}>
            <div className="bp-media"><ImgPh label="bp-court2.jpg" /></div>
            {/* <img src="/src/assets/bp-court2.jpg" alt="Sports wooden flooring and 30ft shed structure" /> */}
            <p className="bp-caption"><span className="bp-caption-num">02</span>Wooden sports flooring laid under the 30ft shed structure.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-court3.jpg
              Shows: court line stripe marking — your Screenshot_2023-12-15 image ─── */}
          <div className="bp-editorial-item bp-reveal" style={{transitionDelay:"0.2s"}}>
            <div className="bp-media"><ImgPh label="bp-court3.jpg" /></div>
            {/* <img src="/src/assets/bp-court3.jpg" alt="Court line stripe variants 2A and 3B" /> */}
            <p className="bp-caption"><span className="bp-caption-num">03</span>Court line stripes — precision marking across two variants.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-court4.jpg
              Shows: Badminton Plan name board / signage at entry ─── */}
          <div className="bp-editorial-item bp-reveal" style={{transitionDelay:"0.15s"}}>
            <div className="bp-media"><ImgPh label="bp-court4.jpg" /></div>
            {/* <img src="/src/assets/bp-court4.jpg" alt="The Badminton Plan name board at court entrance" /> */}
            <p className="bp-caption"><span className="bp-caption-num">04</span>The Badminton Plan signage and branding installed at entry.</p>
          </div>

        </div>
      </section>

      {/* ══ SECTION 3 — THE STORY ══ */}
      <section className="bp-story">
        <div className="bp-story-inner">
          <div className="bp-story-text bp-reveal">
            <p className="bp-label">The Vision</p>
            <h2>A school terrace with<br />untapped earning potential.</h2>
            <p>SRKMPS Matriculation School in Mylapore had a large, unused rooftop terrace. The vision: convert it into a revenue-generating, Olympic-standard badminton facility — open for coaching and hourly play.</p>
            <p>This project spanned civil engineering, contractor hiring, safety regulations for the 30ft shed height, wooden flooring installation, professional painting, and a complete branding system in black and gold.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-story.jpg
              Shows: terrace before construction, or mid-construction shot ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0.15s"}}>
            <div className="bp-media" style={{aspectRatio:"3/4",height:"100%"}}><ImgPh label="bp-story.jpg" /></div>
            {/* <img src="/src/assets/bp-story.jpg" alt="School terrace — before or during construction" /> */}
          </div>
        </div>
      </section>

      <div className="bp-pullquote bp-reveal-slow">
        <blockquote>"Designed on paper,<br />built in reality."</blockquote>
        <cite>The Badminton Plan — Design to Execution</cite>
      </div>

      {/* ══ SECTION 4 — BRAND IDENTITY ══ */}
      <section className="bp-branding">
        <div className="bp-branding-intro">
          <div className="bp-reveal">
            <p className="bp-label" style={{color:"var(--gold)"}}>Brand Identity</p>
            <h2 style={{color:"var(--cream)"}}>Black.<br />Gold.<br />Olympic.</h2>
          </div>
          <div className="bp-reveal" style={{transitionDelay:"0.12s"}}>
            <p>The brand identity for The Badminton Plan was built entirely in black and gold — evoking prestige, performance, and Olympic-standard aspiration. The logo, name boards, pamphlets, and digital assets were all designed and executed as part of the project.</p>
          </div>
        </div>
        <div className="bp-brand-grid">

          {/* ─── PLACEHOLDER: rename → bp-brand1.jpg
              Shows: the 3D logo sign (shuttle/gold circle emblem) — your Screenshot_2024-01-02 image ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0s"}}>
            <div className="bp-brand-media"><ImgPh label="bp-brand1.jpg" dark /></div>
            {/* <img src="/src/assets/bp-brand1.jpg" alt="3D Badminton Plan logo sign on entrance" /> */}
            <p className="bp-brand-caption">3D logo sign — The Badminton Plan emblem on court entrance.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-brand2.jpg
              Shows: gold circle logo on business card mockup — your Screenshot_2023-12-24 image ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0.1s"}}>
            <div className="bp-brand-media"><ImgPh label="bp-brand2.jpg" dark /></div>
            {/* <img src="/src/assets/bp-brand2.jpg" alt="Gold logo on business card and phone mockup" /> */}
            <p className="bp-brand-caption">Gold circle logo — business card and mobile mockup.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-brand3.jpg
              Shows: the website / app screenshot — your Screenshot_2024-01-08 image ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0.2s"}}>
            <div className="bp-brand-media"><ImgPh label="bp-brand3.jpg" dark /></div>
            {/* <img src="/src/assets/bp-brand3.jpg" alt="Badminton Plan website / digital presence" /> */}
            <p className="bp-brand-caption">Digital presence — website and booking interface.</p>
          </div>

        </div>
        <div className="bp-stats">
          {[{val:"30ft",lbl:"Shed Height"},{val:"₹2500",lbl:"Monthly Coaching"},{val:"3",lbl:"Days/Week"},{val:"NIS",lbl:"Certified Coaches"}].map(({val,lbl},i) => (
            <div className="bp-stat bp-reveal" key={lbl} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="bp-stat-value">{val}</div>
              <div className="bp-stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 5 — EXECUTION PROCESS ══ */}
      <section className="bp-process">
        <div className="bp-process-header">
          <div className="bp-reveal">
            <p className="bp-label">Execution Process</p>
            <h2>From blueprint<br /><em>to badminton.</em></h2>
          </div>
          <div className="bp-reveal" style={{transitionDelay:"0.1s"}}>
            <p>The project involved hiring contractors, working with a civil engineer for structural safety, navigating height regulations for the 30ft shed, sourcing sports-grade wooden flooring, and coordinating professional court painters — before a single shuttle was played.</p>
          </div>
        </div>
        <div className="bp-process-grid">

          {/* ─── PLACEHOLDER: rename → bp-proc1.jpg
              Shows: site survey / measuring the terrace ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0s"}}>
            <div className="bp-process-media"><ImgPh label="bp-proc1.jpg" /></div>
            {/* <img src="/src/assets/bp-proc1.jpg" alt="Site survey — measuring the rooftop terrace" /> */}
            <p className="bp-process-caption"><strong>Site Survey</strong>Measuring the rooftop terrace and calculating usable court dimensions.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-proc2.jpg
              Shows: civil engineering drawings or structural plans ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0.1s"}}>
            <div className="bp-process-media"><ImgPh label="bp-proc2.jpg" /></div>
            {/* <img src="/src/assets/bp-proc2.jpg" alt="Civil engineering drawings for 30ft shed" /> */}
            <p className="bp-process-caption"><strong>Civil Engineering</strong>Structural design for the 30ft shed with safety compliance.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-proc3.jpg
              Shows: shed steel structure being erected ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0.2s"}}>
            <div className="bp-process-media"><ImgPh label="bp-proc3.jpg" /></div>
            {/* <img src="/src/assets/bp-proc3.jpg" alt="Steel shed structure under construction" /> */}
            <p className="bp-process-caption"><strong>Shed Construction</strong>Steel structure erected to regulation height with ventilation.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-proc4.jpg
              Shows: wooden flooring being laid down ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0s"}}>
            <div className="bp-process-media"><ImgPh label="bp-proc4.jpg" /></div>
            {/* <img src="/src/assets/bp-proc4.jpg" alt="Sports-grade wooden flooring installation" /> */}
            <p className="bp-process-caption"><strong>Wooden Flooring</strong>Sports-grade wooden floor installed across the court area.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-proc5.jpg
              Shows: court line painting in progress — your stripe screenshots ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0.1s"}}>
            <div className="bp-process-media"><ImgPh label="bp-proc5.jpg" /></div>
            {/* <img src="/src/assets/bp-proc5.jpg" alt="Court line marking — stripe variants being tested" /> */}
            <p className="bp-process-caption"><strong>Court Painting</strong>Professional line marking — two stripe variants tested and finalised.</p>
          </div>

          {/* ─── PLACEHOLDER: rename → bp-proc6.jpg
              Shows: name boards / pamphlets being installed or printed ─── */}
          <div className="bp-reveal" style={{transitionDelay:"0.2s"}}>
            <div className="bp-process-media"><ImgPh label="bp-proc6.jpg" /></div>
            {/* <img src="/src/assets/bp-proc6.jpg" alt="Branding assets — name boards and pamphlets installed" /> */}
            <p className="bp-process-caption"><strong>Branding Installation</strong>Name boards, signage, and pamphlets placed across the facility.</p>
          </div>

        </div>
      </section>

      {/* ══ SECTION 6 — GALLERY ══ */}
      <section className="bp-gallery">
        <div className="bp-gallery-header bp-reveal">
          <p className="bp-label">Gallery</p>
          <h2>The court, in full.</h2>
        </div>
        <div className="bp-gallery-strip bp-gallery-row1 bp-reveal">
          {/* ─── PLACEHOLDER: rename → bp-gal-a.jpg — wide finished court shot ─── */}
          <div className="bp-g-item"><ImgPh label="bp-gal-a.jpg" dark /></div>
          {/* ─── PLACEHOLDER: rename → bp-gal-b.jpg — detail shot: logo or net ─── */}
          <div className="bp-g-item"><ImgPh label="bp-gal-b.jpg" dark /></div>
          {/* ─── PLACEHOLDER: rename → bp-gal-c.jpg — players on court or signage ─── */}
          <div className="bp-g-item"><ImgPh label="bp-gal-c.jpg" dark /></div>
        </div>
        <div className="bp-gallery-strip bp-gallery-row2 bp-reveal">
          {/* ─── PLACEHOLDER: rename → bp-gal-d.jpg ─── */}
          <div className="bp-g-item"><ImgPh label="bp-gal-d.jpg" dark /></div>
          {/* ─── PLACEHOLDER: rename → bp-gal-e.jpg ─── */}
          <div className="bp-g-item"><ImgPh label="bp-gal-e.jpg" dark /></div>
          {/* ─── PLACEHOLDER: rename → bp-gal-f.jpg ─── */}
          <div className="bp-g-item"><ImgPh label="bp-gal-f.jpg" dark /></div>
        </div>
      </section>

      {/* ══ SECTION 7 — TECHNICAL DOCUMENTATION ══ */}
      <section className="bp-technical">
        <div className="bp-technical-header">
          <div><p className="bp-label">Section 07</p><h2>Technical Documentation</h2></div>
          <button className="bp-toggle-btn" id="bp-toggle-btn" onClick={toggleDocs}>Expand Documentation</button>
        </div>
        <div className="bp-docs-content" id="bp-docs">
          <div className="bp-docs-grid">
            <div className="bp-doc-block">
              <h3>Project Overview</h3>
              <p>Design and full execution of an Olympic-standard badminton court on the rooftop terrace of SRKMPS Matriculation School, Mylapore, Chennai. Converts unused terrace space into a revenue-generating sports facility offering coaching and hourly play.</p>
            </div>
            <div className="bp-doc-block">
              <h3>Facility Specifications</h3>
              <ul>
                <li>Court type — Olympic standard badminton</li>
                <li>Location — SRKMPS School terrace, 2nd floor, Mylapore</li>
                <li>Shed height — 30ft with civil engineering sign-off</li>
                <li>Flooring — sports-grade wooden flooring</li>
                <li>Court marking — two stripe variants designed and tested</li>
                <li>Coaches — National Level, State Level, NIS Certified</li>
              </ul>
            </div>
            <div className="bp-doc-block">
              <h3>Business Model</h3>
              <ul>
                <li>Coaching — Rs. 2500/month, 3 days/week</li>
                <li>Hourly play — open all days</li>
                <li>Contact — 637 403 6273</li>
                <li>Revenue model — school earns from terrace lease</li>
              </ul>
            </div>
            <div className="bp-doc-block">
              <h3>Brand Identity</h3>
              <p>Complete brand system in black and gold: circular gold emblem logo, 3D name board signage, pamphlets, and digital assets including website and mobile presence.</p>
              <div className="bp-tag-list">
                {["Spatial Design","Branding","Civil Execution","Sports Facility","Black & Gold","Signage","Real-World Project","Chennai"].map(t=><span className="bp-tag" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
