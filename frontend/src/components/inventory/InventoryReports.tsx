import { useState } from "react";

interface InventoryReportsProps {
  onNavigate?: (page: string) => void;
}

export default function InventoryReports({ onNavigate }: InventoryReportsProps) {
  const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Inventory Reports
        </h1>
        <p className="text-gray-600 text-lg">
          Generate comprehensive reports and export data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Filters */}
        <div className="border border-blue-400 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-black mb-2">
            Report Filters
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Configure filters to customize your report
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Report Filters</label>
              <select className="w-full border border-blue-400 rounded-xl bg-blue-100 p-2">
                <option>All Status</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Report Filters</label>
              <select className="w-full border border-blue-400 rounded-xl bg-blue-100 p-2">
                <option>All Brands</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Report Filters</label>
              <select className="w-full border border-blue-400 rounded-xl bg-blue-100 p-2">
                <option>All Locations</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Date From</label>
              <input
                type="date"
                className="w-full border border-blue-400 rounded-xl bg-blue-100 p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date To</label>
              <input
                type="date"
                className="w-full border border-blue-400 rounded-xl bg-blue-100 p-2"
              />
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="border border-blue-400 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-black mb-2">
            Export Options
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Download reports in different formats
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full border border-blue-400 rounded-xl bg-white text-black font-medium p-2 hover:bg-blue-50">
              Export to CSV
            </button>
            <button className="w-full border border-blue-400 rounded-xl bg-white text-black font-medium p-2 hover:bg-blue-50">
              Export to PDF
            </button>
          </div>

          {/* Divider */}
          <hr className="border-t border-blue-300 mb-4" />

          <h3 className="text-md font-semibold text-gray-500 mb-3">
            Quick Reports
          </h3>
          <ul className="space-y-2 text-black font-medium">
            <li className="cursor-pointer hover:underline">Battery Reports</li>
            <li className="cursor-pointer hover:underline">Service Report</li>
            <li className="cursor-pointer hover:underline">Maintenance Log</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
