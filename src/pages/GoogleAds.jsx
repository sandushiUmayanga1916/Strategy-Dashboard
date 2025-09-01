import React from "react";
import MetricCard from "../components/MetricCard";
import CampaignMetrics from "../components/CampaignMetrics";
import DevicePieChart from "../components/DevicePieChart";
import LineChartComp from "../components/LineChart";
import KeywordTable from "../components/KeywordTable";
import SummaryPanel from "../components/SummaryPanel";
import PieChartPerformance from "../components/PieChartPerformance";
import CampaignPerformanceDetails from "../components/CampaignPerformanceDetails";

export default function GoogleAds({ activeCampaign, period }) {
  // Simulated dataset (could be fetched from API later)
  const campaignData = {
    Viana: {
      metrics: {
        impressions: "49.9K",
        cost: "$1,542.69",
        clicks: "8.6K",
        conversionRate: "1.45%",
        conversions: "123.5",
        cpc: "$0.34",
        costPerConv: "$2.23",
        ctr: "13.55%",
      },
    },
    "Ads - MC": {
      metrics: {
        impressions: "88.2K",
        cost: "$3,012.10",
        clicks: "15.1K",
        conversionRate: "2.15%",
        conversions: "310",
        cpc: "$0.20",
        costPerConv: "$1.90",
        ctr: "12.01%",
      },
    },
    "TCI - New (xxxx)": {
      metrics: {
        impressions: "22.3K",
        cost: "$789.40",
        clicks: "4.5K",
        conversionRate: "0.98%",
        conversions: "45",
        cpc: "$0.17",
        costPerConv: "$3.50",
        ctr: "8.22%",
      },
    },
  };

  const data = campaignData[activeCampaign.name]?.metrics || {};

  return (
    <>
      

      {/* Metrics Row 1 */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard title="Total Impressions" value={data.impressions} />
        <MetricCard title="Total Cost" value={data.cost} />
        <MetricCard title="Total Clicks" value={data.clicks} />
        <MetricCard title="Conversion Rate" value={data.conversionRate} />
      </div>

      {/* Metrics Row 2 */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <MetricCard title="Total Conversions" value={data.conversions} />
        <MetricCard title="Avg. Cost Per Click" value={data.cpc} />
        <MetricCard title="Cost Per Conv." value={data.costPerConv} />
        <MetricCard title="Click-Through Rate" value={data.ctr} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-[65%_33.5%] gap-6 mt-6">
        <CampaignMetrics campaign={activeCampaign} />
        <DevicePieChart campaign={activeCampaign} />
      </div>

      {/* Performance Over Time */}
      <div className="mt-6">
        <LineChartComp campaign={activeCampaign} period={period} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-[33.5%_65%] gap-6 mt-6">
        <PieChartPerformance campaign={activeCampaign} />
        <CampaignPerformanceDetails campaign={activeCampaign} />
      </div>

      {/* Keywords & Summary */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        <KeywordTable campaign={activeCampaign} />
        <SummaryPanel campaign={activeCampaign} />
      </div>
    </>
  );
}
