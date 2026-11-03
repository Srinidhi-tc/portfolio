// Navbar.dormant.jsx
//
// Dormant content moved out of Navbar.jsx during the STACKS + Fs redesign.
// Each export below is a React component. To revive one:
//   1. Import it in Navbar.jsx: import { NavBall } from "./Navbar.dormant"
//   2. Render it where you want: <NavBall />
//
// Exports:
//   AboutNavLink  the "About" link that sat beside "Work"
//   NavBall       the tennis ball you throw to the dog (About page only)
import { NavLink, useLocation } from "react-router-dom";
import TennisBall from "../ui/TennisBall";

export function AboutNavLink() {
  return (
    <NavLink
      to="/about"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      About
    </NavLink>
  );
}

export function NavBall() {
  const { pathname } = useLocation();
  return (
    <>
      {/* Tennis ball — throws to the dog on click; the dog is About-only. */}
      {pathname === "/about" && <span className="nav-ball"><TennisBall /></span>}
    </>
  );
}
