import { useEffect, useRef, useState } from "react";
import { flyProjectile, jitter, returnFlightTime } from "./projectile";

// Tennis ball SVG — Apple-minimal 3D icon traced from reference images
function TennisBallIcon() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%"
         role="presentation" focusable="false">
      <defs>
        <radialGradient id="tb-body" cx="35%" cy="30%" r="70%" fx="30%" fy="25%">
          <stop offset="0%"   stopColor="#D4F06B" />
          <stop offset="35%"  stopColor="#AADB35" />
          <stop offset="75%"  stopColor="#7DB52A" />
          <stop offset="100%" stopColor="#5A8A1A" />
        </radialGradient>
        <radialGradient id="tb-glint" cx="30%" cy="28%" r="30%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <clipPath id="tb-clip">
          <circle cx="50" cy="50" r="46" />
        </clipPath>
      </defs>
      <g clipPath="url(#tb-clip)">
        <circle cx="50" cy="50" r="46" fill="url(#tb-body)" />
        {/* White seam — single wide S-curve, bottom-left to top-right */}
        <path d="M 12 72 C 22 58, 32 32, 56 24 C 68 20, 80 24, 88 32"
              stroke="white" strokeWidth="9" fill="none"
              strokeLinecap="round" opacity="0.92" />
        <path d="M 12 72 C 22 58, 32 32, 56 24 C 68 20, 80 24, 88 32"
              stroke="rgba(255,255,255,0.35)" strokeWidth="4" fill="none"
              strokeLinecap="round" />
        <circle cx="50" cy="50" r="46" fill="url(#tb-glint)" />
      </g>
      <circle cx="50" cy="50" r="46" fill="none"
              stroke="rgba(20,20,28,0.15)" strokeWidth="1.2" />
    </svg>
  );
}

// Where the top of the dog's head will be when it catches. The dog is tilted
// up while it waits (see .floating-mascot.is-anticipating in index.css:
// rotate 9deg about 50% 80% of its box, lifted 3px), which moves the head.
const CROWN = { x: 0.34, y: 0.22 };
const TILT_DEG = 9;
const LIFT_PX = 3;
function headCrownAtCatch(rect) {
  const px = rect.left + rect.width * 0.5;
  const py = rect.top + rect.height * 0.8;
  const dx = rect.left + rect.width * CROWN.x - px;
  const dy = rect.top + rect.height * CROWN.y - py;
  const a = (TILT_DEG * Math.PI) / 180;
  return {
    x: px + dx * Math.cos(a) - dy * Math.sin(a),
    y: py + dx * Math.sin(a) + dy * Math.cos(a) - LIFT_PX,
  };
}

