// FadeWords: one phrase at a time, cross-fading slowly into the next.
// Sits on its own line so the paragraph never reflows.
// Reduced motion: no cycling, the first phrase stays.
// Screen readers get the full list once, in a visually hidden span.
import { useEffect, useState } from "react";

const HOLD = 2600; // ms each phrase stays fully visible
const FADE = 700;  // ms for the fade out, then the same for the fade in

export default function FadeWords({ phrases }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t1, t2;
    const cycle = () => {
      t1 = setTimeout(() => {
        setShown(false);
        t2 = setTimeout(() => {
          setI((n) => (n + 1) % phrases.length);
          setShown(true);
          cycle();
        }, FADE);
      }, HOLD);
    };
    cycle();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phrases.length]);

  return (
    <>
      <span className="fade-words" aria-hidden="true">
        <span className={"fade-words__item" + (shown ? " fade-words__item--on" : "")}>{phrases[i]}</span>
      </span>
      <span className="sr-only">{phrases.join(", ")}.</span>
    </>
  );
}
