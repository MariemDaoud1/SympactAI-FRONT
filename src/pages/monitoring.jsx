import React, { useState } from "react";

export default function MonitoringPage() {
  const [selectedPump, setSelectedPump] = useState("Centrifugal Pump 1 (CP-12398)");

  return (
    <div className="flex min-h-screen font-sans bg-[#f7f9fc]">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6">
        <div className="text-3xl font-bold mb-10">
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#1e3a8a] px-2 py-1 rounded-full font-black">P</div>
            <div className="text-xl">PUMP</div>
          </div>
        </div>

        <nav className="space-y-2">
          <p className="text-sm text-gray-300 mb-2">Manage</p>
          {['Home', 'Analytics', 'Monitoring', 'Alerts'].map((item) => (
            <div
              key={item}
              className={`py-2 px-4 rounded-md ${item === 'Monitoring' ? 'bg-white text-[#1e3a8a] font-semibold' : 'hover:bg-blue-700'}`}
            >
              {item}
            </div>
          ))}

          <p className="text-sm text-gray-300 mt-6 mb-2">Preferences</p>
          {['Settings', 'Help', 'Our Service Providers'].map((item) => (
            <div key={item} className="py-2 px-4 rounded-md hover:bg-blue-700">
              {item}
            </div>
          ))}

          <div className="mt-10 text-sm">Log Out</div>
        </nav>

        <footer className="absolute bottom-4 left-6 text-xs text-gray-300">
          PumpWatch © all rights reserved 2024
        </footer>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back, Ammar!</h1>
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
                <div className="font-semibold">Ammar Labidih</div>
                <div className="text-gray-500">ID 02943</div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1e3a8a]">
            Centrifugal Pump 1 <span className="text-sm font-normal text-black">(CP-12398)</span>
          </h2>
          <select
            value={selectedPump}
            onChange={(e) => setSelectedPump(e.target.value)}
            className="px-4 py-2 rounded-md bg-[#2563eb] text-white font-semibold shadow-md"
          >
            <option>Centrifugal Pump 1 (CP-12398)</option>
            <option>Centrifugal Pump 2 (CP-12399)</option>
            <option>Centrifugal Pump 3 (CP-12400)</option>
          </select>
        </div>

        {/* Status cards */}
        <section className="grid grid-cols-3 gap-6 mb-8">
          <StatusCard title="Current Pump Status" value="ON" desc="CP-12398 Under Control" color="bg-gradient-to-r from-[#32d296] to-[#0fa9a3]" />
          <StatusCard title="Live Pressure" value="4 PSI" desc="Detecting Pressure Drops" color="bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6]" />
          <StatusCard title="Live Temperature" value="300 K" desc="Temperature is optimal" color="bg-gradient-to-r from-[#4f46e5] to-[#6366f1]" />
        </section>

        {/* Live charts */}
        <section className="grid grid-cols-2 gap-6">
          <ChartCard title="Live Pressure Values CP-12398" />
          <ChartCard title="Live Temperature Values CP-12398" />
          <ChartCard title="Live Vibration Values CP-12398" />
          <ChartCard title="Live Flow Rate Values CP-12398" />
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

function ChartCard({ title }) {
  return (
    <div className="bg-[#dbeafe] p-4 rounded-xl shadow-md">
      <h4 className="font-semibold text-sm mb-2">{title}</h4>
      <div className="h-40 bg-white rounded-md flex items-center justify-center text-gray-500">
        [Live Chart Placeholder]
      </div>
    </div>
  );
}
