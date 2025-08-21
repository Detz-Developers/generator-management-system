'use client';

import { useState } from 'react';

interface Battery {
  id: string;
  name: string;
  type: string;
  capacity: number;
  currentCharge: number;
  status: 'charging' | 'discharging' | 'full' | 'maintenance';
  location: string;
  temperature: number;
}

const mockBatteries: Battery[] = [
  {
    id: 'BAT001',
    name: 'Main Battery Bank A',
    type: 'Lithium-Ion',
    capacity: 500,
    currentCharge: 85,
    status: 'charging',
    location: 'Building A',
    temperature: 25
  },
  {
    id: 'BAT002',
    name: 'Backup Battery Bank B',
    type: 'Lead-Acid',
    capacity: 300,
    currentCharge: 92,
    status: 'full',
    location: 'Building B',
    temperature: 28
  },
  {
    id: 'BAT003',
    name: 'Emergency Battery C',
    type: 'Lithium-Ion',
    capacity: 200,
    currentCharge: 45,
    status: 'discharging',
    location: 'Building C',
    temperature: 30
  }
];

export default function Batteries() {
  const [batteries] = useState<Battery[]>(mockBatteries);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'charging':
        return 'bg-blue-100 text-blue-800';
      case 'discharging':
        return 'bg-orange-100 text-orange-800';
      case 'full':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChargeColor = (charge: number) => {
    if (charge >= 80) return 'bg-green-500';
    if (charge >= 50) return 'bg-yellow-500';
    if (charge >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Batteries
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Manage battery inventory and assignments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {batteries.map((battery) => (
            <div key={battery.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{battery.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(battery.status)}`}>
                  {battery.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ID:</span>
                  <span className="font-medium">{battery.id}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium">{battery.type}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capacity:</span>
                  <span className="font-medium">{battery.capacity} kWh</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{battery.location}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Temperature:</span>
                  <span className="font-medium">{battery.temperature}°C</span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Charge Level</span>
                    <span className="font-medium">{battery.currentCharge}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getChargeColor(battery.currentCharge)}`}
                      style={{ width: `${battery.currentCharge}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Battery Management</h2>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Battery
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}