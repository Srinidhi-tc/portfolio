import { useEffect, useRef } from "react";

import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";
import p5 from "../assets/p5.png";
import p6 from "../assets/p6.png";
import p7 from "../assets/p7.png";
import p8 from "../assets/p8.png";
import p9 from "../assets/p9.png";

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

function Cell({ src, alt = "" }) {
  return (
    <div
      data-reveal
      style={{
        borderRadius: 10,
        overflow: "hidden",
        background: "#F0F0F0",
        padding: 8,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 4,
          /* crops white space by letting image dictate height */
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default function Play() {
  const pageRef = useReveal();

  return (
    <div
      ref={pageRef}
      style={{
        fontFamily: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif`,
        background: "#ffffff",
        color: "#1D1D1F",
        paddingTop: 52,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        .pg3  { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 6px; }
        .pg21 { display: grid; grid-template-columns: 2fr 1fr;     gap: 6px; margin-bottom: 6px; }
        .pg12 { display: grid; grid-template-columns: 1fr 2fr;     gap: 6px; margin-bottom: 6px; }
        .pgs  { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; max-width: 480px; }
        @media (max-width: 640px) {
          .pg3  { grid-template-columns: 1fr 1fr !important; }
          .pg21 { grid-template-columns: 1fr !important; }
          .pg12 { grid-template-columns: 1fr !important; }
          .pgs  { grid-template-columns: 1fr 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { transition: none !important; }
        }
      `}</style>

      {/* ZONE 1 — HERO */}
      <section style={{ padding: "clamp(72px,10vw,140px) clamp(24px,8vw,160px) clamp(40px,5vw,72px)" }}>
        <div data-reveal>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "#86868B", marginBottom: 16 }}>
            Creative practice
          </p>
          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.05, color: "#1D1D1F", marginBottom: 16 }}>
            Play
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,19px)", fontWeight: 400, color: "#6E6E73", letterSpacing: "-0.1px", lineHeight: 1.4, marginBottom: 40, maxWidth: 480 }}>
            Independent design studio, 2019–2022.
          </p>
          <div className="pgs">
            {[
              { value: "8",          label: "Clients" },
              { value: "2 yrs",      label: "Independent Studio" },
              { value: "End-to-end", label: "Design to Handover" },
            ].map(({ value, label }) => (
              <div key={label} style={{ background: "#F5F5F7", borderRadius: 10, padding: "14px 16px" }}>
                <span style={{ display: "block", fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 600, letterSpacing: "-0.2px", color: "#1D1D1F", marginBottom: 2 }}>
                  {value}
                </span>
                <span style={{ fontSize: 12, color: "#86868B", lineHeight: 1.4 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE 2 — GALLERY */}
      <section style={{ padding: "0 clamp(24px,8vw,160px) clamp(40px,6vw,80px)" }}>

        {/* Row A — full width hero */}
        <div style={{ marginBottom: 6 }}>
          <Cell src={p1} alt="Cinematic bedroom" />
        </div>

        {/* Row B — 3 equal */}
        <div className="pg3">
          <Cell src={p2} alt="Lavender bedroom render" />
          <Cell src={p3} alt="Entrance sketch" />
          <Cell src={p4} alt="Red bench detail" />
        </div>

        {/* Row C — 2/3 + 1/3 */}
        <div className="pg21">
          <Cell src={p5} alt="Heritage corridor" />
          <Cell src={p6} alt="Marble elevation plan" />
        </div>

        {/* Row D — 1/3 + 2/3 */}
        <div className="pg12">
          <Cell src={p7} alt="Bedroom line sketch" />
          <Cell src={p8} alt="Real entrance wide" />
        </div>

        {/* Row E — 3 equal small */}
        <div className="pg3">
          <Cell src={p9}  alt="TV unit sketch" />
          <Cell src={p10} alt="Autumn colour palette" />
          <Cell src={p11} alt="Chair detail" />
        </div>

        {/* Row F — full width closer */}
        <div>
          <Cell src={p12} alt="Warli mural" />
        </div>
      </section>

      {/* ZONE 3 — FOOTER STRIP */}
      <section style={{ padding: "clamp(28px,4vw,48px) clamp(24px,8vw,160px)", borderTop: "0.5px solid rgba(0,0,0,0.10)" }}>
        <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(24px,4vw,64px)" }}>
          {[
            { label: "Work type",    value: "Residential interiors" },
            { label: "Deliverables", value: "Plans · Procurement · Save Budget · Handover" },
            { label: "Location",     value: "Chennai, India" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, color: "#86868B", marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#1D1D1F" }}>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
