import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import SidebarComponent from "./Sidebar";
import HeaderComponent from "./Header";

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
    <div className="flex h-screen font-sans bg-[#f7f9fc]">
      <SidebarComponent
              currentPath={currentPath}
              manageRoutes={manageRoutes}
              prefRoutes={prefRoutes}
            />

      {/* Main content */}
      <main className="flex-1 bg-white overflow-y-auto px-8 py-4">
        {/* Header */}
            <HeaderComponent username="username" userId="02943" />

        <div className="flex justify-between items-center mt-4">
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
