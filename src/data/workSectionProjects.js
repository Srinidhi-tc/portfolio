import workMicrosoft from "../assets/work-microsoft.avif";
import workStrabospot from "../assets/work-strabospot.avif";

/** @typedef {'problem' | 'decisions' | 'tradeoffs' | 'impact'} WorkViewState */

/**
 * @typedef {{ subheading: string; body: string }} WorkCardStateCopy
 */

/**
 * @typedef {{
 *   id: string;
 *   brand: string;
 *   title: string;
 *   keyword: string;
 *   image: string | null;
 *   imageLabel?: string;
 *   to?: string;
 *   states: Record<WorkViewState, WorkCardStateCopy>;
 * }} WorkSectionProject
 */

/** @type {WorkSectionProject[]} */
export const workSectionProjects = [
  {
    id: "defenseark",
    brand: "DefenseARK",
    title: "Ransomware Portal",
    keyword: "Threat Response",
    image: null,
    imageLabel: "DefenseARK",
    states: {
      problem: {
        subheading: "No intake system",
        body: "Email-based intake slowed threat response, reduced trust, and limited enterprise client acquisition (~20% drop-off).",
      },
      decisions: {
        subheading: "Urgent-first UX",
        body: "Designed instant file upload landing using behavioral urgency patterns in ransomware threat response workflows.",
      },
      tradeoffs: {
        subheading: "Web over app",
        body: "Prioritized web portal over app to avoid friction, ensuring accessibility during high-risk security incidents.",
      },
      impact: {
        subheading: "Trust + clients",
        body: "Increased inbound leads ~30% and improved enterprise trust, supporting high-value cybersecurity client acquisition.",
      },
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
      problem: {
        subheading: "Low visibility",
        body: "Engineers needed 4–5 steps to detect failures, increasing latency in SRE system health monitoring.",
      },
      decisions: {
        subheading: "Signal clarity",
        body: "Introduced radial indicators and prioritized degraded signals aligned with SRE mental models.",
      },
      tradeoffs: {
        subheading: "API limits",
        body: "Reduced real-time signals to top failures, balancing API cost with system visibility.",
      },
      impact: {
        subheading: "Faster debugging",
        body: "Reduced detection time ~25% and improved incident response efficiency across distributed cloud systems.",
      },
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
      problem: {
        subheading: "Broken discovery",
        body: "Fragmented search reduced engagement across 12k+ geologists, limiting access to critical field data.",
      },
      decisions: {
        subheading: "Value upfront",
        body: "Surfaced maps, images, and datasets instantly, aligning with exploratory field research workflows.",
      },
      tradeoffs: {
        subheading: "Depth vs clarity",
        body: "Simplified dense geological data views to improve usability over completeness in early interactions.",
      },
      impact: {
        subheading: "Higher engagement",
        body: "Increased first-session engagement ~20% and improved dataset interaction across field research users.",
      },
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
      problem: {
        subheading: "Missing motivation",
        body: "Health tracking ignored emotional drivers, reducing long-term engagement in behavioral health loops.",
      },
      decisions: {
        subheading: "Emotion-first",
        body: "Introduced emotional mapping and conversation tracking to reinforce positive behavioral feedback loops.",
      },
      tradeoffs: {
        subheading: "Limited scope",
        body: "Launched English-only interaction tracking to validate behavioral model before scaling globally.",
      },
      impact: {
        subheading: "Engagement boost",
        body: "Increased motivation signals ~18% in testing, improving perceived value of social health tracking.",
      },
    },
  },
];

/** @type {readonly { id: WorkViewState; label: string }[]} */
export const workSectionViews = [
  { id: "problem", label: "Problem" },
  { id: "decisions", label: "Decisions" },
  { id: "tradeoffs", label: "Tradeoffs" },
  { id: "impact", label: "Impact" },
];
