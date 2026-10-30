import { useState, useRef } from "react";
import ProfilePhoto from "../components/ui/ProfilePhoto";
import ContactLinks from "../components/ui/ContactLinks";
// import CollaboratorNotes from "../sections/CollaboratorNotes"; // re-enable at 3+ notes

import imgDefenseArk from "../assets/ransomwaremain.png";
import imgInterior   from "../assets/p1.webp";
import imgPurdue     from "../assets/work-psychosis.webp";
import imgMicrosoft  from "../assets/work-microsoft.webp";

const YEAR_START = 2017;
const YEAR_END   = 2026.5;
const RANGE      = YEAR_END - YEAR_START;
const pct  = (yr)       => `${((yr - YEAR_START) / RANGE) * 100}%`;
const wpct = (from, to) => `${((to - from) / RANGE) * 100}%`;
const y    = (yr, mo=0) => yr + mo / 12;
const YEARS = [2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];
const NOW   = y(2026, 6);

const ROW_H = 24;
const BAR_H = 20;
const MARKER = 12;

const LANES = [
  {
    label: "Learning",
    color: "#4A6FA5",
    items: [
      { id:"psych",    label:"BS PSychology",        sub:"Madras School of Social Work · 2017–2020", from:y(2017),    to:y(2020),    image:null,         note:"Foundation in human behaviour, research methods, and statistics." },
      { id:"pg",       label:"Counselling PG Diploma",  sub:"University of Madras · 2020–2022",          from:y(2020),    to:y(2022),    image:null,         note:"Applied psychology: qualitative research and empathy frameworks." },
      { id:"gate",     label:"GATE Psychology 2020 · Rank 116", sub:"Milestone · 2020",                          from:y(2020,2),  to:y(2020,3),  image:null,         note:"", marker:true },
      { id:"purdue",   label:"MS UX Design",            sub:"Purdue University · 2024–2026",              from:y(2024,8),  to:y(2026,5),  image:imgPurdue,    note:"TAPD-INTO (NSF), StraboSpot / SGX3, TA × 2 semesters, Capstone." },
      {
        id:    "ta-pm",
        label: "Graduate TA · Project Management",
        sub:   "Purdue Daniels School of Business · Spring 2025",
        from:  y(2025, 1), to: y(2025, 5),
        image: null,
        note:  "TA for graduate-level project management. Supported 80+ MS students with curriculum and lab sessions.",
      },
      {
        id:    "ta-db",
        label: "Graduate TA · Database Management",
        sub:   "Purdue · Spring 2026",
        from:  y(2026, 1), to: y(2026, 5),
        image: null,
        note:  "TA for database management and SQL. Designed curriculum materials and led data visualization labs.",
      },
    ],
  },
  {
    label: "Product design and research",
    color: "#B85C38",
    items: [
      { id:"ionixx",    label:"UX Design Intern",               sub:"Ionixx Technologies · Jan–Jul 2020",  from:y(2020,1),  to:y(2020,7),  image:null,         note:"Fintech & health UX. First professional product design role." },
      { id:"defenseark",label:"Product Designer",               sub:"DefenseARK / MetaSquare · May 4, 2021–Jun 30, 2023", from:y(2021,4.1), to:y(2023,6), image:imgDefenseArk,note:"Founding design hire. Enigma, Brightscan, Torus: cybersecurity UX." },
      { id:"microsoft", label:"UX Designer",                    sub:"Microsoft Azure · Fall 2025",          from:y(2025,8),  to:y(2025,12), image:imgMicrosoft, note:"Health Observability Monitor: SRE system redesign." },
      {
        id:    "sgx3",
        label: "UX Consultant · SGX3 / StraboSpot",
        sub:   "TACC · Fall 2025",
        from:  y(2025, 8), to: y(2025, 12),
        image: imgMicrosoft,
        note:  "UX consultancy for StraboSpot geospatial platform: 12,000+ geologists. Heuristic eval + expert interviews.",
      },
      {
        id:    "tapinto",
        label: "TAPD-INTO · NSF STEM Accessibility",
        sub:   "Purdue · Fall 2024",
        from:  y(2024, 8), to: y(2024, 12),
        image: null,
        note:  "NSF-funded accessibility research for STEM education. Audited tools for neurodivergent and disabled learners.",
      },
      // Research markers (dots)
      { id:"thesis-ai",    label:"AI-at-home survey research",            sub:"Final-year thesis · Jan–Mar 2020", from:y(2020,1), to:y(2020,3), image:null, note:"Survey design for my final-year psychology thesis.", marker:true },
      { id:"thesis-photo", label:"Photo gallery / emotional-state study", sub:"Final-year thesis · Jan–Mar 2020", from:y(2020,1), to:y(2020,3), image:null, note:"Study and survey design for my final-year psychology thesis.", marker:true },
      { id:"qualtrics",    label:"Qualtrics market research",             sub:"Spring 2025",                      from:y(2025,1), to:y(2025,5), image:null, note:"", marker:true },
      { id:"hr-visualiser",label:"Heart rate visualiser",                 sub:"Spring 2025",                      from:y(2025,1), to:y(2025,5), image:null, note:"", marker:true },
      { id:"anova-r",      label:"Anova and R health research",           sub:"Spring 2026",                      from:y(2026,1), to:y(2026,5), image:null, note:"", marker:true },
    ],
  },
  {
    label: "Independent client work",
    color: "#8C7A4E",
    items: [
      { id:"freelance", label:"Wedding Invitation Design", sub:"Paid client work · 2019–2020",            from:y(2019),    to:y(2020),    image:null,         note:"Real paid client commissions: wedding invitations that funded my first laptop and phone." },
      { id:"interior", label:"Interior Design Studio", sub:"Independent · Jul 2023–Jul 2024", from:y(2023,7), to:y(2024,7), image:imgInterior, note:"4 residential projects, floor plan to handover. Real clients, real budgets." },
    ],
  },
];

