// PrimaryNav: Work and Gallery, stacked at the top of column 3, display size,
// bold. Hover link blue. The current page is uppercase and underlined (casing
// in CSS; data-label reserves the uppercase width so nothing shifts).
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/gallery", label: "Gallery" },
];

export default function PrimaryNav() {
  return (
    <nav aria-label="Primary" className="primary-nav">
      {LINKS.map(({ to, label }) => (
        <NavLink key={to} to={to} end className="primary-nav__link" data-label={label}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
