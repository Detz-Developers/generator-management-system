'use client';

import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';

interface Service {
  id: string;
  serviceId: string;
  generatorId: string;
  serviceType: string;
  technician: string;
  serviceDate: string;
  nextDueDate: string;
  notes: string;
  isOverdue: boolean;
  overdueDays?: number;
}

const services: Service[] = [
  {
    id: '1',
    serviceId: 'S001',
    generatorId: 'G001',
    serviceType: 'Oil Change',
    technician: 'John Smith',
    serviceDate: '7/15/2024',
    nextDueDate: '10/15/2024',
    notes: '',
    isOverdue: false
  },
  {
    id: '2',
    serviceId: 'S002',
    generatorId: 'G002',
    serviceType: 'Air Filter Replacement',
    technician: 'Mike Johnson',
    serviceDate: '7/20/2024',
    nextDueDate: '8/20/2024',
    notes: 'Overdue by 350 days',
    isOverdue: true,
    overdueDays: 350
  },
  {
    id: '3',
    serviceId: 'S003',
    generatorId: 'G003',
    serviceType: 'Routine Maintenance',
    technician: 'Sarah Wilson',
    serviceDate: '6/10/2024',
    nextDueDate: '8/5/2024',
    notes: 'Overdue by 305 days',
    isOverdue: true,
    overdueDays: 305
  },
  {
    id: '4',
    serviceId: 'S004',
    generatorId: 'G004',
    serviceType: 'Emergency Repair',
    technician: 'David Brown',
    serviceDate: '8/1/2024',
    nextDueDate: '11/1/2024',
    notes: '',
    isOverdue: false
  }
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.serviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.generatorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.technician.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'overdue' && service.isOverdue) ||
        (statusFilter === 'upcoming' && !service.isOverdue);
    const matchesType = serviceTypeFilter === 'all' || service.serviceType === serviceTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const completedServices = services.filter(s => !s.isOverdue).length;
  const upcomingServices = 0; // calculate based on current date
  const overdueServices = services.filter(s => s.isOverdue).length;
  const thisMonthServices = 0; // calculate based on current month

  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Services</h1>
            <p className="text-gray-600 text-lg">Track maintenance and service activities</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            + Log Service
          </button>
        </div>

        {/* Service Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="text-green-500 mb-3" size={32} />
              <h3 className="text-sm font-medium text-gray-500 mb-1">Completed</h3>
              <p className="text-3xl font-bold text-gray-900">{completedServices}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex flex-col items-center text-center">
              <Clock className="text-blue-500 mb-3" size={32} />
              <h3 className="text-sm font-medium text-gray-500 mb-1">Upcoming</h3>
              <p className="text-3xl font-bold text-gray-900">{upcomingServices}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="text-red-500 mb-3" size={32} />
              <h3 className="text-sm font-medium text-gray-500 mb-1">Overdue</h3>
              <p className="text-3xl font-bold text-gray-900">{overdueServices}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex flex-col items-center text-center">
              <Calendar className="text-purple-500 mb-3" size={32} />
              <h3 className="text-sm font-medium text-gray-500 mb-1">This Month</h3>
              <p className="text-3xl font-bold text-gray-900">{thisMonthServices}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="overdue">Overdue</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <select
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Air Filter Replacement">Air Filter Replacement</option>
              <option value="Routine Maintenance">Routine Maintenance</option>
              <option value="Emergency Repair">Emergency Repair</option>
            </select>
          </div>
        </div>

        {/* Service Log Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Service Log Table</h2>
            <p className="text-gray-600">{filteredServices.length} services found</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
              <tr className="border-b border-gray-200 bg-blue-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Service ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Generator ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Service Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Technician</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Service Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Next Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
              </thead>
              <tbody>
              {filteredServices.map((service, index) => (
                  <tr
                      key={service.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">{service.serviceId}</td>
                    <td className="py-3 px-4 text-gray-700">{service.serviceId}</td>
                    <td className="py-3 px-4">
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                      {service.generatorId}
                    </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{service.serviceType}</td>
                    <td className="py-3 px-4 text-gray-700">{service.technician}</td>
                    <td className="py-3 px-4 text-gray-700">{service.serviceDate}</td>
                    <td className={`py-3 px-4 font-medium ${
                        service.isOverdue ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      {service.nextDueDate}
                    </td>
                    <td className="py-3 px-4">
                      {service.notes ? (
                          <span className="text-red-600 text-sm">{service.notes}</span>
                      ) : (
                          <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors">
                          View
                        </button>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
  );
}
