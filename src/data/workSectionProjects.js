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
      tradeoffs: { subheading: "API limits", body: "Reduced real-time signals to top failures, balancing API cost with
