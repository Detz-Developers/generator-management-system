'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface LineItem {
    id: string;
    description: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
    actions: string;
}

interface CreateInvoiceProps {
    onBack: () => void;
}

export default function CreateInvoice({ onBack }: CreateInvoiceProps) {
    const [invoiceType, setInvoiceType] = useState('B2B');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [shopName, setShopName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [taxRate, setTaxRate] = useState(18);
    const [paymentStatus, setPaymentStatus] = useState('Pending');
    const [notes, setNotes] = useState('');

    const [lineItems, setLineItems] = useState<LineItem[]>([
        {
            id: '1',
            description: '',
            unitPrice: 0,
            quantity: 1,
            subtotal: 0,
            actions: ''
        }
    ]);

    const quickAddServices = [
        { name: 'Generator Maintenance', price: 15000 },
        { name: 'Battery Replacement', price: 8000 },
        { name: 'Oil Change Service', price: 3500 },
        { name: 'Filter Replacement', price: 2500 },
        { name: 'Emergency Repair', price: 18000 },
        { name: 'Installation Service', price: 12000 },
        { name: 'Annual Service Contract', price: 75000 }
    ];

    const addLineItem = () => {
        const newItem: LineItem = {
            id: Date.now().toString(),
            description: '',
            unitPrice: 0,
            quantity: 1,
            subtotal: 0,
            actions: ''
        };
        setLineItems([...lineItems, newItem]);
    };

    const removeLineItem = (id: string) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter(item => item.id !== id));
        }
    };

    const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
        setLineItems(lineItems.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                if (field === 'unitPrice' || field === 'quantity') {
                    updatedItem.subtotal = updatedItem.unitPrice * updatedItem.quantity;
                }
                return updatedItem;
            }
            return item;
        }));
    };

    const addQuickService = (service: { name: string; price: number }) => {
        const newItem: LineItem = {
            id: Date.now().toString(),
            description: service.name,
            unitPrice: service.price,
            quantity: 1,
            subtotal: service.price,
            actions: ''
        };
        setLineItems([...lineItems, newItem]);
    };

    const subtotal = lineItems.reduce((sum, item) => sum + item.subtotal, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const totalAmount = subtotal + taxAmount;

    const formatCurrency = (amount: number) => {
        return `LKR ${amount.toLocaleString()}`;
    };

    return (
        <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-blue-600 mb-1">Create New Invoice</h1>
                        <p className="text-gray-600 text-base">Generate a new invoice for B2B or B2C customers</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Invoice Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                        <div className="flex items-center mb-4">
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" />
                            </svg>
                            <h2 className="text-lg font-semibold text-blue-600">Invoice Information</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Type</label>
                                <select
                                    value={invoiceType}
                                    onChange={(e) => setInvoiceType(e.target.value)}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="B2B">B2B (Business to Business)</option>
                                    <option value="B2C">B2C (Business to Customer)</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">For business services</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Reference Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter reference number"
                                    value={referenceNumber}
                                    onChange={(e) => setReferenceNumber(e.target.value)}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Shop (B2B)</label>
                            <select
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={invoiceType === 'B2C'}
                            >
                                <option value="">Select a shop for auto-fill details</option>
                                <option value="Downtown Generator Center">Downtown Generator Center</option>
                                <option value="Industrial Zone Hub">Industrial Zone Hub</option>
                                <option value="Harbor City Service">Harbor City Service</option>
                                <option value="Tech Park Center">Tech Park Center</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Customer/Shop Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter customer or shop name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                                <input
                                    type="text"
                                    placeholder="mm/dd/yyyy"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info</label>
                                <input
                                    type="text"
                                    placeholder="Phone or email"
                                    value={contactInfo}
                                    onChange={(e) => setContactInfo(e.target.value)}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Address</label>
                                <textarea
                                    placeholder="Enter complete address"
                                    value={customerAddress}
                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-blue-600">Line Items</h2>
                            <button
                                onClick={addLineItem}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Item
                            </button>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-6 gap-4 mb-3 text-sm font-medium text-gray-500 border-b border-gray-200 pb-2">
                            <div>Description</div>
                            <div>Unit Price</div>
                            <div>Quantity</div>
                            <div>Subtotal</div>
                            <div>Actions</div>
                            <div></div>
                        </div>

                        {/* Line Items */}
                        <div className="space-y-3">
                            {lineItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-6 gap-4 items-center">
                                    <input
                                        type="text"
                                        placeholder="Enter description"
                                        value={item.description}
                                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={item.unitPrice || ''}
                                        onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="number"
                                        placeholder="1"
                                        value={item.quantity || ''}
                                        onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <div className="font-medium text-gray-900">{formatCurrency(item.subtotal)}</div>
                                    <div className="text-gray-500">₹</div>
                                    <button
                                        onClick={() => removeLineItem(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                                        disabled={lineItems.length === 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Settings */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                        <h2 className="text-lg font-semibold text-blue-600 mb-4">Additional Settings</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                                <input
                                    type="number"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                                <select
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Overdue">Overdue</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                            <textarea
                                placeholder="Enter any additional notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Add Services */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                        <h2 className="text-lg font-semibold text-blue-600 mb-2">Quick Add Services</h2>
                        <p className="text-sm text-gray-500 mb-4">Common services for quick selection</p>

                        <div className="space-y-2">
                            {quickAddServices.map((service, index) => (
                                <button
                                    key={index}
                                    onClick={() => addQuickService(service)}
                                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                                >
                                    <span className="text-sm text-gray-700">{service.name}</span>
                                    <span className="text-sm font-medium text-gray-900">{formatCurrency(service.price)}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Invoice Totals */}
                    <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                        <div className="flex items-center mb-4">
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                            </svg>
                            <h2 className="text-lg font-semibold text-blue-600">Invoice Totals</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-medium">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax ({taxRate}%):</span>
                                <span className="font-medium">{formatCurrency(taxAmount)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                                    <span className="text-lg font-bold text-blue-600">{formatCurrency(totalAmount)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-xs text-yellow-600 mb-4">*Estimate</p>

                            <div className="space-y-3">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                    Save Invoice
                                </button>
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                        Generate PDF
                                    </button>
                                    <button
                                        onClick={onBack}
                                        className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}