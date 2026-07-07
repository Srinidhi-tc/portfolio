import selfclean from "../../assets/Experience Details Selfclean System.png";
import cmf from "../../assets/CMF.png";
import architecture from "../../assets/Internal Architecture.png";
import mechanical from "../../assets/Mechanical Thinking.png";
import modular from "../../assets/Modular thinking.png";
import mfg2 from "../../assets/Manufacturing Considerations 2.png";
import mfg1 from "../../assets/Manufacturing Considerations 1.png";
import chargingWall from "../../assets/Charging dock iterations Wall Model.png";
import chargingFloor from "../../assets/Charging Dock floor Model.png";
import journey from "../../assets/Process Exporation with User Journey.png";
import early from "../../assets/Early Concept Exploration.png";
import usergroup from "../../assets/Usergroup.png";
import form from "../../assets/Form Exploration.png";

const s = { fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#86868B", marginBottom: 6 };
const c = { fontSize: 16, color: "#6E6E73", lineHeight: 1.6, maxWidth: 640 };

function Block({ src, subheading, caption }) {
  return (
    <div>
      <img src={src} alt={subheading} style={{ width: "100%", borderRadius: 12, display: "block", marginBottom: 16 }} />
      <p style={s}>{subheading}</p>
      <p style={c}>{caption}</p>
    </div>
  );
}

function SideBySide({ left, right }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <img src={left.src} alt={left.subheading} style={{ width: "100%", borderRadius: 12, display: "block", marginBottom: 16 }} />
        <p style={s}>{left.subheading}</p>
        <p style={c}>{left.caption}</p>
      </div>
      <div>
        <img src={right.src} alt={right.subheading} style={{ width: "100%", borderRadius: 12, display: "block", marginBottom: 16 }} />
        <p style={s}>{right.subheading}</p>
        <p style={c}>{right.caption}</p>
      </div>
    </div>
  );
}

export default function Malli() {
  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif", color: "#1D1D1F", padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "#86868B", marginBottom: 12 }}>
        Product Design · Human Robot Interaction
      </p>
      <h1 style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.05, marginBottom: 16 }}>
        Malli 2.0
      </h1>
      <p style={{ fontSize: 19, color: "#6E6E73", marginBottom: 16, maxWidth: 600 }}>
        Toilet Cleaning Device
      </p>
      <p style={{ fontSize: 16, color: "#6E6E73", marginBottom: 64, maxWidth: 600, lineHeight: 1.6 }}>
        Analyzing the challenge of cleaning ritual as a chore and making it happen without thinking for increasing accessibility to a clean toilet.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, maxWidth: 480, marginBottom: 80 }}>
        {[
          { value: "2.0",          label: "Shipped June 2026" },
          { value: "Self-clean",   label: "core feature" },
          { value: "Replaceable",  label: "brush system" },
        ].map(({ value, label }) => (
          <div key={label} style={{ background: "#F5F5F7", borderRadius: 10, padding: "14px 16px" }}>
            <span style={{ display: "block", fontSize: 22, fontWeight: 600, color: "#1D1D1F", marginBottom: 2 }}>{value}</span>
            <span style={{ fontSize: 12, color: "#86868B" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
        <Block src={selfclean} subheading="Experience Details and Outcomes" caption="One system. One seamless experience. A self-cleaning robotic toilet cleaner. The final prototype brings together product design, mechanical packaging, user experience, and manufacturability into a single cohesive system." />
        <Block src={cmf} subheading="CMF Exploration" caption="Material and finish were used to communicate cleanliness — soft matte surfaces where users interact, durable gloss where hygiene matters most." />
        <Block src={architecture} subheading="Internal Architecture" caption="Once the exterior felt right, I designed around the inside — finding space for motors, spray paths, sensors, and removable modules without increasing the footprint." />
        <Block src={mechanical} subheading="Manufacturing" caption="Every part designed with assembly in mind." />
        <Block src={modular} subheading="Modular System" caption="The brush system became modular so different cleaning tasks could be solved without redesigning the entire product. The replaceable brushes create repeatable small scale revenue." />
        <Block src={mfg2} subheading="Manufacturing Details" caption="Every split line and wall thickness was considered with cost effective assembly in mind." />
        <Block src={mfg1} subheading="Cost Estimation" caption="I also explored how the product could realistically be cost estimated rather than existing only as a concept render." />
        <SideBySide
          left={{  src: chargingWall,  subheading: "Charging Dock — Wall Model",  caption: "A few choices for charging dock." }}
          right={{ src: chargingFloor, subheading: "Charging Dock — Floor Model", caption: "Alternative floor-mounted charging configuration." }}
        />
        <Block src={journey} subheading="Experience Through Journey Mapping" caption="Designed around existing habits, not new ones. That question led me to rethink the entire experience instead of redesigning another toilet brush." />
        <SideBySide
          left={{  src: early,     subheading: "Challenge — Early Concept Exploration", caption: "Rethinking a maintenance routine. Before thinking about technology, I explored how the product should fit naturally into existing bathrooms without changing user behavior." }}
          right={{ src: usergroup, subheading: "User Group",                             caption: "Rethinking a maintenance routine." }}
        />
        <Block src={form} subheading="Form Exploration" caption="I iterated through dozens of proportions and layouts to balance comfort, stability, and visual simplicity." />
      </div>

      <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.10)", paddingTop: 40, marginTop: 80, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }}>
        {[
          { label: "Type",  value: "Product Design" },
          { label: "Tools", value: "SolidWorks · Keyshot · Figma" },
          { label: "Focus", value: "Behavioral Design · CMF · DFM" },
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
