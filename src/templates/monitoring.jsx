import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  Home,
  BarChart,
  Monitor,
  AlertTriangle,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MonitoringPage() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const allOption = "Show All Pumps";

  const [selectedPump, setSelectedPump] = useState("Show All Pumps");
  const [data, setData] = useState([]);
  const [allPumpData, setAllPumpData] = useState({});

  const pumpCsvMap = {
    "Centrifugal Pump 1 (CP-12398)": "/f1PETIT.csv",
    "Centrifugal Pump 2 (CP-12399)": "/f2.csv",
    "Centrifugal Pump 3 (CP-12400)": "/f3MOY.csv",
  };

  useEffect(() => {
    if (selectedPump === allOption) {
      // Clear previous states
      setData([]);
      setAllPumpData({});

      // Fetch all CSVs
      Object.entries(pumpCsvMap).forEach(([pumpName, csvFile]) => {
        fetch(csvFile)
          .then((res) => res.text())
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true,
              dynamicTyping: true,
              complete: (results) => {
                const cleaned = results.data.filter(
                  (row) => row.timestamp && row.sensor_avg !== undefined
                );
                setAllPumpData((prev) => ({
                  ...prev,
                  [csvFile]: cleaned, // Use csvFile as chartId
                }));
              },
            });
          });
      });
    } else {
      // Fetch only selected pump CSV
      const csvFile = pumpCsvMap[selectedPump];
      fetch(csvFile)
        .then((res) => res.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
              const cleaned = results.data.filter(
                (row) => row.timestamp && row.sensor_avg !== undefined
              );
              setData(cleaned);
            },
          });
        });
      setAllPumpData({});
    }
  }, [selectedPump]);

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

  // Dropdown options include "Show All Pumps"
  const pumpOptions = [allOption, ...Object.keys(pumpCsvMap)];

  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc]">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6 flex flex-col justify-between">
        <div>
          <div className="bg-white text-blue-800 px-2 py-1 rounded-full font-black animate-pulse">
            <img src="/public/logo.png" alt="" />
          </div>
          <nav className="space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Manage</p>
              <ul className="space-y-3">
                {Object.entries(manageRoutes).map(([label, path]) => {
                  const isActive = currentPath === path;
                  const Icon =
                    label === "Home"
                      ? Home
                      : label === "Analytics"
                      ? BarChart
                      : label === "Monitoring"
                      ? Monitor
                      : AlertTriangle;

                  return (
                    <li
                      key={label}
                      onClick={() => navigate(path)}
                      className={`flex items-center gap-3 cursor-pointer ${
                        isActive ? "text-blue-300 font-bold" : "hover:text-blue-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-400 mt-6 mb-1">Preferences</p>
              <ul className="space-y-3">
                {Object.entries(prefRoutes).map(([label, path]) => {
                  const isActive = currentPath === path;
                  const Icon =
                    label === "Settings"
                      ? Settings
                      : label === "Help"
                      ? HelpCircle
                      : HelpCircle;

                  return (
                    <li
                      key={label}
                      onClick={() => navigate(path)}
                      className={`flex items-center gap-3 cursor-pointer ${
                        isActive ? "text-blue-300 font-bold" : "hover:text-blue-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        <div>
          <div
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 cursor-pointer hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </div>
          <p className="text-[10px] mt-4 text-gray-400">
            PumpWatch all rights reserved 2024
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back, username!</h1>
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
                <div className="font-semibold">username</div>
                <div className="text-gray-500">ID 02943</div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1e3a8a]">
            {selectedPump === allOption ? "All Pumps" : selectedPump}{" "}
            {selectedPump !== allOption && (
              <span className="text-sm font-normal text-black">
                ({selectedPump.split("(")[1]?.replace(")", "")})
              </span>
            )}
          </h2>
          <select
            value={selectedPump}
            onChange={(e) => setSelectedPump(e.target.value)}
            className="px-4 py-2 rounded-md bg-[#2563eb] text-white font-semibold shadow-md"
          >
            {pumpOptions.map((pump) => (
              <option key={pump} value={pump}>
                {pump}
              </option>
            ))}
          </select>
        </div>

        {/* Status cards */}
        <section className="grid grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="Current Pump Status"
            value="ON"
            desc="CP-12398 Under Control"
            color="bg-gradient-to-r from-[#32d296] to-[#0fa9a3]"
          />
          <StatusCard
            title="Live Pressure"
            value="4 PSI"
            desc="Detecting Pressure Drops"
            color="bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]"
          />
          <StatusCard
            title="Live Temperature"
            value="300 K"
            desc="Temperature is optimal"
            color="bg-gradient-to-r from-[#4f46e5] to-[#6366f1]"
          />
        </section>

        {/* Live charts */}
        <section className="grid grid-cols-2 gap-6">
          {selectedPump === allOption
            ? Object.entries(allPumpData).map(([csvFile, pumpData]) => (
                <ChartCard
                  key={csvFile}
                  title={`Live Sensor Average - ${csvFile}`}
                  chartId={csvFile}
                  data={pumpData}
                />
              ))
            : (
              <ChartCard
                title={`Live Sensor Average - ${selectedPump}`}
                chartId={pumpCsvMap[selectedPump]}
                data={data}
              />
            )}
        </section>
      </main>
    </div>
  );
}

function StatusCard({ title, value, desc, color }) {
  return (
    <div className={`p-4 rounded-xl text-white shadow-md ${color}`}>
      <h4 className="text-sm mb-1 font-medium">{title}</h4>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-sm mt-1">{desc}</p>
    </div>
  );
}

function cleanChartId(filename) {
  return filename.replace(/^\//, "").replace(/\.csv$/, "");
}

function ChartCard({ title, chartId, data }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h4 className="font-semibold text-sm mb-2">{title}</h4>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sensor_avg" stroke="#2563eb" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <button
        onClick={() => {
    const cleanId = cleanChartId(chartId);
    navigate(`/monitoring/${cleanId}`);
}}

        className="mt-3 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
      >
        Show More Information
      </button>
    </div>
  );
}
