import { useEffect } from "react";

const DC_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap');

.dc-root *, .dc-root *::before, .dc-root *::after { margin:0; padding:0; box-sizing:border-box; }
.dc-root {
  --cream:#f8f5f0; --off-white:#faf9f7; --warm-grey:#e8e4de; --mid-grey:#b8b0a5;
  --dark:#0e0c1a; --charcoal:#2d2b28; --violet:#4a3f8f; --violet-light:#7b6fd6;
  --red:#d94040; --yellow:#e8c92a; --blue:#2a6ee8;
  --font-display:'Playfair Display',Georgia,serif;
  --font-body:'EB Garamond',Georgia,serif;
  --font-ui:'Inter',sans-serif;
  background:var(--off-white); color:var(--dark);
  font-family:var(--font-body); line-height:1.7; overflow-x:hidden;
}
.dc-nav { position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:1.2rem 3rem;
  background:rgba(14,12,26,0.92); backdrop-filter:blur(12px);
  border-bottom:1px solid rgba(123,111,214,0.2); transition:box-shadow 0.3s; }
.dc-nav.scrolled { box-shadow:0 2px 20px rgba(14,12,26,0.4); }
.dc-nav-back { font-family:var(--font-ui); font-size:0.72rem; letter-spacing:0.18em;
  text-transform:uppercase; color:rgba(123,111,214,0.6); text-decoration:none; transition:color 0.2s; }
.dc-nav-back::before { content:'← '; }
.dc-nav-back:hover { color:var(--violet-light); }
.dc-nav-title { font-family:var(--font-display); font-size:0.95rem; font-weight:500;
  color:var(--cream); opacity:0; transition:opacity 0.4s; }
.dc-nav-title.visible { opacity:1; }
.dc-nav-year { font-family:var(--font-ui); font-size:0.72rem; letter-spacing:0.12em;
  color:rgba(123,111,214,0.45); }

.dc-reveal { opacity:0; transform:translateY(32px);
  transition:opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); }
.dc-reveal.visible { opacity:1; transform:translateY(0); }
.dc-reveal-slow { opacity:0; transition:opacity 1.4s ease; }
.dc-reveal-slow.visible { opacity:1; }

.dc-label { font-family:var(--font-ui); font-size:0.62rem; letter-spacing:0.28em;
  text-transform:uppercase; color:var(--violet-light); margin-bottom:1.2rem;
  display:flex; align-items:center; gap:1rem; }
.dc-label::after { content:''; flex:1; max-width:48px; height:1px; background:var(--violet-light); opacity:0.4; }

/* HERO */
.dc-hero { height:100vh; min-height:640px; position:relative; overflow:hidden;
  display:flex; align-items:flex-end; padding:0 0 8vh 0;
  background:var(--dark); }
