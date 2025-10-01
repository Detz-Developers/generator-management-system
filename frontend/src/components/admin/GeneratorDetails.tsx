

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MdCalendarToday, MdOutlineArrowBack } from "react-icons/md";
import { useParams } from "next/navigation";
import {
  ref,
  onValue,
  get,
  query,
  orderByChild,
  equalTo,
  push,
  set,
} from "firebase/database";
import { db } from "../../firebaseConfig";

interface IndividualProps {
  onNavigate: (page: string) => void;
  generatorId?: string;
}

export default function Dashboard({ onNavigate, generatorId }: IndividualProps) {
  const params = useParams() as { id?: string } | null;
  const effectiveId =
    generatorId ?? (params?.id ? String(params.id) : undefined);

  const [activeTab, setActiveTab] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [gen, setGen] = useState<any>(null);
  const [shopName, setShopName] = useState<string>("");
  const [serviceLogs, setServiceLogs] = useState<any[]>([]);
  const [repairLogs, setRepairLogs] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    generatorId: effectiveId ?? "",
    serviceType: "",
    description: "",
    serviceDate: "",
    nextServiceDate: "",
    cost: "",
    technicianId: "",
    invoiceId: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create a new key under serviceLogs
      const newLogRef = push(ref(db, "serviceLogs"));

      // Derive an id; use Firebase key as canonical id
      const nowIso = new Date().toISOString();
      const nowMs = Date.now();
      const id = newLogRef.key;

      const newLog = {
        id,
        generatorId: formData.generatorId || effectiveId || "",
        serviceType:
          formData.serviceType === "emergency"
            ? "Emergency Repair"
            : formData.serviceType, // optional mapping to your sample wording
        description: formData.description,
        serviceDate: formData.serviceDate,
        nextDueDate: formData.nextServiceDate,
        cost: Number(formData.cost),
        technicianId: formData.technicianId,
        invoiceId: formData.invoiceId || "",
        notes: formData.notes,
        overdue:
          !!formData.nextServiceDate &&
          new Date(formData.nextServiceDate).getTime() < new Date().setHours(0, 0, 0, 0),
        createdAt: nowIso,
        updatedAt: nowMs,
      };

      // WRITE TO DATABASE (this was commented out before)
      await set(newLogRef, newLog);

      alert("✅ Service log added successfully!");
      setShowModal(false);
      setFormData({
        generatorId: effectiveId ?? "",
        serviceType: "",
        description: "",
        serviceDate: "",
        nextServiceDate: "",
        cost: "",
        technicianId: "",
        invoiceId: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding service log:", error);
      alert("❌ Failed to add service log");
    }
  };

  const fmtDate = (d?: number | string | null) => {
    if (!d) return "--";
    const date = typeof d === "number" ? new Date(d) : new Date(String(d));
    return isNaN(date.getTime()) ? "--" : date.toLocaleDateString();
  };

  const toTitle = (s?: string | null) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
  const normalizeStatus = (s?: string) => {
    const v = String(s ?? "").toLowerCase();
    if (v.includes("unusable")) return "Unusable";
    if (v.includes("repair")) return "Under Repair";
    return "Active";
  };

  const statusColor = useMemo(() => {
    const v = normalizeStatus(gen?.status).toLowerCase();
    if (v.includes("unusable")) return "text-red-600 bg-red-100";
    if (v.includes("repair")) return "text-yellow-700 bg-yellow-100";
    return "text-green-600 bg-green-100";
  }, [gen?.status]);

  // Load generator details
  useEffect(() => {
    if (!effectiveId) return;
    const loadGenerator = async () => {
      const byKey = ref(db, `generators/${effectiveId}`);
      const snap = await get(byKey);
      if (snap.exists()) setGen(snap.val());
      else {
        const q = query(
          ref(db, "generators"),
          orderByChild("id"),
          equalTo(effectiveId)
        );
        const snap2 = await get(q);
        if (snap2.exists()) {
          const firstKey = Object.keys(snap2.val())[0];
          setGen(snap2.val()[firstKey]);
        }
      }
    };
    loadGenerator();
  }, [effectiveId]);

  // Load shop name
  useEffect(() => {
    if (!gen?.shop_id) return;
    const shopRef = ref(db, `shops/${gen.shop_id}`);
    const unsub = onValue(shopRef, (snap) => {
      const val = snap.val();
      setShopName(val?.name || val?.code || "");
    });
    return () => unsub();
  }, [gen?.shop_id]);

  // Load repair logs
  useEffect(() => {
    if (!effectiveId) return;
    const qIssues = query(
      ref(db, "issues"),
      orderByChild("equipmentId"),
      equalTo(effectiveId)
    );
    const unsub = onValue(qIssues, (snap) => {
      const val = snap.val() || {};
      setRepairLogs(Object.values(val));
    });
    return () => unsub();
  }, [effectiveId]);

  // Load service logs for this generator (used for Last/Due and in the table)
  useEffect(() => {
    if (!effectiveId) return;
    const qLogs = query(
      ref(db, "serviceLogs"),
      orderByChild("generatorId"),
      equalTo(effectiveId)
    );
    const unsub = onValue(qLogs, (snap) => {
      const val = snap.val() || {};
      const arr = Object.values(val);
      // Sort by serviceDate desc
      arr.sort((a: any, b: any) => {
        const da = new Date(a.serviceDate).getTime();
        const db = new Date(b.serviceDate).getTime();
        return db - da;
      });
      setServiceLogs(arr);
    });
    return () => unsub();
  }, [effectiveId]);

  // Last + Next service
  const lastService = useMemo(() => {
    if (!serviceLogs.length) return null;
    return serviceLogs.reduce((prev, curr) => {
      const prevDate = new Date(prev.serviceDate).getTime();
      const currDate = new Date(curr.serviceDate).getTime();
      return currDate > prevDate ? curr : prev;
    });
  }, [serviceLogs]);

  const dueServiceDate = lastService?.nextDueDate || "--";

  return (
    <div className="flex bg-white min-h-screen font-roboto">
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <div className="flex gap-x-4">
            <button
              onClick={() => onNavigate("Generators")}
              className="h-8 w-8 flex items-center justify-center border border-indigo-500 rounded-full hover:bg-gray-200"
            >
              <MdOutlineArrowBack className="text-lg" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {gen?.id || effectiveId}
              </h2>
              <p className="text-gray-500">
                {[gen?.brand, gen?.size].filter(Boolean).join(" - ")}
              </p>
            </div>
          </div>
        </header>

        {/* Generator Info + Service Schedule */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Info */}
            <div className="col-span-2 bg-gray-50 p-4 rounded-lg border border-indigo-500">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">
                Generator Information
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-8 text-sm">
                <div>
                  <p className="text-gray-500">Serial Number</p>
                  <p className="font-medium text-gray-800">
                    {gen?.serial_no || "--"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p
                    className={`font-medium px-2 py-1 rounded-full inline-block ${statusColor}`}
                  >
                    {normalizeStatus(gen?.status)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">
                    {toTitle(gen?.location) || "--"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Issued Date</p>
                  <p className="font-medium text-gray-800">
                    {fmtDate(gen?.issued_date)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Auto Start</p>
                  <p className="font-medium text-gray-800">
                    {gen?.hasAutoStart ? "Enabled" : "Not Enabled"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Battery Charger</p>
                  <p className="font-medium text-gray-800">
                    {gen?.hasBatteryCharger ? "Installed" : "Not Installed"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Warranty</p>
                  <p className="font-medium text-gray-800">
                    {gen?.warranty ? `${gen.warranty} months` : "--"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Installed Date</p>
                  <p className="font-medium text-gray-800">
                    {fmtDate(gen?.installed_date)}
                  </p>
                </div>
              </div>
            </div>

            {/* Service Schedule */}
            <div className="bg-gray-50 p-4 rounded-lg border border-indigo-500">
              <h3 className="font-semibold text-lg mb-4 text-gray-700">
                Service Schedule
              </h3>
              <div className="mb-4 flex items-center gap-2">
                <p className="text-gray-500">Last Service:</p>
                <MdCalendarToday className="text-blue-500" />
                <p className="font-medium text-gray-800">
                  {lastService ? fmtDate(lastService.serviceDate) : "--"}
                </p>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <p className="text-gray-500">Due Service:</p>
                <MdCalendarToday className="text-blue-500" />
                <p className="font-medium text-gray-800">{dueServiceDate}</p>
              </div>
              <button
                onClick={() => {
                  setFormData((p) => ({
                    ...p,
                    generatorId: effectiveId ?? p.generatorId,
                  }));
                  setShowModal(true);
                }}
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-950"
              >
                Log Service
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="p-2 border border-indigo-500 rounded-lg">
            <div className="flex border-b w-full bg-sky-100 mb-4 rounded-full">
              {["1", "2", "3"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 text-center px-4 py-1 rounded-full ${
                    activeTab === tab
                      ? "text-white font-semibold bg-blue-500"
                      : "text-gray-700 hover:bg-blue-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "1"
                    ? "Service History"
                    : tab === "2"
                    ? "Repair Logs"
                    : "Extracted Parts"}
                </button>
              ))}
            </div>

            {/* Service History (NOW SHOWS serviceLogs) */}
            {activeTab === "1" && (
              <table className="w-full text-left">
                <thead className="bg-gray-200 sticky top-0">
                  <tr className="text-gray-600 text-sm border-gray-100">
                    <th className="p-3">Date</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Technician</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Cost</th>
                    <th className="p-3">Invoice No.</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {serviceLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-3 text-gray-500">
                        No service records
                      </td>
                    </tr>
                  ) : (
                    serviceLogs.map((s, idx) => (
                      <tr key={s.id ?? idx} className="border-b border-gray-100">
                        <td className="p-3">
                          {fmtDate(s.serviceDate || s.scheduledDate || s.createdAt)}
                        </td>
                        <td className="p-3">
                          {s.serviceType || s.type || "-"}
                        </td>
                        <td className="p-3">
                          {s.technicianId || s.provider || "-"}
                        </td>
                        <td className="p-3">{s.description || s.name || "-"}</td>
                        <td className="p-3">
                          {s.cost ? `LKR ${s.cost}` : "-"}
                        </td>
                        <td className="p-3">{s.invoiceId || s.id || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Repair Logs */}
            {activeTab === "2" && (
              <div className="space-y-2">
                {repairLogs.length === 0 ? (
                  <p className="p-3 text-gray-500">No repair logs</p>
                ) : (
                  repairLogs.map((r, idx) => (
                    <div
                      key={idx}
                      className="border border-blue-300 rounded-md p-4 shadow-sm bg-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="font-semibold">
                          {r.description || "Issue"}
                        </h2>
                        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                          {r.status || "Pending"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 flex gap-4">
                        <p>
                          <span className="font-medium">Technician:</span>{" "}
                          {r.technicianId || "-"}
                        </p>
                        <p>
                          <span className="font-medium">Severity:</span>{" "}
                          {r.severity || "-"}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {fmtDate(r.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Extracted Parts */}
            {activeTab === "3" && (
              <div>
                {Array.isArray(gen?.extracted_parts) &&
                gen.extracted_parts.length > 0 ? (
                  <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    {gen.extracted_parts.map((p: any, i: number) => (
                      <li
                        key={i}
                        className="px-4 py-2 text-sm text-gray-800"
                      >
                        {typeof p === "string"
                          ? p
                          : p?.name || JSON.stringify(p)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-3 text-gray-500">No extracted parts</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Service Details</h2>
              <p className="text-gray-500 mb-6">
                Record service information and maintenance activities
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Generator ID & Service Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Generator ID */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Generator ID
                    </label>
                    <input
                      type="text"
                      name="generatorId"
                      value={formData.generatorId}
                      onChange={handleChange}
                      className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 bg-gray-100 border border-blue-100"
                      placeholder="e.g. GN0002"
                      required
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Service Type
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 bg-gray-100 border border-blue-100"
                      required
                    >
                      <option value="">Select service type</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="repair">Repair</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter detailed service description..."
                    className="mt-1 block w-full pl-2 py-2 bg-gray-100 rounded-md border border-blue-100"
                    rows={3}
                    required
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Service Date */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Service Date
                    </label>
                    <input
                      type="date"
                      name="serviceDate"
                      value={formData.serviceDate}
                      onChange={handleChange}
                      className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 bg-gray-100 border border-blue-100"
                      required
                    />
                  </div>

                  {/* Next Due Date */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Next Service Date
                    </label>
                    <input
                      type="date"
                      name="nextServiceDate"
                      value={formData.nextServiceDate}
                      onChange={handleChange}
                      className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 bg-gray-100 border border-blue-100"
                      required
                    />
                  </div>
                </div>

                {/* Cost */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Cost (LKR)
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="Enter service cost"
                    className="mt-1 pl-2 py-2 block w-full rounded-md bg-gray-100 border border-blue-100"
                    min="0"
                    required
                  />
                </div>

                {/* Technician ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Technician ID
                  </label>
                  <input
                    type="text"
                    name="technicianId"
                    value={formData.technicianId}
                    onChange={handleChange}
                    placeholder="e.g. uid_456"
                    className="mt-1 pl-2 py-2 block w-full rounded-md bg-gray-100 border border-blue-100"
                    required
                  />
                </div>

                {/* Invoice ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Invoice No.
                  </label>
                  <input
                    type="text"
                    name="invoiceId"
                    value={formData.invoiceId}
                    onChange={handleChange}
                    placeholder="e.g. INV12345"
                    className="mt-1 pl-2 py-2 block w-full rounded-md bg-gray-100 border border-blue-100"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Technician Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter technician notes and observations..."
                    className="mt-1 block pl-2 py-3 w-full rounded-lg bg-gray-100 border border-blue-100"
                    rows={3}
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Log Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}