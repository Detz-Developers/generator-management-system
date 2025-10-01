"use client";

import React, { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { FaBell } from "react-icons/fa";
import { db } from "../../firebaseConfig";
import { child, get, ref } from "firebase/database";

interface OperatorGeneratorsProps {
  onNavigate?: (page: string) => void;
  operatorId?: string;
}

interface Generator {
  id: string;
  brand: string;
  serial_no: string;
  shop_id: string;
  location: string; // e.g., "DOWN" | "STANDBY" | anything else => Online
  size?: string;
  status?: string;
  warranty?: number; // months
  installed_date?: number; // unix ms
  issued_date?: number; // unix ms
  hasAutoStart?: boolean;
  hasBatteryCharger?: boolean;
}

interface Battery {
  id: string;
  generator_id: string;
  install_date: number; // unix ms
  issue_type: string;
  serial_no?: string;
  size?: string;
}

interface Shop {
  id: string;
  name: string;
  city: string;
  operatorId?: string;
}

interface ServiceLog {
  id: string;
  generator_id: string;
  serviceDate: string; // display-ready date (or ISO)
  serviceType: string;
  notes?: string;
  cost?: number;
}

interface CustomDatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onClose: () => void;
}

function CustomDatePicker({ selectedDate, onDateChange, onClose }: CustomDatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDateForInput = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateForInput(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = dateStr === tempSelectedDate;
      const isToday = dateStr === new Date().toISOString().split('T')[0];

      days.push(
        <button
          key={day}
          className={`w-8 h-8 rounded-full text-sm flex items-center justify-center hover:bg-blue-100 ${
            isSelected ? 'bg-blue-500 text-white' : isToday ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
          }`}
          onClick={() => setTempSelectedDate(dateStr)}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === 'prev' ? -1 : 1));
    setCurrentMonth(newMonth);
  };

  const handleOK = () => {
    onDateChange(tempSelectedDate);
    onClose();
  };

  const handleCancel = () => {
    setTempSelectedDate(selectedDate);
    onClose();
  };

  return (
    <div className="w-80">
      <div className="flex items-center justify-between mb-2">
        <button
          className="px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => navigateMonth('prev')}
          aria-label="Previous month"
        >
          &lt;
        </button>
        <div className="font-semibold text-gray-800">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          className="px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => navigateMonth('next')}
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-center text-gray-500">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-3">
        {renderCalendarDays()}
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleOK}
        >
          OK
        </button>
      </div>
    </div>
  );
}

