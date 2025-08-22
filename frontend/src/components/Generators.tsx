'use client';

import { useState } from 'react';

interface Generator {
  id: string;
  brand: string;
  size: string;
  serialNumber: string;
  issuedDate: string;
  installedDate: string;
  status: 'active' | 'under-repair' | 'unusable';
  location: string;
  shop: string;
}

const generators: Generator[] = [
  {
    id: 'G001',
    brand: 'Caterpillar',
    size: '50kW',
    serialNumber: 'CAT123456',
    issuedDate: '2/12/2024',
    installedDate: '20/12/2024',
    status: 'active',
    location: 'Up',
    shop: 'Colombo'
  },
  {
    id: 'G002',
    brand: 'Honda',
    size: '15kW',
    serialNumber: 'HON123456',
    issuedDate: '3/12/2024',
    installedDate: '30/12/2024',
    status: 'under-repair',
    location: 'Up',
    shop: 'Gampaha'
  },
  {
    id: 'G003',
    brand: 'Kohler',
    size: '25kW',
    serialNumber: 'KOH123456',
    issuedDate: '4/12/2024',
    installedDate: '10/12/2024',
    status: 'unusable',
    location: 'Down',
    shop: 'Kandy'
  },
  {
    id: 'G004',
    brand: 'Caterpillar',
    size: '50kW',
    serialNumber: 'CAT223456',
    issuedDate: '5/12/2024',
    installedDate: '15/12/2024',
    status: 'active',
    location: 'Up',
    shop: 'Ratmalana'
  }
];

const getStatusColor = (status: Generator['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'under-repair':
      return 'bg-yellow-100 text-yellow-800';
    case 'unusable':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: Generator['status']) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'under-repair':
      return 'Under Repair';
    case 'unusable':
      return 'Unusable';
    default:
      return 'Unknown';
  }
};

export default function GeneratorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [shopFilter, setShopFilter] = useState('all');

  const filteredGenerators = generators.filter(generator => {
    const matchesSearch = generator.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        generator.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        generator.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || generator.status === statusFilter;
    const matchesBrand = brandFilter === 'all' || generator.brand === brandFilter;
    const matchesLocation = locationFilter === 'all' || generator.location === locationFilter;
    const matchesShop = shopFilter === 'all' || generator.shop === shopFilter;

    return matchesSearch && matchesStatus && matchesBrand && matchesLocation && matchesShop;
  });

  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Generators</h1>
              <p className="text-gray-600 text-lg">Manage all your generators across your centers</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              + Add Generator
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Generators</h3>
                <p className="text-3xl font-bold text-gray-900">178</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Active</h3>
                <p className="text-3xl font-bold text-gray-900">140</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Under Repair</h3>
                <p className="text-3xl font-bold text-gray-900">30</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Unusable</h3>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-500">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Search generators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="under-repair">Under Repair</option>
              <option value="unusable">Unusable</option>
            </select>
            <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Brands</option>
              <option value="Caterpillar">Caterpillar</option>
              <option value="Honda">Honda</option>
              <option value="Kohler">Kohler</option>
            </select>
            <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              <option value="Up">Up</option>
              <option value="Down">Down</option>
            </select>
            <select
                value={shopFilter}
                onChange={(e) => setShopFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Shops</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kandy">Kandy</option>
              <option value="Ratmalana">Ratmalana</option>
            </select>
          </div>
        </div>

        {/* Generator List Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-500">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Generator List</h2>
            <p className="text-gray-600">{filteredGenerators.length} generators found</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Generator ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Brand</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Size</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Serial Number</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Issued Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Installed Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Shop</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
              </thead>
              <tbody>
              {filteredGenerators.map((generator) => (
                  <tr key={generator.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{generator.id}</td>
                    <td className="py-3 px-4 text-gray-700">{generator.brand}</td>
                    <td className="py-3 px-4 text-gray-700">{generator.size}</td>
                    <td className="py-3 px-4 text-gray-700">{generator.serialNumber}</td>
                    <td className="py-3 px-4 text-gray-700">{generator.issuedDate}</td>
                    <td className="py-3 px-4 text-gray-700">{generator.installedDate}</td>
                    <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(generator.status)}`}>
                      {getStatusText(generator.status)}
                    </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{generator.location}</td>
                    <td className="py-3 px-4 text-gray-700">{generator.shop}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                          👁️
                        </button>
                        <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                          ✏️
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
