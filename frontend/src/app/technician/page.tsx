'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import TechnicianSidebar from '@/components/technician/TechnicianSidebar';
import TechnicianTasks from '@/components/technician/TechnicianTasks';
import TechnicianServicesLogging from '@/components/technician/TechnicianSevicesLogging';
import TechnicianAssignedGenerators from '@/components/technician/TechnicianAssignedGenerators';
import TechnicianIssuesReporting from '@/components/technician/TechnicianIssuesReporting';
import TechnicianNotifications from '@/components/technician/TechnicianNotifications';

interface TechnicianPanelProps {
  onLogout?: () => void;
}

export default function TechnicianPanel({ onLogout }: TechnicianPanelProps) {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const router = useRouter();

  const renderContent = () => {
    switch (currentPage) {
      case 'Reports':
        return <TechnicianIssuesReporting onNavigate={setCurrentPage} />;
      case 'Tasks':
        return <TechnicianTasks onNavigate={setCurrentPage} />;
      case 'Services':
        return <TechnicianServicesLogging onNavigate={setCurrentPage} />;
      case 'Generators':
        return <TechnicianAssignedGenerators onNavigate={setCurrentPage} />;
      case 'Notifications':
        return <TechnicianNotifications onNavigate={setCurrentPage} />;

      default:
        return (
          <div className="flex-1 p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {currentPage}
                </h1>
                <p className="text-gray-600 text-base md:text-lg">
                  Technician {currentPage} page content will be implemented here.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Technician Panel</h3>
                  <p className="text-gray-500">This section is under development.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-shrink-0">
        <TechnicianSidebar
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          onLogout={onLogout ?? (async () => { try { await signOut(auth); } catch (e) { console.error('Logout error', e); } router.push('/'); })}
        />
      </div>
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
