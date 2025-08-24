'use client';

import { useState } from 'react';
import { Battery, Clock, CheckCircle, CalendarX, Calendar, Eye, Pencil } from 'lucide-react';

interface Battery {
  id: string;
  batteryId: string;
  brand: string;
  size: string;
  serialNumber: string;
  type: 'permanent' | 'temporary';
  installDate: string;
  generatorId: string;
  gatePass: string | null;
  isReturnOverdue: boolean;
}

const batteries: Battery[] = [
  {
    id: '1',
    batteryId: 'B001',
    brand: 'Exide',
    size: 'NS 40',
    serialNumber: 'EXI123456789',
    type: 'permanent',
    installDate: '8/12/2024',
    generatorId: 'G001',
    gatePass: null,
    isReturnOverdue: false
  },
  {
    id: '2',
    batteryId: 'B002',
    brand: 'Amaron',
    size: '100Ah',
    serialNumber: 'AMA987654321',
    type: 'temporary',
    installDate: '9/12/2024',
    generatorId: 'G002',
    gatePass: 'GP20250501',
    isReturnOverdue: true
  },
  {
    id: '3',
    batteryId: 'B003',
    brand: 'Luminous',
    size: '150Ah',
    serialNumber: 'LUM555444333',
    type: 'permanent',
    installDate: '5/12/2024',
    generatorId: 'G003',
    gatePass: null,
    isReturnOverdue: false
  },
  {
    id: '4',
    batteryId: 'B004',
    brand: 'Okaya',
    size: '120Ah',
    serialNumber: 'OKAY777888999',
    type: 'temporary',
    installDate: '4/12/2024',
    generatorId: 'G004',
    gatePass: 'GP20250101',
    isReturnOverdue: true
  }
];

