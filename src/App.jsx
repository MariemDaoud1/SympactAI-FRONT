import LandingPage from "./pages/landing";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signUp";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        {/* Redirect unknown paths to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
