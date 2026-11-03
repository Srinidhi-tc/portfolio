import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
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
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
