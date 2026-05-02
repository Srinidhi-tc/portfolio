import workMicrosoft from "../assets/work-microsoft.avif";
import workAiCoding from "../assets/work-ai-coding.avif";
import workStrabospot from "../assets/work-strabospot.avif";

export const projects = [
  {
    slug: "defenseark",
    title: "DefenseARK Ransomware Portal",
    company: "DefenseARK",
    image: null,
    subtitle: "Threat Response — Urgent-First UX",
    cardDescription:
      "Replacing email-based intake with an instant upload portal to accelerate ransomware threat response.",
    problem:
      "Email-based intake slowed threat response, reduced trust, and limited enterprise client acquisition (~20% drop-off).",
    overview:
      "Designed an urgent-first landing experience that surfaces an instant file upload at the top of the funnel, using behavioral urgency patterns documented in incident-response workflows.",
    outcomes: [
      "Increased inbound leads ~30%",
      "Improved enterprise trust during high-risk security incidents",
      "Web-first decision avoided app-install friction",
    ],
    methodology: [
      "Behavioral urgency pattern analysis",
      "Funnel drop-off review",
      "Comparative analysis of incident-response intake flows",
    ],
    keyLearning:
      "When time-on-task is critical, prioritizing access (web) over richness (app) protects trust during stressful moments.",
  },
  {
    slug: "microsoft",
    title: "Health Observability Monitor",
    company: "Microsoft Azure",
    image: workMicrosoft,
    subtitle: "Agentic AI for Neurodivergent Social Confidence",
    cardDescription:
      "Improving System Health Status by Reducing Time It Takes to Make Decisions",
    problem:
      "Neurodivergent people would benefit from clues in sentence structures and how to say, gestures to use when having a social small-talk. Existing conversational AI lacks mechanisms to encourage human-to-human connection rather than AI dependency.",
    audiences: [
      {
        label: "Primary",
        description:
          "Neurodivergent individuals; those struggling with gestures, facial expressions, or eye contact timing",
      },
      {
        label: "Secondary",
        description:
          "People with social anxiety; social skills improvement seekers",
      },
      {
        label: "Tertiary",
        description:
          "Non-native English speakers needing real-time conversation support",
      },
    ],
    outcomes: [
      "80% reported increased confidence in real conversations post-use",
      "Reduced preparation time through optimized prompt/response minimization",
      "100% success rate on ethics and safety compliance",
      "3x higher login frequency than ChatGPT per hour",
      "Data transparency dashboard implemented",
    ],
    methodology: [
      "Voice UX research",
      "Affinity mapping",
      "A/B testing",
      "Think-aloud protocols",
      "Continuous usability testing with actual users",
    ],
    tools: [
      "Figma",
      "Cursor.ai",
      "Firebase",
      "Visual Studio",
      "Gemini API",
      "Dialogflow",
      "English learning APIs",
    ],
    designApproach:
      "Personas development, edge case behavior mapping, dialogue flow restructuring for sub-5-second clarity",
    team: ["Gopireddy", "Avinash", "Rohan"],
    keyLearning:
      "Designing AI that encourages real human connection rather than replacing it requires careful dialogue flow design and ethical guardrails.",
  },
  {
    slug: "ai-coding",
    title: "AI Coding Interviewer",
    company: "Purdue CS",
    image: workAiCoding,
    subtitle:
      "Boosting Noticeability and Traffic in an Existing AI Coding Interview Tool",
    cardDescription:
      "How we boosted noticeability and traffic in existing AI Coding Interview Tool for a CS course at Purdue",
    problem:
      "Poor UX prevented users from understanding AI capabilities. The tool had low adoption and users couldn't leverage its full potential.",
    overview:
      "Grounding design decisions in heuristic evaluation and comparative analysis, this project delivered UX improvements that clarified system behavior, reduced cognitive load, and supported continuous learning.",
    outcomes: [
      "Better retention of Brand Identity",
      "Survey Method and Results",
      "Measuring Average Student Learning Outcomes",
    ],
    impact:
      "Translated complex AI API outputs into clear, learnable user experiences through structured interaction design and system feedback.",
    achievements: [
      "Reduced onboarding friction",
      "Improved feedback loops for continuous learning",
      "Established product differentiation",
    ],
    client: "Bobby Hodgkinson, TACC",
    team: ["Linh Pham", "Strim Claire", "Paul Parsons"],
    challenge:
      "Poor UX prevented users from understanding AI capabilities. Redesigned UX with guided onboarding and structured responses.",
    keyLearning:
      "Not everybody might be interested in detailed process of product design... they would love to see results.",
  },
  {
    slug: "strabospot",
    title: "StraboSpot — GIS Data",
    company: "StraboSpot",
    image: workStrabospot,
    subtitle:
      "UX Secrets to Making Geo-Data Feel Human Again",
    cardDescription:
      "UX secrets to making Geo-data feel human again: Increasing Intuitive Use through Heuristic Analysis and Interviews",
    problem:
      "Interaction friction and visibility gaps limited exploration and insight sharing — excessive clicks, hidden tools, unclear context switching, and overwhelming textual information.",
    overview:
      "StraboSpot is a geospatial data collection and visualization tool used by 12k geologists to document, analyze, and interpret field observations.",
    keyInsight:
      "Through UX audit and five expert interviews, researchers found that geologists tolerate visual density but struggle with interaction inefficiency or poor information hierarchy.",
    outcomes: [
      "Speed increase and click reduction",
      "Redesign that preserved analytical depth while improving workflow",
      "Consistency with Apple UI Standards (iPad-based access)",
    ],
    methodology: [
      "Heuristic Evaluation",
      "UX Audit",
      "Comparative Analysis",
      "Testing Interviews",
      "Design recommendations and survey development",
    ],
    challenge:
      "Initial visibility-focused approach shifted toward progressively revealing information, reducing initial shock while preserving expert-level depth after discovering users were overwhelmed rather than unable to locate tools.",
    client: "Doug",
    team: ["Martin Claire (StraboSpot)", "Linh Pham", "Strim Claire", "Paul Parsons"],
    links: {
      prototypes: "Rejected Prototypes (Figma board)",
      slides: "Project Slides (Google Presentation)",
    },
    keyLearning:
      "Gained experience as a design lead in a startup environment, learning to translate design thinking into business metrics and cross-collaborate across disciplines.",
  },
  {
    slug: "psychosis-literacy",
    title: "Psychosis Psychoeducation App",
    company: "Purdue Capstone",
    image: null,
    subtitle:
      "Closing the gap between research-grade psychosis care and the apps teens actually open.",
    cardDescription:
      "A youth-first mobile companion (ages 15–25) for early-psychosis education, EMA self-checks, and safe peer/caregiver pathways.",
    overview:
      "A capstone-driven mobile app concept for ages 15–25 designed to expand access to early-psychosis education and self-management. Surfaces age-appropriate psychoeducation, simulations, symptom tracking, and moderated peer/caregiver pathways — building a low-stigma bridge between research-grade interventions and an app a young person will actually open.",
    problem:
      "Adolescence is when most mental-health problems emerge, yet cost, geography, stigma, and time keep youth from timely care. Existing psychosis apps live in research, not app stores, and the few public ones aren't maintained or designed for how teens actually learn.",
    audiences: [
      {
        label: "Primary",
        description:
          "Young people 15–25 with first-episode psychosis, clinical high-risk (CHR) states, or early prodromal symptoms.",
      },
      {
        label: "Secondary",
        description:
          "Caregivers and family members supporting a young person at risk.",
      },
      {
        label: "Tertiary",
        description:
          "Clinicians and youth-program staff who want a take-home companion to reinforce in-session education.",
      },
    ],
    outcomes: [
      "70%+ recall of three psychosis warning signs after a single 90-second animated module (design target, grounded in adolescent micro-learning research).",
      "2× engagement retention vs. dense clinical content via modular EMA check-ins under 60 seconds (design target).",
      "<3 taps from any screen to a crisis-escalation pathway, validated against safety-by-design heuristics.",
      "0 unsupervised peer-to-peer surfaces in the architecture — every social touchpoint routes through moderation.",
      "iOS + Android parity with offline-readable psychoeducation modules so reach isn't gated on connectivity.",
    ],
    methodology: [
      "Literature synthesis",
      "Gap analysis",
      "Co-design framing",
      "Youth-centered content design",
      "Safety & privacy review",
      "EMA / symptom-tracking design",
    ],
    tools: ["Figma", "Miro", "Notion", "Zotero", "Otter", "Claude"],
    designApproach:
      "Designed around a chasm in the literature: psychosis tools mature in research never reach the consumer market, and the public ones go stale fast. The app was scoped to be co-designed, modular, and updateable — animated explainers and lived-experience narratives to reduce stigma, EMA self-checks tied to clinical scales, in-app crisis escalation, and moderated social pathways with safety controls. Privacy-by-design and clear care handoffs were treated as load-bearing, not optional.",
    challenge:
      "The hardest tension was between evidence rigor and youth-friendly engagement: clinical-grade content tends to be dense and stigmatizing, while engaging youth content can drift from the evidence base. I resolved it by treating each module as a translation layer — clinical scaffolding underneath, age-appropriate framing on top — and by explicitly building safe-by-default escalation paths so the engagement layer never replaces professional care.",
    client: "Dr. Shobham Shah (Faculty Advisor) · Purdue HCI",
    team: ["Solo (individual contributor)"],
    keyLearning:
      "Designing for youth mental health means accepting that engagement and evidence pull in opposite directions — and the job is to make them load-bearing for each other, not pick one.",
  },
];
