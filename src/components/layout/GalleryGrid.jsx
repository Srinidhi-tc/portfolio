// GalleryGrid: the same 4 columns as everything else. Column 1 is left for
// the header stack, content sits in columns 2 + 3, column 4 stays empty.
export default function GalleryGrid({ children }) {
  return (
    <div className="stacks-grid">
      <div className="stacks-col stacks-col--1" aria-hidden="true" />
      <div className="stacks-col stacks-col--x">{children}</div>
      <div className="stacks-col stacks-col--4" aria-hidden="true" />
    </div>
  );
}
