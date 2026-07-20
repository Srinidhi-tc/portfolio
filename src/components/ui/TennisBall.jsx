// TennisBall.jsx — v3
// Icon: Apple-minimal 3D tennis ball traced from reference images.
//   - Radial gradient: bright yellow-green highlight top-left → deep green bottom-right
//   - Single wide white seam curve (bottom-left → top-right arc)
//   - Soft elliptical drop shadow
//   - Slight specular glint top-left for 3D depth
// Animation: ball flies from exact nav position → dog head → kicked back → snaps to nav.

import { useRef, useState, useCallback } from "react";

// ── Tennis ball SVG icon ────────────────────────────────────────────────────
function TennisBallSVG({ size = 24 }) {
  const id = "tb";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        {/* Main body gradient — bright top-left, deep bottom-right */}
        <radialGradient id={`${id}-body`} cx="35%" cy="30%" r="70%" fx="30%" fy="25%">
          <stop offset="0%"   stopColor="#D4F06B" />
          <stop offset="35%"  stopColor="#AADB35" />
          <stop offset="75%"  stopColor="#7DB52A" />
          <stop offset="100%" stopColor="#5A8A1A" />
        </radialGradient>

        {/* Specular glint — tiny bright spot top-left */}
        <radialGradient id={`${id}-glint`} cx="30%" cy="28%" r="30%">
          <stop offset="0%"  stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Shadow blur */}
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="150%" height="160%">
          <feDropShadow dx="0.5" dy="2.5" stdDeviation="2"
                        floodColor="#4A7010" floodOpacity="0.35" />
        </filter>

        {/* Clip to circle */}
        <clipPath id={`${id}-clip`}>
          <circle cx="16" cy="15.5" r="13.5" />
        </clipPath>
      </defs>

      {/* Soft elliptical ground shadow */}
      <ellipse cx="16" cy="29" rx="10" ry="2.5"
               fill="#3A6010" opacity="0.18" />

      {/* Ball body with drop shadow */}
      <circle cx="16" cy="15.5" r="13.5"
              fill={`url(#${id}-body)`}
              filter={`url(#${id}-shadow)`} />

      {/* White seam — single wide curve, bottom-left arc to top-right */}
      {/* Traced from reference: smooth S-like path across the ball */}
      <g clipPath={`url(#${id}-clip)`}>
        <path
          d="M 4 22 C 7 18, 10 10, 18 8 C 22 7, 26 8, 28 10"
          stroke="white"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.92"
        />
        {/* Seam inner edge — very subtle darker line for depth */}
        <path
          d="M 4 22 C 7 18, 10 10, 18 8 C 22 7, 26 8, 28 10"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Specular glint overlay */}
      <circle cx="16" cy="15.5" r="13.5"
              fill={`url(#${id}-glint)`}
              clipPath={`url(#${id}-clip)`} />
    </svg>
  );
}

// ── Bezier helpers ───────────────────────────────────────────────────────────
function bezierPoint(t, p0, cp, p1) {
  return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * cp + t * t * p1;
}

const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const easeOut   = t => 1 - (1 - t) ** 3;

const BALL_SIZE = 26;

function animateArc({ flyEl, fromX, fromY, toX, toY, cpY, duration, rotations, easing, onComplete }) {
  const start = performance.now();
  const cpX   = (fromX + toX) / 2;

  function frame(now) {
    const raw = Math.min((now - start) / duration, 1);
    const t   = easing(raw);

    const x     = bezierPoint(t, fromX, cpX, toX);
    const y     = bezierPoint(t, fromY, cpY, toY);
    const angle = raw * rotations * 360;

    flyEl.style.transform = `translate(${x - BALL_SIZE / 2}px, ${y - BALL_SIZE / 2}px) rotate(${angle}deg)`;

    if (raw < 1) requestAnimationFrame(frame);
    else onComplete?.();
  }
  requestAnimationFrame(frame);
}

