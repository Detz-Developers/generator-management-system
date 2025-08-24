/*'use client';

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
        {/* Header 
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

        {/* Metrics Cards 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Generators</h3>
                <p className="text-3xl font-bold text-gray-900">178</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Active</h3>
                <p className="text-3xl font-bold text-gray-900">140</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Under Repair</h3>
                <p className="text-3xl font-bold text-gray-900">30</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Unusable</h3>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters *
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
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

        {/* Generator List Table 
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
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
*/

"use client";

import React , {useState} from "react";
 import Link from "next/link";
 import { useRouter } from "next/navigation";

import {
 
  MdAdd,
  MdBrightness1,
  MdOutlineRemoveRedEye,
  MdEditSquare,
  MdSearch,
} from "react-icons/md";

const statusColors: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
};

interface Generators {
  onNavigate: (page: string) => void;
}
export default function Generators({ onNavigate }: Generators) {
   const router = useRouter();


  const [showForm, setShowForm] = useState(false);
  //filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [shopFilter, setShopFilter] = useState("all");
  

  const generators = [
    { id: "G001", brand: "Caterpillar", size: "50kW", sn: "CAT123456", date: "20/12/2024", status: "Active", statusColor: "green", location: "down", shop: "Colombo" },
    { id: "G002", brand: "Honda", size: "15kW", sn: "HON123456", date: "30/12/2024", status: "Under Repair", statusColor: "yellow", location: "Up", shop: "Gampaha" },
    { id: "G003", brand: "Kohler", size: "25kW", sn: "KOH123456", date: "10/12/2024", status: "Unusable", statusColor: "red", location: "Down", shop: "Gampaha" },
    { id: "G004", brand: "Caterpillar", size: "50kW", sn: "CAT223456", date: "15/12/2024", status: "Active", statusColor: "green", location: "Up", shop: "Ratmalana" },
  ];

   // Filter Logic
  const filteredGenerators = generators.filter((gen) => {
    const matchesSearch =
      gen.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gen.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gen.sn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || gen.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesBrand = brandFilter === "all" || gen.brand === brandFilter;
    const matchesLocation = locationFilter === "all" || gen.location === locationFilter;
    const matchesShop = shopFilter === "all" || gen.shop === shopFilter;

    return matchesSearch && matchesStatus && matchesBrand && matchesLocation && matchesShop;
  });


  return (
    <div className="bg-white flex font-inter min-h-screen">
      
      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Generators</h1>
            <p className="text-gray-500">Manage all your generators across your centers</p>
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center shadow-md hover:bg-blue-600"  onClick={() => setShowForm(true)}>
           
            <MdAdd className="mr-2" />
            Add Generator
          </button>
        </header>

         {/*Metrics Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Generators</h3>
                <p className="text-3xl font-bold text-gray-900">178</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Active</h3>
                <p className="text-3xl font-bold text-gray-900">140</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Under Repair</h3>
                <p className="text-3xl font-bold text-gray-900">30</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
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
        <div className="bg-white py-4 px-6 rounded-lg shadow-md mb-4 border border-blue-300">
          <p className="text-gray-500 mb-2">Filters</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <MdSearch className="absolute left-3 top-3 text-gray-400" />
              <input type="text"
                placeholder="Search generators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border border-blue-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 border-blue-100 focus:ring-blue-500">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="under-repair">Under Repair</option>
              <option value="unusable">Unusable</option>
            </select>

            <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="p-2 border bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 border-blue-100 focus:ring-blue-500">
              
              <option value="all">All Brands</option>
              <option value="Caterpillar">Caterpillar</option>
              <option value="Honda">Honda</option>
              <option value="Kohler">Kohler</option>
            </select>

            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}  className="p-2 border bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 border-blue-100 focus:ring-blue-500">
              <option value="all">All Locations</option>
               <option value="Up">Up</option>
              <option value="Down">Down</option>
            </select>
            <select value={shopFilter} onChange={(e) => setShopFilter(e.target.value)} className="p-2 border bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 border-blue-100 focus:ring-blue-500">
              <option value="all">All Shops</option>
               <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kandy">Kandy</option>
              <option value="Ratmalana">Ratmalana</option>
            </select>
          </div>
        </div>
       
        {/*<div className="max-h-48 overflow-auto">*/}
        {/* Table */}
        <div className="bg-white px-4 py-4 rounded-lg shadow-md border border-blue-300 mb-4">
          <h3 className="text-md font-semibold mb-1">Generator List</h3>
            <p className="text-sm/9">{filteredGenerators.length} Generators Found</p>
         
          <div className="mt-4">{/*}
            <table className="w-full text-left overflow-auto max-h-32">
              <thead className="sticky top-0 bg-gray-50 border-b border-blue-100">
                <tr>
                  {["Generator ID","Brand","Size","Serial Number","Installed Date","Status","Location","Shop","Actions"].map((col, idx)=>(
                    <th key={idx} className="px-4 py-2 text-sm/7 font-semibold text-gray-600">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {generators.map((gen, idx)=>(
                  <tr key={idx} className="border-b border-blue-100 hover:bg-gray-50 py-2">
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.id}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.brand}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.size}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.sn}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.date}</td>
                    <td className="px-1">
                      <span className={`${statusColors[gen.statusColor]} px-2 py-1 rounded-md text-sm/9 font-medium w-16`}>{gen.status}</span>
                    </td>
                    <td className="px-4 py-2 text-sm/9 text-gray-800">{gen.location}</td>
                    <td className="px-4 py-2 text-sm/9 text-gray-800">{gen.shop}</td>
                    <td className="px-4 py-2 text-sm/9 text-gray-500">
                      <div className="flex items-center">
                       
                        <button  onClick={() => onNavigate('GeneratorDetails')} className="bg-blue-100 p-2 rounded-md mr-4 hover:bg-blue-200"><MdOutlineRemoveRedEye className="text-blue-500"/></button>
                        
                        <button className="bg-blue-100 p-2 rounded-md mr-4 hover:bg-blue-200"><MdEditSquare className="text-blue-500"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            */}

               <table className="w-full text-left">
              <thead className="sticky top-0 bg-gray-50 border-b border-blue-100">
                <tr>
                  {["Generator ID", "Brand", "Size", "Serial Number", "Installed Date", "Status", "Location", "Shop", "Actions"].map(
                    (col, idx) => (
                      <th key={idx} className="px-4 py-2 text-sm font-semibold text-gray-600">
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredGenerators.map((gen, idx) => (
                  <tr key={idx} className="border-b border-blue-100 hover:bg-gray-50 py-2">
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.id}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.brand}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.size}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.sn}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.date}</td>
                    <td className="px-1">
                      <span
                        className={`${statusColors[gen.statusColor]} px-2 py-1 rounded-md text-sm font-medium w-16`}
                      >
                        {gen.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.location}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">{gen.shop}</td>
                    <td className="px-4 py-2 text-sm/9 leading-1 text-gray-800">
                      <div className="flex items-center">
                        <button
                          onClick={() => onNavigate("GeneratorDetails")}
                          className="bg-blue-100 p-2 rounded-md mr-2 hover:bg-blue-200"
                        >
                          <MdOutlineRemoveRedEye className="text-blue-500" />
                        </button>
                        <button className="bg-blue-100 p-2 rounded-md hover:bg-blue-200">
                          <MdEditSquare className="text-blue-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
                  {showForm && (
                   <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40">
                       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
                        {/* Title */}
                          <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Add Generator
                           </h2>

                       {/* Form Grid */}
                        <form className="grid grid-cols-2 gap-4 text-sm">
                              {/* Generator Brand */}
                           <div className="flex flex-col">
                                <label className="mb-1 font-medium text-gray-700">
                                  Generator Brand
                                </label>
                                <select className="border rounded-md px-3 py-2 bg-gray-100 border border-blue-100 focus:ring focus:ring-blue-200">
                                   <option>Select brand</option>
                                 </select>
                             </div>

                           {/* Size */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium text-gray-700">Size</label>
                                    <select className="border rounded-md px-3 py-2 bg-gray-100 border border-blue-100 focus:ring focus:ring-blue-200">
                                      <option>Select size</option>
                                     </select>
                             </div>

                           {/* Serial Number */}
                             <div className="flex flex-col">
                                <label className="mb-1 font-medium text-gray-700">
                                  Serial Number
                                </label>
                             <input
                               type="text"
                              placeholder="Enter serial number"
                              className="border rounded-md px-3 py-2 focus:ring bg-gray-100 border border-blue-100 focus:ring-blue-200"
                               />
                             </div>

          {/* Warranty Period */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Warranty Period (months)
            </label>
            <input
              type="number"
              placeholder="24"
              className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 bg-gray-100 border border-blue-100"
            />
          </div>

          {/* Installed Date */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Installed Date
            </label>
            <input
              type="date"
              className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 bg-gray-100 border border-blue-100"
            />
          </div>

          {/* Issued Date */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Issued Date</label>
            <input
              type="date"
              className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 bg-gray-100 border border-blue-100"
            />
          </div>

          {/* Assigned Shop */}
          <div className="flex flex-col col-span-2">
            <label className="mb-1 font-medium text-gray-700">
              Assigned Shop
            </label>
            <select className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 bg-gray-100 border border-blue-100">
              <option>Select shop</option>
            </select>
          </div>

          {/* Location */}
          <div className="col-span-2">
            <label className="mb-1 font-medium text-gray-700">Location</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="location" value="Up" />
                Up
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="location" value="Down" />
                Down
              </label>
            </div>
          </div>

          {/* Auto Start */}
          <div className="col-span-2 flex items-center justify-between">
            <span className="text-gray-700">Auto Start</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>

          {/* Battery Charger Installed */}
          <div className="col-span-2 flex items-center justify-between">
            <span className="text-gray-700">Battery Charger Installed?</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700" onClick={() => setShowForm(false)} >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowForm(false)} >
            Add Generator
          </button>
        </div>
      </div>
    </div>
                  )}

      </main>
    </div>
  );
}


