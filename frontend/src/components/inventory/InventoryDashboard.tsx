import { useState } from "react";

interface DashboardProps {
    onNavigate?: (page: string) => void;
}

export default function InventoryDashboard({ onNavigate }: DashboardProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);

    return (
        <div className="flex-1 p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-blue-600 mb-2">Inventory Dashboard</h1>
                    <p className="text-gray-600 text-lg">Welcome back!</p>
                </div>
                {/* Bell Icon for Notifications */}
                <div className="relative">
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.964 3.91 1.63 6.347 1.964L12 18z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 18c.278.473.46.992.512 1.558A2.992 2.992 0 0112 21a2.992 2.992 0 01-4.512-1.442c.052-.566.234-1.085.512-1.558" />
                        </svg>
                    </button>
                    {/* Small blue dot for notification */}
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
                </div>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium text-gray-500">Batteries In Stock</h3>
                        <span className="bg-yellow-100 p-2 rounded-full">
                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17 12a4 4 0 01-4 4H5.98l.68-1.36a1 1 0 00-.89-1.41L5 13l-.52-1.04a1 1 0 00-.89-1.41L3 10l-.48-1.04a1 1 0 00-.89-1.41L1 7l.52-1.04a1 1 0 00.89-1.41L3 4l.52-1.04a1 1 0 00.89-1.41L5 1l.52 1.04a1 1 0 00.89 1.41L7 4l.52 1.04a1 1 0 00.89 1.41L9 7l.52 1.04a1 1 0 00.89 1.41L11 10l.52 1.04a1 1 0 00.89 1.41L13 13l.52 1.04a1 1 0 00.89 1.41L15 15l.52 1.04a1 1 0 00.89 1.41L17 17z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </span>
                    </div>
                    <p className="text-4xl font-bold text-gray-800">247</p>
                    <p className="text-sm text-gray-400 mt-1">Due this week</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium text-gray-500">Temporary Out</h3>
                        <span className="bg-yellow-100 p-2 rounded-full">
                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17 12a4 4 0 01-4 4H5.98l.68-1.36a1 1 0 00-.89-1.41L5 13l-.52-1.04a1 1 0 00-.89-1.41L3 10l-.48-1.04a1 1 0 00-.89-1.41L1 7l.52-1.04a1 1 0 00.89-1.41L3 4l.52-1.04a1 1 0 00.89-1.41L5 1l.52 1.04a1 1 0 00.89 1.41L7 4l.52 1.04a1 1 0 00.89 1.41L9 7l.52 1.04a1 1 0 00.89 1.41L11 10l.52 1.04a1 1 0 00.89 1.41L13 13l.52 1.04a1 1 0 00.89 1.41L15 15l.52 1.04a1 1 0 00.89 1.41L17 17z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </span>
                    </div>
                    <p className="text-4xl font-bold text-gray-800">23</p>
                    <p className="text-sm text-gray-400 mt-1">Due this week</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium text-gray-500">Returns Due</h3>
                        <span className="bg-red-100 p-2 rounded-full">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L6 8.586 4.707 7.293a1 1 0 10-1.414 1.414L4.586 10l-1.293 1.293a1 1 0 101.414 1.414L6 11.414l1.293 1.293a1 1 0 001.414-1.414L7.414 10l1.293-1.293z" clipRule="evenodd"></path></svg>
                        </span>
                    </div>
                    <p className="text-4xl font-bold text-gray-800">7</p>
                    <p className="text-sm text-gray-400 mt-1">Currently in workshop</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium text-gray-500">Chargers Available</h3>
                        <span className="bg-blue-100 p-2 rounded-full">
                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm.83 2a2.83 2.83 0 00-5.66 0H5a1 1 0 00-1 1v4a1 1 0 001 1h2.17a2.83 2.83 0 005.66 0H15a1 1 0 001-1V9a1 1 0 00-1-1h-1.17zm.17 2v2H14v-2h-1.17zM6 10v2H5v-2h1z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </span>
                    </div>
                    <p className="text-4xl font-bold text-gray-800">10</p>
                    <p className="text-sm text-gray-400 mt-1">Need replacement</p>
                </div>
            </div>

            {/* Quick Actions + Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => onNavigate && onNavigate("Gate Pass Management")}
                            className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors duration-200"
                        >
                            <div className="text-2xl mb-2 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-xs font-medium text-blue-700">Create Gate Pass</p>
                        </button>
                        <button
                            onClick={() => onNavigate && onNavigate("Battery Management")}
                            className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors duration-200"
                        >
                            <div className="text-2xl mb-2 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.312M21 7.5v2.25m0-2.25L18.75 4.5M18.75 4.5L16.5 3.188M18.75 4.5v2.25m0-2.25L16.5 3.188m-2.25 4.312L12 6.75l-4.5 2.625M9 7.5l-2.25-1.312M9 7.5v2.25m0-2.25L6.75 4.5M6.75 4.5L4.5 3.188M6.75 4.5v2.25m0-2.25L4.5 3.188M3 10.5l4.5 2.625M12 12.75l4.5 2.625M12 12.75l-4.5 2.625M12 12.75L12 21M7.5 15l-4.5 2.625M16.5 15L12 17.625l-4.5-2.625M7.5 15v-2.25m9-2.25v2.25m.375-1.125l-4.5-2.625m4.5 2.625v2.25m.375-1.125L12 18.75l-4.5-2.625" />
                                </svg>
                            </div>
                            <p className="text-xs font-medium text-blue-700">Assign Temp Battery</p>
                        </button>
                        <button
                            onClick={() => onNavigate && onNavigate("Charger Management")}
                            className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors duration-200"
                        >
                            <div className="text-2xl mb-2 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l-3.25 1.75a.75.75 0 01-1 0L8.25 10.5m4.5-4.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm6.75 4.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm.75-4.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                </svg>
                            </div>
                            <p className="text-xs font-medium text-blue-700">Replace Charger</p>
                        </button>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activities</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between items-center">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                Generator 4G001 service completed
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Completed</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" clipRule="evenodd" fillRule="evenodd"></path><path d="M3 18a2 2 0 01-2-2V4a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H3zm13-2V4H4v12h12z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                Generator 4G024 marked as under repair
                            </span>
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">In progress</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM6.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm4.5 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                Battery replacement for Generator 6D045
                            </span>
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Pending</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.5-13.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm3 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"></path></svg>
                                Maintenance task assigned to Sahan Perera
                            </span>
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">In progress</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Pending Actions */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Pending Actions</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <p className="text-sm font-medium text-red-800">Gate Pass Approval <span className="text-gray-500 font-normal">GP-2025-0115</span></p>
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">High</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">Battery Conversion <span className="text-gray-500 font-normal">BAT-2025-098</span></p>
                        <span className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-full">Medium</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Charger Replacement <span className="text-gray-500 font-normal">CHG-2025-025</span></p>
                        <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">Low</span>
                    </div>
                </div>
            </div>
        </div>
    );
}