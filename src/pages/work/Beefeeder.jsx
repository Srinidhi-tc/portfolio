// Bloom (butterfly feeder): the header and brief, then every picture with one
// friendly line under it, narrating the build in order.
import GalleryGrid from "../../components/layout/GalleryGrid";
import img1 from "../../assets/flowerfinal1.png";
import img2 from "../../assets/flowercone2.png";
import img3 from "../../assets/flowerUV3.png";
import img4a from "../../assets/flowerblender4a.png";
import img4b from "../../assets/flowerblender4b.png";
import img4c from "../../assets/flower4c.png";
import img5a from "../../assets/flowerexploded5.png";
import img5b from "../../assets/flowerparametric5b.png";
import img6 from "../../assets/flowerparametric6a.png";
import img7a from "../../assets/flowerSTL7a.png";
import img7b from "../../assets/flowerSTL7b.png";
import img8 from "../../assets/flowerfinal8.png";
import img9 from "../../assets/flowertimeline9.png";

const STORY = [
  { src: img1, line: "It started small: I really like butterflies and bees, so I wanted to 3D-print them a flower for the garden." },
  { src: img2, line: "My first yellow flower went into the garden, and the ants showed up instead of the butterflies." },
  { src: img4a, line: "So I made the flower parametric: petal count, length, angle and size could all change without starting over." },
  { src: img4b, line: "I tuned the stem down to the millimeter to make the climb harder for ants." },
  { src: img5a, line: "Inside, a small bowl and a sponge hold the sugar water, so nothing pools or spills." },
  { src: img5b, line: "Wider petals gave the butterflies an easier place to land." },
  { src: img9, line: "Then I mapped the whole visit from the butterfly's side: searching, approaching, landing, feeding." },
  { src: img3, line: "That is where I learned butterflies see ultraviolet, and my yellow flower was missing that signal." },
  { src: img4c, line: "A dotted coat of UV paint on the same print added the cue I couldn't see, but they could." },
  { src: img6, line: "Twelve variations later, the petal spacing, length and bowl depth felt right." },
  { src: img7a, line: "Before printing, I checked wall thickness, overhangs and tolerances on the STL." },
  { src: img7b, line: "The real print showed the petals flex under weight, something the screen never told me." },
  { src: img8, line: "The finished flower: it reads as a flower to us, and carries an extra UV signal for them." },
];

const brief = {
  fontSize: "var(--type-base)",
  color: "var(--text-secondary)",
  marginBottom: "var(--padding-small)",
  maxWidth: 640,
  lineHeight: "var(--leading-body)",
};

export default function BeeFeeder() {
  return (
    <GalleryGrid>
      <div style={{ color: "var(--text-primary)", margin: "0 auto" }}>
        <header style={{ marginBottom: "var(--padding-big)" }}>
          <p className="fine-print fine-print--eyebrow" style={{ marginBottom: "var(--padding-small)" }}>
            Parametric product design ▴ animal-centered design
          </p>
          <h1
            style={{
              fontSize: "var(--type-base)",
              fontWeight: "var(--weight-bold)",
              lineHeight: "var(--leading-heading)",
              marginBottom: "var(--padding-small)",
            }}
          >
            Butterfly Feeder
          </h1>
          <p style={brief}>A 3D-printed flower built for butterflies.</p>
          <p style={{ ...brief, marginBottom: 0 }}>
            What started as a garden accessory became a much more specific design
            problem: how does a flower become findable to a butterfly? The answer
            came from studying the animal rather than refining the object.
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
