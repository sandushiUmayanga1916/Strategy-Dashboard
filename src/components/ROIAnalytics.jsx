import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AiOutlineCaretDown } from "react-icons/ai";

import { ChevronDown } from "lucide-react";

// ROIAnalytics Component
const ROIAnalytics = () => {
  const chartData = [
    { date: "Aug 05", revenue: 300, adspend: 400 },
    { date: "Aug 06", revenue: 750, adspend: 150 },
    { date: "Aug 07", revenue: 400, adspend: 350 },
    { date: "Aug 08", revenue: 350, adspend: 250 },
    { date: "Aug 09", revenue: 400, adspend: 800 },
    { date: "Aug 10", revenue: 750, adspend: 750 },
    { date: "Aug 11", revenue: 700, adspend: 650 },
  ];

  const [showRevenue, setShowRevenue] = useState(true);
  const [showAdspend, setShowAdspend] = useState(true);

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
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const MetricCard = ({ label, value, bgColor }) => (
    <div
      className={`p-4 rounded-lg shadow-sm border-l-4 border-[#508995]`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="font-bold opacity-80 mb-1 text-black">{label}</div>
      <div className="text-xl font-bold text-[#508995]">{value}</div>
    </div>
  );

  const labelBaseStyle = {
    cursor: "pointer",
    transition: "color 0.2s, text-decoration 0.2s",
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-black">ROAS & ROI Analytics</h3>
        <div className="flex items-center text-sm">
          <div
            className="flex items-center mr-4 select-none cursor-pointer"
            onClick={() => setShowRevenue((prev) => !prev)}
          >
            <div
              className="w-3 h-3 mr-1 rounded"
              style={{ backgroundColor: showRevenue ? "#374151" : "#ccc" }}
            ></div>
            <span
              style={{
                ...labelBaseStyle,
                color: showRevenue ? "#000" : "#888",
                textDecoration: showRevenue ? "none" : "line-through",
              }}
            >
              Revenue
            </span>
          </div>
          <div
            className="flex items-center select-none cursor-pointer"
            onClick={() => setShowAdspend((prev) => !prev)}
          >
            <div
              className="w-3 h-3 mr-1 rounded"
              style={{ backgroundColor: showAdspend ? "#22D3EE" : "#ccc" }}
            ></div>
            <span
              style={{
                ...labelBaseStyle,
                color: showAdspend ? "#000" : "#888",
                textDecoration: showAdspend ? "none" : "line-through",
              }}
            >
              Adspend
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <hr className="mb-4" />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#000" }}
                  axisLine={{ stroke: "#000" }}
                  tickLine={{ stroke: "#000" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#000" }}
                  axisLine={{ stroke: "#000" }}
                  tickLine={{ stroke: "#000" }}
                />
                <Tooltip content={<CustomLineTooltip />} />
                {showRevenue && (
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#374151"
                    strokeWidth={3}
                    dot={false}
                    name="Revenue"
                  />
                )}
                {showAdspend && (
                  <Line
                    type="monotone"
                    dataKey="adspend"
                    stroke="#22D3EE"
                    strokeWidth={3}
                    dot={false}
                    name="Adspend"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="ROI" value="40.5%" bgColor="#B4B4B4" />
            <MetricCard label="ROAS" value="456:1" bgColor="#B4B4B4" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="Total Revenue"
              value="$50.4K"
              bgColor="#B4B4B4"
            />
            <MetricCard
              label="Total Adspend"
              value="$20.5K"
              bgColor="#B4B4B4"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              label="Revenue Per User"
              value="$4.4K"
              bgColor="#B4B4B4"
            />
            <MetricCard
              label="Total Purchasers"
              value="65.5K"
              bgColor="#B4B4B4"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Active Users" value="4.4K" bgColor="#B4B4B4" />
            <MetricCard
              label="Avg. Purchase /A.U"
              value="$2.5K"
              bgColor="#B4B4B4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Campaign data from different tabs
const campaignsByTab = {
  "Google Ads Campaigns": [
    { name: "Viana", id: "3220426249 USD | Asia/Colombo" },
    { name: "Ads - MC", id: "3220426249 USD | Asia/Colombo" },
    { name: "TCI - New (xxxx)", id: "3220426249 USD | Asia/Colombo" },
  ],
  "Google Analytics": [
    { name: "GA Campaign 1", id: "123456 USD | Asia/Colombo" },
    { name: "GA Campaign 2", id: "654321 USD | Asia/Colombo" },
  ],
  "Intent Insights": [
    { name: "Insight A", id: "999999 USD | Asia/Colombo" },
    { name: "Insight B", id: "888888 USD | Asia/Colombo" },
  ],
};

export default function Layout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Get all campaigns from all tabs
  const allCampaigns = Object.entries(campaignsByTab).flatMap(
    ([tabName, campaigns]) =>
      campaigns.map((campaign) => ({ ...campaign, tabName }))
  );

  const handleCampaignSelect = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDropdown(false);
  };

  return (
    <div className="bg-white rounded-xl">
      {/* Campaign Account Selector - only show when no campaign is selected */}
      {!selectedCampaign && (
        <div className="min-h-screen flex flex-col justify-center items-center p-2">
          <div className="relative w-lg mb-8 p-2 rounded-lg border border-[#0E4A57] bg-[#75ACB8]">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full text-[#0E4A57] px-6 py-2 rounded-3xl flex flex-col items-center justify-center shadow-lg transition-all font-bold"
              style={{
                background: "linear-gradient(180deg, #FAF5F5 0%, #47DBFF 100%)",
              }}
            >
              <span className="mb-1">Select the Ad Campaign Account</span>
              <AiOutlineCaretDown 
                className={`transition-transform text-[#0E4A57] ${
                  showDropdown ? "rotate-180" : ""
                }`}
                size={24}
              />
            </button>

            {showDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
                <div className="max-h-80 overflow-y-auto">
                  {allCampaigns.map((campaign, index) => (
                    <div
                      key={index}
                      onClick={() => handleCampaignSelect(campaign)}
                      className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-lg">
                            {campaign.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            ID: {campaign.id}
                          </div>
                        </div>
                        <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded ml-2">
                          {campaign.tabName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Display ROI Analytics when a campaign is selected - FULL DISPLAY */}
      {selectedCampaign && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <ROIAnalytics />
        </div>
      )}
    </div>
  );
}