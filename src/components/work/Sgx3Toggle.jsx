// Sgx3Toggle: the two SGX3 clients were run together. The header says so and
// links to the other one, marked with a ▴. Rendered into the header slot, at
// the same spot as the Work / Gallery toggle on home.
import { Link } from "react-router-dom";
import { HeaderPortal } from "../layout/HeaderSlot";

const OTHER = {
  "ai-coding": { label: "StraboSpot", to: "/work/strabospot" },
  strabospot: { label: "TACC", to: "/work/ai-coding" },
};

export default function Sgx3Toggle({ active }) {
  const other = OTHER[active];
  return (
    <HeaderPortal>
      <p className="header-toggle__label">I managed 2 clients together.</p>
      <Link to={other.to} className="header-toggle__other">
        <span aria-hidden="true">▴</span> {other.label}
      </Link>
    </HeaderPortal>
  );
}
