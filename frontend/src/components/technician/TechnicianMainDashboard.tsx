'use client';

import { useState } from 'react';
import TechnicianSidebar from './TechnicianSidebar';
import TechnicianTasks from './TechnicianTasks';
import TechnicianServicesLogging from './TechnicianSevicesLogging';
import TechnicianIssueReporting from './TechnicianIssuesReporting';
import TechnicianAssignedGenerators from './TechnicianAssignedGenerators';
import {TechnicianNotifications} from "@/components/technician/index";

interface TechnicianMainDashboardProps {
  onLogout: () => void;
  userRole?: string;
}

export default function TechnicianMainDashboard({ onLogout, userRole = 'technician' }: TechnicianMainDashboardProps) {
  const [currentPage, setCurrentPage] = useState('Tasks');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Tasks':
        return <TechnicianTasks onNavigate={handleNavigate} />;
      case 'Services Logging':
        return <TechnicianServicesLogging onNavigate={handleNavigate} />;
      case 'Issue Reporting':
        return <TechnicianIssueReporting onNavigate={handleNavigate} />;
      case 'Assigned Generators':
        return <TechnicianAssignedGenerators onNavigate={handleNavigate} />;
      case 'Notifications':
        return <TechnicianNotifications onNavigate={handleNavigate} />;
      default:
        return <TechnicianTasks onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <TechnicianSidebar
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onLogout={onLogout}
        userRole={userRole}
      />
      <main className="flex-1 overflow-auto">
        {renderCurrentPage()}
      </main>
    </div>
  );
}