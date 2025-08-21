import MetricCard from './MetricCard';
import QuickActions from "@/components/QuickActions";


export default function Dashboard() {
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Dashboard</h1>
              <p className="text-gray-600 text-lg">Welcome back!</p>
            </div>
            <div className="relative">
              <button className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
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

        </div>
      </div>
  );
}
