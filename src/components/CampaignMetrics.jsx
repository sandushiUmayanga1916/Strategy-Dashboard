import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const campaignData = [
  { name: "Viana - Cosmetics", clicks: 320, impressions: 480 },
  { name: "Viana - HD", clicks: 180, impressions: 420 },
  { name: "Viana - Hair Care", clicks: 240, impressions: 280 },
  { name: "Viana - HD Compressed", clicks: 10, impressions: 160 },
  { name: "Search-Sales", clicks: 140, impressions: 20 },
  { name: "Viana - Hair Care Products", clicks: 300, impressions: 500 },
];

// Custom Tooltip styled like the PieChart tooltip
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-sm text-gray-800 border border-gray-200">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center">
            <span
              className="w-3 h-3 mr-1 rounded-sm"
              style={{ backgroundColor: entry.fill }}
            ></span>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function CampaignMetrics() {
  const [showClicks, setShowClicks] = useState(true);
  const [showImpressions, setShowImpressions] = useState(true);

  const labelBaseStyle = {
    cursor: "pointer",
    transition: "color 0.2s, text-decoration 0.2s",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold mb-4 text-gray-900">
            Campaign Performance Metrics
          </h3>

          {/* Clickable Legend */}
          <div className="flex items-center text-xs text-black">
            <div
              className="flex items-center mr-4 select-none"
              style={{ cursor: "pointer" }}
              onClick={() => setShowClicks((prev) => !prev)}
            >
              <div
                className="w-3 h-3 mr-1"
                style={{
                  backgroundColor: showClicks ? "#1A4752" : "#ccc",
                }}
              ></div>
              <span
                style={{
                  ...labelBaseStyle,
                  color: showClicks ? "#000" : "#888",
                  textDecoration: showClicks ? "none" : "line-through",
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) =>
                  (e.target.style.textDecoration = showClicks ? "none" : "line-through")
                }
              >
                Clicks
              </span>
            </div>

            <div
              className="flex items-center select-none"
              style={{ cursor: "pointer" }}
              onClick={() => setShowImpressions((prev) => !prev)}
            >
              <div
                className="w-3 h-3 mr-1"
                style={{
                  backgroundColor: showImpressions ? "#58C3DB" : "#ccc",
                }}
              ></div>
              <span
                style={{
                  ...labelBaseStyle,
                  color: showImpressions ? "#000" : "#888",
                  textDecoration: showImpressions ? "none" : "line-through",
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) =>
                  (e.target.style.textDecoration = showImpressions ? "none" : "line-through")
                }
              >
                Impressions
              </span>
            </div>
          </div>
        </div>

        <hr className="mb-4 border-t-1 border-black" />
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={campaignData}
          layout="vertical"
          barGap={5}
          margin={{ top: 10, right: 20, left: 100, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} stroke="#ccc" />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#000000", fontWeight: "bold" }}
            hide
          />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fontSize: 11, fill: "#000000", fontWeight: "bold" }}
          />
          <Tooltip content={<CustomBarTooltip />} />
          <ReferenceLine y={2.5} stroke="#3b82f6" strokeDasharray="2 2" />

          {showClicks && <Bar dataKey="clicks" fill="#1A4752" />}
          {showImpressions && <Bar dataKey="impressions" fill="#58C3DB" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CampaignMetrics;
