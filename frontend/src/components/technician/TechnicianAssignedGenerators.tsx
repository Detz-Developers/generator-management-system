import {useState} from "react";

interface TechnicianAssignedGeneratorsProps {
  onNavigate?: (page: string) => void;
}

export default function TechnicianAssignedGenerators({ onNavigate }: TechnicianAssignedGeneratorsProps) {
  const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);

  const generators = [
    {
      id: "CAT-3516B-G101",
      model: "Caterpillar 3516B",
      location: "Shop A - Bay 3",
      capacity: "1500 kW",
      runningHours: "2,847h",
      nextService: "2025-09-13",
      status: "operational",
      issues: 1
    },
    {
      id: "CAT-3508-G301", 
      model: "Caterpillar 3508",
      location: "Shop C - Emergency Bay",
      capacity: "800 kW",
      runningHours: "4,521h",
      nextService: "2025-08-26",
      status: "maintenance",
      issues: 0
    },
    {
      id: "CAT-3512-G201",
      model: "Caterpillar 3512",
      location: "Shop B - Main Floor",
      capacity: "1000 kW", 
      runningHours: "1,234h",
      nextService: "2025-09-10",
      status: "operational",
      issues: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "offline": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Assigned Generators</h1>
          <p className="text-gray-600 text-lg">Monitor assigned generators and equipment.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Generators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generators.map((generator) => (
          <div key={generator.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Generator Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{generator.id}</h3>
                <p className="text-gray-600 text-sm">{generator.model}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(generator.status)}`}>
                {generator.status}
              </span>
            </div>

            {/* Generator Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Location:</span>
                <span className="text-gray-900 text-sm font-medium">{generator.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Capacity:</span>
                <span className="text-gray-900 text-sm font-medium">{generator.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Running Hours:</span>
                <span className="text-gray-900 text-sm font-medium">{generator.runningHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Next Service:</span>
                <span className="text-gray-900 text-sm font-medium">{generator.nextService}</span>
              </div>
            </div>

            {/* Issues Alert */}
            {generator.issues > 0 && (
              <div className="flex items-center text-orange-600 text-sm mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {generator.issues} Open Issue(s)
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Details
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
