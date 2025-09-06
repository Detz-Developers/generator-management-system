'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import OperatorSidebar from '@/components/operator/OperatorSidebar';
import TechnicianSidebar from '@/components/technician/TechnicianSidebar';
import InventorySidebar from '@/components/inventory/InventorySidebar';
import { InventoryMainDashboard } from '@/components/inventory';
import NotificationCenter from '@/components/admin/NotificationCenter';
import Dashboard from '@/components/admin/Dashboard';
import OperatorDashboard from '@/components/operator/OperatorIssueReporting.tsx';
import TechnicianDashboard from '@/components/technician/TechnicianTasks';
import InventoryDashboard from '@/components/inventory/InventoryDashboard';
import Generators from '@/components/admin/Generators';
import Batteries from '@/components/admin/Batteries';
import Tasks from '@/components/admin/Tasks';
import Services from '@/components/admin/Services';
import Shops from '@/components/admin/Shops';
import Invoices from '@/components/Invoices';
import CreateInvoice from '@/components/admin/CreateInvoice';
import Reports from '@/components/admin/Reports';
import Users from '@/components/admin/Users';
import Login from '@/components/Login';
import GeneratorDetails from '@/components/admin/GeneratorDetails';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>('admin');
  const [userEmail, setUserEmail] = useState<string>('');
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const handleLogin = (role: string, email: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('admin');
    setUserEmail('');
    setCurrentPage('Dashboard'); // Reset to dashboard when logging back in
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'Generators':
        return <Generators onNavigate={setCurrentPage}/>;
      case 'Batteries':
        return <Batteries />;
      case 'Tasks':
        return <Tasks />;
      case 'Services':
        return <Services />;
      case 'Shops':
        return <Shops />;
      case 'Invoices':
        return <Invoices onNavigate={setCurrentPage} />;
      case 'CreateInvoice':
        return <CreateInvoice onBack={() => setCurrentPage('Invoices')} />;
      case 'Reports':
        return <Reports />;
      case 'Users':
        return <Users />;
      case 'Notifications':
        return <NotificationCenter />;
      case 'GeneratorDetails':
        return <GeneratorDetails onNavigate={setCurrentPage} />;
      default:
        return (
          <div className="flex-1 p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {currentPage}
                </h1>
                <p className="text-gray-600 text-base md:text-lg">
                  {currentPage} page content will be implemented here.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-500">This section is under development.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderRoleBasedPanel = () => {
    switch (userRole) {
      case 'admin':
        return (
          <div className="flex h-screen bg-gray-50">
            <div className="flex-shrink-0">
              <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} onLogout={handleLogout} userRole="admin" />
            </div>
            <main className="flex-1 overflow-auto">
              {renderContent()}
            </main>
          </div>
        );
      case 'operate':
        return (
          <div className="flex h-screen bg-gray-50">
            <div className="flex-shrink-0">
              <OperatorSidebar onNavigate={setCurrentPage} currentPage={currentPage} onLogout={handleLogout} />
            </div>
            <main className="flex-1 overflow-auto">
              {renderOperatorContent()}
            </main>
          </div>
        );
      case 'tech':
        return (
          <div className="flex h-screen bg-gray-50">
            <div className="flex-shrink-0">
              <TechnicianSidebar onNavigate={setCurrentPage} currentPage={currentPage} onLogout={handleLogout} />
            </div>
            <main className="flex-1 overflow-auto">
              {renderTechnicianContent()}
            </main>
          </div>
        );
      case 'invent':
        return <InventoryMainDashboard onLogout={handleLogout} userRole="inventory" />;
      default:
        return (
          <div className="flex h-screen bg-gray-50">
            <div className="flex-shrink-0">
              <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} onLogout={handleLogout} userRole="admin" />
            </div>
            <main className="flex-1 overflow-auto">
              {renderContent()}
            </main>
          </div>
        );
    }
  };

  const renderOperatorContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <OperatorDashboard onNavigate={setCurrentPage} />;
      case 'Generators':
        return <Generators onNavigate={setCurrentPage}/>;
      case 'Tasks':
        return <Tasks />;
      case 'Services':
        return <Services />;
      case 'Notifications':
        return <NotificationCenter />;
      default:
        return <OperatorDashboard onNavigate={setCurrentPage} />;
    }
  };

  const renderTechnicianContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <TechnicianDashboard onNavigate={setCurrentPage} />;
      case 'Tasks':
        return <Tasks />;
      case 'Services':
        return <Services />;
      case 'Notifications':
        return <NotificationCenter />;
      default:
        return <TechnicianDashboard onNavigate={setCurrentPage} />;
    }
  };

  const renderInventoryContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <InventoryDashboard onNavigate={setCurrentPage} />;
      case 'Batteries':
        return <Batteries />;
      case 'Generators':
        return <Generators onNavigate={setCurrentPage}/>;
      case 'Notifications':
        return <NotificationCenter />;
      default:
        return <InventoryDashboard onNavigate={setCurrentPage} />;
    }
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return renderRoleBasedPanel();
}
