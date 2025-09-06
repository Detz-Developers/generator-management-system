
interface OperatorDashboardProps {
    onNavigate?: (page: string) => void;
}

export default function OperatorDashboard({ onNavigate }: OperatorDashboardProps) {
    return (
        <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600 mb-2">Operator Dashboard</h1>
                        <p className="text-gray-600 text-lg">Welcome back to your operator workspace!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}