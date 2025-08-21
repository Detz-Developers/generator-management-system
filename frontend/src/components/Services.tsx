'use client';

import { useState } from 'react';

interface Service {
  id: string;
  name: string;
  type: 'maintenance' | 'repair' | 'inspection' | 'installation';
  provider: string;
  cost: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  generatorId?: string;
  description: string;
}

const mockServices: Service[] = [
  {
    id: 'SRV001',
    name: 'Annual Generator Maintenance',
    type: 'maintenance',
    provider: 'PowerTech Services',
    cost: 2500,
    status: 'scheduled',
    scheduledDate: '2024-03-01',
    generatorId: 'GEN001',
    description: 'Complete annual maintenance including oil change, filter replacement, and system diagnostics'
  },
  {
    id: 'SRV002',
    name: 'Emergency Repair Service',
    type: 'repair',
    provider: 'QuickFix Solutions',
    cost: 1200,
    status: 'in-progress',
    scheduledDate: '2024-02-18',
    generatorId: 'GEN002',
    description: 'Repair cooling system malfunction and replace damaged components'
  },
  {
    id: 'SRV003',
    name: 'Battery Bank Installation',
    type: 'installation',
    provider: 'Energy Systems Inc',
    cost: 15000,
    status: 'completed',
    scheduledDate: '2024-01-15',
    description: 'Installation of new lithium-ion battery bank with monitoring system'
  },
  {
    id: 'SRV004',
    name: 'Safety Inspection',
    type: 'inspection',
    provider: 'SafeGuard Inspections',
    cost: 800,
    status: 'scheduled',
    scheduledDate: '2024-02-25',
    description: 'Comprehensive safety inspection of all generator systems and compliance check'
  }
];

export default function Services() {
  const [services] = useState<Service[]>(mockServices);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'repair':
        return 'bg-red-100 text-red-800';
      case 'inspection':
        return 'bg-yellow-100 text-yellow-800';
      case 'installation':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCost = services.reduce((sum, service) => sum + service.cost, 0);
  const completedServices = services.filter(service => service.status === 'completed').length;

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Services
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Track maintenance and service activities
          </p>
        </div>

        {/* Service Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Services</p>
                <p className="text-2xl font-semibold text-gray-900">{services.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{completedServices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Cost</p>
                <p className="text-2xl font-semibold text-gray-900">${totalCost.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Service Requests</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Service
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {services.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(service.type)}`}>
                          {service.type}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${service.cost.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{service.id}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Provider:</span>
                      <p className="font-medium">{service.provider}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Scheduled Date:</span>
                      <p className="font-medium">{service.scheduledDate}</p>
                    </div>
                    {service.generatorId && (
                      <div>
                        <span className="text-gray-500">Generator:</span>
                        <p className="font-medium">{service.generatorId}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      Edit Service
                    </button>
                    <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                      Mark Complete
                    </button>
                    <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}