import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import CustomersPage from "./pages/CustomersPage";
import TrainingsPage from "./pages/TrainingsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/customers" replace />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/trainings" element={<TrainingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;