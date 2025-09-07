import {useEffect, useRef, useState} from "react";
import { FaBell } from "react-icons/fa";

interface OperatorBatteriesProps {
  onNavigate?: (page: string) => void;
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
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateForInput = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
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
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
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
    <div className="bg-white rounded-lg shadow-lg p-4 w-80 border">
      <div className="mb-4">
        <div className="font-semibold text-gray-700 mb-2">Select date</div>
        <div className="text-lg font-medium text-gray-800">
          {new Date(tempSelectedDate).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Month/Year Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-sm font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {renderCalendarDays()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onClose}
          className="text-blue-500 text-sm hover:text-blue-600"
        >
          Close
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="text-blue-500 text-sm hover:text-blue-600"
          >
            Cancel
          </button>
          <button
            onClick={handleOK}
            className="text-blue-500 text-sm hover:text-blue-600 font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OperatorBatteries({ onNavigate }: OperatorBatteriesProps) {
    const [isAISummaryOpen, setIsAISummaryOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [withGen, setWithGen] = useState(true);
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datePickerRef = useRef<HTMLDivElement | null>(null);

    // Close popover on outside click or ESC key
    useEffect(() => {
      if (!showDatePicker) return;
      const onClick = (e: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
          setShowDatePicker(false);
        }
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowDatePicker(false);
      };
      document.addEventListener('mousedown', onClick);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onClick);
        document.removeEventListener('keydown', onKey);
      };
    }, [showDatePicker]);
    // Mock battery data
    const batteries = [
      { id: "B00281", status: "Online", type: "With Gen", color: "bg-green-100", dot: "bg-green-400" },
      { id: "G06723", status: "Extra", type: "Without Gen", color: "bg-blue-100", dot: "bg-blue-400" },
      { id: "G02386", status: "Replace Request Sent", type: "With Gen", color: "bg-red-100", dot: "bg-red-400" },
    ];

    // Filter batteries by search and toggle
    const filteredBatteries = batteries.filter(b =>
      b.id.toLowerCase().includes(search.toLowerCase()) &&
      (withGen ? b.type === "With Gen" : b.type === "Without Gen")
    );

    return (
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-blue-600">Batteries</h1>
          <button className="bg-blue-500 text-white rounded p-2 shadow flex items-center justify-center">
            <FaBell className="text-white text-xl" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">Monitor and manage battery status</p>

        {/* Search and Toggle */}
        <div className="flex items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Serial Number"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-4 py-2 w-64"
          />
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-full font-semibold ${withGen ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"}`}
              onClick={() => setWithGen(true)}
            >With Gen</button>
            <button
              className={`px-4 py-2 rounded-full font-semibold ${!withGen ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"}`}
              onClick={() => setWithGen(false)}
            >Without Gen</button>
          </div>
        </div>

        {/* Battery Cards */}
        <div className="space-y-4 mb-10">
          {filteredBatteries.map(b => (
            <div key={b.id} className={`flex items-center justify-between rounded-lg p-4 shadow ${b.color}`}>
              <div className="flex items-center gap-4">
                <span className={`w-6 h-6 rounded-full ${b.dot}`}></span>
                <div>
                  <div className="font-bold text-lg">Battery {b.id}</div>
                  <div className="text-sm text-gray-700">{b.status}</div>
                </div>
              </div>
              <div className={`w-16 h-10 rounded-r-lg ${b.dot}`}></div>
            </div>
          ))}
        </div>

  {/* Date Picker and Breakdown */}
        
        <div className="flex gap-8 items-start">
          {/* Date Picker */}
          <div className="relative w-80" ref={datePickerRef}>
            <div className="bg-white rounded-xl shadow p-4">
              <div className="font-semibold mb-3 text-gray-800">Date</div>
              <button
                type="button"
                onClick={() => setShowDatePicker(v => !v)}
                className="w-full flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200 px-3 py-2 transition"
                aria-haspopup="dialog"
                aria-expanded={showDatePicker}
              >
                <div className="flex items-center gap-3">
                  {/* Calendar icon */}
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                  <span className="text-gray-800">
                    {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {/* Popover */}
              {showDatePicker && (
                <div className="absolute z-20 mt-2 w-80">
                  <div className="origin-top left-0 bg-white rounded-xl shadow-xl border border-gray-100 p-3 animate-in fade-in slide-in-from-top-2">
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
          {/* Breakdown & Chart */}
          <div className="flex-1">
            <div className="font-semibold text-blue-600 mb-2">Recently Breakdown</div>
            <hr className="mb-4" />
            {/* Chart Placeholder */}
            <div className="bg-blue-50 rounded-lg h-40 flex items-end">
              {/* Simple SVG chart as placeholder */}
              <svg viewBox="0 0 300 100" className="w-full h-full">
                <polyline
                  fill="rgba(59,130,246,0.2)"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  points="0,80 40,60 80,70 120,50 160,60 200,40 240,80 280,30 300,90"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
}
