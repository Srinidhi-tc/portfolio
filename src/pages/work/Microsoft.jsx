// Microsoft.jsx ... Azure Health Models case study (final version)
//
// Images needed in src/assets/:
//   mic6.jpg, mic7.jpg, mic74.jpg, mic75.jpg, mic76.jpg, mic77.jpg, mic78.jpg  (project slides)
//   mic-team.jpg    (team presenting the design recommendation ... hero background)
//   mic-email.png   (Geoffrey Lentner research email ... blur his email address first)
//   mic-sketch.jpg  (interview note-taking sketches)
//   mic-call.jpg    (video call interview photo)
//   mic-wcag.svg    (WCAG trade-off slide)
//
// Before publishing: confirm the spelling of "Priyank Wilkins" and add Alyssa Berger's role.

import Kicker from "../../components/ui/Kicker";
import ChapterToggle from "../../components/ui/ChapterToggle";
import mic6      from "../../assets/mic6.jpg";
import mic7      from "../../assets/mic7.jpg";
import mic74     from "../../assets/mic74.jpg";
import mic75     from "../../assets/mic75.jpg";
import mic76     from "../../assets/mic76.jpg";
import mic77     from "../../assets/mic77.jpg";
import mic78     from "../../assets/mic78.jpg";
import micTeam   from "../../assets/mic-team.jpeg";
import micEmail  from "../../assets/mic-email.jpeg";
//import micSketch from "../../assets/mic-sketch.jpeg";
import micCall   from "../../assets/mic-call.jpeg";
import micWcag   from "../../assets/mic-wcag.svg";

