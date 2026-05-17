import { useEffect, useRef, useState } from "react";

/**
 * Interactive volleyball toy in the hero.
 *
 * ARCHITECTURE (preserved from previous iteration):
 *   • Phase state machine: idle → anticipate → flying → kicked → returning → snap
 *   • RAF-driven `tween()` helper — no external animation library
 *   • Custom events dispatched for the mascot to react to:
 *       - "volleyball:approaching" (~70% through outbound)
 *       - "volleyball:tracking"   (each outbound frame, with ball X)
 *       - "volleyball:kicked"     (on impact)
 *
 * POLISH PASS additions (layered on, not replacing):
 *   • Per-click randomized flight parameters → no two throws identical.
 *   • Outbound and return paths are cubic-Bezier curves generated at runtime
 *     from start, end, viewport-relative apex; scales naturally with layout.
 *   • Rotation accumulates from frame-to-frame velocity, not linear time —
 *     fast segments spin visibly faster, slow segments coast.
 *   • Subtle drop-shadow blur breathes with velocity (cheap motion-blur cue).
 *   • Squash/stretch on impact is restrained (avoids cartoony).
 *   • Dust burst toned down to 6 particles, softer, shorter range.
 *   • Magnetic ring pulse on the button when the ball lands back home.
 *
 * IMPORTANT — Icon source:
 *   The user wants the actual red/white/blue volleyball image as the texture.
 *   Drop a PNG at src/assets/volleyball.png and flip BALL_IMAGE_PATH below.
 *   Until then, a recolored SVG stands in.
 */

// Set to a real import path once the user uploads volleyball.png:
//   import volleyballPng from "../../assets/volleyball.png";
//   const BALL_IMAGE_SRC = volleyballPng;
const BALL_IMAGE_SRC = null;

