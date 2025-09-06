import {useState} from "react";

interface OperatorGeneratorsProps {
  onNavigate?: (page: string) => void;
}

export default function OperatorGenerators({ onNavigate }: OperatorGeneratorsProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Generators</h1>
              <p className="text-gray-600 text-lg">Monitor and manage generator operations</p>
            </div>
          </div>
        </div>
      </div>
  );
}
