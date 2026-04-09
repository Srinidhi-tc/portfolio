import { Routes, Route } from "react-router-dom";
import PageShell from "./components/layout/PageShell";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Play from "./pages/Play";
import Community from "./pages/Community";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import Microsoft from "./pages/work/Microsoft";
import AiCoding from "./pages/work/AiCoding";
import Strabospot from "./pages/work/Strabospot";

import VrInterior from "./pages/play/VrInterior";
import HeartOfInsomnia from "./pages/play/HeartOfInsomnia";
import Butterfly from "./pages/play/Butterfly";
import Branding from "./pages/play/Branding";
import DigitalConfetti from "./pages/play/DigitalConfetti";

export default function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/microsoft" element={<Microsoft />} />
        <Route path="/work/ai-coding" element={<AiCoding />} />
        <Route path="/work/strabospot" element={<Strabospot />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/vr-interior" element={<VrInterior />} />
        <Route path="/play/heart-of-insomnia" element={<HeartOfInsomnia />} />
        <Route path="/play/butterfly" element={<Butterfly />} />
        <Route path="/play/branding" element={<Branding />} />
        <Route path="/play/digital-confetti" element={<DigitalConfetti />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