export default function BatteriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editBattery, setEditBattery] = useState<Battery | null>(null);
  const [viewBattery, setViewBattery] = useState<Battery | null>(null);
  const [batteryList, setBatteryList] = useState<Battery[]>(batteries);
  const [form, setForm] = useState({
    batteryId: '',
    brand: '',
    size: '',
    serialNumber: '',
    type: 'permanent',
    installDate: '',
    generatorId: '',
    gatePass: '',
    isReturnOverdue: false
  });
  // View Battery
  const handleViewBattery = (battery: Battery) => {
    setViewBattery(battery);
    setShowViewModal(true);
  };

  const filteredBatteries = batteryList.filter(battery => {
    const matchesSearch = battery.batteryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      battery.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      battery.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || battery.type === typeFilter;
    const matchesBrand = brandFilter === 'all' || battery.brand === brandFilter;
    return matchesSearch && matchesType && matchesBrand;
  });

  const totalBatteries = batteryList.length;
  const temporaryBatteries = batteryList.filter(b => b.type === 'temporary').length;
  const permanentBatteries = batteryList.filter(b => b.type === 'permanent').length;
  const returnOverdueBatteries = batteryList.filter(b => b.isReturnOverdue).length;

  // Add Battery
  const handleAddBattery = () => {
    setShowAddModal(true);
    setForm({
      batteryId: '',
      brand: '',
      size: '',
      serialNumber: '',
      type: 'permanent',
      installDate: '',
      generatorId: '',
      gatePass: '',
      isReturnOverdue: false
    });
  };

  const handleEditBattery = (battery: Battery) => {
    setEditBattery(battery);
    setForm({
      batteryId: battery.batteryId,
      brand: battery.brand,
      size: battery.size,
      serialNumber: battery.serialNumber,
      type: battery.type,
      installDate: battery.installDate,
      generatorId: battery.generatorId,
      gatePass: battery.gatePass || '',
      isReturnOverdue: battery.isReturnOverdue
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showAddModal) {
      const newBattery: Battery = {
        id: (batteryList.length + 1).toString(),
        ...form
      } as Battery;
      setBatteryList([...batteryList, newBattery]);
      setShowAddModal(false);
    } else if (showEditModal && editBattery) {
      setBatteryList(
        batteryList.map(b =>
          b.id === editBattery.id
            ? {
                ...editBattery,
                ...form,
                type: form.type as Battery["type"]
              }
            : b
        )
      );
      setShowEditModal(false);
      setEditBattery(null);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setEditBattery(null);
    setViewBattery(null);
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Batteries</h1>
            <p className="text-gray-600 text-lg">Manage battery inventory and assignments</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-colors" onClick={handleAddBattery}>
            + Add Battery
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border text-center border-blue-200 bg-white rounded-lg shadow-lg p-6">
          <Battery className="mx-auto text-3xl text-gray-700 mb-2" />
          <h3 className="text-sm text-gray-500">Total Batteries</h3>
          <p className="text-xl font-bold">{totalBatteries}</p>
        </div>
        <div className="border text-center border-blue-200 bg-white rounded-lg shadow-lg p-6">
          <Battery className="mx-auto text-3xl text-yellow-500 mb-2" />
          <h3 className="text-sm text-gray-500">Temporary</h3>
          <p className="text-xl font-bold">{temporaryBatteries}</p>
        </div>
        <div className="border text-center border-blue-200 bg-white rounded-lg shadow-lg p-6">
          <Battery className="mx-auto text-3xl text-blue-500 mb-2" />
          <h3 className="text-sm text-gray-500">Permanent</h3>
          <p className="text-xl font-bold">{permanentBatteries}</p>
        </div>
        <div className="border text-center border-blue-200 bg-white rounded-lg shadow-lg p-6">
          <Clock className="mx-auto text-red-500 mb-2" />
          <h3 className="text-sm text-gray-500">Return Overdue</h3>
          <p className="text-xl font-bold">{returnOverdueBatteries}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search batteries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="permanent">Permanent</option>
            <option value="temporary">Temporary</option>
          </select>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Brands</option>
            <option value="Exide">Exide</option>
            <option value="Amaron">Amaron</option>
            <option value="Luminous">Luminous</option>
            <option value="Okaya">Okaya</option>
          </select>
        </div>
      </div>

      {/* Batteries Table/List */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Battery List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Battery ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Serial No.</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Install Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Generator ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Gate Pass</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Return Overdue</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatteries.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-4 text-gray-500">No batteries found.</td>
                </tr>
              ) : (
                filteredBatteries.map(battery => (
                  <tr key={battery.id} className="hover:bg-blue-50">
                    <td className="px-4 py-2 text-sm">{battery.id}</td>
                    <td className="px-4 py-2 text-sm">{battery.batteryId}</td>
                    <td className="px-4 py-2 text-sm">{battery.brand}</td>
                    <td className="px-4 py-2 text-sm">{battery.size}</td>
                    <td className="px-4 py-2 text-sm">{battery.serialNumber}</td>
                    <td className="px-4 py-2 text-sm">{battery.type}</td>
                    <td className="px-4 py-2 text-sm">{battery.installDate}</td>
                    <td className="px-4 py-2 text-sm">{battery.generatorId}</td>
                    <td className="px-4 py-2 text-sm">{battery.gatePass || '-'}</td>
                    <td className="px-4 py-2 text-sm">{battery.isReturnOverdue ? <span className="text-red-500">Yes</span> : <span className="text-green-500">No</span>}</td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex flex-row gap-2">
                        <button title="Edit" className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center justify-center" onClick={() => handleEditBattery(battery)}>
                          <Pencil size={18} />
                        </button>
                        <button title="View" className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center justify-center" onClick={() => handleViewBattery(battery)}>
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{showAddModal ? 'Add Battery' : 'Edit Battery'}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="batteryId" value={form.batteryId} onChange={handleFormChange} required placeholder="Battery ID" className="border px-3 py-2 rounded" />
                <input name="brand" value={form.brand} onChange={handleFormChange} required placeholder="Brand" className="border px-3 py-2 rounded" />
                <input name="size" value={form.size} onChange={handleFormChange} required placeholder="Size" className="border px-3 py-2 rounded" />
                <input name="serialNumber" value={form.serialNumber} onChange={handleFormChange} required placeholder="Serial Number" className="border px-3 py-2 rounded" />
                <select name="type" value={form.type} onChange={handleFormChange} className="border px-3 py-2 rounded">
                  <option value="permanent">Permanent</option>
                  <option value="temporary">Temporary</option>
                </select>
                <input name="installDate" value={form.installDate} onChange={handleFormChange} required placeholder="Install Date" className="border px-3 py-2 rounded" />
                <input name="generatorId" value={form.generatorId} onChange={handleFormChange} required placeholder="Generator ID" className="border px-3 py-2 rounded" />
                <input name="gatePass" value={form.gatePass} onChange={handleFormChange} placeholder="Gate Pass" className="border px-3 py-2 rounded" />
                <label className="flex items-center col-span-2">
                  <input type="checkbox" name="isReturnOverdue" checked={form.isReturnOverdue} onChange={handleFormChange} className="mr-2" />
                  Return Overdue
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={closeModal}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">{showAddModal ? 'Add' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewBattery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Battery Details</h2>
            <div className="space-y-2">
              <div><span className="font-semibold">Battery ID:</span> {viewBattery.batteryId}</div>
              <div><span className="font-semibold">Brand:</span> {viewBattery.brand}</div>
              <div><span className="font-semibold">Size:</span> {viewBattery.size}</div>
              <div><span className="font-semibold">Serial Number:</span> {viewBattery.serialNumber}</div>
              <div><span className="font-semibold">Type:</span> {viewBattery.type}</div>
              <div><span className="font-semibold">Install Date:</span> {viewBattery.installDate}</div>
              <div><span className="font-semibold">Generator ID:</span> {viewBattery.generatorId}</div>
              <div><span className="font-semibold">Gate Pass:</span> {viewBattery.gatePass || '-'}</div>
              <div><span className="font-semibold">Return Overdue:</span> {viewBattery.isReturnOverdue ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
