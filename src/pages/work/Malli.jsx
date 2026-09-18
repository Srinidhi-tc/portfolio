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
import battery from "../../assets/battery.png";

const label = {
  fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
  textTransform: "uppercase", color: "var(--color-text-tertiary)", marginBottom: 7
};
const copy = { fontSize: 16, color: "var(--muted)", lineHeight: 1.6, maxWidth: 650 };
const img = { width: "100%", borderRadius: 16, display: "block" };

function Block({ src, subheading, caption }) {
  return <div>
    <img src={src} alt={subheading} style={{ ...img, marginBottom: 16 }} />
    <p style={{ ...label, marginBottom: 6 }}>{subheading}</p>
    <p style={{ ...copy, margin: 0 }}>{caption}</p>
  </div>;
}

function SideBySide({ left, right }) {
  return <div style={{
    display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 24
  }}>
    {[left, right].map((x) => <div key={x.subheading}>
      <img src={x.src} alt={x.subheading} style={{ ...img, marginBottom: 16 }} />
      <p style={{ ...label, marginBottom: 6 }}>{x.subheading}</p>
      <p style={{ ...copy, margin: 0 }}>{x.caption}</p>
    </div>)}
  </div>;
}

function Heading({ number, title, description }) {
  return <div style={{ maxWidth: 720 }}>
    <p className="fine-print" style={{ ...label, marginBottom: 10 }}>{number}</p>
    <h2 style={{
      fontSize: "clamp(29px,6vw,43px)", lineHeight: 1.07,
      letterSpacing: "-0.65px", margin: "0 0 13px", fontWeight: 650
    }}>{title}</h2>
    <p style={{ ...copy, margin: 0 }}>{description}</p>
  </div>;
}

function RoleAtTop() {
  const details = [
    ["Role", "Product Designer"],
    ["Context", "Malli 2.0 · Product Design · Human–Robot Interaction"],
    ["Ownership", "Solo project"],
    ["Focus", "Product architecture · Mechanical design · UX · CMF · DFM"]
  ];
  return <section style={{
    marginBottom: 88, padding: "28px 0 32px",
    borderTop: "0.5px solid var(--hairline-weak)",
    borderBottom: "0.5px solid var(--hairline-weak)"
  }}>
    <div style={{
      display: "grid", gridTemplateColumns: "minmax(180px,.7fr) minmax(0,1.8fr)",
      gap: 40, alignItems: "start"
    }}>
      <div>
        <p className="fine-print" style={{ ...label, margin: 0 }}>MY ROLE</p>
        <h2 style={{
          fontSize: "clamp(22px,4vw,30px)", lineHeight: 1.12,
          letterSpacing: "-.35px", margin: "8px 0 0", fontWeight: 650
        }}>End-to-end product design</h2>
      </div>
      <div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: "24px 32px", marginBottom: 28
        }}>
          {details.map(([k,v]) => <div key={k}>
            <p className="fine-print" style={{ ...label, fontSize: 11, marginBottom: 5 }}>{k}</p>
            <p style={{ fontSize: 15, lineHeight: 1.45, margin: 0 }}>{v}</p>
          </div>)}
        </div>
        <p style={{ ...copy, margin: 0 }}>
          End-to-end development of the Malli 2.0 concept, from understanding the
          cleaning routine and exploring product form to developing internal
          architecture, modular brushes, charging configurations, CMF,
          manufacturing considerations, and cost estimation.
        </p>
      </div>
    </div>
  </section>;
}

function InsightStrip() {
  const items = [
    ["01", "Start with the routine", "Understand where cleaning already fits."],
    ["02", "Design the system", "Make form, mechanics, and behavior work together."],
    ["03", "Make it real", "Carry the concept into manufacturing and placement."]
  ];
  return <div style={{
    display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))",
    gap: 12, marginBottom: 96
  }}>
    {items.map(([n,t,d]) => <div key={n} style={{
      background: "var(--surface-2)", borderRadius: 14, padding: "18px 18px 20px"
    }}>
      <p className="fine-print" style={{ ...label, fontSize: 11, marginBottom: 10 }}>{n}</p>
      <p style={{ fontSize: 17, fontWeight: 600, margin: "0 0 5px" }}>{t}</p>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--muted)", margin: 0 }}>{d}</p>
    </div>)}
  </div>;
}

