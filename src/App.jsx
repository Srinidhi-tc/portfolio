import { Routes, Route } from "react-router-dom";
import PageShell from "./components/layout/PageShell";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Microsoft from "./pages/work/Microsoft";
import AiCoding from "./pages/work/AiCoding";
import Strabospot from "./pages/work/Strabospot";
import PsychosisLiteracy from "./pages/work/PsychosisLiteracy";
import Malli from "./pages/work/Malli";
import BeeFeeder from "./pages/work/Beefeeder";
import HeartsOfInsomnia from "./pages/work/HeartsOfInsomnia";
import DefenseArk from "./pages/work/defenseark";

export default function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Home />} />
        <Route path="/work/microsoft" element={<Microsoft />} />
        <Route path="/work/ai-coding" element={<AiCoding />} />
        <Route path="/work/strabospot" element={<Strabospot />} />
        <Route path="/work/psychosis-literacy" element={<PsychosisLiteracy />} />
        <Route path="/work/malli" element={<Malli />} />
        <Route path="/work/bee-feeder" element={<BeeFeeder />} />
        <Route path="/work/hearts-of-insomnia" element={<HeartsOfInsomnia />} />
        <Route path="/work/defenseark" element={<DefenseArk />} />
        {/* Dormant: reachable by URL only, not linked from the home grid. */}
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
