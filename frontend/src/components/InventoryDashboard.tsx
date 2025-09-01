import MetricCard from './MetricCard';
import {useState} from "react";

interface InventoryDashboardProps {
  onNavigate?: (page: string) => void;
}

export default function InventoryDashboard({ onNavigate }: InventoryDashboardProps) {
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-purple-600 mb-2">Inventory Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage stock and inventory levels</p>
            </div>
              <div className="flex items-center space-x-3">
                  <button 
                      onClick={() => onNavigate?.('Notifications')}
                      className="p-3 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="View Notifications"
                  >
                      <span className="text-xl">🔔</span>
                  </button>
              </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
              title="Total Batteries"
              value="245"
              subtitle="In stock"
              icon="🔋"
              variant="primary"
          />
          <MetricCard
              title="Low Stock"
              value="8"
              subtitle="Need reorder"
              icon="⚠️"
          />
          <MetricCard
              title="On Loan"
              value="32"
              subtitle="Temporary batteries"
              icon="📤"
          />
          <MetricCard
              title="Returns Due"
              value="5"
              subtitle="Expected today"
              icon="📥"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onNavigate?.('Batteries')}
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">🔋</div>
                <div className="text-sm font-medium text-purple-700">Battery Stock</div>
              </button>
              <button 
                onClick={() => onNavigate?.('Generators')}
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-medium text-purple-700">Generators</div>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-purple-700">Stock Report</div>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">📦</div>
                <div className="text-sm font-medium text-purple-700">Orders</div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Stock Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⚠️</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">12V Batteries - Low Stock</p>
                  <p className="text-xs text-red-600">Only 5 units remaining</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📥</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-900">Battery B045 return overdue</p>
                  <p className="text-xs text-orange-600">Due 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📦</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">New shipment arrived</p>
                  <p className="text-xs text-blue-600">24V Batteries - 50 units</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}