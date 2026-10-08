import Kicker from "../../components/ui/Kicker";
import AnnotationTag from "../../components/ui/AnnotationTag";
import ChapterToggle from "../../components/ui/ChapterToggle";
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
    {number && <Kicker style={{ marginBottom: 10 }}>{number}</Kicker>}
    <h2 style={{
      fontSize: "clamp(29px,6vw,43px)", lineHeight: 1.07,
      letterSpacing: "-0.65px", margin: "0 0 13px", fontWeight: 650
    }}>{title}</h2>
    <p style={{ ...copy, margin: 0 }}>{description}</p>
  </div>;
}

function MarketOpportunity() {
  const nodes = [
    { tag: "2025", value: "$287M", detail: "Toilet-cleaning robot category, global market size." },
    { tag: "2025 → 2033", value: "18.6%", detail: "CAGR carrying the category to its 2033 size." },
    { tag: "2033 (projected)", value: "$1.12B", detail: "Projected global market size." },
  ];

  return (
    <section style={{
      marginBottom: 72, padding: "28px 0 32px",
      borderBottom: "0.5px solid var(--hairline-weak)"
    }}>
      <p className="fine-print" style={{ ...label, margin: 0 }}>MARKET OPPORTUNITY</p>
      <h2 style={{
        fontSize: "clamp(22px,4vw,30px)", lineHeight: 1.12,
        letterSpacing: "-.35px", margin: "8px 0 24px", fontWeight: 650
      }}>
        A category growing fast enough to design a pricing lever into.
      </h2>

      <div
        className="malli-market-flow"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 0,
          alignItems: "stretch",
          marginBottom: 20,
        }}
      >
        {nodes.map((n, i) => (
          <div key={n.tag} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              background: "var(--surface-2)", borderRadius: 14,
              padding: "18px 20px", width: "100%",
            }}>
              <p style={{ fontSize: 11, fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-tertiary)", margin: "0 0 8px" }}>
                {n.tag}
              </p>
              <p style={{ fontSize: "clamp(24px,4vw,30px)", fontWeight: 700, letterSpacing: "-0.4px", margin: "0 0 6px", color: "var(--text)" }}>
                {n.value}
              </p>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.45, margin: 0 }}>
                {n.detail}
              </p>
            </div>
            {i < nodes.length - 1 && (
              <div aria-hidden="true" style={{
                flexShrink: 0, width: 28, textAlign: "center",
                color: "var(--color-text-tertiary)", fontSize: 18,
              }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        background: "color-mix(in srgb, var(--accent) 6%, transparent)",
        border: "1px solid var(--hairline-weak)",
        borderRadius: 14, padding: "18px 20px", marginBottom: 16,
      }}>
        <p style={{ fontSize: 11, fontWeight: 650, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-tertiary)", margin: "0 0 6px" }}>
          Connected to the market size above
        </p>
        <p style={{ fontSize: 16, fontWeight: 650, color: "var(--text)", margin: "0 0 4px" }}>
          Connected, smart-home units: +34% average selling price over standalone devices.
        </p>
        <div style={{ margin: "10px 0 2px" }}>
          <AnnotationTag tone="burgundy" rotate={1.5}>Pricing lever</AnnotationTag>
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, margin: 0 }}>
          The premium that app-connected architecture is positioned to capture inside the category above.
        </p>
      </div>

      <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", lineHeight: 1.6, margin: 0 }}>
        References: {" "}
        <a href="https://datahorizzonresearch.com/toilet-cleaning-robot-market-23579" target="_blank" rel="noopener noreferrer" style={{ color: "var(--link)" }}>
          DataHorizzon Research · Toilet Cleaning Robot Market
        </a>
        {" "}· {" "}
        <a href="https://futurefive.com.au/story/how-smart-cleaning-devices-became-a-serious-retail-category" target="_blank" rel="noopener noreferrer" style={{ color: "var(--link)" }}>
          FutureFive Australia · How Smart Cleaning Devices Became a Serious Retail Category
        </a>
      </p>
    </section>
  );
}

