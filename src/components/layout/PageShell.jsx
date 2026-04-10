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

  return (
    <div className="site-shell">
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <FloatingMascot />
      </Suspense>
    </div>
  );
}
