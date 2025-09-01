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
  { date: "Aug 05", clicks: 300, cost: 400, impressions: 500 },
  { date: "Aug 06", clicks: 700, cost: 350, impressions: 600 },
  { date: "Aug 07", clicks: 400, cost: 300, impressions: 450 },
  { date: "Aug 08", clicks: 780, cost: 450, impressions: 550 },
  { date: "Aug 09", clicks: 350, cost: 250, impressions: 400 },
  { date: "Aug 10", clicks: 600, cost: 500, impressions: 650 },
  { date: "Aug 11", clicks: 900, cost: 600, impressions: 750 },
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

function LineChartComp() {
  const [showClicks, setShowClicks] = useState(true);
  const [showCost, setShowCost] = useState(true);
  const [showImpressions, setShowImpressions] = useState(true);

  const labelBaseStyle = {
    cursor: "pointer",
    transition: "color 0.2s, text-decoration 0.2s",
  };

  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Performance Over Time</h3>

        {/* Custom Clickable Legend */}
        <div className="flex items-center text-xs">
          <div
            className="flex items-center mr-4 select-none"
            onClick={() => setShowClicks((prev) => !prev)}
          >
            <div
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: showClicks ? "#374151" : "#ccc" }}
            ></div>
            <span
              style={{
                ...labelBaseStyle,
                color: showClicks ? "#000" : "#888",
                textDecoration: showClicks ? "none" : "line-through",
              }}
            >
              Clicks
            </span>
          </div>

          <div
            className="flex items-center mr-4 select-none"
            onClick={() => setShowCost((prev) => !prev)}
          >
            <div
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: showCost ? "#0d9488" : "#ccc" }}
            ></div>
            <span
              style={{
                ...labelBaseStyle,
                color: showCost ? "#000" : "#888",
                textDecoration: showCost ? "none" : "line-through",
              }}
            >
              Cost
            </span>
          </div>

          <div
            className="flex items-center select-none"
            onClick={() => setShowImpressions((prev) => !prev)}
          >
            <div
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: showImpressions ? "#38bdf8" : "#ccc" }}
            ></div>
            <span
              style={{
                ...labelBaseStyle,
                color: showImpressions ? "#000" : "#888",
                textDecoration: showImpressions ? "none" : "line-through",
              }}
            >
              Impressions
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={timelineData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomLineTooltip />} />

          {showClicks && (
            <Line type="monotone" dataKey="clicks" stroke="#374151" strokeWidth={3} dot={false} />
          )}
          {showCost && (
            <Line type="monotone" dataKey="cost" stroke="#0d9488" strokeWidth={3} dot={false} />
          )}
          {showImpressions && (
            <Line type="monotone" dataKey="impressions" stroke="#38bdf8" strokeWidth={3} dot={false} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComp;
