import React, { useState } from 'react';
import AddUserForm from './AddUserForm';

const users = [
  {
    id: 'U001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@company.com',
    role: 'Operator',
    assignment: 'Downtown Generator Center',
    assignmentDetails: 'Mumbai, Mumbai Central',
    status: 'Active',
    lastLogin: '8/5/2024',
  },
  {
    id: 'U002',
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    role: 'Admin',
    assignment: 'Full System Access',
    assignmentDetails: '',
    status: 'Active',
    lastLogin: '8/4/2024',
  },
  {
    id: 'U003',
    name: 'Amit Patel',
    email: 'amit.patel@company.com',
    role: 'Technician',
    assignment: '3 Generators',
    assignmentDetails: 'G001, G002 +1 more',
    status: 'Active',
    lastLogin: '8/3/2024',
  },
  {
    id: 'U004',
    name: 'Sunita Reddy',
    email: 'sunita.reddy@company.com',
    role: 'Operator',
    assignment: 'Industrial Zone Hub',
    assignmentDetails: 'Delhi, Gurgaon',
    status: 'Active',
    lastLogin: '8/2/2024',
  },
  {
    id: 'U005',
    name: 'Vikram Singh',
    email: 'vikram.singh@company.com',
    role: 'Technician',
    assignment: '2 Generators',
    assignmentDetails: 'G004, G005',
    status: 'Inactive',
    lastLogin: '7/15/2024',
  },
];

const roleColors: Record<string, string> = {
  Admin: 'bg-purple-50 text-purple-600 border-purple-200',
  Technician: 'bg-blue-50 text-blue-600 border-blue-200',
  Operator: 'bg-green-50 text-green-600 border-green-200',
};

const statusColors: Record<string, string> = {
  Active: 'bg-green-50 text-green-600',
  Inactive: 'bg-red-50 text-red-600',
  'Pending Invitation': 'bg-yellow-50 text-yellow-600',
};

export default function UserManagementPage() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All Roles');
  const [status, setStatus] = useState('All Status');
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = role === 'All Roles' || user.role === role;
    const matchesStatus = status === 'All Status' || user.status === status;
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (showAddUser) {
    return <AddUserForm onCancel={() => setShowAddUser(false)} />;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">User Management</h1>
          <div className="text-base text-gray-500 mt-1">Manage system users and their access permissions</div>
        </div>
        
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center"
          onClick={() => setShowAddUser(true)}
        >
          + Add New User
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Users" value={users.length} icon="👥" color="blue" />
        <StatCard label="Admins" value={users.filter(u => u.role === 'Admin').length} icon="🛡️" color="purple" />
        <StatCard label="Technicians" value={users.filter(u => u.role === 'Technician').length} icon="👨‍🔧" color="blue" />
        <StatCard label="Operators" value={users.filter(u => u.role === 'Operator').length} icon="👷" color="green" />
      </div>
      <div className="bg-white rounded-xl border border-blue-300 p-6 mb-8">
  <div className="mb-2 text-lg font-semibold text-blue-700">Filters</div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
      <div className="relative">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>


        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-blue-600 focus:ring-2 focus:ring-blue-300"
          style={{ boxShadow: 'none' }}
        />

              <span className="absolute left-3 top-3 text-gray-400">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <line x1="15" y1="15" x2="18" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="bg-gray-100 rounded-lg px-4 py-2 w-full focus:outline-blue-600 focus:ring-2 focus:ring-blue-600"
            >
              <option>All Roles</option>
              <option>Admin</option>
              <option>Technician</option>
              <option>Operator</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="bg-gray-100 rounded-lg px-4 py-2 w-full focus:outline-blue-600 focus:ring-2 focus:ring-blue-600"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending Invitation</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-blue-300 p-6">
        <div className="mb-1 text-lg font-semibold text-blue-600">User List</div>
        <div className="mb-1 text-gray-600">{filteredUsers.length} users found</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-blue-600">User ID</th>
                <th className="px-4 py-2 text-left text-blue-600">Name</th>
                <th className="px-4 py-2 text-left text-blue-600">Email</th>
                <th className="px-4 py-2 text-left text-blue-600">Role</th>
                <th className="px-4 py-2 text-left text-blue-600">Assignment</th>
                <th className="px-4 py-2 text-left text-blue-600">Status</th>
                <th className="px-4 py-2 text-left text-blue-600">Last Login</th>
                <th className="px-4 py-2 text-left text-blue-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-4 py-2 font-medium text-gray-700">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded border text-xs font-semibold ${roleColors[user.role]}`}>{user.role}</span>
                  </td>
                  <td className="px-4 py-2">
                    <div>{user.assignment}</div>
                    <div className="text-xs text-gray-400">{user.assignmentDetails}</div>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[user.status]}`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-2">{user.lastLogin}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button title="Edit" className="p-2 rounded hover:bg-blue-50 text-blue-600 border border-blue-100"><span>✏️</span></button>
                    <button title="History" className="p-2 rounded hover:bg-yellow-50 text-yellow-600 border border-yellow-100"><span>⏳</span></button>
                    <button title="Delete" className="p-2 rounded hover:bg-red-50 text-red-600 border border-red-100"><span>🗑️</span></button>
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

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };
  return (
    <div className={`bg-white rounded-lg border p-4 flex flex-col gap-2 ${colorMap[color]}`}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-gray-400">&nbsp;</span>
      </div>
      <div className="text-gray-500 text-sm">{label}</div>
  <div className="text-2xl font-semibold text-black">{value}</div>
    </div>
  );
}