export default function TennisBall() {
  const btnRef  = useRef(null);
  const flyRef  = useRef(null);
  const rafRef  = useRef(null);
  const [phase, setPhase] = useState("idle");

  const reducedRef = useRef(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = m.matches;
    const h = (e) => (reducedRef.current = e.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);

  // Identical tween helper to volleyball — proven working
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

 const launch = async () => {
    if (phase !== "idle") return;

    const btn    = btnRef.current;
    const mascot = document.querySelector(".floating-mascot");
    if (!btn || !mascot) return;

    if (reducedRef.current) {
      window.dispatchEvent(new CustomEvent("tennisball:impact"));
      return;
    }

    const bRect = btn.getBoundingClientRect();
    const mRect = mascot.getBoundingClientRect();
    const BALL  = 26;

    const startPt = {
      x: bRect.left + bRect.width  / 2 - BALL / 2,
      y: bRect.top  + bRect.height / 2 - BALL / 2,
    };
    // Aim so the ball comes down on top of the dog's head, centred between
    // the eyes (measured in the dog drawing: eyes at 29% down, snout and tongue
    // at 31–45%, crown at 22%). It is off by a small random step; the dog
    // shifts by the same step to meet it.
    const aimOffset = (Math.random() * 2 - 1) * 22;
    const crown = headCrownAtCatch(mRect);
    const endPt = {
      x: crown.x + aimOffset - BALL / 2,
      y: crown.y - BALL,            // ball's bottom edge touches the crown
    };

    // Each throw gets its own flight time, so no two land at the same moment
    // or peak at the same height.
    const OUT_T = jitter(900, 0.08);
    // The return lands a little to one side (±5% of the distance) and settles
    // home, so it is never a mirror of the throw.
    const dist  = Math.hypot(endPt.x - startPt.x, endPt.y - startPt.y);
    const landing = { x: startPt.x + (Math.random() * 2 - 1) * 0.05 * dist, y: startPt.y };
    // The kick back: solve the flight time so the ball climbs a little past
    // home (staying on screen) and drops into place. It has to rise much
    // further than the throw fell, so it launches far steeper, like a kick.
    const RET_T = returnFlightTime(endPt.y - startPt.y, Math.min(jitter(16, 0.4), Math.max(startPt.y - 4, 0)));

    // ── Create flying ball directly on body ──────────────
    const fly = document.createElement("span");
    fly.setAttribute("aria-hidden", "true");
    fly.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: ${BALL}px;
      height: ${BALL}px;
      pointer-events: none;
      z-index: 9999;
      will-change: transform, opacity, filter;
      transform: translate3d(${startPt.x}px,${startPt.y}px,0);
      opacity: 1;
    `;
    fly.innerHTML = `<svg viewBox="0 0 100 100" width="26" height="26" role="presentation"><defs><radialGradient id="tb2-body" cx="35%" cy="30%" r="70%" fx="30%" fy="25%"><stop offset="0%" stop-color="#D4F06B"/><stop offset="35%" stop-color="#AADB35"/><stop offset="75%" stop-color="#7DB52A"/><stop offset="100%" stop-color="#5A8A1A"/></radialGradient><radialGradient id="tb2-glint" cx="30%" cy="28%" r="30%"><stop offset="0%" stop-color="white" stop-opacity="0.55"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient><clipPath id="tb2-clip"><circle cx="50" cy="50" r="46"/></clipPath></defs><g clip-path="url(#tb2-clip)"><circle cx="50" cy="50" r="46" fill="url(#tb2-body)"/><path d="M 12 72 C 22 58, 32 32, 56 24 C 68 20, 80 24, 88 32" stroke="white" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.92"/><circle cx="50" cy="50" r="46" fill="url(#tb2-glint)"/></g><circle cx="50" cy="50" r="46" fill="none" stroke="rgba(20,20,28,0.15)" stroke-width="1.2"/></svg>`;
    document.body.appendChild(fly);

    // ── 1. Anticipation ──────────────────────────────────
    setPhase("anticipate");
    await tween(140, (t) => {
      const wave = Math.sin(t * Math.PI);
      btn.style.translate = `0 ${1.5 * wave}px`;
      btn.style.rotate    = `${-8 * wave}deg`;
      btn.style.scale     = `${1 - 0.06 * wave}`;
    });
    btn.style.translate = "";
    btn.style.rotate    = "";
    btn.style.scale     = "";
    btn.style.opacity   = "0";
    btn.style.pointerEvents = "none";

    // ── 2. Outbound throw ────────────────────────────────
    setPhase("flying");
    const draw = ({ x, y, rotation, speed }) => {
      const spd = Math.min(speed / 1.6, 1);
      fly.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rotation}deg)`;
      fly.style.filter    = `drop-shadow(0 ${6+spd*4}px ${10+spd*6}px rgba(58,47,37,.22)) blur(${spd*1.2}px)`;
    };
    // Tell the dog where and when the ball will land, so it can line up and
    // look up before the catch.
    window.dispatchEvent(new CustomEvent("tennisball:launch", { detail: { shiftX: aimOffset, flightMs: OUT_T } }));
    const spin = await flyProjectile({ start: startPt, end: endPt, T: OUT_T, spinSign: 1, rafRef, onFrame: draw });

    // ── 3. Catch ─────────────────────────────────────────
    window.dispatchEvent(new CustomEvent("tennisball:impact"));
    setPhase("kicked");
    await tween(120, () => {});

    // ── 4. Kick back ─────────────────────────────────────
    setPhase("returning");
    await flyProjectile({ start: endPt, end: landing, T: RET_T, spinSign: -1, rotation: spin, rafRef, onFrame: draw });

    // ── 5. Settle home ───────────────────────────────────
    setPhase("snap");
    await tween(220, (t) => {
      const e = 1 - (1 - t) ** 3;
      const x = landing.x + (startPt.x - landing.x) * e;
      fly.style.transform = `translate3d(${x}px,${startPt.y}px,0)`;
      fly.style.filter    = `drop-shadow(0 6px 10px rgba(58,47,37,.18))`;
    });

    // ── 6. Settle ────────────────────────────────────────
    fly.remove();
    btn.style.opacity       = "1";
    btn.style.pointerEvents = "";
    setPhase("idle");
  };
  
  return (
    <>
      {/* Nav tennis ball button */}
      <button
        ref={btnRef}
        type="button"
        onClick={launch}
        disabled={phase !== "idle"}
        aria-label="Throw tennis ball to dog"
        title="🎾 Throw to dog"
        style={{
          background:  "none",
          border:      "none",
          cursor:      phase === "idle" ? "pointer" : "default",
          padding:     "3px",
          width:       "30px",
          height:      "30px",
          display:     "flex",
          alignItems:  "center",
          justifyContent: "center",
          borderRadius: "50%",
          outline:     "none",
          marginLeft:  "var(--space-1)",
          flexShrink:  0,
          transition:  "opacity 120ms ease, transform 180ms ease-out",
        }}
      >
        <TennisBallIcon />
      </button>
    </>
  );
}
