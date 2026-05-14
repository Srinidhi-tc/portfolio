import { useEffect, useRef, useState } from "react";

/**
 * Interactive volleyball toy in the hero.
 *
 * Motion design (custom RAF physics — no external library):
 *   • Idle: button gently floats and glows (CSS keyframes).
 *   • Anticipation: 160 ms wobble before launch.
 *   • Outbound: parabolic arc, eased horizontally, spinning, with a brief
 *     motion-blur pass through peak velocity. Intercept Y is dynamically
 *     chosen in a band above the dog so consecutive throws don't feel
 *     identical.
 *   • Impact: squash-and-stretch on the ball + small dust burst at the
 *     contact point; fires `volleyball:kicked` for the mascot to react.
 *   • Return: mirrored arc with a higher peak (reads as a kick *up*),
 *     ending in a spring "magnetic snap" that overshoots the button center
 *     slightly before settling.
 *   • Reduced motion: ball is hidden, but the dog still reacts so the
 *     interaction still feels responsive.
 *
 * Implementation notes:
 *   • All animation is transform-only on a `position: fixed` ball element;
 *     no layout thrash, GPU-composited.
 *   • Re-clicks during flight are ignored (`phase !== "idle"` guard).
 *   • The mid-flight `volleyball:approaching` event lets the mascot do an
 *     anticipation wiggle BEFORE the actual impact, which is what your
 *     real-life dog does waiting on a kick.
 */
