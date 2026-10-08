import workMicrosoft from "../assets/work-microsoft.webp";
import workAiCoding from "../assets/work-ai-coding.webp";
import workStrabospot from "../assets/work-strabospot.webp";
import workPsychosis from "../assets/work-psychosis.webp";
import workBeeFeeder from "../assets/beefeedermain.png";
import workHeartsOfInsomnia from "../assets/work-Hearts-Of-Insomnia.png";
import workMalli from "../assets/work-Malli.png";
import workDefenseArk from "../assets/work-DefenseArk.png";

export const workSectionProjects = [
  {
    id: "microsoft",
    brand: "Microsoft Azure",
    name: "Azure Alerts",
    title: "Making Azure alerts easier to act on",
    image: workMicrosoft,
    to: "/work/microsoft",
    tags: ["Enterprise AI", "Cross-functional lead"],
    states: {
      problem: { subheading: "Low visibility", body: "Engineers needed 4–5 steps to detect failures, increasing latency in SRE system health monitoring." },
      decisions: { subheading: "Signal clarity", body: "Introduced radial indicators and prioritized degraded signals aligned with SRE mental models." },
      tradeoffs: { subheading: "API limits", body: "Reduced real-time signals to top failures, balancing API cost with system visibility." },
      impact: { subheading: "Designed for faster debugging", body: "Cut the path to spotting a failure from 4–5 steps to a single glance, handed over to the Azure team for validation." },
    },
  },
  {
    id: "ai-coding",
    brand: "SGX3",
    date: "Aug 2025 – Dec 2025",
    name: "AI Coding Tutor",
    title: "Helping beginners know what to do next",
    image: workAiCoding,
    to: "/work/ai-coding",
    tags: ["Conversation Design", "Summarisation UX"],
    states: {
      problem: { subheading: "Hidden capabilities", body: "Poor UX hid what the AI could do, so adoption stayed low and students never leveraged the coding-interview tool's full potential." },
      decisions: { subheading: "Heuristic-led redesign", body: "Grounded changes in heuristic evaluation and comparative analysis, adding guided onboarding and structured responses to clarify system behavior." },
      tradeoffs: { subheading: "Results over process", body: "Surfaced outcomes first instead of exposing the full AI pipeline, users wanted clear feedback, not the model's inner workings." },
      impact: { subheading: "Clearer & stickier", body: "Cut onboarding friction and cognitive load, turning opaque AI outputs into learnable feedback that supports continuous learning." },
    },
  },
  {
    id: "strabospot",
    brand: "SGX3 · UX Consulting",
    date: "Aug 2025 – Dec 2025",
    name: "StraboSpot",
    title: "Understanding Geologist fieldtrips in and out",
    image: workStrabospot,
    to: "/work/strabospot",
    tags: ["UX Audit", "Nielsen Heuristics"],
    states: {
      problem: { subheading: "Search was hard to scan", body: "Dense results, competing controls, and unclear links between results and the map made scientific search hard to scan, compare, and trust." },
      decisions: { subheading: "Search as the hero", body: "Made search the hero feature, with maps and images as first-class navigation and clearer filters." },
      tradeoffs: { subheading: "Context vs. density", body: "More information could improve confidence, but too much would recreate the density the audit exposed." },
      impact: { subheading: "One unified search model", body: "Brought keyword search, filters, map and list views, previews, and result ownership into one workflow, delivered as design recommendations." },
    },
  },
  {
    id: "hearts-of-insomnia",
    brand: "Arduino · 3D Fabrication",
    name: "Heart of Insomnia",
    title: "When a lamp becomes a quiet companion",
    image: workHeartsOfInsomnia,
    to: "/work/hearts-of-insomnia",
    tags: ["Healthcare UX", "Prototype"],
    states: {
      problem: { subheading: "2am panic has no solution", body: "Late-night panic and insomnia are worsened by harsh lighting and the absence of calming environmental cues." },
      decisions: { subheading: "Light therapy lamp", body: "Combined Arduino, 3D fabrication, and circadian rhythm research to modulate colour temperature by time of night." },
      tradeoffs: { subheading: "Soft over smart", body: "Chose passive light modulation over app-controlled brightness, reducing friction at 2am was the priority." },
      impact: { subheading: "CHI 2026 submitted", body: "Working prototype with light therapy modes, 3D fabricated enclosure, submitted to CHI 2026." },
    },
  },
  {
    id: "malli",
    brand: "Sanitary Health",
    name: "Malli 2.0",
    title: "Something that Doesn't exist yet",
    image: workMalli,
    to: "/work/malli",
    tags: ["Robotic-UX", "High-Fidelity Prototype"],
    states: {
      problem: { subheading: "Cleaning gets avoided", body: "Toilet cleaning is skipped due to disgust and effort, the challenge was making it happen without a conscious decision." },
      decisions: { subheading: "Habit by design", body: "Applied behavioral economics to embed cleaning into existing rituals, removing the moment of choice entirely." },
      tradeoffs: { subheading: "Invisible vs visible", body: "Chose to hide the mechanism over showcasing it, effectiveness mattered more than product visibility." },
      impact: { subheading: "Zero friction hygiene", body: "Reduced cognitive load of cleaning ritual and increased accessibility to a clean toilet without behavior change." },
    },
  },
  {
    id: "bee-feeder",
    brand: "Solidworks · Blender",
    name: "Butterfly Feeder",
    title: "Designing for the moment before a butterfly lands",
    image: workBeeFeeder,
    imageLabel: "Bee Feeder",
    to: "/work/bee-feeder",
    tags: ["Eco-friendly", "Parametric Design Iteration"],
    states: {
      problem: { subheading: "Feeders ignore vision", body: "Standard feeders ignore how pollinators perceive the world, butterflies navigate using UV light, not visible colour." },
      decisions: { subheading: "UV-led redesign", body: "Journey mapping for butterfly vision revealed UV light as the primary wayfinding signal, redirecting the entire product scope." },
      tradeoffs: { subheading: "Science over aesthetics", body: "Sacrificed conventional feeder aesthetics to prioritise UV-reflective geometry that actually works for pollinators." },
      impact: { subheading: "Research-led pivot", body: "Parametric model adaptable across sizes, designed for pollinator behaviour, not human preference." },
    },
  },
  {
    id: "psychosis-literacy",
    brand: "Purdue Capstone",
    date: "2024–2026",
    title: "Psychosis: A new POV",
    image: workPsychosis,
    imageLabel: "Capstone",
    to: "/work/psychosis-literacy",
    tags: ["Health UX", "Motion UI"],
    states: {
      problem: { subheading: "Care doesn't reach youth", body: "Cost, stigma, and time keep teens from timely psychosis care; existing tools live in research, not app stores." },
      decisions: { subheading: "Modular & co-designed", body: "Animated explainers, EMA self-checks, moderated peer pathways, content designed to be updateable and youth-led." },
      tradeoffs: { subheading: "Rigor vs. engagement", body: "Each module is a translation layer: clinical scaffolding underneath, age-appropriate framing on top." },
      impact: { subheading: "Targets, not vibes", body: "Scoped to <3 taps to crisis pathways, 70%+ recall after 90s modules, and 0 unsupervised peer surfaces." },
    },
  },
  {
    id: "defenseark",
    brand: "DefenseARK",
    date: "May 2021 – Jun 2023",
    title: "How people get fooled?",
    image: workDefenseArk,
    imageLabel: "DefenseARK",
    to: "/work/defenseark",
    tags: ["B2B Enterprise Cybersecurity", "Founding design Hire"],
    // Official product sites: text links on the thumbnail card, and wherever
    // a product name appears in the card copy.
    sites: [
      { label: "Brightscan", href: "https://www.defenseark.com/products/brightscan/" },
      { label: "Torus", href: "https://www.defenseark.com/products/torus/" },
      { label: "Enigma", href: "https://enigma.defenseark.com/en" },
    ],
    states: {
      problem: { subheading: "Design through launch", body: "Requirements, Figma system, design handover, build with engineers, launch. I built and followed brand coherence with three different products: Brightscan, Torus and Enigma." },
      decisions: { subheading: "Researched hackers' methods", body: "Studied 65 different types of persuasive tactics, so the core of the products stays strong at clients' emotional moments." },
      tradeoffs: { subheading: "Marketing came late", body: "Learnt later that the marketing team determines a lot of success in product launches. I couldn't collaborate heavily with marketing leads." },
      impact: { subheading: "2x growth", body: "2x growth, to 7.3 million USD." },
    },
  },
];

export const workSectionViews = [
  { id: "problem",   label: "Problem" },
  { id: "decisions", label: "Decisions" },
  { id: "tradeoffs", label: "Tradeoffs" },
  { id: "impact",    label: "Impact" },
];
