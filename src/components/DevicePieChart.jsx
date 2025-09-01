import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

// Data for each chart
const chartDataList = [
  {
    name: "Clicks",
    data: [
      { name: "Mobile", value: 480, color: "#1A4752" },
      { name: "Desktop", value: 320, color: "#2B889C" },
      { name: "Tablet", value: 150, color: "#A0C6CE" },
      { name: "Connected TV", value: 50, color: "#58C3DB" },
    ],
  },
  {
    name: "Impressions",
    data: [
      { name: "Mobile", value: 1200, color: "#0d9488" },
      { name: "Desktop", value: 900, color: "#38bdf8" },
      { name: "Tablet", value: 400, color: "#64748b" },
      { name: "Connected TV", value: 150, color: "#94a3b8" },
    ],
  },
  {
    name: "Cost",
    data: [
      { name: "Mobile", value: 300, color: "#0d9488" },
      { name: "Desktop", value: 200, color: "#38bdf8" },
      { name: "Tablet", value: 120, color: "#64748b" },
      { name: "Connected TV", value: 80, color: "#94a3b8" },
    ],
  },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded shadow text-sm text-gray-800 border border-gray-200">
        <p className="font-semibold">{name}</p>
        <p>Value: {value}</p>
      </div>
    );
  }
  return null;
};

function DevicePieChart() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSlice, setActiveSlice] = useState(null); // currently selected slice
  const currentChart = chartDataList[currentIndex];

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? chartDataList.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === chartDataList.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4 text-gray-900">Device Performance</h3>
      <hr className="mb-4" />

      <div className="flex justify-between items-center">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="p-2"
        >
          <IoMdArrowDropleft size={50} color="#1A4752" />
        </button>

        {/* Pie Chart */}
        <div className="w-64 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={currentChart.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={({ name }) =>
                  activeSlice === name ? 90 : 80 
                }
                labelLine={false}
                label={({ cx, cy }) => (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-semibold text-gray-700"
                  >
                    {currentChart.name}
                  </text>
                )}
                onClick={(entry) =>
                  setActiveSlice(activeSlice === entry.name ? null : entry.name)
                }
              >
                {currentChart.data.map((entry, index) => (
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="p-2 rounded"
        >
          <IoMdArrowDropright size={50} color="#1A4752" />
        </button>
      </div>

      {/* Clickable Legend */}
      <div className="flex flex-wrap justify-center mt-2 text-xs">
        {currentChart.data.map((item, index) => (
          <div
            key={index}
            className="flex items-center mr-3 mb-1 select-none"
            style={{ cursor: "pointer" }}
            onClick={() =>
              setActiveSlice(activeSlice === item.name ? null : item.name)
            }
          >
            <div
              className="w-3 h-3 mr-1"
              style={{
                backgroundColor: item.color,
                opacity:
                  !activeSlice || activeSlice === item.name ? 1 : 0.3,
              }}
            ></div>
            <span
              style={{
                color: !activeSlice || activeSlice === item.name ? "#000" : "#888",
                textDecoration:
                  !activeSlice || activeSlice === item.name
                    ? "none"
                    : "line-through",
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevicePieChart;
