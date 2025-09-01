import MetricCard from './MetricCard';
import {useState} from "react";

interface TechnicianDashboardProps {
  onNavigate?: (page: string) => void;
}

export default function TechnicianDashboard({ onNavigate }: TechnicianDashboardProps) {
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-orange-600 mb-2">Technician Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage maintenance and repair tasks</p>
            </div>
              <div className="flex items-center space-x-3">
                  <button 
                      onClick={() => onNavigate?.('Notifications')}
                      className="p-3 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
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
              title="Assigned Tasks"
              value="15"
              subtitle="Active assignments"
              icon="🔧"
              variant="primary"
          />
          <MetricCard
              title="Completed Today"
              value="6"
              subtitle="Tasks finished"
              icon="✅"
          />
          <MetricCard
              title="In Progress"
              value="4"
              subtitle="Currently working"
              icon="⚙️"
          />
          <MetricCard
              title="Overdue"
              value="2"
              subtitle="Need attention"
              icon="⚠️"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-orange-200 p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onNavigate?.('Tasks')}
                className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm font-medium text-orange-700">My Tasks</div>
              </button>
              <button 
                onClick={() => onNavigate?.('Services')}
                className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">🔧</div>
                <div className="text-sm font-medium text-orange-700">Services</div>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm font-medium text-orange-700">Work Log</div>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center">
                <div className="text-2xl mb-2">🛠️</div>
                <div className="text-sm font-medium text-orange-700">Tools</div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-orange-200 p-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🔧</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-900">Generator G012 - Routine Maintenance</p>
                  <p className="text-xs text-orange-600">09:00 AM - 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⚠️</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">Generator G034 - Emergency Repair</p>
                  <p className="text-xs text-red-600">01:00 PM - 04:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📋</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">Generator G056 - Inspection</p>
                  <p className="text-xs text-blue-600">04:30 PM - 05:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}