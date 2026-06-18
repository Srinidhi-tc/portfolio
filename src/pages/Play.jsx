import { useEffect, useRef } from "react";

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

function Cell({ src, alt = "", style = {} }) {
  return (
    <div
      data-reveal
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: "#E8E8E8",
        position: "relative",
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", background: "#E8E8E8" }} />
      )}
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
        @media (max-width: 640px) {
          .pg3  { grid-template-columns: 1fr 1fr !important; }
          .pg12 { grid-template-columns: 1fr !important; }
          .pg21 { grid-template-columns: 1fr !important; }
          .pgs  { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .pg3 { grid-template-columns: 1fr !important; }
          .pgs { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { transition: none !important; }
        }
      `}</style>

      {/* ZONE 1 — HERO */}
      <section style={{ padding: "clamp(72px, 10vw, 140px) clamp(24px, 8vw, 160px) clamp(40px, 5vw, 72px)" }}>
        <div data-reveal>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "#86868B", marginBottom: 16 }}>
            Side work
          </p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.05, color: "#1D1D1F", marginBottom: 16 }}>
            Play
          </h1>
          <p style={{ fontSize: "clamp(15px, 2vw, 19px)", fontWeight: 400, color: "#6E6E73", letterSpacing: "-0.1px", lineHeight: 1.4, marginBottom: 40, maxWidth: 480 }}>
            Interior design consultancy, 2019–2022.
          </p>

          {/* 3-stat strip */}
          <div className="pgs" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 480 }}>
            {[
              { value: "4",     label: "completed projects" },
              { value: "3 yrs", label: "running the studio" },
              { value: "₹ real",label: "client budgets managed" },
            ].map(({ value, label }) => (
              <div key={label} style={{ background: "#F5F5F7", borderRadius: 10, padding: "14px 16px" }}>
                <span style={{ display: "block", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600, letterSpacing: "-0.2px", color: "#1D1D1F", marginBottom: 2 }}>
                  {value}
                </span>
                <span style={{ fontSize: 12, color: "#86868B", lineHeight: 1.4 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE 2 — GALLERY */}
      <section style={{ padding: "0 clamp(24px, 8vw, 160px) clamp(40px, 6vw, 80px)" }}>

        {/* Row A — full width */}
        <div style={{ marginBottom: 6 }}>
          <Cell alt="Cinematic bedroom render" style={{ height: "clamp(220px, 40vw, 520px)" }} />
        </div>

        {/* Row B — 3 equal */}
        <div className="pg3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 6 }}>
          <Cell alt="Lavender bedroom render" style={{ height: "clamp(120px, 18vw, 240px)" }} />
          <Cell alt="Entrance sketch" style={{ height: "clamp(120px, 18vw, 240px)" }} />
          <Cell alt="Red bench detail" style={{ height: "clamp(120px, 18vw, 240px)" }} />
        </div>

        {/* Row C — 2/3 + 1/3 */}
        <div className="pg21" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 6, marginBottom: 6 }}>
          <Cell alt="Heritage corridor" style={{ height: "clamp(160px, 24vw, 340px)" }} />
          <Cell alt="Marble elevation plan" style={{ height: "clamp(160px, 24vw, 340px)" }} />
        </div>

        {/* Row D — 1/3 + 2/3 */}
        <div className="pg12" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 6, marginBottom: 6 }}>
          <Cell alt="Bedroom line sketch" style={{ height: "clamp(130px, 20vw, 280px)" }} />
          <Cell alt="Real entrance wide" style={{ height: "clamp(130px, 20vw, 280px)" }} />
        </div>

        {/* Row E — 3 equal small */}
        <div className="pg3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 6 }}>
          <Cell alt="TV unit sketch" style={{ height: "clamp(100px, 14vw, 180px)" }} />
          <Cell alt="Autumn colour palette" style={{ height: "clamp(100px, 14vw, 180px)" }} />
          <Cell alt="Chair detail" style={{ height: "clamp(100px, 14vw, 180px)" }} />
        </div>

        {/* Row F — full width closer */}
        <div>
          <Cell alt="Warli mural" style={{ height: "clamp(140px, 20vw, 280px)" }} />
        </div>
      </section>

      {/* ZONE 3 — FOOTER STRIP */}
      <section style={{ padding: "clamp(28px, 4vw, 48px) clamp(24px, 8vw, 160px)", borderTop: "0.5px solid rgba(0,0,0,0.10)" }}>
        <div data-reveal className="pg3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(24px, 4vw, 64px)" }}>
          {[
            { label: "Work type",    value: "Residential interiors" },
            { label: "Deliverables", value: "Plans · Procurement · Handover" },
            { label: "Location",     value: "Bangalore, India" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, color: "#86868B", marginBottom: 4, letterSpacing: "0.02em" }}>{label}</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#1D1D1F" }}>{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
