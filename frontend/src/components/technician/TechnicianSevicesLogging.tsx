import {useState} from "react";

interface TechnicianServicesLoggingProps {
  onNavigate?: (page: string) => void;
}

export default function TechnicianServicesLogging({ onNavigate }: TechnicianServicesLoggingProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Services Logging</h1>
              <p className="text-gray-600 text-lg">Log and track service activities</p>
            </div>
          </div>
        </div>
      </div>
  );
}
