// Hearts of Insomnia: the header and brief, then every picture with one
// friendly line under it, narrating the build in order.
import GalleryGrid from "../../components/layout/GalleryGrid";
import heart1 from "../../assets/heart1.png";
import heart3 from "../../assets/heart3.png";
import heart4 from "../../assets/heart4.png";
import heart5 from "../../assets/heart5.png";
import heart6 from "../../assets/heart6.png";
import heart7 from "../../assets/heart7.png";
import heart8 from "../../assets/heart8.png";
import heart9 from "../../assets/heart9.png";
import heart10 from "../../assets/heart10.png";
import heart11 from "../../assets/heart11.png";
import heart12 from "../../assets/heart12.png";

const STORY = [
  { src: heart1, line: "This began on sleepless nights, with racing thoughts and a heartbeat you can feel." },
  { src: heart3, line: "Early sketches had sensors, light and sound; we kept only what the heart really needed." },
  { src: heart4, line: "Most of the time it should just be a bedside lamp, not another health dashboard." },
  { src: heart5, line: "Then the prototype got messy: wires, LEDs, audio and jumpy sensor readings." },
  { src: heart6, line: "We tuned it so every little flicker in the signal wouldn't feel like an alarm." },
  { src: heart7, line: "Fitting the electronics inside while keeping a real heart shape took many rounds." },
  { src: heart8, line: "Printing showed a seam we hadn't seen on screen, so we kept printing and adjusting." },
  { src: heart9, line: "The pedestal grew from a plain support into part of the piece, hiding every wire." },
  { src: heart10, line: "Light became the language: five soft phases, from ordinary lamp to something you notice." },
  { src: heart11, line: "Sound moved into its own interactive layer, so we could actually tune it." },
  { src: heart12, line: "We also tried a tiny heart keychain, just to see it leave the nightstand." },
];

const brief = {
  fontSize: "var(--type-base)",
  color: "var(--text-secondary)",
  marginBottom: "var(--padding-small)",
  maxWidth: 640,
  lineHeight: "var(--leading-body)",
};

export default function HeartsOfInsomnia() {
  return (
    <GalleryGrid>
      <div style={{ color: "var(--text-primary)", margin: "0 auto" }}>
        <header style={{ marginBottom: "var(--padding-big)" }}>
          <p className="fine-print fine-print--eyebrow" style={{ marginBottom: "var(--padding-small)" }}>
            Physical Computing ▴ Emotional Design
          </p>
          <h1
            style={{
              fontSize: "var(--type-base)",
              fontWeight: "var(--weight-bold)",
              lineHeight: "var(--leading-heading)",
              marginBottom: "var(--padding-small)",
            }}
          >
            Hearts of Insomnia
          </h1>
          <p style={brief}>CHI 2026 ▴ Interactive Demo</p>
          <p style={{ ...brief, marginBottom: 0 }}>
            What if a bedside lamp could notice when the body starts to change,
            without turning the moment into another notification?
          </p>
        </header>

        <main style={{ display: "flex", flexDirection: "column", gap: "var(--padding-big)" }}>
          {STORY.map(({ src, line }) => (
            <figure key={src} style={{ margin: 0 }}>
              <img
                src={src}
                alt={line}
                style={{ width: "100%", borderRadius: "var(--radius)", display: "block", marginBottom: "var(--padding-small)" }}
              />
              <figcaption style={{ fontSize: "var(--type-base)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)", maxWidth: 640 }}>
                {line}
              </figcaption>
            </figure>
          ))}
        </main>
      </div>
    </GalleryGrid>
  );
}
