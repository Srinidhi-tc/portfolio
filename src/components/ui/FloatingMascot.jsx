import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLottie } from "lottie-react";
import dogIdle from "../../assets/cute-doggie.json";

const TRICKS = ["roll", "jump", "bark", "wiggle"];

const CLICK_MESSAGES = [
  "Hi.",
  "You found me.",
  "Take your time.",
  "The case studies have the good stuff.",
  "I'm just here for moral support.",
  "Sri taught me to sit.",
  "She has snacks too, probably.",
  "Hover over things. Sri loves details.",
  "Good designer. Better human.",
  "I'll be here if you need me.",
];

const PAGE_MESSAGES = {
  "/": {
    greeting: "Welcome. Glad you stopped by.",
    messages: ["Start with the case studies →", "Sri shows over tells.", "Take your time."],
  },
  "/work": {
    greeting: "Three case studies. Pick any.",
    messages: ["Each one has the full process.", "Look for the outcomes section.", "Microsoft's my favorite."],
  },
  "/play": {
    greeting: "Side projects. The fun stuff.",
    messages: ["Curiosity says a lot about a designer.", "She tinkers with hardware too.", "Play is research in disguise."],
  },
  "/about": {
    greeting: "The short version of Sri.",
    messages: ["Psychology background. It shows.", "Calm. Thoughtful. Ships things."],
  },
  "/work/microsoft": {
    greeting: "Microsoft × Agentic AI.",
    messages: ["Research-led, end to end.", "Note the methodology section.", "Built for neurodivergent users."],
  },
  "/work/ai-coding": {
    greeting: "AI Coding Interviewer.",
    messages: ["Heuristic eval done properly.", "Watch how she frames trade-offs."],
  },
  "/work/strabospot": {
    greeting: "StraboSpot. 12k geologists.",
    messages: ["Domain-deep UX. The hard kind.", "See how she reduced friction."],
  },
};

const DEFAULT_MESSAGES = {
  greeting: "Welcome.",
  messages: ["Take a look around.", "I'll be in the corner if you need me."],
};

