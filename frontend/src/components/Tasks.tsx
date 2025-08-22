'use client';

import { useState } from 'react';
import { Clock, CheckCircle, CalendarX, Calendar } from 'lucide-react';

interface Task {
  id: string;
  taskId: string;
  description: string;
  assignedTo: string;
  generatorId: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

const tasks: Task[] = [
  {
    id: '1',
    taskId: 'T001',
    description: 'Routine maintenance and oil change',
    assignedTo: 'Sahan P.',
    generatorId: 'G001',
    dueDate: '4/8/2025',
    status: 'completed',
  },
  {
    id: '2',
    taskId: 'T002',
    description: 'Battery replacement and system check',
    assignedTo: 'Nihal K.',
    generatorId: 'G002',
    dueDate: '22/7/2025',
    status: 'pending',
  },
  {
    id: '3',
    taskId: 'T003',
    description: 'Fuel system inspection',
    assignedTo: 'Jayantha R.',
    generatorId: 'G003',
    dueDate: '12/8/2025',
    status: 'pending',
  },
  {
    id: '4',
    taskId: 'T004',
    description: 'Emergency repair - cooling system',
    assignedTo: 'Dinal W.',
    generatorId: 'G004',
    dueDate: '5/8/2025',
    status: 'completed',
  },
];

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'pending':
      return 'Pending';
    case 'overdue':
      return 'Overdue';
    default:
      return 'Unknown';
  }
};

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
        task.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesAssignee =
        assigneeFilter === 'all' || task.assignedTo === assigneeFilter;

    return matchesSearch && matchesStatus && matchesAssignee;
  });

  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const overdueTasks = tasks.filter((t) => t.status === 'overdue').length;
  const dueTodayTasks = 0;

  return (
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Tasks</h1>
              <p className="text-gray-600 text-lg">
                Manage task assignments and track progress
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              + Assign Task
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="border rounded-lg p-4 text-center border-blue-200">
            <Clock className="mx-auto text-yellow-500 mb-2" />
            <h3 className="text-sm text-gray-500">Pending Tasks</h3>
            <p className="text-xl font-bold">{pendingTasks}</p>
          </div>
          <div className="border rounded-lg p-4 text-center border-blue-200">
            <CheckCircle className="mx-auto text-green-600 mb-2" />
            <h3 className="text-sm text-gray-500">Completed</h3>
            <p className="text-xl font-bold">{completedTasks}</p>
          </div>
          <div className="border rounded-lg p-4 text-center border-blue-200">
            <CalendarX className="mx-auto text-red-500 mb-2" />
            <h3 className="text-sm text-gray-500">Overdue</h3>
            <p className="text-xl font-bold">{overdueTasks}</p>
          </div>
          <div className="border rounded-lg p-4 text-center border-blue-200">
            <Calendar className="mx-auto text-blue-500 mb-2" />
            <h3 className="text-sm text-gray-500">Due Today</h3>
            <p className="text-xl font-bold">{dueTodayTasks}</p>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
            <select
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Assignees</option>
              <option value="Sahan P.">Sahan P.</option>
              <option value="Nihal K.">Nihal K.</option>
              <option value="Jayantha R.">Jayantha R.</option>
              <option value="Dinal W.">Dinal W.</option>
            </select>
          </div>
        </div>

        {/* Task Assignment Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Task Assignment Table
            </h2>
            <p className="text-gray-600">{filteredTasks.length} tasks found</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-blue-200 rounded-lg overflow-hidden">
              <thead>
              <tr className="border-b border-blue-200 bg-blue-50">
                <th className="text-left py-3 px-4 font-semibold text-blue-700">
                  Task ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-blue-700">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-blue-700">
                  Assigned To
                </th>
                <th className="text-left py-3 px-4 font-semibold text-blue-700">
                  Generator ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-blue-700">
                  Due Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-blue-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-blue-700">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody>
              {filteredTasks.map((task, index) => (
                  <tr
                      key={task.id}
                      className={`border-b border-blue-100 hover:bg-blue-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'
                      }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {task.taskId}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{task.description}</td>
                    <td className="py-3 px-4 text-gray-700">{task.assignedTo}</td>
                    <td className="py-3 px-4 text-gray-700">{task.generatorId}</td>
                    <td className="py-3 px-4 text-gray-700">{task.dueDate}</td>
                    <td className="py-3 px-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                        )}`}
                    >
                      {getStatusText(task.status)}
                    </span>
                    </td>
                    <td className="py-3 px-4">
                      {task.status === 'completed' ? (
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Reopen
                          </button>
                      ) : (
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Complete
                          </button>
                      )}
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
