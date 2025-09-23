import { useState } from "react";
import { FaTools, FaBatteryFull, FaChartBar, FaBell } from "react-icons/fa";

interface Notification {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    timestamp: string;
    read: boolean;
}

interface TechnicianNotificationsProps {
    onNavigate?: (page: string) => void;
}

const notifications: Notification[] = [
    {
        id: 1,
        title: "Task: Generator Maintenance Assigned",
        description: "You have been assigned to perform routine maintenance on Generator #123. Complete by 2025-09-24, 2 PM.",
        icon: <FaTools className="text-2xl text-gray-700" />,
        timestamp: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        title: "Service: Battery Replacement Scheduled",
        description: "A battery replacement service for Generator #456 is scheduled for 2025-09-25. Ensure tools are ready.",
        icon: <FaBatteryFull className="text-2xl text-gray-700" />,
        timestamp: "8 hours ago",
        read: false,
    },
    {
        id: 3,
        title: "Generator: Low Fuel Alert",
        description: "Generator #789 is reporting low fuel levels. Refuel by 2025-09-23, 6 PM to avoid downtime.",
        icon: <FaChartBar className="text-2xl text-gray-700" />,
        timestamp: "3 hours ago",
        read: false,
    },
    {
        id: 4,
        title: "Service: Log Submission Confirmed",
        description: "Your service log for Generator #101 has been submitted and is under review.",
        icon: <FaChartBar className="text-2xl text-gray-700" />,
        timestamp: "1 day ago",
        read: true,
    },
];

export default function TechnicianNotifications({ onNavigate }: TechnicianNotificationsProps) {
    const [readStatus, setReadStatus] = useState(notifications.map((notif) => ({ id: notif.id, read: notif.read })));

    const setRead = (id: number | null) => {
        setReadStatus((prev) =>
            id === null
                ? prev.map((status) => ({ ...status, read: true }))
                : prev.map((status) => (status.id === id ? { ...status, read: true } : status))
        );
    };

    const updatedNotifications = notifications.map((notif) => ({
        ...notif,
        read: readStatus.find((status) => status.id === notif.id)?.read || notif.read,
    }));

    return (
        <div className="flex-1 p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600 mb-2">Notifications</h1>
                        <p className="text-gray-600 text-base md:text-lg">View technician alerts and notifications</p>
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
                    <span className="text-gray-700 text-sm font-medium">
                        {updatedNotifications.length} notifications
                    </span>
                    <button
                        className="text-red-500 text-sm font-semibold hover:underline"
                        onClick={() => setRead(null)}
                        disabled={updatedNotifications.length === 0}
                    >
                        Mark All As Read
                    </button>
                </div>
                <div className="space-y-6">
                    {updatedNotifications.length === 0 ? (
                        <p className="text-gray-500 text-center">No notifications available.</p>
                    ) : (
                        updatedNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`border border-blue-200 rounded-lg p-4 flex items-start gap-4 bg-white ${notif.read ? 'bg-gray-50' : 'bg-orange-50'}`}
                            >
                                <div className="mt-1">{notif.icon}</div>
                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg text-gray-900 mb-1">{notif.title}</h2>
                                    <p className="text-gray-700 text-sm mb-2">{notif.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">{notif.timestamp}</span>
                                        {!notif.read && (
                                            <button
                                                className="text-sm text-orange-600 hover:text-orange-800"
                                                onClick={() => setRead(notif.id)}
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}