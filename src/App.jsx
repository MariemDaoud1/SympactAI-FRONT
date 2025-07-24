import LandingPage from "./pages/landing";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signUp";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/home";
import AnalyticsPage from "./pages/analytics";
import MonitoringPage from "./pages/monitoring";
import ChatbotPage from "./pages/chatbot";
import AlertsPage from "./pages/alerts";
import PumpAlertsPage from "./pages/pumpalerts";
import ReportPage from "./pages/report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/analytics/*" element={<AnalyticsPage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/chatbot" element={<ChatbotPage/>} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/pumpalerts" element={<PumpAlertsPage />} />
        <Route path="/report" element={<ReportPage />} />
        {/* Redirect unknown paths to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
