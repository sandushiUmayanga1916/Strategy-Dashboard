import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative bg-gradient-to-br from-[#4b6b6b] to-[#1a2b2b] rounded-[20px] shadow-xl w-[700px] h-[400px] flex overflow-hidden border border-gray-700">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center flex-1 text-center p-8 relative">
          {/* Top Circle */}
          <div className="absolute top-[-80px] left-[-50px] w-[350px] h-[350px] bg-gradient-to-t from-[#05242A] to-[#ffffff] rounded-full opacity-60 border-4 border-black" />

          {/* Bottom Circle */}
          <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-br from-[#c0d8d8] to-transparent rounded-full" />

          {/* Text */}
          <div className="text-sm text-white/80 opacity-70">Welcome</div>
          <div className="text-sm text-white/60 mt-1 opacity-70">to</div>
          <div className="text-4xl font-light text-[#c0d8d8] mt-3 opacity-70">
            Strategy
          </div>
          <div className="text-4xl font-light text-[#c0d8d8]">Dashboard</div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-[#2a3d3d] to-[#1a2b2b] p-8">
          <div className="text-xl font-semibold text-white">Sign In</div>
          <div className="text-xs text-white/70 mt-1">
            with your google account
          </div>

          {/* Google Button */}
          <button className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-5 py-2 mt-6 rounded-full shadow-md transition">
            <FcGoogle size={24} />
            <span className="text-gray-700">Click here</span>
          </button>

          {/* Powered by */}
          <div className="absolute bottom-4 right-6 flex items-center gap-2 text-white/80 text-sm">
            <span>Powered by</span>
            <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
