'use client';

import { useState } from 'react';

interface Invoice {
  id: string;
  invoiceNo: string;
  date: string;
  shop: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNo: 'INV-2025-001',
    date: '2/12/2025',
    shop: 'Colombo',
    amount: 10000,
    status: 'paid',
    dueDate: '8/12/2025'
  },
  {
    id: '2',
    invoiceNo: 'INV-2025-002',
    date: '3/12/2025',
    shop: 'Gampaha',
    amount: 4000,
    status: 'pending',
    dueDate: '9/12/2025'
  },
  {
    id: '3',
    invoiceNo: 'INV-2025-003',
    date: '4/12/2025',
    shop: 'Kandy',
    amount: 15000,
    status: 'overdue',
    dueDate: '5/12/2025'
  },
  {
    id: '4',
    invoiceNo: 'INV-2025-004',
    date: '5/12/2025',
    shop: 'Ratmalana',
    amount: 25000,
    status: 'paid',
    dueDate: '4/12/2025'
  }
];

const getStatusColor = (status: Invoice['status']) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: Invoice['status']) => {
  switch (status) {
    case 'paid':
      return 'PAID';
    case 'pending':
      return 'PENDING';
    case 'overdue':
      return 'OVERDUE';
    default:
      return 'UNKNOWN';
  }
};

const formatCurrency = (amount: number) => {
  return `LKR ${amount.toLocaleString()}`;
};

export default function InvoicePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.shop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all';
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesDateRange = (!startDate || invoice.date >= startDate) &&
        (!endDate || invoice.date <= endDate);

    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Invoice Management</h1>
              <p className="text-gray-600 text-lg">Manage all your invoices and financial records</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              + Create New Invoice
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Paid</h3>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(paidAmount)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">📁</div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Overdue</h3>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(overdueAmount)}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="service">Service</option>
              <option value="maintenance">Maintenance</option>
              <option value="repair">Repair</option>
            </select>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <div className="relative">
              <input
                  type="date"
                  placeholder="MM/DD/YY"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">📅</span>
            </div>
            <div className="relative">
              <input
                  type="date"
                  placeholder="MM/DD/YY"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">📅</span>
            </div>
          </div>
        </div>

        {/* Invoice List Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Invoice List</h2>
            <p className="text-gray-600">{filteredInvoices.length} invoices found</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice No.</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Shop</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
              </thead>
              <tbody>
              {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{invoice.invoiceNo}</td>
                    <td className="py-3 px-4 text-gray-700">{invoice.date}</td>
                    <td className="py-3 px-4 text-gray-700">{invoice.shop}</td>
                    <td className="py-3 px-4 text-gray-700 font-medium">{formatCurrency(invoice.amount)}</td>
                    <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{invoice.dueDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                          👁️
                        </button>
                        <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                          ✏️
                        </button>
                        {invoice.status !== 'paid' && (
                            <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                              ✓
                            </button>
                        )}
                        <button className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors">
                          ⬇️
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
