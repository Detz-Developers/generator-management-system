
import { useState } from "react";
import { FaTools, FaBatteryFull, FaChartBar, FaBell } from "react-icons/fa";

interface Notification {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  timestamp: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Generator Repair Request Approved",
    description:
      "Your request for generator maintenance has been approved. A technician will visit your center tomorrow between 10 AM – 1 PM.",
    icon: <FaTools className="text-2xl text-gray-700" />,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "Battery Replacement Scheduled",
    description:
      "The backup battery replacement has been scheduled for August 9th. Please ensure access to the generator room.",
    icon: <FaBatteryFull className="text-2xl text-gray-700" />,
    timestamp: "8 hours ago",
  },
  {
    id: 3,
    title: "Monthly Report Submission Confirmed",
    description:
      "Your monthly report for July has been received and verified successfully. No further action is required",
    icon: <FaChartBar className="text-2xl text-gray-700" />,
    timestamp: "3 days ago",
  },
];

interface OperatorNotificationsProps {
  onNavigate?: (page: string) => void;
}

export default function OperatorNotifications({ onNavigate }: OperatorNotificationsProps) {
  const [read, setRead] = useState(false);

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Notifications</h1>
            <p className="text-gray-600 text-lg">View system alerts and notifications</p>
          </div>
          {/* Notification bell icon */}
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FaBell className="text-blue-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Notifications container */}
      <div className="bg-white rounded-xl shadow p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700 text-sm font-medium">{notifications.length} notifications</span>
          <button
            className="text-red-500 text-sm font-semibold hover:underline"
            onClick={() => setRead(true)}
          >
            Mark All As Read
          </button>
        </div>
        <div className="space-y-6">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="border border-blue-200 rounded-lg p-4 flex items-start gap-4 bg-white"
            >
              <div className="mt-1">{notif.icon}</div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-gray-900 mb-1">{notif.title}</h2>
                <p className="text-gray-700 text-sm mb-2">{notif.description}</p>
                <span className="text-xs text-gray-400">{notif.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
