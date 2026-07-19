// Navbar.jsx — unchanged except TennisBall added after nav links
import { NavLink } from "react-router-dom";
import TennisBall from "../ui/TennisBall";

const navItems = [
  { label: "Work",  to: "/work"  },
  { label: "Play",  to: "/play"  },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          SRI
        </NavLink>
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
          {/* Tennis ball — throws to the dog on click */}
          <TennisBall />
        </nav>
      </div>
    </header>
  );
}
