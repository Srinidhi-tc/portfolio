import Kicker from "../../components/ui/Kicker";
import GalleryGrid from "../../components/layout/GalleryGrid";
import AnnotationTag from "../../components/ui/AnnotationTag";
import ChapterToggle from "../../components/ui/ChapterToggle";
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
  fontSize: "var(--type-base)",
  fontWeight: "var(--weight-regular)",
  color: "var(--text-secondary)",
  marginBottom: "var(--padding-small)",
};

const body = {
  fontSize: "var(--type-base)",
  color: "var(--text-secondary)",
  lineHeight: "var(--leading-body)",
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
          borderRadius: "var(--radius)",
          display: "block",
          marginBottom: "var(--padding-small)"
        }}
      />
      <p style={eyebrow}>{subheading}</p>
      <p style={{ ...body, fontSize: "var(--type-base)", fontWeight: "var(--weight-regular)" }}>{caption}</p>
    </div>
  );
}

function SideBySide({ left, right }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "var(--padding-small)"
      }}
    >
      <div>
        <img
          src={left.src}
          alt={left.subheading}
          style={{
            width: "100%",
            borderRadius: "var(--radius)",
            display: "block",
            marginBottom: "var(--padding-small)"
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
            borderRadius: "var(--radius)",
            display: "block",
            marginBottom: "var(--padding-small)"
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
    <div style={{ marginBottom: "var(--padding-small)" }}>
      {number && <Kicker style={{ marginBottom: "var(--padding-small)" }}>{number}</Kicker>}
      <h2
        style={{
          fontSize: "var(--type-base)",
          lineHeight: "var(--leading-heading)",
          margin: 0,
          maxWidth: 720, fontWeight: "var(--weight-bold)" }}
      >
        {children}
      </h2>
    </div>
  );
}

function JourneyLabel({ children, dark = false }) {
  return (
    <p
      style={{
        fontSize: "var(--type-base)",
        fontWeight: "var(--weight-regular)",
        color: dark ? "#6b5900" : "var(--color-text-tertiary)",
        margin: 0
      }}
    >
      {children}
    </p>
  );
}

