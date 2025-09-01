import MetricCard from './MetricCard';
import {useState} from "react";

interface OperatorDashboardProps {
  onNavigate?: (page: string) => void;
}

export default function OperatorDashboard({ onNavigate }: OperatorDashboardProps) {
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-green-600 mb-2">Operator Dashboard</h1>
              <p className="text-gray-600 text-lg">Monitor and manage generator operations</p>
            </div>
              <div className="flex items-center space-x-3">
                  <button 
                      onClick={() => onNavigate?.('Notifications')}
                      className="p-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
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
              title="Active Generators"
              value="156"
              subtitle="Currently operational"
              icon="⚡"
              variant="primary"
          />
          <MetricCard
              title="Pending Tasks"
              value="12"
              subtitle="Assigned to you"
              icon="📋"
          />
          <MetricCard
              title="Services Today"
              value="8"
              subtitle="Scheduled services"
              icon="🔧"
          />
          <MetricCard
              title="Alerts"
              value="3"
              subtitle="Require attention"
              icon="⚠️"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onNavigate?.('Generators')}
                className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-medium text-green-700">View Generators</div>
              </button>
              <button 
                onClick={() => onNavigate?.('Tasks')}
                className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm font-medium text-green-700">My Tasks</div>
              </button>
              <button 
                onClick={() => onNavigate?.('Services')}
                className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">🔧</div>
                <div className="text-sm font-medium text-green-700">Services</div>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-green-700">Reports</div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Recent Activities</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">Generator G045 service completed</p>
                  <p className="text-xs text-green-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-900">Generator G023 requires attention</p>
                  <p className="text-xs text-orange-600">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📋</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">New task assigned</p>
                  <p className="text-xs text-blue-600">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}