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
  margin: 0,
};

const title = {
  fontSize: "clamp(24px, 6vw, 34px)",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1.12,
  color: "var(--text)",
  margin: "0 0 14px",
};

function Block({ src, subheading, caption, alt }) {
  return (
    <section>
      {src && (
        <img
          src={src}
          alt={alt || subheading}
          style={{
            width: "100%",
            borderRadius: 12,
            display: "block",
            marginBottom: 20,
          }}
        />
      )}
      <p style={eyebrow}>{subheading}</p>
      <p style={body}>{caption}</p>
    </section>
  );
}

function ImpactBox() {
  return (
    <section
      style={{
        background: "var(--surface-2)",
        borderRadius: 16,
        padding: "24px 24px 26px",
      }}
    >
      <p style={{ ...eyebrow, marginBottom: 10 }}>Role & Impact</p>
      <h2 style={{ ...title, fontSize: "clamp(22px, 5.5vw, 30px)", marginBottom: 14 }}>
        The physical experience depended on both form and system.
      </h2>
      <p style={body}>
        3D modeling shaped the anatomical heart and its internal structure.
        Bambu Lab tools supported fabrication and iteration. Coding issues
        during hardware integration were resolved, and the paper documentation
        for CHI 2026 was written as part of the project submission.
      </p>

      {PROJECT_DOC_URL && (
        <a
          href={PROJECT_DOC_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 18,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          Project documentation ↗
        </a>
      )}
    </section>
  );
}

const PROJECT_DOC_URL = "";

export default function HeartsOfInsomnia() {
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
      <header style={{ marginBottom: 72 }}>
        <p className="fine-print fine-print--eyebrow" style={{ marginBottom: 12 }}>
          Physical Computing · Emotional Design
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
          Hearts of Insomnia
        </h1>

        <p
          style={{
            fontSize: 19,
            color: "var(--muted)",
            marginBottom: 16,
            maxWidth: 600,
          }}
        >
          CHI 2026 — Interactive Demo
        </p>

        <p
          style={{
            fontSize: 18,
            color: "var(--muted)",
            marginBottom: 32,
            maxWidth: 640,
            lineHeight: 1.55,
          }}
        >
          What if a bedside lamp could notice when the body starts to change,
          without turning the moment into another notification?
        </p>

        <ImpactBox />
      </header>

      <main style={{ display: "flex", flexDirection: "column", gap: 88 }}>
        <Block
          src={heart1}
          subheading="The Starting Point"
          caption="Racing thoughts, a fast heartbeat, and the strange quiet of being awake at night became the starting point. The concept focused on a bedside object that could make a physical change easier to notice without requiring a phone screen."
        />

        <Block
          src={null}
          subheading="Why a Heart"
          caption="A heart-rate number tells a person what happened. A physical heart can show that change as an experience. The anatomical form became both the object and the visual language, connecting something measurable to something immediately familiar."
        />

        <Block
          src={heart3}
          subheading="The First Direction"
          caption="Early concepts combined an anatomical heart, light, sensors, and sound. Extra interactions were removed as the direction became clearer: heart-rate input, ambient light, and audio were enough to carry the experience."
        />

        <Block
          src={heart4}
          subheading="The Signal Had to Feel Natural"
          caption="The bedside setting changed the design. Most of the time, the object should behave like a lamp rather than a health dashboard. The response could stay in the environment until a meaningful heart-rate change occurred."
        />

        <Block
          src={heart5}
          subheading="The Prototype Got Messy"
          caption="Sensor readings were not always stable. Code, wiring, LEDs, and audio had to work together before the physical interaction could make sense. The unreliable signal became a design problem, not only a technical one."
        />

        <Block
          src={heart6}
          subheading="A Noisy Input Changes the Experience"
          caption="A dramatic light response only works when the input can be trusted. Unstable readings raised a difficult question: should every fluctuation trigger an obvious reaction? The interaction was kept expressive without treating every reading as an alarm."
        />

        <Block
          src={heart7}
          subheading="The Form Had to Hold the System"
          caption="The heart looked simple from the outside. Inside, it had to make room for electronics while preserving an anatomical shape and allowing light to travel through the material. Size, wall thickness, internal structure, and print behavior kept changing together."
        />

        <Block
          src={heart8}
          subheading="The Print Became Part of the Design"
          caption="Fabrication exposed details that were easy to miss on screen. A visible seam appeared between printed sections and became difficult to hide. The heart and pedestal were adjusted through repeated physical tests instead of treating the first print as final."
        />

        <Block
          src={heart9}
          subheading="The Pedestal Changed Too"
          caption="The pedestal started as a structural support, then became part of the visual composition. Slants, bevels, dimensions, and internal space were adjusted to keep the heart stable while hiding wires and electronics."
        />

        <Block
          src={heart10}
          subheading="Light Became the Language"
          caption="Five ambient light phases carried the main interaction. A normal state stayed close to an ordinary lamp. Changes in heart-rate input could move the heart into more noticeable states, while the return toward a calmer state was shown through softer transitions."
        />

        <Block
          src={heart11}
          subheading="Sound Needed More Control"
          caption="Audio started inside the hardware setup. Testing exposed limits in control and quality, so the audio interaction moved into a separate interactive layer. Separating the sound layer from the physical input made the final experience easier to tune."
        />

        <Block
          src={null}
          subheading="Privacy Changed the Interaction"
          caption="A heart-rate number does not always need to be visible. A bedside object can communicate that something changed without displaying a personal measurement to everyone nearby. The signal became ambient: noticeable when useful, quiet when not."
        />

        <Block
          src={heart12}
          subheading="The Idea Left the Nightstand"
          caption="A smaller heart was also explored as a handheld keychain. The form made the interaction portable and opened possibilities beyond the bedside setting. This direction remained an exploration rather than a final product path."
        />

        <section
          style={{
            borderTop: "0.5px solid var(--hairline-weak)",
            paddingTop: 48,
          }}
        >
          <p style={eyebrow}>Pilot & Outcome</p>
          <h2 style={title}>Five people tested the concept.</h2>
          <p style={body}>
            The pilot produced a positive response and supported the core idea
            of using a physical object to make heart-rate changes easier to
            perceive. The prototype also surfaced open questions around sensor
            reliability, privacy, and how much information an ambient object
            should communicate.
          </p>
        </section>

        <section
          style={{
            background: "var(--surface-2)",
            borderRadius: 16,
            padding: "28px 24px",
          }}
        >
          <p style={{ ...eyebrow, marginBottom: 10 }}>Final Interaction</p>
          <h2 style={title}>Body → signal → light → awareness.</h2>
          <p style={body}>
            The final concept turns heart-rate input into an ambient physical
            response designed to help a person notice a change and observe the
            transition back toward a calmer state. It does not diagnose a
            condition or replace clinical monitoring.
          </p>
        </section>

        <section
          style={{
            borderTop: "0.5px solid var(--hairline-weak)",
            paddingTop: 40,
            marginTop: 8,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 28,
            }}
          >
            <div>
              <p className="fine-print" style={{ color: "var(--color-text-tertiary)", marginBottom: 4 }}>
                Team
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
                Srinidhi Chakravarthy · Bri Baehl
              </p>
            </div>

            <div>
              <p className="fine-print" style={{ color: "var(--color-text-tertiary)", marginBottom: 4 }}>
                Tools
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
                Arduino · Blender · p5.js · 3D Printing
              </p>
            </div>

            <div>
              <p className="fine-print" style={{ color: "var(--color-text-tertiary)", marginBottom: 4 }}>
                Project
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
                Physical Computing · UX Research
              </p>
            </div>

            <div>
              <p className="fine-print" style={{ color: "var(--color-text-tertiary)", marginBottom: 4 }}>
                Submission
              </p>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
                CHI 2026 Interactive Demo
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