// Lightweight responsive area chart using pure SVG with gradient and tooltip
function ChartArea({
  labels,
  data,
  hoverIndex,
  setHoverIndex,
}: {
  labels: string[];
  data: number[];
  hoverIndex: number | null;
  setHoverIndex: (i: number | null) => void;
}) {
  const width = 720;
  const height = 220;
  const pad = { l: 36, r: 12, t: 16, b: 28 };

  const days = Math.max(1, data.length);
  const minY = Math.min(...data, 0);
  const maxY = Math.max(...data, 1);
  const innerW = width - pad.l - pad.r;
  const innerH = height - pad.t - pad.b;

  const xAt = (i: number) => pad.l + (i / (days - 1 || 1)) * innerW;
  const yAt = (v: number) => {
    const span = Math.max(1, maxY - minY);
    return pad.t + (1 - (v - minY) / span) * innerH;
  };

  let dLine = "";
  data.forEach((v, i) => {
    const x = xAt(i);
    const y = yAt(v);
    dLine += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  });
  const dArea = `${dLine} L ${xAt(days - 1)} ${pad.t + innerH} L ${xAt(0)} ${pad.t + innerH} Z`;

  const gridYValues = 4;
  const gridLines = Array.from({ length: gridYValues + 1 }, (_, i) => pad.t + (i / gridYValues) * innerH);

  const handleMove = (evt: ReactMouseEvent<SVGRectElement, MouseEvent>) => {
    const { left } = (evt.currentTarget as SVGRectElement).getBoundingClientRect();
    const px = evt.clientX - left;
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < days; i++) {
      const dx = Math.abs(px - xAt(i));
      if (dx < best) {
        best = dx;
        nearest = i;
      }
    }
    setHoverIndex(nearest);
  };

  const handleLeave = () => setHoverIndex(null);

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56">
        <defs>
          <linearGradient id="strokeGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="fillGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.28)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.06)" />
          </linearGradient>
        </defs>

        {gridLines.map((y, idx) => (
          <line key={idx} x1={pad.l} y1={y} x2={pad.l + innerW} y2={y} stroke="#e5e7eb" strokeWidth={1} />
        ))}

        <path d={dArea} fill="url(#fillGrad)" stroke="none" />
        <path d={dLine} fill="none" stroke="url(#strokeGrad)" strokeWidth={3.5} strokeLinecap="round" />

        {data.map((v, i) => (
          <circle key={i} cx={xAt(i)} cy={yAt(v)} r={hoverIndex === i ? 4 : 3} fill="#3b82f6" />
        ))}

        <rect
          x={pad.l}
          y={pad.t}
          width={innerW}
          height={innerH}
          fill="transparent"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        />

        {hoverIndex !== null && (
          <line
            x1={xAt(hoverIndex)}
            x2={xAt(hoverIndex)}
            y1={pad.t}
            y2={pad.t + innerH}
            stroke="#93c5fd"
            strokeDasharray="4 4"
          />
        )}
      </svg>

      {hoverIndex !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-2 rounded-md bg-white shadow px-2 py-1 text-xs border"
          style={{
            left: `${((hoverIndex / (days - 1 || 1)) * 100)}%`,
            top: 6,
          }}
        >
          <div className="text-gray-500">{labels[hoverIndex]}</div>
          <div className="font-semibold text-gray-800">{data[hoverIndex]}</div>
        </div>
      )}

      <div className="mt-2 flex justify-between text-[11px] text-gray-500">
        <span>{labels[0]}</span>
        <span>{labels[Math.floor(labels.length / 2)]}</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
    </div>
  );
}

function getStatusStyles(status?: string) {
  // Map status to tailwind token strings used in the UI
  switch (status) {
    case "DOWN":
      return { color: "bg-red-100 text-red-800" };
    case "STANDBY":
      return { color: "bg-blue-100 text-blue-800" };
    case "ONLINE":
    default:
      return { color: "bg-green-100 text-green-800" };
  }
}

