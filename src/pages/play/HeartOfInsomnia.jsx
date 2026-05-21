import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/heart-of-insomnia.css";

import heroImg from "../../assets/hoi-hero.jpg";
import bannerImg from "../../assets/hoi-banner.jpg";
import prototypeImg from "../../assets/hoi-prototype.jpg";
import uiImg from "../../assets/hoi-ui.jpg";
import phasesImg from "../../assets/hoi-phases.jpg";
import debuggingImg from "../../assets/hoi-debugging.jpg";
import demoVideo from "../../assets/hoi-demo.mp4";

/**
 * Heart of Insomnia — editorial case study (Vogue / Kinfolk style).
 *
 * Content is sourced from:
 *   • "Visualizing Insomnia-Induced Cardiac Anxiety Through an Interactive
 *     Heart Prototype" (CHI 2026 interactive demo paper by Chakravarthy & Baehl)
 *   • The CGT 532 final project deck.
 *
 * Visual language is intentionally different from the rest of the site —
 * black/white + #B11226 accent, Playfair Display headlines, Inter body,
 * generous whitespace, asymmetric grids. All scoped under `.hoi`.
 */
export default function HeartOfInsomnia() {
  // Add a host class on the parent so we can neutralize the global
  // page-section padding while on this article.
  useEffect(() => {
    const host = document.body;
    host.classList.add("hoi-host");
    return () => host.classList.remove("hoi-host");
  }, []);

  // Reveal-on-scroll observer.
  const articleRef = useRef(null);
  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".hoi-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <article className="hoi" ref={articleRef}>
      {/* ----------- Sticky minimal navigation ----------- */}
      <nav className="hoi__nav" aria-label="Heart of Insomnia navigation">
        <div className="hoi__nav-inner">
          <Link to="/play" className="hoi__nav-back">
            ← Play
          </Link>
          <span className="hoi__nav-brand">Heart of Insomnia</span>
          <div className="hoi__nav-links" aria-hidden="true">
            <a href="#solution">Solution</a>
            <a href="#problem">Problem</a>
            <a href="#insight">Insight</a>
            <a href="#process">Process</a>
            <a href="#challenges">Challenges</a>
            <a href="#reflection">Reflection</a>
          </div>
        </div>
      </nav>

      {/* ----------- Hero ----------- */}
      <section className="hoi__hero" id="solution">
        <img
          className="hoi__hero-img"
          src={heroImg}
          alt="An anatomically-inspired 3D-printed heart glowing on a pedestal beside a laptop running the visualizer."
        />
        <div className="hoi__hero-overlay" aria-hidden="true" />
        <div className="hoi__hero-content">
          <p className="hoi__kicker">CHI 2026 · Interactive Demo</p>
          <h1 className="hoi__hero-title">Heart of Insomnia</h1>
          <p className="hoi__hero-sub">
            A creative heartbeat visualiser to check, witness, and calm racing
            hearts in real time — built for the moments when twelve percent of
            Americans lie awake counting their own pulse.
          </p>
        </div>
        <p className="hoi__hero-caption">
          The final interactive prototype responding to a measured pulse.
        </p>
      </section>

      {/* ----------- Final Solution intro ----------- */}
      <section className="hoi__section">
        <p className="hoi__section-label hoi-reveal">The Final Solution</p>

        <div className="hoi__two-col">
          <h2 className="hoi__section-title hoi-reveal">
            An anatomical heart that listens, then answers in light.
          </h2>
          <div>
            <p className="hoi__body hoi-reveal">
              A hollow, anatomically inspired 3D-printed heart sits on a pedestal.
              A pulse sensor reads the user's heartbeat. NeoPixel LEDs and
              synchronized audio — delivered through a small p5.js web interface
              — translate the signal into five experiential phases, from neutral
              standby to elevated anxiety to slow, rainbow-light calm.
            </p>
            <p className="hoi__body hoi-reveal">
              It isn't a medical device. It's a bedside artifact, designed for
              awareness, grounding, and emotional validation in the moments when
              clinical data would only make a racing mind race faster.
            </p>
          </div>
        </div>

        <div className="hoi__grid hoi__grid--1-2 hoi-stagger">
          <figure className="hoi__figure hoi-reveal" style={{ "--i": 0 }}>
            <img className="hoi__figure-img hoi__figure-img--tall" src={prototypeImg} alt="The prototype displaying the rainbow phase" />
            <figcaption className="hoi__caption">
              Phase three — pastel rainbow — signalling a calm, healthy heart rate.
            </figcaption>
          </figure>
          <figure className="hoi__figure hoi-reveal" style={{ "--i": 1 }}>
            <img className="hoi__figure-img" src={uiImg} alt="The p5.js heart rate visualizer interface" />
            <figcaption className="hoi__caption">
              The companion p5.js interface, where each phase plays in full.
            </figcaption>
          </figure>
          <figure className="hoi__figure hoi-reveal" style={{ "--i": 2 }}>
            <img className="hoi__figure-img" src={bannerImg} alt="The 3D-printed heart in hand with the NeoPixel LED strip" />
            <figcaption className="hoi__caption">
              The matte-white print and its NeoPixel strip — moments before the first light test.
            </figcaption>
          </figure>
        </div>

        <p className="hoi__pullquote hoi-reveal">
          What if a heartbeat could feel like care, instead of a metric?
        </p>
      </section>

      {/* ----------- Problem ----------- */}
      <section className="hoi__section" id="problem">
        <p className="hoi__section-label hoi-reveal">Problem</p>
        <h2 className="hoi__section-title hoi-reveal">
          Clinical accuracy makes a racing heart race faster.
        </h2>

        <p className="hoi__body hoi-reveal">
          Roughly twelve percent of Americans live with chronic insomnia. Lying
          awake, the body's signals — elevated heart rate, shallow breath, looped
          thought — get loud. Wearable and clinical systems can measure them, but
          they speak in numbers and percentiles. For the person already anxious,
          a higher number is not feedback; it's an accelerant.
        </p>

        <div className="hoi__offset hoi-reveal">
          <figure className="hoi__figure">
            <img className="hoi__figure-img hoi__figure-img--wide" src={debuggingImg} alt="Late-night code session — debugging the audio pipeline" />
            <figcaption className="hoi__caption">
              A late session debugging the audio pipeline. Some problems can only be solved at 2:15 a.m.
            </figcaption>
          </figure>
        </div>

        <p className="hoi__body hoi-reveal">
          The gap isn't measurement. It's interpretation. There is room for a
          system that reads the same physiology a smartwatch reads, but answers
          back in colour, motion, and sound — language that the body, not the
          dashboard, understands.
        </p>
      </section>

      {/* ----------- Insight ----------- */}
      <section className="hoi__section" id="insight">
        <p className="hoi__section-label hoi-reveal">Insight</p>
        <h2 className="hoi__section-title hoi-reveal">
          Validation over diagnosis.
        </h2>

        <div className="hoi__two-col">
          <div>
            <p className="hoi__body hoi-reveal">
              In ten in-situ participant sessions, every passerby chose to
              engage. All ten understood the concept within seconds without
              instruction. They described the slow rainbow transitions as
              calming, and the experience as a presence — not a test. They
              talked about their own sleep and anxiety, freely, often
              unprompted.
            </p>
            <p className="hoi__body hoi-reveal">
              The behaviour confirmed the hypothesis: non-numeric feedback,
              when delivered through aesthetics, lowers the perceived stakes
              of self-monitoring. The artifact became permission to look.
            </p>
          </div>
          <figure className="hoi__figure hoi-reveal">
            <img className="hoi__figure-img hoi__figure-img--portrait" src={phasesImg} alt="Diagram of the four interaction phases" />
            <figcaption className="hoi__caption">
              The four phase identities, designed before any light strip was wired.
            </figcaption>
          </figure>
        </div>

        <p className="hoi__pullquote hoi-reveal">
          The participants reported feeling reassured, rather than evaluated.
        </p>
      </section>

      {/* ----------- Solution / Process ----------- */}
      <section className="hoi__section" id="process">
        <p className="hoi__section-label hoi-reveal">Process</p>
        <h2 className="hoi__section-title hoi-reveal">
          Five phases, one continuous arc.
        </h2>

        <p className="hoi__body hoi-reveal">
          Rather than continuously updating mid-cycle, each interaction triggers
          a complete sequence — encouraging brief, intentional engagement. The
          phases were composed like a song, not a sensor read-out.
        </p>

        <ol className="hoi__phases hoi-stagger">
          <li className="hoi-reveal" style={{ "--i": 0 }}>
            <span className="hoi__phase-num">i.</span>
            <div>
              <p className="hoi__phase-name">Standby</p>
              <p className="hoi__phase-body">Soft white. The artifact waits, breathing in low light.</p>
            </div>
          </li>
          <li className="hoi-reveal" style={{ "--i": 1 }}>
            <span className="hoi__phase-num">ii.</span>
            <div>
              <p className="hoi__phase-name">Reading</p>
              <p className="hoi__phase-body">A chasing red — the sensor finds the pulse.</p>
            </div>
          </li>
          <li className="hoi-reveal" style={{ "--i": 2 }}>
            <span className="hoi__phase-num">iii.</span>
            <div>
              <p className="hoi__phase-name">Anxiety</p>
              <p className="hoi__phase-body">Rapid red and blue. A racing heart, made visible.</p>
            </div>
          </li>
          <li className="hoi-reveal" style={{ "--i": 3 }}>
            <span className="hoi__phase-num">iv.</span>
            <div>
              <p className="hoi__phase-name">Calm</p>
              <p className="hoi__phase-body">Pastel rainbow. The rhythm slows; the colour broadens.</p>
            </div>
          </li>
          <li className="hoi-reveal" style={{ "--i": 4 }}>
            <span className="hoi__phase-num">v.</span>
            <div>
              <p className="hoi__phase-name">Dreaming</p>
              <p className="hoi__phase-body">Warm low light. The system rests, with the user.</p>
            </div>
          </li>
        </ol>

        <div className="hoi__grid hoi__grid--2 hoi-stagger">
          <figure className="hoi__figure hoi-reveal" style={{ "--i": 0 }}>
            <video
              className="hoi__figure-img hoi__figure-img--wide"
              src={demoVideo}
              poster={heroImg}
              controls
              preload="metadata"
              playsInline
            />
            <figcaption className="hoi__caption">
              Demo video — the complete five-phase sequence, end to end.
            </figcaption>
          </figure>
          <figure className="hoi__figure hoi-reveal" style={{ "--i": 1 }}>
            <img className="hoi__figure-img" src={prototypeImg} alt="The prototype mid-sequence" />
            <figcaption className="hoi__caption">
              The artifact mid-sequence — the heart, lit from within.
            </figcaption>
          </figure>
        </div>

        <p className="hoi__body hoi__body--narrow hoi-reveal">
          The hardware is intentionally small: Arduino, a pulse sensor, NeoPixel
          LEDs, a 3D-printed shell. The software stack is equally bounded — p5.js
          for the visual layer and the audio cues, a serial bridge for the
          Arduino. The design discipline lives in the choices around them.
        </p>
      </section>

      {/* ----------- Challenges ----------- */}
      <section className="hoi__section" id="challenges">
        <p className="hoi__section-label hoi-reveal">Challenges</p>
        <h2 className="hoi__section-title hoi-reveal">
          Iteration, until the system felt like a body.
        </h2>

        <p className="hoi__body hoi-reveal">
          Several rounds of refinement separated the first version from the one
          that participants would later describe as <em>calming</em>. The print
          walls were too thick to diffuse light — we reduced them. Internal
          supports were rigid plastic — we replaced them with reflective foam.
          Synthetic Arduino tones felt mechanical — we moved to recorded audio
          through p5.js. Audio remained the hardest piece: it was resolved at
          2:15 a.m. on the morning of the demo.
        </p>

        <div className="hoi__compare hoi-reveal">
          <div className="hoi__compare-row">
            <p className="hoi__compare-before">Synthetic Arduino tones, monotone.</p>
            <p className="hoi__compare-after">Recorded audio through p5.js, mood-matched per phase.</p>
          </div>
          <div className="hoi__compare-row">
            <p className="hoi__compare-before">Thick walls, opaque print.</p>
            <p className="hoi__compare-after">Thinner walls, beveled edges, light passes through.</p>
          </div>
          <div className="hoi__compare-row">
            <p className="hoi__compare-before">Rigid internal supports.</p>
            <p className="hoi__compare-after">Reflective foam — softer diffusion, fewer hot spots.</p>
          </div>
          <div className="hoi__compare-row">
            <p className="hoi__compare-before">Continuous mid-cycle updates.</p>
            <p className="hoi__compare-after">Complete phase sequences — intentional engagement.</p>
          </div>
          <div className="hoi__compare-row">
            <p className="hoi__compare-before">Numbers on a screen.</p>
            <p className="hoi__compare-after">Colour, motion, and breath.</p>
          </div>
        </div>
      </section>

      {/* ----------- Reflection ----------- */}
      <section className="hoi__section" id="reflection">
        <p className="hoi__section-label hoi-reveal">Reflection</p>
        <h2 className="hoi__section-title hoi-reveal">
          Designing for the body, not the dashboard.
        </h2>

        <p className="hoi__body hoi-reveal">
          The most useful finding wasn't technical. It was that simplifying
          physiological feedback — choosing colour over a number — invites
          people to talk about sleep, anxiety, and the things that keep them
          awake. The artifact made conversation possible because it removed
          the verdict.
        </p>

        <p className="hoi__body hoi-reveal">
          Future iterations point toward more accurate sensors, adaptive phase
          transitions that adjust mid-cycle, additional sleep states, and
          potentially a bedside form factor. The deeper thread is the one
          worth pulling: HCI research can answer not just <em>what</em> the
          body is doing, but <em>how</em> the body might be cared for in the
          moment it is doing it.
        </p>

        <div className="hoi__credits hoi-reveal">
          <div className="hoi__credit-block">
            <p className="hoi__credit-label">By</p>
            <p className="hoi__credit-value">Srinidhi Thirumalai Chakravarthy</p>
            <p className="hoi__credit-value">Brianna Kaleigh Baehl</p>
          </div>
          <div className="hoi__credit-block">
            <p className="hoi__credit-label">Institution</p>
            <p className="hoi__credit-value">Purdue University</p>
          </div>
          <div className="hoi__credit-block">
            <p className="hoi__credit-label">Venue</p>
            <p className="hoi__credit-value">CHI 2026 · Interactive Demo</p>
          </div>
          <div className="hoi__credit-block">
            <p className="hoi__credit-label">Tools</p>
            <p className="hoi__credit-value">Arduino · p5.js · NeoPixel · Bambu 3D print</p>
          </div>
        </div>
      </section>

      {/* ----------- End mark ----------- */}
      <div className="hoi__end">
        <p className="hoi__end-mark">⁂</p>
        <Link to="/play" className="hoi__end-back">
          Return to Play
        </Link>
      </div>
    </article>
  );
}
