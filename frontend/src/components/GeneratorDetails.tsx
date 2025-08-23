"use client";
import React,{useState} from "react";
import { MdCalendarToday,
    MdOutlineArrowBack , MdOutlineCrisisAlert} from "react-icons/md"
    import Link from "next/link";


    interface IndividualProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: IndividualProps){

    // active tab state eka (default 1)
  const [activeTab, setActiveTab] = useState("1");

return(
    <div className="flex bg-white min-h-screen font-roboto">
      {/* Sidebar 
      <aside className="w-64 bg-white shadow-md flex flex-col p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Generator</h2>
          <span className="text-sm text-gray-500">iTeam project</span>
        </div>

        
        <div className="flex items-center border rounded-md p-2 mb-8">
          <span className="material-icons text-gray-500">search</span>
          <input
            type="text"
            placeholder="File"
            className="ml-2 w-full focus:outline-none"
          />
        </div>
        

       
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <a className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200" href="#">
                <span className="material-icons">dashboard</span>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center p-2 text-white bg-blue-500 rounded-md" href="#">
                <span className="material-icons">bolt</span>
                <span className="ml-3">Generators</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200" href="#">
                <span className="material-icons">assignment</span>
                <span className="ml-3">Tasks</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200" href="#">
                <span className="material-icons">build</span>
                <span className="ml-3">Services</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200" href="#">
                <span className="material-icons">receipt</span>
                <span className="ml-3">Invoices</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200" href="#">
                <span className="material-icons">assessment</span>
                <span className="ml-3">Reports</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200" href="#">
                <span className="material-icons">people</span>
                <span className="ml-3">Users</span>
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200" href="#">
                <span className="material-icons">notifications</span>
                <span className="ml-3">Notifications</span>
              </a>
            </li>
          </ul>
        </nav>

       
        <div>
          <a className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-200" href="#">
            <span className="material-icons">logout</span>
            <span className="ml-3">Logout</span>
          </a>
        </div>
      </aside>
      */}

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-2">
         <div className="flex mb-2 gap-x-4">
          
            <button onClick={() => onNavigate("Generators")} className="box-border size-4 border h-8 w-8 p-2 mt-4 border-indigo-500 hover:bg-gray-200 justify-items-center..."> 
              <MdOutlineArrowBack className="font-bold ..."/>         
            </button>
          
          
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Generator G001</h2>
            <p className="text-gray-500">Caterpillar CAT-3516B - 50kW</p>
          </div>

          </div>

        
        </header>

        {/* Generator Details */}
        <div className="bg-white p-6 rounded-lg shadow-md pt-2">
          
          {/* Info & Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Generator Info */}
            <div className="col-span-2 bg-gray-50 p-4 rounded-lg border border-indigo-500/100 ...">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Generator Information</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-8 text-sm">
                <div>
                  <p className="text-gray-500">Serial Number</p>
                  <p className="font-medium text-gray-800">CAT123456789</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-green-500 bg-green-100 px-2 py-1 rounded-full inline-block">Active</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">UP</p>
                </div>
                <div>
                  <p className="text-gray-500">Issued Date</p>
                  <p className="font-medium text-gray-800">11/12/2022</p>
                </div>
                <div>
                  <p className="text-gray-500">Auto Start</p>
                  <p className="font-medium text-gray-800">Not Enabled</p>
                </div>
                <div>
                  <p className="text-gray-500">Operating Hours</p>
                  <p className="font-medium text-gray-800">2450 hrs</p>
                </div>
                <div>
                  <p className="text-gray-500">Warranty Expiry</p>
                  <p className="font-medium text-gray-800">11/12/2026</p>
                </div>
                <div>
                  <p className="text-gray-500">Installed Date</p>
                  <p className="font-medium text-gray-800">11/12/2022</p>
                </div>
                <div>
                  <p className="text-gray-500">Battery Charger</p>
                  <p className="font-medium text-blue-500">Installed</p>
                </div>
              </div>
            </div>

            {/* Service Schedule */}
            <div className="bg-gray-50 p-4 rounded-lg border border-indigo-500/100 ...">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">Service Schedule</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Last Service</p>
                <div className="flex items-center mt-1">
                  <span className="material-icons text-blue-500 mr-4"><MdCalendarToday /></span>
                  <p className="font-medium text-gray-800">10/4/2025</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Due Service</p>
                <div className="flex items-center mt-1">
                  <span className="material-icons text-orange-500 mr-4"><MdCalendarToday /></span>
                  <p className="font-medium text-gray-800">10/8/2025</p>
                </div>
              </div>
              <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-950">Log Service</button>
            </div>
          </div>

          {/* Tabs + Table */}
          <div className=" p-2 border border-indigo-500/100 rounded-lg ... ">
           <div className="flex border-b w-full bg-sky-100 mb-4 border-blue-100 rounded-full ...">
            <button
              className={`flex-1 text-center px-4 py-1 rounded-full ${
                activeTab === "1"
                  ? "text-white font-semibold bg-blue-500"
                  : "text-gray-700 hover:bg-blue-200"
              }`}
              onClick={() => setActiveTab("1")}
            >
               Service History
            </button>

            <button
              className={`flex-1 text-center px-4 py-1 rounded-full ${
                activeTab === "2"
                  ? "text-white font-semibold bg-blue-500"
                  : "text-gray-700 hover:bg-blue-200"
              }`}
              onClick={() => setActiveTab("2")}
            >
              Repair Logs
            </button>

            <button
              className={`flex-1 text-center px-4 py-1 rounded-full ${
                activeTab === "3"
                  ? "text-white font-semibold bg-blue-500"
                  : "text-gray-700 hover:bg-blue-200"
              }`}
              onClick={() => setActiveTab("3")}
            >
              Extracted Parts
            </button>

          </div>
           
            {activeTab === "1" &&(
              <div  id="1">
            {/*<div className="overflow-auto max-h-48" id="1">*/}
             
              <table className="w-full text-left ">
                <thead className="bg-gray-200 sticky top-0">
                  <tr className="bg-gray-100 text-gray-600 text-sm/7 border-gray-100">
                    <th className="p-3">Date</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Technician</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Cost</th>
                    <th className="p-3">Invoice No.</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm/7">
                  <tr className="border-b border-gray-100">
                    <td className="p-3">10/4/2025</td>
                    <td className="p-3">Routine Maintenance</td>
                    <td className="p-3">Sahan Perera</td>
                    <td className="p-3">Oil change, filter replacement, general inspection</td>
                    <td className="p-3">LKR 10,000</td>
                    <td className="p-3">INV-2025-001</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3">11/3/2025</td>
                    <td className="p-3">Preventive Service</td>
                    <td className="p-3">Nihal Karuna</td>
                    <td className="p-3">Cooling system check, battery maintenance</td>
                    <td className="p-3">LKR 4,000</td>
                    <td className="p-3">INV-2025-002</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3">12/2/2025</td>
                    <td className="p-3">Emergency Repair</td>
                    <td className="p-3">Dinal Rasmika</td>
                    <td className="p-3">Fuel pump replacement</td>
                    <td className="p-3">LKR 15,000</td>
                    <td className="p-3">INV-2025-003</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3">10/4/2025</td>
                    <td className="p-3">Emergency Repair</td>
                    <td className="p-3">Dinal Rasmika</td>
                    <td className="p-3">Radiator hose replacement</td>
                    <td className="p-3">LKR 3,000</td>
                    <td className="p-3">INV-2025-004</td>
                  </tr>
                  <tr>
                    <td className="p-3">11/7/2025</td>
                    <td className="p-3">Routine Maintenance</td>
                    <td className="p-3">Dinal Rasmika</td>
                    <td className="p-3">Battery maintenance</td>
                    <td className="p-3">LKR 5,000</td>
                    <td className="p-3">INV-2025-006</td>
                  </tr>
                </tbody>
              </table>
            </div>
                )}
          
           

            {activeTab === "2" && (
             <div id="2">
               <div className="border border-blue-300 rounded-md p-4 shadow-sm bg-white mb-2">
               {/* Header */}
                    <div className="flex items-center mb-2">
                       <div className="flex items-center gap-2 mr-4">
                          <span className="text-red-500 text-lg">⚠️</span>
                          <h2 className="font-semibold text-black-900">Fuel pressure drop</h2>
                        </div>
                        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                        Resolved
                        </span>
                     </div>

                        {/* Description */}
                     <div className="text-sm  space-y-1 mb-3">
                         <p className="text-sm text-gray-600">Investigated fuel system, found clogged filter</p>
                         <p className="text-sm text-black-900">Replaced fuel filter, tested system</p>
                      </div>

                      {/* Technician Info */}
                     <div className="text-sm text-gray-500 flex gap-4 mb-2 ">
                         <p>
                         <span className="font-medium">Technician:</span> Dinal Rashmika
                         </p>
                          <p>
                         <span className="font-medium">Cost:</span> LKR 900
                         </p>
                         <p>
                        <span className="font-medium">Date:</span> 7/20/2025
                        </p>
                     </div>

                      {/* Parts Used */}
                     <p className="text-sm text-gray-500">
                       <span className="font-medium text-black-900">Parts Used:</span> Fuel Filter - FFS320,
                        O-Ring Kit
                        </p>
                 </div>

                <div className="border border-blue-300 rounded-md p-4 shadow-sm bg-white">
               {/* Header */}
                    <div className="flex items-center mb-2">
                       <div className="flex items-center gap-2 mr-4">
                          <span className="text-red-500 text-lg">⚠️</span>
                          <h2 className="font-semibold text-black-900">Fuel pressure drop</h2>
                        </div>
                        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                        Resolved
                        </span>
                     </div>

                        {/* Description */}
                     <div className="text-sm  space-y-1 mb-3">
                         <p className="text-sm text-gray-600">Investigated fuel system, found clogged filter</p>
                         <p className="text-sm text-black-900">Replaced fuel filter, tested system</p>
                      </div>

                      {/* Technician Info */}
                     <div className="text-sm text-gray-500 flex gap-4 mb-2 ">
                         <p>
                         <span className="font-medium">Technician:</span> Dinal Rashmika
                         </p>
                          <p>
                         <span className="font-medium">Cost:</span> LKR 900
                         </p>
                         <p>
                        <span className="font-medium">Date:</span> 7/20/2025
                        </p>
                     </div>

                      {/* Parts Used */}
                     <p className="text-sm text-gray-500">
                       <span className="font-medium text-black-900">Parts Used:</span> Fuel Filter - FFS320,
                        O-Ring Kit
                        </p>
                 </div>

                 </div>
            )}
             {activeTab === "3" && (
            
               
            <div  id="3">
              <table className="w-full text-left ">
                <thead className="bg-gray-200 sticky top-0">
                  <tr className="bg-gray-100 text-gray-600 text-sm/7 border-gray-100">
                    <th className="p-3">Part Name</th>
                    <th className="p-3">Part Number</th>
                    <th className="p-3">Extrct Date</th>
                    <th className="p-3">Condition</th>
                    <th className="p-3">Reason</th>
                    <th className="p-3">Detition</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm/7">
                  <tr className="border-b border-gray-100">
                    <td className="p-3">Oil Filter</td>
                    <td className="p-3">OF-1R076</td>
                    <td className="p-3">04/03/2025</td>
                    <td className="p-3">used</td>
                    <td className="p-3">Routeline Replacement</td>
                    <td className="p-3">Recycled</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                   <td className="p-3">Oil Filter</td>
                    <td className="p-3">OF-1R076</td>
                    <td className="p-3">04/03/2025</td>
                    <td className="p-3"><span className="px-3 py-1 rounded-lg font-bold bg-gray-300 ...">used</span></td>
                    <td className="p-3">Routeline Replacement</td>
                    <td className="p-3">Recycled</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3">Oil Filter</td>
                    <td className="p-3">OF-1R076</td>
                    <td className="p-3">04/03/2025</td>
                    <td className="p-3"><span className="px-3 py-1 rounded-lg text-red-900  font-bold bg-red-100 text-red-700 font-sm/8 ...">Damaged</span></td>
                    <td className="p-3">Routeline Replacement</td>
                    <td className="p-3">Recycled</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3">Oil Filter</td>
                    <td className="p-3">OF-1R076</td>
                    <td className="p-3">04/03/2025</td>
                    <td className="p-3">used</td>
                    <td className="p-3">Routeline Replacement</td>
                    <td className="p-3">Recycled</td>
                  </tr>
                  <tr>
                    <td className="p-3">Oil Filter</td>
                    <td className="p-3">OF-1R076</td>
                    <td className="p-3">04/03/2025</td>
                    <td className="p-3">used</td>
                    <td className="p-3">Routeline Replacement</td>
                    <td className="p-3">Recycled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          
            
             )}
             </div>
            
        </div>
      </main>
    </div>
);
}
