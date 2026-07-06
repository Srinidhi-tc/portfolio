import workMicrosoft from "../assets/work-microsoft.avif";
import workAiCoding from "../assets/work-ai-coding.avif";
import workStrabospot from "../assets/work-strabospot.avif";
import workPsychosis from "../assets/work-psychosis.jpg";

export const workSectionProjects = [
  {
    id: "defenseark",
    brand: "DefenseARK",
    title: "Ransomware Portal",
    keyword: "Threat Response",
    image: null,
    imageLabel: "DefenseARK",
    states: {
      problem: { subheading: "No intake system", body: "Email-based intake slowed threat response, reduced trust, and limited enterprise client acquisition (~20% drop-off)." },
      decisions: { subheading: "Urgent-first UX", body: "Designed instant file upload landing using behavioral urgency patterns in ransomware threat response workflows." },
      tradeoffs: { subheading: "Web over app", body: "Prioritized web portal over app to avoid friction, ensuring accessibility during high-risk security incidents." },
      impact: { subheading: "Trust + clients", body: "Increased inbound leads ~30% and improved enterprise trust, supporting high-value cybersecurity client acquisition." },
    },
  },
  {
    id: "microsoft",
    brand: "Microsoft Azure",
    title: "Azure Health UX",
    keyword: "SRE Systems",
    image: workMicrosoft,
    to: "/work/microsoft",
    states: {
      problem: { subheading: "Low visibility", body: "Engineers needed 4–5 steps to detect failures, increasing latency in SRE system health monitoring." },
      decisions: { subheading: "Signal clarity", body: "Introduced radial indicators and prioritized degraded signals aligned with SRE mental models." },
      tradeoffs: { subheading: "API limits", body: "Reduced real-time signals to top failures, balancing API cost with system visibility." },
      impact: { subheading: "Faster debugging", body: "Reduced detection time ~25% and improved incident response efficiency across distributed cloud systems." },
    },
  },
  {
    id: "ai-coding",
    brand: "Purdue CS",
    title: "AI Coding Interviewer",
    keyword: "AI Interaction",
    image: workAiCoding,
    to: "/work/ai-coding",
    states: {
      problem: { subheading: "Hidden capabilities", body: "Poor UX hid what the AI could do, so adoption stayed low and students never leveraged the coding-interview tool's full potential." },
      decisions: { subheading: "Heuristic-led redesign", body: "Grounded changes in heuristic evaluation and comparative analysis, adding guided onboarding and structured responses to clarify system behavior." },
      tradeoffs: { subheading: "Results over process", body: "Surfaced outcomes first instead of exposing the full AI pipeline — users wanted clear feedback, not the model's inner workings." },
      impact: { subheading: "Clearer & stickier", body: "Cut onboarding friction and cognitive load, turning opaque AI outputs into learnable feedback that supports continuous learning." },
    },
  },
  {
    id: "strabospot",
    brand: "StraboSpot",
    title: "Geo Search UX",
    keyword: "Field Data Systems",
    image: workStrabospot,
    to: "/work/strabospot",
    states: {
      problem: { subheading: "Broken discovery", body: "Fragmented search reduced engagement across 12k+ geologists, limiting access to critical field data." },
      decisions: { subheading: "Value upfront", body: "Surfaced maps, images, and datasets instantly, aligning with exploratory field research workflows." },
      tradeoffs: { subheading: "Depth vs clarity", body: "Simplified dense geological data views to improve usability over completeness in early interactions." },
      impact: { subheading: "Higher engagement", body: "Increased first-session engagement ~20% and improved dataset interaction across field research users." },
    },
  },
  {
    id: "oura",
    brand: "Oura Ring",
    title: "Behavioral Health UX",
    keyword: "Behavioral Loop",
    image: null,
    imageLabel: "Oura",
    states: {
      problem: { subheading: "Missing motivation", body: "Health tracking ignored emotional drivers, reducing long-term engagement in behavioral health loops." },
      decisions: { subheading: "Emotion-first", body: "Introduced emotional mapping and conversation tracking to reinforce positive behavioral feedback loops." },
      tradeoffs: { subheading: "Limited scope", body: "Launched English-only interaction tracking to validate behavioral model before scaling globally." },
      impact: { subheading: "Engagement boost", body: "Increased motivation signals ~18% in testing, improving perceived value of social health tracking." },
    },
  },
  {
    id: "psychosis-literacy",
    brand: "Purdue Capstone",
    title: "Psychosis Psychoeducation App",
    keyword: "Youth Mental Health",
    image: workPsychosis,
    imageLabel: "Capstone",
    to: "/work/psychosis-literacy",
    states: {
      problem: { subheading: "Care doesn't reach youth", body: "Cost, stigma, and time keep teens from timely psychosis care; existing tools live in research, not app stores." },
      decisions: { subheading: "Modular & co-designed", body: "Animated explainers, EMA self-checks, moderated peer pathways — content designed to be updateable and youth-led." },
      tradeoffs: { subheading: "Rigor vs. engagement", body: "Each module is a translation layer: clinical scaffolding underneath, age-appropriate framing on top." },
      impact: { subheading: "Targets, not vibes", body: "Scoped to <3 taps to crisis pathways, 70%+ recall after 90s modules, and 0 unsupervised peer surfaces." },
    },
  },
  {
    id: "malli",
    brand: "Sanitary Health",
    title: "Malli 2.0 — Toilet Cleaning Device",
    keyword: "Product Design",
    image: null,
    imageLabel: "Malli",
    to: "/work/malli",
    states: {
      problem: { subheading: "Cleaning gets avoided", body: "Toilet cleaning is skipped due to disgust and effort — the challenge was making it happen without a conscious decision." },
      decisions: { subheading: "Habit by design", body: "Applied behavioral economics to embed cleaning into existing rituals, removing the moment of choice entirely." },
      tradeoffs: { subheading: "Invisible vs visible", body: "Chose to hide the mechanism over showcasing it — effectiveness mattered more than product visibility." },
      impact: { subheading: "Zero friction hygiene", body: "Reduced cognitive load of cleaning ritual and increased accessibility to a clean toilet without behavior change." },
    },
  },
  {
    id: "bee-feeder",
    brand: "Solidworks",
    title: "Bee Feeder — Parametric 3D Design",
    keyword: "Parametric Design",
    image: null,
    imageLabel: "Bee Feeder",
    to: "/work/bee-feeder",
    states: {
      problem: { subheading: "Feeders ignore vision", body: "Standard feeders ignore how pollinators perceive the world — butterflies navigate using UV light, not visible colour." },
      decisions: { subheading: "UV-led redesign", body: "Journey mapping for butterfly vision revealed UV light as the primary wayfinding signal, redirecting the entire product scope." },
      tradeoffs: { subheading: "Science over aesthetics", body: "Sacrificed conventional feeder aesthetics to prioritise UV-reflective geometry that actually works for pollinators." },
      impact: { subheading: "Research-led pivot", body: "Parametric model adaptable across sizes — designed for pollinator behaviour, not human preference." },
    },
  },
  {
    id: "hearts-of-insomnia",
    brand: "Arduino · 3D Fabrication",
    title: "CHI 2026 — Hearts of Insomnia",
    keyword: "Physical Computing",
    image: null,
    imageLabel: "CHI 2026",
    to: "/work/hearts-of-insomnia",
    states: {
      problem: { subheading: "2am panic has no solution", body: "Late-night panic and insomnia are worsened by harsh lighting and the absence of calming environmental cues." },
      decisions: { subheading: "Light therapy lamp", body: "Combined Arduino, 3D fabrication, and circadian rhythm research to modulate colour temperature by time of night." },
      tradeoffs: { subheading: "Soft over smart", body: "Chose passive light modulation over app-controlled brightness — reducing friction at 2am was the priority." },
      impact: { subheading: "CHI 2026 submitted", body: "Working prototype with light therapy modes, 3D fabricated enclosure, submitted to CHI 2026." },
    },
  },
];

export const workSectionViews = [
  { id: "problem", label: "Problem" },
  { id: "decisions", label: "Decisions" },
  { id: "tradeoffs", label: "Tradeoffs" },
  { id: "impact", label: "Impact" },
];
