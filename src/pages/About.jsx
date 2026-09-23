import { useState, useRef } from "react";
import ProfilePhoto from "../components/ui/ProfilePhoto";
import CollaboratorNotes from "../sections/CollaboratorNotes";

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

const LANES = [
  {
    label: "Education",
    color: "#4A6FA5",
    items: [
      { id:"psych",    label:"BS PSychology",        sub:"Madras School of Social Work · 2017–2020", from:y(2017),    to:y(2020),    image:null,         note:"Foundation in human behaviour, research methods, and statistics." },
      { id:"pg",       label:"Counselling PG Diploma",  sub:"University of Madras · 2020–2022",          from:y(2020),    to:y(2022),    image:null,         note:"Applied psychology — qualitative research and empathy frameworks." },
      { id:"purdue",   label:"MS UX Design",            sub:"Purdue University · 2024–2026",              from:y(2024,8),  to:y(2026,5),  image:imgPurdue,    note:"TAPD-INTO (NSF), StraboSpot / SGX3, TA × 2 semesters, Capstone." },
    ],
  },
  {
    label: "Work",
    color: "#B85C38",
    items: [
      { id:"freelance", label:"Freelance — Wedding Invites Design", sub:"Self-directed · 2019–2020",            from:y(2019),    to:y(2020),    image:null,         note:"Designed wedding invites to fund my first laptop and phone." },
      { id:"ionixx",    label:"UX Design Intern",               sub:"Ionixx Technologies · Jan–Jul 2020",  from:y(2020,1),  to:y(2020,7),  image:null,         note:"Fintech & health UX. First professional product design role." },
      { id:"defenseark",label:"Product Designer",               sub:"DefenseARK · May 2021–May 2023",       from:y(2021,5),  to:y(2023,5),  image:imgDefenseArk,note:"Founding design hire. Enigma, Brightscan, Torus — cybersecurity UX." },
      { id:"microsoft", label:"UX Designer",                    sub:"Microsoft Azure · 2023–2024",          from:y(2023,9),  to:y(2024,1),  image:imgMicrosoft, note:"Health Observability Monitor — SRE system redesign." },
     
      {
        id:    "tapinto",
        label: "TAPD-INTO — NSF STEM Accessibility",
        sub:   "Purdue · Fall 2024",
        from:  y(2024, 8), to: y(2024, 12),
        image: null,
        note:  "NSF-funded accessibility research for STEM education. Audited tools for neurodivergent and disabled learners.",
      },
       {
        id:    "ta-pm",
        label: "Graduate TA — Project Management",
        sub:   "Purdue Daniels School of Business · Spring 2025",
        from:  y(2025, 1), to: y(2025, 5),
        image: null,
        note:  "TA for graduate-level project management. Supported 80+ MS students with curriculum and lab sessions.",
      },
      {
        id:    "sgx3",
        label: "UX Consultant — SGX3 / StraboSpot",
        sub:   "TACC · Fall 2025",
        from:  y(2025, 8), to: y(2025, 12),
        image: imgMicrosoft,
        note:  "UX consultancy for StraboSpot geospatial platform — 12,000+ geologists. Heuristic eval + expert interviews.",
      },
      {
        id:    "ta-db",
        label: "Graduate TA — Database Management",
        sub:   "Purdue · Spring 2026",
        from:  y(2026, 1), to: y(2026, 5),
        image: null,
        note:  "TA for database management and SQL. Designed curriculum materials and led data modelling labs.",
      },
    ],
  },
  {
    label: "Freelance",
    color: "#8C7A4E",
    items: [
      { id:"interior", label:"Interior Design Studio", sub:"Independent · Jul 2023–Jul 2024", from:y(2023,7), to:y(2024,7), image:imgInterior, note:"4 residential projects — floor plan to handover. Real clients, real budgets." },
    ],
  },
];

