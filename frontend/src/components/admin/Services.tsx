'use client';

import { useMemo, useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Calendar, X, Plus } from 'lucide-react';
import { MdSearch } from 'react-icons/md';

interface Service {
  id: string;
  serviceId: string;
  generatorId: string;
  serviceType: string;
  technician: string;
  serviceCost?: string; // stored as string for simple input binding
  serviceDate: string;  // e.g., "7/15/2024"
  nextDueDate: string;  // e.g., "10/15/2024"
  notes: string;
  isOverdue: boolean;
  overdueDays?: number;
}

const initialServices: Service[] = [
  {
    id: '1',
    serviceId: 'S001',
    generatorId: 'G001',
    serviceType: 'Oil Change',
    technician: 'John Smith',
    serviceCost: '200',
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
    serviceCost: '150',
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
    serviceCost: '400',
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
    serviceCost: '600',
    serviceDate: '8/1/2024',
    nextDueDate: '11/1/2024',
    notes: '',
    isOverdue: false
  }
];

const serviceTypeOptions = [
  'Oil Change',
  'Air Filter Replacement',
  'Routine Maintenance',
  'Emergency Repair',
  'Battery Service',
  'Cooling System Check',
  'Fuel System Inspection',
  'Electrical Check'
];

const generatorOptions = ['G001', 'G002', 'G003', 'G004'];
const technicianOptions = ['John Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'overdue' | 'upcoming'>('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all');

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({});

  // ---- Utilities ----
  const parseDate = (d: string) => new Date(d);
  const isSameMonthYear = (dateStr: string, ref: Date) => {
    const d = parseDate(dateStr);
    return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
  };

  // ---- Metrics (computed) ----
  const now = useMemo(() => new Date(), []);
  const completedServices = useMemo(() => services.filter(s => !s.isOverdue).length, [services]);
  const overdueServices = useMemo(() => services.filter(s => s.isOverdue).length, [services]);

  const upcomingServices = useMemo(
    () =>
      services.filter(s => !s.isOverdue && parseDate(s.nextDueDate) > now).length,
    [services, now]
  );

  const thisMonthServices = useMemo(
    () => services.filter(s => isSameMonthYear(s.serviceDate, now)).length,
    [services, now]
  );

  // ---- Filters ----
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.serviceId.toLowerCase().includes(q) ||
        service.generatorId.toLowerCase().includes(q) ||
        service.serviceType.toLowerCase().includes(q) ||
        service.technician.toLowerCase().includes(q) ||
        (service.notes ?? '').toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'overdue' && service.isOverdue) ||
        (statusFilter === 'upcoming' && !service.isOverdue);

      const matchesType = serviceTypeFilter === 'all' || service.serviceType === serviceTypeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [services, searchTerm, statusFilter, serviceTypeFilter]);

  // ---- Modal helpers ----
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({});
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setIsEditing(true);
    setFormData(service);
    setIsModalOpen(true);
  };

  const handleFormChange = (field: keyof Service, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (generatorId, serviceType, technician, dates)
    if (!formData.generatorId || !formData.serviceType || !formData.technician) {
      alert('Please select Generator, Service Type, and Technician.');
      return;
    }
    if (!formData.serviceDate || !formData.nextDueDate) {
      alert('Please provide Service Date and Next Due Date.');
      return;
    }

    if (isEditing && formData.id) {
      setServices(prev =>
        prev.map(s => (s.id === formData.id ? { ...s, ...(formData as Service) } : s))
      );
    } else {
      const newIndex = services.length + 1;
      const newService: Service = {
        id: String(newIndex),
        serviceId: `S${String(newIndex).padStart(3, '0')}`,
        generatorId: formData.generatorId!,
        serviceType: formData.serviceType!,
        technician: formData.technician!,
        serviceCost: formData.serviceCost || '0',
        serviceDate: formData.serviceDate!,
        nextDueDate: formData.nextDueDate!,
        notes: formData.notes || '',
        isOverdue: false
      };
      setServices(prev => [newService, ...prev]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Services</h1>
          <p className="text-gray-600 text-lg">Track maintenance and service activities</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} /> Log Service
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-3" size={32} />
          <h3 className="text-sm font-medium text-gray-500 mb-1">Completed</h3>
          <p className="text-3xl font-bold text-gray-900">{completedServices}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 text-center">
          <Clock className="text-blue-500 mx-auto mb-3" size={32} />
          <h3 className="text-sm font-medium text-gray-500 mb-1">Upcoming</h3>
          <p className="text-3xl font-bold text-gray-900">{upcomingServices}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 text-center">
          <AlertCircle className="text-red-500 mx-auto mb-3" size={32} />
          <h3 className="text-sm font-medium text-gray-500 mb-1">Overdue</h3>
          <p className="text-3xl font-bold text-gray-900">{overdueServices}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 text-center">
          <Calendar className="text-purple-500 mx-auto mb-3" size={32} />
          <h3 className="text-sm font-medium text-gray-500 mb-1">This Month</h3>
          <p className="text-3xl font-bold text-gray-900">{thisMonthServices}</p>
        </div>
      </div>

      {/* Filters */}
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
            <MdSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'overdue' | 'upcoming')}
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
            {serviceTypeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Service Log Table */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Log Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-50 text-blue-600 font-semibold">
                <th className="p-3 text-left">Service ID</th>
                <th className="p-3 text-left">Generator ID</th>
                <th className="p-3 text-left">Service Type</th>
                <th className="p-3 text-left">Technician</th>
                <th className="p-3 text-left">Cost</th>
                <th className="p-3 text-left">Service Date</th>
                <th className="p-3 text-left">Next Due Date</th>
                <th className="p-3 text-left">Notes</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((s, i) => (
                <tr
                  key={s.id}
                  className={`hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="p-3 font-semibold text-gray-800">{s.serviceId}</td>
                  <td className="p-3">{s.generatorId}</td>
                  <td className="p-3">{s.serviceType}</td>
                  <td className="p-3">{s.technician}</td>
                  <td className="p-3">${s.serviceCost ?? '0'}</td>
                  <td className="p-3">{s.serviceDate}</td>
                  <td className="p-3">
                    {s.nextDueDate}
                    {s.isOverdue && (
                      <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="p-3">{s.notes}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setSelectedService(s)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openEditModal(s)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredServices.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={9}>
                    No services match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close details"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-2 text-blue-600">Service Details</h2>
            <div className="space-y-2 text-sm">
              <p><b>Service ID:</b> {selectedService.serviceId}</p>
              <p><b>Generator ID:</b> {selectedService.generatorId}</p>
              <p><b>Type:</b> {selectedService.serviceType}</p>
              <p><b>Technician:</b> {selectedService.technician}</p>
              <p><b>Cost:</b> ${selectedService.serviceCost ?? '0'}</p>
              <p><b>Service Date:</b> {selectedService.serviceDate}</p>
              <p><b>Next Due:</b> {selectedService.nextDueDate}</p>
              <p><b>Notes:</b> {selectedService.notes || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-2 text-blue-600">
              {isEditing ? 'Edit Service' : 'Log Service'}
            </h2>
            <p className="text-sm text-gray-500 mb-6">Record service activities and maintenance</p>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.generatorId || ''}
                  onChange={(e) => handleFormChange('generatorId', e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                >
                  <option value="">Select generator</option>
                  {generatorOptions.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>

                <select
                  value={formData.serviceType || ''}
                  onChange={(e) => handleFormChange('serviceType', e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                >
                  <option value="">Select service type</option>
                  {serviceTypeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={formData.technician || ''}
                  onChange={(e) => handleFormChange('technician', e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                >
                  <option value="">Select technician</option>
                  {technicianOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Enter service cost"
                  value={formData.serviceCost || ''}
                  onChange={(e) => handleFormChange('serviceCost', e.target.value)}
                  className="border p-2 rounded-lg"
                  min={0}
                />
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.serviceDate || ''}
                  onChange={(e) => handleFormChange('serviceDate', e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
                <input
                  type="date"
                  value={formData.nextDueDate || ''}
                  onChange={(e) => handleFormChange('nextDueDate', e.target.value)}
                  className="border p-2 rounded-lg"
                  required
                />
              </div>

              {/* Notes */}
              <textarea
                placeholder="Enter technician notes and observations..."
                value={formData.notes || ''}
                onChange={(e) => handleFormChange('notes', e.target.value)}
                className="border p-2 rounded-lg w-full h-24"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {isEditing ? 'Update Service' : 'Log Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