// ── Component ────────────────────────────────────────────────────────────────
export default function TennisBall() {
  const btnRef  = useRef(null);
  const flyRef  = useRef(null);
  const running = useRef(false);
  const [hovered,  setHovered]  = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const launch = useCallback(() => {
    if (running.current) return;

    if (prefersReduced) {
      window.dispatchEvent(new CustomEvent("tennisball:impact"));
      return;
    }

    // ── 1. Measure positions ────────────────────────────
    const btnRect = btnRef.current?.getBoundingClientRect();
    const dogEl   = document.querySelector(".floating-mascot");
    const dogRect = dogEl?.getBoundingClientRect();
    if (!btnRect || !dogRect) return;

    running.current = true;

    // Nav ball centre — exact start point
    const fromX = btnRect.left + btnRect.width  / 2;
    const fromY = btnRect.top  + btnRect.height / 2;

    // Dog head — top-centre of the mascot element
    const toX = dogRect.left + dogRect.width  / 2;
    const toY = dogRect.top  + 16; // just above the dog's head

    const fly = flyRef.current;

    // ── 2. Pre-position flying ball exactly on nav ball ──
    fly.style.transition  = "";
    fly.style.transform   = `translate(${fromX - BALL_SIZE / 2}px, ${fromY - BALL_SIZE / 2}px)`;
    fly.style.display     = "block";
    fly.style.opacity     = "1";

    // Hide original nav ball
    setNavVisible(false);

    // Arc control point — peak of the arc (above midpoint)
    const outboundCpY = Math.min(fromY, toY) - 140;

    // ── 3. Phase 1 — fly TO dog head ────────────────────
    animateArc({
      flyEl: fly,
      fromX, fromY,
      toX, toY,
      cpY:       outboundCpY,
      duration:  750,
      rotations: 2.5,
      easing:    easeInOut,
      onComplete() {

        // ── 4. Phase 2 — dog reacts ──────────────────────
        window.dispatchEvent(new CustomEvent("tennisball:impact"));

        setTimeout(() => {
          // Re-measure nav ball (scroll may have moved it)
          const r2 = btnRef.current?.getBoundingClientRect();
          if (!r2) { cleanup(); return; }

          const backX = r2.left + r2.width  / 2;
          const backY = r2.top  + r2.height / 2;

          // Arc control point for return — slightly different trajectory
          const returnCpY = Math.min(toY, backY) - 100;

          // ── 5. Phase 3 — fly BACK to nav ─────────────
          animateArc({
            flyEl: fly,
            fromX:     toX,
            fromY:     toY,
            toX:       backX,
            toY:       backY,
            cpY:       returnCpY,
            duration:  580,
            rotations: -2,     // reverse spin on return
            easing:    easeOut,
            onComplete: cleanup,
          });
        }, 380);
      },
    });

    function cleanup() {
      // Snap to exact nav position before fading
      const r = btnRef.current?.getBoundingClientRect();
      if (r) {
        fly.style.transform = `translate(${r.left + r.width / 2 - BALL_SIZE / 2}px, ${r.top + r.height / 2 - BALL_SIZE / 2}px)`;
      }
      fly.style.transition = "opacity 100ms ease";
      fly.style.opacity    = "0";
      setTimeout(() => {
        fly.style.display    = "none";
        fly.style.transition = "";
        setNavVisible(true);
        running.current = false;
      }, 110);
    }
  }, [prefersReduced]);

  return (
    <>
      {/* ── Nav tennis ball button ──────────────────────── */}
      <button
        ref={btnRef}
        onClick={launch}
        aria-label="Throw tennis ball to dog"
        title="🎾 Throw to dog"
        style={{
          background:     "none",
          border:         "none",
          cursor:         "pointer",
          padding:        "3px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          borderRadius:   "50%",
          outline:        "none",
          marginLeft:     "6px",
          opacity:        navVisible ? 1 : 0,
          pointerEvents:  navVisible ? "auto" : "none",
          transform:      hovered
            ? "scale(1.18) rotate(10deg)"
            : "scale(1) rotate(0deg)",
          transition:     "transform 180ms ease-out, opacity 100ms ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={()    => setHovered(true)}
        onBlur={()     => setHovered(false)}
      >
        <TennisBallSVG size={BALL_SIZE} />
      </button>

      {/* ── Fixed flying ball — hidden until launched ───── */}
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
          willChange:    "transform, opacity",
        }}
      >
        <TennisBallSVG size={BALL_SIZE} />
      </div>
    </>
  );
}
