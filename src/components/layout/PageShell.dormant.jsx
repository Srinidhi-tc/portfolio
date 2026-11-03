// PageShell.dormant.jsx
//
// Dormant content moved out of PageShell.jsx during the STACKS + Fs redesign.
// Each export below is a React component. To revive one:
//   1. Import it in PageShell.jsx: import { FloatingMascotDormant } from "./PageShell.dormant"
//   2. Render it inside the shell: <FloatingMascotDormant />
//
// Exports:
//   FloatingMascotDormant  the dog mascot (About page only), lazy-loaded
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

// Lazy-load the mascot so it doesn't block initial page render
// (keeps lottie-web out of the main bundle)
const FloatingMascot = lazy(() => import("../ui/FloatingMascot"));

export function FloatingMascotDormant() {
  const { pathname } = useLocation();
  return (
    <>
      {/* The dog (and the ball you throw to it) only live on the About page. */}
      {pathname === "/about" && (
        <Suspense fallback={null}>
          <FloatingMascot />
        </Suspense>
      )}
    </>
  );
}
