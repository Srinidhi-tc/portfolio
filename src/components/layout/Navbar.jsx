// Dormant content for this component lives in ./Navbar.dormant
// To revive a block, import its named export and render it.
import { NavLink } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import SFClock from "../ui/SFClock";

const navItems = [
  { label: "Work",  to: "/work"  },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* The wordmark stands alone on the left; controls live on the right. */}
        <div className="navbar-left">
          <NavLink to="/" className="brand" aria-label="Srinidhi, home">
            SRI
          </NavLink>
        </div>
        <nav className="nav-links" aria-label="Main navigation">
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
