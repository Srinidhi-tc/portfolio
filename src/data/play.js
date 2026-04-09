import playVrInterior from "../assets/play-vr-interior.gif";
import playHeartOfInsomnia from "../assets/play-heart-of-insomnia.gif";
import playButterfly from "../assets/play-butterfly.gif";
import playBranding from "../assets/play-branding.gif";
import playDigitalConfetti from "../assets/play-digital-confetti.gif";

export const playProjects = [
  {
    slug: "vr-interior",
    title: "Interior Design: VR",
    subtitle: "Before: Chaos, After: Calm",
    image: playVrInterior,
    cardDescription:
      "Before: Chaos, After: calm—The Beginner's Cost of Managing Design Business Right.",
    overview:
      "Portfolio piece showcasing interior design consultancy work with Treta Constructions, a South India-based builder managing 9-10 residential projects annually. Executed eight interior design engagements from May–December 2023, beginning with a single high-impact $2,000 color palette project for a 2-bedroom apartment in Pammal.",
    outcomes: [
      "Delivered 2 weeks ahead of schedule",
      "~18% budget savings through vendor optimization",
      "98% client satisfaction through transparent milestone tracking",
      "Enabled earlier move-in dates, reducing client storage costs",
    ],
    tools: [
      "3D rendering for pre-execution approval",
      "VR goggle simulations for post-completion walkthroughs",
      "Kanban boards and Trello for real-time labor/vendor timeline tracking",
      "Microsoft Excel for budget forecasting",
    ],
    challenges: [
      "Declined unsafe heavy fixture installations on aging building",
      "Sourced handmade materials with extended production timelines",
      "Implemented checkpoints preventing mid-project design changes",
      "Vetted 60–80 vendors across platforms (IndiaMART, UrbanClap, Yellow Pages)",
    ],
    keyInsight:
      "Designing for physical environments taught me to manage ambiguity, scope creep, and visualize dependencies early to avoid losses.",
  },
  {
    slug: "heart-of-insomnia",
    title: "Heart of Insomnia",
    subtitle: "Touch. See. Breathe.",
    image: playHeartOfInsomnia,
    cardDescription:
      "Touch. See. Breathe. The Heart That Helps You Sleep.",
    overview:
      "A sensory design project addressing the anxiety and racing heartbeats experienced by insomnia sufferers through physical prototypes with visual and tactile feedback. Not a medical intervention — creating a space where users feel seen, understood and represented during stress episodes.",
    outcomes: [
      "40% faster sleep onset through visualization and safety perception",
      "Recognizable panic reduction during interactions",
      "Intuitive grounding cues (visual/auditory) requiring no user manual",
    ],
    tools: [
      "Arduino + touch sensor for real-time biometric monitoring",
      "Blender for 3D modeling and prototyping",
      "Visual Studio and Cursor.ai for development",
      "Bambu printer for physical production",
    ],
    challenges: [
      "Audio functionality bugs",
      "3D print file transfer without recalibration",
      "Budget-constrained component sourcing",
    ],
    futureImprovements: [
      "Enhanced sensor accuracy",
      "Material/size iterations to reduce production costs",
      "Amplified audio with volume controls",
      "Guerrilla testing across varied environments",
    ],
    team: "Solo project (Brianna collaboration)",
    keyInsight:
      "Emotional design requires creating spaces where users feel seen and understood, not just solving a functional problem.",
  },
  {
    slug: "butterfly",
    title: "Butterfly Feeder",
    subtitle: "Nature's Missing Piece",
    image: playButterfly,
    cardDescription:
      "Why aren't butterflies fed like birds? Nature's Missing Piece Finally Arrives.",
    overview:
      "A 3D-printed butterfly feeder designed using bio-mimicry principles. Studied pollination patterns to inform the feeder's geometry, aiming to attract native butterfly species while addressing broader themes of stress relief and environmental awareness.",
    outcomes: [
      "Doubled butterfly visitation (plus additional bee activity)",
      "Maintenance-free operation",
      "Generated curiosity and eco-awareness during user testing phases",
    ],
    tools: [
      "3D printing with outdoor durability",
      "Bio-mimicry methodology",
      "A/B testing with parametric design variations",
      "Material/color testing",
    ],
    challenges: [
      "Difficulty attracting butterflies to plastic/PLA materials",
      "Understanding species behavior comprehensively",
      "Managing pest interference (particularly ants) during field testing",
    ],
    ethicalReflection:
      "What if butterflies stop visiting natural flowers... 3D flowers should act only as a stopping pit but never replace natural flowers.",
    futureDirections:
      "Testing alternative flower varieties and evaluating performance in diverse, uncontrolled environments like public parks and street settings.",
    keyInsight:
      "Bio-mimicry requires constant ethical reflection — technology should supplement nature, never replace it.",
  },
  {
    slug: "branding",
    title: "Branding Projects",
    subtitle: "Three Visions, One Brand",
    image: playBranding,
    cardDescription:
      "Three Visions But One Brand. The Stakeholder Tug-Of-War in Stakeholders We Resolved.",
    overview:
      "A branding initiative for PS, a low-income school in India. Tasked with transforming an open terrace space to enhance student self-esteem. Created brand strategy workshops, style guide, narrowed visual consensus to unify stakeholder values.",
    process: [
      "Development of Figma design libraries for reusable tokens",
      "VR presentation of the terrace design to achieve consensus",
      "Initial brainstorming explored: library, play area, virtual classroom, and auditorium",
      "Approved solution: an indoor stadium of olympic standards for badminton, volleyball convertible to pickleball",
    ],
    outcomes: [
      "100% stakeholder approval",
      "Decision timeline reduced by 75% through pilot studies",
      "Strengthened internal organizational clarity",
      "100% brand recognition in memory and recall testing",
    ],
    challenges: [
      "Uneven terrace flooring (2.75-foot variation)",
      "Client requirement for dirt-resistant design specifications",
      "Budget constraints and pilot testing failures for initial ideas",
    ],
    keyInsight:
      "Listening and observation rather than immediately proposing solutions. Present multiple low-fidelity prototypes to demonstrate design evolution before finalizing pixel-perfect deliverables.",
  },
  {
    slug: "digital-confetti",
    title: "Digital Confetti",
    subtitle: "Party's Newest Secret Weapon",
    image: playDigitalConfetti,
    cardDescription: "Party's Newest Secret Weapon.",
    overview:
      "An interactive digital alternative to traditional confetti using projection mapping technology, triggered by motion detection and physical buttons. Traditional confetti takes a toll on environment — the pops fail sometimes, clutter the cake and floor, and is NOT interactive because it lasts less than a second.",
    outcomes: [
      "Zero-waste alternative",
      "Cost savings on décor and materials",
      "Enhanced audience engagement and physical interaction",
      "Emotional connection creation",
    ],
    tools: [
      "Projection mapping technology",
      "p5.js for motion and light animations",
      "Arduino for physical triggers",
      "OpenWorks platform",
    ],
    methodology: [
      "Event UX testing with audience delight metrics",
      "Cost-benefit analysis validating ROI",
      "Live feedback loops during events for real-time refinement",
      "Motion tracking and human behavior observation",
    ],
    challenges: [
      {
        challenge: "Motion detection in low light",
        resolution: "Increased background screen brightness",
      },
      {
        challenge: "Mist-based projection issues",
        resolution: "Shifted to wall and body projections",
      },
    ],
    research:
      "Secondary research via Reddit, Quora, and Instagram to study creative projection applications, reducing tool acquisition costs.",
    keyInsight:
      "Interactive experiences that respond to human presence create deeper emotional connections than passive alternatives.",
  },
];
