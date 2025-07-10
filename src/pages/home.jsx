import React, { useState, useEffect } from "react";
import { Bell, Search, Power, TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react";

export default function HomePage() {
  const [notifications, setNotifications] = useState(3);
  const [activeTab, setActiveTab] = useState('Home');
  const [pumpData, setPumpData] = useState([
    { name: "Centrifugal Pump 1", id: "CP-12036", line: 3, status: "OFF", pressure: 4.99, temp: "220°C", flow: "128.6", vibration: "87.3" },
    { name: "Centrifugal Pump 2", id: "CP-12037", line: 2, status: "ON", pressure: 5.12, temp: "222°C", flow: "132.4", vibration: "92.1" },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

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
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6 shadow-xl">
        <div className="text-3xl font-bold mb-10">
          <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <div className="bg-white text-blue-800 px-2 py-1 rounded-full font-black animate-pulse"><img src="/public/logo.png" alt="" /></div>
          </div>
        </div>

        <nav className="space-y-2">
          <p className="text-sm text-gray-300 mb-2">Manage</p>
          {['Home', 'Analytics', 'Monitoring', 'Alerts'].map((item) => (
            <div
              key={item}
              onClick={() => setActiveTab(item)}
              className={`py-2 px-4 rounded-md cursor-pointer transition-all duration-200 ${
                activeTab === item 
                  ? 'bg-white text-blue-800 font-semibold transform scale-105 shadow-lg' 
                  : 'hover:bg-blue-700 hover:transform hover:translate-x-1'
              }`}
            >
              {item}
            </div>
          ))}

          <p className="text-sm text-gray-300 mt-6 mb-2">Preferences</p>
          {['Settings', 'Help', 'Our Service Providers'].map((item) => (
            <div key={item} className="py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer transition-all duration-200 hover:transform hover:translate-x-1">
              {item}
            </div>
          ))}

          <div className="mt-10 text-sm cursor-pointer hover:text-red-300 transition-colors">Log Out</div>
        </nav>

        <footer className="absolute bottom-4 left-6 text-xs text-gray-300">
          Navigations © all rights reserved
        </footer>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Welcome Back, Username!</h1>
            <p className="text-gray-500 text-sm">Here's what's happening with your pumps!</p>
            <p className="text-xs text-gray-400 mt-1">
              {currentTime.toLocaleTimeString()} - {currentTime.toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 transition-colors hover:scale-110 transform">
              <Search size={20} />
            </button>
            <button 
              onClick={clearNotifications}
              className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 transition-all transform hover:scale-110 relative"
            >
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {notifications}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full hover:shadow-md transition-shadow">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="rounded-full w-10 h-10"
              />
              <div className="text-sm">
                <div className="font-semibold">username</div>
                <div className="text-gray-500">ID 0234</div>
              </div>
            </div>
          </div>
        </header>

        {/* Overview cards */}
        <section className="grid grid-cols-3 gap-6 mb-8">
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