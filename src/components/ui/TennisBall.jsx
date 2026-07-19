// TennisBall.jsx
// Self-contained tennis ball interaction.
// Sits beside nav links. Click → arc to dog → dog reacts → ball returns.
// No new dependencies — pure requestAnimationFrame arcs.
// Respects prefers-reduced-motion.

import { useRef, useState, useEffect, useCallback } from "react";

// ── Tennis ball SVG ──────────────────────────────────────
function TennisBallSVG({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9.5" fill="#C7F464" stroke="#A8D43A" strokeWidth="0.5" />
      {/* White seam curves — realistic tennis ball lines */}
      <path
        d="M3.5 6.5 C5 4, 8 3.5, 10 5 C12 6.5, 13 9, 12 11.5"
        stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M16.5 13.5 C15 16, 12 16.5, 10 15 C8 13.5, 7 11, 8 8.5"
        stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

// ── Easing functions ─────────────────────────────────────
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeOut   = (t) => 1 - Math.pow(1 - t, 3);

// ── Arc animation via rAF ────────────────────────────────
function animateArc({
  flyEl,        // the fixed-position flying ball element
  fromX, fromY, // start centre coords
  toX, toY,     // end centre coords
  arcHeight,    // how high the arc peaks (negative = up)
  duration,     // ms
  rotations,    // how many full rotations during flight
  easing,       // easing fn
  onComplete,
}) {
  const start = performance.now();
  const SIZE  = 20; // ball diameter

  function frame(now) {
    const elapsed = now - start;
    const raw     = Math.min(elapsed / duration, 1);
    const t       = easing(raw);

    // Quadratic bezier arc
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2 + arcHeight;

    const x = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * midX + t * t * toX;
    const y = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * midY + t * t * toY;
    const angle = raw * rotations * 360;

    flyEl.style.transform = `translate(${x - SIZE / 2}px, ${y - SIZE / 2}px) rotate(${angle}deg)`;

    if (raw < 1) {
      requestAnimationFrame(frame);
    } else {
      onComplete?.();
    }
  }
  requestAnimationFrame(frame);
}

// ── Main component ───────────────────────────────────────
export default function TennisBall() {
  const btnRef   = useRef(null);   // the nav ball button
  const flyRef   = useRef(null);   // the fixed flying clone
  const running  = useRef(false);  // prevent re-entry
  const [hovered, setHovered] = useState(false);

  const prefersReduced = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const launch = useCallback(() => {
    if (running.current) return;

    // ── Reduced motion: just trigger dog reaction, no animation ──
    if (prefersReduced.current) {
      window.dispatchEvent(new CustomEvent("tennisball:impact"));
      return;
    }

    // ── Find positions ────────────────────────────────────
    const btnRect = btnRef.current?.getBoundingClientRect();
    const dogEl   = document.querySelector(".floating-mascot");
    const dogRect = dogEl?.getBoundingClientRect();

    if (!btnRect || !dogRect) return;

    running.current = true;

    const fromX = btnRect.left + btnRect.width  / 2;
    const fromY = btnRect.top  + btnRect.height / 2;
    const toX   = dogRect.left + dogRect.width  / 2;
    const toY   = dogRect.top  + dogRect.height / 3; // aim at dog's head area

    // ── Show flying ball ──────────────────────────────────
    const fly = flyRef.current;
    fly.style.opacity  = "1";
    fly.style.display  = "block";

    // ── Phase 1 — ball flies TO the dog ──────────────────
    animateArc({
      flyEl:     fly,
      fromX, fromY,
      toX, toY,
      arcHeight: -Math.abs(toY - fromY) * 0.6 - 80, // arc upward
      duration:  800,
      rotations: 2,
      easing:    easeInOut,
      onComplete() {
        // ── Phase 2 — dog reacts ─────────────────────────
        window.dispatchEvent(new CustomEvent("tennisball:impact"));

        setTimeout(() => {
          // ── Phase 3 — ball returns from dog ─────────────
          const btnRect2 = btnRef.current?.getBoundingClientRect();
          if (!btnRect2) { cleanup(); return; }

          const backX = btnRect2.left + btnRect2.width  / 2;
          const backY = btnRect2.top  + btnRect2.height / 2;

          animateArc({
            flyEl:     fly,
            fromX:     toX,
            fromY:     toY,
            toX:       backX,
            toY:       backY,
            arcHeight: -Math.abs(backY - toY) * 0.5 - 60,
            duration:  600,          // slightly faster return
            rotations: -1.5,         // reverse spin
            easing:    easeOut,
            onComplete: cleanup,
          });
        }, 450); // wait for dog reaction
      },
    });

    function cleanup() {
      fly.style.opacity = "0";
      setTimeout(() => {
        fly.style.display = "none";
        running.current = false;
      }, 120);
    }
  }, []);

  return (
    <>
      {/* ── Nav ball button ────────────────────────────── */}
      <button
        ref={btnRef}
        onClick={launch}
        aria-label="Throw ball to dog"
        title="Throw ball to dog 🎾"
        style={{
          background:  "none",
          border:      "none",
          cursor:      "pointer",
          padding:     "4px",
          display:     "flex",
          alignItems:  "center",
          justifyContent: "center",
          borderRadius: "50%",
          transform:   hovered ? "scale(1.15) rotate(8deg)" : "scale(1) rotate(0deg)",
          transition:  "transform 180ms ease-out",
          outline:     "none",
          marginLeft:  "4px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <TennisBallSVG size={20} />
      </button>

      {/* ── Fixed flying ball (hidden until launched) ────── */}
      <div
        ref={flyRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         20,
          height:        20,
          display:       "none",
          opacity:       0,
          pointerEvents: "none",
          zIndex:        9999,
          transition:    "opacity 120ms ease",
          filter:        "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
        }}
      >
        <TennisBallSVG size={20} />
      </div>
    </>
  );
}
