// src/components/CampaignPerformanceDetails.jsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const campaignDetailsData = [
  { name: "Viana - Cosmetics", ctr: 420, cost: 380, conversions: 320 },
  { name: "Viana - HD", ctr: 350, cost: 420, conversions: 280 },
  { name: "Viana - Hair Care", ctr: 280, cost: 180, conversions: 240 },
  { name: "Search Sales", ctr: 520, cost: 280, conversions: 380 },
  { name: "Viana - Hair Care Products", ctr: 650, cost: 480, conversions: 420 },
  { name: "Viana - HD Compressed", ctr: 480, cost: 350, conversions: 380 },
  { name: "Viana - Beauty Products", ctr: 380, cost: 420, conversions: 320 },
];

// ------------------ Custom Tooltip ------------------
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const words = label.split(" ");
    return (
      <div className="bg-white p-2 rounded shadow text-sm text-gray-800 border border-gray-200">
        {words.map((word, idx) => (
          <p key={idx} className="font-semibold">{word}</p>
        ))}
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

// ------------------ Cross-Style XAxis Tick ------------------
const renderCrossTick = ({ x, y, payload }) => {
  const words = payload.value.split(" ");
  const lineHeight = 12;

  return (
    <g transform={`translate(${x},${y}) rotate(-45)`}>
      {words.map((word, idx) => (
        <text
          key={idx}
          x={0}
          y={idx * lineHeight}
          textAnchor="end"
          fill="#000"
          fontSize={11}
          fontWeight="bold"
        >
          {word}
        </text>
      ))}
    </g>
  );
};

function CampaignPerformanceDetails() {
  const [showCtr, setShowCtr] = useState(true);
  const [showCost, setShowCost] = useState(true);
  const [showConversions, setShowConversions] = useState(true);

  const labelBaseStyle = { cursor: "pointer", transition: "color 0.2s, text-decoration 0.2s" };

  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-black">Campaign Performance Details</h3>

        {/* Legend */}
        <div className="flex items-center text-xs space-x-3">
          <div className="flex items-center select-none" onClick={() => setShowCtr(prev => !prev)}>
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: showCtr ? "#1A4752" : "#ccc" }} />
            <span style={{ ...labelBaseStyle, color: showCtr ? "#000" : "#888", textDecoration: showCtr ? "none" : "line-through" }}>CTR</span>
          </div>
          <div className="flex items-center select-none" onClick={() => setShowCost(prev => !prev)}>
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: showCost ? "#58C3DB" : "#ccc" }} />
            <span style={{ ...labelBaseStyle, color: showCost ? "#000" : "#888", textDecoration: showCost ? "none" : "line-through" }}>Cost</span>
          </div>
          <div className="flex items-center select-none" onClick={() => setShowConversions(prev => !prev)}>
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: showConversions ? "#9AB4BA" : "#ccc" }} />
            <span style={{ ...labelBaseStyle, color: showConversions ? "#000" : "#888", textDecoration: showConversions ? "none" : "line-through" }}>Conversions</span>
          </div>
        </div>
      </div>

      <hr className="mb-4" />

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={campaignDetailsData} margin={{ left: 50, right: 50 }}>
          <XAxis dataKey="name" tick={renderCrossTick} interval={0} height={80} />
          <YAxis tick={{ fontSize: 11, fill: "#000", fontWeight: "bold" }} />
          <Tooltip content={<CustomBarTooltip />} />
          {showCtr && <Bar dataKey="ctr" fill="#1A4752" />}
          {showCost && <Bar dataKey="cost" fill="#58C3DB" />}
          {showConversions && <Bar dataKey="conversions" fill="#9AB4BA" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CampaignPerformanceDetails;
