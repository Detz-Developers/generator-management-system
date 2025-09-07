'use client';

import { useState, useMemo } from "react";
import { MdSearch } from 'react-icons/md';

interface BatteryManagementProps {
  onNavigate?: (page: string) => void;
}

// Define the shape of a battery object for better type safety
interface Battery {
  id: number;
  batteryId: string;
  type: string;
  serialNumber: string;
  assignedDate: string;
  status: string;
  location: string;
  shop: string;
  brand: string;
}

// Initial data for the table
const initialBatteryData: Battery[] = [
  { id: 1, batteryId: "BAT-2025-001", type: "Type-A", serialNumber: "SN-ABC123", assignedDate: "20/12/2024", status: "Active", location: "Up", shop: "Colombo", brand: "Brand X" },
  { id: 2, batteryId: "BAT-2025-002", type: "Type-B", serialNumber: "SN-DEF456", assignedDate: "30/12/2024", status: "Final Assignment", location: "Up", shop: "Gampaha", brand: "Brand Y" },
  { id: 3, batteryId: "BAT-2025-003", type: "Type-A", serialNumber: "SN-DEF656", assignedDate: "10/12/2024", status: "In Stock", location: "Down", shop: "Kandy", brand: "Brand X" },
  { id: 4, batteryId: "BAT-2025-004", type: "Type-C", serialNumber: "SN-DEF246", assignedDate: "15/12/2024", status: "Overdue", location: "Up", shop: "Ratmalana", brand: "Brand Z" },
  { id: 5, batteryId: "BAT-2025-005", type: "Type-A", serialNumber: "SN-GHI789", assignedDate: "18/12/2024", status: "Active", location: "Down", shop: "Colombo", brand: "Brand Y" },
  { id: 6, batteryId: "BAT-2025-006", type: "Type-B", serialNumber: "SN-JKL012", assignedDate: "22/12/2024", status: "In Stock", location: "Up", shop: "Gampaha", brand: "Brand Z" },
];

