// BlockWords: words drawn as small square blocks (5 x 7 letters, 4px pitch,
// so capitals are 28px tall). Hover or click: the blocks drop and pile up in
// each column, then stack back into the letters, settling like balanced stones.
// Blocks use --text-primary. Reduced motion: no animation.
import { useRef } from "react";

const PITCH = 4;   // px per block, 7 rows = 28px
const ROWS = 9;    // 7 above the baseline, 2 for descenders (each word box is two 24px lines)

// 5-wide glyphs, rows top to bottom (rows 7-8 are the descender).
const GLYPHS = {
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
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

function Word({ word }) {
  const { blocks, cols } = blocksOf(word);
  return (
    <span className="block-words__word" style={{ width: cols * PITCH, height: 48 }}>
      {blocks.map(([x, y]) => (
        <i key={`${x}-${y}`} data-x={x} data-y={y} style={{ left: x * PITCH, top: y * PITCH }} />
      ))}
    </span>
  );
}

export default function BlockWords({ words, label }) {
  const ref = useRef(null);
  const busy = useRef(false);

  const play = () => {
    const root = ref.current;
    if (!root || busy.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    busy.current = true;
    let longest = 0;
    root.querySelectorAll(".block-words__word").forEach((w) => {
      const items = [...w.children].map((el) => ({ el, x: +el.dataset.x, y: +el.dataset.y }));
      // Gravity: in each column, blocks keep their order and close every gap.
      const byCol = {};
      items.forEach((b) => (byCol[b.x] ||= []).push(b));
      Object.values(byCol).forEach((col) => {
        col.sort((p, q) => q.y - p.y);
        col.forEach((b, k) => { b.drop = (ROWS - 1 - k - b.y) * PITCH; b.k = k; });
      });
      items.forEach((b) => {
        const fall = 700 + b.drop * 14;               // slow; farther falls take longer
        const delay = Math.random() * 300;
        const rise = 520;
        const riseDelay = fall + 380 + b.k * 45;       // rebuilt bottom-up, like stacking
        const tilt = (Math.random() - 0.5) * 24;
        b.el.animate(
          [{ transform: "none" }, { transform: `translateY(${b.drop}px) rotate(${tilt}deg)` }],
          { duration: fall, delay, easing: "cubic-bezier(.45,0,.55,1)", fill: "forwards" },
        );
        b.el.animate(
          [
            { transform: `translateY(${b.drop}px) rotate(${tilt}deg)` },
            { transform: `translateY(-3px) rotate(${-tilt / 4}deg)`, offset: 0.7 },
            { transform: `translateY(1px) rotate(${tilt / 10}deg)`, offset: 0.85 },
            { transform: "none" },
          ],
          { duration: rise, delay: delay + riseDelay, easing: "ease-out", fill: "forwards" },
        );
        longest = Math.max(longest, delay + riseDelay + rise);
      });
    });
    setTimeout(() => {
      root.querySelectorAll("i").forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
      busy.current = false;
    }, longest + 50);
  };

  return (
    <button
      type="button"
      ref={ref}
      className="block-words"
      aria-label={label}
      onMouseEnter={play}
      onClick={play}
    >
      {words.map((w) => <Word key={w} word={w} />)}
    </button>
  );
}
