// InstaxStack: three glass Instax cards held like a hand of K, Q, J of hearts.
// Resting: slightly crooked, the two under cards peek out (index and some of
// their side text) above and to the right of the top card.
// Tap or click: the top card goes to the back. Drag or flick: the card follows
// the pointer, tilting with speed; past a threshold it is flung to the back,
// otherwise it springs home (stiffness 280, damping 24).
// Hover (mouse only): the hand fans open. Near the top card's edge: faint
// Figma-style bounds and handles. A card coming to the front "develops".
// Reduced motion: no springs, cards jump into place.
import { useEffect, useRef, useState } from "react";
import muse from "../../assets/muse.jpeg";
import wind from "../../assets/wind.jpeg";
import grad from "../../assets/grad.jpeg";

const CARDS = [
  { rank: "K", img: muse, alt: "Museum photo", bottom: "COMMITTED TO", side: "THE CRAFT" },
  { rank: "Q", img: wind, alt: "Photo through a car window", bottom: "STRONG OPINIONS", side: "LET LOOSE" },
  { rank: "J", img: grad, alt: "University graduation photo", bottom: "FIRST-GEN", side: "GRAD" },
];

// Per slot (0 = top). Under cards sit up and to the right so they peek out.
const REST = [{ x: 0, y: 0, r: -4 }, { x: 18, y: -22, r: 2.5 }, { x: 34, y: -42, r: -1.5 }];
const FAN = [{ x: -26, y: 6, r: -9 }, { x: 16, y: -12, r: 2 }, { x: 58, y: -8, r: 12 }];

const K = 280, D = 24;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = () => window.matchMedia("(hover: hover)").matches;

