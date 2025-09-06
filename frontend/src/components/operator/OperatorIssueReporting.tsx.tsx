import {useState} from "react";

interface OperatorIssueReportingProps {
  onNavigate?: (page: string) => void;
}

export default function OperatorIssueReporting({ onNavigate }: OperatorIssueReportingProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Issue Reporting</h1>
              <p className="text-gray-600 text-lg">Report and track operational issues</p>
            </div>
          </div>
        </div>
      </div>
  );
}
