/**
 * AnalyticsService Interface & Demo Implementation
 * Clearly labelled synthetic telemetry data for public facility compliance.
 */

import {
  METRICS_SUMMARY,
  HOURLY_TRAFFIC_DATA,
  DEPARTMENT_BREAKDOWN,
  MODE_DISTRIBUTION,
  UNRESOLVED_BARRIERS,
} from '../data/mockAnalytics';

export interface IAnalyticsService {
  isDemo: true;
  getSummary(timeRange: string): Promise<typeof METRICS_SUMMARY>;
  getTrafficData(timeRange: string): Promise<typeof HOURLY_TRAFFIC_DATA>;
  getDepartmentData(selectedDept: string): Promise<typeof DEPARTMENT_BREAKDOWN>;
  getModeDistribution(): Promise<typeof MODE_DISTRIBUTION>;
  getBarriers(): Promise<typeof UNRESOLVED_BARRIERS>;
  exportCSV(timeRange: string): string;
}

export class DemoAnalyticsService implements IAnalyticsService {
  public readonly isDemo = true;
  public readonly demoNotice = 'Synthetic Demonstration Telemetry: Aggregated mock compliance metrics';

  async getSummary(_timeRange: string) {
    return METRICS_SUMMARY;
  }

  async getTrafficData(_timeRange: string) {
    return HOURLY_TRAFFIC_DATA;
  }

  async getDepartmentData(selectedDept: string) {
    if (selectedDept === 'all') return DEPARTMENT_BREAKDOWN;
    return DEPARTMENT_BREAKDOWN.filter((d) =>
      d.department.toLowerCase().includes(selectedDept.toLowerCase())
    );
  }

  async getModeDistribution() {
    return MODE_DISTRIBUTION;
  }

  async getBarriers() {
    return UNRESOLVED_BARRIERS;
  }

  exportCSV(timeRange: string): string {
    const headers = ['Category', 'Item / Metric', 'Value', 'Details'];
    const rows = [
      ...METRICS_SUMMARY.map((m) => ['KPI Metric', m.title, m.value, m.description]),
      ...DEPARTMENT_BREAKDOWN.map((d) => [
        'Department Traffic',
        d.department,
        d.sessions.toString(),
        `Interactive Sessions (${timeRange})`,
      ]),
      ...UNRESOLVED_BARRIERS.map((b) => [
        'Barrier Audit',
        b.facility,
        b.severity,
        `Issue: ${b.issue} | Action: ${b.suggestedAction} | Status: ${b.status}`,
      ]),
    ];

    return [
      headers.join(','),
      ...rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')),
    ].join('\r\n');
  }
}

export const analyticsService = new DemoAnalyticsService();
