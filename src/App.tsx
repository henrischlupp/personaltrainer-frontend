import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import CustomersPage from "./pages/CustomersPage";
import TrainingsPage from "./pages/TrainingsPage";
import CalendarPage from "./pages/CalendarPage";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/customers" replace />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/trainings" element={<TrainingsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;