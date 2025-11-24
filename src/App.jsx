import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import StatsPage from "./pages/StatsPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/code/:code" element={<StatsPage />} />
    </Routes>
  );
}
