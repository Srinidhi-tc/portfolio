// AnnotationTag — a small pastel tag for a short UX/design observation, styled
// like a minimal physical sticky note. Used sparingly, not as a page-wide
// aesthetic: a couple of these per portfolio is the right amount.
export default function AnnotationTag({ children, tone = "sage", rotate = 0, style }) {
  return (
    <span
      className={`annotation-tag annotation-tag--${tone}`}
      style={{
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
