/**
 * QueueService Interface & Demo Implementation
 * Clearly labelled as a demonstration service.
 */

import type { QueueItem } from '../types';

export interface IQueueService {
  getActiveToken(): Promise<QueueItem>;
  generateNewToken(serviceName: string): Promise<QueueItem>;
  cancelToken(tokenNumber: string): Promise<void>;
}

export class DemoQueueService implements IQueueService {
  public readonly isDemo = true;
  public readonly demoNotice = 'Demo Queue System: Simulated soundless visual token navigator';

  private activeToken: QueueItem = {
    tokenNumber: 'H-104',
    serviceName: 'Hospital Triage & Consultation',
    counterNumber: 'Room 3B',
    floorLevel: 'Ground Floor, North Wing',
    status: 'waiting',
    peopleAhead: 2,
    estimatedMinutes: 6,
    directions: [
      'Enter Main Hospital Lobby through visual sliding gates',
      'Follow purple floor guide-lines toward Radiology & Triage',
      'Look for flashing optical beacon outside Consultation Room 3B',
    ],
  };

  async getActiveToken(): Promise<QueueItem> {
    return { ...this.activeToken };
  }

  async generateNewToken(serviceName: string): Promise<QueueItem> {
    const letters = ['A', 'B', 'H', 'R', 'K'];
    const randomPrefix = letters[Math.floor(Math.random() * letters.length)];
    const randomNum = Math.floor(Math.random() * 80) + 101;

    this.activeToken = {
      tokenNumber: `${randomPrefix}-${randomNum}`,
      serviceName,
      counterNumber: `Counter ${Math.floor(Math.random() * 6) + 1}`,
      floorLevel: 'Level 1, Accessible Civic Area',
      status: 'waiting',
      peopleAhead: Math.floor(Math.random() * 4) + 1,
      estimatedMinutes: Math.floor(Math.random() * 10) + 4,
      directions: [
        'Proceed to Central Service Concourse',
        'Check real-time optical visual LED board for token flashing',
        'Hold your SignBridge device to trigger turn alert on vibration',
      ],
    };

    return { ...this.activeToken };
  }

  async cancelToken(_tokenNumber: string): Promise<void> {
    this.activeToken.status = 'completed';
  }
}

export const queueService = new DemoQueueService();
