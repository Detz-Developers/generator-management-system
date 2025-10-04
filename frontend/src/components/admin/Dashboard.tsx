import MetricCard from '../MetricCard';
import QuickActions from "@/components/QuickActions";
import RecentActivities from "@/components/RecentActivities";
import AISummaryPopup from "@/components/AISummaryPopup";
import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebaseConfig";

interface DashboardProps {
    onNavigate?: (page: string) => void;
}

interface Service {
    id: string;
    scheduledDate: string | number;
    status: string;
}

interface Generator {
    id: string;
    status: string;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
    const [metrics, setMetrics] = useState({
        totalCenters: 0,
        upcomingServices: 0,
        underRepair: 0,
        unusableGenerators: 0,
    });

    // Fetch data from Firebase
    useEffect(() => {
        const unsubscribers: (() => void)[] = [];

        // Fetch shops
        const shopsRef = ref(db, 'shops');
        const shopsUnsubscribe = onValue(shopsRef, (snapshot) => {
            const shopsData = snapshot.val();
            const totalCenters = shopsData ? Object.keys(shopsData).length : 0;
            
            setMetrics(prev => ({ ...prev, totalCenters }));
        });
        unsubscribers.push(shopsUnsubscribe);

        // Fetch services
        const servicesRef = ref(db, 'services');
        const servicesUnsubscribe = onValue(servicesRef, (servicesSnapshot) => {
            const servicesData = servicesSnapshot.val();
            const today = new Date(1759382940000); // Oct 01, 2025, 04:49 PM +0530
            const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const upcomingServices = servicesData
                ? Object.values(servicesData as Record<string, Service>).filter((service: Service) => {
                    const scheduledDate = new Date(service.scheduledDate);
                    return (
                        scheduledDate >= today &&
                        scheduledDate <= oneWeekLater &&
                        service.status === "scheduled"
                    );
                }).length
                : 0;

            setMetrics(prev => ({ ...prev, upcomingServices }));
        });
        unsubscribers.push(servicesUnsubscribe);

        // Fetch generators
        const generatorsRef = ref(db, 'generators');
        const generatorsUnsubscribe = onValue(generatorsRef, (generatorsSnapshot) => {
            const generatorsData = generatorsSnapshot.val();
            const underRepair = generatorsData
                ? Object.values(generatorsData as Record<string, Generator>).filter((gen: Generator) => gen.status === "Under Repair").length
                : 0;
            const unusableGenerators = generatorsData
                ? Object.values(generatorsData as Record<string, Generator>).filter((gen: Generator) => gen.status === "Unusable").length
                : 0;

            setMetrics(prev => ({
                ...prev,
                underRepair,
                unusableGenerators,
            }));
        });
        unsubscribers.push(generatorsUnsubscribe);

        return () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
        };
    }, []);

    const handleGenerateAISummary = async () => {
        try {
            const res = await fetch("/api/ai-summary", { method: "POST" });
            await res.text();
            setIsAISummaryOpen(true);
        } catch (err) {
            console.error("AI Summary error:", err);
        }
    };

    return (
        <div className="flex-1 p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600 mb-2">Dashboard</h1>
                        <p className="text-gray-600 text-lg">Welcome back!</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleGenerateAISummary}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                            <span className="text-lg">🤖</span>
                            <span className="font-medium">Generate AI Summary</span>
                        </button>
                        <button
                            onClick={() => onNavigate?.('Notifications')}
                            className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Notifications"
                        >
                            <span className="text-xl">🔔</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Total Centers"
                    value={metrics.totalCenters}
                    subtitle="Across all centers"
                    icon="⚡"
                    variant="primary"
                />
                <MetricCard
                    title="Upcoming Services"
                    value={metrics.upcomingServices}
                    subtitle="Due this week"
                    icon="🔧"
                />
                <MetricCard
                    title="Under Repair"
                    value={metrics.underRepair}
                    subtitle="Currently in workshop"
                    icon="⚠️"
                />
                <MetricCard
                    title="Unusable Generators"
                    value={metrics.unusableGenerators}
                    subtitle="Need replacement"
                    icon="🔋"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <QuickActions onNavigate={onNavigate} />
                <RecentActivities activities={[]} />
            </div>

            <AISummaryPopup
                isOpen={isAISummaryOpen}
                onClose={() => setIsAISummaryOpen(false)}
            />
        </div>
    );
}