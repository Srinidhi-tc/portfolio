import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
// The top bar (Navbar.jsx) is no longer rendered; its height stays as negative space.
import Footer from "./Footer";

// Dormant content for this component lives in ./PageShell.dormant
// To revive a block, import its named export and render it.

export default function PageShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Add ?guides to any URL to see the central gutter drawn over the page.
  useEffect(() => {
    const on = new URLSearchParams(window.location.search).has("guides");
    document.documentElement.classList.toggle("show-guides", on);
  }, [pathname]);

  return (
    <div className="site-shell">
      {/* On project pages the S/R/I mark sits in the top space and leads home. */}
      {pathname.startsWith("/work/") ? (
        <div className="stacks-grid shell-home">
          <Link to="/" className="sri-mark sri-mark--link" aria-label="Back to home">
            <span>S</span>
            <span>R</span>
            <span>Iː</span>
          </Link>
        </div>
      ) : (
        <div className="header-space" aria-hidden="true" />
      )}
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
