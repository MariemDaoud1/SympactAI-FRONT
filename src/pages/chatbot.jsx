import React from "react";
import { Search, Bell, User } from "lucide-react";

export default function ChatbotPage() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
    <aside className="w-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6">  
            <div className="text-3xl font-bold mb-10">
          <div className="flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
            <div className="bg-white text-blue-800 px-2 py-1 rounded-full font-black animate-pulse">
              <img src="/logo.png" alt="" />
            </div>
          </div>
        </div>

        <button className="bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded mb-4 text-left">
          + New chat
        </button>

        <nav className="flex-1 space-y-2">
          <button className="hover:bg-blue-500 p-2 rounded text-left w-full">
            🗒 Clear conversations
          </button>
          <button className="hover:bg-blue-500 p-2 rounded text-left w-full">
            ℹ️ Updates & FAQ
          </button>
          <button className="hover:bg-blue-500 p-2 rounded text-left w-full">
            🖊 Pin a failure report
          </button>
        </nav>

        <div className="mt-auto">
          <a href="/dashboard" className="hover:underline">
            ⬅ Go Back To PumpWATCH
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-white flex flex-col items-center justify-center px-8 py-10">
        {/* Top Bar */}
        <header className="w-full flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-semibold">Welcome Back, username!</h2>
            <p className="text-gray-600 text-sm">Here's what's happening with your pumps!</p>
          </div>

          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-medium text-sm">username</p>
                <p className="text-xs text-gray-400">ID 029543</p>
              </div>
            </div>
          </div>
        </header>

        {/* Logo and Chat Input */}
        <div className="text-center">
          <img src="/pumpo.png" alt="PumpO" className="h-24 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-blue-900 mb-4">How Can I Help You Today?</h3>

          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Why does one of my pumps is rapidly switching between on and off ?"
              className="w-[30rem] px-4 py-3 rounded-l-full bg-blue-100 text-sm placeholder-gray-600"
            />
            <button className="bg-blue-700 hover:bg-blue-800 px-4 py-3 rounded-r-full text-white">
              ➤
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
            PumpO. Keep the flow, Fix the fault! Our goals: to reduce downtime, optimize maintenance, improve diagnostics.
          </p>
        </div>
      </main>
    </div>
  );
}
