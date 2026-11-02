/**
 * PassService Interface & Demo Implementation
 * Privacy-First: No sensitive health data in QR code payload.
 * Local-only storage with explicit consent.
 */

import type { UserPassProfile } from '../types';

export interface IPassService {
  getProfile(): UserPassProfile;
  saveProfile(profile: UserPassProfile): void;
  deletePass(): void;
  generateSafeQRPayload(profile: UserPassProfile): string;
}

export class DemoPassService implements IPassService {
  public readonly isDemo = true;
  public readonly storageKey = 'sb_saved_qr_profile';

  getProfile(): UserPassProfile {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // Fallback
      }
    }
    return {
      name: 'Accessibility Visitor',
      primaryMode: 'sign-language',
      preferredLanguage: 'English',
      signDialect: 'ISL',
      fontSize: 'large',
      highContrast: false,
      emergencyContactName: '',
      emergencyContactPhone: '',
      medicalNotes: '',
      frequentPhrases: [
        'I am Deaf, please communicate in writing or sign.',
        'Please look at me directly when speaking so I can lip-read.',
        'I need an Indian Sign Language (ISL) interpreter if possible.',
      ],
      shareEmergencyContact: false,
      shareMedicalNotes: false,
    };
  }

  saveProfile(profile: UserPassProfile): void {
    localStorage.setItem(this.storageKey, JSON.stringify(profile));
  }

  deletePass(): void {
    localStorage.removeItem(this.storageKey);
  }

  generateSafeQRPayload(profile: UserPassProfile): string {
    // Strictly non-sensitive accessibility payload (zero medical/phone data)
    return JSON.stringify({
      app: 'SignBridge 360',
      v: '2.4',
      mode: profile.primaryMode,
      lang: profile.preferredLanguage,
      dialect: profile.signDialect,
      phrases: profile.frequentPhrases.slice(0, 3),
      instructions: 'Please provide visual interaction and paper/tablet typing.',
    });
  }
}

export const passService = new DemoPassService();