const MILESTONES = {
  5:   { text: "We're friends now.", confetti: false },
  10:  { text: "Ten pets. Distinguished company. 🎉", confetti: true },
  25:  { text: "Twenty-five. You're really committed.", confetti: true },
  50:  { text: "Fifty pets. I'm legally your dog now.", confetti: true },
  100: { text: "One hundred. This is my whole personality now.", confetti: true },
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function FloatingMascot() {
  const { pathname } = useLocation();
  const pageData = PAGE_MESSAGES[pathname] || DEFAULT_MESSAGES;

  const { View: LottieView } = useLottie({
    animationData: dogIdle,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
  });

  const [trick,      setTrick]      = useState(null);
  const [bubble,     setBubble]     = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [confetti,   setConfetti]   = useState(false);
  const [walkOffset, setWalkOffset] = useState(0);
  const [entered,    setEntered]    = useState(false);

  const trickTimer    = useRef(null);
  const bubbleTimer   = useRef(null);
  const confettiTimer = useRef(null);
  const greetTimer    = useRef(null);
  const idleTimer     = useRef(null);
  const wanderTimer   = useRef(null);

  // Entrance walk-in
  useEffect(() => {
    const alreadyEntered = sessionStorage.getItem("mascot-entered") === "1";
    if (alreadyEntered) { setEntered(true); return; }
    const t = setTimeout(() => {
      setEntered(true);
      sessionStorage.setItem("mascot-entered", "1");
    }, 50);
    return () => clearTimeout(t);
  }, []);

  // Page greeting
  useEffect(() => {
    clearTimeout(greetTimer.current);
    setBubble(null);
    const isFirstLoad = sessionStorage.getItem("mascot-greeted") !== "1";
    const delay = isFirstLoad ? 2800 : 900;
    sessionStorage.setItem("mascot-greeted", "1");
    greetTimer.current = setTimeout(() => {
      setBubble(pageData.greeting);
      clearTimeout(bubbleTimer.current);
      bubbleTimer.current = setTimeout(() => setBubble(null), 3500);
    }, delay);
    return () => clearTimeout(greetTimer.current);
  }, [pathname, pageData.greeting]);

  // Idle wiggle
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 30000 + Math.random() * 30000;
      idleTimer.current = setTimeout(() => {
        setTrick("wiggle");
        clearTimeout(trickTimer.current);
        trickTimer.current = setTimeout(() => setTrick(null), 800);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => clearTimeout(idleTimer.current);
  }, [pathname]);

  // Wander
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 25000 + Math.random() * 20000;
      wanderTimer.current = setTimeout(() => {
        setWalkOffset(-50);
        setTimeout(() => setWalkOffset(0), 2200);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => clearTimeout(wanderTimer.current);
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearTimeout(trickTimer.current);
      clearTimeout(bubbleTimer.current);
      clearTimeout(confettiTimer.current);
      clearTimeout(greetTimer.current);
      clearTimeout(idleTimer.current);
      clearTimeout(wanderTimer.current);
    };
  }, []);

  // Volleyball + tennis ball events
  useEffect(() => {
    let mascotEl = null;

    const onTrack = (e) => {
      if (!mascotEl) mascotEl = document.querySelector(".floating-mascot");
      if (!mascotEl) return;
      const ballX = e.detail?.x;
      if (ballX == null) {
        mascotEl.style.setProperty("--mascot-lean", "0deg");
        return;
      }
      const r = mascotEl.getBoundingClientRect();
      const delta = ballX - (r.left + r.width / 2);
      const lean = Math.max(-9, Math.min(9, delta / 60));
      mascotEl.style.setProperty("--mascot-lean", `${lean}deg`);
    };

    const onApproach = () => {
      setTrick("wiggle");
      clearTimeout(trickTimer.current);
      trickTimer.current = setTimeout(() => setTrick(null), 320);
    };

    const onKick = () => {
      setTrick("jump");
      clearTimeout(trickTimer.current);
      trickTimer.current = setTimeout(() => {
        setTrick("wiggle");
        trickTimer.current = setTimeout(() => setTrick(null), 600);
      }, 600);
      setBubble("Got it!");
      clearTimeout(bubbleTimer.current);
      bubbleTimer.current = setTimeout(() => setBubble(null), 1400);
    };

    // Tennis ball — no bubble, just jump + wiggle
    const onTennisBall = () => {
      setTrick("jump");
      clearTimeout(trickTimer.current);
      trickTimer.current = setTimeout(() => {
        setTrick("wiggle");
        trickTimer.current = setTimeout(() => setTrick(null), 600);
      }, 500);
    };

    window.addEventListener("volleyball:tracking",   onTrack);
    window.addEventListener("volleyball:approaching", onApproach);
    window.addEventListener("volleyball:kicked",      onKick);
    window.addEventListener("tennisball:impact",      onTennisBall);

    return () => {
      window.removeEventListener("volleyball:tracking",   onTrack);
      window.removeEventListener("volleyball:approaching", onApproach);
      window.removeEventListener("volleyball:kicked",      onKick);
      window.removeEventListener("tennisball:impact",      onTennisBall);
    };
  }, []);

  const showBubble = (text, duration = 2000) => {
    setBubble(text);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), duration);
  };

  const triggerConfetti = (duration = 1500) => {
    setConfetti(true);
    clearTimeout(confettiTimer.current);
    confettiTimer.current = setTimeout(() => setConfetti(false), duration);
  };

  const handleClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    const nextTrick = pickRandom(TRICKS);
    setTrick(nextTrick);
    clearTimeout(trickTimer.current);
    trickTimer.current = setTimeout(() => setTrick(null), 800);
    const milestone = MILESTONES[nextCount];
    if (milestone) {
      showBubble(milestone.text, 3000);
      if (milestone.confetti) triggerConfetti(2000);
      return;
    }
    const useGeneric = Math.random() < 0.6;
    const message = useGeneric
      ? pickRandom(CLICK_MESSAGES)
      : pickRandom(pageData.messages);
    showBubble(message, 1800);
  };

  return (
    <div
      className={`floating-mascot${entered ? " entered" : ""}${trick ? ` trick-${trick}` : ""}`}
      style={{ "--walk-x": `${walkOffset}px` }}
      onClick={handleClick}
      role="button"
      aria-label="Pet the dog"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {bubble && (
        <span className="floating-mascot__bubble" key={bubble}>
          {bubble}
        </span>
      )}
      <div className="floating-mascot__body">{LottieView}</div>
      {confetti && (
        <div className="floating-mascot__confetti" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} style={{ "--i": i }} />
          ))}
        </div>
      )}
    </div>
  );
}