function SystemCard() {
  return <div style={{
    marginTop: 24, padding: 24, borderRadius: 16, background: "var(--surface-2)"
  }}>
    <p className="fine-print" style={{ ...label, marginBottom: 8 }}>Internal system</p>
    <p style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-.3px", margin: "0 0 16px" }}>
      The architecture had to disappear inside the footprint.
    </p>
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10
    }}>
      {["Motors", "Spray paths", "Sensors", "Removable modules"].map(x =>
        <div key={x} style={{
          padding: "12px 14px", borderRadius: 10, background: "var(--surface-1)",
          fontSize: 13, lineHeight: 1.35
        }}>{x}</div>
      )}
    </div>
  </div>;
}

function OutcomeGrid() {
  const items = [
    ["Routine", "Designed around existing bathroom behavior."],
    ["Cleaning", "Self-cleaning system with replaceable brushes."],
    ["Placement", "Wall and floor charging configurations."],
    ["Production", "Manufacturing and cost considered alongside form."]
  ];
  return <div style={{
    display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12, marginTop: 24
  }}>
    {items.map(([a,b]) => <div key={a} style={{
      padding: 20, borderRadius: 14, background: "var(--surface-2)"
    }}>
      <p style={{ fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>{a}</p>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--muted)", margin: 0 }}>{b}</p>
    </div>)}
  </div>;
}

export default function Malli() {
  return <div style={{
    fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif",
    color: "var(--text)", padding: "80px 40px", maxWidth: 900, margin: "0 auto"
  }}>
    <header style={{ marginBottom: 72 }}>
      <p className="fine-print fine-print--eyebrow" style={{ ...label, marginBottom: 12 }}>
        Product Design · Human–Robot Interaction
      </p>
      <h1 style={{
        fontSize: "clamp(38px,11vw,60px)", fontWeight: 700,
        letterSpacing: "-1px", lineHeight: 1.02, margin: "0 0 14px"
      }}>Malli 2.0</h1>
      <p style={{
        fontSize: "clamp(21px,4vw,26px)", color: "var(--muted)",
        margin: "0 0 18px", maxWidth: 680, lineHeight: 1.25, letterSpacing: "-.25px"
      }}>
        A robotic toilet cleaner designed around an everyday routine.
      </p>
      <p style={{ ...copy, margin: 0 }}>
        Cleaning a toilet is a small maintenance task that repeats without much thought.
        Malli 2.0 turns that routine into a self-cleaning system, bringing together the
        cleaner, brush system, charging, internal mechanisms, and bathroom footprint as
        one product experience.
      </p>
    </header>

    <RoleAtTop />

    <InsightStrip />

    <div style={{ display: "flex", flexDirection: "column", gap: 108 }}>
      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="01 · START WITH THE ROUTINE"
          title="The routine became the product brief."
          description="Before the product could automate cleaning, the existing bathroom routine had to remain understandable and natural." />
        <Block src={journey} subheading="Experience through journey mapping"
          caption="Journey mapping shifted the focus from redesigning another toilet brush to understanding how cleaning already fits into the bathroom routine." />
        <SideBySide
          left={{ src: early, subheading: "Early concept exploration",
            caption: "Early concepts explored how automated cleaning could fit naturally into an existing bathroom without asking users to learn an entirely new behavior." }}
          right={{ src: usergroup, subheading: "User group",
            caption: "The product was framed around people who already manage toilet cleaning as part of regular bathroom maintenance." }}
        />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="02 · EXPLORE THE PRODUCT"
          title="The form had to feel effortless."
          description="The form needed to feel appropriate in a bathroom before the technology became visible." />
        <Block src={form} subheading="Form exploration"
          caption="Dozens of proportions and layouts were explored to balance comfort, stability, and visual simplicity." />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="03 · DESIGN THE SYSTEM"
          title="The outside depended on the inside."
          description="The exterior could not be solved separately from the mechanisms that made the cleaning experience possible." />
        <Block src={architecture} subheading="Internal architecture"
          caption="Motors, spray paths, sensors, and removable modules had to fit within the product without increasing its footprint." />
        <SystemCard />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="04 · MAKE CLEANING MODULAR"
          title="One cleaner needed multiple ways to clean."
          description="The cleaning mechanism became a system rather than a single fixed brush." />
        <Block src={modular} subheading="Modular brush system"
          caption="A modular brush architecture allowed different cleaning tasks to use interchangeable components rather than requiring a new product for every task." />
        <Block src={selfclean} subheading="Self-cleaning experience"
          caption="The final prototype brought the self-cleaning mechanism, product form, mechanical packaging, and user experience together as one system." />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="05 · MAKE IT MANUFACTURABLE"
          title="Every surface had an assembly consequence."
          description="The product had to hold together beyond the render, with assembly and production considered during design." />
        <Block src={mechanical} subheading="Mechanical thinking"
          caption="Mechanical decisions were considered alongside assembly so the product could move beyond a surface-level concept." />
        <SideBySide
          left={{ src: mfg2, subheading: "Manufacturing details",
            caption: "Split lines and wall thicknesses were considered with cost-effective assembly in mind." }}
          right={{ src: mfg1, subheading: "Cost estimation",
            caption: "Cost estimation was explored alongside the product design so the concept could be considered as a manufacturable system rather than only a render." }}
        />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="06 · MAKE CLEANLINESS VISIBLE"
          title="Cleanliness had to feel visible."
          description="Material and finish became part of how the product communicates its purpose." />
        <Block src={cmf} subheading="CMF exploration"
          caption="Matte surfaces were explored where users interact with the product, while gloss was used where durability and the perception of hygiene mattered." />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="07 · SOLVE WHERE IT LIVES"
          title="The bathroom could not spare floor space."
          description="Charging had to work with the spatial constraints of a bathroom." />
        <Block src={chargingWall} subheading="Wall-mounted charging dock"
          caption="A wall-mounted charging configuration moved the dock off the floor and explored a more spatially efficient bathroom setup." />
        <SideBySide
          left={{ src: battery, subheading: "Battery supported",
            caption: "An alternative floor-mounted charging configuration explored another way to place the system in the bathroom." }}
          right={{ src: chargingFloor, subheading: "Charging dock — floor model",
            caption: "The floor configuration treated charging as part of the product's physical footprint rather than an afterthought." }}
        />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="08 · BRING IT TOGETHER"
          title="The final system works as one."
          description="The final direction connects the experience, mechanism, modular cleaning system, and physical product into one cohesive prototype." />
        <Block src={selfclean} subheading="Experience details and outcomes"
          caption="The final prototype brings together product design, mechanical packaging, user experience, and manufacturability into a single cohesive system." />
        <OutcomeGrid />
      </section>
    </div>

    <section style={{
      marginTop: 112, paddingTop: 12, borderTop: "0.5px solid var(--hairline-weak)"
    }}>
      <p className="fine-print" style={{ ...label, marginBottom: 10 }}>DESIGN TAKEAWAY</p>
      <h2 style={{
        fontSize: "clamp(30px,7vw,44px)", lineHeight: 1.06, letterSpacing: "-.7px",
        maxWidth: 720, margin: "0 0 16px", fontWeight: 650
      }}>The automation had to disappear into the routine.</h2>
      <p style={{ ...copy, fontSize: 17, maxWidth: 700, margin: 0 }}>
        Malli 2.0 became less about adding technology to a toilet and more about
        coordinating behavior, form, mechanics, charging, and manufacturing into
        one product experience.
      </p>
    </section>

    <div className="meta-grid" style={{
      borderTop: "0.5px solid var(--hairline-weak)", paddingTop: 40, marginTop: 72
    }}>
      {[
        ["Type", " Hardware Product Design & Human Robot Interaction"],
        ["Tools", "SolidWorks (CAD/fusion360) · KeyShot · Figma · Rapid Protoyping "],
        ["Focus", "Behavioral Design · CMF · DFM"]
      ].map(([k,v]) => <div key={k}>
        <p className="fine-print" style={{ color: "var(--color-text-tertiary)", marginBottom: 4 }}>{k}</p>
        <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>{v}</p>
      </div>)}
    </div>
  </div>;
}
