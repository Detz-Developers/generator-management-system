import MetricCard from './MetricCard';
import QuickActions from "@/components/QuickActions";
import RecentActivities from "@/components/RecentActivities";
import AISummaryPopup from "@/components/AISummaryPopup";
import {useState} from "react";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Dashboard</h1>
              <p className="text-gray-600 text-lg">Welcome back!</p>
            </div>
              <div className="flex items-center space-x-3">
                  <button
                      onClick={() => setIsAISummaryOpen(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                      <span className="text-lg">🤖</span>
                      <span className="font-medium">Generate AI Summary</span>
                  </button>
                  <button 
                      onClick={() => onNavigate?.('Notifications')}
                      className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
              title="Total Centers"
              value="178"
              subtitle="Across all centers"
              icon="⚡"
              variant="primary"
          />
          <MetricCard
              title="Upcoming Services"
              value="23"
              subtitle="Due this week"
              icon="🔧"
          />
          <MetricCard
              title="Under Repair"
              value="7"
              subtitle="Currently in workshop"
              icon="⚠️"
          />
          <MetricCard
              title="Unusable Generators"
              value="10"
              subtitle="Need replacement"
              icon="🔋"
          />
        </div>
        {/* Quick Actions and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuickActions />
            <RecentActivities />
        </div>
          {/* AI Summary Popup */}
          <AISummaryPopup
              isOpen={isAISummaryOpen}
              onClose={() => setIsAISummaryOpen(false)}
          />
      </div>
  );
}
