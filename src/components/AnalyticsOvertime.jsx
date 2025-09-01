import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const timelineData = [
  { date: "Aug 05", totalUsers: 500, sessions: 350, conversions: 200 },
  { date: "Aug 06", totalUsers: 750, sessions: 150, conversions: 250 },
  { date: "Aug 07", totalUsers: 250, sessions: 350, conversions: 350 },
  { date: "Aug 08", totalUsers: 550, sessions: 250, conversions: 250 },
  { date: "Aug 09", totalUsers: 600, sessions: 300, conversions: 300 },
  { date: "Aug 10", totalUsers: 350, sessions: 400, conversions: 400 },
  { date: "Aug 11", totalUsers: 300, sessions: 250, conversions: 250 },
  { date: "Aug 12", totalUsers: 800, sessions: 800, conversions: 750 },
  { date: "Aug 13", totalUsers: 350, sessions: 400, conversions: 400 },
  { date: "Aug 14", totalUsers: 400, sessions: 350, conversions: 350 },
  { date: "Aug 15", totalUsers: 450, sessions: 600, conversions: 700 },
  { date: "Aug 16", totalUsers: 650, sessions: 650, conversions: 750 },
  { date: "Aug 17", totalUsers: 650, sessions: 750, conversions: 750 },
  { date: "Aug 18", totalUsers: 950, sessions: 750, conversions: 750 }
];

// Custom Tooltip for LineChart
const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-sm text-gray-800 border border-gray-200">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center">
            <span
              className="w-3 h-3 mr-1 rounded-sm"
              style={{ backgroundColor: entry.stroke }}
            ></span>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function AnalyticsOvertime() {
  const [showTotalUsers, setShowTotalUsers] = useState(true);
  const [showSessions, setShowSessions] = useState(true);
  const [showConversions, setShowConversions] = useState(true);

  const labelBaseStyle = {
    cursor: "pointer",
    transition: "color 0.2s, text-decoration 0.2s",
  };

  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Analytics Over Time</h3>

        {/* Custom Clickable Legend */}
        <div className="flex items-center text-xs">
          <div
            className="flex items-center mr-4 select-none"
            onClick={() => setShowTotalUsers((prev) => !prev)}
          >
            <div
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: showTotalUsers ? "#374151" : "#ccc" }}
            ></div>
            <span
              style={{
                ...labelBaseStyle,
                color: showTotalUsers ? "#000" : "#888",
                textDecoration: showTotalUsers ? "none" : "line-through",
              }}
            >
              Total Users
            </span>
          </div>

          <div
            className="flex items-center mr-4 select-none"
            onClick={() => setShowSessions((prev) => !prev)}
          >
            <div
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: showSessions ? "#9CA3AF" : "#ccc" }}
            ></div>
            <span
              style={{
                ...labelBaseStyle,
                color: showSessions ? "#000" : "#888",
                textDecoration: showSessions ? "none" : "line-through",
              }}
            >
              Sessions
            </span>
          </div>

          <div
            className="flex items-center select-none"
            onClick={() => setShowConversions((prev) => !prev)}
          >
            <div
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: showConversions ? "#22D3EE" : "#ccc" }}
            ></div>
            <span
              style={{
                ...labelBaseStyle,
                color: showConversions ? "#000" : "#888",
                textDecoration: showConversions ? "none" : "line-through",
              }}
            >
              Conversions
            </span>
          </div>
        </div>
      </div>
      <hr className="mb-4" />

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={timelineData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomLineTooltip />} />

          {showTotalUsers && (
            <Line type="monotone" dataKey="totalUsers" stroke="#374151" strokeWidth={3} dot={false} name="Total Users" />
          )}
          {showSessions && (
            <Line type="monotone" dataKey="sessions" stroke="#9CA3AF" strokeWidth={3} dot={false} name="Sessions" />
          )}
          {showConversions && (
            <Line type="monotone" dataKey="conversions" stroke="#22D3EE" strokeWidth={3} dot={false} name="Conversions" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsOvertime;