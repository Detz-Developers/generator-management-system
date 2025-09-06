import { useState } from "react";

interface NotificationsProps {
    onNavigate?: (page: string) => void;
}

export default function InventoryNotifications({ onNavigate }: NotificationsProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
    return (
        <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600 mb-2">Notifications</h1>
                        <p className="text-gray-600 text-lg">View and manage system notifications</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
