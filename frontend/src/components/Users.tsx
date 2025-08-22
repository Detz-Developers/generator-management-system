'use client';

import { useMemo, useState } from 'react';

type UserStatus = 'Active' | 'Inactive' | 'Pending Invitation';

interface UserItem {
  name: string;
  role: string;
  status: UserStatus;
  email: string;
}
export default function UsersPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All Status' | UserStatus>('All Status');
  const [assignee, setAssignee] = useState<'All Assignees' | string>('All Assignees');

  return (
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-blue-600">User Management</h1>
          <button className="relative h-10 w-10 rounded-full bg-white shadow flex items-center justify-center">
            <span className="text-blue-600">🔔</span>
          </button>
        </div>
        <div className="text-yellow-500 mb-6">⏱</div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-blue-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-9 w-9 flex items-center justify-center rounded-md border border-blue-200 bg-blue-50 text-blue-600">📝</div>
              <span className="text-gray-400">&nbsp;</span>
            </div>
            <div className="text-gray-500 text-sm">Pending Tasks</div>
            <div className="text-2xl font-semibold">2</div>
          </div>
          <div className="bg-white rounded-lg border border-blue-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-9 w-9 flex items-center justify-center rounded-md border border-green-200 bg-green-50 text-green-600">✅</div>
              <span className="text-gray-400">&nbsp;</span>
            </div>
            <div className="text-gray-500 text-sm">Completed</div>
            <div className="text-2xl font-semibold">2</div>
          </div>
          <div className="bg-white rounded-lg border border-blue-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-9 w-9 flex items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-600">📅</div>
              <span className="text-gray-400">&nbsp;</span>
            </div>
            <div className="text-gray-500 text-sm">Overdue</div>
            <div className="text-2xl font-semibold">1</div>
          </div>
          <div className="bg-white rounded-lg border border-blue-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-9 w-9 flex items-center justify-center rounded-md border border-yellow-200 bg-yellow-50 text-yellow-600">📆</div>
              <span className="text-gray-400">&nbsp;</span>
            </div>
            <div className="text-gray-500 text-sm">Due Today</div>
            <div className="text-2xl font-semibold">0</div>
          </div>
        </div>

       
      </div>
  );
}
