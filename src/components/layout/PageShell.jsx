import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
// The top bar (Navbar.jsx) is no longer rendered.
import Footer from "./Footer";
import { HeaderSlotContext } from "./HeaderSlot";
import GridOverlay from "./GridOverlay";
import SkyBackground from "./SkyBackground";
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

// The baseline: where this browser's font puts the baseline of 16px text
// inside a 24px line (and of the 28px S/R/I letters). Measured, not guessed,
// so objects, letters and the overlay sit on the real text baseline.
function measureBaseline(size) {
  const box = document.createElement("div");
  box.style.cssText = `position:absolute;visibility:hidden;font-size:${size};line-height:var(--space-m);`;
  box.innerHTML = 'Hg<span style="display:inline-block;width:0;height:0;vertical-align:baseline"></span>';
  document.body.appendChild(box);
  const y = box.lastChild.getBoundingClientRect().top - box.getBoundingClientRect().top;
  box.remove();
  return y;
}

// Images in content snap to a whole number of 24px lines (cropped by
// object-fit), so text after an image stays on the baseline grid.
function snapImages(root) {
  const line = 24;
  root.querySelectorAll("img:not(.home-item__object)").forEach((img) => {
    if (!img.naturalWidth || !img.clientWidth) return;
    const h = (img.clientWidth * img.naturalHeight) / img.naturalWidth;
    img.style.height = `${Math.max(line, Math.round(h / line) * line)}px`;
    img.style.objectFit = "cover";
  });
}

export default function PageShell() {
  const { pathname } = useLocation();
  const [slot, setSlot] = useState(null);
  const isHome = pathname === "/" || pathname === "/work" || pathname === "/work/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const measure = () => {
      root.style.setProperty("--bl", `${measureBaseline("var(--type-base)")}px`);
      root.style.setProperty("--bl-display", `${measureBaseline("var(--type-display)")}px`);
    };
    measure();
    // Measure again once the web font has loaded, so the result never
    // depends on load timing.
    document.fonts?.ready.then(measure);
  }, []);

  useEffect(() => {
    const main = document.querySelector(".site-main");
    if (!main) return undefined;
    const run = () => snapImages(main);
    run();
    const ro = new ResizeObserver(run);
    ro.observe(main);
    main.addEventListener("load", run, true);
    return () => { ro.disconnect(); main.removeEventListener("load", run, true); };
  }, [pathname]);

  // Keep the tab title in step with the page (same titles as the prerendered HTML).
  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const list = Array.isArray(routeMeta) ? routeMeta : routeMeta.routes || [];
    const hit = list.find((r) => r.path === path);
    if (hit?.title) document.title = hit.title;
  }, [pathname]);

  // Add ?guides to any URL to see the grid drawn over the page.
  const [guides, setGuides] = useState(false);
  useEffect(() => {
    setGuides(new URLSearchParams(window.location.search).has("guides"));
  }, [pathname]);

  return (
    <HeaderSlotContext.Provider value={slot}>
      <SkyBackground home={isHome} />
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
        {guides && <GridOverlay />}
      </div>
    </HeaderSlotContext.Provider>
  );
}
