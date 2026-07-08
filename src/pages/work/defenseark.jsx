export default function defenseark() {
  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif", color: "#1D1D1F", padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "#86868B", marginBottom: 12 }}>
        Cybersecurity · Enterprise UX
      </p>
      <h1 style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.05, marginBottom: 16 }}>
        DefenseARK
      </h1>
      <p style={{ fontSize: 19, color: "#6E6E73", marginBottom: 16, maxWidth: 600 }}>
        Ransomware Response Portal · Enterprise Security UX
      </p>

      {/* NDA NOTICE */}
      <div style={{ background: "#F5F5F7", borderRadius: 12, padding: "32px 40px", marginBottom: 64, maxWidth: 600 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#86868B", marginBottom: 12 }}>
          Under NDA
        </p>
        <p style={{ fontSize: 17, color: "#1D1D1F", lineHeight: 1.6, marginBottom: 0 }}>
          This project is protected under a non-disclosure agreement. Case study details, designs, and outcomes are not available for public display.
        </p>
      </div>

      {/* ROLE */}
      <div style={{ marginBottom: 80 }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#86868B", marginBottom: 24 }}>
          My Role
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
          {[
            "Principal Product UX Researcher and Designer — 2 years",
            "Led end-to-end UX for the ransomware threat response portal, from discovery through to shipped product",
            "Designed urgent-first intake flows that reduced enterprise client drop-off and accelerated threat response time",
            "Conducted stakeholder interviews, heuristic evaluations, and usability testing with cybersecurity professionals",
            "Translated complex incident-response workflows into interfaces that work under extreme time pressure",
            "Collaborated directly with engineering and security leads to balance UX clarity with enterprise-grade compliance requirements",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 13, color: "#86868B", marginTop: 2, flexShrink: 0 }}>—</span>
              <p style={{ fontSize: 16, color: "#6E6E73", lineHeight: 1.6 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COMPANY LINKS */}
      <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.10)", paddingTop: 40, display: "flex", gap: 40, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 11, color: "#86868B", marginBottom: 8 }}>Company</p>
          <a href="https://www.defenseark.com/" target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 500, color: "#0066CC", textDecoration: "none" }}>
            defenseark.com ↗
          </a>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#86868B", marginBottom: 8 }}>Product</p>
          <a href="https://enigma.defenseark.com/en" target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 500, color: "#0066CC", textDecoration: "none" }}>
            Enigma Platform ↗
          </a>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#86868B", marginBottom: 8 }}>Role</p>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#1D1D1F" }}>Principal UX Researcher & Designer</p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#86868B", marginBottom: 8 }}>Duration</p>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#1D1D1F" }}>2 years</p>
        </div>
      </div>

    </div>
  );
}
