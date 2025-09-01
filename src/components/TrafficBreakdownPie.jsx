import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Organic Search", value: 45, color: "#68d5f3" },
  { name: "Direct", value: 25, color: "#0b3140" },
  { name: "Referral", value: 15, color: "#58C3DB" },
  { name: "Organic Social", value: 10, color: "#9AB4BA" },
  { name: "Organic Shopping", value: 5, color: "#B8C9CE" },
];

// ------------------ Custom Tooltip ------------------
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded shadow text-sm text-gray-800 border border-gray-200">
        <p className="font-semibold">{name}</p>
        <p>Value: {value}%</p>
      </div>
    );
  }
  return null;
};

// ------------------ Custom Label for Center Text ------------------
const renderCenterLabel = () => {
  return (
    <text
      x="50%"
      y="45%"
      textAnchor="middle"
      dominantBaseline="middle"
      className="fill-blue-400 text-xs font-medium"
    >
      Majority
    </text>
  );
};

const renderCenterMainLabel = () => {
  return (
    <text
      x="50%"
      y="55%"
      textAnchor="middle"
      dominantBaseline="middle"
      className="fill-black text-sm font-bold"
    >
      Organic Search
    </text>
  );
};

function TrafficBreakdownPie() {
  const [activeSlice, setActiveSlice] = useState(null);



  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="border-b-1 border-black pb-2 mb-4">
        <h3 className="font-semibold text-black">
          Traffic Breakdown
        </h3>
      </div>

      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={({ name }) =>
                activeSlice === name ? 110 : 100
              }
              paddingAngle={2}
              dataKey="value"
              onClick={(entry) =>
                setActiveSlice(activeSlice === entry.name ? null : entry.name)
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={
                    !activeSlice || activeSlice === entry.name ? 1 : 0.3
                  }
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {/* Center Labels */}
            <g>
              {renderCenterLabel()}
              {renderCenterMainLabel()}
            </g>
          </PieChart>
        </ResponsiveContainer>

        {/* Clickable Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4 w-full max-w-xs">
          {data.map((entry, index) => (
            <div 
              key={index} 
              className="flex items-center cursor-pointer select-none"
              onClick={() =>
                setActiveSlice(activeSlice === entry.name ? null : entry.name)
              }
            >
              <div
                className="w-4 h-3 mr-2 flex-shrink-0"
                style={{ 
                  backgroundColor: entry.color,
                  opacity: !activeSlice || activeSlice === entry.name ? 1 : 0.3
                }}
              />
              <span 
                className="font-medium truncate"
                style={{
                  color: !activeSlice || activeSlice === entry.name ? "#000" : "#888",
                  textDecoration: !activeSlice || activeSlice === entry.name ? "none" : "line-through"
                }}
              >
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrafficBreakdownPie;