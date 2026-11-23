// BlockWords: words drawn as small square blocks (5 x 7 letters, 4px pitch,
// so capitals are 28px tall). Hover or click: the blocks drop and pile up in
// each column, then stack back into the letters, settling like balanced stones.
// While they are piled, the "+" turns into a down arrow; it rebuilds as the
// arrow, and turns back into "+" the same way when the pointer leaves.
// Blocks use --text-primary. Reduced motion: the glyph swaps with no motion.
import { useLayoutEffect, useRef, useState } from "react";

const PITCH = 4;   // px per block, 7 rows = 28px
const ROWS = 9;    // 7 above the baseline, 2 for descenders (each word box is two 24px lines)
const HOLD = 380;  // ms the blocks rest in their piles

// 5-wide glyphs, rows top to bottom (rows 7-8 are the descender).
const GLYPHS = {
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  o: [".....", ".....", ".###.", "#...#", "#...#", "#...#", ".###."],
  d: ["....#", "....#", ".####", "#...#", "#...#", "#...#", ".####"],
  u: [".....", ".....", "#...#", "#...#", "#...#", "#..##", ".##.#"],
  t: [".#...", ".#...", "####.", ".#...", ".#...", ".#..#", "..##."],
  D: ["###..", "#..#.", "#...#", "#...#", "#...#", "#..#.", "###.."],
  e: [".....", ".....", ".###.", "#...#", "#####", "#....", ".###."],
  s: [".....", ".....", ".####", "#....", ".###.", "....#", "####."],
  a: [".....", ".....", ".###.", "....#", ".####", "#...#", ".####"],
  r: [".....", ".....", "#.##.", "##..#", "#....", "#....", "#...."],
  c: [".....", ".....", ".###.", "#....", "#....", "#...#", ".###."],
  h: ["#....", "#....", "#.##.", "##..#", "#...#", "#...#", "#...#"],
  i: ["..#..", ".....", ".##..", "..#..", "..#..", "..#..", ".###."],
  g: [".....", ".....", ".####", "#...#", "#...#", "#...#", ".####", "....#", ".###."],
  n: [".....", ".....", "#.##.", "##..#", "#...#", "#...#", "#...#"],
  "+": [".....", "..#..", "..#..", "#####", "..#..", "..#..", "....."],
  "↓": ["..#..", "..#..", "..#..", "#.#.#", ".###.", "..#..", "....."],
};

// The blocks of one word, as [col, row].
function blocksOf(word) {
  const out = [];
  [...word].forEach((ch, k) => {
    (GLYPHS[ch] || []).forEach((line, row) => {
      [...line].forEach((px, col) => { if (px === "#") out.push([k * 6 + col, row]); });
    });
  });
  return { blocks: out, cols: word.length * 6 - 1 };
}

function Word({ word, id }) {
  const { blocks, cols } = blocksOf(word);
  return (
    <span className="block-words__word" data-id={id} style={{ width: cols * PITCH, height: 48 }}>
      {blocks.map(([x, y]) => (
        <i key={`${x}-${y}`} data-x={x} data-y={y} style={{ left: x * PITCH, top: y * PITCH }} />
      ))}
    </span>
  );
}

// Gravity: in each column of a word, blocks keep their order and close every
// gap. Returns each block with its drop (px) and its place in the pile (k).
function piles(root) {
  const out = [];
  root.querySelectorAll(".block-words__word").forEach((w) => {
    const items = [...w.children].map((el) => ({
      el, x: +el.dataset.x, y: +el.dataset.y, key: `${w.dataset.id}:${el.dataset.x}-${el.dataset.y}`,
    }));
    const byCol = {};
    items.forEach((b) => (byCol[b.x] ||= []).push(b));
    Object.values(byCol).forEach((col) => {
      col.sort((p, q) => q.y - p.y);
      col.forEach((b, k) => { b.drop = (ROWS - 1 - k - b.y) * PITCH; b.k = k; });
    });
    out.push(...items);
  });
  return out;
}

export default function BlockWords({ words, label }) {
  const ref = useRef(null);
  const busy = useRef(false);
  const want = useRef(false);      // where the pointer wants it: arrow or plus
  const tilts = useRef({});
  const [arrow, setArrow] = useState(false);
  const [rise, setRise] = useState(0);

  const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Phase 1: everything falls into its piles, then the glyph swaps.
  const play = (next) => {
    const root = ref.current;
    if (!root || busy.current) return;
    if (still()) { setArrow(next); return; }
    busy.current = true;
    let landed = 0;
    piles(root).forEach((b) => {
      const fall = 700 + b.drop * 14;               // slow; farther falls take longer
      const delay = Math.random() * 300;
      const tilt = (Math.random() - 0.5) * 24;
      tilts.current[b.key] = tilt;
      b.el.animate(
        [{ transform: "none" }, { transform: `translateY(${b.drop}px) rotate(${tilt}deg)` }],
        { duration: fall, delay, easing: "cubic-bezier(.45,0,.55,1)", fill: "forwards" },
      );
      landed = Math.max(landed, delay + fall);
    });
    setTimeout(() => {
      setArrow(next);
      setRise((n) => n + 1);
    }, landed + HOLD);
  };

  // Phase 2: rebuild from the piles, bottom-up, now with the new glyph.
  useLayoutEffect(() => {
    if (!rise) return undefined;
    const root = ref.current;
    let longest = 0;
    piles(root).forEach((b) => {
      b.el.getAnimations().forEach((a) => a.cancel());
      const tilt = tilts.current[b.key] ?? (Math.random() - 0.5) * 24;
      const delay = b.k * 45;
      const duration = 520;
      b.el.animate(
        [
          { transform: `translateY(${b.drop}px) rotate(${tilt}deg)` },
          { transform: `translateY(-3px) rotate(${-tilt / 4}deg)`, offset: 0.7 },
          { transform: `translateY(1px) rotate(${tilt / 10}deg)`, offset: 0.85 },
          { transform: "none" },
        ],
        { duration, delay, easing: "ease-out", fill: "backwards" },
      );
      longest = Math.max(longest, delay + duration);
    });
    const t = setTimeout(() => {
      busy.current = false;
      // If the pointer left (or came back) meanwhile, follow it.
      if (want.current !== arrow) play(want.current);
    }, longest + 50);
    return () => clearTimeout(t);
  }, [rise]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (next) => { want.current = next; if (next !== arrow) play(next); };
  const shown = words.map((w) => (w === "+" && arrow ? "↓" : w));

  return (
    <button
      type="button"
      ref={ref}
      className="block-words"
      aria-label={label}
      onMouseEnter={() => go(true)}
      onMouseLeave={() => go(false)}
      onClick={() => go(!want.current)}
    >
      {shown.map((w, i) => <Word key={i} id={i} word={w} />)}
    </button>
  );
}
