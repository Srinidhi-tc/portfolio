const rows = [
  {
    project: "StraboSpot",
    overview:
      "StraboSpot is the largest centralized geologic field-data repository in the US, an NSF-funded platform an estimated 12,000 geologists rely on to cross-reference prior field data before their own research.",
    role:
      "I focused on cross-functional user flows because duplicated fieldwork is the real cost here, every friction point in data retrieval is researcher time and grant funding spent re-discovering what already exists.",
  },
  {
    project: "TACC",
    overview:
      "TACC is a national NSF-funded supercomputing center whose education programs (Code@TACC, Little Bots AI) extend AI and robotics access to Title I and underrepresented students.",
    role:
      "I prioritized onboarding clarity and scaffolded feedback because the real risk wasn't a weak feature, it was a first-time, underrepresented student disengaging in the first five minutes. Retention at that moment is the metric that matters most.",
  },
  {
    project: "Microsoft Azure",
    overview:
      "Microsoft Azure is one of the world's largest enterprise cloud platforms, serving intelligent cloud infrastructure to organizations globally.",
    role:
      "I designed for decision speed specifically because engineering time is the most expensive resource on this team, every second an engineer spends parsing an unclear interface is a cost the business is already tracking.",
  },
  {
    project: "DefenseARK",
    overview:
      "DefenseARK is a B2B cybersecurity training company building compliance and social-engineering awareness tools for enterprise clients.",
    role:
      "As the first design hire, I built the client-intake framework before being asked, because every manual intake step was a scaling cost the company would eventually have to pay for as the client base grew.",
  },
  {
    project: "Malli 2.0",
    overview:
      "The toilet-cleaning robot category is valued at $287M (2025), projected to reach $1.12B by 2033 at an 18.6% CAGR, with connected/smart-home units commanding a 34% price premium over standalone devices.",
    role:
      "I designed Malli's modular, app-connected architecture specifically to capture that connected-device premium, treating smart-home integration as a pricing lever, not just a feature.",
  },
];

export default function ProjectOverviewTable() {
  return (
    <section className="project-overview-table" aria-labelledby="project-overview-heading">
      <p id="project-overview-heading" className="project-overview-table__eyebrow">
        Project Overview
      </p>
      <h2 className="project-overview-table__title">
        My role, framed with business reasoning.
      </h2>

      <div className="project-overview-table__grid" role="table">
        <div className="project-overview-table__row project-overview-table__row--head" role="row">
          <div className="project-overview-table__cell project-overview-table__cell--head" role="columnheader">Project</div>
          <div className="project-overview-table__cell project-overview-table__cell--head" role="columnheader">Overview</div>
          <div className="project-overview-table__cell project-overview-table__cell--head project-overview-table__cell--reasoning" role="columnheader">
            My Role, Framed with Business Reasoning
          </div>
        </div>

        {rows.map((r) => (
          <div className="project-overview-table__row" role="row" key={r.project}>
            <div className="project-overview-table__cell project-overview-table__cell--project" role="cell" data-label="Project">
              {r.project}
            </div>
            <div className="project-overview-table__cell" role="cell" data-label="Overview">
              {r.overview}
            </div>
            <div className="project-overview-table__cell project-overview-table__cell--reasoning" role="cell" data-label="My Role, Framed with Business Reasoning">
              {r.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
