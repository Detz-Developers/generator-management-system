import MetricCard from '../MetricCard';
import QuickActions from "@/components/QuickActions";
import RecentActivities from "@/components/RecentActivities";
import AISummaryPopup from "@/components/AISummaryPopup";
import {useState} from "react";

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export default function InventoryDashboard({ onNavigate }: DashboardProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600 text-lg">Welcome back to Inventory Management!</p>
            </div>
          </div>
        </div>
      </div>
  );
}
