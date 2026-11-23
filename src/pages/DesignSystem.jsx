// Design system: the one-page cheat sheet, shown as a single image across
// all four columns, with one line on why stacks and Fs help the reader.
import cheatsheet from "../assets/design-system-cheatsheet.webp";

export default function DesignSystem() {
  return (
    <div className="stacks-grid ds">
      <p className="ds-purpose" style={{ gridColumn: "1 / -1" }}>
        Stacks and Fs give the eye one edge to return to and one line to follow, which
        cuts scanning effort and keeps the reading order the same for screen readers.
      </p>
      <img
        className="ds-sheet"
        style={{ gridColumn: "1 / -1" }}
        src={cheatsheet}
        alt="Design system cheat sheet: 4 columns, 3 space values (8, 24, 48), one 24px line height, 2 text tones; type scale 28, 16 bold, 16 regular, 13 thin; colors #1D1D1F, #6E6E73, #2563EB; baseline, objects 48, 96, 160; patterns and rules."
      />
    </div>
  );
}
