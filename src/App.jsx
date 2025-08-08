import LandingPage from "./templates/landing";
import SignInPage from "./templates/signIn";
import SignUpPage from "./templates/signUp";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./templates/home";
import AnalyticsPage from "./templates/analytics";
import MonitoringPage from "./templates/monitoring";
import AlertsPage from "./templates/alerts";
import PumpAlertsPage from "./templates/pumpalerts";
import ReportPage from "./templates/report";
import PumpOChatbotPage from "./templates/chatbot"; 
import ChartDetails from "./templates/ChartDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/monitoring/:chartId" element={<ChartDetails />} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/analytics/*" element={<AnalyticsPage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/pumpalerts" element={<PumpAlertsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/chatbot" element={<PumpOChatbotPage />} />
        {/* Redirect unknown paths to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
