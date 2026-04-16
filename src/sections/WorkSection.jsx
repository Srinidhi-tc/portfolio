import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/ui/SectionTitle";
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
      ([entry]) => {
        if (entry.isIntersecting) setSectionRevealed(true);
      },
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
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (idx + 1) % workSectionViews.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (idx - 1 + workSectionViews.length) % workSectionViews.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = workSectionViews.length - 1;
      } else {
        return;
      }

      setView(workSectionViews[next].id);
      document.getElementById(`${baseId}-tab-${workSectionViews[next].id}`)?.focus();
    },
    [baseId, view],
  );

  return (
    <section
      ref={sectionRef}
      className={`page-section work-section${sectionRevealed ? " work-section--revealed" : ""}`}
      aria-labelledby="work-section-heading"
    >
      <div className="container">
        <SectionTitle eyebrow="Selected Work" title="Work" id="work-section-heading" />

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
                        onClick={() => setView(v.id)}
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
                <div
                  className={`work-section-media${!project.image ? " work-section-media--placeholder" : ""}`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      decoding="async"
                      loading="lazy"
                    />
                  ) : (
                    <span className="work-section-media-placeholder-text">{project.imageLabel ?? project.brand}</span>
                  )}
                </div>
              );

              const body = (
                <>
                  {media}
                  <div className="work-section-card-copy">
                    <p className="work-section-brand">{project.brand}</p>
                    <h3 className="work-section-title">{project.title}</h3>
                    {project.keyword ? <span className="tag work-section-keyword">{project.keyword}</span> : null}
                    <div key={view} className="work-section-card-body" style={{ transitionTimingFunction: CONTENT_EASE }}>
                      <p className="work-section-subheading">{copy.subheading}</p>
                      <p className="work-section-body">{copy.body}</p>
                    </div>
                  </div>
                </>
              );

              const cardClass =
                "work-section-card work-section-card--surface" +
                (sectionRevealed ? " work-section-card--in" : "");

              const style = { "--stagger": String(i) };

              if (project.to) {
                return (
                  <Link
                    key={project.id}
                    to={project.to}
                    className={cardClass}
                    style={style}
                  >
                    {body}
                  </Link>
                );
              }

              return (
                <article key={project.id} className={cardClass} style={style}>
                  {body}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
