// TennisBall.jsx — v2
// Fixed: ball now starts exactly at the nav button position using
// getBoundingClientRect() + position:fixed translate, not offset from (0,0).

import { useRef, useState, useCallback } from "react";

function TennisBallSVG({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="9.5" fill="#C7F464" stroke="#A8D43A" strokeWidth="0.5"/>
      <path d="M3.5 6.5 C5 4, 8 3.5, 10 5 C12 6.5, 13 9, 12 11.5"
            stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M16.5 13.5 C15 16, 12 16.5, 10 15 C8 13.5, 7 11, 8 8.5"
            stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85"/>
    </svg>
  );
}

// Quadratic bezier point at t
function bezier(t, p0, p1, p2) {
  return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

// easing
const easeInOut = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
const easeOut   = t => 1 - (1-t)**3;

const BALL_SIZE = 22;

function animateArc({ flyEl, fromX, fromY, toX, toY, arcHeight, duration, rotations, easing, onProgress, onComplete }) {
  const start = performance.now();

  // Control point for the bezier curve — midpoint lifted by arcHeight
  const cpX = (fromX + toX) / 2;
  const cpY = Math.min(fromY, toY) + arcHeight; // arcHeight is negative = upward

  function frame(now) {
    const raw = Math.min((now - start) / duration, 1);
    const t   = easing(raw);

    const x = bezier(t, fromX, cpX, toX);
    const y = bezier(t, fromY, cpY, toY);
    const angle = raw * rotations * 360;

    // position: fixed, top:0, left:0 — translate moves from viewport origin
    flyEl.style.transform = `translate(${x - BALL_SIZE / 2}px, ${y - BALL_SIZE / 2}px) rotate(${angle}deg)`;
    onProgress?.(x, y, raw);

    if (raw < 1) {
      requestAnimationFrame(frame);
    } else {
      onComplete?.();
    }
  }
  requestAnimationFrame(frame);
}

export default function TennisBall() {
  const btnRef  = useRef(null);  // the visible nav ball
  const flyRef  = useRef(null);  // fixed flying clone
  const running = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true); // nav ball visibility

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const launch = useCallback(() => {
    if (running.current) return;

    // Reduced motion — just trigger reaction, no flight
    if (prefersReduced) {
      window.dispatchEvent(new CustomEvent("tennisball:impact"));
      return;
    }

    // ── Measure positions at the moment of click ──────────
    const btnRect = btnRef.current?.getBoundingClientRect();
    const dogEl   = document.querySelector(".floating-mascot");
    const dogRect = dogEl?.getBoundingClientRect();

    if (!btnRect || !dogRect) return;

    running.current = true;

    // Centre of the nav ball
    const fromX = btnRect.left + btnRect.width  / 2;
    const fromY = btnRect.top  + btnRect.height / 2;

    // Aim at the dog's upper-centre (head area)
    const toX   = dogRect.left + dogRect.width  / 2;
    const toY   = dogRect.top  + dogRect.height * 0.25;

    const fly = flyRef.current;

    // Place the flying ball exactly on the nav ball before making it visible
    fly.style.transform = `translate(${fromX - BALL_SIZE/2}px, ${fromY - BALL_SIZE/2}px)`;
    fly.style.opacity   = "1";
    fly.style.display   = "block";

    // Hide the original nav ball
    setVisible(false);

    // ── Phase 1 — fly TO dog ─────────────────────────────
    animateArc({
      flyEl:      fly,
      fromX, fromY,
      toX, toY,
      arcHeight:  -Math.abs(toY - fromY) * 0.7 - 60, // arc upward
      duration:   800,
      rotations:  2,
      easing:     easeInOut,
      onComplete() {
        // ── Phase 2 — dog reacts ─────────────────────────
        window.dispatchEvent(new CustomEvent("tennisball:impact"));

        setTimeout(() => {
          // Re-measure nav ball (user may have scrolled)
          const btnRect2 = btnRef.current?.getBoundingClientRect();
          if (!btnRect2) { cleanup(); return; }

          const backX = btnRect2.left + btnRect2.width  / 2;
          const backY = btnRect2.top  + btnRect2.height / 2;

          // ── Phase 3 — fly BACK from dog to nav ──────────
          animateArc({
            flyEl:     fly,
            fromX:     toX,
            fromY:     toY,
            toX:       backX,
            toY:       backY,
            arcHeight: -Math.abs(backY - toY) * 0.5 - 40,
            duration:  560,     // slightly faster return
            rotations: -1.5,    // reverse spin
            easing:    easeOut,
            onComplete: cleanup,
          });
        }, 420); // wait for dog jump animation
      },
    });

    function cleanup() {
      // Snap to exact nav position before hiding
      const r = btnRef.current?.getBoundingClientRect();
      if (r) {
        fly.style.transform = `translate(${r.left + r.width/2 - BALL_SIZE/2}px, ${r.top + r.height/2 - BALL_SIZE/2}px)`;
      }
      // Fade out flying ball
      fly.style.transition = "opacity 120ms ease";
      fly.style.opacity    = "0";
      setTimeout(() => {
        fly.style.display    = "none";
        fly.style.transition = "";
        // Fade original ball back in
        setVisible(true);
        running.current = false;
      }, 130);
    }
  }, [prefersReduced]);

  return (
    <>
      {/* ── Nav ball ─────────────────────────────────── */}
      <button
        ref={btnRef}
        onClick={launch}
        aria-label="Throw ball to dog"
        title="Throw ball to dog 🎾"
        style={{
          background:     "none",
          border:         "none",
          cursor:         "pointer",
          padding:        "4px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          borderRadius:   "50%",
          transform:      hovered ? "scale(1.15) rotate(8deg)" : "scale(1) rotate(0deg)",
          transition:     "transform 180ms ease-out, opacity 120ms ease",
          outline:        "none",
          marginLeft:     "4px",
          opacity:        visible ? 1 : 0,
          pointerEvents:  visible ? "auto" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={()    => setHovered(true)}
        onBlur={()     => setHovered(false)}
      >
        <TennisBallSVG size={BALL_SIZE} />
      </button>

      {/* ── Fixed flying ball — hidden until launched ─── */}
      <div
        ref={flyRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         BALL_SIZE,
          height:        BALL_SIZE,
          display:       "none",
          opacity:       0,
          pointerEvents: "none",
          zIndex:        9999,
          willChange:    "transform",
          filter:        "drop-shadow(0 4px 10px rgba(0,0,0,0.22))",
        }}
      >
        <TennisBallSVG size={BALL_SIZE} />
      </div>
    </>
  );
}