const font = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif`;
const lbl  = { fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--color-text-tertiary)", margin:0 };
const bd   = { fontSize:16, lineHeight:1.65, color:"var(--muted)", margin:0, maxWidth:680 };
const card = { background:"var(--surface-2)", borderRadius:12, padding:"18px 20px" };

function Slide({ src, caption }) {
  return (
    <figure style={{ margin:"0 0 10px" }}>
      <img src={src} alt={caption || ""} loading="lazy"
           style={{ width:"100%", display:"block", borderRadius:14, background:"var(--surface-2)" }} />
      {caption && (
        <figcaption style={{ marginTop:8, fontSize:12, color:"var(--color-text-tertiary)", lineHeight:1.5 }}>{caption}</figcaption>
      )}
    </figure>
  );
}

function Insight({ children }) {
  return (
    <div style={{ margin:"28px 0", padding:"16px 0", borderTop:"1px solid var(--hairline-weak)", borderBottom:"1px solid var(--hairline-weak)" }}>
      <p style={{ margin:0, fontSize:16, fontWeight:600, color:"var(--text)", lineHeight:1.5 }}>{children}</p>
    </div>
  );
}

function Quote({ text, source }) {
  return (
    <div style={{ ...card, margin:"24px 0", borderLeft:"3px solid var(--link)", borderRadius:"0 12px 12px 0" }}>
      <p style={{ margin:"0 0 8px", fontSize:17, fontStyle:"italic", color:"var(--text)", lineHeight:1.55 }}>"{text}"</p>
      <p style={{ margin:0, fontSize:12, color:"var(--color-text-tertiary)", fontWeight:600 }}>{source}</p>
    </div>
  );
}

function Cards({ items, cols = 3 }) {
  return (
    <div className="mic-grid" style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:16, marginTop:24 }}>
      {items.map(([title, text]) => (
        <div key={title} style={card}>
          <p style={{ fontSize:13, fontWeight:600, color:"var(--text)", margin:"0 0 6px" }}>{title}</p>
          <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.6, margin:0 }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function StatRow({ stats }) {
  return (
    <div className="mic-grid" style={{ display:"grid", gridTemplateColumns:`repeat(${stats.length},1fr)`, gap:16, margin:"28px 0" }}>
      {stats.map(({ value, label }) => (
        <div key={label} style={card}>
          <span style={{ display:"block", fontSize:"clamp(22px,3vw,32px)", fontWeight:700, color:"var(--text)", marginBottom:4 }}>{value}</span>
          <span style={{ fontSize:12, color:"var(--color-text-tertiary)", lineHeight:1.4 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Section({ id, number, title, intro, children }) {
  return (
    <section id={id} style={{ marginBottom:96 }}>
      <div style={{ marginBottom:24, maxWidth:720 }}>
        {number && <Kicker style={{ marginBottom:10 }}>{number}</Kicker>}
        <h2 style={{ margin:"0 0 14px", fontSize:"clamp(26px,4vw,40px)", lineHeight:1.1, letterSpacing:"-0.5px", fontWeight:650, color:"var(--text)" }}>
          {title}
        </h2>
        {intro && <p style={bd}>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Microsoft() {
  return (
    <div style={{ fontFamily:font, color:"var(--text)", maxWidth:1000, margin:"0 auto", padding:"32px 28px 120px", WebkitFontSmoothing:"antialiased" }}>

      {/* HERO ... team presenting photo as background */}
      <header style={{
        marginBottom:56, borderRadius:20, overflow:"hidden",
        padding:"clamp(48px,8vw,96px) clamp(24px,5vw,56px)",
        backgroundImage:`linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%), url(${micTeam})`,
        backgroundSize:"cover", backgroundPosition:"center",
      }}>
        <p style={{ ...lbl, color:"rgba(255,255,255,0.7)", marginBottom:14 }}>
          Microsoft Azure · Industry Partner Project · Health Observability
        </p>
        <h1 style={{ fontSize:"clamp(44px,8vw,76px)", fontWeight:700, letterSpacing:"-1px", lineHeight:0.98, margin:"0 0 20px", color:"#fff" }}>
          Azure Health Models
        </h1>
        <p style={{ fontSize:17, lineHeight:1.65, color:"rgba(255,255,255,0.78)", margin:0, maxWidth:680 }}>
          Microsoft Azure is one of the world's largest enterprise cloud platforms, serving intelligent cloud infrastructure to organizations globally. I redesigned the entity editing flow, the screen where engineers set up and fix each part of their system, so engineers see where the problem is without searching for it.
        </p>
      </header>

      {/* TEAM + ROLE */}
      <section style={{ marginBottom:80, paddingBottom:40, borderBottom:"1px solid var(--hairline-weak)" }}>
        <div style={{ ...card, padding:"24px 28px", marginBottom:16 }}>
          <p style={{ ...lbl, fontSize:10, marginBottom:8 }}>My role</p>
          <p style={{ fontSize:17, color:"var(--text)", lineHeight:1.6, margin:0, maxWidth:720 }}>
            I own the entity editing flow and the AI Ops research. That includes SRE interviews, contextual inquiry,
            think-aloud testing, the radial health indicators, SLA phone alerts, and the Add New Signal button.
            Everything on this page is my contribution.
          </p>
        </div>
        <div style={{ background:"var(--card)", border:"1px solid var(--hairline-weak)", borderRadius:12, padding:"24px 28px", marginBottom:28 }}>
          <p style={{ ...lbl, fontSize:10, marginBottom:8 }}>Business Impact</p>
          <p style={{ fontSize:16, fontWeight:600, color:"var(--text)", lineHeight:1.6, margin:0, maxWidth:720 }}>
            I designed for decision speed specifically because engineering time is the most expensive resource on this team, every second an engineer spends parsing an unclear interface is a cost the business is already tracking.
          </p>
        </div>
        <div className="mic-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }}>
          <div>
            <p style={{ ...lbl, fontSize:10, marginBottom:8 }}>Industry partners</p>
            <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.7, margin:0 }}>
              Callum Collin<br />Martin Simecek<br /><span style={{ color:"var(--color-text-tertiary)" }}>Microsoft Azure</span>
            </p>
          </div>
          <div>
            <p style={{ ...lbl, fontSize:10, marginBottom:8 }}>Project leads</p>
            <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.7, margin:0 }}>
              Prof. Nancy Rasche<br />Prof. Shobhan Shah<br /><span style={{ color:"var(--color-text-tertiary)" }}>Purdue University</span>
            </p>
          </div>
          <div>
            <p style={{ ...lbl, fontSize:10, marginBottom:8 }}>Tools</p>
            <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.7, margin:0 }}>
              Figma · Azure Portal · WCAG 2.1 Audit
            </p>
          </div>
          <div>
            <p style={{ ...lbl, fontSize:10, marginBottom:8 }}>Purdue UX team</p>
            <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.7, margin:0 }}>
              <strong style={{ color:"var(--text)" }}>Sri Chakravarthy ( everything shown in case study here </strong> · Entity Visual Design, and AI Ops<br />
              Alyssa Berger · Accessibility <br />
              Natalie Falzone · Competitor Analysis<br />
              Norah Miller · Heuristics and Timestamps Visual<br />
              Priscilla Tam · Icons, and Hover States<br />
              Ashmi Roy · Health Status Graphs<br />
              Ani Berry · Drag and Select motion animation
            </p>
          </div>
        </div>
      </section>

      {/* 01 CONTEXT */}
      <Section
        number="The context"
        title="A live map of a company's cloud system."
        intro="Azure Health Models shows the health of a whole cloud system on one screen. Each box is an entity (one working part of the system, like one room in a house). Lines show how the parts depend on each other. Every box carries one of three health states."
      >
        <div className="mic-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <Slide src={mic6} caption="What is Azure Health Models. A platform to see the whole system's health at once. It works for small businesses and scales to large enterprises." />
          <Slide src={mic7} caption="Azure Monitor. Insights on errors and resolution speed, logs of collected data, a timeline of system health, and real-time alerts." />
        </div>
        <StatRow stats={[
          { value:"3",   label:"health states: Healthy, Degraded (running but struggling, like a car on a slow leak), Unhealthy" },
          { value:"SRE", label:"primary user: Site Reliability Engineers (the on-call firefighters of software)" },
          { value:"7",   label:"Purdue UX designers on the industry partner team" },
        ]} />
      </Section>

      {/* 02 USER RESEARCH */}
      <Section
        number="User research"
        title="Engineers already read radials. The interface does not show them."
        intro="I research with SREs at the Purdue Rosen Center for Advanced Computing (RCAC), a supercomputing centre that works with Azure at large scale. I use three methods with them, plus AI-assisted desk research."
      >
        <Cards items={[
          ["Contextual inquiry", "Structured interviews inside the engineers' own work setting. I watch how they handle real incidents with their real tools, not in a lab."],
          ["Think-aloud testing", "Engineers speak their thoughts out loud while using the existing Azure flowchart. I note every pause, every re-click, and every moment they rely on memory."],
          ["Concept validation", "I walk the engineers through every solution our team designs. They confirm or reject each claim against their daily work."],
        ]} />

        <div style={{ marginTop:28 }}>
          <Slide src={mic74} caption="Joel, an engineer, checks each entity and the signals inside it. He clicks every box, remembers each signal count and each threshold, and then decides what to fix first. All from memory." />
        </div>

        <Quote
          text="Radial icons are better than line graphs, any day. Lines are intimidating."
          source="Interviewee"
        />

        <Cards cols={2} items={[
          ["What the interviews show", "Engineers read radial indicators (circular progress rings, like a phone battery icon) in the other tools they use every day. They read them in a glance. Azure shows plain icons instead. The mismatch slows them down under pressure."],
          ["What the AI desk research shows", "I use Claude to research how SREs around the world use AI. Engineers increasingly pass monitoring data to AI tools to find issues faster. So the interface needs clean, clearly labelled status data that is easy to hand over."],
        ]} />

        <div className="mic-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:28 }}>
          <Slide src={micEmail}  caption="Research outreach with Geoffrey Lentner, Purdue RCAC." />
          {/*<Slide src={micSketch} caption="Interview notes. I sketch engineers' mental models while they talk." />*/}
          <Slide src={micCall}   caption="Remote interview session with SRE engineers." />
        </div>

        <Insight>The question is not "what do engineers want?" It is "what are they already used to reading?" The answer is radials.</Insight>
      </Section>

      {/* 03 PAIN POINTS */}
      <Section
        id="problem"
        number="Pain points"
        title="Two problems hiding in plain sight."
        intro="The entity editing flow has two problems. Each one slows an engineer down. Together, they make the screen hard to trust during an incident."
      >
        <Slide src={mic75} caption="Pain point 1. The signal panel opens, but nothing shows which entity is selected or what is being saved. An engineer editing many boxes loses track of context." />
        <div style={{ marginTop:20 }}>
          <Slide src={mic76} caption="Pain point 2. Plain icons on every box. A healthy box and a failing box look the same. Plain icons decrease immediate clarity." />
        </div>
        <StatRow stats={[
          { value:"0",      label:"health indicators on entity cards before the redesign" },
          { value:"1 by 1", label:"engineers open each entity to see its signal count" },
        ]} />
        <Insight>An engineer on an incident call cannot open every box one by one. The screen asks them to hold the whole system in their head.</Insight>
      </Section>

      {/* 04 THE DESIGN CHANGE */}
      <Section
        id="decision"
        number="The design change"
        title="One ring per box. One decision removed."
        intro="The change is small in pixels and big in effect. I add a radial indicator to every entity card. It shows how degraded that part is and how many issues it has, with no extra click."
      >
        <Slide src={mic77} caption="Iteration. Left: static cards and the double-click state, with plain icons and no health shown. Right: radial status display for root cause entities (the first domino that knocks the others over)." />
        <Cards items={[
          ["Ring fill = how degraded", "A fuller red ring means a more degraded part. An empty ring means no issues. Engineers read it in about a second, like a battery icon."],
          ["Number = how many issues", "The count (like 3/4) sits next to the ring. It shows how many issues that part has, without opening it."],
          ["Order = where to look first", "More rings and fuller rings mean higher priority. Parts line up in descending order of criticality, so the worst one stands out."],
        ]} />
        <Insight>The ring adds no new data. It brings data that already exists to the surface, instead of hiding it inside each box.</Insight>
      </Section>

      {/* 05 ACCESSIBILITY TRADE-OFF */}
      <Section
        id="tradeoff"
        number="The accessibility trade-off"
        title="Colour alone cannot carry health status."
        intro="I review the radials against WCAG 2.1 (the international accessibility guidelines). Azure's orange fails the contrast rule for graphics. Red and orange also blur together for colour-blind engineers. The ring fill and the number already work without colour, so I propose adding simple symbols on top."
      >
        <Slide src={micWcag} caption="Contrast ratios against white, a deuteranopia simulation (red-green colour blindness), and the proposal: status symbols plus the number plus a darker orange (#B35900)." />
        <Cards cols={2} items={[
          ["What we hand over", "Azure's existing colour palette, kept as is. The ring fill and the number carry meaning without colour, so the design works for colour-blind engineers today."],
          ["What we recommend", "Status symbols (✕ ! ✓) and a darker orange. Azure uses one palette across the whole portal, so this change goes to the design system team for review."],
        ]} />
        <Insight>Consistency now, accessibility on the roadmap. We stay inside Azure's design system and recommend the upgrade to the people who own it.</Insight>
      </Section>

      {/* FULL WIDTH SOLUTION SLIDE */}
      <div style={{ margin:"0 0 96px" }}>
        <Slide src={mic78} caption="The solution. Rings with issue counts (3/4, 4/4) on each entity card, and a clear button order for Add New, New Signal, and Save. Impact: engineers can tell parts apart and compare them at a glance." />
      </div>

      {/* 06 BUSINESS IMPACT */}
      <Section
        id="impact"
        number="The business impact"
        title="More signals monitored means more data ingested."
        intro="Azure Monitor's core features are free. Basic metrics, activity logs, alerts, summary rules, and dashboards cost nothing beyond the data they use. Revenue comes from log ingestion (the data the system takes in, like water through a meter) and retention (how long it keeps that data, like paying rent on storage)."
      >
        <StatRow stats={[
          { value:"$0.05/GB", label:"Auxiliary Logs ingestion (approx.)" },
          { value:"$0.50/GB", label:"Basic Logs ingestion (approx.)" },
          { value:"$2.30/GB", label:"Analytics Logs ingestion (approx.)" },
        ]} />
        <Cards cols={2} items={[
          ["Why the Add New Signal button matters", "Adding a signal (a sensor that watches one part, like a smoke detector in one room) used to be hidden. I make Add New Signal a primary button. Every new signal means more log data flows into Azure Monitor, and ingestion is where the platform earns."],
          ["Retention adds up", "Keeping data past the free period costs extra. About $0.10 per GB per month for analytics retention up to 2 years, or $0.02 per GB per month for long-term retention up to 12 years. Teams that monitor more, keep more."],
        ]} />
        <p style={{ fontSize:11, color:"var(--color-text-tertiary)", marginTop:14 }}>
          Source:{" "}
          <a href="https://azure.microsoft.com/en-us/pricing/details/monitor/" target="_blank" rel="noopener noreferrer" style={{ color:"var(--link)" }}>
            Azure Monitor pricing page
          </a>. Figures are approximate and change over time.
        </p>
      </Section>

      {/* 07 SLA PHONE ALERTS */}
      <Section
        number="SLA phone alerts"
        title="Engineers should not have to watch Slack all day."
        intro="An SLA (Service Level Agreement) is a promise of uptime, like a delivery company promising your package on time. I add an alert that goes straight to an engineer's personal phone when an SLA value drops past a set limit."
      >
        <Cards items={[
          ["Before", "Engineers watch Slack channels for health updates. One missed message can mean one missed incident."],
          ["The change", "The engineer sets a threshold (the line where the alarm rings, like a thermostat setting). When the SLA drops past it, their phone gets a notification."],
          ["Why it matters", "Engineers are on call, not always at a dashboard. A phone alert closes the gap between the system spotting a problem and a person acting on it."],
        ]} />
      </Section>

      {/* 08 OUTCOME + HANDOVER */}
      <Section
        number="Outcome and handover"
        title="Handed to engineering. Tested on real business data."
        intro="The project starts with contextual inquiry and concept validation, so we hand the design straight to the Azure software team. There is no separate usability testing phase."
      >
        <Cards items={[
          ["Compliance accepts it", "Microsoft's compliance team accepts all of our documentation."],
          ["Content review", "Priyank Wilkins from content writing reviews our documentation for the next design push."],
          ["Why Microsoft tests it", "Health monitoring changes with each customer's business data. Real production data, which only Microsoft can access, gives a truer test than a lab with fake data."],
        ]} />
        <Insight>No lab test can copy a real incident. Handing over for in-product testing is the right way to validate this system.</Insight>
      </Section>

      {/* 09 CHALLENGES */}
      <Section
        number="Challenges along the way"
        title="We lose our point of contact before we start."
        intro="Our first Microsoft contact leaves the company early in the project. We start weeks late with no one to onboard us. We use the gap instead of waiting."
      >
        <Cards items={[
          ["Learn the software", "We teach ourselves Azure Health Models and Azure Monitor hands-on: entities, signals, thresholds, and health states."],
          ["Learn the language", "Observability (seeing inside a system from the outside, like a doctor reading vital signs) has its own words. Speaking them well helps engineers trust us in interviews."],
          ["Map the market", "We run a competitor analysis of monitoring tools. It shows us what engineers already expect from the tools they use."],
        ]} />
        <Insight>A late start with no contact becomes our learning phase. When new partners join, we already speak their language.</Insight>
      </Section>

      {/* 10 REFLECTION */}
      <Section
        number="Looking back"
        title="Engineers are handing incidents to AI. The interface needs to be ready."
        intro="The biggest surprise from research: an RCAC engineer tells me their whole monitoring workflow now runs through Claude and AI. Engineers use AI to fix SLA issues faster and keep their service ratings high."
      >
        <Cards cols={2} items={[
          ["What this means for the design", "When the screen shows exactly where the issue is and how bad it is, the engineer can pass that to AI in seconds. The ring is for human eyes and it is also easy to hand to AI."],
          ["The privacy gap", "Engineers say they sometimes need help with the privacy of business data. They cannot always paste production data into an AI tool. A safe, built-in AI flow is the next design challenge."],
        ]} />
        <Insight>The ring is the smallest change on this page. The insight behind it, that engineers already solve issues with AI, points to where this product goes next.</Insight>
      </Section>

      <ChapterToggle />

      {/* FOOTER */}
      <div className="mic-grid" style={{ borderTop:"1px solid var(--hairline-weak)", paddingTop:40, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
        {[
          ["Type",    "Industry Partner Project · Microsoft Azure"],
          ["Methods", "Contextual inquiry · Think-aloud · Concept validation · AI-assisted desk research"],
          ["Impact",  "Radial health indicators · SLA phone alerts · Add New Signal · WCAG review"],
        ].map(([k, v]) => (
          <div key={k}>
            <p style={{ ...lbl, fontSize:10, marginBottom:5 }}>{k}</p>
            <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.5, margin:0 }}>{v}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .mic-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
