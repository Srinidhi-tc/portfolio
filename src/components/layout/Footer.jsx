import ContactLinks from "../ui/ContactLinks";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <p className="footer-title">What is your AI stack for vibe-coding design systems?</p>
          <ContactLinks className="footer-contact" />
          <p className="footer-text">© {new Date().getFullYear()} Srinidhi Chakravarthy. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <button
            onClick={scrollToTop}
            className="footer-link"
            style={{ background: "none", border: "none" }}
          >
            Go to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
