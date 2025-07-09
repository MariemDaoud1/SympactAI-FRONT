import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

  return (
    <div className="flex h-screen animate-fadeIn">
      {/* Left side minimal gradient panel */}
      <div className="w-1/3 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative flex items-center justify-center transition-all duration-700 ease-in-out">

        {/* SIGN UP label and rotated SIGN IN button */}
        <div className="absolute top-1/2 right-[-112px] transform -translate-y-1/2 rotate-90 flex items-center gap-4">
          {/* SIGN UP Label */}
          <div style={{ fontSize: '20px' }} className="bg-white rounded-full px-6 py-2 shadow-md">
            <span className="text-[#6c88e8] font-bold">SIGN UP</span>
          </div>

          {/* Rotated SIGN IN Button */}
          <button style={{ fontSize: '20px' }} onClick={() => navigate('/signin')}
            className="px-6 py-2 border border-[#6c88e8] text-[#6c88e8] rounded-full text-sm font-bold transform rotate-180-translate-x-4 hover:bg-blue hover:text-white hover:border-[#f44336] transition-all duration-300"
          >
            SIGN IN
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-xs text-white">
          PumpWatch all rights reserved 2024
        </div>
      </div>

      {/* Right side form */}
      <div className="w-2/3 flex items-center justify-center bg-white animate-slideInRight">
        <form className="w-[350px] animate-fadeUp transition-all duration-700 ease-in-out space-y-4">
          {/* Logo Placeholder */}
          <div className="flex justify-center mb-4">
            <div className="w-75 h-75 rectangle-full bg-white-200 flex items-center justify-center text-white-500 text-sm font-semibold ">
              <img src="/public/logo.png" alt="" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-800">
              <Mail size={16} />
              <span>Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full border-b border-gray-400 focus:outline-none mt-1 focus:border-[#f44336] placeholder:text-gray-400 text-sm transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-800">
              <User size={16} />
              <span>Username</span>
            </label>
            <input
              type="text"
              placeholder="yourname"
              className="w-full border-b border-gray-400 focus:outline-none mt-1 focus:border-[#f44336] placeholder:text-gray-400 text-sm transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-800">
              <Lock size={16} />
              <span>Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border-b border-gray-400 focus:outline-none mt-1 focus:border-[#f44336] placeholder:text-gray-400 text-sm transition-colors"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-800">
              <Lock size={16} />
              <span>Confirm</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border-b border-gray-400 focus:outline-none mt-1 focus:border-[#f44336] placeholder:text-gray-400 text-sm transition-colors"
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 accent-[#f44336]"
              />
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#6c88e8] text-white px-6 py-2 rounded-full w-full hover:bg-[#f44336] transition-colors duration-300"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}
