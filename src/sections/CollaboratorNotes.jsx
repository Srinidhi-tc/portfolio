import { useState } from "react";
import { testimonials } from "../data/testimonials";

/**
 * Replace this with the Formspree form ID once Sri has signed up at
 * https://formspree.io and created a form delivering to srinidhi.saas@gmail.com.
 * Until it's set, the form falls back to a mailto link so submissions still work.
 */
const FORMSPREE_FORM_ID = "xjglyydy";

const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${FORMSPREE_FORM_ID}`
  : null;

const FALLBACK_EMAIL = "srinidhi.saas@gmail.com";

export default function CollaboratorNotes() {
  const sorted = [...testimonials].sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? ""),
  );

  return (
    <section className="collab-notes-section" aria-labelledby="collab-notes-heading">
      <div className="container">
        <p className="case-study-label" style={{ textAlign: "center" }}>
          From the people I've worked with
        </p>
        <h2 id="collab-notes-heading" className="collab-notes-title">
          Notes from collaborators
        </h2>
        <p className="collab-notes-intro">
          Curated, not crowdsourced — every note here is from someone I've
          actually worked with. If we've collaborated and you'd like to leave
          one, the form is below; I'll review and add yours soon after.
        </p>

        <ul className="collab-notes-list">
          {sorted.map((t) => (
            <li key={t.id} className="collab-note-card">
              <blockquote className="collab-note-quote">"{t.quote}"</blockquote>
              <div className="collab-note-meta">
                <p className="collab-note-name">{t.name}</p>
                <p className="collab-note-role">
                  {[t.role, t.org].filter(Boolean).join(" · ")}
                </p>
                {t.relationship && (
                  <span className="tag collab-note-tag">{t.relationship}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="collab-notes-form-wrapper">
          <h3 className="collab-notes-form-title">Leave a note</h3>
          <p className="collab-notes-form-help">
            We've worked together? Send me a few lines. Notes are reviewed
            before they appear here, so don't worry about formatting — be
            yourself.
          </p>
          <CollaboratorForm />
        </div>
      </div>
    </section>
  );
}

function CollaboratorForm() {
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    // If Formspree isn't configured yet, fall back to opening the user's
    // mail client with a prefilled message — so the feature still works.
    if (!FORMSPREE_ENDPOINT) {
      const data = new FormData(event.currentTarget);
      const subject = encodeURIComponent("Note from a collaborator");
      const lines = [
        `Name: ${data.get("name") ?? ""}`,
        `Role: ${data.get("role") ?? ""}`,
        `Project / Org: ${data.get("org") ?? ""}`,
        `Relationship: ${data.get("relationship") ?? ""}`,
        "",
        "Note:",
        String(data.get("quote") ?? ""),
      ].join("\n");
      const body = encodeURIComponent(lines);
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("success");
      event.currentTarget.reset();
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        event.currentTarget.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(
          data?.errors?.[0]?.message ??
            "Couldn't send your note. Please try again or email me directly.",
        );
      }
    } catch (_err) {
      setStatus("error");
      setErrorMessage(
        "Network error. Please try again, or email me at " +
          FALLBACK_EMAIL +
          ".",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="collab-notes-success" role="status">
        <p className="collab-notes-success-title">Thanks — note received.</p>
        <p className="collab-notes-success-body">
          I'll review it and add it to this page. Refresh in a few days.
        </p>
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="collab-notes-form" onSubmit={handleSubmit} noValidate>
      <div className="collab-notes-field">
        <label htmlFor="collab-name">Your name</label>
        <input
          id="collab-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="e.g., Alex Patel"
        />
      </div>

      <div className="collab-notes-field-row">
        <div className="collab-notes-field">
          <label htmlFor="collab-role">Your role</label>
          <input
            id="collab-role"
            name="role"
            type="text"
            placeholder="Designer, PM, Engineer…"
          />
        </div>
        <div className="collab-notes-field">
          <label htmlFor="collab-org">Project or organization</label>
          <input
            id="collab-org"
            name="org"
            type="text"
            placeholder="Where we worked together"
          />
        </div>
      </div>

      <div className="collab-notes-field">
        <label htmlFor="collab-relationship">How we worked together</label>
        <select
          id="collab-relationship"
          name="relationship"
          defaultValue=""
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="Manager">Manager</option>
          <option value="Collaborator">Collaborator / teammate</option>
          <option value="Client">Client / stakeholder</option>
          <option value="Faculty">Faculty / mentor</option>
          <option value="Student">Student / mentee</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="collab-notes-field">
        <label htmlFor="collab-quote">Your note</label>
        <textarea
          id="collab-quote"
          name="quote"
          required
          rows={5}
          placeholder="A few sentences on what we built together, or what working with me was like."
        />
      </div>

      {/* Honeypot field — bots fill this; real users don't see it. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      />

      {status === "error" && (
        <p className="collab-notes-error" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="collab-notes-submit-row">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send note"}
        </button>
        <p className="collab-notes-form-footer">
          Goes straight to my inbox. I'll add verified notes to this page.
        </p>
      </div>
    </form>
  );
}
