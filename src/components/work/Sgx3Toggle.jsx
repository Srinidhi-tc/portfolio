// Sgx3Toggle: switches between the two SGX3 clients. Plain text, no buttons,
// the active one bold and at the bottom, exactly like Work / Gallery on home.
// Rendered into the header slot so it sits at the same spot as that toggle.
import { Link } from "react-router-dom";
import { HeaderPortal } from "../layout/HeaderSlot";

const CLIENTS = {
  "ai-coding": { label: "AI Coding Tutor", to: "/work/ai-coding" },
  strabospot: { label: "StraboSpot", to: "/work/strabospot" },
};

export default function Sgx3Toggle({ active }) {
  const order = active === "ai-coding" ? ["strabospot", "ai-coding"] : ["ai-coding", "strabospot"];
  return (
    <HeaderPortal>
      <p className="header-toggle__label">SGX3 ▴ Two Concurrent Clients</p>
      <nav className="stack stack--small stack--right" aria-label="SGX3 clients">
        {order.map((key) => (
          <Link
            key={key}
            to={CLIENTS[key].to}
            aria-current={key === active ? "page" : undefined}
            data-label={CLIENTS[key].label}
            className={"home-toggle__label" + (key === active ? " home-toggle__label--active" : "")}
          >
            {CLIENTS[key].label}
          </Link>
        ))}
      </nav>
    </HeaderPortal>
  );
}
