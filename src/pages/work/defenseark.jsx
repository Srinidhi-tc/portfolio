// defenseark.jsx ... DefenseARK founding designer case study
// Place in: src/pages/work/defenseark.jsx
//
// The hero image reuses the same image as the Work page thumbnail,
// so nothing about the thumbnail changes.
//
// Before publishing: update the Torus card with what you worked on, if anything.

import Kicker from "../../components/ui/Kicker";
import { workSectionProjects } from "../../data/workSectionProjects";

const heroImage = workSectionProjects.find((p) => p.id === "defenseark")?.image;

const font = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif`;
const lbl  = { fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--color-text-tertiary)", margin:0 };
const bd   = { fontSize:17, lineHeight:1.7, color:"var(--muted)", margin:"0 0 16px", maxWidth:680 };
const card = { background:"var(--surface-2)", borderRadius:12, padding:"18px 20px" };

function Section({ number, title, children }) {
  return (
    <section style={{ marginBottom:88 }}>
      {number && <Kicker style={{ marginBottom:10 }}>{number}</Kicker>}
      <h2 style={{ margin:"0 0 18px", fontSize:"clamp(26px,4vw,38px)", lineHeight:1.1, letterSpacing:"-0.5px", fontWeight:650, color:"var(--text)", maxWidth:720 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }) {
  return <p style={bd}>{children}</p>;
}

function Cards({ items, cols = 3 }) {
  return (
    <div className="da-grid" style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:16, marginTop:24 }}>
      {items.map(([title, text]) => (
        <div key={title} style={card}>
          <p style={{ fontSize:13, fontWeight:600, color:"var(--text)", margin:"0 0 6px" }}>{title}</p>
          <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.6, margin:0 }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function PullLine({ children }) {
  return (
    <div style={{ margin:"28px 0", padding:"18px 0", borderTop:"1px solid var(--hairline-weak)", borderBottom:"1px solid var(--hairline-weak)" }}>
      <p style={{ margin:0, fontSize:18, fontWeight:600, color:"var(--text)", lineHeight:1.5 }}>{children}</p>
    </div>
  );
}

const PRODUCTS = [
  {
    name: "Enigma",
    type: "Ransomware detection and client onboarding",
    my: "I owned the design handover and worked with the product manager and engineers through launch, end to end.",
    href: "https://enigma.defenseark.com/en",
  },
  {
    name: "Brightscan",
    type: "AI-powered threat scanner",
    my: "Already live when I joined. I learned the product system from it and designed around it.",
    href: "https://www.defenseark.com/products/brightscan/",
  },
  {
    name: "Torus",
    type: "Privacy-first browser extension",
    my: "Part of the DefenseARK product family.",
    href: "https://www.defenseark.com/products/torus/",
  },
];

export default function DefenseArk() {
  return (
    <div style={{ fontFamily:font, color:"var(--text)", maxWidth:1000, margin:"0 auto", padding:"32px 28px 120px", WebkitFontSmoothing:"antialiased" }}>

      {/* HERO */}
      <header style={{ marginBottom:48 }}>
        <p style={{ ...lbl, marginBottom:14 }}>
          DefenseARK Cybersecurity · A Metasquare Inc company · New York (remote from India)
        </p>
        <h1 style={{ fontSize:"clamp(40px,7vw,68px)", fontWeight:700, letterSpacing:"-1px", lineHeight:1.02, margin:"0 0 20px", color:"var(--text)" }}>
          Solo designer at a cybersecurity startup.
        </h1>
        <p style={{ fontSize:"clamp(19px,2.6vw,24px)", fontWeight:500, color:"var(--muted)", margin:0, maxWidth:720, lineHeight:1.45 }}>
          DefenseARK is a B2B cybersecurity training company building compliance and social-engineering awareness tools for enterprise clients. As the first design hire, I built the client-intake framework and compliance training products end to end.
        </p>
      </header>

      {heroImage && (
        <img src={heroImage} alt="DefenseARK product work"
             style={{ width:"100%", display:"block", borderRadius:18, background:"var(--surface-2)", marginBottom:48 }} />
      )}

      {/* FACTS */}
      <div className="da-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:20, paddingBottom:40, marginBottom:28, borderBottom:"1px solid var(--hairline-weak)" }}>
        {[
          ["Dates",       "May 4, 2021 to June 30, 2023"],
          ["Role",        "Founding design hire"],
          ["Reported to", "Harish, Founder and Managing Director. Product Manager-Ashika"],
          ["Team",        "A design team for my first six months, then an product designer | Individual contributor"],
          ["Tools",       "Figma · Figma Variables · React/CSS Handoff"],
        ].map(([k, v]) => (
          <div key={k}>
            <p style={{ ...lbl, fontSize:10, marginBottom:6 }}>{k}</p>
            <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.5, margin:0 }}>{v}</p>
          </div>
        ))}
      </div>

      <div style={{ background:"var(--card)", border:"1px solid var(--hairline-weak)", borderRadius:12, padding:"20px 22px", marginBottom:72 }}>
        <p style={{ ...lbl, fontSize:10, marginBottom:8 }}>Business Impact</p>
        <p style={{ fontSize:15, fontWeight:600, color:"var(--text)", lineHeight:1.55, margin:0 }}>
          As the first design hire, I built the client-intake framework before being asked, because every manual intake step was a scaling cost the company would eventually have to pay for as the client base grew.
        </p>
      </div>

      {/* AT A GLANCE */}
      <section style={{ marginBottom:88 }}>
        <p style={{ ...lbl, marginBottom:16 }}>At a glance</p>
        <ol style={{ margin:0, paddingLeft:22, display:"grid", gap:10 }}>
          {[
            "Founding designer at DefenseARK, from May 2021.",
            "Built the design system for product launches.",
            "Researched how people get fooled: I had an excel for this",
            "Designed compliance training with real attack scenarios.",
            "Wrote the client intake and escalation playbook.",
            "Shipped with engineers, including the Enigma launch.",
            "Reported directly to the Managing Director.",
            "I am grateful for my steep learning at the company. The company has since grown to $7.3 million in revenue.",
          ].map((line) => (
            <li key={line} style={{ fontSize:18, fontWeight:500, color:"var(--text)", lineHeight:1.5 }}>{line}</li>
          ))}
        </ol>
      </section>

      {/* WHY I JOINED */}
      <Section number="Why I joined" title="It started with a phone call to my grandmother.">
        <P>
          Someone called my grandmother and asked for her bank account details. The caller sounded official.
          She had no way to tell the call was fake, and her banking app did nothing to help her.
        </P>
        <P>
          That call showed me where design has to be strongest: the moment a vulnerable person is being deceived.
          A banking app should make that kind of attack hard, and help people see a fake caller for what it is.
          That is an accessibility problem as much as a security one.
        </P>
        <P>
          So in May 2021, I joined DefenseARK as its first designer. Most attacks do not break code.
          They break trust. I wanted to design for the seconds when a person decides whether something is real.
        </P>
      </Section>

      {/* TWO ROLES */}
      <Section number="Two roles" title="From visual language to product research.">
        <Cards cols={2} items={[
          ["Visual and Graphic Designer · May 2021 to May 2022",
           "I designed micro-interactions and motion for mobile app features, and shipped them as React and CSS components. I built the component library and high-fidelity mockups that gave the platform one visual and motion language."],
          ["UX Researcher and Designer · May 2022 to Jun 2023",
           "I wrote the product requirement documents (PRDs), built Figma variable and component libraries, and designed new mobile features. I researched how customers respond to deception and turned it into product decisions."],
        ]} />
      </Section>

      {/* 01 DECEPTION RESEARCH */}
      <Section number="The research" title="How people get fooled.">
        <P>
          Social engineering (tricking people instead of hacking machines) works because it borrows trust.
          I analysed persuasion techniques in real attacks. Name-dropping, and using first name was the clearest example.
          An attacker says "your CEO asked me to send this," and the name does the convincing.
        </P>
        <P>
          I studied customer data to see where people slipped. I turned those insights into the information
          architecture and the instructional design for our B2B compliance training.
        </P>
        <Cards items={[
          ["Real attack scenarios", "Training used realistic situations, so people practised on the kind of message they would actually receive."],
          ["Gamified quizzes", "Short quizzes turned spotting a trick into a skill people could practise and repeat."],
          ["Built from customer data", "Every flow started from where real customers made mistakes, not from a generic checklist."],
        ]} />
        <PullLine>People do not fail security tests because they are careless. They fail because the attack is designed well. So the training has to be designed better.</PullLine>
      </Section>

      {/* 02 FOUNDATION */}
      <Section number="The foundation" title="Building the design system from zero.">
        <P>
          In my first week, i prototypes a dozen different tables for audit logs with time stamps for B2B clients. I built the pieces a growing product needs,
          so every new feature would not start from a blank page.
        </P>
        <Cards items={[
          ["PRDs", "Detailed product requirement documents, so engineers and founders agreed on what we were building before we built it."],
          ["Figma libraries", "Variables and components that kept every screen consistent and let the product scale."],
          ["Motion language", "Timing and interaction rules for enterprise screens, shipped as production React and CSS."],
          ["Product websites", "Visual design and pages for the company's products."],
          ["Data exploration tool", "An experience for exploring customer security data."],
          ["Mobile features", "New features and high-fidelity mockups for the mobile apps."],
        ]} />
      </Section>

      {/* 03 CLIENT INTAKE */}
      <Section number="Client intake" title="A clear path for clients under stress.">
        <P>
          A client who suspects an attack is stressed and in a hurry. Before, new clients did not know
          how to share files or raise issues, and our team spent time on admin instead of help.
        </P>
        <P>
          I wrote a guidelines playbook for client intake. It set out how clients share files and report
          issues through self-service, and when an issue escalates straight to the CEO.
        </P>
        <Cards items={[
          ["Self-service", "Clients could send files and report issues on their own, without waiting for a person."],
          ["Escalation path", "Clear rules for when an issue goes directly to the CEO, so urgent cases never sat in a queue."],
          ["Less admin", "A repeatable process that reduced the administrative load of onboarding each new client."],
        ]} />
      </Section>

      {/* 04 SHIPPING */}
      <Section number="Shipping" title="Designing with engineers, not handing off to them.">
        <P>
          I worked with the founders and the full-stack engineers every week. We shipped speech synthesis
          and applied linguistics in voice calls, with motion UI built in React and CSS. These audios had fake call stimulations.
        </P>
        <P>
          For Enigma, our ransomware detection and client onboarding product, I owned the design handover
          and worked with the product manager and engineers through launch. Every decision balanced
          user stories, technical limits, and what the business needed to grow.
        </P>
      </Section>

      {/* 05 BUSINESS + WINS */}
      <Section number="The business side" title="Design decisions were business decisions.">
        <P>
          I was an active part of the founding team and reported directly to Harish, our Managing Director.
          I led design from May 4, 2021 to June 30, 2023. Every design choice had a business question behind it:
          will this bring in a B2B client, and will it help us keep them?
        </P>
        <PullLine>I am delighted to share that DefenseARK has grown to $7.3 million in revenue in 2026.</PullLine>
        <p style={{ ...lbl, margin:"8px 0 0" }}>Wins</p>
        <Cards cols={2} items={[
          ["New clients", "Clearer product pages and a simpler intake made it easier for new clients to say yes."],
          ["Expansion", "The product family grew, and the design system grew with it, so each new product launched looking and working like the rest."],
          ["Credibility through SEO", "Redesigned websites made the company easier to find (SEO: showing up when clients search) and easier to trust once they arrived."],
          ["Clear product categories", "I organised the products into clear categories, so a client could find the right tool fast."],
        ]} />
      </Section>

      {/* 06 HOW WE WORKED */}
      <Section number="How we worked" title="Many designs. A few that shipped.">
        <P>
          We met every Monday and every Friday. I brought new directions to each review, often several
          versions of the same idea. Most of them never shipped, and that was the point.
        </P>
        <P>
          I reported directly to the founder. He knew the market and the customers, so he chose which
          direction to push. I learned to design for where the product would be in two years,
          not only for the next release.
        </P>
      </Section>

      {/* 07 WHAT I LEARNED */}
      <Section number="What I learned" title="Design flourishes as a team.">
        <P>
          For my first six months, I worked with other designers. After that, I was the only one.
          I could ship alone, but I missed the critique, the arguments, and the ideas that only
          appear when designers push each other.
        </P>
        <P>
          It taught me what I look for now: a studio-like team, where designers create with passion
          and each person brings a different perspective.
        </P>
        <PullLine>Being the only designer taught me to own everything. It also taught me that the best work comes from a team.</PullLine>
      </Section>

      {/* PRODUCTS */}
      <Section number="The products" title="See them live.">
        <div className="da-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {PRODUCTS.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="lift"
               style={{ ...card, display:"block", textDecoration:"none", color:"inherit" }}>
              <p style={{ ...lbl, fontSize:10, marginBottom:8 }}>{p.type}</p>
              <p style={{ fontSize:20, fontWeight:650, color:"var(--text)", margin:"0 0 10px" }}>{p.name}</p>
              <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.55, margin:"0 0 14px" }}>{p.my}</p>
              <span style={{ fontSize:13, fontWeight:600, color:"var(--link, #0066CC)" }}>Visit {p.name} ↗</span>
            </a>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <div className="da-grid" style={{ borderTop:"1px solid var(--hairline-weak)", paddingTop:36, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {[
          ["Company", "DefenseARK Cybersecurity, a Metasquare Inc company, New York"],
          ["Tools",   "Figma · React · CSS"],
          ["Products", "Enigma · Brightscan · Torus"],
        ].map(([k, v]) => (
          <div key={k}>
            <p style={{ ...lbl, fontSize:10, marginBottom:5 }}>{k}</p>
            <p style={{ fontSize:14, color:"var(--muted)", lineHeight:1.5, margin:0 }}>{v}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .da-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
