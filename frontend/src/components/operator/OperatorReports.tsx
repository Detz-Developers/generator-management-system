import {useState} from "react";

interface OperatorReportsProps {
  onNavigate?: (page: string) => void;
}

export default function OperatorReports({ onNavigate }: OperatorReportsProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Reports</h1>
              <p className="text-gray-600 text-lg">View and generate operational reports</p>
            </div>
          </div>
        </div>
      </div>
  );
}
