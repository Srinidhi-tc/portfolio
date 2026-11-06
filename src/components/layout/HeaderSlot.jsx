// HeaderSlot: the top row of every page is one grid row owned by PageShell.
// Column 1 holds the S/R/I stack (always the same spot); columns 2 + 3 hold a
// slot that a page can fill with its own toggle (Work / Gallery on home, the
// SGX3 client toggle on TACC and StraboSpot), so every toggle sits at the
// exact same spot.
import { createContext, useContext } from "react";
import { createPortal } from "react-dom";

export const HeaderSlotContext = createContext(null);

export function HeaderPortal({ children }) {
  const node = useContext(HeaderSlotContext);
  return node ? createPortal(children, node) : null;
}
