import React, { useState } from 'react';
import {
  METRICS_SUMMARY,
  HOURLY_TRAFFIC_DATA,
  DEPARTMENT_BREAKDOWN,
  MODE_DISTRIBUTION,
  UNRESOLVED_BARRIERS,
} from '../data/mockAnalytics';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Download,
  Building,
  Filter,
  Calendar,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  X,
  Info,
} from 'lucide-react';

interface BarrierItem {
  id: string;
  facility: string;
  issue: string;
  severity: string;
  suggestedAction: string;
  status: string;
}

export const InstitutionPage: React.FC = () => {
  const { announce } = useAccessibility();

  const [barriers, setBarriers] = useState<BarrierItem[]>(UNRESOLVED_BARRIERS);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewTableTraffic, setViewTableTraffic] = useState(false);
  const [viewTableModes, setViewTableModes] = useState(false);
  const [viewTableDepts, setViewTableDepts] = useState(false);

  // New barrier form state
  const [newFacility, setNewFacility] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [newSeverity, setNewSeverity] = useState('High');
  const [newAction, setNewAction] = useState('');

  const handleResolveBarrier = (id: string) => {
    setBarriers((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === 'Resolved' ? 'In Progress' : 'Resolved' } : b
      )
    );
    announce('Barrier status updated');
  };

  const handleCreateBarrier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacility.trim() || !newIssue.trim()) return;

    const newEntry: BarrierItem = {
      id: `bar-${Date.now()}`,
      facility: newFacility.trim(),
      issue: newIssue.trim(),
      severity: newSeverity,
      suggestedAction: newAction.trim() || 'Install optical beacon & SignBridge tablet desk.',
      status: 'In Progress',
    };

    setBarriers((prev) => [newEntry, ...prev]);
    setIsModalOpen(false);
    setNewFacility('');
    setNewIssue('');
    setNewAction('');
    announce(`New auditory barrier logged for ${newEntry.facility}`);
  };

  // Real CSV Export
  const handleExportCSV = () => {
    const headers = ['Category', 'Item / Metric', 'Value / Severity', 'Context & Action Plan'];
    const rows: string[][] = [
      ...METRICS_SUMMARY.map((m) => [
        'KPI Metric',
        m.title,
        m.value,
        `${m.change} — ${m.description}`,
      ]),
      ...filteredDeptData.map((d) => [
        'Department Volume',
        d.department,
        `${d.sessions} Sessions`,
        `Assistance category (${timeRange} timeframe)`,
      ]),
      ...barriers.map((b) => [
        'Barrier Audit',
        b.facility,
        b.severity,
        `Issue: ${b.issue} | Action: ${b.suggestedAction} | Status: ${b.status}`,
      ]),
    ];

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `signbridge-accessibility-audit-${timeRange}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    announce('Accessibility CSV report generated and downloaded to device.');
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Filter department breakdown
  const filteredDeptData =
    selectedDept === 'all'
      ? DEPARTMENT_BREAKDOWN
      : DEPARTMENT_BREAKDOWN.filter((d) =>
          d.department.toLowerCase().includes(selectedDept.toLowerCase())
        );

  // Time multiplier for metrics display
  const getTimeMultiplier = () => {
    if (timeRange === '7d') return 5.8;
    if (timeRange === '30d') return 24.5;
    return 1;
  };

  const multiplier = getTimeMultiplier();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Synthetic Demo Disclaimer Banner */}
      <div className="p-3 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Synthetic Demonstration Data:</strong> All facility logs, interaction throughput,
            and compliance scores shown below are generated for interactive inspection.
          </span>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-200/80 text-[10px] font-bold uppercase tracking-wider text-amber-900 shrink-0">
          Demo Telemetry
        </span>
      </div>

      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-violet/15 via-brand-yellow/10 to-brand-coral/15 border border-brand-violet/25 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-violet shadow-sm mb-2">
            <Building className="w-3.5 h-3.5 text-brand-coral" />
            <span>Facility Compliance & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-charcoal font-display">
            Institution Accessibility Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            Real-time aggregate data on communication volume, barrier resolution,
            interpreter escalations, and auditory dependency audits across public facilities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-3 rounded-2xl bg-white border border-brand-violet/20 text-brand-violet text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-brand-violet/5 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-brand-violet" />
            <span>Log Auditory Barrier</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-5 py-3 rounded-2xl bg-brand-charcoal text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-brand-charcoal/90 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-brand-yellow" />
            <span>{downloadSuccess ? 'Downloaded CSV!' : 'Export CSV Audit'}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar: Department & Time Horizon */}
      <div className="p-4 rounded-2xl bg-white border border-brand-violet/15 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-charcoal">
            <Filter className="w-3.5 h-3.5 text-brand-violet" />
            <span>Department:</span>
          </div>
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              announce(`Filtered to ${e.target.value} department`);
            }}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold bg-brand-warmWhite focus:outline-none focus:ring-2 focus:ring-brand-violet"
          >
            <option value="all">All Departments (Aggregate)</option>
            <option value="Hospital">Hospital OPD & Triage</option>
            <option value="Railway">Railway Counters</option>
            <option value="Bank">Bank & KYC Desks</option>
            <option value="University">University Admin</option>
            <option value="Civic">Civic Govt Counters</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-charcoal">
            <Calendar className="w-3.5 h-3.5 text-brand-coral" />
            <span>Time Range:</span>
          </div>
          <div className="flex p-0.5 bg-gray-100 rounded-xl">
            {(['24h', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => {
                  setTimeRange(range);
                  announce(`Timeline updated to ${range}`);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  timeRange === range
                    ? 'bg-brand-violet text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-charcoal'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Top KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {METRICS_SUMMARY.map((metric, idx) => {
          let displayedValue = metric.value;
          if (timeRange !== '24h') {
            const rawNum = parseInt(metric.value.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(rawNum)) {
              displayedValue = Math.round(rawNum * multiplier).toLocaleString();
            }
          }

          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-brand-violet/15 shadow-sm hover:shadow-card-hover transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {metric.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {metric.change}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-brand-charcoal font-display">
                {displayedValue}
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CHARTS ROW 1: Hourly Traffic (Area Chart) + Communication Modes (Pie Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Hourly Traffic Area Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 gap-2">
            <div>
              <h3 className="text-lg font-black text-brand-charcoal font-display">
                Communication Traffic Throughput ({timeRange.toUpperCase()} Trend)
              </h3>
              <p className="text-xs text-gray-500">
                Hourly breakdown of Deaf-initiated sessions and Hearing-assisted responses.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewTableTraffic(!viewTableTraffic)}
                className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors"
              >
                {viewTableTraffic ? 'View Chart' : 'View as Table'}
              </button>
              <span className="px-3 py-1 rounded-full bg-brand-violet/10 text-brand-violet text-xs font-bold">
                Peak: 16:00
              </span>
            </div>
          </div>

          {viewTableTraffic ? (
            <div className="space-y-3 pt-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Text Summary:</strong> Traffic steadily increases from morning hours (83 sessions at 08:00) to a peak at 16:00 with 490 total sessions (260 Deaf sessions and 230 hearing-staff aided sessions), tapering off to 150 sessions by 20:00.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
                  <caption className="sr-only">Hourly Communication Traffic Throughput Table</caption>
                  <thead className="bg-gray-100 font-bold text-brand-charcoal">
                    <tr>
                      <th scope="col" className="p-2.5 border-b">Hour</th>
                      <th scope="col" className="p-2.5 border-b">Deaf Sessions</th>
                      <th scope="col" className="p-2.5 border-b">Hearing Staff Aided</th>
                      <th scope="col" className="p-2.5 border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {HOURLY_TRAFFIC_DATA.map((row) => (
                      <tr key={row.hour} className="hover:bg-gray-50">
                        <td className="p-2.5 font-bold">{row.hour}</td>
                        <td className="p-2.5 text-brand-violet font-semibold">{row.deafSessions}</td>
                        <td className="p-2.5 text-brand-mint-dark font-semibold">{row.hearingAided}</td>
                        <td className="p-2.5 font-bold">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HOURLY_TRAFFIC_DATA}>
                  <defs>
                    <linearGradient id="colorDeaf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7956E8" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#7956E8" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorHearing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#55C9B5" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#55C9B5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#24212D',
                      color: '#fff',
                      borderRadius: '16px',
                      border: 'none',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="deafSessions"
                    name="Deaf Sessions"
                    stroke="#7956E8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorDeaf)"
                  />
                  <Area
                    type="monotone"
                    dataKey="hearingAided"
                    name="Hearing Staff Aided"
                    stroke="#55C9B5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorHearing)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Communication Modes Donut Chart (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-lg font-black text-brand-charcoal font-display">
                Primary Mode Distribution
              </h3>
              <p className="text-xs text-gray-500">Method favored by visitors.</p>
            </div>
            <button
              onClick={() => setViewTableModes(!viewTableModes)}
              className="px-2.5 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors"
            >
              {viewTableModes ? 'Chart' : 'Table'}
            </button>
          </div>

          {viewTableModes ? (
            <div className="space-y-3 pt-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Text Summary:</strong> Two-Way Talk is the primary modality used in 54% of sessions, followed by QR Pass scan (24%), SignConnect visual library (14%), and HumanConnect video relay (8%).
              </p>
              <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
                <caption className="sr-only">Primary Mode Distribution Table</caption>
                <thead className="bg-gray-100 font-bold text-brand-charcoal">
                  <tr>
                    <th scope="col" className="p-2 border-b">Mode</th>
                    <th scope="col" className="p-2 border-b">Share (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MODE_DISTRIBUTION.map((m) => (
                    <tr key={m.name} className="hover:bg-gray-50">
                      <td className="p-2 font-semibold">{m.name}</td>
                      <td className="p-2 font-bold">{m.value}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MODE_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {MODE_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#24212D',
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Mode Legend */}
              <div className="space-y-2 text-xs">
                {MODE_DISTRIBUTION.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                      <span className="font-semibold text-brand-charcoal">{m.name}</span>
                    </div>
                    <span className="font-black text-gray-700">{m.value}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CHARTS ROW 2: Department Sessions (Bar Chart) & Unresolved Barriers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Department Volume Bar Chart (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-4">
          <div className="border-b pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-black text-brand-charcoal font-display">
                Interactions by Facility Department
              </h3>
              <p className="text-xs text-gray-500">Where Deaf visitors need assistance most.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewTableDepts(!viewTableDepts)}
                className="px-2.5 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors"
              >
                {viewTableDepts ? 'Chart' : 'Table'}
              </button>
              {selectedDept !== 'all' && (
                <span className="px-2 py-0.5 rounded-full bg-brand-violet/10 text-brand-violet text-xs font-bold">
                  {selectedDept}
                </span>
              )}
            </div>
          </div>

          {viewTableDepts ? (
            <div className="space-y-3 pt-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Text Summary:</strong> Hospital OPD & Triage accounts for the highest volume (8,450 sessions), followed by Railway Counters (6,210), Bank KYC Desks (4,890), University Admin (3,120), and Civic Government Counters (2,220).
              </p>
              <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
                <caption className="sr-only">Facility Interactions by Department Table</caption>
                <thead className="bg-gray-100 font-bold text-brand-charcoal">
                  <tr>
                    <th scope="col" className="p-2.5 border-b">Department</th>
                    <th scope="col" className="p-2.5 border-b">Recorded Sessions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDeptData.map((d) => (
                    <tr key={d.department} className="hover:bg-gray-50">
                      <td className="p-2.5 font-semibold">{d.department}</td>
                      <td className="p-2.5 font-bold text-brand-violet">{d.sessions.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredDeptData} layout="vertical">
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                  <YAxis dataKey="department" type="category" stroke="#94a3b8" width={130} fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#24212D',
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="sessions" radius={[0, 8, 8, 0]}>
                    {filteredDeptData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Unresolved Communication Barriers & Action Tracker (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-brand-violet/20 shadow-glass space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-lg font-black text-brand-charcoal font-display">
                Facility Barrier Audit & Actions
              </h3>
              <p className="text-xs text-gray-500">
                Auditory-only pitfalls reported by visitors requiring physical mitigation.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              {barriers.filter((b) => b.status !== 'Resolved').length} Active
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {barriers.map((bar) => (
              <div
                key={bar.id}
                className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-charcoal text-sm">{bar.facility}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      bar.severity === 'Urgent'
                        ? 'bg-red-100 text-red-700'
                        : bar.severity === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {bar.severity}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed">{bar.issue}</p>

                <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-gray-200/60">
                  <span className="text-[11px] text-brand-violet font-semibold">
                    💡 Action: {bar.suggestedAction}
                  </span>
                  <button
                    onClick={() => handleResolveBarrier(bar.id)}
                    className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all shrink-0 ${
                      bar.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-brand-charcoal text-white hover:bg-brand-charcoal/90'
                    }`}
                  >
                    {bar.status === 'Resolved' ? '✓ Resolved' : 'Mark Resolved'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Auditory Barrier Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-barrier-title"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-brand-violet/20">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brand-coral" />
                <h3 id="modal-barrier-title" className="text-lg font-black text-brand-charcoal font-display">
                  Log Auditory Communication Barrier
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleCreateBarrier} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1">
                  Facility Location / Counter
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. City General Hospital — Ultrasound Waiting Hall"
                  value={newFacility}
                  onChange={(e) => setNewFacility(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-violet"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-charcoal mb-1">
                  Observed Communication Obstacle
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the auditory barrier (e.g., token calls made only over loudspeaker without display)..."
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-violet"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">
                    Priority Severity
                  </label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-violet"
                  >
                    <option value="Urgent">Urgent (Immediate Hazard)</option>
                    <option value="High">High (Significant Delay)</option>
                    <option value="Medium">Medium (Inconvenience)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal mb-1">
                    Suggested Action
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Add SignBridge tablet"
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-violet"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-violet text-white text-xs font-bold hover:bg-brand-violet/90 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Barrier Audit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
