import MetricCard from '../MetricCard';
import QuickActions from "@/components/QuickActions";
import RecentActivities from "@/components/RecentActivities";
import AISummaryPopup from "@/components/AISummaryPopup";
import {useState} from "react";

interface IssueTriageProps {
  onNavigate?: (page: string) => void;
}

export default function InventoryIssueTriage({ onNavigate }: IssueTriageProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Issue Triage</h1>
              <p className="text-gray-600 text-lg">Prioritize and manage inventory issues</p>
            </div>
          </div>
        </div>
      </div>
  );
}
