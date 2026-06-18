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
      </Route>
    </Routes>
  );
}
