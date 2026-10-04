import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/ui/SectionTitle";
import ProjectRow from "../components/work/ProjectRow";
import { CardTimePill, CardMetricInline } from "../components/work/CardMetrics";
import { workSectionProjects, workSectionViews } from "../data/workSectionProjects";

const PANEL_ID = "work-section-panel";
const CONTENT_EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

export default function WorkSection() {
  const [view, setView] = useState("problem");
  const [sectionRevealed, setSectionRevealed] = useState(false);
  const baseId = useId();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionRevealed(true); },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: [0, 0.08, 0.15] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const activeIndex = workSectionViews.findIndex((v) => v.id === view);
  const step = activeIndex < 0 ? 0 : activeIndex;

  const onTabKeyDown = useCallback(
    (e) => {
      const idx = workSectionViews.findIndex((v) => v.id === view);
      if (idx < 0) return;
      let next = idx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); next = (idx + 1) % workSectionViews.length; }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); next = (idx - 1 + workSectionViews.length) % workSectionViews.length; }
      else if (e.key === "Home") { e.preventDefault(); next = 0; }
      else if (e.key === "End") { e.preventDefault(); next = workSectionViews.length - 1; }
      else return;
      setView(workSectionViews[next].id);
      document.getElementById(`${baseId}-tab-${workSectionViews[next].id}`)?.focus();
    },
    [baseId, view],
  );

  // On the landing screen the cards are below the fold, so a toggle click would
  // change content nobody can see. Take the visitor to the first cards instead.
  const selectView = useCallback((id) => {
    setView(id);
    const panel = document.getElementById(PANEL_ID);
    if (!panel) return;
    if (panel.getBoundingClientRect().top > window.innerHeight * 0.6) {
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      panel.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`page-section work-section${sectionRevealed ? " work-section--revealed" : ""}`}
      aria-labelledby="work-section-heading"
    >
      <div className="container">
        <SectionTitle title="Work" id="work-section-heading" titleHidden />

        <div className="home-landing">
        <header className="home-intro">
          <h1 className="home-intro__headline">
            I design for moments when people can’t afford confusion.
          </h1>
          <p className="home-intro__sub">
            Product design across AI, healthcare, enterprise systems, and physical products.
          </p>
          
        </header>

        <ProjectRow />

        <h2 className="home-section-label home-landing__link">
          <a href={`#${PANEL_ID}`}>What's behind the objects? ↓</a>
        </h2>
        </div>

        {/* Grid first — toggle moves below */}
        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${view}`}
          className="work-section-panel"
        >
          <div className="work-section-grid">
            {workSectionProjects.map((project, i) => {
              const copy = project.states[view];
              const media = (
                <div className={`work-section-media${!project.image ? " work-section-media--placeholder" : ""}`}>
                  {project.image ? (
                    <img src={project.image} alt="" decoding="async" loading="lazy" />
                  ) : (
                    <span className="work-section-media-placeholder-text">{project.imageLabel ?? project.brand}</span>
                  )}
                </div>
              );

              const body = (
                <>
                  <CardTimePill id={project.id} />
                  {media}
                  <div className="work-section-card-copy">
                    <p className="work-section-brand">{project.brand}</p>
                    <div className="work-section-head">
                      <h3 className="work-section-title">{project.title}</h3>
                      {project.tags && project.tags.length > 0 && (
                        <p className="work-section-card-tags" style={{ margin:"4px 0 0", color:"var(--muted)", fontWeight:400 }}>
                          {project.tags.join(" · ")}
                        </p>
                      )}
                      <CardMetricInline id={project.id} />
                    </div>
                    <div key={view} className="work-section-card-body" style={{ transitionTimingFunction: CONTENT_EASE }}>
                      <p className="work-section-subheading">{copy.subheading}</p>
                      <p className="work-section-body">{copy.body}</p>
                    </div>
                  </div>
                </>
              );

              const cardClass = "work-section-card work-section-card--surface" + (sectionRevealed ? " work-section-card--in" : "");
              const style = { "--stagger": String(i) };

              if (project.to) {
                return <Link key={project.id} to={project.to} className={cardClass} style={style}>{body}</Link>;
              }
              return <article key={project.id} className={cardClass} style={style}>{body}</article>;
            })}
          </div>
        </div>

        <section className="home-lens" aria-labelledby="home-lens-heading">
          <h2 id="home-lens-heading" className="home-section-label">What I pay attention to</h2>
          <p className="home-lens__list">Time · Attention · Emotion · Environment · Access · Trust</p>
          <h3 className="home-lens__title">Design is more than making things usable.</h3>
          <p className="home-lens__body">
            I’m interested in what happens when time, attention, emotion, environment, access, or trust changes the way someone experiences a product.
          </p>
          <Link to="/about" className="home-lens__link">More about me →</Link>
        </section>

        {/* Toggle sits AFTER the grid — sticky bottom */}
        <div className="work-section-sticky">
          <div
            className="work-section-process"
            role="tablist"
            aria-label="Process lens: Problem through Impact"
            onKeyDown={onTabKeyDown}
          >
            <div className="work-section-process-glass">
              <div className="work-section-process-rail">
                <div
                  className="work-section-process-indicator"
                  style={{ transform: `translateX(calc(${step} * 100%))` }}
                  aria-hidden
                />
                <div className="work-section-process-steps">
                  {workSectionViews.map((v) => {
                    const selected = view === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        role="tab"
                        id={`${baseId}-tab-${v.id}`}
                        aria-selected={selected}
                        aria-controls={PANEL_ID}
                        tabIndex={selected ? 0 : -1}
                        className={`work-section-process-step${selected ? " work-section-process-step--active" : ""}`}
                        onClick={() => selectView(v.id)}
                      >
                        <span className="work-section-process-step-label">{v.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
