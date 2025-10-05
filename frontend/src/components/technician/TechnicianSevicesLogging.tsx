import {useState} from "react";

interface TechnicianServicesLoggingProps {
  onNavigate?: (page: string) => void;
}

export default function TechnicianServicesLogging({ onNavigate }: TechnicianServicesLoggingProps): React.JSX.Element {
  const [formData, setFormData] = useState({
    generator: "",
    serviceType: "",
    serviceDate: "",
    hoursSpent: "",
    description: "",
    partsUsed: ""
  });

  const serviceLogs = [
    {
      id: "SL001",
      generator: "CAT-3516B-G101",
      serviceType: "Preventive Maintenance",
      description: "Oil change, filter replacement, general inspection",
      date: "2025-08-13",
      hours: "2.5h",
      technician: "John Smith",
      nextService: "2025-09-13"
    },
    {
      id: "SL002", 
      generator: "CAT-3508-G301",
      serviceType: "Corrective Maintenance",
      description: "Fixed fuel leak, replaced gasket",
      date: "2025-08-12",
      hours: "3h",
      technician: "John Smith",
      nextService: "2025-08-26"
    },
    {
      id: "SL003",
      generator: "Battery Bank B-205",
      serviceType: "Inspection",
      description: "Voltage testing, terminal cleaning",
      date: "2025-08-11",
      hours: "1h", 
      technician: "John Smith",
      nextService: "2025-09-11"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Service Logging</h1>
          <p className="text-gray-600 text-lg">Log service activities and maintenance records.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-800" aria-label="Download report">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800" aria-label="User profile">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Service Log Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="text-blue-600 mr-2">+</span>
            Add Service Log
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Generator/Asset</label>
                <select 
                  name="generator"
                  value={formData.generator}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  aria-label="Select generator or asset"
                >
                  <option value="">Select Generator</option>
                  <option value="CAT-3516B-G101">CAT-3516B-G101</option>
                  <option value="CAT-3508-G301">CAT-3508-G301</option>
                  <option value="Battery Bank B-205">Battery Bank B-205</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <select 
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  aria-label="Select service type"
                >
                  <option value="">Select service type</option>
                  <option value="Preventive Maintenance">Preventive Maintenance</option>
                  <option value="Corrective Maintenance">Corrective Maintenance</option>
                  <option value="Inspection">Inspection</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Date</label>
                <input 
                  type="date"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleInputChange}
                  placeholder="August 14th, 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hours spent</label>
                <input 
                  type="text"
                  name="hoursSpent"
                  value={formData.hoursSpent}
                  onChange={handleInputChange}
                  placeholder="2.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the service performed..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parts Used (Optional)</label>
              <textarea 
                name="partsUsed"
                value={formData.partsUsed}
                onChange={handleInputChange}
                placeholder="List parts during the service..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 resize-none"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Add Files
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                Add Photos
              </button>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Service Log
            </button>
          </div>
        </div>

        {/* Service Logs List */}
        <div className="space-y-4">
          {serviceLogs.map((log) => (
            <div key={log.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{log.generator}</h3>
                  <p className="text-blue-600 font-medium">{log.serviceType}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{log.id}</span>
              </div>

              <p className="text-gray-700 mb-4">{log.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Date:</span>
                  <span className="ml-2 text-gray-900">{log.date}</span>
                </div>
                <div>
                  <span className="text-gray-500">Hours:</span>
                  <span className="ml-2 text-gray-900">{log.hours}</span>
                </div>
                <div>
                  <span className="text-gray-500">Technician:</span>
                  <span className="ml-2 text-gray-900">{log.technician}</span>
                </div>
                <div>
                  <span className="text-gray-500">Next Service:</span>
                  <span className="ml-2 text-gray-900">{log.nextService}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
