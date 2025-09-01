import React from "react";

function MetricCard({ title, value, subtitle }) {
  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-black">
      <div className="text-[15px] text-[#1A4752] font-bold mb-1 uppercase tracking-wide">{title}</div>
      <div className="text-4xl font-bold text-black">{value}</div>
      {subtitle && <div className="text-[13px] font-bold text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}

export default MetricCard;