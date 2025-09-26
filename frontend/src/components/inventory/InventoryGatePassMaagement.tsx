// app/(your-route)/page.tsx  OR components/InventoryGatePassManagement.tsx
"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

type Status = "Active" | "Returned" | "Overdue" | "Pending";

interface GatePassRecord {
  id: string;
  batteryId: string;
  technician: string;
  issueDate: string; // yyyy-mm-dd
  status: Status;
}

const initialRecords: GatePassRecord[] = [
  { id: "GP-2024-001", batteryId: "BAT-2024-001", technician: "Sarah Wilson", issueDate: "2025-04-08", status: "Active" },
  { id: "GP-2024-002", batteryId: "BAT-2024-085", technician: "Sarah Wilson", issueDate: "2025-07-22", status: "Returned" },
  { id: "GP-2024-003", batteryId: "BAT-2024-042", technician: "Sarah Wilson", issueDate: "2025-08-12", status: "Overdue" },
  { id: "GP-2024-004", batteryId: "BAT-2024-123", technician: "Sarah Wilson", issueDate: "2025-05-08", status: "Pending" },
];

interface InventoryGatePassManagementProps {
  onNavigate?: (page: string) => void;
}

export default function InventoryGatePassManagement({ onNavigate }: InventoryGatePassManagementProps) {
  const [records, setRecords] = useState<GatePassRecord[]>(initialRecords);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("All Assignees");

  // Modal + form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batteryId, setBatteryId] = useState("");
  const [technician, setTechnician] = useState("");
  const [issueDate, setIssueDate] = useState(""); // yyyy-mm-dd
  const [status, setStatus] = useState<Status>("Pending");

  // Helpers
  const formatDate = (isoDate: string) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return isNaN(d.getTime()) ? isoDate : d.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  const generateNextId = () => {
    let max = 0;
    for (const r of records) {
      const m = r.id.match(/GP-\d{4}-(\d+)/);
      if (m) {
        const n = parseInt(m[1], 10);
        if (!isNaN(n) && n > max) max = n;
      }
    }
    return `GP-2024-${String(max + 1).padStart(3, "0")}`;
  };

  const handleOpenModal = () => {
    setBatteryId("");
    setTechnician("");
    setIssueDate("");
    setStatus("Pending");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddRecord = () => {
    if (!batteryId.trim() || !technician.trim() || !issueDate.trim()) {
      alert("Please fill Battery ID, Technician and Issue Date.");
      return;
    }
    const newRecord: GatePassRecord = {
      id: generateNextId(),
      batteryId: batteryId.trim(),
      technician: technician.trim(),
      issueDate,
      status,
    };
    setRecords((prev) => [...prev, newRecord]);
    handleCloseModal();
  };

  // Mark complete / reopen
  const handleToggleComplete = (id: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === "Returned" ? "Pending" : "Returned" } : r
      )
    );
  };

  // Derived data
  const filtered = records.filter((r) => {
    const q = search.trim().toLowerCase();
    if (
      q &&
      !(
        r.id.toLowerCase().includes(q) ||
        r.batteryId.toLowerCase().includes(q) ||
        r.technician.toLowerCase().includes(q)
      )
    ) {
      return false;
    }
    if (statusFilter !== "All Status" && r.status !== statusFilter) return false;
    if (assigneeFilter !== "All Assignees" && r.technician !== assigneeFilter) return false;
    return true;
  });

  const assignees = Array.from(new Set(records.map((r) => r.technician)));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Gate Pass Management</h1>
          <p className="text-gray-600 text-lg">Create, track, and manage equipment gate passes</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Create Gate Pass
        </button>
      </div>

      {/* Stats (blue outline) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-blue-300">
          <p className="text-gray-500">Pending Tasks</p>
          <h2 className="text-2xl font-bold">{records.filter((r) => r.status === "Pending").length}</h2>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-300">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold">{records.filter((r) => r.status === "Returned").length}</h2>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-300">
          <p className="text-gray-500">Overdue</p>
          <h2 className="text-2xl font-bold">{records.filter((r) => r.status === "Overdue").length}</h2>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-300">
          <p className="text-gray-500">Due Today</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>
      </div>

      {/* Filters (keep GRAY outline) */}
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search gate pass..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Returned</option>
              <option>Overdue</option>
            </select>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium mb-1">Assignee</label>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option>All Assignees</option>
              {assignees.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table (blue outline + blue row separators) */}
      <div className="bg-white rounded-lg p-4 border border-blue-300">
        <h3 className="text-lg font-semibold mb-4">Gate Pass Records</h3>
        <table className="w-full border border-blue-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-50 text-left">
              <th className="p-3">Pass ID</th>
              <th className="p-3">Battery ID</th>
              <th className="p-3">Technician</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.id} className="hover:bg-blue-50 border-t border-blue-300">
                <td className="p-3">{record.id}</td>
                <td className="p-3">{record.batteryId}</td>
                <td className="p-3">{record.technician}</td>
                <td className="p-3">{formatDate(record.issueDate)}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      record.status === "Active"
                        ? "bg-black"
                        : record.status === "Returned"
                        ? "bg-gray-500"
                        : record.status === "Overdue"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  {record.status === "Returned" ? (
                    <button
                      onClick={() => handleToggleComplete(record.id)}
                      className="px-4 py-1 rounded bg-yellow-300 text-sm hover:bg-yellow-400"
                    >
                      Reopen
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleComplete(record.id)}
                      className="px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal (keep GRAY outline) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative border border-gray-200">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-blue-600 mb-4">Create Gate Pass</h2>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-600">Battery ID</span>
                <input
                  type="text"
                  placeholder="BAT-2025-001"
                  value={batteryId}
                  onChange={(e) => setBatteryId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Technician</span>
                <input
                  type="text"
                  placeholder="Technician name"
                  value={technician}
                  onChange={(e) => setTechnician(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Issue Date</span>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Returned">Returned</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </label>

              <div className="flex gap-2">
                <button
                  onClick={handleAddRecord}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Gate Pass
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
