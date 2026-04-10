import Button from "../components/ui/Button";
import ProfilePhoto from "../components/ui/ProfilePhoto";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-layout">
          <div>
            <p className="eyebrow" style={{ marginBottom: "var(--space-sm)" }}>SRI</p>
            <h1 className="hero-name">Srinidhi Chaturvedi</h1>
            <p className="hero-subtitle">
              UX Design Professional — Master's in UX from Purdue University and
              Psychology Undergrad.
            </p>
            <p className="hero-subtitle" style={{ marginTop: "var(--space-sm)" }}>
              Two years of 0-1 Startup experience and Internships in college,
              looking forward to do data-driven work.
            </p>
            <p className="hero-interests">
              Mixed Methods Research • Statistics • Human-Centered Health Tech • I
              use AI with care
            </p>
            <div className="hero-actions">
              <Button
                href="https://drive.google.com/file/d/1sBEfmG5NuvbsdsR2yeGe1cvHGMtACWOJ/view?usp=sharing"
                variant="primary"
              >
                Resume
              </Button>
              <Button href="mailto:srinidhi.saas@gmail.com" variant="outline">
                Email Me
              </Button>
            </div>
          </div>
          <ProfilePhoto />
        </div>
      </div>
    </section>
  );
}
