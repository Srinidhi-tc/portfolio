// FloralFrame — a thin line box with a few leaves climbing the rails at the
// corners. Monochrome (follows the text colour) and hairline-weight, used in
// place of the double horizontal rules around a pulled insight or quote.
const LEAF = "M0 0 C3 -4 9 -4 12 0 C9 4 3 4 0 0Z";

function Leaf({ x, y, a, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d={LEAF} />
      <path d="M0 0 L12 0" />
    </g>
  );
}

function Corner({ sx, sy, small = false }) {
  const style = {
    position: "absolute",
    width: 0,
    height: 0,
    top: sy === 1 ? 0 : "auto",
    bottom: sy === -1 ? 0 : "auto",
    left: sx === 1 ? 0 : "auto",
    right: sx === -1 ? 0 : "auto",
    transform: `scale(${sx}, ${sy})`,
    pointerEvents: "none",
  };
  return (
    <span aria-hidden="true" style={style}>
      <svg
        width="84"
        height="84"
        viewBox="-12 -12 84 84"
        style={{ position: "absolute", left: -12, top: -12, overflow: "visible" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* stems climbing the top and left rails */}
        <path d="M0 0 C9 -4 17 4 27 -1 S43 3 52 -2" />
        <path d="M0 0 C-4 9 4 17 -1 27 S3 43 -2 52" />
        {/* leaves */}
        <Leaf x={15} y={1} a={-38} />
        <Leaf x={32} y={0.5} a={36} s={0.9} />
        {!small && <Leaf x={48} y={-1} a={-30} s={0.8} />}
        <Leaf x={1} y={16} a={52} s={0.9} />
        {!small && <Leaf x={-1} y={34} a={-52} s={0.8} />}
      </svg>
    </span>
  );
}

export default function FloralFrame({ children, style }) {
  return (
    <div className="floral-frame" style={style}>
      <Corner sx={1} sy={1} />
      <Corner sx={-1} sy={-1} />
      <Corner sx={-1} sy={1} small />
      <Corner sx={1} sy={-1} small />
      {children}
    </div>
  );
}
