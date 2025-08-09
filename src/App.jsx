import LandingPage from "./templates/Landing";
import SignInPage from "./templates/signIn";
import SignUpPage from "./templates/signUp";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./templates/Home";
import AnalyticsPage from "./templates/Analytics";
import MonitoringPage from "./templates/Monitoring";
import AlertsPage from "./templates/Alerts";
import PumpAlertsPage from "./templates/PumpAlerts";
import ReportPage from "./templates/Report";
import PumpOChatbotPage from "./templates/Chatbot"; 
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
