import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Work", to: "/work" },
  { label: "Play", to: "/play" },
  { label: "Community", to: "/community" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          SRI
        </NavLink>

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
      </div>
    </header>
  );
}
