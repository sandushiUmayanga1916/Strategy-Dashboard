import React, { useState } from "react";
import GoogleAds from "../pages/GoogleAds";
import GoogleAnalytics from "../pages/GoogleAnalytics";

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

const tabs = ["Google Ads Campaigns", "Google Analytics", "Intent Insights"];

export default function Layout({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("Google Ads Campaigns");
  const [activeCampaignIdx, setActiveCampaignIdx] = useState(0);
  const [period, setPeriod] = useState("7 Days");

  const campaigns = campaignsByTab[activeTab];

  const renderContent = () => {
    switch (activeTab) {
      case "Google Ads Campaigns":
        return (
          <GoogleAds activeCampaign={campaigns[activeCampaignIdx]} period={period} />
        );
      case "Google Analytics":
        return (
          <GoogleAnalytics
            activeCampaign={campaigns[activeCampaignIdx]}
            period={period}
          />
        );
      default:
        return <div className="text-white p-4">Content for {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B4E5D] via-[#05242A] to-[#1E1E1E] text-white">
      {/* Header */}
      <header className="backdrop-blur-sm p-4 flex items-center justify-between border-b border-white">
        <h1 className="text-2xl md:text-4xl font-normal text-[#A1BCD3]">
          ANALYTICS DASHBOARD
        </h1>
        <div className="flex items-center space-x-3">
          <span className="text-sm md:text-base text-white">{user?.name}</span>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-teal-800 font-semibold text-sm md:text-base">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-full md:w-[280px] bg-[#1A4752] pt-6 md:pt-24 pl-4 flex flex-col">
          <div className="space-y-4 flex-1">
            {campaigns.map((campaign, idx) => {
              const isActive = idx === activeCampaignIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveCampaignIdx(idx)}
                  className={`p-3 md:p-4 text-sm md:text-base cursor-pointer transition-colors rounded-lg ${
                    isActive
                      ? "bg-[#508995] text-black font-bold"
                      : "bg-white text-black hover:bg-[#508995] hover:text-white"
                  }`}
                >
                  <div className="font-bold text-lg md:text-xl">
                    {campaign.name}
                  </div>
                  <div className="text-xs md:text-sm opacity-75 mt-1">
                    {campaign.id}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 mt-4 md:mt-8 mb-4 md:mb-8 mr-4">
            <button className="w-full bg-teal-600 text-white p-2 md:p-3 rounded text-sm md:text-base hover:bg-teal-700">
              Download Full Report
            </button>
            <button
              onClick={onLogout}
              className="w-full bg-gray-600 text-white p-2 md:p-3 rounded text-sm md:text-base hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Section */}
        <div className="flex-1 bg-[#0F4653] p-4 md:p-6">
          {/* Tabs & Period Selector */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6">
            {/* Tabs */}
            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-4 mb-2 md:mb-0">
              {tabs.map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <div
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setActiveCampaignIdx(0);
                    }}
                    className={`px-4 md:px-8 py-2 md:py-4 text-sm md:text-base text-center cursor-pointer transition-colors rounded-lg ${
                      isActive
                        ? "bg-[#508995] text-black font-bold"
                        : "bg-[#0F4653] text-white font-bold hover:bg-white hover:text-black"
                    }`}
                  >
                    {tab}
                  </div>
                );
              })}
            </div>

            {/* Period Selector */}
            <div className="flex items-center space-x-2 bg-[#6A6A6A] px-3 md:px-4 py-1 md:py-2 rounded-3xl text-white">
              <span className="text-sm md:text-base">Period:</span>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-[#6A6A6A] text-white p-1 md:p-2 rounded text-sm md:text-base"
              >
                <option>7 Days</option>
                <option>30 Days</option>
                <option>3 Months</option>
                <option>1 Year</option>
              </select>
            </div>
          </div>

          {/* Page Content */}
          <div className="bg-[#1A6473] p-4 md:p-6 rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
