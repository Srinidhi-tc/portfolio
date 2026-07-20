import { useEffect, useRef, useState } from "react";

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

  // Cubic bezier — identical to volleyball
  const bezierPoint = (t, p0, p1, p2, p3) => {
    const u = 1 - t;
    return {
      x: u**3*p0.x + 3*u**2*t*p1.x + 3*u*t**2*p2.x + t**3*p3.x,
      y: u**3*p0.y + 3*u**2*t*p1.y + 3*u*t**2*p2.y + t**3*p3.y,
    };
  };

  const launch = async () => {
    if (phase !== "idle") return;

    const btn    = btnRef.current;
    const fly    = flyRef.current;
    const mascot = document.querySelector(".floating-mascot");
    if (!btn || !fly || !mascot) return;

    if (reducedRef.current) {
      window.dispatchEvent(new CustomEvent("tennisball:impact"));
      return;
    }

    const bRect = btn.getBoundingClientRect();
    const mRect = mascot.getBoundingClientRect();
    const BALL  = 26;

    // Start: centre of the nav tennis ball button
    const startPt = {
      x: bRect.left + bRect.width  / 2 - BALL / 2,
      y: bRect.top  + bRect.height / 2 - BALL / 2,
    };

    // End: top-centre of the dog (head area)
    const endPt = {
      x: mRect.left + mRect.width  / 2 - BALL / 2,
      y: mRect.top  + 10 - BALL / 2,
    };

    const dist     = Math.hypot(endPt.x - startPt.x, endPt.y - startPt.y);
    const outLift  = dist * 0.45;
    const retLift  = dist * 0.38;
    const outSpin  = 600 + Math.random() * 200;
    const retSpin  = -(500 + Math.random() * 200);

    // ── 1. Anticipation ─────────────────────────────────
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

    // Hide the nav ball, show the flying one
    btn.style.opacity    = "0";
    btn.style.pointerEvents = "none";
    fly.style.opacity    = "1";

    // ── 2. Outbound arc ─────────────────────────────────
    setPhase("flying");

    const dx = endPt.x - startPt.x;
    const p0 = { ...startPt };
    const p1 = { x: startPt.x + dx * 0.2,  y: startPt.y - outLift };
    const p2 = { x: startPt.x + dx * 0.78, y: endPt.y   - outLift * 0.5 };
    const p3 = { ...endPt };

    let prev = { ...startPt };
    let spin = 0;

    await tween(760, (t) => {
      const pt   = bezierPoint(t, p0, p1, p2, p3);
      const seg  = Math.hypot(pt.x - prev.x, pt.y - prev.y);
      spin      += (seg / 4.5) * (outSpin / 120);
      prev       = pt;
      const spd  = Math.min(seg / 9, 1);
      fly.style.transform = `translate3d(${pt.x}px,${pt.y}px,0) rotate(${spin}deg)`;
      fly.style.filter    = `drop-shadow(0 ${6+spd*4}px ${10+spd*6}px rgba(58,47,37,.22)) blur(${spd*1.2}px)`;
    });

    // ── 3. Impact ────────────────────────────────────────
    window.dispatchEvent(new CustomEvent("tennisball:impact"));
    setPhase("kicked");

    await tween(180, (t) => {
      const wave = Math.sin(t * Math.PI);
      fly.style.transform = `translate3d(${endPt.x}px,${endPt.y}px,0) rotate(${spin}deg) scale(${1+0.1*wave},${1-0.07*wave})`;
      fly.style.filter    = `drop-shadow(0 8px 12px rgba(58,47,37,.22))`;
    });

    // ── 4. Return arc ────────────────────────────────────
    setPhase("returning");

    const rdx = startPt.x - endPt.x;
    const r0  = { ...endPt };
    const r1  = { x: endPt.x   + rdx * 0.18, y: endPt.y   - retLift * 0.9 };
    const r2  = { x: endPt.x   + rdx * 0.72, y: startPt.y - retLift * 0.4 };
    const r3  = { ...startPt };

    prev = { ...endPt };
    let retSpinAcc = spin;

    await tween(800, (t) => {
      const pt  = bezierPoint(t, r0, r1, r2, r3);
      const seg = Math.hypot(pt.x - prev.x, pt.y - prev.y);
      retSpinAcc += (seg / 4.5) * (retSpin / 120);
      prev        = pt;
      const spd   = Math.min(seg / 9, 1);
      fly.style.transform = `translate3d(${pt.x}px,${pt.y}px,0) rotate(${retSpinAcc}deg)`;
      fly.style.filter    = `drop-shadow(0 ${6+spd*4}px ${10+spd*6}px rgba(58,47,37,.22)) blur(${spd*1.2}px)`;
    });

    // ── 5. Snap back ─────────────────────────────────────
    setPhase("snap");
    await tween(300, (t) => {
      const osc = Math.cos(t * 14) * Math.exp(-t * 5);
      fly.style.transform = `translate3d(${startPt.x}px,${startPt.y}px,0) rotate(0deg) scale(${1+0.04*osc},${1-0.03*osc})`;
      fly.style.filter    = `drop-shadow(0 6px 10px rgba(58,47,37,.18))`;
    });

    // ── 6. Settle ────────────────────────────────────────
    fly.style.opacity       = "0";
    fly.style.filter        = "";
    fly.style.transform     = `translate3d(${startPt.x}px,${startPt.y}px,0)`;
    btn.style.opacity       = "1";
    btn.style.pointerEvents = "";
    setPhase("idle");
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

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
          marginLeft:  "6px",
          flexShrink:  0,
          transition:  "opacity 120ms ease, transform 180ms ease-out",
        }}
      >
        <TennisBallIcon />
      </button>

      {/* Fixed flying ball — positioned by JS every frame */}
      <span
        ref={flyRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         26,
          height:        26,
          display:       "block",
          opacity:       0,
          pointerEvents: "none",
          zIndex:        9999,
          willChange:    "transform, opacity, filter",
        }}
      >
        <TennisBallIcon />
      </span>
    </>
  );
}
