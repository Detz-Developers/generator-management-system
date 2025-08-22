'use client';

import { useState } from 'react';

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

  const filteredBatteries = batteries.filter(battery => {
    const matchesSearch = battery.batteryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        battery.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        battery.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || battery.type === typeFilter;
    const matchesBrand = brandFilter === 'all' || battery.brand === brandFilter;

    return matchesSearch && matchesType && matchesBrand;
  });

  const totalBatteries = batteries.length;
  const temporaryBatteries = batteries.filter(b => b.type === 'temporary').length;
  const permanentBatteries = batteries.filter(b => b.type === 'permanent').length;
  const returnOverdueBatteries = batteries.filter(b => b.isReturnOverdue).length;

  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Batteries</h1>
              <p className="text-gray-600 text-lg">Manage battery inventory and assignments</p>
            </div>
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              + Add Battery
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🔋</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Batteries</h3>
              <p className="text-3xl font-bold text-gray-900">{totalBatteries}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🔋</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Temporary</h3>
              <p className="text-3xl font-bold text-gray-900">{temporaryBatteries}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-2xl">🔋</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Permanent</h3>
              <p className="text-3xl font-bold text-gray-900">{permanentBatteries}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-3">
                <span className="text-xl text-white">⚠️</span>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Return Overdue</h3>
              <p className="text-3xl font-bold text-gray-900">{returnOverdueBatteries}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
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
      </div>
  );
}
