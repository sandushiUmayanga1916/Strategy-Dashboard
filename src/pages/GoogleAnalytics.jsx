import React from "react";
import MetricCard from "../components/MetricCard";
import DevicePieChart from "../components/DevicePieChart";
import KeywordTable from "../components/KeywordTable";
import SummaryPanel from "../components/SummaryPanel";
import TrafficPerformanceBarChart from "../components/TrafficPerfomanceBarChart";
import TrafficBreakdownPie from "../components/TrafficBreakdownPie";
import AnalyticsOvertime from "../components/AnalyticsOvertime";
import UserEngagement from "../components/UserEngagement";
import ROIAnalytics from "../components/ROIAnalytics";
import GeographicalDetailsCard from "../components/GeographicalDetailsCard";
import AudienceInsightsCard from "../components/AudienceInsightsCard";

export default function GoogleAnalytics() {
  return (
    <div>

      {/* Metrics Row 1 */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value="49.9K"
          subtitle="Total Users Change: 12%"
        />
        <MetricCard
          title="Sessions"
          value="453"
          subtitle="Sessions Per User: 1.5"
        />
        <MetricCard
          title="Engaged Sessions"
          value="8.6K"
          subtitle="Engaged Percentage: 24.2%"
        />
        <MetricCard
          title="Engagement Rate"
          value="1.45%"
          subtitle="Engagement Rate Status: Good"
        />
      </div>

      {/* Metrics Row 2 */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <MetricCard
          title="Pages Per Session"
          value="123.5"
          subtitle="Content Depth Status: Good"
        />
        <MetricCard
          title="Avg. Session Duration (s)"
          value="123"
          subtitle="Session Duration Quality: Good"
        />
        <MetricCard
          title="Bounce Rate"
          value="34.5%"
          subtitle="Bounce Rate Status: High"
        />
        <MetricCard
          title="Views Per Session"
          value="453"
          subtitle="Session Quality Score: 55/100"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-[65%_33.5%] gap-6 mt-6">
        <TrafficPerformanceBarChart />
        <TrafficBreakdownPie />
      </div>

      {/* Analytics Over Time */}
      <div className="mt-6">
        <AnalyticsOvertime />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-[33.5%_65%] gap-6 mt-6">
        <DevicePieChart />
        <UserEngagement />
      </div>

      {/* Funnel & ROAS */}
      <div className="grid grid-cols-1 gap-6 mt-6">
       <ROIAnalytics />
      </div>

      {/* Generated Insights */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        <SummaryPanel />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <GeographicalDetailsCard />
        <AudienceInsightsCard />
      </div>
    </div>
  );
}
