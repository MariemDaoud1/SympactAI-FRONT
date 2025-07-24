import React from "react";
import {
  Bell,
  Search,
  MessageCircle,
  HelpCircle,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PumpOChatbotPage() {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6 flex flex-col justify-between shadow-lg">
        <div>
          {/* Logo Header */}
                <div className="bg-white text-blue-800 px-2 py-1 rounded-full font-black animate-pulse">
                    <img src="/public/logo.png" alt="" />
                  </div>
          <button
            className="mb-6 bg-blue-700 hover:bg-blue-600 transition-colors duration-200 w-full py-3 rounded shadow-md font-semibold"
            type="button"
          >
            + New chat
          </button>
          <ul className="space-y-6 mt-6 text-sm font-medium">
            <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 transition-colors duration-200">
              <MessageCircle size={20} />
              <span>Clear conversations</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 transition-colors duration-200">
              <HelpCircle size={20} />
              <span>Updates & FAQ</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-400 transition-colors duration-200">
              <FileText size={20} />
              <span>Pin a failure report</span>
            </li>
          </ul>
        </div>
        <div
          onClick={goBackHome}
          className="flex items-center space-x-2 text-sm cursor-pointer font-semibold hover:text-blue-400 transition-colors duration-200"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") goBackHome();
          }}
        >
          <ArrowLeft size={20} />
          <span>Go Back To PumpWATCH</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-col flex-1 bg-white shadow-inner">
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-6 border-b border-gray-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome Back, username!</h1>
            <p className="text-sm text-gray-600 mt-1">
              Here’s what’s happening with your pumps!
            </p>
          </div>
          <div className="flex items-center gap-8">
            <Search
              className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors duration-200"
              size={22}
            />
            <Bell
              className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors duration-200"
              size={22}
            />
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="rounded-full w-10 h-10 shadow"
              />
              <div className="text-sm text-right">
                <div className="font-semibold text-gray-900">username</div>
                <div className="text-gray-400 text-xs">ID 02943</div>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <section className="flex flex-col justify-center items-center flex-1 text-center px-6 sm:px-12 md:px-24 lg:px-32">
          <img
            src="/pumpo.png"
            alt="PumpO Logo"
            className="w-56 h-auto mb-10 drop-shadow-md"
          />
          <h2 className="text-3xl font-bold text-blue-900 mb-6 tracking-tight">
            How Can I Help You Today?
          </h2>
          <button
            className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-4 px-8 rounded-lg shadow-lg font-semibold flex items-center justify-center max-w-lg mx-auto hover:from-blue-800 hover:to-blue-950 transition-all duration-300"
            type="button"
          >
            Why does one of my pumps is rapidly switching between on and off ?
            <span className="ml-3 text-2xl">➡️</span>
          </button>
          <p className="mt-8 text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            PumpO®, Keep the flow, Fix the fault!. Our goal is to reduce downtime,
            optimize maintenance, improve diagnostics.
          </p>
        </section>
      </main>
    </div>
  );
}
