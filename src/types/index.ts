export type AppPage =
  | 'landing'
  | 'dashboard'
  | 'talk'
  | 'situations'
  | 'signconnect'
  | 'signcheck'
  | 'emergency'
  | 'qrpass'
  | 'humanconnect'
  | 'visualguides'
  | 'queue'
  | 'offline'
  | 'institution';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'alert' | 'offline';
  title: string;
  message: string;
  durationMs?: number;
}

export type UserMode = 'deaf' | 'hearing';

export type FontSize = 'normal' | 'large' | 'extra-large';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export type EnvironmentType = 'hospital' | 'railway' | 'college' | 'bank' | 'government';

export interface EnvironmentInfo {
  id: EnvironmentType;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  quickPhrases: string[];
  commonQuestions: { q: string; a: string; signKey?: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'deaf' | 'hearing' | 'system';
  text: string;
  timestamp: string;
  language?: string;
  signId?: string;
  audioPlayed?: boolean;
}

export interface SignLibraryItem {
  id: string;
  title: string;
  category: 'everyday' | 'hospital' | 'emergency' | 'travel' | 'education' | 'banking';
  language: 'ISL' | 'ASL' | 'BSL';
  description: string;
  handshape: string;
  movement: string;
  expression: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Specialized';
  isFavorite?: boolean;
}

export interface EmergencyAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  urgent: boolean;
  ttsAnnouncement: string;
  instructions: string[];
}

export interface UserPassProfile {
  name: string;
  primaryMode: 'sign-language' | 'written-text' | 'lip-reading' | 'assisted-voice';
  preferredLanguage: string;
  signDialect: 'ISL' | 'ASL' | 'BSL';
  fontSize: FontSize;
  highContrast: boolean;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalNotes: string;
  frequentPhrases: string[];
  shareEmergencyContact: boolean;
  shareMedicalNotes: boolean;
}

export interface QueueItem {
  tokenNumber: string;
  serviceName: string;
  counterNumber: string;
  floorLevel: string;
  status: 'waiting' | 'calling' | 'in-progress' | 'completed';
  peopleAhead: number;
  estimatedMinutes: number;
  directions: string[];
}

export interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  description: string;
}

export interface VisualGuideStep {
  stepNumber: number;
  title: string;
  instruction: string;
  visualCue: string;
  iconName: string;
  tipsForDeafUser: string;
  tipsForHearingStaff: string;
}

export interface PublicServiceGuide {
  id: string;
  title: string;
  environment: EnvironmentType;
  summary: string;
  estimatedTime: string;
  requiredDocuments: string[];
  steps: VisualGuideStep[];
}
