// Play.jsx new play file 
// Drop this file into src/pages/ (or wherever your Work.jsx lives)
// Add your images to src/assets/play/ and update the imports below
// Route: add <Route path="/play" element={<Play />} /> in your App.js/router

import { useEffect, useRef } from "react";

// ─── REPLACE THESE with your actual image imports ───────────────────────────
// import img01 from "../assets/play/cinematic-bedroom.jpg";     // p2 top — wide hero
// import img02 from "../assets/play/corridor-doors.jpg";        // p4 — terracotta corridor
// import img03 from "../assets/play/warli-mural.jpg";           // p3 bottom — full width mural
// import img04 from "../assets/play/lavender-bedroom.jpg";      // p1 — procreate render
// import img05 from "../assets/play/entrance-sketch.jpg";       // p2 — terracotta entrance sketch
// import img06 from "../assets/play/entrance-real-wide.jpg";    // p3 — real entrance wide
// import img07 from "../assets/play/entrance-bench-detail.jpg"; // p3 — red bench close
// import img08 from "../assets/play/marble-elevation.jpg";      // p1 — marble wall plan
// import img09 from "../assets/play/bedroom-line-sketch.jpg";   // p1 — bedroom line sketch
// import img10 from "../assets/play/tv-unit-sketch.jpg";        // p1 — living room sketch
// import img11 from "../assets/play/autumn-palette.jpg";        // p2 — colour palette card
// import img12 from "../assets/play/entrance-chair-detail.jpg"; // p3 — chair detail

// Until you add real images, placeholders render as grey cells
const IMAGES = {
  hero:    null, // img01 — cinematic bedroom render. FULL WIDTH opener
  wide1:   null, // img02 — terracotta corridor. 2/3 wide
  full1:   null, // img03 — warli mural. FULL WIDTH
  render:  null, // img04 — lavender bedroom procreate
  sketch1: null, // img05 — entrance procreate sketch
  real1:   null, // img06 — real entrance wide
  detail1: null, // img07 — red bench close-up
  plan:    null, // img08 — marble elevation plan
  sketch2: null, // img09 — bedroom line sketch
  sketch3: null, // img10 — tv unit living room sketch
  palette: null, // img11 — autumn colour palette
  detail2: null, // img12 — chair detail
};

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useReveal(selector = "[data-reveal]") {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = container.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = `opacity 600ms cubic-bezier(0.25,0.1,0.25,1) ${i * 60}ms, transform 600ms cubic-bezier(0.25,0.1,0.25,1) ${i * 60}ms`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [selector]);
  return containerRef;
}

