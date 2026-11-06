import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// The top bar (Navbar.jsx) is no longer rendered.
import Footer from "./Footer";
import { HeaderSlotContext } from "./HeaderSlot";
import routeMeta from "../../../scripts/routes.json";

// Dormant content for this component lives in ./PageShell.dormant
// To revive a block, import its named export and render it.

const TOPPLE_MS = 420;

// S/R/I: the same spot on every page. On project pages it is the way home:
// on click the whole stack topples 23 degrees anticlockwise and settles back,
// then the home page opens.
function SriMark({ isHome }) {
  const navigate = useNavigate();
  const [toppling, setToppling] = useState(false);
  const letters = (
    <>
      <span>S</span>
      <span>R</span>
      <span>Iː</span>
    </>
  );

  if (isHome) {
    return <p className="sri-mark" aria-label="SRI, pronounced Sree">{letters}</p>;
  }

  const onClick = (e) => {
    e.preventDefault();
    if (toppling) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return navigate("/");
    setToppling(true);
    window.setTimeout(() => navigate("/"), TOPPLE_MS);
  };

  return (
    <a
      href={`${import.meta.env.BASE_URL}`}
      onClick={onClick}
      className={"sri-mark sri-mark--link" + (toppling ? " sri-mark--topple" : "")}
      aria-label="Back to home"
    >
      {letters}
    </a>
  );
}

export default function PageShell() {
  const { pathname } = useLocation();
  const [slot, setSlot] = useState(null);
  const isHome = pathname === "/" || pathname === "/work" || pathname === "/work/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Keep the tab title in step with the page (same titles as the prerendered HTML).
  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const list = Array.isArray(routeMeta) ? routeMeta : routeMeta.routes || [];
    const hit = list.find((r) => r.path === path);
    if (hit?.title) document.title = hit.title;
  }, [pathname]);

  // Add ?guides to any URL to see the central gutter drawn over the page.
  useEffect(() => {
    const on = new URLSearchParams(window.location.search).has("guides");
    document.documentElement.classList.toggle("show-guides", on);
  }, [pathname]);

  return (
    <HeaderSlotContext.Provider value={slot}>
      <div className="site-shell">
        {/* One header row on every page: S/R/I in column 1, the page's toggle
            (if it has one) in columns 2 + 3. Not sticky. */}
        <header className="stacks-grid shell-head">
          <div className="stacks-col stacks-col--1 shell-head__mark">
            <SriMark key={pathname} isHome={isHome} />
          </div>
          <div className="stacks-col stacks-col--x stack stack--small stack--right shell-head__slot" ref={setSlot} />
        </header>
        <main className="site-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </HeaderSlotContext.Provider>
  );
}
