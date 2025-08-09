import React, { useState, useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { Bell, Search, Power, TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import SidebarComponent from "./Sidebar";
import HeaderComponent from "./Header";
import ChatbotButtonComponent from "./ChatbotButton";

export default function HomePage() {

  const currentPath = window.location.pathname;
    const [selectedPump, setSelectedPump] = useState("Centrifugal Pump 1 (CP-12398)");
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
  const [notifications, setNotifications] = useState(3);
  const [pumpData, setPumpData] = useState([
    { name: "Centrifugal Pump 1", id: "CP-12036", line: 3, status: "OFF", pressure: 4.99, temp: "220°C", flow: "128.6", vibration: "87.3" },
    { name: "Centrifugal Pump 2", id: "CP-12037", line: 2, status: "ON", pressure: 5.12, temp: "222°C", flow: "132.4", vibration: "92.1" },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useNavigate();

  const navItemsManage = ["Home", "Analytics", "Monitoring", "Alerts"];

  const handleNavigation = (label) => {
    const path = "/" + label.toLowerCase().replace(/\s+/g, "-");
    navigate(path);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePumpToggle = (index) => {
    setPumpData(prev => prev.map((pump, i) => 
      i === index ? { ...pump, status: pump.status === 'ON' ? 'OFF' : 'ON' } : pump
    ));
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <SidebarComponent
        currentPath={currentPath}
        manageRoutes={manageRoutes}
        prefRoutes={prefRoutes}
      />
      {/* Main content */}
      <main className="flex-1 bg-white overflow-y-auto px-8 py-4">
          {/* Header */}
          <HeaderComponent username="username" userId="02943" />

        {/* Overview cards */}
        <section className="grid grid-cols-3 gap-6 mt-4">
          <OverviewCard 
            title="Predicted System Failure" 
            value="20%" 
            desc="System failure predicted this month" 
            color="bg-purple-200" 
            icon={<AlertTriangle className="text-purple-600" size={24} />}
          />
          <OverviewCard 
            title="Current Pumps ON" 
            value="7" 
            desc="70% of total" 
            color="bg-blue-200" 
            icon={<CheckCircle className="text-blue-600" size={24} />}
          />
          <OverviewCard 
            title="Power Usage (kWh)" 
            value="198" 
            desc="65% until system saturation" 
            color="bg-indigo-200" 
            icon={<Zap className="text-indigo-600" size={24} />}
          />
        </section>

        {/* Graphs and Reports */}
        <section className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Pump Vibration Over Operation Time</h3>
              <TrendingUp className="text-gray-400" size={20} />
            </div>
            <div className="h-40 bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="animate-pulse text-purple-600 text-lg font-semibold">Live Data</div>
                <div className="text-sm text-gray-500">Vibration: 87.3 Hz</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-4">Annual System Failure Logs</h3>
            <div className="h-40 bg-gradient-to-t from-blue-100 to-blue-200 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="text-blue-600 text-2xl font-bold">12</div>
                <div className="text-sm text-gray-500">Total Failures</div>
              </div>
            </div>
          </div>
        </section>

        {/* Error Table and Reports */}
        <section className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Latest Pumps Errors</h3>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Latest Update 30 Sec Ago
              </span>
            </div>
            <table className="w-full text-sm text-left mt-2">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="pb-2">Pump Name</th>
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Line</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Pressure</th>
                  <th className="pb-2">Temperature</th>
                  <th className="pb-2">Flow</th>
                  <th className="pb-2">Vibration</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {pumpData.map((pump, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-2">{pump.name}</td>
                    <td className="py-2">{pump.id}</td>
                    <td className="py-2">{pump.line}</td>
                    <td className={`py-2 font-semibold ${pump.status === 'OFF' ? 'text-red-500' : 'text-green-600'}`}>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${pump.status === 'OFF' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                        {pump.status}
                      </div>
                    </td>
                    <td className="py-2">{pump.pressure}</td>
                    <td className="py-2">{pump.temp}</td>
                    <td className="py-2">{pump.flow}</td>
                    <td className="py-2">{pump.vibration}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handlePumpToggle(i)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all transform hover:scale-105 ${
                          pump.status === 'OFF' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        <Power size={12} className="inline mr-1" />
                        {pump.status === 'OFF' ? 'Turn ON' : 'Turn OFF'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-4">Latest Error Reports</h3>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-2 mb-3 p-2 hover:bg-blue-50 rounded-md cursor-pointer transition-all hover:scale-105 hover:shadow-sm">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Pump"
                  className="rounded-full w-10 h-10"
                />
                <div className="text-sm flex-1">
                  <div className="font-medium">CP-278 Report</div>
                  <div className="text-gray-500">Line 3 Vibration Issue</div>
                </div>
                <div className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                  High Priority
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* Reusable Chatbot Button */}
            <ChatbotButtonComponent />
    </div>
  );
}

function OverviewCard({ title, value, desc, color, icon }) {
  return (
    <div className={`p-4 rounded-xl shadow-sm ${color} hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-800 font-bold text-2xl">{value}</div>
        {icon}
      </div>
      <div className="text-sm font-medium text-gray-700 mt-1">{title}</div>
      <div className="text-xs text-gray-600 mt-1">{desc}</div>
    </div>
  );
}
