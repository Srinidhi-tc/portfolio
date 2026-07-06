import { Routes, Route, Navigate } from "react-router-dom";
import PageShell from "./components/layout/PageShell";
import Work from "./pages/Work";
import Play from "./pages/Play";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Microsoft from "./pages/work/Microsoft";
import AiCoding from "./pages/work/AiCoding";
import Strabospot from "./pages/work/Strabospot";
import PsychosisLiteracy from "./pages/work/PsychosisLiteracy";
import Malli from "./pages/work/Malli";
import BeeFeeder from "./pages/work/BeeFeeder";
import HeartsOfInsomnia from "./pages/work/HeartsOfInsomnia";

export default function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route path="/" element={<Navigate to="/work" replace />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/microsoft" element={<Microsoft />} />
        <Route path="/work/ai-coding" element={<AiCoding />} />
        <Route path="/work/strabospot" element={<Strabospot />} />
        <Route path="/work/psychosis-literacy" element={<PsychosisLiteracy />} />
        <Route path="/play" element={<Play />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/work/malli" element={<Malli />} />
        <Route path="/work/bee-feeder" element={<BeeFeeder />} />
        <Route path="/work/hearts-of-insomnia" element={<HeartsOfInsomnia />} />
      </Route>
    </Routes>
  );
}