// ── Single bar with inline popup ─────────────────────────────────────────────
function Bar({ item, laneColor, anyActive }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const hasImage = !!item.image;

  return (
    <div
      ref={ref}
      style={{ position:"absolute", left:pct(item.from), width:wpct(item.from,item.to),
               top:"50%", height:20, zIndex: hovered ? 10 : 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* The bar */}
      <div style={{
        width:      "100%",
        height:     "100%",
        background: laneColor,
        borderRadius: 5,
        cursor:     hasImage ? "pointer" : "default",
        opacity:    anyActive && !hovered ? 0.35 : 1,
        transform:  hovered ? "scaleY(1.3)" : "scaleY(1)",
        transformOrigin: "center",
        transition: "opacity 180ms ease, transform 180ms ease, box-shadow 180ms ease",
        boxShadow:  hovered ? `0 2px 14px ${laneColor}66` : "none",
      }} />

     
            {/* Popup — image card for bars with images, text card for bars without */}
      {hovered && (
        <div style={{
          position:     "absolute",
          bottom:       "calc(100% + 10px)",
          left:         "50%",
          transform:    "translateX(-50%)",
          width:        hasImage ? 200 : 220,
          borderRadius: 10,
          overflow:     "hidden",
          boxShadow:    "0 8px 32px rgba(0,0,0,0.18)",
          background:   "#fff",
          animation:    "popIn 160ms cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents:"none",
          zIndex:       20,
        }}>
          {hasImage && (
            <img src={item.image} alt={item.label}
                 style={{ width:"100%", height:120, objectFit:"cover", display:"block" }} />
          )}
          <div style={{ padding: hasImage ? "10px 12px 12px" : "12px 14px 14px" }}>
            <p style={{ fontSize:11, fontWeight:600, color:"#1D1D1F", margin:0 }}>{item.label}</p>
            <p style={{ fontSize:10, color:"#86868B", margin:"2px 0 0", lineHeight:1.4 }}>{item.sub}</p>
            <p style={{ fontSize:10, color:"#3A3A3C", margin:"6px 0 0", lineHeight:1.5 }}>{item.note}</p>
          </div>
          <div style={{
            position:"absolute", bottom:-6, left:"50%",
            transform:"translateX(-50%)",
            width:12, height:12,
            background:"#fff",
            borderRight:"0.5px solid rgba(0,0,0,0.06)",
            borderBottom:"0.5px solid rgba(0,0,0,0.06)",
            rotate:"45deg",
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
        @media(max-width:600px){
          .gantt-wrap { font-size:9px !important; }
        }
      `}</style>

      {LANES.map((lane) => (
        <div key={lane.label} style={{ marginBottom:24 }}>
          <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.08em",
                      textTransform:"uppercase", color:"#86868B", marginBottom:8 }}>
            {lane.label}
          </p>
          <div style={{ position:"relative", height:28, background:"#F5F5F7", borderRadius:8 }}
               onMouseLeave={() => setActive(null)}>
            {/* Year grid */}
            {YEARS.map(yr => (
              <div key={yr} style={{ position:"absolute", left:pct(yr), top:0, bottom:0,
                                     width:1, background:"rgba(0,0,0,0.05)", pointerEvents:"none" }} />
            ))}
            {/* Now */}
            <div style={{ position:"absolute", left:pct(NOW), top:-3, bottom:-3,
                          width:2, background:"#1D1D1F", borderRadius:1,
                          pointerEvents:"none", zIndex:5 }} />
            {/* Bars */}
            {lane.items.map(item => (
              <Bar key={item.id} item={item} laneColor={lane.color}
                   anyActive={active !== null} />
            ))}
          </div>
        </div>
      ))}

      {/* Year axis */}
      <div style={{ position:"relative", height:20, marginTop:4 }}>
        {YEARS.map(yr => (
          <span key={yr} style={{ position:"absolute", left:pct(yr),
                                   transform:"translateX(-50%)",
                                   fontSize:9, color:"#86868B", whiteSpace:"nowrap" }}>
            {yr}
          </span>
        ))}
        <span style={{ position:"absolute", left:pct(NOW), transform:"translateX(-50%)",
                        fontSize:9, fontWeight:700, color:"#1D1D1F" }}>Now</span>
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:16, marginTop:16, flexWrap:"wrap" }}>
        {LANES.map(lane => (
          <div key={lane.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:8, height:8, borderRadius:2, background:lane.color }} />
            <span style={{ fontSize:10, color:"#6E6E73" }}>{lane.label}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize:11, color:"#86868B", marginTop:10 }}>
        Hover coloured bars with images to see the project ↑
      </p>
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
          <div style={{
            display:             "grid",
            gridTemplateColumns: "180px 1fr",
            gap:                 48,
            alignItems:          "start",
            marginBottom:        "clamp(56px, 8vw, 100px)",
          }}>
            <ProfilePhoto />
            <div>
              <h1 style={{
                fontSize:      "clamp(28px, 4vw, 48px)",
                fontWeight:    700,
                letterSpacing: "-0.4px",
                lineHeight:    1.08,
                color:         "#1D1D1F",
                marginBottom:  20,
                maxWidth:      "14ch",
              }}>
                Thoughful Craft
              </h1>
              <p style={{
                fontSize:      "clamp(16px, 1.8vw, 19px)",
                fontWeight:    400,
                color:         "#3A3A3C",
                lineHeight:    1.6,
                letterSpacing: "-0.1px",
                marginBottom:  24,
                maxWidth:      "52ch",
              }}>
                I started in psychology and ended up in design because both ask the same
                question — How could I make someone's life better? That instinct led me
                from India to Purdue, through cybersecurity, interiors, health tech, and
                physical products.
              </p>
              <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                {[
                  { label:"Email",    href:"mailto:srinidhi.saas@gmail.com" },
                  { label:"LinkedIn", href:"https://www.linkedin.com/in/srinidhi-chakravarthy/" },
                  { label:"Resume",   href:"https://drive.google.com/file/d/1sBEfmG5NuvbsdsR2yeGe1cvHGMtACWOJ/view?usp=sharing" },
                ].map(({ label, href }) => (
                  <a key={label} href={href}
                     target={label !== "Email" ? "_blank" : undefined}
                     rel="noopener noreferrer"
                     style={{ fontSize:13, fontWeight:500, color:"#0055B3",
                              textDecoration:"none", display:"flex", alignItems:"center", gap:3 }}
                     onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
                     onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ZONE 2 — Gantt at 80% width */}
          <div style={{
            borderTop:   "0.5px solid rgba(0,0,0,0.08)",
            paddingTop:  40,
            width:       "80%",
          }}>
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.10em",
                        textTransform:"uppercase", color:"#86868B", marginBottom:16 }}>
              Career timeline
            </p>
            <GanttChart />
          </div>

        </div>
      </section>

      <CollaboratorNotes />
    </>
  );
}
