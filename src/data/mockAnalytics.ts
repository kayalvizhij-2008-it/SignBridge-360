export const METRICS_SUMMARY = [
  {
    title: 'Total Accessible Sessions',
    value: '24,890',
    change: '+18.4% this month',
    isPositive: true,
    description: 'Autonomous barrier-free interactions across 62 facility counters.',
  },
  {
    title: 'Avg. Interaction Resolution',
    value: '2.4 mins',
    change: '-34% faster turnaround',
    isPositive: true,
    description: 'From deaf customer approach to final confirmation.',
  },
  {
    title: 'Certified Interpreter Calls',
    value: '1,420',
    change: '99.4% on-demand connection',
    isPositive: true,
    description: 'Emergency and medical sign video escalations.',
  },
  {
    title: 'Emergency SOS Activations',
    value: '48',
    change: '100% immediate response',
    isPositive: true,
    description: 'Rapid paramedic & security visual dispatch.',
  },
];

export const HOURLY_TRAFFIC_DATA = [
  { hour: '08:00', deafSessions: 45, hearingAided: 38, total: 83 },
  { hour: '10:00', deafSessions: 140, hearingAided: 125, total: 265 },
  { hour: '12:00', deafSessions: 220, hearingAided: 195, total: 415 },
  { hour: '14:00', deafSessions: 190, hearingAided: 170, total: 360 },
  { hour: '16:00', deafSessions: 260, hearingAided: 230, total: 490 },
  { hour: '18:00', deafSessions: 175, hearingAided: 155, total: 330 },
  { hour: '20:00', deafSessions: 80, hearingAided: 70, total: 150 },
];

export const DEPARTMENT_BREAKDOWN = [
  { department: 'Hospital OPD & Triage', sessions: 8450, color: '#FF8B70' },
  { department: 'Railway Counters', sessions: 6210, color: '#7956E8' },
  { department: 'Bank & KYC Desks', sessions: 4890, color: '#FFC857' },
  { department: 'University Admin', sessions: 3120, color: '#55C9B5' },
  { department: 'Civic Govt Counters', sessions: 2220, color: '#389B8A' },
];

export const MODE_DISTRIBUTION = [
  { name: 'Two-Way Talk', value: 54, color: '#7956E8' },
  { name: 'QR Pass Instant Scan', value: 24, color: '#55C9B5' },
  { name: 'SignConnect Visuals', value: 14, color: '#FF8B70' },
  { name: 'HumanConnect Video', value: 8, color: '#FFC857' },
];

export const UNRESOLVED_BARRIERS = [
  {
    id: 'bar-1',
    facility: 'Central Metro Terminal — Platform 4B',
    issue: 'Platform change announced exclusively via loud PA audio without synchronized LED visual feed.',
    severity: 'High',
    suggestedAction: 'Deploy SignBridge Real-Time Railway Marquee Sync to Station LED boards.',
    status: 'In Progress',
  },
  {
    id: 'bar-2',
    facility: 'City General Hospital — Radiology Triage',
    issue: 'Patient door call speaker had no flashing optical indicator for waiting deaf patients.',
    severity: 'Urgent',
    suggestedAction: 'Install SignBridge ScreenFlash visual token beacon outside X-Ray room 3.',
    status: 'Resolved',
  },
  {
    id: 'bar-3',
    facility: 'Federal Civic Registrar — Counter 9',
    issue: 'Staff clerk spoke with protective face mask without lowering or using digital speech-to-text.',
    severity: 'Medium',
    suggestedAction: 'Activated SignBridge Two-Way Talk tablet on receptionist desk.',
    status: 'Resolved',
  },
];