.dc-hero-media { position:absolute; inset:0; overflow:hidden; }
.dc-hero-media img { width:100%;height:100%;object-fit:cover;opacity:0.55; }
.dc-hero-placeholder { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  background:linear-gradient(160deg,#0e0c1a 0%,#1a1430 40%,#0e0c1a 100%); }
.dc-hero-placeholder-inner { text-align:center; opacity:0.14; color:var(--cream);
  font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.2em; text-transform:uppercase; }
.dc-hero-placeholder-inner::before { content:''; display:block; width:80px; height:80px;
  border:1px solid currentColor; border-radius:50%; margin:0 auto 1rem; }
/* Confetti dots scattered in hero bg */
.dc-confetti-bg { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.dc-confetti-bg::before,.dc-confetti-bg::after {
  content:''; position:absolute; border-radius:2px;
  animation:dcFloat 6s ease-in-out infinite;
}
.dc-hero::after { content:''; position:absolute; inset:0;
  background:linear-gradient(to top, rgba(14,12,26,0.92) 0%, rgba(14,12,26,0.3) 60%, transparent 100%); }
.dc-hero-content { position:relative; z-index:2; width:100%; padding:0 8vw; }
.dc-hero-eyebrow { font-family:var(--font-ui); font-size:0.68rem; letter-spacing:0.28em;
  text-transform:uppercase; color:var(--violet-light); margin-bottom:1.4rem;
  opacity:0; animation:dcFadeUp 0.8s 0.4s ease forwards; }
.dc-hero-title { font-family:var(--font-display); font-size:clamp(3.5rem,9vw,8rem);
  font-weight:700; color:var(--cream); line-height:0.95; letter-spacing:-0.02em;
  margin-bottom:1.8rem; opacity:0; animation:dcFadeUp 1s 0.6s ease forwards; }
.dc-hero-title em { font-style:italic; color:var(--violet-light); }
.dc-hero-sub { max-width:540px; font-size:clamp(1rem,1.4vw,1.18rem); color:rgba(248,245,240,0.65);
  line-height:1.6; margin-bottom:2.4rem; opacity:0; animation:dcFadeUp 1s 0.9s ease forwards; }
.dc-hero-meta { display:flex; gap:3rem; opacity:0; animation:dcFadeUp 1s 1.2s ease forwards; }
.dc-hero-meta-item { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.16em;
  text-transform:uppercase; color:rgba(123,111,214,0.45); }
.dc-hero-meta-item strong { display:block; font-weight:400; color:rgba(248,245,240,0.72);
  font-size:0.78rem; letter-spacing:0.08em; margin-bottom:0.15rem; }
.dc-hero-scroll { position:absolute; bottom:2.5rem; right:8vw; z-index:2;
  display:flex; flex-direction:column; align-items:center; gap:0.6rem;
  opacity:0; animation:dcFadeIn 1s 1.8s ease forwards; }
.dc-hero-scroll span { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:0.22em;
  text-transform:uppercase; color:rgba(248,245,240,0.3); writing-mode:vertical-rl; }
.dc-scroll-line { width:1px; height:60px; background:rgba(123,111,214,0.3); position:relative; overflow:hidden; }
.dc-scroll-line::after { content:''; position:absolute; top:-100%; left:0; width:100%; height:100%;
  background:var(--violet-light); animation:dcScrollDrop 2s 2s cubic-bezier(.4,0,.2,1) infinite; }
@keyframes dcScrollDrop { 0%{top:-100%} 100%{top:200%} }
@keyframes dcFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes dcFadeIn { from{opacity:0} to{opacity:1} }

.dc-img-ph { width:100%;height:100%;display:flex;align-items:center;justify-content:center;
  position:absolute;inset:0;background:linear-gradient(135deg,#e8e4de,#d4cfc8); }
.dc-img-ph span { font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.2em;
  text-transform:uppercase;color:var(--mid-grey); }
.dc-media { width:100%;aspect-ratio:4/3;background:var(--warm-grey);overflow:hidden;cursor:zoom-in;position:relative; }
.dc-media img { width:100%;height:100%;object-fit:cover;display:block;
  transition:transform 0.7s cubic-bezier(.16,1,.3,1); }
.dc-media:hover img { transform:scale(1.06); }

/* EXPERIENCE */
.dc-experience { padding:12vh 0; background:var(--cream); }
.dc-experience-header { padding:0 8vw; margin-bottom:8vh; }
.dc-experience-header h2 { font-family:var(--font-display);font-size:clamp(2.2rem,4vw,3.8rem);
  font-weight:400;font-style:italic;line-height:1.15;color:var(--charcoal);max-width:640px; }
.dc-editorial-grid { padding:0 6vw;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem; }
.dc-editorial-item { position:relative;overflow:hidden; }
.dc-editorial-item:nth-child(1) { grid-column:1/2;grid-row:1/3; }
.dc-editorial-item:nth-child(2) { grid-column:2/3;grid-row:1/2; }
.dc-editorial-item:nth-child(3) { grid-column:2/3;grid-row:2/3; }
.dc-editorial-item:nth-child(4) { grid-column:1/3;grid-row:3/4; }
.dc-editorial-item:nth-child(1) .dc-media { aspect-ratio:3/4; }
.dc-editorial-item:nth-child(4) .dc-media { aspect-ratio:16/7; }
.dc-caption { margin-top:0.9rem;font-family:var(--font-ui);font-size:0.7rem;
  letter-spacing:0.06em;color:var(--mid-grey);line-height:1.5; }
.dc-caption-num { font-size:0.58rem;letter-spacing:0.2em;color:var(--violet-light);margin-right:0.8rem; }

/* PROBLEM */
.dc-problem { padding:16vh 0; background:var(--off-white); }
.dc-problem-inner { display:grid;grid-template-columns:1fr 1fr;gap:8vw;padding:0 8vw;align-items:center; }
.dc-problem-text h2 { font-family:var(--font-display);font-size:clamp(1.8rem,3vw,3rem);
  font-weight:500;line-height:1.2;margin-bottom:2rem;color:var(--charcoal); }
.dc-problem-text p { font-size:1.08rem;color:#5a5650;line-height:1.85;margin-bottom:1.4rem; }

/* PULLQUOTE */
.dc-pullquote { padding:12vh 8vw;background:var(--dark);text-align:center;position:relative;overflow:hidden; }
.dc-pullquote::before { content:'"';position:absolute;top:-0.15em;left:6vw;
  font-family:var(--font-display);font-size:22rem;color:rgba(123,111,214,0.05);
  line-height:1;pointer-events:none;user-select:none; }
.dc-pullquote blockquote { font-family:var(--font-display);font-size:clamp(1.8rem,4vw,4rem);
  font-weight:400;font-style:italic;color:var(--cream);line-height:1.25;
  max-width:820px;margin:0 auto;position:relative;z-index:1; }
.dc-pullquote cite { display:block;margin-top:2rem;font-family:var(--font-ui);
  font-size:0.68rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--violet-light);font-style:normal; }

/* SYSTEM */
.dc-system { padding:14vh 0;background:var(--cream); }
.dc-system-intro { padding:0 8vw;margin-bottom:8vh;display:grid;
  grid-template-columns:1fr 1fr;gap:8vw;align-items:end; }
.dc-system-intro h2 { font-family:var(--font-display);font-size:clamp(2rem,4vw,3.8rem);
  font-weight:700;line-height:1.05;color:var(--charcoal); }
.dc-system-intro p { font-size:1rem;color:#6a6460;line-height:1.8; }
.dc-system-grid { display:grid;grid-template-columns:2fr 1fr 1fr;gap:1rem;padding:0 6vw; }
.dc-sys-media { overflow:hidden;background:var(--warm-grey);cursor:zoom-in;position:relative; }
.dc-system-grid > div:nth-child(1) .dc-sys-media { aspect-ratio:4/5; }
.dc-system-grid > div:nth-child(2) .dc-sys-media { aspect-ratio:3/4; }
.dc-system-grid > div:nth-child(3) .dc-sys-media { aspect-ratio:3/4; }
.dc-sys-media img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.7s ease; }
.dc-sys-media:hover img { transform:scale(1.05); }
.dc-sys-caption { margin-top:0.8rem;font-family:var(--font-ui);font-size:0.68rem;
  letter-spacing:0.05em;color:var(--mid-grey);line-height:1.5; }
.dc-stats { padding:8vh 8vw 0;display:flex;gap:5vw; }
.dc-stat { flex:1;border-top:1px solid var(--warm-grey);padding-top:1.4rem; }
.dc-stat-value { font-family:var(--font-display);font-size:2.8rem;font-weight:400;
  color:var(--charcoal);line-height:1;margin-bottom:0.5rem; }
.dc-stat-label { font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.18em;
  text-transform:uppercase;color:var(--mid-grey); }

/* PROCESS */
.dc-process { padding:14vh 0;background:var(--off-white); }
.dc-process-header { padding:0 8vw;margin-bottom:8vh;display:grid;
  grid-template-columns:1fr 1fr;align-items:end;gap:8vw; }
.dc-process-header h2 { font-family:var(--font-display);font-size:clamp(2rem,3.5vw,3.4rem);
  font-weight:500;font-style:italic;line-height:1.15;color:var(--charcoal); }
.dc-process-header p { font-size:0.95rem;color:#6a6460;line-height:1.8; }
.dc-process-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;padding:0 6vw; }
.dc-process-media { aspect-ratio:4/3;overflow:hidden;background:var(--warm-grey);
  cursor:zoom-in;position:relative; }
.dc-process-media img { width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s ease; }
.dc-process-media:hover img { transform:scale(1.05); }
.dc-process-caption { margin-top:0.7rem;font-family:var(--font-ui);font-size:0.66rem;
  letter-spacing:0.08em;color:var(--mid-grey); }
.dc-process-caption strong { display:block;font-weight:500;color:var(--charcoal);
  margin-bottom:0.2rem;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em; }

/* GALLERY */
.dc-gallery { padding:8vh 0 14vh;background:var(--dark); }
.dc-gallery-header { padding:0 8vw 6vh; }
.dc-gallery-header h2 { font-family:var(--font-display);font-size:clamp(2rem,4vw,3.8rem);
  font-weight:400;color:var(--cream);line-height:1.1; }
.dc-gallery-header .dc-label { color:var(--violet-light); }
.dc-gallery-header .dc-label::after { background:var(--violet-light); }
.dc-gallery-strip { display:flex;gap:1rem;padding:0 6vw;margin-bottom:1rem; }
.dc-g-item { overflow:hidden;flex-shrink:0;cursor:zoom-in;background:#1a1430;position:relative; }
.dc-g-item img { width:100%;height:100%;object-fit:cover;display:block;
  transition:transform 0.7s ease;opacity:0.88; }
.dc-g-item:hover img { transform:scale(1.05);opacity:1; }
.dc-gallery-row1 .dc-g-item:nth-child(1) { width:55%;height:420px; }
.dc-gallery-row1 .dc-g-item:nth-child(2) { width:25%;height:420px; }
.dc-gallery-row1 .dc-g-item:nth-child(3) { flex:1;height:420px; }
.dc-gallery-row2 .dc-g-item:nth-child(1) { width:30%;height:340px; }
.dc-gallery-row2 .dc-g-item:nth-child(2) { flex:1;height:340px; }
.dc-gallery-row2 .dc-g-item:nth-child(3) { width:28%;height:340px; }
.dc-dark-ph { width:100%;height:100%;background:linear-gradient(135deg,#1a1430,#0e0c1a);
  display:flex;align-items:center;justify-content:center;position:absolute;inset:0; }
.dc-dark-ph span { font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.2em;
  text-transform:uppercase;color:rgba(123,111,214,0.25); }

/* TECHNICAL */
.dc-technical { padding:14vh 0;background:var(--cream);border-top:1px solid var(--warm-grey); }
.dc-technical-header { padding:0 8vw 6vh;display:flex;align-items:baseline;
  justify-content:space-between;gap:2rem;flex-wrap:wrap; }
.dc-technical-header h2 { font-family:var(--font-display);font-size:clamp(1.6rem,2.5vw,2.6rem);
  font-weight:400;color:var(--charcoal); }
.dc-toggle-btn { font-family:var(--font-ui);font-size:0.68rem;letter-spacing:0.16em;
  text-transform:uppercase;color:var(--mid-grey);cursor:pointer;background:none;
  border:1px solid var(--warm-grey);padding:0.6rem 1.2rem;transition:border-color 0.2s,color 0.2s; }
.dc-toggle-btn:hover { border-color:var(--violet-light);color:var(--violet-light); }
.dc-docs-content { padding:0 8vw;max-height:0;overflow:hidden;
  transition:max-height 1.2s cubic-bezier(.4,0,.2,1); }
.dc-docs-content.open { max-height:5000px; }
.dc-docs-grid { display:grid;grid-template-columns:1fr 1fr;gap:4rem 8vw;padding-bottom:6vh; }
.dc-doc-block h3 { font-family:var(--font-display);font-size:1.15rem;font-weight:500;
  color:var(--charcoal);margin-bottom:1rem;padding-bottom:0.6rem;border-bottom:1px solid var(--warm-grey); }
.dc-doc-block p { font-size:0.92rem;color:#6a6460;line-height:1.8;margin-bottom:0.8rem; }
.dc-doc-block ul { list-style:none;margin:0.6rem 0; }
.dc-doc-block ul li { font-size:0.88rem;color:#6a6460;padding:0.3rem 0;
  border-bottom:1px solid rgba(232,228,222,0.6);display:flex;align-items:baseline;gap:0.8rem; }
.dc-doc-block ul li::before { content:'—';color:var(--violet-light);font-size:0.7rem;flex-shrink:0; }
.dc-tag-list { display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.8rem; }
.dc-tag { font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;
  padding:0.35rem 0.8rem;border:1px solid var(--warm-grey);color:var(--mid-grey); }

@media (max-width:900px) {
  .dc-nav { padding:1rem 1.5rem; }
  .dc-editorial-grid { grid-template-columns:1fr; }
  .dc-editorial-item:nth-child(1),.dc-editorial-item:nth-child(2),
  .dc-editorial-item:nth-child(3),.dc-editorial-item:nth-child(4) { grid-column:1;grid-row:auto; }
  .dc-editorial-item:nth-child(1) .dc-media,.dc-editorial-item:nth-child(4) .dc-media { aspect-ratio:4/3; }
  .dc-problem-inner,.dc-system-intro,.dc-process-header { grid-template-columns:1fr; }
  .dc-system-grid { grid-template-columns:1fr 1fr; }
  .dc-system-grid > div:nth-child(1) { grid-column:1/3; }
  .dc-process-grid { grid-template-columns:1fr 1fr; }
  .dc-gallery-strip { flex-direction:column; }
  .dc-gallery-row1 .dc-g-item,.dc-gallery-row2 .dc-g-item { width:100%!important;height:260px!important; }
  .dc-docs-grid { grid-template-columns:1fr; }
  .dc-stats { flex-direction:column; }
}
@media (max-width:600px) {
  .dc-hero-title { font-size:3rem; }
  .dc-process-grid { grid-template-columns:1fr; }
  .dc-system-grid { grid-template-columns:1fr; }
  .dc-system-grid > div:nth-child(1) { grid-column:1; }
}
`;

function ImgPh({ label, dark=false }) {
  return (
    <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
      background:dark?"linear-gradient(135deg,#1a1430,#0e0c1a)":"linear-gradient(135deg,#e8e4de,#d4cfc8)"}}>
      <span style={{fontFamily:"var(--font-ui)",fontSize:"0.62rem",letterSpacing:"0.2em",
        textTransform:"uppercase",color:dark?"rgba(123,111,214,0.25)":"var(--mid-grey)"}}>{label}</span>
    </div>
  );
}

export default function DigitalConfetti() {
  useEffect(() => {
    const el = document.createElement("style");
    el.id = "dc-styles"; el.textContent = DC_STYLES;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  useEffect(() => {
    const nav = document.getElementById("dc-nav");
    const navTitle = document.getElementById("dc-nav-title");
    const hero = document.getElementById("dc-hero");
    const onScroll = () => {
      if (!hero||!nav||!navTitle) return;
      hero.getBoundingClientRect().bottom < 80
        ? (navTitle.classList.add("visible"), nav.classList.add("scrolled"))
        : (navTitle.classList.remove("visible"), nav.classList.remove("scrolled"));
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);} });
    }, {threshold:0.12, rootMargin:"0px 0px -60px 0px"});
    document.querySelectorAll(".dc-reveal,.dc-reveal-slow").forEach(el => obs.observe(el));
    return () => { window.removeEventListener("scroll",onScroll); obs.disconnect(); };
  }, []);

  const toggleDocs = () => {
    const c = document.getElementById("dc-docs");
    const b = document.getElementById("dc-toggle-btn");
    const open = c.classList.toggle("open");
    b.textContent = open ? "Collapse Documentation" : "Expand Documentation";
  };

  return (
    <div className="dc-root">
      <nav className="dc-nav" id="dc-nav">
        <a href="/play" className="dc-nav-back">Play</a>
        <span className="dc-nav-title" id="dc-nav-title">Digital Confetti</span>
        <span className="dc-nav-year">2024</span>
      </nav>

      {/* HERO */}
      <section className="dc-hero" id="dc-hero">
        <div className="dc-hero-media" aria-hidden="true">
          <div className="dc-hero-placeholder"><div className="dc-hero-placeholder-inner">dc-hero.jpg</div></div>
        </div>
        <div className="dc-hero-content">
          <p className="dc-hero-eyebrow">Blender · Projection · Environmental Design · 2024</p>
          <h1 className="dc-hero-title">Digital<br /><em>Confetti</em></h1>
          <p className="dc-hero-sub">A sustainable alternative to physical confetti — particle systems rendered in Blender and projected into real space, turning celebration into an environmentally conscious, reusable experience.</p>
          <div className="dc-hero-meta">
            <div className="dc-hero-meta-item"><strong>Tool</strong>Blender + Projector</div>
            <div className="dc-hero-meta-item"><strong>Medium</strong>Projection</div>
            <div className="dc-hero-meta-item"><strong>Goal</strong>Zero Waste</div>
          </div>
        </div>
        <div className="dc-hero-scroll" aria-hidden="true"><div className="dc-scroll-line" /><span>Scroll</span></div>
      </section>

      {/* SECTION 2 */}
      <section className="dc-experience">
        <div className="dc-experience-header dc-reveal">
          <p className="dc-label">Final Experience</p>
          <h2>Celebration without<br />the cleanup.</h2>
        </div>
        <div className="dc-editorial-grid">
          {[
            {file:"dc-final1.jpg", cap:"Confetti particle system rendered in Blender — 1000 pieces.", num:"01", delay:"0s"},
            {file:"dc-final2.jpg", cap:"Fireworks system with heart-shaped particle emission path.", num:"02", delay:"0.1s"},
            {file:"dc-final3.jpg", cap:"White-background render optimised for projector brightness.", num:"03", delay:"0.2s"},
            {file:"dc-final4.jpg", cap:"Projection test against real physical surfaces.", num:"04", delay:"0.15s"},
          ].map(({file,cap,num,delay}) => (
            <div className="dc-editorial-item dc-reveal" key={num} style={{transitionDelay:delay}}>
              <div className="dc-media"><ImgPh label={file} /></div>
              <p className="dc-caption"><span className="dc-caption-num">{num}</span>{cap}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="dc-problem">
        <div className="dc-problem-inner">
          <div className="dc-problem-text dc-reveal">
            <p className="dc-label">The Problem</p>
            <h2>Confetti is<br />beautiful waste.</h2>
            <p>Confetti — paper, mylar, metallic — creates enormous physical waste at every celebration. It's impossible to collect, and much of it ends up in waterways and soil.</p>
            <p>The goal was to create a digital confetti experience using projectors: reusable, infinitely customisable, and as joyful as the real thing — while allowing the same system to double as relaxing ambient lighting in personal spaces.</p>
          </div>
          <div className="dc-reveal" style={{transitionDelay:"0.15s"}}>
            <div className="dc-media" style={{aspectRatio:"3/4",height:"100%"}}><ImgPh label="dc-problem.jpg" /></div>
          </div>
        </div>
      </section>

      <div className="dc-pullquote dc-reveal-slow">
        <blockquote>"Every celebration,<br />without a single piece of waste."</blockquote>
        <cite>Digital Confetti — Core Motivation</cite>
      </div>

      {/* SECTION 4 — SYSTEM */}
      <section className="dc-system">
        <div className="dc-system-intro">
          <div className="dc-reveal">
            <p className="dc-label">The System</p>
            <h2>Particles.<br />Projection.<br />Joy.</h2>
          </div>
          <div className="dc-reveal" style={{transitionDelay:"0.12s"}}>
            <p>Confetti and fireworks were created as particle systems in Blender, rendered on white backgrounds sized for projector output. The key challenge: making minute confetti pieces visible at projection scale. Multiple approaches were explored — including building a custom projector (which burned out) and projecting onto steam (a mist screen) before landing on optimised rendering for standard home projectors.</p>
          </div>
        </div>
        <div className="dc-system-grid">
          {[
            {file:"dc-blender1.jpg", cap:"Blender particle system — 1000 confetti pieces with physics."},
            {file:"dc-blender2.jpg", cap:"Fireworks simulation — heart-shaped path with rocket sparks."},
            {file:"dc-steam.jpg",    cap:"Steam projection experiment — mist screen attempt."},
          ].map(({file,cap},i) => (
            <div className="dc-reveal" key={file} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="dc-sys-media"><ImgPh label={file} /></div>
              <p className="dc-sys-caption">{cap}</p>
            </div>
          ))}
        </div>
        <div className="dc-stats">
          {[
            {val:"1000", lbl:"Confetti Particles"},
            {val:"250",  lbl:"Rendered Frames"},
            {val:"3",    lbl:"Approaches Tested"},
            {val:"∞",    lbl:"Reuses"},
          ].map(({val,lbl},i) => (
            <div className="dc-stat dc-reveal" key={lbl} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="dc-stat-value">{val}</div>
              <div className="dc-stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PROCESS */}
      <section className="dc-process">
        <div className="dc-process-header">
          <div className="dc-reveal">
            <p className="dc-label">Process &amp; Iteration</p>
            <h2>Three approaches,<br /><em>one that worked.</em></h2>
          </div>
          <div className="dc-reveal" style={{transitionDelay:"0.1s"}}>
            <p>Approach 1 — Build a custom projector: burned out from direct mains power. Approach 2 — Project onto steam mist: distance complications made confetti invisible at scale, and steam posed a burn hazard. Approach 3 — Render in Blender and project via readymade projector: this worked.</p>
          </div>
        </div>
        <div className="dc-process-grid">
          {[
            {file:"dc-proc1.jpg", title:"Custom Projector",    desc:"Built from scratch — burned out on first power test from mains."},
            {file:"dc-proc2.jpg", title:"Steam Screen",        desc:"Ultrasonic mist generator built with Arduino. Steam formed, but confetti too small to project."},
            {file:"dc-proc3.jpg", title:"Blender Setup",       desc:"Particle system with emitter sphere, physics, and colour randomisation."},
            {file:"dc-proc4.jpg", title:"Scale Challenge",     desc:"Handling the minute nature of confetti for readable projection output."},
            {file:"dc-proc5.jpg", title:"Background Study",    desc:"Testing backgrounds that show confetti without washing out at low projector brightness."},
            {file:"dc-proc6.jpg", title:"Final Render",        desc:"Confetti + fireworks on white — optimised for home projectors."},
          ].map(({file,title,desc},i) => (
            <div className="dc-reveal" key={file} style={{transitionDelay:`${(i%3)*0.1}s`}}>
              <div className="dc-process-media"><ImgPh label={file} /></div>
              <p className="dc-process-caption"><strong>{title}</strong>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — GALLERY */}
      <section className="dc-gallery">
        <div className="dc-gallery-header dc-reveal">
          <p className="dc-label">Gallery</p>
          <h2>The work, in full.</h2>
        </div>
        <div className="dc-gallery-strip dc-gallery-row1 dc-reveal">
          {["dc-gal-a.jpg","dc-gal-b.jpg","dc-gal-c.jpg"].map(f => (
            <div className="dc-g-item" key={f}><ImgPh label={f} dark /></div>
          ))}
        </div>
        <div className="dc-gallery-strip dc-gallery-row2 dc-reveal">
          {["dc-gal-d.jpg","dc-gal-e.jpg","dc-gal-f.jpg"].map(f => (
            <div className="dc-g-item" key={f}><ImgPh label={f} dark /></div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — TECHNICAL */}
      <section className="dc-technical" id="dc-technical">
        <div className="dc-technical-header">
          <div><p className="dc-label">Section 07</p><h2>Technical Documentation</h2></div>
          <button className="dc-toggle-btn" id="dc-toggle-btn" onClick={toggleDocs}>Expand Documentation</button>
        </div>
        <div className="dc-docs-content" id="dc-docs">
          <div className="dc-docs-grid">
            <div className="dc-doc-block">
              <h3>Project Overview</h3>
              <p>Digital Confetti creates a zero-waste celebration experience using Blender particle simulations projected via standard projectors. The system replicates the joy of physical confetti while eliminating plastic and paper waste.</p>
              <p>Secondary use case: ambient decorative lighting for personal spaces — relaxing particle animations projected at home after events.</p>
            </div>
            <div className="dc-doc-block">
              <h3>Technical Stack</h3>
              <ul>
                <li>Blender — 3D particle simulation and rendering</li>
                <li>Particle System — Emitter type with physics enabled</li>
                <li>1000 particles, 250 frames (Start 1, End 115,000)</li>
                <li>Arduino — ultrasonic steam generator circuit (iteration 2)</li>
                <li>Readymade projector — final projection medium</li>
                <li>White background render — optimised for projector output</li>
              </ul>
            </div>
            <div className="dc-doc-block">
              <h3>Three Approaches</h3>
              <ul>
                <li>Custom DIY projector — burned out from mains voltage</li>
                <li>Panasonic-inspired mist screen — distance made confetti invisible; steam hazard</li>
                <li>Blender render + readymade projector — final working solution</li>
              </ul>
            </div>
            <div className="dc-doc-block">
              <h3>Future Development</h3>
              <p>Texture and material variation for different confetti types (metallic, paper, ribbon). Interactive interface for users to select and customise confetti style before projection. More immersive multi-projector confetti shower environment.</p>
              <div className="dc-tag-list">
                {["Blender","Particle Systems","Projection","Environmental Design","Zero Waste","Arduino","Celebration","Ambient Art"].map(t => (
                  <span className="dc-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
