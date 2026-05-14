import Button from "../components/ui/Button";
import ProfilePhoto from "../components/ui/ProfilePhoto";
import VolleyballToy from "../components/ui/VolleyballToy";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-layout">
          <div>
            <h1 className="hero-title">
              <span className="hero-title__text">SRI</span>
              <VolleyballToy />
            </h1>
            <p className="hero-fullname">Srinidhi Chakravarthy</p>
            <p className="hero-subtitle">
              UX Design Professional — Master's in UX from Purdue University and
              Psychology Undergrad.
            </p>
            <p className="hero-interests">
              Mixed Methods Research • Statistics • Human-Centered Health Tech • I
              use AI with care
            </p>
            <div className="hero-actions">
              <Button
                href="https://srinidhi-tc.github.io/portfolio/work"
                variant="primary"
              >
                See My Work
              </Button>
            </div>
          </div>
          <ProfilePhoto />
        </div>
      </div>
    </section>
  );
}
