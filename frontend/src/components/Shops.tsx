'use client';

import { useState } from 'react';
import { Building2, Eye, Edit, MapPin, Phone, X } from 'lucide-react';
import { MdSearch } from "react-icons/md";
import ShopDetails from './ShopDetails';

interface Shop {
  id: string;
  shopId: string;
  centerName: string;
  location: string;
  assignedOperator: string;
  operatorPhone: string;
  totalGenerators: number;
  activeGenerators: number;
  status: 'active' | 'issues' | 'missing items';
}

const shops: Shop[] = [
  {
    id: '1',
    shopId: 'SH001',
    centerName: 'Downtown Generator Center',
    location: 'Colombo',
    assignedOperator: 'Rajesh Kumar',
    operatorPhone: '+94-701-234567',
    totalGenerators: 15,
    activeGenerators: 12,
    status: 'active'
  },
  {
    id: '2',
    shopId: 'SH002',
    centerName: 'Industrial Zone Hub',
    location: 'Gampaha',
    assignedOperator: 'Priya Sharma',
    operatorPhone: '+94-702-345678',
    totalGenerators: 22,
    activeGenerators: 18,
    status: 'issues'
  },
  {
    id: '3',
    shopId: 'SH003',
    centerName: 'Suburban Service Point',
    location: 'Kandy',
    assignedOperator: 'Amit Patel',
    operatorPhone: '+94-703-456789',
    totalGenerators: 8,
    activeGenerators: 5,
    status: 'missing items'
  },
  {
    id: '4',
    shopId: 'SH004',
    centerName: 'Tech Park Center',
    location: 'Negombo',
    assignedOperator: 'Sunita Reddy',
    operatorPhone: '+94-704-567890',
    totalGenerators: 18,
    activeGenerators: 17,
    status: 'active'
  },
  {
    id: '5',
    shopId: 'SH005',
    centerName: 'Harbor City Service',
    location: 'Galle',
    assignedOperator: 'Nuwan Fernando',
    operatorPhone: '+94-705-678901',
    totalGenerators: 12,
    activeGenerators: 10,
    status: 'issues'
  },
  {
    id: '6',
    shopId: 'SH006',
    centerName: 'Hill Country Center',
    location: 'Nuwara Eliya',
    assignedOperator: 'Chaminda Silva',
    operatorPhone: '+94-706-789012',
    totalGenerators: 6,
    activeGenerators: 4,
    status: 'missing items'
  },
  {
    id: '7',
    shopId: 'SH007',
    centerName: 'Eastern Province Hub',
    location: 'Batticaloa',
    assignedOperator: 'Lakshmi Perera',
    operatorPhone: '+94-707-890123',
    totalGenerators: 14,
    activeGenerators: 14,
    status: 'active'
  },
  {
    id: '8',
    shopId: 'SH008',
    centerName: 'Northern Service Point',
    location: 'Jaffna',
    assignedOperator: 'Ravi Wickramasinghe',
    operatorPhone: '+94-708-901234',
    totalGenerators: 9,
    activeGenerators: 7,
    status: 'issues'
  }
];

