import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import ChatbotButtonComponent from "./ChatbotButton";

export default function MonitoringPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const allOption = "Show All Pumps";

  const [selectedPump, setSelectedPump] = useState(allOption);
  const [data, setData] = useState([]);
  const [allPumpData, setAllPumpData] = useState({});
  const [allPumps, setAllPumps] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setUser(data);
        console.log("User loaded:", data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    }
    fetchUser();
  }, []);

  const pumpCsvMap = {
    "Centrifugal Pump 1 (CP-12398)": "/f1PETIT.csv",
    "Centrifugal Pump 2 (CP-12399)": "/f2.csv",
    "Centrifugal Pump 3 (CP-12400)": "/f3MOY.csv",
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPumps() {
      try {
        const res = await fetch("http://localhost:5000/api/pumps", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setAllPumps(data);
        console.log("Pumps loaded:", data);
      } catch (err) {
        console.error("Failed to load pumps:", err);
      }
    }
    fetchPumps();
  }, []);

  useEffect(() => {
    // if (selectedPump === allOption) {
    setData([]);
    const allData = {};

    Promise.all(
      Object.entries(pumpCsvMap).map(([pumpName, csvFile]) =>
        fetch(csvFile)
          .then((res) => res.text())
          .then(
            (csvText) =>
              new Promise((resolve) =>
                Papa.parse(csvText, {
                  header: true,
                  dynamicTyping: true,
                  complete: (results) => {
                    const cleaned = results.data.filter(
                      (row) =>
                        row.timestamp !== undefined &&
                        row.timestamp !== null &&
                        row.sensor_avg !== undefined
                    );
                    resolve([csvFile, cleaned]);
                  },
                })
              )
          )
      )
    ).then((results) => {
      results.forEach(([csvFile, cleaned]) => {
        allData[csvFile] = cleaned;
      });
      setAllPumpData(allData);
    });
    // }
    // else {
    //   const csvFile = pumpCsvMap[selectedPump];
    //   fetch(csvFile)
    //     .then((res) => res.text())
    //     .then((csvText) => {
    //       Papa.parse(csvText, {
    //         header: true,
    //         dynamicTyping: true,
    //         complete: (results) => {
    //           const cleaned = results.data.filter(
    //             (row) =>
    //               row.timestamp !== undefined &&
    //               row.timestamp !== null &&
    //               row.sensor_avg !== undefined
    //           );
    //           setData(cleaned);
    //         },
    //       });
    //     });
    //   setAllPumpData({});
    // }
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
  const pumpOptions = [allOption, ...allPumps.map((pump) => pump.name)];

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
        {user && (
          <HeaderComponent
            username={user.firstName}
            lastname={user.lastName}
            userId={user._id}
          />
        )}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl font-bold text-[#1e3a8a]">
            {selectedPump === allOption ? "All Pumps" : selectedPump}{" "}
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

        {/* Status cards
        <section className="grid grid-cols-3 gap-6 mt-4">
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
        </section> */}

        {/* Live charts */}
        <section className="grid grid-cols-2 gap-6">
          {/* {selectedPump === allOption */}
          {Object.entries(allPumpData).map(([csvFile, pumpData]) => (
            <ChartCard
              key={csvFile}
              title={`Live Sensor Average - ${cleanChartId(csvFile)}`}
              chartId={csvFile}
              data={pumpData}
            />
          ))}
          {/* : (
              <ChartCard
                title={`Live Sensor Average - ${selectedPump}`}
                chartId={pumpCsvMap[selectedPump]}
                data={data}
              />
            )} */}
        </section>
      </main>

      {/* Reusable Chatbot Button */}
      <ChatbotButtonComponent />
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
            <Line
              type="monotone"
              dataKey="sensor_avg"
              stroke="#2563eb"
              dot={false}
            />
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
