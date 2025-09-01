import React, { useState } from "react";
import { Download } from "lucide-react";

const keywords = [
  {
    keyword: "Viana lipstick",
    clicks: "23.4 K",
    impressions: "19.1 K",
    cpc: "$ 3.5",
    ctr: "18.28%",
    cost: "$542.89",
  },
  {
    keyword: "hair treatments products",
    clicks: "500",
    impressions: "19.1 K",
    cpc: "$ 3.5",
    ctr: "18.28%",
    cost: "$542.89",
  },
  {
    keyword: "makeup products",
    clicks: "5.4 K",
    impressions: "19.1 K",
    cpc: "$ 3.5",
    ctr: "18.28%",
    cost: "$542.89",
  },
  {
    keyword: "beauty products",
    clicks: "450",
    impressions: "19.1 K",
    cpc: "$ 3.5",
    ctr: "18.28%",
    cost: "$542.89",
  },
  {
    keyword: "skincare essentials",
    clicks: "2.1 K",
    impressions: "15.5 K",
    cpc: "$ 2.8",
    ctr: "13.55%",
    cost: "$434.40",
  },
  {
    keyword: "anti-aging cream",
    clicks: "1.8 K",
    impressions: "14.2 K",
    cpc: "$ 4.2",
    ctr: "12.68%",
    cost: "$756.00",
  },
  {
    keyword: "organic cosmetics",
    clicks: "960",
    impressions: "12.8 K",
    cpc: "$ 3.1",
    ctr: "7.50%",
    cost: "$297.60",
  },
  {
    keyword: "luxury perfume",
    clicks: "720",
    impressions: "11.3 K",
    cpc: "$ 5.5",
    ctr: "6.37%",
    cost: "$396.00",
  },
  {
    keyword: "eyeliner",
    clicks: "1.2 K",
    impressions: "10.1 K",
    cpc: "$ 2.9",
    ctr: "11.88%",
    cost: "$348.00",
  },
  {
    keyword: "foundation",
    clicks: "1.5 K",
    impressions: "9.8 K",
    cpc: "$ 3.2",
    ctr: "12.24%",
    cost: "$480.00",
  },
];

function KeywordTable() {
  const [showAll, setShowAll] = useState(false);
  const displayedKeywords = showAll ? keywords : keywords.slice(0, 4);
  const shouldShowViewMore = keywords.length > 4;

  return (
    <div className="w-full bg-white rounded-2xl p-2 shadow-sm">
      <div className="bg-white overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-900">
            Top Performing Keywords
          </h2>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
            <Download size={20} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {/* Table header */}
          <table className="w-full min-w-[600px] table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-[18px] font-bold text-black">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-[18px] font-bold text-black">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-[18px] font-bold text-black">
                  Impressions
                </th>
                <th className="px-6 py-3 text-left text-[18px] font-bold text-black">
                  CPC
                </th>
                <th className="px-6 py-3 text-left text-[18px] font-bold text-black">
                  CTR
                </th>
                <th className="px-6 py-3 text-left text-[18px] font-bold text-black">
                  Cost
                </th>
              </tr>
            </thead>
          </table>

          {/* Scrollable table body */}
          <div
            className={`${
              showAll ? "max-h-96 overflow-y-auto" : ""
            } transition-all duration-300`}
          >
            <table className="w-full min-w-[600px] table-fixed">
              <tbody className="divide-y divide-gray-200">
                {displayedKeywords.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-md text-black font-medium">
                      {row.keyword}
                    </td>
                    <td className="px-6 py-4 text-md text-black font-medium">
                      {row.clicks}
                    </td>
                    <td className="px-6 py-4 text-md text-black font-medium">
                      {row.impressions}
                    </td>
                    <td className="px-6 py-4 text-md text-black font-medium">
                      {row.cpc}
                    </td>
                    <td className="px-6 py-4 text-md text-black font-medium">
                      {row.ctr}
                    </td>
                    <td className="px-6 py-4 text-md text-black font-medium">
                      {row.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View More Button */}
        {shouldShowViewMore && (
          <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-center rounded-b-2xl">
            <button
              onClick={() => setShowAll(!showAll)}
              className="py-2 px-8 bg-[#508995] hover:bg-teal-700 text-white text-sm font-medium rounded transition-colors duration-200"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default KeywordTable;
