export default function ImagePlaceholder({ label, aspect = "hero", className = "" }) {
  return (
    <div className={`img-placeholder img-placeholder--${aspect} ${className}`.trim()}>
      <span>{label || "Image"}</span>
    </div>
  );
}
