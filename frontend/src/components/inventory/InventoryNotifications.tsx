import { useState } from "react";

interface NotificationsProps {
    onNavigate?: (page: string) => void;
}

export default function InventoryNotifications({ onNavigate }: NotificationsProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);

    const notifications = [
        {
            status: "Pending Review",
            issue: "Battery not charging properly",
            details: "Battery: BAT-2024-001 shows charging issues. Voltage drops rapidly after disconnection.",
            technician: "Dinal Rashmika",
            cost: "LKR 900",
            date: "7/20/2025",
            charger: "CHG-2024-005",
        },
        {
            status: "Investigating",
            issue: "Incorrect battery type assigned",
            details: "Generator requires Type-C battery but Type-A was installed. Performance issues reported.",
            technician: "Nimal Pereira",
            cost: "LKR 3000",
            date: "8/20/2025",
            battery: "BAT-2024-123",
        },
    ];

    const counts = {
        unread: 12,
        actionRequired: 28,
        highPriority: 3,
        today: 0,
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600 mb-2">Notifications</h1>
                        <p className="text-gray-600">Manage alerts, approvals, and system notifications</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                        Auto-Assign
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Unread</p>
                    <p className="text-2xl font-semibold text-blue-600">{counts.unread}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Action Required</p>
                    <p className="text-2xl font-semibold text-orange-600">{counts.actionRequired}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">High Priority</p>
                    <p className="text-2xl font-semibold text-red-600">{counts.highPriority}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-sm font-medium text-gray-500">Today</p>
                    <p className="text-2xl font-semibold text-green-600">{counts.today}</p>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Pending Review</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View All
                    </button>
                </div>
                
                {notifications.map((notification, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{notification.issue}</h3>
                                <p className="text-gray-600 mb-3">{notification.details}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">Action Taken:</span> Replaced fuel filter, tested system
                                    </div>
                                    <div>
                                        <span className="font-medium">Technician:</span> {notification.technician}
                                    </div>
                                    <div>
                                        <span className="font-medium">Cost:</span> {notification.cost}
                                    </div>
                                    <div>
                                        <span className="font-medium">Date:</span> {notification.date}
                                    </div>
                                </div>
                                
                                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Battery:</span> {notification.battery || 'N/A'}
                                    </div>
                                    <div>
                                        <span className="font-medium">Charger:</span> {notification.charger || 'N/A'}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="ml-4 flex flex-col items-end">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {notification.status}
                                </span>
                                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}