export default function VolleyballToy() {
  const buttonRef = useRef(null);
  const flyRef = useRef(null);
  const rafRef = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle | anticipate | flying | kicked | returning | snap

  // Reduced-motion preference
  const reducedRef = useRef(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = m.matches;
    const handler = (e) => (reducedRef.current = e.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  // -------------------- Animation helpers --------------------

  // Simple RAF tween — returns a promise that resolves when done.
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

  // Easings
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInCubic = (t) => t * t * t;
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Parabolic 0→1→0 curve for the flight arc lift
  const arcLift = (t) => 4 * t * (1 - t);

  // Spring overshoot: returns a value oscillating around 1 with decay,
  // ending exactly at 1.
  const springOvershoot = (t, freq = 12, decay = 6) =>
    1 - Math.cos(t * freq) * Math.exp(-t * decay);

  // -------------------- Dust burst on impact --------------------

  const spawnDustBurst = (cx, cy) => {
    const layer = document.body;
    const colors = ["#e9dcbe", "#d9c8a8", "#c9b48c"];
    const count = 10;
    for (let i = 0; i < count; i++) {
      const dust = document.createElement("span");
      dust.className = "volleyball-dust";
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 22 + Math.random() * 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 8; // bias up — feels like puff
      const size = 4 + Math.random() * 3;
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
        opacity: 0.85;
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;
      layer.appendChild(dust);
      setTimeout(() => dust.remove(), 700);
    }
  };

  // -------------------- The launch sequence --------------------

  const launch = async () => {
    if (phase !== "idle") return;

    const button = buttonRef.current;
    const fly = flyRef.current;
    const mascot = document.querySelector(".floating-mascot");
    if (!button || !fly || !mascot) return;

    // If user prefers reduced motion, only trigger the dog reaction.
    if (reducedRef.current) {
      window.dispatchEvent(new CustomEvent("volleyball:kicked"));
      return;
    }

    // Disable cursor magnetism, idle float, glow during sequence by phase class.
    const bRect = button.getBoundingClientRect();
    const mRect = mascot.getBoundingClientRect();

    const BALL = 28; // ball element is 28×28 (see CSS)

    // Start = center of button. End = a Y-band above dog (dynamic intercept).
    const startX = bRect.left + bRect.width / 2 - BALL / 2;
    const startY = bRect.top + bRect.height / 2 - BALL / 2;

    const dogCenterX = mRect.left + mRect.width / 2 - BALL / 2;
    const interceptY =
      mRect.top - 18 - Math.random() * 36 - BALL / 2; // 18–54 px above dog top

    // ---------- 1) Anticipation wobble ----------
    setPhase("anticipate");
    await tween(160, (t) => {
      const phase01 = Math.sin(t * Math.PI);
      const s = 1 - 0.07 * phase01;
      const r = -10 * phase01;
      button.style.translate = `0 ${1.5 * phase01}px`;
      button.style.rotate = `${r}deg`;
      button.style.scale = `${s}`;
    });
    button.style.translate = "";
    button.style.rotate = "";
    button.style.scale = "";

    // ---------- 2) Outbound flight ----------
    setPhase("flying");
    fly.style.opacity = "1";
    let approachFired = false;

    const OUT_DUR = 760;
    const OUT_LIFT = 240;

    await tween(OUT_DUR, (t) => {
      const ex = easeOutCubic(t); // horizontal eases out — slows near dog
      const x = startX + (dogCenterX - startX) * ex;
      const y =
        startY + (interceptY - startY) * easeInOutCubic(t) - arcLift(t) * OUT_LIFT;
      const rot = t * 720;
      const scale = 1 + 0.04 * Math.sin(t * Math.PI); // tiny breathe in flight
      const speed = Math.abs(Math.cos(t * Math.PI)); // 0 at midflight, 1 at ends
      const blur = t > 0.15 && t < 0.85 ? speed * 1.1 : 0;
      fly.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
      fly.style.filter = `drop-shadow(0 8px 12px rgba(58,47,37,0.22)) blur(${blur}px)`;

      // Fire approaching event at ~70% through — dog crouches/wiggles.
      if (!approachFired && t > 0.68) {
        approachFired = true;
        window.dispatchEvent(new CustomEvent("volleyball:approaching"));
      }
    });

    // ---------- 3) Impact: squash + dust burst + kick event ----------
    spawnDustBurst(dogCenterX + BALL / 2, interceptY + BALL / 2);
    window.dispatchEvent(new CustomEvent("volleyball:kicked"));
    setPhase("kicked");

    await tween(210, (t) => {
      const sq = Math.sin(t * Math.PI);
      const sx = 1 + 0.28 * sq;
      const sy = 1 - 0.22 * sq;
      fly.style.transform = `translate3d(${dogCenterX}px, ${interceptY}px, 0) rotate(720deg) scale(${sx}, ${sy})`;
      fly.style.filter = `drop-shadow(0 8px 12px rgba(58,47,37,0.22))`;
    });

    // ---------- 4) Return flight ----------
    setPhase("returning");
    const RET_DUR = 780;
    const RET_LIFT = 300; // slightly higher → reads as a kick up

    await tween(RET_DUR, (t) => {
      const ex = easeInCubic(t); // accelerates away from dog
      const x = dogCenterX + (startX - dogCenterX) * ex;
      const y =
        interceptY + (startY - interceptY) * easeInOutCubic(t) - arcLift(t) * RET_LIFT;
      const rot = 720 - t * 720;
      const speed = Math.abs(Math.cos(t * Math.PI));
      const blur = t > 0.15 && t < 0.85 ? speed * 1.1 : 0;
      fly.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`;
      fly.style.filter = `drop-shadow(0 8px 12px rgba(58,47,37,0.22)) blur(${blur}px)`;
    });

    // ---------- 5) Magnetic snap — spring overshoot ----------
    setPhase("snap");
    await tween(360, (t) => {
      // Decaying oscillation in scale; ball position is at button.
      const osc = Math.cos(t * 14) * Math.exp(-t * 5);
      const sx = 1 + 0.06 * osc;
      const sy = 1 - 0.04 * osc;
      fly.style.transform = `translate3d(${startX}px, ${startY}px, 0) rotate(0deg) scale(${sx}, ${sy})`;
      fly.style.filter = `drop-shadow(0 6px 10px rgba(58,47,37,0.18))`;
    });

    // ---------- 6) Settle ----------
    fly.style.opacity = "0";
    fly.style.filter = "";
    fly.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
    setPhase("idle");
  };

  // Cleanup any in-flight RAFs on unmount.
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
        <span className="volleyball-btn__visual" aria-hidden="true">
          <VolleyballIcon />
        </span>
      </button>

      {/* Flying ball — fixed-positioned overlay; visibility toggled by JS. */}
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

function VolleyballIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      role="presentation"
      focusable="false"
    >
      <defs>
        <radialGradient id="vb-shade" cx="0.32" cy="0.32" r="0.85">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f4ecdf" />
          <stop offset="100%" stopColor="#d9c8a8" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="url(#vb-shade)" stroke="#3a2f25" strokeWidth="0.55" />
      <path d="M12 1.5 C 8 8 8 16 12 22.5" fill="none" stroke="#3a2f25" strokeWidth="0.55" />
      <path d="M12 1.5 C 16 8 16 16 12 22.5" fill="none" stroke="#3a2f25" strokeWidth="0.55" />
      <path d="M1.5 12 C 8 8 16 8 22.5 12" fill="none" stroke="#3a2f25" strokeWidth="0.55" />
      <path d="M1.5 12 C 8 16 16 16 22.5 12" fill="none" stroke="#3a2f25" strokeWidth="0.55" />
    </svg>
  );
}
