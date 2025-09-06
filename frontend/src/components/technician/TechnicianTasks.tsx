import { useState } from "react";

interface TechnicianTasksProps {
  onNavigate?: (page: string) => void;
}

export default function TechnicianTasks({ onNavigate }: TechnicianTasksProps) {
  const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Tasks</h1>
            <p className="text-gray-600 text-lg">Manage and track your assigned tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
