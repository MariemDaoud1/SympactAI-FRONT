import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlertsPage() {
  const navigate = useNavigate();
  const navItemsManage = ["Home", "Analytics", "Monitoring", "Alerts"];
  const navItemsPreferences = ["Settings", "Help", "Our Service Providers"];

  const handleNavigation = (label) => {
    const path = "/" + label.toLowerCase().replace(/\s+/g, "-");
    navigate(path);
  };

  return (
    <div className="flex h-screen font-sans text-sm">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6">
        <div className="text-3xl font-bold mb-10">
          <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <div className="bg-white text-blue-800 px-2 py-1 rounded-full font-black animate-pulse">
              <img src="/public/logo.png" alt="" />
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          <p className="text-sm text-gray-300 mb-2">Manage</p>
          {navItemsManage.map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item)}
              className={`w-full text-left py-2 px-4 rounded-md transition ${
                item === "Alerts"
                  ? "bg-white text-[#1e3a8a] font-semibold"
                  : "hover:bg-blue-700"
              }`}
            >
              {item}
            </button>
          ))}

          <p className="text-sm text-gray-300 mt-6 mb-2">Preferences</p>
          {navItemsPreferences.map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item)}
              className="w-full text-left py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => handleNavigation("logout")}
            className="mt-2 text-sm hover:text-red-400"
          >
            Log Out
          </button>
        </nav>

        <footer className="absolute bottom-4 left-6 text-xs text-gray-300">
          PumpWatch © all rights reserved 2024
        </footer>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-white overflow-y-auto px-8 py-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Welcome Back, username!</h2>
            <p className="text-gray-500 text-sm">
              Here's what's happening with your pumps!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xl">🔍</button>
            <button className="text-xl">🔔</button>
            <div className="flex items-center gap-2">
              <img
                src="/username.jpg"
                className="w-10 h-10 rounded-full object-cover"
                alt="User"
              />
              <div className="text-sm">
                <p>username</p>
                <p className="text-gray-400 text-xs">ID 02943</p>
              </div>
              <span className="text-lg">▾</span>
            </div>
          </div>
        </div>

        {/* Alerts Table Section */}
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Check Out Your Latest Alerts</h3>
              <p className="text-gray-500 text-sm">
                Select an element to view more details or to generate a summary
                report
              </p>
            </div>
            <button className="bg-[#3A60FF] text-white px-4 py-1 rounded-md">
              Saturday 16 November 2024
            </button>
          </div>

          <div className="mt-4 text-sm">
            <div className="flex justify-between text-[#3A60FF] font-semibold border-b pb-2">
              <span>Latest Pumps Errors</span>
              <span className="text-gray-400 font-normal">Latest Update 30 Sec Ago</span>
            </div>
            <table className="w-full mt-2 text-left border-collapse">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Pump Name</th>
                  <th>ID</th>
                  <th>Line</th>
                  <th>Status</th>
                  <th>Pressure</th>
                  <th>Temperature</th>
                  <th>Flow</th>
                  <th>Vibration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Centrifugal Pump 1", "CP-12398", 1, "On", "2 PSI", "365 K", "1.2 kg/s", "0.05 pk"],
                  ["Centrifugal Pump 2", "CP-12376", 1, "MT", "3 PSI", "365 K", "1.2 kg/s", "0.17 pk"],
                  ["Membrane Pump 1", "MP-2356", 3, "Off", "-", "-", "-", "-"],
                  ["Centrifugal Pump 3", "CP-3451", 1, "Off", "-", "-", "-", "-"],
                  ["Centrifugal Pump 4", "CP-4218", 5, "On", "2 PSI", "265 K", "1.2 kg/s", "0.12 pk"],
                  ["Lobe Pump 1", "LP-12398", 1, "On", "2 PSI", "365 K", "1.2 kg/s", "0.05 pk"],
                  ["Piston Pump 2", "PP-12376", 1, "MT", "3 PSI", "365 K", "1.2 kg/s", "0.17 pk"],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b">
                    {row.map((cell, i) => {
                      if (i === 0) {
                        // Pump name clickable
                        return (
                          <td key={i} className="py-2">
                            <button
                              onClick={() => navigate(`/pumps/${row[1].toLowerCase()}`)}
                              className="text-[#3A60FF] hover:underline focus:outline-none"
                              type="button"
                            >
                              {cell}
                            </button>
                          </td>
                        );
                      }
                      return (
                        <td
                          key={i}
                          className={`py-2 ${
                            i === 3 && cell === "Off"
                              ? "text-red-500"
                              : i === 3 && cell === "MT"
                              ? "text-orange-500"
                              : i === 3 && cell === "On"
                              ? "text-green-500"
                              : i === 7 && parseFloat(cell) > 0.15
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Cards Section */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Actions Required !</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#48C6EF] to-[#6F86D6] p-4 rounded-xl text-white">
              <p className="text-xs">Current Pumps ON</p>
              <p className="text-2xl font-bold mt-2">7</p>
              <p className="text-sm">of 10 Total</p>
              <div className="mt-4 bg-white h-2 w-full rounded-full">
                <div className="bg-blue-500 h-2 rounded-full w-[70%]"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#FF5858] to-[#FB8E5A] p-4 rounded-xl text-white">
              <p className="text-xs">MP-2146 Temperature Spike!</p>
              <p className="text-2xl font-bold mt-2">751 K</p>
              <p className="text-sm">
                Temperature Crossed the Limit (500 / 600 K)
              </p>
            </div>

            {/* Latest Reports */}
            <div className="col-span-1">
              <h4 className="font-semibold">View or Download Previous Reports</h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  ["CP-12398 Report", "10 November 2024", "9pm"],
                  ["CP-12376 Report", "10 November 2024", "10pm"],
                  ["DP-2356 Report", "11 November 2024", "11pm"],
                  ["VP-2356 Report", "12 November 2024", "11pm"],
                ].map(([title, date, time], i) => (
                  <div key={i} className="bg-gray-100 rounded-md p-2 text-xs">
                    <img
                      src="/report-thumb.jpg"
                      alt="Report"
                      className="rounded mb-1"
                    />
                    <p className="font-semibold">{title}</p>
                    <p>{date}</p>
                    <p>{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