export default function VolleyballToy() {
  const buttonRef = useRef(null);
  const flyRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const [phase, setPhase] = useState("idle");

  // -------------------- Reduced motion --------------------
  const reducedRef = useRef(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = m.matches;
    const handler = (e) => (reducedRef.current = e.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  // -------------------- Animation primitives --------------------

  // Linear-time RAF tween. Returns a promise resolved on completion.
  // (Preserved verbatim from prior implementation.)
  const tween = (duration, onFrame) =>
    new Promise((resolve) => {
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        onFrame(t);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      rafRef.current = requestAnimationFrame(step);
    });

  // Cubic Bezier point evaluation. Used for both outbound and return arcs.
  const bezierPoint = (t, p0, p1, p2, p3) => {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;
    return {
      x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
      y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
    };
  };

  // Per-click flight parameters — randomized so consecutive throws differ.
  const generateFlightParams = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.hypot(dx, dy);

    // Apex height scales with distance plus randomness — 26-34% of distance.
    const baseLift = distance * 0.3;
    const outLift = baseLift * (0.86 + Math.random() * 0.28);
    // Return arc is intentionally taller (reads as a kick up).
    const returnLift = baseLift * (1.05 + Math.random() * 0.25);

    // Spin totals (degrees). 540-880.
    const outSpin = 540 + Math.random() * 340;
    const returnSpin = -(540 + Math.random() * 340); // opposite sense

    // Slight launch-angle bias on the control points so the curve leaves
    // the button at a slightly different angle each throw.
    const angleNudge = (Math.random() - 0.5) * 0.16; // ~±9°

    // Intercept-X jitter: dog catches at a slightly different horizontal
    // position. Tiny (±12px) so it stays believable.
    const interceptJitterX = (Math.random() - 0.5) * 24;

    return { outLift, returnLift, outSpin, returnSpin, angleNudge, interceptJitterX };
  };

  // -------------------- Dust burst --------------------
  const spawnDustBurst = (cx, cy) => {
    const colors = ["#e9dcbe", "#d9c8a8", "#c9b48c"];
    const count = 6; // softer than before
    for (let i = 0; i < count; i++) {
      const dust = document.createElement("span");
      dust.className = "volleyball-dust";
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 18 + Math.random() * 14;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 6;
      const size = 3.5 + Math.random() * 2.5;
      dust.style.cssText = `
        position: fixed;
        left: ${cx}px;
        top: ${cy}px;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[i % colors.length]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 55;
        opacity: 0.7;
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;
      document.body.appendChild(dust);
      setTimeout(() => dust.remove(), 620);
    }
  };

  // -------------------- Magnetic ring pulse (snap moment) --------------------
  const pulseRing = () => {
    const ring = ringRef.current;
    if (!ring) return;
    ring.classList.remove("volleyball-btn__ring--active");
    // Force reflow so the animation restarts even on rapid replays.
    void ring.offsetWidth;
    ring.classList.add("volleyball-btn__ring--active");
  };

  // -------------------- The launch sequence --------------------
  const launch = async () => {
    if (phase !== "idle") return;

    const button = buttonRef.current;
    const fly = flyRef.current;
    const mascot = document.querySelector(".floating-mascot");
    if (!button || !fly || !mascot) return;

    // Reduced motion: ball stays put, mascot still reacts.
    if (reducedRef.current) {
      window.dispatchEvent(new CustomEvent("volleyball:kicked"));
      return;
    }

    const bRect = button.getBoundingClientRect();
    const mRect = mascot.getBoundingClientRect();
    const BALL = 32; // ball element is 32×32

    // Endpoints (centered).
    const startPt = {
      x: bRect.left + bRect.width / 2 - BALL / 2,
      y: bRect.top + bRect.height / 2 - BALL / 2,
    };
    const interceptYBand = mRect.top - 20 - Math.random() * 40; // 20-60 px above dog
    const endPt = {
      x: mRect.left + mRect.width / 2 - BALL / 2,
      y: interceptYBand - BALL / 2,
    };

    const params = generateFlightParams(startPt, endPt);
    endPt.x += params.interceptJitterX;

    // ---------- 1) Anticipation wobble ----------
    setPhase("anticipate");
    await tween(160, (t) => {
      const wave = Math.sin(t * Math.PI);
      const scale = 1 - 0.07 * wave;
      const rotate = -10 * wave;
      button.style.translate = `0 ${1.5 * wave}px`;
      button.style.rotate = `${rotate}deg`;
      button.style.scale = `${scale}`;
    });
    button.style.translate = "";
    button.style.rotate = "";
    button.style.scale = "";

    // ---------- 2) Outbound flight — cubic Bezier ----------
    setPhase("flying");
    fly.style.opacity = "1";

    // Bezier control points. The first control pulls the ball up
    // sharply from the button (with the angle nudge), the second
    // hangs above the target so the ball "drops" into the catch.
    const outDx = endPt.x - startPt.x;
    const p0 = { ...startPt };
    const p1 = {
      x: startPt.x + outDx * 0.22 + params.angleNudge * 80,
      y: startPt.y - params.outLift,
    };
    const p2 = {
      x: startPt.x + outDx * 0.78,
      y: endPt.y - params.outLift * 0.55,
    };
    const p3 = { ...endPt };

    let prevPoint = startPt;
    let accumulatedSpin = 0;
    let approachFired = false;
    let lastTrackFire = 0;

    const OUT_DUR = 780;
    await tween(OUT_DUR, (t) => {
      const pt = bezierPoint(t, p0, p1, p2, p3);
      // Velocity-driven rotation. Faster segments visibly spin faster.
      const segDist = Math.hypot(pt.x - prevPoint.x, pt.y - prevPoint.y);
      accumulatedSpin += (segDist / 4.5) * (params.outSpin / 120);
      prevPoint = pt;

      // Speed proxy in [0..1] for motion-blur and breathe.
      const speedNorm = Math.min(segDist / 9, 1);
      const blur = speedNorm * 1.2;
      const breathe = 1 + 0.035 * Math.sin(t * Math.PI);

      fly.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) rotate(${accumulatedSpin}deg) scale(${breathe})`;
      fly.style.filter = `drop-shadow(0 ${6 + speedNorm * 4}px ${10 + speedNorm * 6}px rgba(58,47,37,0.22)) blur(${blur}px)`;

      // Throttled tracking event for mascot head-lean.
      const nowMs = performance.now();
      if (nowMs - lastTrackFire > 50) {
        lastTrackFire = nowMs;
        window.dispatchEvent(
          new CustomEvent("volleyball:tracking", { detail: { x: pt.x + BALL / 2 } }),
        );
      }

      if (!approachFired && t > 0.65) {
        approachFired = true;
        window.dispatchEvent(new CustomEvent("volleyball:approaching"));
      }
    });

    // Reset mascot lean after flight.
    window.dispatchEvent(
      new CustomEvent("volleyball:tracking", { detail: { x: null } }),
    );

    // ---------- 3) Impact — restrained squash + dust + kick event ----------
    spawnDustBurst(endPt.x + BALL / 2, endPt.y + BALL / 2);
    window.dispatchEvent(new CustomEvent("volleyball:kicked"));
    setPhase("kicked");

    await tween(200, (t) => {
      const wave = Math.sin(t * Math.PI);
      const sx = 1 + 0.12 * wave; // toned down from 0.28
      const sy = 1 - 0.09 * wave; // toned down from 0.22
      fly.style.transform = `translate3d(${endPt.x}px, ${endPt.y}px, 0) rotate(${accumulatedSpin}deg) scale(${sx}, ${sy})`;
      fly.style.filter = `drop-shadow(0 8px 12px rgba(58,47,37,0.22))`;
    });

    // ---------- 4) Return flight — different curve from outbound ----------
    setPhase("returning");

    const retDx = startPt.x - endPt.x;
    const r0 = { ...endPt };
    const r1 = {
      x: endPt.x + retDx * 0.18,
      y: endPt.y - params.returnLift * 0.95,
    };
    const r2 = {
      x: endPt.x + retDx * 0.72 + params.angleNudge * -50, // mirror nudge
      y: startPt.y - params.returnLift * 0.4,
    };
    const r3 = { ...startPt };

    prevPoint = endPt;
    let retSpin = accumulatedSpin;

    const RET_DUR = 820;
    await tween(RET_DUR, (t) => {
      const pt = bezierPoint(t, r0, r1, r2, r3);
      const segDist = Math.hypot(pt.x - prevPoint.x, pt.y - prevPoint.y);
      retSpin += (segDist / 4.5) * (params.returnSpin / 120);
      prevPoint = pt;

      const speedNorm = Math.min(segDist / 9, 1);
      const blur = speedNorm * 1.2;

      fly.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) rotate(${retSpin}deg)`;
      fly.style.filter = `drop-shadow(0 ${6 + speedNorm * 4}px ${10 + speedNorm * 6}px rgba(58,47,37,0.22)) blur(${blur}px)`;
    });

    // ---------- 5) Magnetic snap — spring oscillation + ring pulse ----------
    setPhase("snap");
    pulseRing();
    await tween(360, (t) => {
      const osc = Math.cos(t * 14) * Math.exp(-t * 5);
      const sx = 1 + 0.05 * osc;
      const sy = 1 - 0.035 * osc;
      fly.style.transform = `translate3d(${startPt.x}px, ${startPt.y}px, 0) rotate(0deg) scale(${sx}, ${sy})`;
      fly.style.filter = `drop-shadow(0 6px 10px rgba(58,47,37,0.18))`;
    });

    // ---------- 6) Settle ----------
    fly.style.opacity = "0";
    fly.style.filter = "";
    fly.style.transform = `translate3d(${startPt.x}px, ${startPt.y}px, 0)`;
    setPhase("idle");
  };

  // Cleanup any pending RAF when component unmounts.
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      launch();
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`volleyball-btn volleyball-btn--${phase}`}
        onClick={launch}
        onKeyDown={onKeyDown}
        aria-label="Throw the volleyball to the dog"
        aria-pressed={phase !== "idle"}
        disabled={phase !== "idle"}
      >
        <span className="volleyball-btn__glow" aria-hidden="true" />
        <span
          ref={ringRef}
          className="volleyball-btn__ring"
          aria-hidden="true"
        />
        <span className="volleyball-btn__visual" aria-hidden="true">
          <VolleyballIcon />
        </span>
      </button>

      {/* Flying ball — fixed overlay; transform set by JS each frame. */}
      <span
        ref={flyRef}
        className="volleyball-fly"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <VolleyballIcon />
      </span>
    </>
  );
}

// Volleyball icon. Uses the uploaded PNG if BALL_IMAGE_SRC is set; otherwise
// renders a red/white/blue panel-style SVG approximating the reference ball.
function VolleyballIcon() {
  if (BALL_IMAGE_SRC) {
    return (
      <img
        src={BALL_IMAGE_SRC}
        alt=""
        width="100%"
        height="100%"
        draggable="false"
        style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
      />
    );
  }

  // Placeholder SVG — three panels (red/white/blue) visible in front view,
  // with three curved seams + a top-left specular highlight.
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      role="presentation"
      focusable="false"
    >
      <defs>
        {/* Top-left highlight giving a 3D feel */}
        <radialGradient id="vb-hi" cx="0.3" cy="0.28" r="0.85">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id="vb-red" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e23a3a" />
          <stop offset="100%" stopColor="#b1232a" />
        </linearGradient>
        <linearGradient id="vb-blue" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2c5fcf" />
          <stop offset="100%" stopColor="#1d3f95" />
        </linearGradient>
        <linearGradient id="vb-white" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fbfbfb" />
          <stop offset="100%" stopColor="#dddee2" />
        </linearGradient>
        <clipPath id="vb-clip">
          <circle cx="12" cy="12" r="10.5" />
        </clipPath>
      </defs>

      <g clipPath="url(#vb-clip)">
        {/* Three vertical sectors with curved boundaries. */}
        <path d="M -2 -2 L 9 -2 C 6 8 6 16 9 26 L -2 26 Z" fill="url(#vb-blue)" />
        <path d="M 9 -2 C 6 8 6 16 9 26 L 15 26 C 18 16 18 8 15 -2 Z" fill="url(#vb-white)" />
        <path d="M 15 -2 C 18 8 18 16 15 26 L 26 26 L 26 -2 Z" fill="url(#vb-red)" />

        {/* Subtle curved seams */}
        <path d="M 9 -2 C 6 8 6 16 9 26" fill="none" stroke="rgba(20,20,28,0.55)" strokeWidth="0.45" />
        <path d="M 15 -2 C 18 8 18 16 15 26" fill="none" stroke="rgba(20,20,28,0.55)" strokeWidth="0.45" />

        {/* Top-left specular highlight */}
        <rect x="0" y="0" width="24" height="24" fill="url(#vb-hi)" />
      </g>

      {/* Outer rim */}
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="rgba(20,20,28,0.6)" strokeWidth="0.55" />
    </svg>
  );
}
