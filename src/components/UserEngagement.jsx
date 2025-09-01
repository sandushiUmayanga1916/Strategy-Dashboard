import React, { useState } from "react";

const funnelData = [
  { label: "first_visit", value: 28544, percent: "100%", drop: null },
  { label: "session_start", value: 4353, percent: "25%", drop: "100%" },
  { label: "page_view", value: 3455, percent: "24%", drop: "25%" },
  { label: "scroll", value: 2345, percent: "23%", drop: "24%" },
  { label: "user_engagement", value: 1345, percent: "13%", drop: "23%" },
  { label: "get_started", value: 754, percent: "5%", drop: "13%" },
  { label: "getstarted_button", value: 594, percent: "4%", drop: "5%" },
  { label: "form_start", value: 300, percent: "3.5%", drop: "4%" },
  { label: "form_submit", value: 53, percent: "1%", drop: "3.5%" },
  { label: "click", value: 20, percent: "0.4%", drop: "1%" },
];

const UserEngagement = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="w-full max-w-5xl p-4 mx-auto bg-white rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-black">User Engagement Funnel</h3>

        {/* Animated AI Icon */}
        <div className="relative flex flex-col items-center">
          <button onClick={() => setShowMessage(!showMessage)} className="relative">
            {/* Glowing ring with ping */}
            <span className="absolute inset-0 rounded-full animate-ping bg-[#508995] opacity-75"></span>

            {/* AI Icon */}
            <img
              src="/images/ai.png"
              alt="AI Icon"
              className="relative w-12 h-12 object-contain cursor-pointer"
            />
          </button>

        </div>
      </div>
      <hr className="border-t-1 border-black mb-4" />

      {/* Funnel Chart */}
      <div className="space-y-1">
        {funnelData.map((item, index) => {
          const width = 100 - index * 8;
          const nextWidth =
            index < funnelData.length - 1 ? 100 - (index + 1) * 8 : width - 10;

          return (
            <div key={item.label} className="flex items-center">
              {/* Label */}
              <div className="w-40 text-right pr-4">
                <span className="font-bold text-black">{item.label}</span>
              </div>

              {/* Connecting line */}
              <div
                className="h-px bg-[#508995]"
                style={{
                  width: `${20 + index * 6}px`,
                }}
              ></div>

              {/* Funnel */}
              <div className="flex-1 flex justify-center items-center">
                <div
                  className="bg-[#508995] text-white flex items-center justify-center text-sm font-medium relative"
                  style={{
                    width: `${width * 3.5}px`,
                    height: "42px",
                    clipPath: `polygon(${(100 - width) / 2}% 0%, ${
                      100 - (100 - width) / 2
                    }% 0%, ${100 - (100 - nextWidth) / 2}% 100%, ${
                      (100 - nextWidth) / 2
                    }% 100%)`,
                    marginBottom: index < funnelData.length - 1 ? "-1px" : "0",
                  }}
                >
                  {item.value?.toLocaleString()}
                </div>
              </div>

              {/* Dotted line */}
              <div
                className="border-b border-dotted border-gray-500 mx-3"
                style={{
                  width: `${25 + index * 5}px`,
                }}
              ></div>

              {/* Percentage */}
              <div className="w-12 text-left">
                <span className="text-sm font-bold text-gray-900">
                  {item.percent}
                </span>
              </div>

              {/* Drop-off */}
              <div className="w-16 text-right">
                {index === 0 && (
                  <span className="text-sm font-medium text-gray-700">
                    Drop-Off ↓
                  </span>
                )}
                {index > 0 && item.drop && (
                  <span className="text-sm text-gray-400">{item.drop}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Popup */}
      {showMessage && (
        <div className="mt-4 p-4 bg-[#508995] text-white rounded-lg text-center animate-ping">
          🤖 Hi! I’m your AI Assistant. How can I help?
        </div>
      )}
    </div>
  );
};

export default UserEngagement;
