'use client';

import { useEffect, useMemo, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { httpsCallable } from 'firebase/functions';
import AddUserForm from './AddUserForm';
import { db, functions } from '../firebaseConfig';

type RoleFilter = 'All Roles' | 'Admin' | 'Technician' | 'Operator' | 'Inventory';
type StatusFilter = 'All Status' | 'Active' | 'Inactive' | 'Pending Invitation';

type RawRole = 'admin' | 'technician' | 'operator' | 'inventory';
type RawStatus = 'active' | 'disabled';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  roleLabel: RoleFilter | 'Admin' | 'Technician' | 'Operator' | 'Inventory';
  rawRole: RawRole;
  statusLabel: StatusFilter | 'Active' | 'Inactive';
  rawStatus: RawStatus;
  center?: string | null;
  lastLogin?: string | null;
}

const roleLabels: Record<RawRole, RoleFilter> = {
  admin: 'Admin',
  technician: 'Technician',
  operator: 'Operator',
  inventory: 'Inventory',
};

const roleOptions: { value: RawRole; label: RoleFilter }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'technician', label: 'Technician' },
  { value: 'operator', label: 'Operator' },
  { value: 'inventory', label: 'Inventory' },
];

const roleColors: Record<RoleFilter, string> = {
  Admin: 'bg-purple-50 text-purple-600 border-purple-200',
  Technician: 'bg-blue-50 text-blue-600 border-blue-200',
  Operator: 'bg-green-50 text-green-600 border-green-200',
  Inventory: 'bg-amber-50 text-amber-600 border-amber-200',
  'All Roles': '',
};

const statusColors: Record<StatusFilter | 'Active' | 'Inactive', string> = {
  Active: 'bg-green-50 text-green-600',
  Inactive: 'bg-red-50 text-red-600',
  'Pending Invitation': 'bg-yellow-50 text-yellow-600',
  'All Status': '',
};

interface EditUserModalProps {
  user: ManagedUser;
  onClose: () => void;
  onSave: (updates: { role: RawRole; disabled: boolean }) => Promise<void>;
}