function RoleAtTop() {
  const details = [
    ["Role", "Product Designer"],
    ["Context", "Malli 2.0 · Product Design · Human–Robot Interaction"],
    ["Ownership", "Solo project"],
    ["Focus", "Product architecture · Mechanical design · UX · CMF · DFM"],
    ["Tools", "SolidWorks · Blender · Keyshot"]
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
        <p style={{ ...copy, margin: "0 0 24px" }}>
          End-to-end development of the Malli 2.0 concept, from understanding the
          cleaning routine and exploring product form to developing internal
          architecture, modular brushes, charging configurations, CMF,
          manufacturing considerations, and cost estimation.
        </p>
        <div style={{ background: "var(--card)", border: "1px solid var(--hairline-weak)", borderRadius: 12, padding: "20px 22px" }}>
          <p className="fine-print" style={{ ...label, fontSize: 11, marginBottom: 8 }}>Business Impact</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", lineHeight: 1.55, margin: 0 }}>
            I designed Malli's modular, app-connected architecture specifically to capture that connected-device premium, treating smart-home integration as a pricing lever, not just a feature.
          </p>
        </div>
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
      <p style={{ ...copy, margin: 0 }}>
        The toilet-cleaning robot category is valued at $287M (2025), projected to reach $1.12B by 2033 at an 18.6% CAGR, with connected/smart-home units commanding a 34% price premium over standalone devices. I designed Malli's modular, app-connected architecture to capture that premium.
      </p>
    </header>

    <MarketOpportunity />

    <RoleAtTop />

    <InsightStrip />

    <div style={{ display: "flex", flexDirection: "column", gap: 108 }}>
      <section id="problem" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="Starting with the routine"
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
        <Heading number="Exploring the product"
          title="The form had to feel effortless."
          description="The form needed to feel appropriate in a bathroom before the technology became visible." />
        <Block src={form} subheading="Form exploration"
          caption="Dozens of proportions and layouts were explored to balance comfort, stability, and visual simplicity." />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="Designing the system"
          title="The outside depended on the inside."
          description="The exterior could not be solved separately from the mechanisms that made the cleaning experience possible." />
        <Block src={architecture} subheading="Internal architecture"
          caption="Motors, spray paths, sensors, and removable modules had to fit within the product without increasing its footprint." />
        <SystemCard />
      </section>

      <section id="decision" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="Making cleaning modular"
          title="One cleaner needed multiple ways to clean."
          description="The cleaning mechanism became a system rather than a single fixed brush." />
        <Block src={modular} subheading="Modular brush system"
          caption="A modular brush architecture allowed different cleaning tasks to use interchangeable components rather than requiring a new product for every task." />
        <Block src={selfclean} subheading="Self-cleaning experience"
          caption="The final prototype brought the self-cleaning mechanism, product form, mechanical packaging, and user experience together as one system." />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="Making it manufacturable"
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

      <section id="tradeoff" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="Making cleanliness visible"
          title="Cleanliness had to feel visible."
          description="Material and finish became part of how the product communicates its purpose." />
        <Block src={cmf} subheading="CMF exploration"
          caption="Matte surfaces were explored where users interact with the product, while gloss was used where durability and the perception of hygiene mattered." />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="Solving where it lives"
          title="The bathroom could not spare floor space."
          description="Charging had to work with the spatial constraints of a bathroom." />
        <Block src={chargingWall} subheading="Wall-mounted charging dock"
          caption="A wall-mounted charging configuration moved the dock off the floor and explored a more spatially efficient bathroom setup." />
        <SideBySide
          left={{ src: battery, subheading: "Battery supported",
            caption: "An alternative floor-mounted charging configuration explored another way to place the system in the bathroom." }}
          right={{ src: chargingFloor, subheading: "Charging dock · floor model",
            caption: "The floor configuration treated charging as part of the product's physical footprint rather than an afterthought." }}
        />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Heading number="Bringing it together"
          title="The final system works as one."
          description="The final direction connects the experience, mechanism, modular cleaning system, and physical product into one cohesive prototype." />
        <Block src={selfclean} subheading="Experience details and outcomes"
          caption="The final prototype brings together product design, mechanical packaging, user experience, and manufacturability into a single cohesive system." />
        <OutcomeGrid />
      </section>
    </div>

    <section id="impact" style={{
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

    <ChapterToggle />
  </div>;
}