const midOf = (item) => (item.from + item.to) / 2;

// Stack overlapping items into rows so simultaneous work reads as overlap.
function packRows(items) {
  const span = (it) =>
    it.marker ? { s: midOf(it) - 0.2, e: midOf(it) + 0.2 } : { s: it.from, e: it.to };
  const ends = [];
  const placed = {};
  [...items].sort((a, b) => span(a).s - span(b).s).forEach((it) => {
    const { s, e } = span(it);
    let r = ends.findIndex((end) => end <= s);
    if (r === -1) { r = ends.length; ends.push(e); } else { ends[r] = e; }
    placed[it.id] = r;
  });
  return { placed, rows: Math.max(1, ends.length) };
}

// ── Single bar with inline popup ─────────────────────────────────────────────
function Bar({ item, laneColor, anyActive, row }) {
  const [hovered, setHovered] = useState(false);
  const [align, setAlign] = useState("center");
  const ref = useRef(null);
  const hasImage = !!item.image;
  const popW = hasImage ? 200 : 220;

  const show = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) {
      const cx = r.left + r.width / 2;
      const half = popW / 2 + 8;
      setAlign(cx - half < 0 ? "left" : cx + half > window.innerWidth ? "right" : "center");
    }
    setHovered(true);
  };

  const popPos =
    align === "left"  ? { left: 0,  animation: "popInS 160ms ease-out" } :
    align === "right" ? { right: 0, animation: "popInS 160ms ease-out" } :
    { left: "50%", transform: "translateX(-50%)", animation: "popIn 160ms cubic-bezier(0.34,1.56,0.64,1)" };
  const arrowPos =
    align === "left"  ? { left: 10, transform: "none" } :
    align === "right" ? { right: 10, transform: "none" } :
    { left: "50%", transform: "translateX(-50%)" };

  return (
    <div
      ref={ref}
      style={{
        position:"absolute",
        left:  item.marker ? `calc(${pct(midOf(item))} - ${MARKER / 2}px)` : pct(item.from),
        width: item.marker ? MARKER : wpct(item.from, item.to),
        top:   4 + row * ROW_H,
        height: BAR_H,
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={show}
      onMouseLeave={() => setHovered(false)}
    >
      {/* The bar (or milestone marker) */}
      <div style={{
        width:      "100%",
        height:     item.marker ? MARKER : "100%",
        marginTop:  item.marker ? (BAR_H - MARKER) / 2 : 0,
        background: laneColor,
        borderRadius: item.marker ? "50%" : "var(--radius)",
        cursor:     "default",
        opacity:    anyActive && !hovered ? 0.35 : 1,
        transform:  hovered ? (item.marker ? "scale(1.3)" : "scaleY(1.3)") : "none",
        transformOrigin: "center",
        transition: "opacity 180ms ease, transform 180ms ease, box-shadow 180ms ease",
        boxShadow:  hovered ? `0 2px 14px ${laneColor}66` : "none",
      }} />

      {/* Popup — image card for items with images, text card for the rest.
          Surface and text colours come from theme tokens so it reads in both modes. */}
      {hovered && (
        <div style={{
          position:     "absolute",
          bottom:       "calc(100% + 10px)",
          width:        popW,
          borderRadius: "var(--radius)",
          boxShadow:    "0 8px 32px rgba(0,0,0,0.28)",
          background:   "var(--card)",
          border:       "1px solid var(--hairline-weak)",
          color:        "var(--text)",
          pointerEvents:"none",
          zIndex:       20,
          ...popPos,
        }}>
          {hasImage && (
            <img src={item.image} alt={item.label}
                 style={{ width:"100%", height:120, objectFit:"cover", display:"block", borderRadius:"var(--radius) var(--radius) 0 0" }} />
          )}
          <div style={{ padding: hasImage ? "10px 12px 12px" : "12px 14px 14px" }}>
            <p style={{ fontSize:"var(--type-ui)", fontWeight:600, color:"var(--text)", margin:0 }}>{item.label}</p>
            <p style={{ fontSize:"var(--type-ui)", color:"var(--muted)", margin:"2px 0 0", lineHeight:"var(--leading-subheading)" }}>{item.sub}</p>
            {item.note && (
              <p style={{ fontSize:"var(--type-ui)", color:"var(--muted)", margin:"var(--space-1) 0 0", lineHeight:"var(--leading-body)" }}>{item.note}</p>
            )}
          </div>
          <div style={{
            position:"absolute", bottom:-7,
            width:12, height:12,
            background:"var(--card)",
            borderRight:"1px solid var(--hairline-weak)",
            borderBottom:"1px solid var(--hairline-weak)",
            rotate:"45deg",
            ...arrowPos,
          }} />
        </div>
      )}
    </div>
  );
}

// ── Gantt ────────────────────────────────────────────────────────────────────
function GanttChart() {
  const [active, setActive] = useState(null);

  return (
    <div style={{ width:"100%" }}>
      <style>{`
        @keyframes popIn {
          from { opacity:0; transform:translateX(-50%) scale(0.88); }
          to   { opacity:1; transform:translateX(-50%) scale(1); }
        }
        @keyframes popInS {
          from { opacity:0; scale:0.92; }
          to   { opacity:1; scale:1; }
        }
        @media(max-width:600px){
          .gantt-wrap { font-size:var(--type-ui) !important; }
        }
      `}</style>

      {LANES.map((lane) => {
        const { placed, rows } = packRows(lane.items);
        return (
          <div key={lane.label} style={{ marginBottom:"var(--space-4)" }}>
            <p style={{ fontSize:"var(--type-ui)", fontWeight:600, letterSpacing:"0.08em",
                        textTransform:"uppercase", color:"var(--color-text-tertiary)", marginBottom:"var(--space-1)" }}>
              {lane.label}
            </p>
            <div style={{ position:"relative", height: rows * ROW_H + 8, background:"var(--surface-2)", borderRadius:"var(--radius)" }}
                 onMouseLeave={() => setActive(null)}>
              {/* Year grid */}
              {YEARS.map(yr => (
                <div key={yr} style={{ position:"absolute", left:pct(yr), top:0, bottom:0,
                                       width:1, background:"rgba(0,0,0,0.05)", pointerEvents:"none" }} />
              ))}
              {/* Now */}
              <div style={{ position:"absolute", left:pct(NOW), top:-3, bottom:-3,
                            width:2, background:"var(--text)", borderRadius:"var(--radius)",
                            pointerEvents:"none", zIndex:5 }} />
              {/* Bars */}
              {lane.items.map(item => (
                <Bar key={item.id} item={item} laneColor={lane.color}
                     anyActive={active !== null} row={placed[item.id]} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Year axis */}
      <div style={{ position:"relative", height:20, marginTop:4 }}>
        {YEARS.map(yr => (
          <span key={yr} style={{ position:"absolute", left:pct(yr),
                                   transform:"translateX(-50%)",
                                   fontSize:"var(--type-ui)", color:"var(--color-text-tertiary)", whiteSpace:"nowrap" }}>
            {yr}
          </span>
        ))}
        <span style={{ position:"absolute", left:pct(NOW), transform:"translateX(-50%)",
                        fontSize:"var(--type-ui)", fontWeight:600, color:"var(--text)" }}>Now</span>
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:"var(--space-3)", marginTop:"var(--space-3)", flexWrap:"wrap" }}>
        {LANES.map(lane => (
          <div key={lane.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:8, height:8, borderRadius:"var(--radius)", background:lane.color }} />
            <span style={{ fontSize:"var(--type-ui)", color:"var(--muted)" }}>{lane.label}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize:"var(--type-ui)", color:"var(--color-text-tertiary)", marginTop:"var(--space-2)" }}>
        Hover coloured bars with images to see the project ↑
      </p>
    </div>
  );
}

// ── Context sections ─────────────────────────────────────────────────────────
const h2Style = {
  fontSize:      "var(--type-heading)",
  fontWeight:    600,
  letterSpacing: "-0.3px",
  lineHeight:    "var(--leading-heading)",
  color:         "var(--text)",
  margin:        "0 0 var(--space-3)",
};
const pStyle = {
  fontSize:   "var(--type-body)",
  lineHeight: "var(--leading-body)",
  color:      "var(--muted)",
  margin:     "0 0 var(--space-3)",
  maxWidth:   "60ch",
};

const CONTEXT = [
  ["Time",        "What if the user can't spend another minute?"],
  ["Attention",   "What actually needs to be visible?"],
  ["Emotion",     "What changes when someone isn't in a neutral state?"],
  ["Environment", "What changes outside the screen?"],
  ["Access",      "Who experiences this differently?"],
  ["Trust",       "What does the product ask someone to understand, disclose, or consent to?"],
];

function ContextSections() {
  return (
    <>
      {/* The common thread — label left of the gutter, the list right of it */}
      <div className="center-split" style={{ marginTop:"var(--space-7)" }}>
        <h2 className="split-left" style={h2Style}>The common thread? Context.</h2>
      </div>

      <div style={{ marginTop:"var(--space-4)" }}>
        <div className="center-split">
          <p className="split-left" style={{ fontSize:"var(--type-ui)", fontWeight:600, letterSpacing:"0.10em", textTransform:"uppercase",
                      color:"var(--color-text-tertiary)", margin:"0 0 var(--space-2)" }}>
            What context changes
          </p>
        </div>
        {CONTEXT.map(([term, question]) => (
          <div key={term} className="center-split" style={{ padding:"14px 0" }}>
            <span className="split-left" style={{ fontSize:"var(--type-ui)", fontWeight:600, letterSpacing:"0.08em",
                           textTransform:"uppercase", color:"var(--text)" }}>{term}</span>
            <span className="split-right" style={{ fontSize:"var(--type-body)", lineHeight:"var(--leading-body)", color:"var(--muted)" }}>{question}</span>
          </div>
        ))}
      </div>

      {/* Design is more than making things usable — heading left, words right */}
      <div className="center-split" style={{ marginTop:"var(--space-7)", alignItems:"start" }}>
        <h2 className="split-left" style={h2Style}>Design is more than making things usable.</h2>
        <div className="split-right">
          <p style={pStyle}>
            It means understanding the context around the interaction, and designing accordingly.
          </p>
          <p style={pStyle}>
            My background in psychology and HCI shapes how I approach that work: understand the person, understand the system, then design the interaction between them.
          </p>
          <p style={pStyle}>
            I’m especially mindful of what products ask people to trust, disclose, understand, and consent to.
          </p>
        </div>
      </div>

      {/* Gratitude card, right of the gutter */}
      <div className="center-split" style={{ marginTop:"var(--space-7)" }}>
        <div className="split-right" style={{
          maxWidth:460,
          padding:"22px 26px 24px",
          background:"#FBF6E8",
          color:"#2B2A26",
          borderRadius:"var(--radius)",
          borderBottom:"4px solid #E4D9BC",
          boxShadow:"0 6px 14px rgba(0,0,0,0.20)",
          fontSize:"var(--type-body)",
          lineHeight:"var(--leading-body)",
        }}>
          🌻 Grateful to the mentors, professors, seniors, researchers, family, friends, and teammates who have challenged me, supported me, and helped me grow.
        </div>
      </div>
    </>
  );
}

// ── Experience / Education ───────────────────────────────────────────────────
// Dates, titles and organizations as written on the resume. An optional fourth
// value links the organization to its website.
const EXPERIENCE = [
  ["Aug 2024 – May 2026", "Product Design Associate",                 "Purdue University"],
  ["Aug 2025 – Dec 2025", "UX / Product Design Consultant",           "SGX3 Science Gateways", "https://sciencegateways.org/"],
  ["Dec 2024 – May 2025", "Accessibility Design Project Coordinator", "TAPD-INTO STEM NSF"],
  ["May 2021 – Jun 2023", "Product Designer, Individual Contributor", "Metasquare, DefenseARK Cybersecurity", "https://www.metasquare.com/"],
  ["Jan 2020 – Jul 2020", "UX Design Intern",                         "Ionixx Technologies", "https://www.ionixxtech.com/"],
];
const EDUCATION = [
  ["Aug 2024 – May 2026", "MS Computer Graphics Technology",             "Purdue University"],
  ["May 2020 – May 2022", "PG Diploma, Counselling Special User Groups", "University of Madras"],
  ["Aug 2017 – May 2020", "BS Human Psychology",                         "Madras School of Social Work"],
];

function RecordList({ heading, rows }) {
  return (
    <div style={{ marginTop:"var(--space-6)" }}>
      <div className="center-split">
        <h2 className="split-left" style={{ ...h2Style, fontSize:"var(--type-subheading)", marginBottom:"var(--space-2)" }}>{heading}</h2>
      </div>
      {/* Dates on the left of the gutter; role and organization on the right. */}
      <ul className="about-records">
        {rows.map(([dates, title, org, href]) => (
          <li key={dates + title} className="center-split">
            <span className="split-left">{dates}</span>
            <span className="split-right">
              <span className="about-records__title">{title}</span>
              <span className="about-records__org">
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer" className="contact-link">{org}</a>
                  : org}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <section className="page-section">
        <div className="container">

          {/* ZONE 1 — Profile + paragraph first */}
          <div className="about-profile-grid" style={{
            display:             "grid",
            alignItems:          "start",
            marginBottom:        "var(--space-7)",
          }}>
            <ProfilePhoto />
            <div>
              <h1 style={{
                fontSize:      "var(--type-heading)",
                fontWeight:    600,
                letterSpacing: "-0.4px",
                lineHeight:    "var(--leading-heading)",
                color:         "var(--text)",
                marginBottom:  "var(--space-3)",
                maxWidth:      "14ch",
              }}>
                sriː.ni.dʰi
              </h1>
              <ul style={{
                listStyle:     "none",
                margin:        "0 0 var(--space-4)",
                padding:       0,
                fontSize:      "var(--type-body)",
                color:         "var(--muted)",
                lineHeight:    "var(--leading-body)",
              }}>
                {["Web Design", "3D Design", "Product Design", "UX Design", "Interface Design"].map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <ContactLinks />
            </div>
          </div>

          {/* ZONE 2 — Heading left of the gutter, graph right of it */}
          <div className="center-split" style={{ alignItems:"start" }}>
            <div className="split-left">
              <h2 style={{ ...h2Style, marginBottom:"var(--space-1)" }}>A career built by following questions.</h2>
              <p style={{ fontSize:"var(--type-body)", color:"var(--muted)", margin:0 }}>
                Psychology → research → making → product design.
              </p>
            </div>
            <div className="split-right">
              <GanttChart />
            </div>
          </div>

          <RecordList heading="Experience" rows={EXPERIENCE} />
          <RecordList heading="Education" rows={EDUCATION} />

          <ContextSections />

        </div>
      </section>

      {/* <CollaboratorNotes /> */}
    </>
  );
}