function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [role, setRole] = useState<RawRole>(user.rawRole);
  const [active, setActive] = useState<boolean>(user.rawStatus !== 'disabled');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSave({ role, disabled: !active });
      onClose();
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        setError((err as { message?: string }).message ?? 'Failed to update user.');
      } else {
        setError('Failed to update user.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit User</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600">{user.name || '-'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600">{user.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              className="w-full bg-gray-100 rounded-lg px-4 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value as RawRole)}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Account Status</span>
            <label className="inline-flex items-center cursor-pointer gap-2 text-sm">
              <span>{active ? 'Active' : 'Inactive'}</span>
              <input
                type="checkbox"
                className="sr-only"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full relative">
                <div
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    active ? 'translate-x-5 bg-blue-600' : ''
                  }`}
                ></div>
              </div>
            </label>
          </div>
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<RoleFilter>('All Roles');
  const [status, setStatus] = useState<StatusFilter>('All Status');
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = ref(db, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const value = snapshot.val() as Record<string, RawUserRecord> | null;
      if (!value) {
        setUsers([]);
        setLoading(false);
        return;
      }

      const mapped: ManagedUser[] = Object.values(value).map((entry: RawUserRecord) => {
        const rawRole = (entry.role ?? 'admin') as RawRole;
        const rawStatus: RawStatus = entry.status === 'disabled' ? 'disabled' : 'active';
        return {
          id: entry.id ?? '',
          name: entry.name ?? '',
          email: entry.email ?? '',
          center: entry.center ?? null,
          lastLogin: entry.lastLogin ?? null,
          rawRole,
          roleLabel: roleLabels[rawRole] ?? 'Admin',
          rawStatus,
          statusLabel: rawStatus === 'disabled' ? 'Inactive' : 'Active',
        };
      });

      setUsers(mapped.sort((a, b) => a.email.localeCompare(b.email)));
      setLoading(false);
    });

    return () => {
            unsubscribe();
    };
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase());
      const matchesRole = role === 'All Roles' || user.roleLabel === role;
      const matchesStatus =
        status === 'All Status' || user.statusLabel === status || user.statusLabel === 'Pending Invitation';
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  const technicianCount = users.filter((u) => u.roleLabel === 'Technician').length;
  const operatorCount = users.filter((u) => u.roleLabel === 'Operator').length;
  const adminCount = users.filter((u) => u.roleLabel === 'Admin').length;
  const inventoryCount = users.filter((u) => u.roleLabel === 'Inventory').length;

  const handleEditUser = (user: ManagedUser) => {
    setEditingUser(user);
    setActionError(null);
    setActionMessage(null);
  };

  const handleSaveUser = async ({ role: newRole, disabled }: { role: RawRole; disabled: boolean }) => {
    if (!editingUser) return;

    const tasks: Promise<unknown>[] = [];

    if (editingUser.rawRole !== newRole) {
      const call = httpsCallable(functions, 'setUserRole');
      tasks.push(call({ uid: editingUser.id, role: newRole }));
    }

    const desiredStatus: RawStatus = disabled ? 'disabled' : 'active';
    if (editingUser.rawStatus !== desiredStatus) {
      const call = httpsCallable(functions, 'setUserStatus');
      tasks.push(call({ uid: editingUser.id, disabled }));
    }

    if (!tasks.length) {
      return;
    }

    await Promise.all(tasks);
    setActionMessage('User updated successfully.');
  };

  const handleDeleteUser = async (user: ManagedUser) => {
    setActionError(null);
    setActionMessage(null);

    const confirmed = window.confirm(`Delete user ${user.email}? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      const call = httpsCallable(functions, 'deleteUserAccount');
      await call({ uid: user.id });
      setActionMessage('User deleted successfully.');
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        setActionError((err as { message?: string }).message ?? 'Failed to delete user.');
      } else {
        setActionError('Failed to delete user.');
      }
    }
  };

  if (showAddUser) {
    return (
      <AddUserForm
        onCancel={() => setShowAddUser(false)}
        onSuccess={() => {
          setShowAddUser(false);
          setActionMessage('User created successfully.');
        }}
      />
    );
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

      {actionMessage && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          {actionMessage}
        </div>
      )}
      {actionError && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {actionError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 mt-6">
        <StatCard label="Total Users" value={users.length} icon="TU" color="blue" />
        <StatCard label="Admins" value={adminCount} icon="AD" color="purple" />
        <StatCard label="Technicians" value={technicianCount} icon="TE" color="blue" />
        <StatCard label="Operators" value={operatorCount} icon="OP" color="green" />
        <StatCard label="Inventory" value={inventoryCount} icon="IN" color="green" />
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
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-blue-600 focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as RoleFilter)}
              className="bg-gray-100 rounded-lg px-4 py-2 w-full focus:outline-blue-600 focus:ring-2 focus:ring-blue-600"
            >
              <option>All Roles</option>
              <option>Admin</option>
              <option>Technician</option>
              <option>Operator</option>
              <option>Inventory</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusFilter)}
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
        <div className="mb-1 text-gray-600">
          {loading ? 'Loading users...' : `${filteredUsers.length} users found`}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-blue-600">User ID</th>
                <th className="px-4 py-2 text-left text-blue-600">Name</th>
                <th className="px-4 py-2 text-left text-blue-600">Email</th>
                <th className="px-4 py-2 text-left text-blue-600">Role</th>
                <th className="px-4 py-2 text-left text-blue-600">Center</th>
                <th className="px-4 py-2 text-left text-blue-600">Status</th>
                <th className="px-4 py-2 text-left text-blue-600">Last Login</th>
                <th className="px-4 py-2 text-left text-blue-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-4 py-2 font-medium text-gray-700">{user.id}</td>
                  <td className="px-4 py-2">{user.name || '-'}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded border text-xs font-semibold ${roleColors[user.roleLabel] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                      {user.roleLabel}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.center || '-'}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[user.statusLabel] ?? 'bg-gray-50 text-gray-600'}`}>
                      {user.statusLabel}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.lastLogin || 'Never'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      title="Edit"
                      className="px-3 py-1 rounded border border-blue-100 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      title="Delete"
                      className="px-3 py-1 rounded border border-red-100 text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: 'blue' | 'green' | 'purple' }) {
  const colorMap: Record<'blue' | 'green' | 'purple', string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };
  return (
    <div className={`bg-white rounded-lg border p-4 flex flex-col gap-2 ${colorMap[color]}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{icon}</span>
        <span className="text-gray-400">&nbsp;</span>
      </div>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-semibold text-black">{value}</div>
    </div>
  );
}








