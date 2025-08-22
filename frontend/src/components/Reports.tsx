'use client';

export default function ReportsPage() {
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Reports & Export</h1>
              <p className="text-gray-600 text-lg">Overview of key metrics</p>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Services This Month</h3>
                <p className="text-3xl font-bold text-gray-900">45</p>
                <p className="text-sm text-gray-600">Completed services</p>
              </div>
              <div className="text-right">
                <span className="text-green-600 text-sm font-medium">+12%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Batteries Replaced</h3>
                <p className="text-3xl font-bold text-gray-900">23</p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <div className="text-right">
                <span className="text-green-600 text-sm font-medium">+12%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Active Tasks</h3>
                <p className="text-3xl font-bold text-gray-900">7</p>
                <p className="text-sm text-gray-600">Currently in workshop</p>
              </div>
              <div className="text-right">
                <span className="text-red-600 text-sm font-medium">-5%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Generators</h3>
                <p className="text-3xl font-bold text-gray-900">178</p>
                <p className="text-sm text-gray-600">Across all Centers</p>
              </div>
              <div className="text-right">
                <span className="text-green-600 text-sm font-medium">+2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
