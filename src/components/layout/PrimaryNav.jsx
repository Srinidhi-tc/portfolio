// PrimaryNav: Work and Gallery, stacked at the top of column 3, display size,
// bold. Hover link blue. The current page is underlined.
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/gallery", label: "Gallery" },
];

export default function PrimaryNav() {
  return (
    <nav aria-label="Primary" className="primary-nav">
      {LINKS.map(({ to, label }) => (
        <NavLink key={to} to={to} end className="primary-nav__link">
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
