// About.jsx — full replacement
// Zone 1: Hero headline
// Zone 2: Left = Gantt timeline (hover bars) | Right = matching project photo
// Zone 3: ProfilePhoto flip + paragraph + links

import { useState } from "react";
import ProfilePhoto from "../components/ui/ProfilePhoto";
import CollaboratorNotes from "../sections/CollaboratorNotes";

// ── IMAGE IMPORTS ─────────────────────────────────────────────────────────────
// Swap filenames here when you add new images to src/assets/
import imgDefenseArk  from "../assets/ransomwaremain.png";
import imgInterior    from "../assets/p1.webp";
import imgPurdue      from "../assets/work-psychosis.jpg";
import imgMicrosoft   from "../assets/work-microsoft.avif";
// Placeholders — add these files to src/assets/ and uncomment:
// import imgIonixx    from "../assets/ionixx.jpg";
// import imgFreelance from "../assets/freelance.jpg";
// import imgPsych     from "../assets/psychology.jpg";
// ─────────────────────────────────────────────────────────────────────────────

const YEAR_START = 2017;
const YEAR_END   = 2026.5;
const RANGE      = YEAR_END - YEAR_START;
const pct  = (yr)       => `${((yr - YEAR_START) / RANGE) * 100}%`;
const wpct = (from, to) => `${((to - from)   / RANGE) * 100}%`;
const y    = (yr, mo=0) => yr + mo / 12;
const YEARS = [2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];
const NOW   = y(2026, 6);

const LANES = [
  {
    label: "Education",
    color: "#4A6FA5",
    items: [
      {
        id:    "psych",
        label: "Psychology B.Sc.",
        sub:   "Madras School of Social Work · 2017–2020",
        from:  y(2017), to: y(2020),
        image: null,
        note:  "Foundation in human behaviour, research methods, and statistics.",
      },
      {
        id:    "pg",
        label: "Counselling PG Diploma",
        sub:   "University of Madras · 2020–2022",
        from:  y(2020), to: y(2022),
        image: null,
        note:  "Applied psychology — qualitative research and empathy frameworks.",
      },
      {
        id:    "purdue",
        label: "MS UX Design",
        sub:   "Purdue University · 2024–2026",
        from:  y(2024, 8), to: y(2026, 5),
        image: imgPurdue,
        note:  "TAPD-INTO (NSF), StraboSpot / SGX3 consultancy, TA × 2 semesters, Capstone.",
      },
    ],
  },
  {
    label: "Practice",
    color: "#B85C38",
    items: [
      {
        id:    "freelance",
        label: "Freelance — wedding stationery",
        sub:   "Self-directed · 2019–2020",
        from:  y(2019), to: y(2020),
        image: null,
        note:  "Designed wedding invites to fund my first laptop and phone. First paying design work.",
      },
      {
        id:    "ionixx",
        label: "UX Design Intern",
        sub:   "Ionixx Technologies · Jan–Jul 2020",
        from:  y(2020, 1), to: y(2020, 7),
        image: null,
        note:  "Fintech & health UX. First professional product design role.",
      },
      {
        id:    "defenseark",
        label: "Product Designer",
        sub:   "DefenseARK · May 2021–May 2023",
        from:  y(2021, 5), to: y(2023, 5),
        image: imgDefenseArk,
        note:  "Founding design hire. Enigma, Brightscan, Torus — cybersecurity UX.",
      },
      {
        id:    "microsoft",
        label: "UX Designer",
        sub:   "Microsoft Azure · 2023–2024",
        from:  y(2023, 9), to: y(2024, 1),
        image: imgMicrosoft,
        note:  "Health Observability Monitor — SRE system redesign.",
      },
    ],
  },
  {
    label: "Studio",
    color: "#8C7A4E",
    items: [
      {
        id:    "interior",
        label: "Interior Design Studio",
        sub:   "Independent · Jul 2023–Jul 2024",
        from:  y(2023, 7), to: y(2024, 7),
        image: imgInterior,
        note:  "4 residential projects — floor plan to construction handover. Real clients, real budgets.",
      },
    ],
  },
];

