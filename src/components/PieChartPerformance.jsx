import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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

function PieChartPerformance() {
  const [outerData, setOuterData] = useState([]);
  const [innerData, setInnerData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeOuter, setActiveOuter] = useState(null);
  const [activeInner, setActiveInner] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const outer = [
        { name: "Enabled", value: 55, color: "#0f766e" },
        { name: "Paused", value: 30, color: "#38bdf8" },
        { name: "Removed", value: 15, color: "#0284c7" },
      ];

      const inner = [
        { name: "Mobile (Enabled)", value: 30, color: "#0d9488", parent: "Enabled" },
        { name: "Desktop (Enabled)", value: 15, color: "#14b8a6", parent: "Enabled" },
        { name: "Tablet (Enabled)", value: 10, color: "#5eead4", parent: "Enabled" },
        { name: "Mobile (Paused)", value: 15, color: "#38bdf8", parent: "Paused" },
        { name: "Desktop (Paused)", value: 10, color: "#7dd3fc", parent: "Paused" },
        { name: "Tablet (Paused)", value: 5, color: "#bae6fd", parent: "Paused" },
        { name: "Mobile (Removed)", value: 5, color: "#0284c7", parent: "Removed" },
        { name: "Desktop (Removed)", value: 7, color: "#0ea5e9", parent: "Removed" },
        { name: "Tablet (Removed)", value: 3, color: "#38bdf8", parent: "Removed" },
      ];

      setOuterData(outer);
      setInnerData(inner);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="bg-white p-4 rounded-lg shadow-sm">Loading...</div>;

  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-2 text-gray-900">Device Performance</h3>
      <hr className="mb-4" />
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            {/* Outer ring */}
            <Pie
              data={outerData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={({ name }) => (activeOuter === name ? 110 : 100)}
              paddingAngle={1}
              onClick={(entry) =>
                setActiveOuter(activeOuter === entry.name ? null : entry.name)
              }
            >
              {outerData.map((entry, index) => (
                <Cell
                  key={`outer-${index}`}
                  fill={entry.color}
                  opacity={!activeOuter || activeOuter === entry.name ? 1 : 0.3}
                />
              ))}
            </Pie>

            {/* Inner ring */}
            <Pie
              data={innerData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={({ parent }) => (activeOuter === parent ? 70 : 60)}
              paddingAngle={1}
              onClick={(entry) =>
                setActiveInner(activeInner === entry.name ? null : entry.name)
              }
            >
              {innerData.map((entry, index) => (
                <Cell
                  key={`inner-${index}`}
                  fill={entry.color}
                  opacity={!activeOuter || activeOuter === entry.parent ? 1 : 0.3}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Only Outer Legends */}
      <div className="mt-4 text-xs flex flex-wrap justify-center">
        {outerData.map((item, index) => (
          <div
            key={index}
            className="flex items-center mr-3 mb-1 select-none cursor-pointer"
            onClick={() =>
              setActiveOuter(activeOuter === item.name ? null : item.name)
            }
          >
            <div
              className="w-3 h-3 mr-1"
              style={{
                backgroundColor: item.color,
                opacity: !activeOuter || activeOuter === item.name ? 1 : 0.3,
              }}
            ></div>
            <span
              style={{
                color: !activeOuter || activeOuter === item.name ? "#000" : "#888",
                textDecoration:
                  !activeOuter || activeOuter === item.name ? "none" : "line-through",
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

export default PieChartPerformance;
