import { useEffect, useRef, useState } from "react";

/**
 * A volleyball "toy" button placed inline near the hero title.
 *
 * On click, the ball:
 *   1. Briefly anticipates (the button wobbles).
 *   2. Flies along a parabolic arc to the dog mascot in the bottom-right,
 *      spinning as it goes.
 *   3. Triggers a "volleyball:kicked" custom event that FloatingMascot
 *      listens to so the dog reacts (jump animation).
 *   4. Bounces back to the button along a mirror arc and settles.
 *
 * Motion design notes (see also DESIGN.md):
 *   • Animation uses transform: translate3d for GPU compositing.
 *   • Easing: cubic-bezier(0.215, 0.61, 0.355, 1) ("easeOutCubic") for
 *     a snap-then-glide feel that matches Apple HIG's spring-like motion.
 *   • Respects `prefers-reduced-motion`: in that case the ball teleports
 *     instantly and the dog still reacts, so the interaction remains.
 *   • Locks during flight to prevent overlapping animations.
 */
export default function VolleyballToy() {
  const buttonRef = useRef(null);
  const flyRef = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle | anticipate | flying | kicked | returning

  // Cache reduced-motion preference
  const reducedMotionRef = useRef(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = m.matches;
    const handler = (e) => (reducedMotionRef.current = e.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  // Helper: animate the fly element along a parabolic arc using WAAPI.
  const arc = (fromX, fromY, toX, toY, options = {}) => {
    const {
      duration = 750,
      easing = "cubic-bezier(0.215, 0.61, 0.355, 1)",
      peakLift = 220,
      spin = 720,
      startScale = 1,
      endScale = 1,
    } = options;
    const midX = (fromX + toX) / 2;
    const peakY = Math.min(fromY, toY) - peakLift;

    return flyRef.current.animate(
      [
        {
          transform: `translate3d(${fromX}px, ${fromY}px, 0) rotate(0deg) scale(${startScale})`,
        },
        {
          transform: `translate3d(${midX}px, ${peakY}px, 0) rotate(${spin / 2}deg) scale(1.08)`,
          offset: 0.5,
        },
        {
          transform: `translate3d(${toX}px, ${toY}px, 0) rotate(${spin}deg) scale(${endScale})`,
        },
      ],
      { duration, easing, fill: "forwards" },
    );
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const launch = async () => {
    if (phase !== "idle") return;
    const button = buttonRef.current;
    const mascot = document.querySelector(".floating-mascot");
    const fly = flyRef.current;
    if (!button || !mascot || !fly) return;

    const bRect = button.getBoundingClientRect();
    const mRect = mascot.getBoundingClientRect();

    // Centers (the fly element is sized 28×28 so subtract half of that
    // to put its center at the calculated point).
    const ballHalf = 14;
    const startX = bRect.left + bRect.width / 2 - ballHalf;
    const startY = bRect.top + bRect.height / 2 - ballHalf;
    const endX = mRect.left + mRect.width / 2 - ballHalf;
    const endY = mRect.top - 6 - ballHalf; // a hair above the dog's head

    // Reduced motion: skip arcs, just trigger the kick.
    if (reducedMotionRef.current) {
      window.dispatchEvent(new CustomEvent("volleyball:kicked"));
      return;
    }

    // 1) Anticipation wobble.
    setPhase("anticipate");
    await sleep(140);

    // 2) Position the fly ball at the button and reveal it.
    fly.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;
    fly.style.opacity = "1";
    setPhase("flying");

    // 3) Forward arc to the dog.
    await arc(startX, startY, endX, endY, {
      duration: 720,
      peakLift: 240,
      spin: 720,
      startScale: 1,
      endScale: 0.88,
    }).finished;

    // 4) Dog reacts.
    window.dispatchEvent(new CustomEvent("volleyball:kicked"));
    setPhase("kicked");
    await sleep(220);

    // 5) Return arc (slightly higher peak so it reads as a "kick up").
    setPhase("returning");
    await arc(endX, endY, startX, startY, {
      duration: 760,
      peakLift: 280,
      spin: -720,
      startScale: 0.92,
      endScale: 1,
    }).finished;

    // 6) Settle.
    fly.style.opacity = "0";
    setPhase("idle");
  };

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
        <span className="volleyball-btn__visual" aria-hidden="true">
          <VolleyballIcon />
        </span>
      </button>

      {/* Flying ball — fixed-positioned, animated via JS transform. */}
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
  // Stylized volleyball: white sphere with three curved seams.
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      role="presentation"
      focusable="false"
    >
      <defs>
        <radialGradient id="vb-shade" cx="0.35" cy="0.35" r="0.85">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f4ecdf" />
          <stop offset="100%" stopColor="#d9c8a8" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="url(#vb-shade)" stroke="#3a2f25" strokeWidth="0.6" />
      <path d="M12 1.5 C 8 8 8 16 12 22.5" fill="none" stroke="#3a2f25" strokeWidth="0.6" />
      <path d="M12 1.5 C 16 8 16 16 12 22.5" fill="none" stroke="#3a2f25" strokeWidth="0.6" />
      <path d="M1.5 12 C 8 8 16 8 22.5 12" fill="none" stroke="#3a2f25" strokeWidth="0.6" />
      <path d="M1.5 12 C 8 16 16 16 22.5 12" fill="none" stroke="#3a2f25" strokeWidth="0.6" />
    </svg>
  );
}
