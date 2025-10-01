"use client";

import React, { useState, useEffect } from "react";
import { FaBell, FaEye } from "react-icons/fa";
import { db } from "../../firebaseConfig";
import { ref, onValue, push, set, get } from "firebase/database";
import { useAuth } from "@/hooks/useAuth";

interface OperatorIssueReportingProps {
  onNavigate?: (page: string) => void;
}

interface Issue {
  id: string;
  description: string;
  assigned_to?: string;
  equipment_id: string;
  equipment_type: string;
  severity: string;
  status: string;
  createdAt: number;
  createdBy: string;
}

interface Generator {
  id: string;
  serial_no: string;
  brand: string;
  size: string;
  status: string;
  shop_id: string;
}

export default function OperatorIssueReporting({ onNavigate }: OperatorIssueReportingProps) {
  const { userProfile } = useAuth();
  const [genId, setGenId] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [batteryInfo, setBatteryInfo] = useState(false);
  const [issueDetails, setIssueDetails] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [loading, setLoading] = useState(false);

  // Load generators for current shop
  useEffect(() => {
    if (!userProfile?.shopId) return;

    const generatorsRef = ref(db, 'generators');
    const unsubscribe = onValue(generatorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const shopGenerators = Object.keys(data)
          .map(key => ({ id: key, ...data[key] }))
          .filter(gen => gen.shop_id === userProfile.shopId);
        setGenerators(shopGenerators);
      }
    });

    return unsubscribe;
  }, [userProfile?.shopId]);


  //  Load only current user's issues
  useEffect(() => {
    if (!userProfile?.id) return; // Wait until user is loaded

    const issuesRef = ref(db, 'issues');
    const unsubscribe = onValue(issuesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allIssues: Issue[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        // 🔹 Filter issues created by this logged-in user
        const userIssues = allIssues.filter(
          (issue) => issue.createdBy === userProfile.id
        );

        setIssues(userIssues.reverse()); // newest first
      } else {
        setIssues([]);
      }
    });

    return unsubscribe;
  }, [userProfile?.id]);

  
  // Load issues
  useEffect(() => {
    const issuesRef = ref(db, 'issues');
    const unsubscribe = onValue(issuesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const issuesList: Issue[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setIssues(issuesList.reverse()); // Show newest first
      }
    });

    return unsubscribe;
  }, []);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genId || !issueDetails || !userProfile) return;

    setLoading(true);
    try {
      const issueId = `issue_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      const newIssueRef = ref(db, `issues/${issueId}`);
      
      const issueData = {
        id: issueId,
        equipment_id: genId,
        equipment_type: batteryInfo ? "Generator + Battery" : "Generator",
        severity: emergency ? "High" : "Medium",
        description: issueDetails,
        createdAt: Date.now(),
        createdBy: userProfile.id,
        createdByRole: "operator",
        status: "open",
        assigned_to: null
      };

      await set(newIssueRef, issueData);

      // Reset form
      setGenId("");
      setIssueDetails("");
      setEmergency(false);
      setBatteryInfo(false);
      
      alert("Issue reported successfully!");
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="container mx-auto p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">Issue Reporting</h1>
            <p className="text-gray-500">Report Generator Breakdowns</p>
          </div>
          <button className="relative bg-blue-500 text-white rounded p-2 shadow flex items-center justify-center">
            <FaBell className="text-white text-xl" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </header>

        {/* Form */}
        <main>
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Generator Selection */}
                <div>
                  <label htmlFor="gen-id" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Generator
                  </label>
                  <select
                    id="gen-id"
                    value={genId}
                    onChange={(e) => setGenId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a generator...</option>
                    {generators.map(gen => (
                      <option key={gen.id} value={gen.id}>
                        {gen.id} - {gen.serial_no} ({gen.brand} {gen.size})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Switches */}
                <div className="flex items-center space-x-8 mt-4 md:mt-0 md:justify-end">
                  {/* Emergency */}
                  <div className="flex items-center">
                    <label htmlFor="emergency" className="mr-3 text-sm font-medium text-gray-700">
                      Emergency
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        id="emergency"
                        type="checkbox"
                        checked={emergency}
                        onChange={() => setEmergency(!emergency)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  {/* Battery Info */}
                  <div className="flex items-center">
                    <label htmlFor="battery-info" className="mr-3 text-sm font-medium text-gray-700">
                      Include Battery
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        id="battery-info"
                        type="checkbox"
                        checked={batteryInfo}
                        onChange={() => setBatteryInfo(!batteryInfo)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Issue Details */}
              <div className="mt-6">
                <label htmlFor="issue-details" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Details
                </label>
                <textarea
                  id="issue-details"
                  rows={6}
                  value={issueDetails}
                  onChange={(e) => setIssueDetails(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-yellow-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Issue'}
                </button>
              </div>
            </div>
          </form>

          {/* Issues Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Recent Issues
            </h2>
            <p className="text-sm text-gray-500 mb-4">{issues.length} issues found</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 border border-blue-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Issue ID</th>
                    <th className="px-6 py-3">Equipment</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Severity</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.slice(0, 10).map((issue) => (
                    <tr key={issue.id} className="bg-white border-b border-b-blue-200">
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {issue.id.substring(0, 12)}...
                      </td>
                      <td className="px-6 py-3">
                        <div>
                          <div className="font-medium">{issue.equipment_id}</div>
                          <div className="text-xs text-gray-500">{issue.equipment_type}</div>
                        </div>
                      </td>
                      <td className="px-6 py-3 max-w-xs truncate">
                        {issue.description}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => onNavigate?.("Reports")} 
                          className="p-2 rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

