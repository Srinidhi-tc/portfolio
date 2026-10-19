import { useEffect, useRef, useState } from "react";
import { flyProjectile, jitter, returnFlightTime } from "./projectile";
// The .webp file is kept on disk as a reference asset but the icon now
// renders as a 2D animated SVG (cleaner at icon sizes; red/blue only).

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
 *   • Outbound and return flights are projectile motion under gravity
 *     (see ./projectile.js): launch velocity is solved from the target and a
 *     per-throw flight time, then advanced by real elapsed time each frame.
 *   • Rotation runs at an angular velocity set by launch speed; the return
 *     spins the other way.
 *   • Subtle drop-shadow blur breathes with velocity (cheap motion-blur cue).
 *   • No squash/stretch on impact.
 *   • Dust burst of 4 small particles.
 *   • Magnetic ring pulse on the button when the ball lands back home.
 *
 * IMPORTANT — Icon source:
 *   The user wants the actual red/white/blue volleyball image as the texture.
 *   Drop a PNG at src/assets/volleyball.png and flip BALL_IMAGE_PATH below.
 *   Until then, a recolored SVG stands in.
 */

// Render path: clean 2D SVG icon (no raster image). Setting BALL_IMAGE_SRC to
// a non-null value would switch the renderer back to <img>; null keeps the SVG.
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

  // -------------------- Dust burst --------------------
  const spawnDustBurst = (cx, cy) => {
    const colors = ["#e9dcbe", "#d9c8a8", "#c9b48c"];
    const count = 4;
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

    // Catch point drifts a little, and each throw gets its own flight time,
    // so no two throws land at the same moment or peak at the same height.
    endPt.x += (Math.random() - 0.5) * 24;
    const OUT_T = jitter(750, 0.08);
    // The return lands a little to one side (±5% of the distance) and settles
    // home, so it is never a mirror of the throw.
    const dist = Math.hypot(endPt.x - startPt.x, endPt.y - startPt.y);
    const landing = { x: startPt.x + (Math.random() * 2 - 1) * 0.05 * dist, y: startPt.y };
    // The kick back: solve the flight time so the ball climbs a little past
    // home (staying on screen) and drops into place. It has to rise much
    // further than the throw fell, so it launches far steeper, like a kick.
    const RET_T = returnFlightTime(endPt.y - startPt.y, Math.min(jitter(16, 0.4), Math.max(startPt.y - 4, 0)));

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

    // ---------- 2) Outbound flight — projectile ----------
    setPhase("flying");
    fly.style.opacity = "1";

    const draw = ({ x, y, rotation, speed }) => {
      const speedNorm = Math.min(speed / 1.6, 1);
      fly.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      fly.style.filter = `drop-shadow(0 ${6 + speedNorm * 4}px ${10 + speedNorm * 6}px rgba(58,47,37,0.22)) blur(${speedNorm * 1.2}px)`;
    };

    let approachFired = false;
    let lastTrackFire = 0;
    const spin = await flyProjectile({
      start: startPt, end: endPt, T: OUT_T, spinSign: 1, rafRef,
      onFrame: (f) => {
        draw(f);
        // Throttled tracking event for mascot head-lean.
        const nowMs = performance.now();
        if (nowMs - lastTrackFire > 50) {
          lastTrackFire = nowMs;
          window.dispatchEvent(
            new CustomEvent("volleyball:tracking", { detail: { x: f.x + BALL / 2 } }),
          );
        }
        if (!approachFired && f.progress > 0.65) {
          approachFired = true;
          window.dispatchEvent(new CustomEvent("volleyball:approaching"));
        }
      },
    });

    // Reset mascot lean after flight.
    window.dispatchEvent(
      new CustomEvent("volleyball:tracking", { detail: { x: null } }),
    );

    // ---------- 3) Impact — dust + kick event ----------
    spawnDustBurst(endPt.x + BALL / 2, endPt.y + BALL / 2);
    window.dispatchEvent(new CustomEvent("volleyball:kicked"));
    setPhase("kicked");
    await tween(120, () => {});

    // ---------- 4) Return flight — a kick, opposite spin ----------
    setPhase("returning");
    await flyProjectile({ start: endPt, end: landing, T: RET_T, spinSign: -1, rotation: spin, rafRef, onFrame: draw });

    // ---------- 5) Settle home + ring pulse ----------
    setPhase("snap");
    pulseRing();
    await tween(220, (t) => {
      const e = 1 - (1 - t) ** 3;
      const x = landing.x + (startPt.x - landing.x) * e;
      fly.style.transform = `translate3d(${x}px, ${startPt.y}px, 0)`;
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

  // Clean 2D volleyball icon — red ball, blue sweeping seams, single specular.
  // Sized in a 100×100 viewBox so the curve math reads at a glance.
  // Rotation animation is applied via CSS at .volleyball-btn__visual svg.
  return (
    <svg
      className="vb-icon"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      role="presentation"
      focusable="false"
    >
      <defs>
        {/* Red ball gradient — bright top-left, deeper bottom-right (3D feel) */}
        <radialGradient id="vb-red" cx="0.35" cy="0.32" r="0.85">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="55%" stopColor="#e23838" />
          <stop offset="100%" stopColor="#a91d24" />
        </radialGradient>
        {/* Blue gradient for the seams — slightly deepens toward edges */}
        <linearGradient id="vb-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a7bff" />
          <stop offset="100%" stopColor="#1d3f95" />
        </linearGradient>
        {/* Specular highlight in the upper-left third */}
        <radialGradient id="vb-hi" cx="0.3" cy="0.26" r="0.55">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <clipPath id="vb-clip">
          <circle cx="50" cy="50" r="46" />
        </clipPath>
      </defs>

      <g clipPath="url(#vb-clip)">
        {/* Base ball */}
        <circle cx="50" cy="50" r="46" fill="url(#vb-red)" />

        {/*
          Three sweeping blue seams form the classic volleyball pattern.
          Each is a wide stroke so it reads at small icon sizes.
        */}
        <path
          d="M 8 50 C 30 36 70 36 92 50"
          fill="none"
          stroke="url(#vb-blue)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 50 8 C 36 30 36 70 50 92"
          fill="none"
          stroke="url(#vb-blue)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 20 18 C 50 38 50 62 80 82"
          fill="none"
          stroke="url(#vb-blue)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Specular highlight overlay */}
        <ellipse cx="35" cy="32" rx="26" ry="16" fill="url(#vb-hi)" />
      </g>

      {/* Outer rim for definition */}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="rgba(20, 20, 28, 0.28)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
