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

import ProjectSummary from "../../components/work/ProjectSummary";
import CaseStudyGrid, { Ledger, Prose, Stacks, ImagePair } from "../../components/layout/CaseStudyGrid";
import mic6      from "../../assets/mic6.jpg";
import mic7      from "../../assets/mic7.jpg";
import mic74     from "../../assets/mic74.jpg";
import mic75     from "../../assets/mic75.jpg";
import mic76     from "../../assets/mic76.jpg";
import mic77     from "../../assets/mic77.jpg";
import mic78     from "../../assets/mic78.jpg";
import micTeam   from "../../assets/mic-team.jpeg";
import micEmail  from "../../assets/mic-email.jpeg";
import micCall   from "../../assets/mic-call.jpeg";
import micWcag   from "../../assets/mic-wcag.svg";

const lbl  = { fontSize:"var(--type-base)", fontWeight:"var(--weight-regular)", color:"var(--color-text-tertiary)", margin:0 };
const bd   = { fontSize:"var(--type-base)", lineHeight:"var(--leading-body)", color:"var(--muted)", margin:0, maxWidth:680 };

function Slide({ src, caption }) {
  return (
    <figure style={{ margin:"0 0 var(--padding-small)" }}>
      <img src={src} alt={caption || ""} loading="lazy"
           style={{ width:"100%", display:"block", borderRadius:"var(--radius)", background:"var(--surface-2)" }} />
      {caption && (
        <figcaption style={{ marginTop:"var(--padding-small)", textAlign:"left", fontSize:"var(--type-caption)", fontWeight:"var(--weight-thin)", color:"var(--color-text-tertiary)", lineHeight:"var(--leading-body)" }}>{caption}</figcaption>
      )}
    </figure>
  );
}

function P({ children }) {
  return <p style={{ ...bd, marginBottom:"var(--padding-small)" }}>{children}</p>;
}

// Label (bold) and description per item; a null label renders the text alone.
function Bullets({ items }) {
  return <Stacks items={items} />;
}

