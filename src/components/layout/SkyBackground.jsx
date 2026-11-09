// SkyBackground: the quiet ground behind every page. No image.
// One overcast tone (--surface) across all four columns, and small ticks at the
// top that mark each column edge. All in CSS. In light mode the home page
// keeps the design system white (#FBFBFD).
export default function SkyBackground({ home = false }) {
  return <div className={"sky-background" + (home ? " sky-background--home" : "")} aria-hidden="true" />;
}
