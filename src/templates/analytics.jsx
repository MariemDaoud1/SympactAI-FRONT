import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoiceInputComponent from "./VoiceInput";
import SidebarComponent from "./Sidebar";

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const [selectedPump, setSelectedPump] = useState("Centrifugal Pump 2 (CP-12398)");
  const [selectedQuarter, setSelectedQuarter] = useState("Fourth Quarter of the month");

  const pumps = [
    "Centrifugal Pump 1 (CP-12396)",
    "Centrifugal Pump 2 (CP-12398)",
    "Centrifugal Pump 3 (CP-12400)"
  ];

  const quarters = [
    "First Quarter of the month",
    "Second Quarter of the month",
    "Third Quarter of the month",
    "Fourth Quarter of the month"
  ];

  const manageRoutes = {
    Home: "/home",
    Analytics: "/analytics",
    Monitoring: "/monitoring",
    Alerts: "/alerts",
  };

  const prefRoutes = {
    Settings: "/settings",
    Help: "/help",
    "Our Service Providers": "/providers",
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <SidebarComponent
              currentPath={currentPath}
              manageRoutes={manageRoutes}
              prefRoutes={prefRoutes}
            />

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Welcome Back, Username!</h1>
            <p className="text-gray-500 text-sm">Here's what's happening with your pumps!</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 bg-gray-200">🔍</button>
            <button className="rounded-full p-2 bg-gray-200">🔔</button>
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="rounded-full w-10 h-10"
              />
              <div className="text-sm">
                <div className="font-semibold">Username</div>
                <div className="text-gray-500">ID 02943</div>
              </div>
            </div>
          </div>
        </header>

        <section className="flex justify-between items-start mb-6">
          <div>
            <p className="text-lg font-medium">You are now viewing the Pump ID:</p>
            <h2 className="text-2xl font-bold text-blue-900 mt-1">
              Centrifugal Pump 2{" "}
              <span className="text-sm font-normal text-black">(CP-12376)</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Select Your Pump:</label>
              <select
                value={selectedPump}
                onChange={(e) => setSelectedPump(e.target.value)}
                className="w-64 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow-md"
              >
                {pumps.map((pump) => (
                  <option key={pump} value={pump}>{pump}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Specify the duration:</label>
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="w-64 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow-md"
              >
                {quarters.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-br from-purple-200 to-blue-100 p-6 rounded-xl shadow-md">
          {/* <h3 className="font-semibold text-lg mb-4">
            Prediction with Operation States - {selectedQuarter}
          </h3> */}
          <div className="h-180 bg-white rounded-md flex items-center justify-center text-gray-500">
            <VoiceInputComponent/>
          </div>
        </div>
      </main>
    </div>
  );
}