const CHAPTERS = [
  { id: "context",  label: "Context" },
  { id: "problem",  label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "impact",   label: "Impact" },
];

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ marginBottom:"var(--padding-big)" }}>
      <div style={{ marginBottom:"var(--padding-small)", maxWidth:720 }}>
        <h2 style={{ margin:"0 0 var(--padding-small)", fontSize:"var(--type-base)", lineHeight:"var(--leading-heading)", color:"var(--text)", fontWeight: "var(--weight-bold)" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function Microsoft() {
  return (
    <CaseStudyGrid chapters={CHAPTERS}>

      {/* HERO ... team presenting photo as background */}
      <header style={{
        marginBottom:"var(--padding-big)", borderRadius:"var(--radius)", overflow:"hidden",
        padding:"var(--padding-big)",
        backgroundImage:`linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.62) 100%), url(${micTeam})`,
        backgroundSize:"cover", backgroundPosition:"center"
      }}>
        <p style={{ ...lbl, color:"rgba(255,255,255,0.7)", marginBottom:"var(--padding-small)" }}>
          Microsoft Azure · Industry Partner Project · Health Observability
        </p>
        <h1 style={{ fontSize:"var(--type-base)", fontWeight:"var(--weight-bold)", lineHeight: "var(--leading-heading)", margin:"0 0 var(--padding-small)", color:"#fff" }}>
          Azure Health Models
        </h1>
        <p style={{ fontSize:"var(--type-base)", lineHeight:"var(--leading-body)", color:"rgba(255,255,255,0.78)", margin:0, maxWidth:680 }}>
          Shipped visibility improvements and compliance-aligned patterns across the SRE Health Observability tool
        </p>
        <ProjectSummary id="microsoft" />
      </header>

      {/* ROLE + BUSINESS IMPACT */}
      <section style={{ marginBottom: "var(--padding-big)" }}>
        <h2 style={{ margin: "0 0 var(--padding-small)", fontSize: "var(--type-base)", lineHeight: "var(--leading-heading)", color: "var(--text)", fontWeight: "var(--weight-bold)" }}>My role</h2>
        <Prose>
        <P>
          Owned the entity editing flow and the AI Ops research, SRE recruiting, contextual inquiry, think-aloud testing, the radial health indicators, the SLA phone-alert flow, and the Add New Signal interaction. Design system primitives were inherited from Azure Monitor; everything shown here is my contribution within that system.
        </P>
        </Prose>
      </section>
      <section style={{ marginBottom: "var(--padding-big)" }}>
        <h2 style={{ margin: "0 0 var(--padding-small)", fontSize: "var(--type-base)", lineHeight: "var(--leading-heading)", color: "var(--text)", fontWeight: "var(--weight-bold)" }}>Business impact</h2>
        <Prose>
        <P>
          Engineering time is the most expensive line in this team's budget. Each minute an SRE loses parsing an unclear interface during an incident is a minute closer to an SLA breach, and SLA credits paid to enterprise customers run into millions per outage. The design brief was decision speed, measured in seconds against dollars.
        </P>
        </Prose>
      </section>

      {/* LEDGER */}
      <div style={{ marginBottom: "var(--padding-big)" }}>
        <Ledger items={[
          ["Industry partners", <>Callum Collin<br />Martin Simecek<br />Microsoft Azure</>],
          ["Project leads", <>Prof. Nancy Rasche<br />Prof. Shobhan Shah<br />Purdue University</>],
          ["Tools", "Figma · Azure Portal · WCAG 2.1 Audit"],
          ["Purdue UX team", <>Sri Chakravarthy ( everything shown in case study here · Entity Visual Design, and AI Ops<br />
            Alyssa Berger · Accessibility <br />
            Natalie Falzone · Competitor Analysis<br />
            Norah Miller · Heuristics and Timestamps Visual<br />
            Priscilla Tam · Icons, and Hover States<br />
            Ashmi Roy · Health Status Graphs<br />
            Ani Berry · Drag and Select motion animation</>],
        ]} />
      </div>

      {/* CONTEXT */}
      <Section id="context" title="Context">
        <Prose>
        <P>
          Microsoft Azure already had a mature design system when I joined the Health Observability team. The question wasn't what to build with; it was how to make a dense enterprise tool legible for internal SRE engineers when every design decision had to clear 4–12 weeks of compliance review and align across parallel designer streams.
        </P>
        <P>
          The product surfaced accurate telemetry across hundreds of distributed services. The problem was that each product-flow owner was improving their own slice without visibility into what other designers were changing nearby. Users saw inconsistency; the compliance cycle amplified it.
        </P>
        </Prose>
          <Slide src={mic6} caption="Azure Health Models: the enterprise surface SRE engineers monitor at scale, and the one where every change ran through a 4–12 week compliance review." />
          <Slide src={mic7} caption="Azure Monitor baseline: the inherited surface showing error rates, resolution speed, log density, and real-time alerts. The ask was to make it legible, not to replace it." />
      </Section>

      {/* PROBLEM */}
      <Section id="problem" title="Problem">
        <Prose>
        <P>The existing experience suffered from four related issues:</P>
        </Prose>
        <Bullets items={[
          ["Fragmented visibility", "degraded services, cost anomalies, and root-cause context were legible per surface but not across the tool"],
          ["Decision latency", "engineers walked through four or five screens to assemble meaning before acting"],
          ["Parallel design drift", "multiple designers owned adjacent flows without a shared review point"],
          ["Compliance cycle friction", "4–12 week review windows meant uncoordinated changes compounded into inconsistency"],
        ]} />
        <Slide src={mic74} caption="Observed workflow: Joel clicks every box, holds signal counts and thresholds in memory, then prioritizes. The pattern across every SRE interviewed." />
        <Slide src={mic75} caption="Pain point one: the signal panel opens without showing which entity is selected or what has been saved. Context dissolves as the engineer edits multiple boxes." />
        <Slide src={mic76} caption="Pain point two: plain icons on every box. A healthy box and a failing box look identical. The system was passing information through text labels alone." />
      </Section>

      {/* APPROACH */}
      <Section id="approach" title="Approach">
        <Prose>
        <P>
          I treated the Health Monitor as one decision surface and the designer group as one team that needed shared review, not parallel ownership.
        </P>
        </Prose>
        <Bullets items={[
          ["One decision surface", "collapse multi-screen enrichment into a single legible view"],
          ["Flow ownership, system alignment", "each designer owned a product flow, but combined recommendations went into compliance together"],
          ["Prompt as scaffolding", "the natural language layer resolved inline when the model was confident and fell back to structured query when it wasn't"],
          ["Design for the compliance window", "group related changes so a single review cycle advanced multiple surfaces"],
        ]} />
        <Prose>
        <P>
          Inside a mature design system, the move wasn't to redesign primitives; it was to use them more coherently across adjacent surfaces.
        </P>
        </Prose>
        <ImagePair>
          <Slide src={micEmail} caption="Research outreach to Geoffrey Lentner, Purdue RCAC: five SRE sessions that grounded the pain-point taxonomy." />
          <Slide src={micCall}  caption="Remote interview with SRE engineers: the research input that identified where the compliance window and the alignment gap compounded." />
        </ImagePair>
        <Slide src={mic77} caption="Iteration: plain cards and double-click state (left) versus radial status indicators for root-cause entities (right). The right side introduces one visual token the whole surface can share." />
        <Slide src={micWcag} caption="Accessibility pass. Contrast ratios against white, deuteranopia simulation, and the final proposal: status symbols plus number plus a darker orange (#B35900). Compliance precondition, not afterthought." />
      </Section>

      {/* SOLUTION */}
      <Section id="solution" title="Solution">
        <Prose>
        <P>
          The redesigned surface unified health, cost, and incident context on one page. Natural language queries resolved inline when the model was confident and surfaced structured fallbacks when it wasn't. Designer-level ownership of each product flow combined with a shared review cadence meant recommendations landed in compliance as a coherent set, not a trickle.
        </P>
        </Prose>
        <Slide src={mic78} caption="Shipped solution: radial status rings (3/4, 4/4) on every entity card, with button order aligned across Add New, New Signal, Save. One visual language, legible from executive overview to engineer deep-dive." />
        <Bullets items={[
          [null, <><strong>Shipped once, consumed everywhere</strong>, one component vocabulary applied across four adjacent product flows, with recommendations grouped into a single compliance review cycle. The design system was inherited; the coordination move was mine.</>],
        ]} />
      </Section>

      {/* IMPACT */}
      <Section id="impact" title="Impact">
        <Bullets items={[
          [null, <>Decision time dropped <strong>~45%</strong> on prompt-driven flows (n=5 engineer sessions)</>],
          [null, <>Detection time dropped <strong>~25%</strong> across incident replays</>],
          [null, <><strong>8 of 8 design changes</strong> accepted by compliance review on first submission</>],
          [null, <><strong>100% handoff coverage</strong> communicated to engineering through Martin and Callum</>],
          [null, <><strong>75% component reuse</strong> across adjacent product flows after the alignment pass</>],
          [null, "Cross-team alignment improved after moving from parallel ownership to combined recommendations across the enterprise tool"],
        ]} />
        <Prose>
        <P>
          Inside a mature system, the design work is less about primitives and more about coordination: getting adjacent designers to ship as if they were one designer with four hands.
        </P>
        </Prose>
      </Section>

      <style>{`
        @media (max-width: 720px) {
          .mic-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </CaseStudyGrid>
  );
}
