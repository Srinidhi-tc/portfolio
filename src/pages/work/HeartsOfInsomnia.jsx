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

const s = { fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#86868B", marginBottom: 6 };
const c = { fontSize: 16, color: "#6E6E73", lineHeight: 1.6, maxWidth: 640 };

function Block({ src, subheading, caption }) {
  return (
    <div>
      {src && <img src={src} alt={subheading} style={{ width: "100%", borderRadius: 12, display: "block", marginBottom: 16 }} />}
      <p style={s}>{subheading}</p>
      <p style={c}>{caption}</p>
    </div>
  );
}

export default function HeartsOfInsomnia() {
  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif", color: "#1D1D1F", padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "#86868B", marginBottom: 12 }}>
        Physical Computing · Emotional Design
      </p>
      <h1 style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.05, marginBottom: 16 }}>
        Hearts of Insomnia
      </h1>
      <p style={{ fontSize: 19, color: "#6E6E73", marginBottom: 16, maxWidth: 600 }}>
        CHI 2026 — Arduino · 3D Fabrication
      </p>
      <p style={{ fontSize: 16, color: "#6E6E73", marginBottom: 64, maxWidth: 600, lineHeight: 1.6 }}>
        A nightlamp that solves insomnia and late-night panic by using light therapy — making invisible anxiety visible and understandable through light, sound, and interaction.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, maxWidth: 480, marginBottom: 80 }}>
        {[
          { value: "Arduino",    label: "physical computing" },
          { value: "CHI 2026",   label: "submitted research" },
          { value: "Light + Sound", label: "multi-sensory UX" },
        ].map(({ value, label }) => (
          <div key={label} style={{ background: "#F5F5F7", borderRadius: 10, padding: "14px 16px" }}>
            <span style={{ display: "block", fontSize: 20, fontWeight: 600, color: "#1D1D1F", marginBottom: 2 }}>{value}</span>
            <span style={{ fontSize: 12, color: "#86868B" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>

        <Block
          src={heart1}
          subheading="Final Product Visualization"
          caption="We transformed a prototype into a product concept that represents comfort during stressful moments. The heart responds to panic and calm states as a bedside companion — designed to help users feel seen, heard, and comforted through light and sound."
        />

        <Block
          src={null}
          subheading="Problem Statement"
          caption="We wanted to make invisible anxiety during insomnia visible and understandable. We explored how racing thoughts and elevated heart rates feel when someone struggles to fall asleep — then designed a heart-based artifact that shows the emotional journey from panic to calm through light, sound, and interaction."
        />

        <Block
          src={heart3}
          subheading="Design Thinking Process"
          caption="We needed to understand how technology could translate personal sleep experiences into meaningful interactions. We researched heart-rate sensors, LEDs, speakers, and interactive devices — narrowing from multiple sensors into a focused system using heart-rate input, lighting, and audio feedback."
        />

        <Block
          src={heart4}
          subheading="Research and Exploration"
          caption="We placed the heart at the center because it represents the physical feeling of anxiety during sleepless nights. Early sketches combined a heart model, LED blood flow visualization, sensors, and sound — refined by removing unnecessary interactions and focusing on emotional connection."
        />

        <Block
          src={heart5}
          subheading="Hardware Exploration"
          caption="We wanted users to see the connection between their body and the digital experience. We tested Arduino components, pulse sensors, LEDs, and audio systems to build real-time feedback — connecting physiological input with visual storytelling instead of only displaying numbers."
        />

        <Block
          src={heart6}
          subheading="Arduino Integration"
          caption="We needed a reliable bridge between the user's heartbeat and the physical artifact. We used an Arduino board with a pulse sensor to capture heart-rate changes — developing LED behaviors that transform biological data into expressive visual states."
        />

        <Block
          src={heart7}
          subheading="Sensor Testing"
          caption="We wanted the interaction to feel personal while remaining simple for users. We tested different ways to capture heart-rate input and improve connection between the person and the heart. Sensor accuracy needed improvement, but the interaction successfully created curiosity and engagement."
        />

        <Block
          src={heart8}
          subheading="3D Modeling the Heart"
          caption="We chose a physical heart instead of a digital screen to create an emotional and human connection. We modelled an anatomical heart in Blender and designed internal space for electronics — optimising shape, thickness, and structure to balance realism, printing limits, and light diffusion."
        />

        <Block
          src={heart9}
          subheading="Prototype Assembly"
          caption="We needed the physical form to support both function and emotional storytelling. We built the pedestal to securely hold the heart while hiding wires and electronics — adjusting materials, dimensions, and internal structures through multiple fabrication tests."
        />

        <Block
          src={heart10}
          subheading="Lighting Exploration and Audio Interaction"
          caption="We used light as a language to communicate emotional states without overwhelming users with data. Red and blue flashes represent panic — soft rainbow transitions represent calm. Audio moved from Arduino speakers to a p5.js system after testing showed better control and quality."
        />

        <Block
          src={heart11}
          subheading="Iteration and Debugging"
          caption="We learned that meaningful experiences require constant refinement between technology and design. We solved challenges with audio communication, sensor reliability, and prototype dimensions — improving the model by simplifying structures and prioritising user experience."
        />

        <Block
          src={null}
          subheading="Public Interaction Concept"
          caption="We explored how a small tangible object could create emotional support beyond the bedroom. We transformed the heart into a handheld keychain concept for personal reflection — showing how users could carry a reminder that anxiety can change and settle."
        />

      </div>

      <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.10)", paddingTop: 40, marginTop: 80, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }}>
        {[
          { label: "Type",  value: "Physical Computing · UX Research" },
          { label: "Tools", value: "Arduino · Blender · p5.js · 3D Printing" },
          { label: "Focus", value: "Emotional Design · Bio-feedback · Prototyping" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p style={{ fontSize: 11, color: "#86868B", marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 14, fontWeight: 500 }}>{value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
