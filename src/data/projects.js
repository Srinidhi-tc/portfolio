import workMicrosoft from "../assets/work-microsoft.avif";
import workAiCoding from "../assets/work-ai-coding.avif";
import workStrabospot from "../assets/work-strabospot.avif";

export const projects = [
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
];
