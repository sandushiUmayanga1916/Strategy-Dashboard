import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(
        "https://eyqi6vd53z.us-east-2.awsapprunner.com/auth/login"
      );

      // Check if response is ok
      if (!response.ok) {
        const text = await response.text(); // get raw text from server
        console.error("Server returned non-200:", text);
        alert("Login failed: " + text);
        return;
      }

      const data = await response.json();

      if (data.auth_url) {
        // Redirect user to Google OAuth
        window.location.href = data.auth_url;
      } else if (data.error) {
        alert("Login failed: " + data.error);
      } else {
        alert("Failed to get login URL");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative bg-gradient-to-br from-[#4b6b6b] to-[#1a2b2b] rounded-[20px] shadow-xl w-[700px] h-[400px] flex overflow-hidden border border-gray-700">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center flex-1 text-center p-8 relative">
          <div className="absolute top-[-80px] left-[-50px] w-[350px] h-[350px] bg-gradient-to-t from-[#05242A] to-[#ffffff] rounded-full opacity-60 border-4 border-black" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-br from-[#c0d8d8] to-transparent rounded-full" />
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
          <div className="text-xs text-white/70 mt-1">with your Google account</div>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-5 py-2 mt-6 rounded-full shadow-md transition-colors duration-200 active:scale-95"
          >
            <FcGoogle size={24} />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          <div className="absolute bottom-4 right-6 flex items-center gap-2 text-white/80 text-sm">
            <span>Powered by</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <img src="/images/logo.png" alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
