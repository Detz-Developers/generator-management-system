import { useState } from "react";

interface TechnicianTasksProps {
  onNavigate?: (page: string) => void;
}

export default function TechnicianTasks({ onNavigate }: TechnicianTasksProps) {
  const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);

  const tasks = [
    {
      id: "T001",
      name: "Generator G-101 Monthly Service",
      generator: "CAT-3516B-G101",
      location: "Shop A - Bay 3",
      priority: "high",
      status: "pending",
      dueDate: "2025-08-15"
    },
    {
      id: "T002", 
      name: "Battery Bank Inspection",
      generator: "Battery Bank B-205",
      location: "Shop A - Bay 3",
      priority: "medium",
      status: "doing",
      dueDate: "2025-08-14"
    },
    {
      id: "T003",
      name: "Emergency Generator Repair", 
      generator: "CAT-3508-G301",
      location: "Shop A - Bay 3",
      priority: "urgent",
      status: "pending",
      dueDate: "2025-08-14"
    },
    {
      id: "T004",
      name: "Charger C-401 Calibration",
      generator: "Charger C-401", 
      location: "Shop A - Bay 3",
      priority: "low",
      status: "done",
      dueDate: "2025-08-13"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gray-300 text-gray-800";
      case "doing": return "bg-blue-300 text-blue-800";
      case "done": return "bg-green-300 text-green-800";
      default: return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Tasks</h1>
          <p className="text-gray-600 text-lg">Manage your assigned tasks and track progress.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
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

      {/* Tasks Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Task</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Generator</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{task.name}</div>
                    <div className="text-sm text-gray-500">{task.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{task.generator}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{task.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{task.dueDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {task.status !== "done" && (
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M9 18h6" />
                          </svg>
                          Start
                        </button>
                      )}
                      <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
