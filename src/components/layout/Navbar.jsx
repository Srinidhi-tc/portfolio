import { NavLink, useLocation } from "react-router-dom";
import TennisBall from "../ui/TennisBall";
import ThemeToggle from "../ui/ThemeToggle";
import SFClock from "../ui/SFClock";

const navItems = [
  { label: "Work",  to: "/work"  },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* The wordmark stands alone on the left; controls live on the right. */}
        <div className="navbar-left">
          <NavLink to="/" className="brand" aria-label="Srinidhi, home">
            SRI
          </NavLink>
        </div>
        <nav className="nav-links" aria-label="Main navigation"
             style={{ display: "flex", alignItems: "center" }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
          {/* Tennis ball — throws to the dog on click; the dog is About-only. */}
          {pathname === "/about" && <TennisBall />}
        </nav>
        {/* Clock, then the light/dark toggle at the far right edge. */}
        <div className="navbar-right">
          <SFClock />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