export default function ShopsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [operatorFilter, setOperatorFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [viewingShop, setViewingShop] = useState<Shop | null>(null);
  const [formData, setFormData] = useState({
    centerName: '',
    centerCode: '',
    address: '',
    city: '',
    district: '',
    contactNumber: '',
    assignedOperator: '',
    operatingStatus: 'active',
    notes: ''
  });

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.centerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.shopId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.assignedOperator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || shop.location === locationFilter;
    const matchesStatus = statusFilter === 'all' || shop.status === statusFilter;
    const matchesOperator = operatorFilter === 'all' || shop.assignedOperator === operatorFilter;

    return matchesSearch && matchesLocation && matchesStatus && matchesOperator;
  });

  const totalShops = shops.length;
  const activeShops = shops.filter(s => s.status === 'active').length;
  const shopsWithIssues = shops.filter(s => s.status === 'issues').length;
  const shopsWithMissingItems = shops.filter(s => s.status === 'missing items').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
      case 'issues':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Issues</span>;
      case 'missing items':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Missing Items</span>;
      default:
        return null;
    }
  };

  const getMaintenanceBadge = (status: string) => {
    if (status === 'missing items') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Maintenance</span>;
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      centerName: '',
      centerCode: '',
      address: '',
      city: '',
      district: '',
      contactNumber: '',
      assignedOperator: '',
      operatingStatus: 'active',
      notes: ''
    });
  };

  const handleViewShop = (shop: Shop) => {
    setViewingShop(shop);
  };

  const handleBackToList = () => {
    setViewingShop(null);
  };

  const handleEditShop = (shop: Shop) => {
    setEditingShop(shop);
    setFormData({
      centerName: shop.centerName,
      centerCode: shop.shopId,
      address: '123 Main Street, Business District', // Default address since not in shop data
      city: shop.location,
      district: shop.location + ' Central',
      contactNumber: shop.operatorPhone,
      assignedOperator: shop.assignedOperator,
      operatingStatus: shop.status === 'active' ? 'active' : shop.status === 'issues' ? 'suspended' : 'maintenance',
      notes: 'Primary center with full inventory' // Default notes
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle edit form submission here
    console.log('Edit form submitted:', formData, 'for shop:', editingShop);
    setIsEditModalOpen(false);
    setEditingShop(null);
    // Reset form
    setFormData({
      centerName: '',
      centerCode: '',
      address: '',
      city: '',
      district: '',
      contactNumber: '',
      assignedOperator: '',
      operatingStatus: 'active',
      notes: ''
    });
  };

  const sriLankanCities = [
    'Colombo', 'Gampaha', 'Kandy', 'Negombo', 'Galle', 'Nuwara Eliya',
    'Batticaloa', 'Jaffna', 'Anuradhapura', 'Polonnaruwa', 'Matara', 'Ratnapura'
  ];

  const getProvinceForCity = (city: string) => {
    const cityToProvince: { [key: string]: string } = {
      'Colombo': 'Western Province',
      'Gampaha': 'Western Province',
      'Negombo': 'Western Province',
      'Kandy': 'Central Province',
      'Nuwara Eliya': 'Central Province',
      'Matara': 'Southern Province',
      'Galle': 'Southern Province',
      'Jaffna': 'Northern Province',
      'Batticaloa': 'Eastern Province',
      'Anuradhapura': 'North Central Province',
      'Polonnaruwa': 'North Central Province',
      'Ratnapura': 'Sabaragamuwa Province'
    };
    return cityToProvince[city] || 'Unknown Province';
  };

  const operators = [
    'Rajesh Kumar', 'Priya Sharma', 'Nuwan Fernando', 'Chaminda Silva',
    'Lakshmi Perera', 'Ravi Wickramasinghe', 'Amit Patel', 'Sunita Reddy'
  ];

  // If viewing a shop, show the details page
  if (viewingShop) {
    return <ShopDetails shop={viewingShop} onBack={handleBackToList} />;
  }

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Shops & Centers</h1>
            <p className="text-gray-600 text-lg">Manage all generator centers across your network</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            + Add New Shop
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-blue-200 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-gray-500">Total Shops</p>
              <p className="text-xl font-bold">{totalShops}</p>
            </div>
          </div>
        </div>
        <div className="border border-blue-200 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-xl font-bold">{activeShops}</p>
            </div>
          </div>
        </div>
        <div className="border border-blue-200 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-gray-500">With Issues</p>
              <p className="text-xl font-bold">{shopsWithIssues}</p>
            </div>
          </div>
        </div>
        <div className="border border-blue-200 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm text-gray-500">Missing Items</p>
              <p className="text-xl font-bold">{shopsWithMissingItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search shops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MdSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Locations</option>
            <option value="Colombo">Colombo</option>
            <option value="Gampaha">Gampaha</option>
            <option value="Kandy">Kandy</option>
            <option value="Negombo">Negombo</option>
            <option value="Galle">Galle</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Jaffna">Jaffna</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="issues">Issues</option>
            <option value="missing items">Missing Items</option>
          </select>
          <select
            value={operatorFilter}
            onChange={(e) => setOperatorFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Operators</option>
            {Array.from(new Set(shops.map(shop => shop.assignedOperator))).map(operator => (
              <option key={operator} value={operator}>{operator}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Shops List */}
      <div className="bg-white rounded-lg shadow-lg border border-blue-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Shops List</h2>
          <p className="text-sm text-gray-500">{filteredShops.length} shops found</p>
        </div>

        {/* Table Header */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-500">
            <div>Shop ID</div>
            <div>Center Name</div>
            <div>Location</div>
            <div>Assigned Operator</div>
            <div>Total Generators</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredShops.map((shop) => (
            <div key={shop.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-7 gap-4 items-center">
                <div className="font-medium text-gray-900">{shop.shopId}</div>
                <div>
                  <div className="font-medium text-gray-900">{shop.centerName}</div>
                  <div className="text-sm text-gray-500">{shop.shopId}</div>
                </div>
                <div>
                  <div className="flex items-center text-gray-900">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {shop.location}
                  </div>
                  <div className="text-sm text-gray-500">{getProvinceForCity(shop.location)}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{shop.assignedOperator}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-3 h-3 mr-1" />
                    {shop.operatorPhone}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{shop.totalGenerators} Total</div>
                  <div className="text-sm text-gray-500">{shop.activeGenerators} Active</div>
                </div>
                <div className="flex flex-col gap-1">
                  {getStatusBadge(shop.status)}
                  {getMaintenanceBadge(shop.status)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewShop(shop)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditShop(shop)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Shop Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-blue-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Add New Shop</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the shop/center information</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Center Name
                  </label>
                  <input
                    type="text"
                    name="centerName"
                    value={formData.centerName}
                    onChange={handleInputChange}
                    placeholder="Enter center name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Center Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="centerCode"
                    value={formData.centerCode}
                    onChange={handleInputChange}
                    placeholder="Enter center code"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter complete address"
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select city</option>
                    {sriLankanCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Enter district"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned Operator
                  </label>
                  <select
                    name="assignedOperator"
                    value={formData.assignedOperator}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select operator</option>
                    {operators.map(operator => (
                      <option key={operator} value={operator}>{operator}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="operatingStatus"
                      value="active"
                      checked={formData.operatingStatus === 'active'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="operatingStatus"
                      value="suspended"
                      checked={formData.operatingStatus === 'suspended'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Suspended</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="operatingStatus"
                      value="maintenance"
                      checked={formData.operatingStatus === 'maintenance'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Under Maintenance</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Enter any additional notes..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-blue-200">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Shop
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white text-gray-700 py-2.5 px-4 rounded-md text-sm font-medium border border-blue-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Shop Modal */}
      {isEditModalOpen && editingShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Edit Shop</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the shop/center information</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Center Name
                  </label>
                  <input
                    type="text"
                    name="centerName"
                    value={formData.centerName}
                    onChange={handleInputChange}
                    placeholder="Enter center name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Center Code (Optional)
                  </label>
                  <input
                    type="text"
                    name="centerCode"
                    value={formData.centerCode}
                    onChange={handleInputChange}
                    placeholder="Enter center code"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter complete address"
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select city</option>
                    {sriLankanCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Enter district"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assigned Operator
                  </label>
                  <select
                    name="assignedOperator"
                    value={formData.assignedOperator}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select operator</option>
                    {operators.map(operator => (
                      <option key={operator} value={operator}>{operator}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Status
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="operatingStatus"
                      value="active"
                      checked={formData.operatingStatus === 'active'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="operatingStatus"
                      value="suspended"
                      checked={formData.operatingStatus === 'suspended'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Suspended</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="operatingStatus"
                      value="maintenance"
                      checked={formData.operatingStatus === 'maintenance'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Under Maintenance</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Enter any additional notes..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-2.5 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Update Shop
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-white text-gray-700 py-2.5 px-4 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}