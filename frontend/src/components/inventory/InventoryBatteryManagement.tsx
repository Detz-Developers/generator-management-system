import { useState } from "react";

interface BatteryManagementProps {
  onNavigate?: (page: string) => void;
}

export default function InventoryBatteryManagement({ onNavigate }: BatteryManagementProps) {
  const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Battery Management</h1>
            <p className="text-gray-600 text-lg">Manage battery inventory and status</p>
          </div>
        </div>
      </div>
    </div>
  );
}
