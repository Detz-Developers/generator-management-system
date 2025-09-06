import { useState } from 'react';

interface TechnicianDashboardProps {
  onNavigate?: (page: string) => void;
}

export default function TechnicianDashboard({ onNavigate }: TechnicianDashboardProps) {
  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Technician Dashboard</h1>
            <p className="text-gray-600 text-lg">Welcome back to your technician workspace!</p>
          </div>
        </div>
      </div>
    </div>
  );
}