import {useState} from "react";

interface GatePassManagementProps {
  onNavigate?: (page: string) => void;
}

export default function InventoryGatePassManagement({ onNavigate }: GatePassManagementProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Gate Pass Management</h1>
              <p className="text-gray-600 text-lg">Manage entry and exit passes</p>
            </div>
          </div>
        </div>
      </div>
  );
}
