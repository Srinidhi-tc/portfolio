import { Outlet, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Lazy-load the mascot so it doesn't block initial page render
// (keeps lottie-web out of the main bundle)
const FloatingMascot = lazy(() => import("../ui/FloatingMascot"));

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
      {/* The dog (and the ball you throw to it) only live on the About page. */}
      {pathname === "/about" && (
        <Suspense fallback={null}>
          <FloatingMascot />
        </Suspense>
      )}
    </div>
  );
}