// ─── Image cell ─────────────────────────────────────────────────────────────
function Cell({ src, alt = "", style = {}, className = "" }) {
  return (
    <div
      data-reveal
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: "#EBEBEB",
        position: "relative",
        ...style,
      }}
      className={className}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        // Placeholder — remove once real images are added
        <div style={{ width: "100%", height: "100%", background: "#E8E8E8" }} />
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function Play() {
  const pageRef = useReveal();

  return (
    <div
      ref={pageRef}
      style={{
        fontFamily: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif`,
        background: "#ffffff",
        color: "#1D1D1F",
        paddingTop: 52, // nav height
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .play-grid-3  { grid-template-columns: 1fr 1fr !important; }
          .play-grid-12 { grid-template-columns: 1fr !important; }
          .play-grid-21 { grid-template-columns: 1fr !important; }
          .play-grid-2  { grid-template-columns: 1fr !important; }
          .play-stats   { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .play-grid-3  { grid-template-columns: 1fr !important; }
          .play-stats   { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { transition: none !important; }
        }
      `}</style>

      {/* ── ZONE 1: HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(72px, 10vw, 140px) clamp(24px, 8vw, 160px) clamp(40px, 5vw, 72px)",
        }}
      >
        <div data-reveal>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#86868B",
              marginBottom: 16,
            }}
          >
            Side work
          </p>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              lineHeight: 1.05,
              color: "#1D1D1F",
              marginBottom: 16,
            }}
          >
            Play
          </h1>

          {/* Subheading — PICK ONE and delete the others */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              fontWeight: 400,
              color: "#6E6E73",
              letterSpacing: "-0.1px",
              lineHeight: 1.4,
              marginBottom: 40,
              maxWidth: 480,
            }}
          >
            Interior design consultancy, 2019–2022.
            {/* Alternative subheadings — uncomment to try:
            Real spaces. Real clients.
            From blueprint to handover.
            Spaces built, budgets kept.
            */}
          </p>

          {/* 3-stat strip */}
          <div
            className="play-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              maxWidth: 480,
            }}
          >
            {[
              { value: "4",      label: "completed projects" },
              { value: "3 yrs",  label: "running the studio" },
              { value: "₹ real", label: "client budgets managed" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: "#F5F5F7",
                  borderRadius: 10,
                  padding: "14px 16px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(18px, 2.5vw, 24px)",
                    fontWeight: 600,
                    letterSpacing: "-0.2px",
                    color: "#1D1D1F",
                    marginBottom: 2,
                  }}
                >
                  {value}
                </span>
                <span style={{ fontSize: 12, color: "#86868B", lineHeight: 1.4 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZONE 2: GALLERY ───────────────────────────────────────────── */}
      <section
        style={{
          padding: "0 clamp(24px, 8vw, 160px) clamp(40px, 6vw, 80px)",
        }}
      >
        {/* ROW A — full width hero image */}
        <div style={{ marginBottom: 6 }}>
          <Cell
            src={IMAGES.hero}
            alt="Cinematic bedroom render — city view at dusk"
            style={{ height: "clamp(220px, 40vw, 520px)" }}
          />
        </div>

        {/* ROW B — 3 equal columns */}
        <div
          className="play-grid-3"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 6 }}
        >
          <Cell src={IMAGES.render}  alt="Lavender bedroom — Procreate render" style={{ height: "clamp(120px, 18vw, 240px)" }} />
          <Cell src={IMAGES.sketch1} alt="Terracotta entrance — Procreate sketch" style={{ height: "clamp(120px, 18vw, 240px)" }} />
          <Cell src={IMAGES.detail1} alt="Red bench — construction detail" style={{ height: "clamp(120px, 18vw, 240px)" }} />
        </div>

        {/* ROW C — 2/3 + 1/3 */}
        <div
          className="play-grid-21"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 6, marginBottom: 6 }}
        >
          <Cell src={IMAGES.wide1}   alt="Heritage corridor — terracotta tile, wooden doors" style={{ height: "clamp(160px, 24vw, 340px)" }} />
          <Cell src={IMAGES.plan}    alt="Marble wall elevation plan" style={{ height: "clamp(160px, 24vw, 340px)" }} />
        </div>

        {/* ROW D — 1/3 + 2/3 */}
        <div
          className="play-grid-12"
          style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 6, marginBottom: 6 }}
        >
          <Cell src={IMAGES.sketch2} alt="Bedroom line sketch — perspective" style={{ height: "clamp(130px, 20vw, 280px)" }} />
          <Cell src={IMAGES.real1}   alt="Real entrance — brick, pendant lights" style={{ height: "clamp(130px, 20vw, 280px)" }} />
        </div>

        {/* ROW E — 3 equal, smaller */}
        <div
          className="play-grid-3"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 6 }}
        >
          <Cell src={IMAGES.sketch3} alt="TV unit living room sketch" style={{ height: "clamp(100px, 14vw, 180px)" }} />
          <Cell src={IMAGES.palette} alt="Autumn colour palette" style={{ height: "clamp(100px, 14vw, 180px)" }} />
          <Cell src={IMAGES.detail2} alt="Chair detail — construction" style={{ height: "clamp(100px, 14vw, 180px)" }} />
        </div>

        {/* ROW F — full width warli mural — the signature image */}
        <div>
          <Cell
            src={IMAGES.full1}
            alt="Warli-style painted wall mural — folk art procession"
            style={{ height: "clamp(140px, 20vw, 280px)" }}
          />
        </div>
      </section>

      {/* ── ZONE 3: FOOTER STRIP ──────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(28px, 4vw, 48px) clamp(24px, 8vw, 160px)",
          borderTop: "0.5px solid rgba(0,0,0,0.10)",
        }}
      >
        <div
          data-reveal
          className="play-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(24px, 4vw, 64px)",
          }}
        >
          {[
            { label: "Work type",    value: "Residential interiors" },
            { label: "Deliverables", value: "Plans · Procurement · Handover" },
            { label: "Location",     value: "Bangalore, India" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, color: "#86868B", marginBottom: 4, letterSpacing: "0.02em" }}>
                {label}
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#1D1D1F" }}>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