// ── Gantt + photo panel ───────────────────────────────────────────────────────
function TimelinePanel() {
  const [active, setActive] = useState(null); // active item id

  const activeItem = LANES.flatMap(l => l.items).find(i => i.id === active);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 32,
      alignItems: "start",
    }}>

      {/* LEFT — Gantt ───────────────────────────────────── */}
      <div style={{ minWidth: 0 }}>
        {LANES.map((lane) => (
          <div key={lane.label} style={{ marginBottom: 20 }}>
            {/* Lane label */}
            <p style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#86868B",
              marginBottom: 6,
            }}>
              {lane.label}
            </p>

            {/* Track */}
            <div style={{
              position:     "relative",
              height:       24,
              background:   "#F5F5F7",
              borderRadius: 6,
            }}>
              {/* Grid lines */}
              {YEARS.map(yr => (
                <div key={yr} style={{
                  position:   "absolute",
                  left:       pct(yr),
                  top: 0, bottom: 0,
                  width:      1,
                  background: "rgba(0,0,0,0.05)",
                  pointerEvents: "none",
                }} />
              ))}

              {/* Now marker */}
              <div style={{
                position:   "absolute",
                left:       pct(NOW),
                top: -2, bottom: -2,
                width:      1.5,
                background: "#1D1D1F",
                borderRadius: 1,
                pointerEvents: "none",
                zIndex: 2,
              }} />

              {/* Bars */}
              {lane.items.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setActive(item.id)}
                  onMouseLeave={() => setActive(null)}
                  title={item.label}
                  style={{
                    position:     "absolute",
                    left:         pct(item.from),
                    width:        wpct(item.from, item.to),
                    top:          "50%",
                    transform:    active === item.id
                      ? "translateY(-50%) scaleY(1.25)"
                      : "translateY(-50%) scaleY(1)",
                    height:       16,
                    background:   lane.color,
                    borderRadius: 4,
                    cursor:       "pointer",
                    opacity:      active && active !== item.id ? 0.4 : 1,
                    transition:   "opacity 200ms ease, transform 200ms ease",
                    zIndex:       active === item.id ? 3 : 1,
                    boxShadow:    active === item.id
                      ? `0 2px 12px ${lane.color}55`
                      : "none",
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Year axis */}
        <div style={{ position: "relative", height: 16, marginTop: 2 }}>
          {YEARS.map(yr => (
            <span key={yr} style={{
              position:  "absolute",
              left:      pct(yr),
              transform: "translateX(-50%)",
              fontSize:  9,
              color:     "#86868B",
            }}>
              {yr}
            </span>
          ))}
          <span style={{
            position:   "absolute",
            left:       pct(NOW),
            transform:  "translateX(-50%)",
            fontSize:   9,
            fontWeight: 700,
            color:      "#1D1D1F",
          }}>
            Now
          </span>
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
          Hover any bar to see the project →
        </p>
      </div>

      {/* RIGHT — Project photo ──────────────────────────── */}
      <div style={{
        position:     "sticky",
        top:          80,
        borderRadius: 16,
        overflow:     "hidden",
        background:   "#F5F5F7",
        aspectRatio:  "4 / 3",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        transition:   "box-shadow 300ms ease",
        boxShadow:    activeItem
          ? "0 12px 40px rgba(0,0,0,0.12)"
          : "none",
      }}>
        {activeItem ? (
          <>
            {activeItem.image ? (
              <img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.label}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  animation: "fadeIn 220ms ease",
                }}
              />
            ) : (
              <div style={{ textAlign:"center", padding:"0 24px" }}>
                <p style={{ fontSize:12, fontWeight:600, color:"#1D1D1F", marginBottom:6 }}>
                  {activeItem.label}
                </p>
                <p style={{ fontSize:11, color:"#86868B" }}>
                  No image yet — add one to src/assets/ and update CareerTimeline imports
                </p>
              </div>
            )}
            {/* Caption below image */}
            <div style={{
              position:   "absolute",
              bottom:     0, left:0, right:0,
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
              padding:    "24px 16px 14px",
            }}>
              <p style={{ fontSize:12, fontWeight:600, color:"#fff", margin:0 }}>
                {activeItem.label}
              </p>
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.75)", margin:"2px 0 0" }}>
                {activeItem.sub}
              </p>
            </div>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:24 }}>
            <p style={{ fontSize:13, color:"#86868B", lineHeight:1.6 }}>
              Hover a bar on the left<br/>to see the project
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:scale(1.02); } to { opacity:1; transform:scale(1); } }
        @media (max-width: 680px) {
          .about-timeline-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <section className="page-section">
        <div className="container">

          {/* ZONE 1 — Hero */}
          <h1 style={{
            fontSize:      "clamp(36px, 5vw, 64px)",
            fontWeight:    700,
            letterSpacing: "-0.5px",
            lineHeight:    1.05,
            color:         "#1D1D1F",
            marginBottom:  "clamp(48px, 6vw, 80px)",
            maxWidth:      "12ch",
          }}>
            Born for the craft of Design.
          </h1>

          {/* ZONE 2 — Timeline + photo */}
          <div style={{ marginBottom: "clamp(64px, 8vw, 120px)" }}>
            <TimelinePanel />
          </div>

          {/* ZONE 3 — Profile + paragraph + links */}
          <div style={{
            display:   "grid",
            gridTemplateColumns: "200px 1fr",
            gap:       48,
            alignItems:"start",
            borderTop: "0.5px solid rgba(0,0,0,0.08)",
            paddingTop: 48,
          }}>
            {/* Profile photo flip */}
            <ProfilePhoto />

            {/* Paragraph + links */}
            <div>
              <p style={{
                fontSize:   "clamp(17px, 2vw, 21px)",
                fontWeight: 400,
                color:      "#1D1D1F",
                lineHeight: 1.5,
                letterSpacing: "-0.1px",
                marginBottom: 24,
                maxWidth:   "52ch",
              }}>
                I started in psychology and ended up in design because both ask the same question —
                why does this feel harder than it should? That instinct led me from Chennai to Purdue,
                through cybersecurity, interiors, health tech, and physical products.
                I just want to keep designing.
              </p>

              {/* Links */}
              <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                {[
                  { label:"Email",    href:"mailto:srinidhi.saas@gmail.com" },
                  { label:"LinkedIn", href:"https://www.linkedin.com/in/srinidhi-chakravarthy/" },
                  { label:"Resume",   href:"https://drive.google.com/file/d/1sBEfmG5NuvbsdsR2yeGe1cvHGMtACWOJ/view?usp=sharing" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontSize:   14,
                      fontWeight: 500,
                      color:      "#0055B3",
                      textDecoration: "none",
                      display:    "flex",
                      alignItems: "center",
                      gap:        4,
                      transition: "opacity 160ms ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <CollaboratorNotes />
    </>
  );
}