export default function InstaxStack() {
  const [order, setOrder] = useState([0, 1, 2]);   // order[slot] = card
  const [fan, setFan] = useState(false);
  const [spec, setSpec] = useState(false);
  const [dev, setDev] = useState([0, 0, 0]);
  const els = useRef([]);
  const sim = useRef(CARDS.map((_, i) => ({ ...REST[i], vx: 0, vy: 0, vr: 0, tx: REST[i].x, ty: REST[i].y, tr: REST[i].r, held: false, flying: false })));
  const raf = useRef(0);
  const drag = useRef(null);
  const busy = useRef(false);
  const touchTimer = useRef(0);

  const paint = (i) => {
    const s = sim.current[i], el = els.current[i];
    if (el) el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.r}deg)`;
  };

  const tick = () => {
    let moving = false;
    sim.current.forEach((s, i) => {
      if (!s.held) {
        for (let n = 0; n < 2; n++) {
          const dt = 1 / 120;
          for (const [p, v, t] of [["x", "vx", "tx"], ["y", "vy", "ty"], ["r", "vr", "tr"]]) {
            const a = -K * (s[p] - s[t]) - D * s[v];
            s[v] += a * dt; s[p] += s[v] * dt;
          }
        }
        const still = Math.abs(s.x - s.tx) + Math.abs(s.y - s.ty) + Math.abs(s.r - s.tr) < 0.08
          && Math.abs(s.vx) + Math.abs(s.vy) + Math.abs(s.vr) < 0.08;
        if (still) { s.x = s.tx; s.y = s.ty; s.r = s.tr; s.vx = s.vy = s.vr = 0; } else moving = true;
      }
      paint(i);
    });
    raf.current = moving ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => {
    if (reduced()) {
      sim.current.forEach((s, i) => { if (!s.held) { s.x = s.tx; s.y = s.ty; s.r = s.tr; } paint(i); });
      return;
    }
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  };

  // Every card heads for its slot whenever the order or the fan changes.
  useEffect(() => {
    order.forEach((card, slot) => {
      const s = sim.current[card];
      if (s.flying) return;
      const t = (fan ? FAN : REST)[slot];
      s.tx = t.x; s.ty = t.y; s.tr = t.r;
    });
    kick();
  }, [order, fan]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { cancelAnimationFrame(raf.current); raf.current = 0; }, []);

  // Send the top card out in a direction, then to the back of the deck.
  const cycle = (dx = 1, dy = -0.3) => {
    if (busy.current) return;
    busy.current = true;
    const top = order[0];
    const s = sim.current[top];
    const len = Math.hypot(dx, dy) || 1;
    const w = els.current[top]?.offsetWidth || 200;
    s.flying = true;
    s.tx = (dx / len) * w * 1.05; s.ty = (dy / len) * w * 0.6; s.tr = (dx >= 0 ? 1 : -1) * 16;
    kick();
    window.setTimeout(() => {
      s.flying = false;
      setOrder((o) => [...o.slice(1), o[0]]);
      setDev((d) => d.map((v, i) => (i === order[1] ? v + 1 : v)));
      busy.current = false;
    }, reduced() ? 0 : 170);
  };

  const onDown = (e, i) => {
    if (i !== order[0] || busy.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = sim.current[i];
    s.held = true;
    drag.current = { i, sx: e.clientX, sy: e.clientY, ox: s.x, oy: s.y, lx: e.clientX, ly: e.clientY, lt: performance.now(), vx: 0, vy: 0, moved: false };
  };

  const onMove = (e, i) => {
    const d = drag.current;
    if (!d) {
      if (i === order[0] && canHover()) {
        const r = e.currentTarget.getBoundingClientRect();
        const edge = Math.min(e.clientX - r.left, r.right - e.clientX, e.clientY - r.top, r.bottom - e.clientY);
        setSpec(edge < 22);
      }
      return;
    }
    const now = performance.now(), dt = Math.max(1, now - d.lt);
    d.vx = 0.6 * d.vx + 0.4 * ((e.clientX - d.lx) / dt);
    d.vy = 0.6 * d.vy + 0.4 * ((e.clientY - d.ly) / dt);
    d.lx = e.clientX; d.ly = e.clientY; d.lt = now;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (Math.hypot(dx, dy) > 5) d.moved = true;
    const s = sim.current[d.i];
    s.x = d.ox + dx; s.y = d.oy + dy;
    s.r = REST[0].r + dx * 0.04 + Math.max(-12, Math.min(12, d.vx * 8));
    paint(d.i);
  };

  const onUp = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const s = sim.current[d.i];
    s.held = false;
    if (!d.moved) return cycle();
    const dx = s.x - d.ox, dy = s.y - d.oy;
    if (Math.hypot(dx, dy) > 90 || Math.hypot(d.vx, d.vy) > 0.7) {
      s.vx = d.vx * 1000; s.vy = d.vy * 1000;
      cycle(dx || d.vx, dy || d.vy);
    } else kick();
  };

  const top = CARDS[order[0]];
  return (
    <div
      className={"instax" + (fan ? " instax--fan" : "")}
      role="button"
      tabIndex={0}
      aria-label={`${top.rank} of hearts: ${top.bottom} ${top.side}. Press to show the next card.`}
      onPointerEnter={() => canHover() && setFan(true)}
      onPointerLeave={() => { if (canHover()) setFan(false); setSpec(false); }}
      // Touch: the hand fans open while a finger is on it, and a moment after.
      onPointerDownCapture={(e) => { if (e.pointerType !== "mouse") { clearTimeout(touchTimer.current); setFan(true); } }}
      onPointerUpCapture={(e) => { if (e.pointerType !== "mouse") { clearTimeout(touchTimer.current); touchTimer.current = window.setTimeout(() => setFan(false), 1400); } }}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); cycle(); } }}
    >
      {CARDS.map((c, i) => {
        const slot = order.indexOf(i);
        const isTop = slot === 0;
        return (
          <div
            key={c.rank}
            ref={(el) => { els.current[i] = el; }}
            className={"instax__card" + (isTop ? " instax__card--top" : "")}
            style={{ zIndex: 3 - slot, transform: `translate3d(${REST[i].x}px, ${REST[i].y}px, 0) rotate(${REST[i].r}deg)` }}
            aria-hidden="true"
            onPointerDown={(e) => onDown(e, i)}
            onPointerMove={(e) => onMove(e, i)}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <span className="instax__index"><span>{c.rank}</span><span>♥</span></span>
            <span className="instax__photo">
              <img key={dev[i]} src={c.img} alt={c.alt} draggable="false" className={isTop ? "instax__img--develop" : undefined} />
            </span>
            <span className="instax__bottom">{c.bottom}</span>
            <span className="instax__side">{c.side}</span>
            <span className="instax__index instax__index--br"><span>{c.rank}</span><span>♥</span></span>
            {isTop && <span className={"instax__spec" + (spec ? " instax__spec--on" : "")} aria-hidden="true">
              <i /><i /><i /><i />
              <b>{els.current[i]?.offsetWidth || ""} × {els.current[i]?.offsetHeight || ""}</b>
            </span>}
          </div>
        );
      })}
    </div>
  );
}
