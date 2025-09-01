import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

// Chart Data
const chartDataList = [
  {
    name: "Browser Usage",
    displayName: "User by Browser Type",
    type: "bar",
    data: [
      { name: "Chrome", value: 89, users: 4450 },
      { name: "Internet Explorer", value: 70, users: 3500 },
      { name: "Opera", value: 40, users: 2000 },
      { name: "Firefox", value: 20, users: 1000 },
      { name: "Android Webview", value: 18, users: 900 },
      { name: "Samsung Internet", value: 3, users: 150 },
      { name: "Firefox", value: 18, users: 900 },
    ],
  },
  {
    name: "Gender Split",
    displayName: "User by Gender Type",
    type: "pie",
    data: [
      { name: "Male", value: 20, users: 3000, color: "#1A4752" },
      { name: "Female", value: 40, users: 2000, color: "#2B889C" },
      { name: "Unknown", value: 40, users: 2000, color: "#58C3DB" },
    ],
  },
  {
    name: "Age Groups",
    displayName: "User by Age Range",
    type: "bar",
    data: [
      { name: "18-24", value: 25, users: 1250 },
      { name: "25-34", value: 45, users: 2250 },
      { name: "35-54", value: 20, users: 1000 },
      { name: "unknown", value: 10, users: 500 },
    ],
  },
];

// Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, users } = payload[0].payload;
    return (
      <div className="bg-white p-2 shadow text-sm text-gray-800 border border-gray-200">
        <p className="font-semibold">{name}</p>
        <p>Percentage: {value}%</p>
        <p>Users: {users?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function AudienceInsightsCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSlice, setActiveSlice] = useState(null);
  const currentChart = chartDataList[currentIndex];

  const handlePrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? chartDataList.length - 1 : prev - 1
    );
  const handleNext = () =>
    setCurrentIndex((prev) =>
      prev === chartDataList.length - 1 ? 0 : prev + 1
    );

  const renderChart = () => {
    if (currentChart.type === "pie") {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-2/3 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentChart.data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={110}
                  labelLine={false}
                  onClick={(entry) =>
                    setActiveSlice(
                      activeSlice === entry.name ? null : entry.name
                    )
                  }
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    index,
                  }) => {
                    const radius =
                      innerRadius + (outerRadius - innerRadius) / 2;
                    const RADIAN = Math.PI / 180;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontWeight="bold"
                        fontSize={14}
                      >
                        {`${currentChart.data[index].value}%`}
                      </text>
                    );
                  }}
                >
                  {currentChart.data.map((entry, index) => (
                    <Cell
                      key={index}
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
          <div className="w-1/3 flex flex-col items-start text-sm">
            {currentChart.data.map((item, index) => (
              <div
                key={index}
                className="flex items-center mb-2 cursor-pointer"
                onClick={() =>
                  setActiveSlice(activeSlice === item.name ? null : item.name)
                }
              >
                <div
                  className="w-4 h-4 mr-2 rounded"
                  style={{
                    backgroundColor: item.color,
                    opacity:
                      !activeSlice || activeSlice === item.name ? 1 : 0.3,
                  }}
                ></div>
                <span
                  className="font-bold"
                  style={{
                    color:
                      !activeSlice || activeSlice === item.name
                        ? "#000"
                        : "#888",
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
    } else {
      const gradientId = "grad-tw";

      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout={
              currentChart.name === "Browser Usage" ? "vertical" : "horizontal"
            }
            data={currentChart.data}
            barCategoryGap="40%"
            margin={{ top: 40, right: 40, left: 60, bottom: 40 }}
          >
            {currentChart.name === "Browser Usage" ? (
              <>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  fontSize={14}
                  tick={{ fontWeight: "bold", fill: "#000" }}
                  axisLine={false}
                  tickLine={false}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="name"
                  fontSize={14}
                  tick={{ fontWeight: "bold", fill: "#000" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
              </>
            )}

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="value"
              barSize={currentChart.name === "Age Groups" ? 70 : 40}
              onClick={(entry) =>
                setActiveSlice(activeSlice === entry.name ? null : entry.name)
              }
            >
              {currentChart.data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={`url(#${gradientId})`}
                  opacity={!activeSlice || activeSlice === entry.name ? 1 : 0.3}
                />
              ))}
              <LabelList
                dataKey="value"
                position="center"
                formatter={(val) => `${val}%`}
                fill="#fff"
                fontWeight="bold"
              />
            </Bar>

            <defs>
              <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#58C3DB" />
                <stop offset="100%" stopColor="#1A4752" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-sm">
      {/* Flex container for left and right titles */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold mb-2 text-gray-900">Audience Insights</h3>
        <span className="font-semibold text-black text-sm">
          {currentChart.displayName}
        </span>
      </div>
      <hr className="mb-4" />
      <div className="flex justify-between items-center">
        <button onClick={handlePrev} className="p-2">
          <IoMdArrowDropleft size={40} color="#1A4752" />
        </button>
        <div className="w-[700px] h-[400px]">{renderChart()}</div>
        <button onClick={handleNext} className="p-2 rounded">
          <IoMdArrowDropright size={40} color="#1A4752" />
        </button>
      </div>
    </div>
  );
}