function JourneyCell({ children, highlighted = false, label }) {
  return (
    <div
      className={highlighted ? undefined : "hand-bullet"}
      style={{
        background: highlighted ? "#FFF9B1" : "none",
        borderRadius: highlighted ? "var(--radius)" : 0,
        padding: highlighted ? "16px 15px" : "0 0 0 var(--padding-small)",
        minHeight: 96,
        border: "none",
        boxShadow: highlighted ? "0 5px 10px rgba(0, 0, 0, 0.22)" : "none",
        position: "relative"
      }}
    >
      {highlighted && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "var(--padding-small)",
            fontSize: "var(--type-base)",
            fontWeight: "var(--weight-regular)",
            color: "#1D1D1F"
          }}
        >
          Key insight
        </div>
      )}

      {label && <JourneyLabel dark={highlighted}>{label}</JourneyLabel>}

      <p
        style={{
          fontSize: "var(--type-base)",
          color: highlighted ? "#352c00" : "var(--text)",
          lineHeight: "var(--leading-subheading)",
          margin: label ? "var(--padding-small) 0 0" : 0,
          maxWidth: 230
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
      senses: "UV vision",
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
    <div style={{ marginTop: "var(--padding-small)" }}>
      <div style={{ marginBottom: "var(--padding-small)" }}>
        <JourneyLabel>Butterfly customer journey</JourneyLabel>

        <p
          style={{
            ...body,
            margin: "var(--padding-small) 0 0",
            maxWidth: 720
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
          gap: "var(--padding-small)",
          overflowX: "auto",
          paddingBottom: 0
        }}
      >
        <div />

        {stages.map((stage) => (
          <div
            key={stage.title}
            style={{
              padding: "var(--padding-small) var(--padding-small)",
              minWidth: 145
            }}
          >
            <p
              style={{
                fontSize: "var(--type-base)",
                fontWeight: "var(--weight-regular)",
                margin: 0,
                color: "var(--text-primary)"
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
                padding: "0 var(--padding-small) 0 0",
                minWidth: 100
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
    <div className="hand-bullet"
      style={{
        marginTop: "var(--padding-small)" }}
    >
      <JourneyLabel>The turning point</JourneyLabel>

      <p
        style={{
          fontSize: "var(--type-base)",
          lineHeight: "var(--leading-subheading)",
          fontWeight: "var(--weight-regular)",
          margin: "var(--padding-small) 0 var(--padding-small)",
          maxWidth: 650
        }}
      >
        The flower looked right to humans. It still missed a butterfly cue.
      </p>

      <div style={{ marginBottom: "var(--padding-small)" }}>
        <AnnotationTag tone="sage" rotate={-1.5}>Invisible to humans</AnnotationTag>
      </div>

      <div
        style={{
          paddingTop: "var(--padding-small)"
        }}
      >
        <JourneyLabel>UV vision</JourneyLabel>

        <p
          style={{
            ...body,
            margin: "var(--padding-small) 0 0",
            maxWidth: 700
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
    "Fall 2025 ▴ Purdue University",
    "Team ▴ Solo project",
    "Designed the flower, feeder geometry, stem, seating disc, and drainage system.",
    "Built and iterated the parametric model, then translated it into 3D-printed prototypes.",
    "Mapped the butterfly experience and translated UV-vision research into the final surface treatment.",
    "Tested the physical prototype, including the shift from a plain yellow flower to a UV-painted pattern.",
  ];

  return (
    <div
      style={{
        paddingTop: "var(--padding-big)",
        marginTop: "var(--padding-big)"
      }}
    >
      <p style={eyebrow}>My role</p>

      <h2
        style={{
          fontSize: "var(--type-base)",
          lineHeight: "var(--leading-heading)",
          margin: "0 0 var(--padding-small)", fontWeight: "var(--weight-bold)" }}
      >
        From garden accessory to animal-centered product.
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--padding-small)" }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: "var(--padding-small)",
              alignItems: "start"
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--text)",
                marginTop: "var(--padding-small)"
              }}
            />

            <p
              style={{
                ...body,
                margin: 0,
                maxWidth: 700
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
    <GalleryGrid>
    <div
      style={{
        color: "var(--text-primary)",
        margin: "0 auto"
      }}
    >
      <p
        className="fine-print fine-print--eyebrow"
        style={{ marginBottom: "var(--padding-small)" }}
      >
        Parametric product design ▴ animal-centered design
      </p>

      <h1
        style={{
          fontSize: "var(--type-base)",
          fontWeight: "var(--weight-bold)",
          lineHeight: "var(--leading-heading)",
          marginBottom: "var(--padding-small)"
        }}
      >
        Butterfly Feeder
      </h1>

      <p
        style={{
          fontSize: "var(--type-base)",
          color: "var(--text-secondary)",
          marginBottom: "var(--padding-small)",
          maxWidth: 600
        }}
      >
        A 3D-printed flower built for butterflies.
      </p>

      <p
        style={{
          fontSize: "var(--type-base)",
          color: "var(--text-secondary)",
          marginBottom: "var(--padding-big)",
          maxWidth: 640,
          lineHeight: "var(--leading-body)"
        }}
      >
        What started as a garden accessory became a much more specific design
        problem: how does a flower become findable to a butterfly? The answer
        came from studying the animal rather than refining the object.
      </p>

      <div className="stat-grid" style={{ marginBottom: "var(--padding-big)" }}>
        {[
          { value: "Parametric", label: "design system" },
          { value: "UV-guided", label: "animal experience" },
          { value: "3D Printed", label: "functional product" },
        ].map(({ value, label }) => (
          <div className="hand-bullet"
            key={label}
            
          >
            <span
              style={{
                display: "block",
                fontSize: "var(--type-base)",
                fontWeight: "var(--weight-regular)",
                color: "var(--text-primary)",
                marginBottom: 0
              }}
            >
              {value}
            </span>

            <span
              style={{
                fontSize: "var(--type-base)",
                color: "var(--text-secondary)"
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
          gap: "var(--padding-big)"
        }}
      >
        <section>
          <SectionHeading number="The starting point">
            A garden accessory needed a user.
          </SectionHeading>

          <Block
            src={img1}
            subheading="The original idea was simple."
            caption="The first direction was a 3D-printed flower that could plug directly into soil as a garden accessory. The form looked familiar, but the real test was whether butterflies would treat it as a flower."
          />
        </section>

        <section id="problem">
          <SectionHeading number="The first prototype">
            No butterflies came. Ants did instead.
          </SectionHeading>

          <Block
            src={img2}
            subheading="The first physical test exposed the gap."
            caption="A yellow flower made sense from a human point of view. The prototype attracted ants instead of butterflies. That changed the question from how the flower should look to what the butterfly actually needs to notice and approach it."
          />
        </section>

        <section>
          <SectionHeading number="The redesign">
            Parametric geometry became the next experiment.
          </SectionHeading>

          <SideBySide
            left={{
              src: img4a,
              subheading: "The model became adjustable.",
              caption:
                "Petal count, length, angle, bowl diameter, and overall scale became editable parameters. Each change could generate another version without rebuilding the flower from scratch."
            }}
            right={{
              src: img4b,
              subheading: "The stem became a constraint.",
              caption:
                "The stem was redesigned at millimeter scale to make it harder for ants to climb. The flower was no longer only a shape; its dimensions were being tuned around what happened during testing."
            }}
          />
        </section>

        <section>
          <SectionHeading number="The feeding system">
            The flower also needed a place to land.
          </SectionHeading>

          <SideBySide
            left={{
              src: img5a,
              subheading: "The feeder became a system.",
              caption:
                "The design separated into an outer petal structure, a centre bowl, and a removable sponge insert. The 21 mm bowl held sugar water through the sponge rather than leaving an open pool."
            }}
            right={{
              src: img5b,
              subheading: "Landing became part of geometry.",
              caption:
                "Petals were widened to create easier landing surfaces, while the centre bowl was deepened to reduce spillage. The flower could now support the feeding interaction instead of only resembling one."
            }}
          />
        </section>

        <section>
          <SectionHeading number="The butterfly experience">
            The butterfly became the design brief.
          </SectionHeading>

          <Block
            src={img9}
            subheading="Mapping the experience changed the questions."
            caption="Instead of treating the butterfly as a passive recipient, the journey was mapped around what it might notice, do, feel, and sense while searching for food. The most important gap was sensory: a flower designed for human vision may not communicate the same way to a butterfly."
          />

          <ButterflyJourneyChart />
        </section>

        <section id="decisions">
          <SectionHeading number="The breakthrough">
            The key clue was ultraviolet vision.
          </SectionHeading>

          <Block
            src={img3}
            subheading="The yellow flower was incomplete."
            caption="Butterflies can see ultraviolet light that humans cannot. Natural flowers can use ultraviolet patterns as visual guides. The plain yellow 3D-printed flower reproduced the visible colour, but not the cue that could make the flower more recognizable to its intended user."
          />

          <UVInsightCard />
        </section>

        <section id="tradeoffs">
          <SectionHeading number="Surface iteration">
            UV paint turned the hidden cue visible.
          </SectionHeading>

          <Block
            src={img4c}
            subheading="The intervention was deliberately simple."
            caption="The same printed flower was coated with UV paint in a dotted pattern. No new form was required. The surface treatment changed the signal while keeping the underlying 3D-printed geometry intact."
          />
        </section>

        <section>
          <SectionHeading number="Parametric exploration">
            More versions made the geometry easier to tune.
          </SectionHeading>

          <Block
            src={img6}
            subheading="Twelve variations tested the relationships."
            caption="Petal spacing, petal length, flower diameter, and bowl depth were varied independently. Parametric modelling made it possible to compare versions quickly while keeping the rest of the system consistent."
          />
        </section>

        <section>
          <SectionHeading number="Printing">
            The physical print exposed new constraints.
          </SectionHeading>

          <SideBySide
            left={{
              src: img7a,
              subheading: "Printability came before the final print.",
              caption:
                "Wall thickness, petal overhang angles, and bowl tolerances were reviewed before exporting the final geometry as an STL."
            }}
            right={{
              src: img7b,
              subheading: "Material behaved differently at scale.",
              caption:
                "The first physical prototype revealed petal flex under load and confirmed the bowl volume. Printing exposed behaviour that was difficult to judge from the digital model alone."
            }}
          />
        </section>

        <section id="impact">
          <SectionHeading number="The final result">
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
      <ChapterToggle />

      <div
        className="meta-grid"
        style={{
          paddingTop: "var(--padding-big)",
          marginTop: "var(--padding-big)"
        }}
      >
        {[
          { label: "Type", value: "Parametric Product Design" },
          {
            label: "Tools",
            value: "Blender ▴ SolidWorks ▴ 3D Printing",
          },
          {
            label: "Focus",
            value: "Bio-inspired Design ▴ Animal Experience",
          },
        ].map(({ label, value }) => (
          <div key={label}>
            <p
              className="fine-print"
              style={{
                color: "var(--text-secondary)",
                marginBottom: 0
              }}
            >
              {label}
            </p>

            <p style={{ fontSize: "var(--type-base)", fontWeight: "var(--weight-regular)" }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
    </GalleryGrid>
  );
}