export default function OperatorGenerators({
  onNavigate,
  operatorId = "Ytz9V9VkKsRkEnIueRfvjghYV523",
}: OperatorGeneratorsProps) {
  const [isAISummaryOpen] = useState(false); // reserved
  const [search, setSearch] = useState("");
  const [withBattery, setWithBattery] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [generators, setGenerators] = useState<Generator[]>([]);
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  // Details modal and insights
  const [selectedGenerator, setSelectedGenerator] = useState<Generator | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [aiInsights, setAiInsights] = useState<string>("");
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [serviceLogs, setServiceLogs] = useState<ServiceLog[]>([]);

  // Dismiss date picker on outside click / ESC
  useEffect(() => {
    if (!showDatePicker) return;
    const onClick = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowDatePicker(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [showDatePicker]);

  // Fetch Shop, Generators, Batteries, Service Logs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db);

        const shopsSnap = await get(child(dbRef, "shops"));
        const shopsData = shopsSnap.exists() ? shopsSnap.val() : {};

        const shopKey = Object.keys(shopsData).find((key) => {
          const s = shopsData[key];
          return s && s.operatorId === operatorId;
        });

        if (!shopKey) {
          console.warn("No shop found for operator");
          setShop(null);
          setGenerators([]);
          setBatteries([]);
          setServiceLogs([]);
          return;
        }

        const shopObj: Shop = { id: shopKey, ...shopsData[shopKey] };
        setShop(shopObj);

        const genSnap = await get(child(dbRef, "generators"));
        const genData = genSnap.exists() ? genSnap.val() : {};
        const gens: Generator[] = Object.keys(genData)
          .map((key) => ({ id: key, ...genData[key] }))
          .filter((g) => g.shop_id === shopObj.id);
        setGenerators(gens);

        const batSnap = await get(child(dbRef, "batteries"));
        const batData = batSnap.exists() ? batSnap.val() : {};
        const bats: Battery[] = Object.keys(batData).map((key) => ({
          id: key,
          ...batData[key],
        }));
        setBatteries(bats);

        const logsSnap = await get(child(dbRef, "serviceLogs"));
        const logsData = logsSnap.exists() ? logsSnap.val() : {};
        const logs: ServiceLog[] = Object.keys(logsData).map((key) => ({
          id: key,
          ...logsData[key],
        }));
        setServiceLogs(logs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [operatorId]);

  // Helpers
  const hasBattery = (generatorId: string) =>
    batteries.some((b) => b.generator_id === generatorId);

  const getGeneratorBattery = (generatorId: string): Battery | undefined =>
    batteries.find((b) => b.generator_id === generatorId);

  const getGeneratorServiceHistory = (generatorId: string): ServiceLog[] =>
    serviceLogs
      .filter((log) => log.generator_id === generatorId)
      .sort((a, b) => {
        const ad = new Date(a.serviceDate).getTime();
        const bd = new Date(b.serviceDate).getTime();
        return bd - ad;
      });

  const filteredGenerators = generators.filter((g) => {
    const searchMatch =
      g.id.toLowerCase().includes(search.toLowerCase()) ||
      g.serial_no?.toLowerCase().includes(search.toLowerCase());
    const matchBattery = withBattery ? hasBattery(g.id) : !hasBattery(g.id);
    return searchMatch && matchBattery;
  });

  // Build chart labels and "real" data from battery install_date counts per day
  const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
  const labels = Array.from({ length: days }, (_, i) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - (days - 1 - i));
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  const startOfDayUtc = (d: Date) => {
    const d2 = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
    return d2.getTime();
  };
  const dayKey = (timestampMs: number) => {
    const d = new Date(timestampMs);
    return startOfDayUtc(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())));
  };

  const selectedDateObj = new Date(selectedDate);
  const startWindow = new Date(selectedDateObj);
  startWindow.setDate(selectedDateObj.getDate() - (days - 1));
  const startKey = startOfDayUtc(startWindow);

  const dayKeys: number[] = Array.from({ length: days }, (_, i) => {
    const d = new Date(startKey);
    d.setUTCDate(d.getUTCDate() + i);
    return d.getTime();
  });

  const countsByDay: Record<number, number> = {};
  dayKeys.forEach((k) => (countsByDay[k] = 0));

  batteries.forEach((b) => {
    if (typeof b.install_date !== "number") return;
    const k = dayKey(b.install_date);
    if (k in countsByDay) countsByDay[k] += 1;
  });

  const data = dayKeys.map((k) => countsByDay[k] ?? 0);

  const handleShowDetails = async (generator: Generator) => {
    setSelectedGenerator(generator);
    setShowDetails(true);
    setLoadingInsights(true);
    setUsingFallback(true); // we use a simple built-in generator (no external API)

    try {
      const lines: string[] = [];
      lines.push(`Generator: ${generator.brand ?? "Unknown"} (${generator.serial_no ?? "N/A"})`);
      if (generator.size) lines.push(`Size: ${generator.size}`);
      lines.push(`Status: ${generator.status ?? generator.location ?? "Unknown"}`);
      if (typeof generator.warranty === "number") lines.push(`Warranty: ${generator.warranty} months`);
      if (generator.installed_date)
        lines.push(`Installed: ${new Date(generator.installed_date).toLocaleDateString()}`);
      if (generator.issued_date)
        lines.push(`Issued: ${new Date(generator.issued_date).toLocaleDateString()}`);

      const battery = getGeneratorBattery(generator.id);
      if (battery) {
        lines.push(
          `Battery: ${battery.serial_no ?? battery.id} • ${battery.size ?? "N/A"} • Type: ${battery.issue_type}`
        );
        lines.push(`Battery Installed: ${new Date(battery.install_date).toLocaleDateString()}`);
      }

      const services = getGeneratorServiceHistory(generator.id).slice(0, 3);
      if (services.length > 0) {
        lines.push(`Recent Services:`);
        services.forEach((s) => {
          lines.push(`- ${s.serviceDate}: ${s.serviceType}${s.cost ? ` (LKR ${s.cost})` : ""}`);
        });
      }

      lines.push("");
      lines.push("Recommendations:");
      lines.push("- Schedule preventive inspection within the next 30 days.");
      lines.push("- Verify battery health under load and inspect terminals.");
      lines.push("- Review runtime logs for abnormal vibration or temperature.");
      lines.push("- Confirm charger operation and auto-start configuration.");

      setAiInsights(lines.join("\n"));
    } catch {
      setAiInsights("No insights available");
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-4xl font-bold text-blue-600">Available Generators</h1>
        <button className="bg-blue-500 text-white rounded p-2 shadow flex items-center justify-center">
          <FaBell className="text-white text-xl" />
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        {shop ? `Owned by ${shop.name} (${shop.city})` : loading ? "Loading shop..." : "No shop found"}
      </p>

      <div className="flex items-center gap-8 mb-8">
        <div className="mr-8">
          <p className="text-gray-700 font-small mb-2">Gen Id</p>
          <input
            type="text"
            placeholder="Serial Number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-blue-400 rounded px-4 py-1 w-64 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div
          className="relative w-[360px] h-10 rounded-full bg-blue-400 p-1 shadow mt-6"
          role="tablist"
          aria-label="Generator filter"
        >
          <div
            className="absolute top-1 bottom-1 rounded-full bg-white shadow transition-all duration-300"
            style={{ width: "calc(50% - 0.25rem)", left: withBattery ? "0.25rem" : "calc(50% + 0.25rem)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full select-none">
            <button
              type="button"
              role="tab"
              aria-selected={withBattery}
              className="flex-1 rounded-full font-semibold text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={() => setWithBattery(true)}
            >
              With Battery
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!withBattery}
              className="flex-1 rounded-full font-semibold text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={() => setWithBattery(false)}
            >
              Without Battery
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading generators...</p>
      ) : filteredGenerators.length === 0 ? (
        <p className="text-gray-500">No generators found.</p>
      ) : (
        <div className="space-y-4 mb-10">
          {filteredGenerators.map((g) => {
            let color = "bg-green-100";
            let dot = "bg-green-400";
            let status = "Online";
            if (g.location === "DOWN") {
              color = "bg-red-100";
              dot = "bg-red-400";
              status = "Sent to Repair";
            } else if (g.location === "STANDBY") {
              color = "bg-blue-100";
              dot = "bg-blue-400";
              status = "Standby";
            }
            return (
              <div
                key={g.id}
                onClick={() => handleShowDetails(g)}
                className={`flex items-center justify-between rounded-lg h-15 shadow ${color} cursor-pointer`}
              >
                <div className="flex items-center gap-4 my-4 mx-2">
                  <span className={`w-6 h-6 rounded-full ${dot}`}></span>
                  <div>
                    <div className="font-bold text-lg">Generator {g.id}</div>
                    <div className="text-sm text-gray-700">{status}</div>
                    <div className="text-xs text-gray-500">
                      {g.brand} • {g.serial_no}
                    </div>
                  </div>
                </div>
                <div className={`w-20 h-15 rounded-r-lg ${dot}`}></div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex gap-12 items-start">
        <div className="relative w-70" ref={datePickerRef}>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold mb-3 text-gray-800">Date</div>
            <button
              type="button"
              onClick={() => setShowDatePicker((v) => !v)}
              className="w-full flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
              aria-haspopup="dialog"
              aria-expanded={showDatePicker}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span className="text-gray-800">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${showDatePicker ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {showDatePicker && (
              <div className="absolute z-20 mt-2 w-90">
                <div className="origin-top left-0 bg-white rounded-xl shadow-xl border border-gray-100 p-1 animate-in fade-in slide-in-from-top-2">
                  <CustomDatePicker
                    selectedDate={selectedDate}
                    onDateChange={(d) => setSelectedDate(d)}
                    onClose={() => setShowDatePicker(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 ml-10">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-blue-600">Recently Breakdown</div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
              {([["7d", "7D"], ["30d", "30D"], ["90d", "90D"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTimeframe(key)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeframe === key ? "bg-white text-blue-600 shadow" : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-pressed={timeframe === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              <span className="text-sm text-green-700">Online</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              <span className="text-sm text-blue-700">Extra</span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="text-sm text-red-600">Replace Requests</span>
            </div>
          </div>

          <ChartArea
            labels={labels}
            data={data}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
          />
        </div>
      </div>

      {/* Generator Details Modal */}
      {showDetails && selectedGenerator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Generator Details - {selectedGenerator.id}
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">Serial Number:</span> {selectedGenerator.serial_no}</div>
                    <div><span className="font-medium">Brand:</span> {selectedGenerator.brand}</div>
                    <div><span className="font-medium">Size:</span> {selectedGenerator.size ?? "N/A"}</div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-sm ${getStatusStyles(selectedGenerator.status ?? selectedGenerator.location).color}`}>
                        {selectedGenerator.status ?? selectedGenerator.location}
                      </span>
                    </div>
                    <div><span className="font-medium">Location:</span> {selectedGenerator.location}</div>
                    <div><span className="font-medium">Warranty:</span> {typeof selectedGenerator.warranty === "number" ? selectedGenerator.warranty : "N/A"} months</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Features</h3>
                  <div className="space-y-2">
                    <div><span className="font-medium">Auto Start:</span> {selectedGenerator.hasAutoStart ? 'Yes' : 'No'}</div>
                    <div><span className="font-medium">Battery Charger:</span> {selectedGenerator.hasBatteryCharger ? 'Yes' : 'No'}</div>
                    <div><span className="font-medium">Installed Date:</span> {selectedGenerator.installed_date ? new Date(selectedGenerator.installed_date).toLocaleDateString() : "N/A"}</div>
                    <div><span className="font-medium">Issued Date:</span> {selectedGenerator.issued_date ? new Date(selectedGenerator.issued_date).toLocaleDateString() : "N/A"}</div>
                  </div>
                </div>
              </div>

              {/* Battery Information */}
              {getGeneratorBattery(selectedGenerator.id) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Battery Information</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    {(() => {
                      const battery = getGeneratorBattery(selectedGenerator.id);
                      return battery ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div><span className="font-medium">Battery ID:</span> {battery.id}</div>
                          <div><span className="font-medium">Serial Number:</span> {battery.serial_no ?? "N/A"}</div>
                          <div><span className="font-medium">Size:</span> {battery.size ?? "N/A"}</div>
                          <div><span className="font-medium">Type:</span> {battery.issue_type}</div>
                          <div><span className="font-medium">Install Date:</span> {new Date(battery.install_date).toLocaleDateString()}</div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </div>
              )}

              {/* Service History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Service History</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                  {getGeneratorServiceHistory(selectedGenerator.id).length > 0 ? (
                    <div className="space-y-3">
                      {getGeneratorServiceHistory(selectedGenerator.id).map(log => (
                        <div key={log.id} className="bg-white p-3 rounded border">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{log.serviceType}</div>
                              <div className="text-sm text-gray-600">{log.notes}</div>
                              <div className="text-xs text-gray-500">Date: {log.serviceDate}</div>
                            </div>
                            {typeof log.cost === "number" && (
                              <div className="text-sm font-medium text-green-600">
                                LKR {log.cost}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No service history available</p>
                  )}
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {usingFallback ? 'System Analysis & Recommendations' : 'AI Insights & Recommendations'}
                  </h3>
                  {usingFallback && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      System Generated
                    </span>
                  )}
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  {loadingInsights ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-gray-600">Analyzing generator data...</span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700 whitespace-pre-wrap prose prose-sm max-w-none">
                      {aiInsights || "No insights available"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