export default function InventoryBatteryManagement({ onNavigate }: BatteryManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [brandFilter, setBrandFilter] = useState("All Brands");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [shopFilter, setShopFilter] = useState("All Shops");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewBattery, setViewBattery] = useState<Battery | null>(null);

  // New state for the edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedBattery, setEditedBattery] = useState<Battery | null>(null);

  const [batteries, setBatteries] = useState<Battery[]>(initialBatteryData);

  // State for the "Add Battery" form inputs
  const [newBattery, setNewBattery] = useState({
    batteryId: "",
    type: "",
    serialNumber: "",
    assignedDate: "",
    status: "In Stock",
    location: "Up",
    shop: "",
    brand: "",
    installDate: "",
    generatorId: "",
    gatePass: "",
    returnOverdue: false,
  });

  const filteredBatteries = useMemo(() => {
    return batteries.filter(battery => {
      const matchesSearch = battery.batteryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          battery.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || battery.status === statusFilter;
      const matchesBrand = brandFilter === "All Brands" || battery.type === brandFilter;
      const matchesLocation = locationFilter === "All Locations" || battery.location === locationFilter;
      const matchesShop = shopFilter === "All Shops" || battery.shop === shopFilter;

      return matchesSearch && matchesStatus && matchesBrand && matchesLocation && matchesShop;
    });
  }, [searchTerm, statusFilter, brandFilter, locationFilter, shopFilter, batteries]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "In Stock":
        return "bg-gray-200 text-gray-800";
      case "Final Assignment":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      case "Under Repair":
        return "bg-yellow-200 text-yellow-800";
      case "Unusable":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddBattery = () => {
    setNewBattery({
      batteryId: "",
      type: "",
      serialNumber: "",
      assignedDate: "",
      status: "In Stock",
      location: "Up",
      shop: "",
      brand: "",
      installDate: "",
      generatorId: "",
      gatePass: "",
      returnOverdue: false,
    });
    setShowAddModal(true);
  };

  const handleViewBattery = (battery: Battery) => {
    setViewBattery(battery);
    setShowViewModal(true);
  };

  // New function to handle the edit button click
  const handleEditBattery = (battery: Battery) => {
    setEditedBattery(battery);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false); // Close the edit modal as well
    setViewBattery(null);
    setEditedBattery(null);
  };

  const handleAddFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newId = batteries.length > 0 ? Math.max(...batteries.map(b => b.id)) + 1 : 1;
    const newBatteryEntry: Battery = {
      id: newId,
      batteryId: newBattery.batteryId || `BAT-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`,
      type: newBattery.type,
      serialNumber: newBattery.serialNumber,
      assignedDate: newBattery.assignedDate || new Date().toLocaleDateString('en-GB'),
      status: newBattery.status,
      location: newBattery.location,
      shop: newBattery.shop,
      brand: newBattery.brand,
    };

    setBatteries(prevBatteries => [...prevBatteries, newBatteryEntry]);
    closeModal();
  };

  // New function to handle the edit form submission
  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedBattery) return;

    // Update the batteries state with the edited battery
    setBatteries(batteries.map(battery =>
        battery.id === editedBattery.id ? editedBattery : battery
    ));

    closeModal();
  };

  return (
      <>
        <div className={`flex-1 p-8 bg-gray-50 min-h-screen ${showAddModal || showViewModal || showEditModal ? 'blur-sm' : ''}`}>
          {/* Header and Add Button */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Battery Management</h1>
              <p className="text-gray-600 text-lg">Manage battery inventory, assignments, and tracking</p>
            </div>
            <button
                onClick={handleAddBattery}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Battery
            </button>
          </div>

          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="flex justify-between items-center w-full mb-1">
                <h3 className="text-sm font-medium text-gray-500">Total Batteries</h3>
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              </div>
              <p className="text-4xl font-bold text-gray-800">{batteries.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="flex justify-between items-center w-full mb-1">
                <h3 className="text-sm font-medium text-gray-500">Active</h3>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-4xl font-bold text-gray-800">{batteries.filter(b => b.status === 'Active').length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="flex justify-between items-center w-full mb-1">
                <h3 className="text-sm font-medium text-gray-500">Under Repair</h3>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              </div>
              <p className="text-4xl font-bold text-gray-800">{batteries.filter(b => b.status === 'Under Repair').length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="flex justify-between items-center w-full mb-1">
                <h3 className="text-sm font-medium text-gray-500">Unusable</h3>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>
              <p className="text-4xl font-bold text-gray-800">{batteries.filter(b => b.status === 'Unusable').length}</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
            <p className="text-sm font-semibold text-gray-700 mb-4">Filters</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search batteries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>In Stock</option>
                <option>Final Assignment</option>
                <option>Overdue</option>
                <option>Under Repair</option>
                <option>Unusable</option>
              </select>
              <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>All Brands</option>
                <option>Type-A</option>
                <option>Type-B</option>
                <option>Type-C</option>
              </select>
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>All Locations</option>
                <option>Up</option>
                <option>Down</option>
              </select>
              <select value={shopFilter} onChange={(e) => setShopFilter(e.target.value)} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>All Shops</option>
                <option>Colombo</option>
                <option>Gampaha</option>
                <option>Kandy</option>
                <option>Ratmalana</option>
              </select>
            </div>
          </div>

          {/* Battery Inventory Table */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden ">
            <div className="p-4 border-b border-gray-200 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800">Battery Inventory ({filteredBatteries.length} items)</h3>
            </div>
            <div className="overflow-x-auto border border-blue-200 ">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredBatteries.length > 0 ? (
                    filteredBatteries.map((battery) => (
                        <tr key={battery.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{battery.batteryId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.serialNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.assignedDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(battery.status)}`}>
                          {battery.status}
                        </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{battery.shop}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                            <button onClick={() => handleViewBattery(battery)} className="text-blue-600 hover:text-blue-900 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.172.01.037.01.074 0 .111a.75.75 0 01-1.35.639C19.577 16.49 15.64 19.5 12 19.5c-4.638 0-8.575-3.01-9.963-7.172zM12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>
                            </button>
                            <button onClick={() => handleEditBattery(battery)} className="text-gray-400 hover:text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.498L18.42 6.056l-6.857 6.857-1.558 1.558-1.558-1.558L10.27 11.19a.75.75 0 011.06 1.06L11.558 13.5zM12 4.5l-6.857 6.857-1.558 1.558-1.558-1.558z" /></svg>
                            </button>
                          </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-gray-500">No batteries match your search or filter criteria.</td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Battery Modal */}
        {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-0 overflow-hidden">
                <div className="bg-blue-600 px-8 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Add Battery</h2>
                  <button type="button" className="text-white hover:text-gray-200 text-2xl font-bold" onClick={closeModal}>&times;</button>
                </div>
                <form onSubmit={handleAddFormSubmit} className="px-8 py-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="batteryId" className="font-semibold text-gray-700">Battery ID:</label>
                      <input
                          type="text"
                          id="batteryId"
                          placeholder="BAT-YYYY-XXX"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={newBattery.batteryId}
                          onChange={(e) => setNewBattery({...newBattery, batteryId: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="brand" className="font-semibold text-gray-700">Brand:</label>
                      <input
                          type="text"
                          id="brand"
                          placeholder="Brand"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={newBattery.brand}
                          onChange={(e) => setNewBattery({...newBattery, brand: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="font-semibold text-gray-700">Type:</label>
                      <select
                          id="type"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={newBattery.type}
                          onChange={(e) => setNewBattery({...newBattery, type: e.target.value})}
                      >
                        <option>Type-A</option>
                        <option>Type-B</option>
                        <option>Type-C</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="serialNumber" className="font-semibold text-gray-700">Serial Number:</label>
                      <input
                          type="text"
                          id="serialNumber"
                          placeholder="Serial Number"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={newBattery.serialNumber}
                          onChange={(e) => setNewBattery({...newBattery, serialNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="status" className="font-semibold text-gray-700">Status:</label>
                      <select
                          id="status"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={newBattery.status}
                          onChange={(e) => setNewBattery({...newBattery, status: e.target.value})}
                      >
                        <option>Active</option>
                        <option>In Stock</option>
                        <option>Final Assignment</option>
                        <option>Overdue</option>
                        <option>Under Repair</option>
                        <option>Unusable</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className="font-semibold text-gray-700">Location:</label>
                      <select
                          id="location"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={newBattery.location}
                          onChange={(e) => setNewBattery({...newBattery, location: e.target.value})}
                      >
                        <option>Up</option>
                        <option>Down</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="shop" className="font-semibold text-gray-700">Shop:</label>
                      <select
                          id="shop"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={newBattery.shop}
                          onChange={(e) => setNewBattery({...newBattery, shop: e.target.value})}
                      >
                        <option></option>
                        <option>Colombo</option>
                        <option>Gampaha</option>
                        <option>Kandy</option>
                        <option>Ratmalana</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="assignedDate" className="font-semibold text-gray-700">Assigned Date:</label>
                      <input
                          type="date"
                          id="assignedDate"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={newBattery.assignedDate}
                          onChange={(e) => setNewBattery({...newBattery, assignedDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700">Add Battery</button>
                  </div>
                </form>
              </div>
            </div>
        )}

        {/* View Modal */}
        {showViewModal && viewBattery && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-0 overflow-hidden">
                <div className="bg-blue-600 px-8 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Battery Details</h2>
                  <button type="button" className="text-white hover:text-gray-200 text-2xl font-bold" onClick={closeModal}>&times;</button>
                </div>
                <div className="px-8 py-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="font-semibold text-gray-700">Battery ID:</div>
                      <div className="mt-1">{viewBattery.batteryId}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Type:</div>
                      <div className="mt-1">{viewBattery.type}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Serial Number:</div>
                      <div className="mt-1">{viewBattery.serialNumber}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Assigned Date:</div>
                      <div className="mt-1">{viewBattery.assignedDate}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Status:</div>
                      <div className="mt-1">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(viewBattery.status)}`}>
                        {viewBattery.status}
                      </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Location:</div>
                      <div className="mt-1">{viewBattery.location}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Shop:</div>
                      <div className="mt-1">{viewBattery.shop}</div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={closeModal}>Close</button>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* New Edit Battery Modal */}
        {showEditModal && editedBattery && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-0 overflow-hidden">
                <div className="bg-blue-600 px-8 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Edit Battery</h2>
                  <button type="button" className="text-white hover:text-gray-200 text-2xl font-bold" onClick={closeModal}>&times;</button>
                </div>
                <form onSubmit={handleEditFormSubmit} className="px-8 py-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="editBatteryId" className="font-semibold text-gray-700">Battery ID:</label>
                      <input
                          type="text"
                          id="editBatteryId"
                          placeholder="BAT-YYYY-XXX"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={editedBattery.batteryId}
                          onChange={(e) => setEditedBattery({...editedBattery, batteryId: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="editBrand" className="font-semibold text-gray-700">Brand:</label>
                      <input
                          type="text"
                          id="editBrand"
                          placeholder="Brand"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={editedBattery.brand}
                          onChange={(e) => setEditedBattery({...editedBattery, brand: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="editType" className="font-semibold text-gray-700">Type:</label>
                      <select
                          id="editType"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={editedBattery.type}
                          onChange={(e) => setEditedBattery({...editedBattery, type: e.target.value})}
                      >
                        <option>Type-A</option>
                        <option>Type-B</option>
                        <option>Type-C</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editSerialNumber" className="font-semibold text-gray-700">Serial Number:</label>
                      <input
                          type="text"
                          id="editSerialNumber"
                          placeholder="Serial Number"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={editedBattery.serialNumber}
                          onChange={(e) => setEditedBattery({...editedBattery, serialNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="editStatus" className="font-semibold text-gray-700">Status:</label>
                      <select
                          id="editStatus"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={editedBattery.status}
                          onChange={(e) => setEditedBattery({...editedBattery, status: e.target.value})}
                      >
                        <option>Active</option>
                        <option>In Stock</option>
                        <option>Final Assignment</option>
                        <option>Overdue</option>
                        <option>Under Repair</option>
                        <option>Unusable</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editLocation" className="font-semibold text-gray-700">Location:</label>
                      <select
                          id="editLocation"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={editedBattery.location}
                          onChange={(e) => setEditedBattery({...editedBattery, location: e.target.value})}
                      >
                        <option>Up</option>
                        <option>Down</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editShop" className="font-semibold text-gray-700">Shop:</label>
                      <select
                          id="editShop"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={editedBattery.shop}
                          onChange={(e) => setEditedBattery({...editedBattery, shop: e.target.value})}
                      >
                        <option></option>
                        <option>Colombo</option>
                        <option>Gampaha</option>
                        <option>Kandy</option>
                        <option>Ratmalana</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="editAssignedDate" className="font-semibold text-gray-700">Assigned Date:</label>
                      <input
                          type="date"
                          id="editAssignedDate"
                          className="border px-3 py-2 rounded w-full mt-1"
                          value={editedBattery.assignedDate}
                          onChange={(e) => setEditedBattery({...editedBattery, assignedDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <button type="button" className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </>
  );
}