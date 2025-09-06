import React, { useState } from 'react';

const roles = [
  { value: 'Operator', label: 'Operator', description: 'Assigned to a center', icon: '👤' },
  { value: 'Technician', label: 'Technician', description: 'Maintains generators', icon: '🛠️' },
  { value: 'Admin', label: 'Admin', description: 'Full system access', icon: '🛡️' },
];

const centers = [
  'Downtown Generator Center',
  'Industrial Zone Hub',
  'Mumbai Central',
];

interface User {
  fullName: string;
  email: string;
  password: string;
  role: string;
  center: string;
  active: boolean;
}

export default function AddUserForm({ onCancel, onCreate }: { onCancel: () => void; onCreate?: (user: User) => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Operator');
  const [center, setCenter] = useState('');
  const [active, setActive] = useState(true);

  const handleGeneratePassword = () => {
    const generated = Math.random().toString(36).slice(-8);
    setPassword(generated);
  };

  const handleCreate = () => {
    if (onCreate) {
      onCreate({ fullName, email, password, role, center, active });
    }
  };

  return (
    <div className="max-w-l mx-auto p-7 bg-white rounded-2xl border shadow">
      <button className="mb-4 text-gray-500 hover:text-blue-600" onClick={onCancel}>
        <span className="w-9 h- rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
            <path d="M12 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <h2 className="text-2xl font-bold mb-1 text-gray-900">Add New User</h2>
      <p className="text-gray-500 mb-6">Create a new user account with role-based permissions</p>
      <div className="bg-gray-50 rounded-xl border p-6 mb-6">
        <div className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
          <span>📝</span> User Information
        </div>
        <div className="text-gray-500 mb-4 text-sm">Fill in the details for the new user account</div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" className="w-full bg-gray-100 rounded-lg px-4 py-2" placeholder="Enter full name" value={fullName} onChange={e => setFullName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
            <input type="email" className="w-full bg-gray-100 rounded-lg px-8 py-2" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔑</span>
              <input type={showPassword ? 'text' : 'password'} className="w-full bg-gray-100 rounded-lg px-8 py-2" placeholder="Enter or generate password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</button>
            </div>
            <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-medium" onClick={handleGeneratePassword}>Generate</button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select className="w-full bg-gray-100 rounded-lg px-4 py-2" value={role} onChange={e => setRole(e.target.value)}>
            {roles.map(r => (
              <option key={r.value} value={r.value}>{r.icon} {r.label}</option>
            ))}
          </select>
          <div className="text-xs text-gray-400 mt-1">{roles.find(r => r.value === role)?.description}</div>
        </div>
        {role === 'Operator' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span> Operator Assignment
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Center</label>
            <select className="w-full bg-green-100 rounded-lg px-4 py-2" value={center} onChange={e => setCenter(e.target.value)}>
              <option value="">Select center</option>
              {centers.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Active accounts can log in and access their assigned resources</span>
            <label className="inline-flex items-center cursor-pointer ml-auto">
              <input type="checkbox" className="sr-only peer" checked={active} onChange={e => setActive(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <button className="px-6 py-2 rounded-lg bg-blue-900 text-white font-semibold" onClick={handleCreate}>Create User</button>
        <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
