import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <p className="footer-title">Srinidhi Chaturvedi — UX Portfolio</p>
          <p className="footer-text">
            Designed and built from scratch in React for cleaner structure and smoother interactions.
          </p>
          <p className="footer-text">© {new Date().getFullYear()} Srinidhi Chaturvedi. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/srinidhi-chakravarthy/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a href="mailto:srinidhi.saas@gmail.com" className="footer-link">
            Email
          </a>
          <Link to="/community" className="footer-link">
            Community
          </Link>
          <button
            onClick={scrollToTop}
            className="footer-link"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            Go to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
