'use client';

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signOut as signOutSecondary,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { db, functions, getSecondaryAuth } from '../firebaseConfig';

const roles = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full system access to manage the platform',
  },
  {
    value: 'technician',
    label: 'Technician',
    description: 'Maintains and services generators',
  },
  {
    value: 'operator',
    label: 'Operator',
    description: 'Assigned to a generator center',
  },
  {
    value: 'inventory',
    label: 'Inventory',
    description: 'Manages spare parts and inventory records',
  },
] as const;

interface AddUserFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

export default function AddUserForm({ onCancel, onSuccess }: AddUserFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<(typeof roles)[number]['value']>('operator');
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleGeneratePassword = () => {
    const generated = Math.random().toString(36).slice(-10);
    setPassword(generated);
  };

  const validateFields = (): boolean => {
    if (!fullName.trim()) {
      setError('Full name is required.');
      return false;
    }
    if (!email.trim()) {
      setError('Email address is required.');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Please enter a password with at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (loading) return;
    setError(null);
    setSuccess(null);

    if (!validateFields()) {
      return;
    }

    setLoading(true);
    const secondaryAuth = getSecondaryAuth();
    let createdUserCredential: Awaited<ReturnType<typeof createUserWithEmailAndPassword>> | null = null;

    try {
      const trimmedEmail = email.trim().toLowerCase();

      createdUserCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        trimmedEmail,
        password,
      );

      const uid = createdUserCredential.user.uid;

      const createProfile = httpsCallable(functions, 'createUserProfile');
      await createProfile({
        uid,
        email: trimmedEmail,
        name: fullName.trim(),
        role,
      });

      if (!active) {
        const setUserStatus = httpsCallable(functions, 'setUserStatus');
        await setUserStatus({ uid, disabled: true });
      }

      setSuccess('User account created successfully.');
      setFullName('');
      setEmail('');
      setPassword('');
      setRole('operator');
      setActive(true);
      onSuccess?.();
    } catch (err: unknown) {
      if (createdUserCredential) {
        await deleteUser(createdUserCredential.user).catch(() => undefined);
      }

      if (typeof err === 'object' && err !== null) {
        const errorWithCode = err as { code?: string; message?: string };

        if (errorWithCode.code === 'auth/email-already-in-use') {
          setError('That email address is already in use.');
        } else if (errorWithCode.code === 'functions/permission-denied') {
          setError('You do not have permission to create users.');
        } else if (errorWithCode.message) {
          setError(errorWithCode.message);
        } else {
          setError('Failed to create user.');
        }
      } else {
        setError('Failed to create user.');
      }
    } finally {
      await signOutSecondary(secondaryAuth).catch(() => undefined);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-7 bg-white rounded-2xl border shadow">
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
        <div className="font-semibold text-gray-700 mb-1">User Information</div>
        <div className="text-gray-500 mb-4 text-sm">Fill in the details for the new user account</div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full bg-gray-100 rounded-lg px-4 py-2"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            className="w-full bg-gray-100 rounded-lg px-4 py-2"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-gray-100 rounded-lg px-4 py-2"
                placeholder="Enter or generate password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-medium"
              onClick={handleGeneratePassword}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            className="w-full bg-gray-100 rounded-lg px-4 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value as (typeof roles)[number]['value'])}
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-400 mt-1">{roles.find((r) => r.value === role)?.description}</div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              Active accounts can log in and access their assigned resources
            </span>
            <label className="inline-flex items-center cursor-pointer ml-auto gap-2 text-sm">
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
        </div>
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
            {success}
          </div>
        )}
      </div>
      <div className="flex gap-4 justify-end">
        <button
          className="px-6 py-2 rounded-lg bg-blue-900 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
        <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}