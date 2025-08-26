'use client';

import { useState } from 'react';
import { MdSearch, MdVisibility, MdEdit, MdDownload, MdCheck } from 'react-icons/md';

interface Invoice {
    id: string;
    invoiceNo: string;
    date: string;
    customerShop: string;
    customerContact: string;
    type: 'B2B' | 'B2C';
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
}

const invoices: Invoice[] = [
    {
        id: '1',
        invoiceNo: 'INV-2024-001',
        date: '8/1/2024',
        customerShop: 'Downtown Generator Center',
        customerContact: '+94-701-234567',
        type: 'B2B',
        amount: 15340,
        status: 'paid',
        dueDate: '8/15/2024'
    },
    {
        id: '2',
        invoiceNo: 'INV-2024-002',
        date: '8/2/2024',
        customerShop: 'John Smith',
        customerContact: 'john.smith@email.com',
        type: 'B2C',
        amount: 17700,
        status: 'pending',
        dueDate: '8/16/2024'
    },
    {
        id: '3',
        invoiceNo: 'INV-2024-003',
        date: '7/25/2024',
        customerShop: 'Industrial Zone Hub',
        customerContact: '+94-702-345678',
        type: 'B2B',
        amount: 18290,
        status: 'overdue',
        dueDate: '8/8/2024'
    },
    {
        id: '4',
        invoiceNo: 'INV-2024-004',
        date: '8/3/2024',
        customerShop: 'Sarah Johnson',
        customerContact: '+94-987-654321',
        type: 'B2C',
        amount: 14160,
        status: 'pending',
        dueDate: '8/17/2024'
    }
];

const formatCurrency = (amount: number) => {
    return `LKR ${amount.toLocaleString()}`;
};

interface InvoiceManagementProps {
    onNavigate?: (page: string) => void;
}

export default function InvoiceManagement({ onNavigate }: InvoiceManagementProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleCreateInvoice = () => {
        if (onNavigate) {
            onNavigate('CreateInvoice');
        }
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.customerShop.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || invoice.type.toLowerCase() === typeFilter.toLowerCase();
        const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
        const matchesDateRange = (!startDate || invoice.date >= startDate) &&
            (!endDate || invoice.date <= endDate);

        return matchesSearch && matchesType && matchesStatus && matchesDateRange;
    });

    const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
    const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0);
    const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span>;
            case 'pending':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
            case 'overdue':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Overdue</span>;
            default:
                return null;
        }
    };

    const getTypeBadge = (type: string) => {
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${type === 'B2B' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                {type}
            </span>
        );
    };

    return (
        <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600 mb-1">Invoice Management</h1>
                        <p className="text-gray-600 text-base">Manage all B2B and B2C invoices</p>
                    </div>
                    <button 
                        onClick={handleCreateInvoice}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        + Create New Invoice
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <div>
                            <p className="text-sm text-gray-500">Paid</p>
                            <p className="text-xl font-bold">{formatCurrency(paidAmount)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-xl font-bold">{formatCurrency(pendingAmount)}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <div>
                            <p className="text-sm text-gray-500">Overdue</p>
                            <p className="text-xl font-bold">{formatCurrency(overdueAmount)}</p>
                        </div>
                    </div>
                </div>
            </div>      {/* 
Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6 mb-8">
                <div className="flex items-center mb-4">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-sm font-medium text-blue-600">Filters</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Types</option>
                        <option value="b2b">B2B</option>
                        <option value="b2c">B2C</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                    </select>
                    <input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-200">
                <div className="px-6 py-4 border-b border-blue-200">
                    <h2 className="text-lg font-semibold text-blue-600">Invoices List</h2>
                    <p className="text-sm text-gray-500">{filteredInvoices.length} invoices found</p>
                </div>

                {/* Table Header */}
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-8 gap-4 text-sm font-medium text-gray-500">
                        <div>Invoice No.</div>
                        <div>Date</div>
                        <div>Customer/Shop</div>
                        <div>Type</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div>Due Date</div>
                        <div>Actions</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                    {filteredInvoices.map((invoice) => (
                        <div key={invoice.id} className="px-6 py-4 hover:bg-gray-50">
                            <div className="grid grid-cols-8 gap-4 items-center">
                                <div className="font-medium text-blue-600">{invoice.invoiceNo}</div>
                                <div className="text-gray-900">{invoice.date}</div>
                                <div>
                                    <div className="font-medium text-gray-900">{invoice.customerShop}</div>
                                    <div className="text-sm text-gray-500">{invoice.customerContact}</div>
                                </div>
                                <div>{getTypeBadge(invoice.type)}</div>
                                <div className="font-medium text-gray-900">{formatCurrency(invoice.amount)}</div>
                                <div>{getStatusBadge(invoice.status)}</div>
                                <div className="text-gray-900">{invoice.dueDate}</div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                        <MdVisibility className="w-4 h-4" />
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                        <MdEdit className="w-4 h-4" />
                                    </button>
                                    {invoice.status === 'pending' && (
                                        <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                                            <MdCheck className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                                        <MdDownload className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}