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

const eyebrow = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-tertiary)",
  marginBottom: 8,
};

const body = {
  fontSize: 16,
  color: "var(--muted)",
  lineHeight: 1.6,
  maxWidth: 640,
};

function Block({ src, subheading, caption }) {
  return (
    <div>
      <img
        src={src}
        alt={subheading}
        style={{
          width: "100%",
          borderRadius: 12,
          display: "block",
          marginBottom: 16,
        }}
      />
      <p style={eyebrow}>{subheading}</p>
      <p style={body}>{caption}</p>
    </div>
  );
}

function SideBySide({ left, right }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
      }}
    >
      <div>
        <img
          src={left.src}
          alt={left.subheading}
          style={{
            width: "100%",
            borderRadius: 12,
            display: "block",
            marginBottom: 16,
          }}
        />
        <p style={eyebrow}>{left.subheading}</p>
        <p style={body}>{left.caption}</p>
      </div>

      <div>
        <img
          src={right.src}
          alt={right.subheading}
          style={{
            width: "100%",
            borderRadius: 12,
            display: "block",
            marginBottom: 16,
          }}
        />
        <p style={eyebrow}>{right.subheading}</p>
        <p style={body}>{right.caption}</p>
      </div>
    </div>
  );
}

function SectionHeading({ number, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ ...eyebrow, marginBottom: 10 }}>{number}</p>
      <h2
        style={{
          fontSize: "clamp(28px, 7vw, 42px)",
          lineHeight: 1.12,
          letterSpacing: "-0.5px",
          fontWeight: 650,
          margin: 0,
          maxWidth: 720,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function JourneyLabel({ children }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 650,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color: "var(--color-text-tertiary)",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function JourneyCell({ children, highlighted = false, label }) {
  return (
    <div
      style={{
        background: highlighted ? "#fff7c7" : "var(--surface-2)",
        borderRadius: 12,
        padding: "16px 15px",
        minHeight: 96,
        border: highlighted
          ? "1px solid rgba(170, 140, 0, 0.28)"
          : "1px solid transparent",
        position: "relative",
      }}
    >
      {highlighted && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "#766400",
          }}
        >
          KEY INSIGHT
        </div>
      )}

      {label && <JourneyLabel>{label}</JourneyLabel>}

      <p
        style={{
          fontSize: 14,
          color: "var(--text)",
          lineHeight: 1.45,
          margin: label ? "8px 0 0" : 0,
          maxWidth: 230,
        }}
      >
        {children}
      </p>
    </div>
  );
}

