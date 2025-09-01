import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { channel: "Direct", Sessions: 420, Users: 600 },
  { channel: "Organic Search", Sessions: 360, Users: 450 },
  { channel: "Referral", Sessions: 460, Users: 230 },
  { channel: "Email Campaigns", Sessions: 210, Users: 300 },
];

// ------------------ Custom Tooltip ------------------
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

const TrafficPerformanceBarChart = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [showSessions, setShowSessions] = useState(true);

  const labelBaseStyle = {
    cursor: "pointer",
    transition: "color 0.2s, text-decoration 0.2s",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-start mb-2">
        <div className="">
          <h3 className="font-semibold text-black">
            Traffic Channel Performances
          </h3>
        </div>

        {/* Custom Legend */}
        <div className="flex items-center text-sm space-x-4">
          <div
            className="flex items-center select-none cursor-pointer"
            onClick={() => setShowSessions((prev) => !prev)}
          >
            <div
              className="w-4 h-3 mr-2"
              style={{ backgroundColor: showSessions ? "#68d5f3" : "#ccc" }}
            />
            <span
              style={{
                ...labelBaseStyle,
                color: showSessions ? "#000" : "#888",
              }}
            >
              Sessions
            </span>
          </div>

          <div
            className="flex items-center select-none cursor-pointer"
            onClick={() => setShowUsers((prev) => !prev)}
          >
            <div
              className="w-4 h-3 mr-2"
              style={{ backgroundColor: showUsers ? "#0b3140" : "#ccc" }}
            />
            <span
              style={{
                ...labelBaseStyle,
                color: showUsers ? "#000" : "#888",
              }}
            >
              Users
            </span>
          </div>
        </div>
      </div>

      <hr className="mb-4 border-t border-black" />

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="channel"
            tick={{ fontSize: 12, fill: "#000" }}
            axisLine={{ stroke: "#000" }}
            tickLine={{ stroke: "#000" }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            tick={{ fontSize: 12, fill: "#000" }}
            axisLine={{ stroke: "#000" }}
            tickLine={{ stroke: "#000" }}
            domain={[0, 600]}
            ticks={[0, 100, 200, 300, 400, 500, 600]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: "#68d5f3" }}
            axisLine={{ stroke: "#68d5f3" }}
            tickLine={{ stroke: "#68d5f3" }}
            domain={[0, 600]}
            ticks={[0, 100, 200, 300, 400, 500, 600]}
          />
          <Tooltip content={<CustomBarTooltip />} />
          {showUsers && (
            <Bar 
              yAxisId="left" 
              dataKey="Users" 
              fill="#0b3140" 
              barSize={40}
            />
          )}
          {showSessions && (
            <Bar 
              yAxisId="right" 
              dataKey="Sessions" 
              fill="#68d5f3" 
              barSize={40}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficPerformanceBarChart;