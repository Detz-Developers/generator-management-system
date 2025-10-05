import { useState } from "react";
import { FiAlertTriangle, FiClock, FiCheckCircle, FiPlus, FiSearch, FiFilter, FiAlertCircle, FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  reportedDate: string;
  lastUpdated: string;
  assignedTo?: string;
  category: "battery" | "generator" | "charger" | "other";
  location: string;
}

interface TechnicianIssueReportingProps {
  onNavigate?: (page: string) => void;
}

export default function TechnicianIssueReporting({ onNavigate }: TechnicianIssueReportingProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isExporting, setIsExporting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    category: "battery" as const,
    location: "",
  });

  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "ISS-2025-001",
      title: "Battery not holding charge",
      description: "Battery drains completely within 2 hours of full charge. Suspected cell failure.",
      status: "in-progress",
      priority: "high",
      reportedDate: "2025-09-20",
      lastUpdated: "2025-09-22",
      assignedTo: "John D.",
      category: "battery",
      location: "Warehouse A, Rack 5",
    },
    {
      id: "ISS-2025-002",
      title: "Charger overheating",
      description: "Charger unit gets extremely hot during operation and shuts down automatically.",
      status: "pending",
      priority: "medium",
      reportedDate: "2025-09-21",
      lastUpdated: "2025-09-21",
      category: "charger",
      location: "Maintenance Room 2",
    },
    {
      id: "ISS-2025-003",
      title: "Generator fuel leak",
      description: "Small fuel leak detected near the fuel pump. Needs immediate attention.",
      status: "resolved",
      priority: "critical",
      reportedDate: "2025-09-18",
      lastUpdated: "2025-09-20",
      assignedTo: "Sarah M.",
      category: "generator",
      location: "Outdoor Generator Pad 3",
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIssue: Issue = {
      id: `ISS-${new Date().getFullYear()}-${String(issues.length + 1).padStart(3, "0")}`,
      title: formData.title,
      description: formData.description,
      status: "pending",
      priority: formData.priority,
      reportedDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      category: formData.category,
      location: formData.location,
    };

    setIssues([newIssue, ...issues]);
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      category: "battery",
      location: "",
    });
    setIsFormOpen(false);
    alert("New issue submitted successfully!");
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || issue.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
    };

    const statusText = status.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusText}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-yellow-100 text-yellow-800",
      critical: "bg-red-100 text-red-800",
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityClasses[priority as keyof typeof priorityClasses]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const exportToPDF = () => {
    setIsExporting(true);
    const pdfDoc = new jsPDF();
    const title = "Issues Report";
    const date = new Date().toLocaleDateString();

    pdfDoc.setFontSize(18);
    pdfDoc.text(title, 14, 22);
    pdfDoc.setFontSize(11);
    pdfDoc.setTextColor(100);
    pdfDoc.text(`Generated on: ${date}`, 14, 30);

    const tableColumn = ["ID", "Title", "Status", "Priority", "Category", "Location", "Reported Date"];
    const tableRows: string[][] = [];

    filteredIssues.forEach((issue) => {
      const issueData = [
        issue.id,
        issue.title,
        issue.status.charAt(0).toUpperCase() + issue.status.slice(1),
        issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1),
        issue.category.charAt(0).toUpperCase() + issue.category.slice(1),
        issue.location,
        new Date(issue.reportedDate).toLocaleDateString(),
      ];
      tableRows.push(issueData);
    });

    autoTable(pdfDoc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 8, cellPadding: 2, valign: "middle", overflow: "linebreak", cellWidth: "wrap" },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 35 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 25 },
        5: { cellWidth: 35 },
        6: { cellWidth: 25 },
      },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold", fontSize: 8 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 40 },
      didDrawPage: function (data) {
        const pageSize = pdfDoc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        pdfDoc.text("Page " + (data as unknown as { pageCount: number }).pageCount, 14, pageHeight - 10);
      },
    });

    pdfDoc.save(`issues_report_${new Date().toISOString().slice(0, 10)}.pdf`);
    setIsExporting(false);
  };

  const exportToExcel = () => {
    setIsExporting(true);
    const excelData = filteredIssues.map((issue) => ({
      ID: issue.id,
      Title: issue.title,
      Description: issue.description,
      Status: issue.status.charAt(0).toUpperCase() + issue.status.slice(1),
      Priority: issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1),
      Category: issue.category.charAt(0).toUpperCase() + issue.category.slice(1),
      Location: issue.location,
      "Reported Date": new Date(issue.reportedDate).toLocaleDateString(),
      "Last Updated": new Date(issue.lastUpdated).toLocaleDateString(),
      "Assigned To": issue.assignedTo || "Unassigned",
    }));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Issues");

    worksheet.columns = [
      { header: "ID", key: "ID", width: 16 },
      { header: "Title", key: "Title", width: 30 },
      { header: "Description", key: "Description", width: 50 },
      { header: "Status", key: "Status", width: 14 },
      { header: "Priority", key: "Priority", width: 14 },
      { header: "Category", key: "Category", width: 16 },
      { header: "Location", key: "Location", width: 30 },
      { header: "Reported Date", key: "Reported Date", width: 16 },
      { header: "Last Updated", key: "Last Updated", width: 16 },
      { header: "Assigned To", key: "Assigned To", width: 18 },
    ];

    worksheet.addRows(excelData);

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };

    const fileName = `issues_export_${new Date().toISOString().slice(0, 10)}.xlsx`;

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }).catch(() => setIsExporting(false));
  };

  return (
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-600 mb-2">Issue Reporting</h1>
              <p className="text-gray-600">Report and track technical issues with batteries and equipment</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              <button
                  onClick={exportToPDF}
                  disabled={isExporting}
                  className={`flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${
                      isExporting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <FiDownload className="mr-2" />
                {isExporting ? "Exporting..." : "Export PDF"}
              </button>
              <button
                  onClick={exportToExcel}
                  disabled={isExporting}
                  className={`flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                      isExporting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <FiDownload className="mr-2" />
                {isExporting ? "Exporting..." : "Export Excel"}
              </button>
              <button
                  onClick={() => {
                    console.log("New Issue button clicked, setting isFormOpen to true");
                    setIsFormOpen(true);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FiPlus className="mr-2" />
                New Issue
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Issues</p>
                <p className="text-2xl font-semibold">{issues.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-full">
                <FiAlertTriangle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold">{issues.filter((i) => i.status === "pending").length}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-full">
                <FiClock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-semibold">{issues.filter((i) => i.status === "in-progress").length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-full">
                <FiAlertCircle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-2xl font-semibold">{issues.filter((i) => i.status === "resolved").length}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-full">
                <FiCheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FiFilter className="mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                    <li key={issue.id} className="hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-blue-600 truncate">{issue.id}</p>
                            <div className="ml-2">{getStatusBadge(issue.status)}</div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">{getPriorityBadge(issue.priority)}</div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">{issue.title}</p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <span className="font-medium">Location:</span> {issue.location}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              Reported on <time dateTime={issue.reportedDate}>{new Date(issue.reportedDate).toLocaleDateString()}</time>
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 line-clamp-2">{issue.description}</p>
                        </div>
                      </div>
                    </li>
                ))
            ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No issues found matching your criteria</p>
                </div>
            )}
          </ul>
        </div>

        {/* New Issue Modal */}
        {isFormOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div
                  className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6 z-60"
                  onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Report New Issue
                  </h3>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            required
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select
                              id="priority"
                              name="priority"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                              value={formData.priority}
                              onChange={handleInputChange}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select
                              id="category"
                              name="category"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                              value={formData.category}
                              onChange={handleInputChange}
                          >
                            <option value="battery">Battery</option>
                            <option value="generator">Generator</option>
                            <option value="charger">Charger</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            required
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., Warehouse A, Rack 5"
                        />
                      </div>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                        >
                          Submit Issue
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                            onClick={() => {
                              console.log("Cancel button clicked, closing modal");
                              setIsFormOpen(false);
                            }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