function ButterflyJourneyChart() {
  const stages = [
    {
      title: "Searching",
      thoughts: "Where is the next flower?",
      behaviour: "Moves through the garden looking for food.",
      feelings: "Alert and selective.",
      senses: "Scans the environment for visual cues.",
    },
    {
      title: "Approaching",
      thoughts: "Could this be food?",
      behaviour: "Moves closer to a possible flower.",
      feelings: "Interested, but evaluating.",
      senses: "Colour, shape, and other visual signals.",
    },
    {
      title: "Landing",
      thoughts: "Is this a place to feed?",
      behaviour: "Positions on the flower surface.",
      feelings: "Ready to inspect the flower.",
      senses: "Landing geometry becomes important.",
    },
    {
      title: "Finding food",
      thoughts: "Where is the nectar?",
      behaviour: "Locates the feeding area.",
      feelings: "Focused on the food source.",
      senses: "UV VISION",
      highlighted: true,
    },
    {
      title: "Feeding",
      thoughts: "This is a usable food source.",
      behaviour: "Feeds from the flower centre.",
      feelings: "Settled and engaged.",
      senses:
        "Continues responding to the flower and feeding setup.",
    },
  ];

  const rows = [
    { label: "Thoughts", key: "thoughts" },
    { label: "Behaviour", key: "behaviour" },
    { label: "Feelings", key: "feelings" },
    { label: "Senses", key: "senses" },
  ];

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ marginBottom: 18 }}>
        <JourneyLabel>Butterfly customer journey</JourneyLabel>

        <p
          style={{
            ...body,
            margin: "8px 0 0",
            maxWidth: 720,
          }}
        >
          Qualitative journey map connecting prototype observations with
          biological research and design hypotheses.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px repeat(5, minmax(0, 1fr))",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        <div />

        {stages.map((stage) => (
          <div
            key={stage.title}
            style={{
              padding: "8px 12px",
              minWidth: 145,
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 650,
                margin: 0,
                color: "var(--text)",
              }}
            >
              {stage.title}
            </p>
          </div>
        ))}

        {rows.map((row) => (
          <div key={row.label} style={{ display: "contents" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 10px 0 0",
                minWidth: 100,
              }}
            >
              <JourneyLabel>{row.label}</JourneyLabel>
            </div>

            {stages.map((stage) => (
              <JourneyCell
                key={`${row.key}-${stage.title}`}
                highlighted={
                  stage.highlighted && row.key === "senses"
                }
              >
                {stage[row.key]}
              </JourneyCell>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function UVInsightCard() {
  return (
    <div
      style={{
        marginTop: 28,
        padding: "24px 24px 26px",
        borderRadius: 16,
        background: "var(--surface-2)",
        border: "1px solid var(--hairline-weak)",
      }}
    >
      <JourneyLabel>The turning point</JourneyLabel>

      <p
        style={{
          fontSize: "clamp(20px, 4vw, 28px)",
          lineHeight: 1.25,
          letterSpacing: "-0.25px",
          fontWeight: 600,
          margin: "10px 0 24px",
          maxWidth: 650,
        }}
      >
        The flower looked right to humans. It still missed a butterfly cue.
      </p>

      <div
        style={{
          borderTop: "1px solid var(--hairline-weak)",
          paddingTop: 18,
        }}
      >
        <JourneyLabel>UV vision</JourneyLabel>

        <p
          style={{
            ...body,
            margin: "8px 0 0",
            maxWidth: 700,
          }}
        >
          Butterflies can perceive ultraviolet information that is not visible
          to humans. The discovery shifted the surface treatment from simply
          looking like a flower to communicating through another visual cue.
        </p>
      </div>
    </div>
  );
}

function RoleImpact() {
  const items = [
    "Fall 2025 · Purdue University",
    "Team — Solo project",
    "Designed the flower, feeder geometry, stem, seating disc, and drainage system.",
    "Built and iterated the parametric model, then translated it into 3D-printed prototypes.",
    "Mapped the butterfly experience and translated UV-vision research into the final surface treatment.",
    "Tested the physical prototype, including the shift from a plain yellow flower to a UV-painted pattern.",
  ];

  return (
    <div
      style={{
        borderTop: "0.5px solid var(--hairline-weak)",
        paddingTop: 40,
        marginTop: 80,
      }}
    >
      <p style={eyebrow}>MY ROLE</p>

      <h2
        style={{
          fontSize: "clamp(28px, 7vw, 40px)",
          lineHeight: 1.12,
          letterSpacing: "-0.4px",
          fontWeight: 650,
          margin: "0 0 24px",
        }}
      >
        From garden accessory to animal-centered product.
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: 10,
              alignItems: "start",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--text)",
                marginTop: 9,
              }}
            />

            <p
              style={{
                ...body,
                margin: 0,
                maxWidth: 700,
              }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BeeFeeder() {
  return (
    <div
      style={{
        fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif",
        color: "var(--text)",
        padding: "80px 40px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <p
        className="fine-print fine-print--eyebrow"
        style={{ marginBottom: 12 }}
      >
        PARAMETRIC PRODUCT DESIGN · ANIMAL-CENTERED DESIGN
      </p>

      <h1
        style={{
          fontSize: "clamp(34px, 11vw, 56px)",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          lineHeight: 1.05,
          marginBottom: 16,
        }}
      >
        Butterfly Feeder
      </h1>

      <p
        style={{
          fontSize: 19,
          color: "var(--muted)",
          marginBottom: 16,
          maxWidth: 600,
        }}
      >
        A 3D-printed flower built for butterflies.
      </p>

      <p
        style={{
          fontSize: 16,
          color: "var(--muted)",
          marginBottom: 64,
          maxWidth: 640,
          lineHeight: 1.6,
        }}
      >
        What started as a garden accessory became a much more specific design
        problem: how does a flower become findable to a butterfly? The answer
        came from studying the animal rather than refining the object.
      </p>

      <div className="stat-grid" style={{ marginBottom: 80 }}>
        {[
          { value: "Parametric", label: "design system" },
          { value: "UV-guided", label: "animal experience" },
          { value: "3D Printed", label: "functional product" },
        ].map(({ value, label }) => (
          <div
            key={label}
            style={{
              background: "var(--surface-2)",
              borderRadius: 10,
              padding: "14px 16px",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(16px, 4.4vw, 20px)",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: 2,
              }}
            >
              {value}
            </span>

            <span
              style={{
                fontSize: 12,
                color: "var(--color-text-tertiary)",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 88,
        }}
      >
        <section>
          <SectionHeading number="01 — STARTING POINT">
            A garden accessory needed a user.
          </SectionHeading>

          <Block
            src={img1}
            subheading="The original idea was simple."
            caption="The first direction was a 3D-printed flower that could plug directly into soil as a garden accessory. The form looked familiar, but the real test was whether butterflies would treat it as a flower."
          />
        </section>

        <section>
          <SectionHeading number="02 — FIRST PROTOTYPE">
            No butterflies came. Ants did instead.
          </SectionHeading>

          <Block
            src={img2}
            subheading="The first physical test exposed the gap."
            caption="A yellow flower made sense from a human point of view. The prototype attracted ants instead of butterflies. That changed the question from how the flower should look to what the butterfly actually needs to notice and approach it."
          />
        </section>

        <section>
          <SectionHeading number="03 — REDESIGN">
            Parametric geometry became the next experiment.
          </SectionHeading>

          <SideBySide
            left={{
              src: img4a,
              subheading: "The model became adjustable.",
              caption:
                "Petal count, length, angle, bowl diameter, and overall scale became editable parameters. Each change could generate another version without rebuilding the flower from scratch.",
            }}
            right={{
              src: img4b,
              subheading: "The stem became a constraint.",
              caption:
                "The stem was redesigned at millimeter scale to make it harder for ants to climb. The flower was no longer only a shape; its dimensions were being tuned around what happened during testing.",
            }}
          />
        </section>

        <section>
          <SectionHeading number="04 — FEEDING SYSTEM">
            The flower also needed a place to land.
          </SectionHeading>

          <SideBySide
            left={{
              src: img5a,
              subheading: "The feeder became a system.",
              caption:
                "The design separated into an outer petal structure, a centre bowl, and a removable sponge insert. The 21 mm bowl held sugar water through the sponge rather than leaving an open pool.",
            }}
            right={{
              src: img5b,
              subheading: "Landing became part of geometry.",
              caption:
                "Petals were widened to create easier landing surfaces, while the centre bowl was deepened to reduce spillage. The flower could now support the feeding interaction instead of only resembling one.",
            }}
          />
        </section>

        <section>
          <SectionHeading number="05 — BUTTERFLY EXPERIENCE">
            The butterfly became the design brief.
          </SectionHeading>

          <Block
            src={img9}
            subheading="Mapping the experience changed the questions."
            caption="Instead of treating the butterfly as a passive recipient, the journey was mapped around what it might notice, do, feel, and sense while searching for food. The most important gap was sensory: a flower designed for human vision may not communicate the same way to a butterfly."
          />

          <ButterflyJourneyChart />
        </section>

        <section>
          <SectionHeading number="06 — THE BREAKTHROUGH">
            The key clue was ultraviolet vision.
          </SectionHeading>

          <Block
            src={img3}
            subheading="The yellow flower was incomplete."
            caption="Butterflies can see ultraviolet light that humans cannot. Natural flowers can use ultraviolet patterns as visual guides. The plain yellow 3D-printed flower reproduced the visible colour, but not the cue that could make the flower more recognizable to its intended user."
          />

          <UVInsightCard />
        </section>

        <section>
          <SectionHeading number="07 — SURFACE ITERATION">
            UV paint turned the hidden cue visible.
          </SectionHeading>

          <Block
            src={img4c}
            subheading="The intervention was deliberately simple."
            caption="The same printed flower was coated with UV paint in a dotted pattern. No new form was required. The surface treatment changed the signal while keeping the underlying 3D-printed geometry intact."
          />
        </section>

        <section>
          <SectionHeading number="08 — PARAMETRIC EXPLORATION">
            More versions made the geometry easier to tune.
          </SectionHeading>

          <Block
            src={img6}
            subheading="Twelve variations tested the relationships."
            caption="Petal spacing, petal length, flower diameter, and bowl depth were varied independently. Parametric modelling made it possible to compare versions quickly while keeping the rest of the system consistent."
          />
        </section>

        <section>
          <SectionHeading number="09 — PRINTING">
            The physical print exposed new constraints.
          </SectionHeading>

          <SideBySide
            left={{
              src: img7a,
              subheading: "Printability came before the final print.",
              caption:
                "Wall thickness, petal overhang angles, and bowl tolerances were reviewed before exporting the final geometry as an STL.",
            }}
            right={{
              src: img7b,
              subheading: "Material behaved differently at scale.",
              caption:
                "The first physical prototype revealed petal flex under load and confirmed the bowl volume. Printing exposed behaviour that was difficult to judge from the digital model alone.",
            }}
          />
        </section>

        <section>
          <SectionHeading number="10 — FINAL RESULT">
            The same flower finally became findable.
          </SectionHeading>

          <Block
            src={img8}
            subheading="The final feeder combined form and signal."
            caption="The finished object brought together the flower geometry, landing surfaces, contained feeding system, and UV-guided surface treatment. The form still reads as a garden flower to a person; the added UV pattern gives the design another layer intended for its butterfly user."
          />
        </section>
      </div>

      <RoleImpact />

      <div
        className="meta-grid"
        style={{
          borderTop: "0.5px solid var(--hairline-weak)",
          paddingTop: 40,
          marginTop: 48,
        }}
      >
        {[
          { label: "Type", value: "Parametric Product Design" },
          {
            label: "Tools",
            value: "Blender · SolidWorks · 3D Printing",
          },
          {
            label: "Focus",
            value: "Bio-inspired Design · Animal Experience",
          },
        ].map(({ label, value }) => (
          <div key={label}>
            <p
              className="fine-print"
              style={{
                color: "var(--color-text-tertiary)",
                marginBottom: 4,
              }}
            >
              {label}
            </p>

            <p style={{ fontSize: 14, fontWeight: 500 }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
