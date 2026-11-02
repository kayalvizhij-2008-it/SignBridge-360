/**
 * InterpreterService Interface & Demo Implementation
 * Clearly labelled as a demonstration service.
 */

export interface InterpreterRequest {
  dialect: 'ISL' | 'ASL' | 'BSL';
  situation: 'medical' | 'transit' | 'legal' | 'general' | 'banking';
  notes?: string;
}

export interface InterpreterSession {
  id: string;
  isDemo: true;
  status: 'requesting' | 'matching' | 'connected' | 'ended';
  interpreterName: string;
  credentials: string;
  dialect: 'ISL' | 'ASL' | 'BSL';
  startedAt: string;
}

export interface IInterpreterService {
  requestInterpreter(req: InterpreterRequest): Promise<InterpreterSession>;
  endSession(sessionId: string): Promise<void>;
  getSessionStatus(sessionId: string): Promise<InterpreterSession['status']>;
}

export class DemoInterpreterService implements IInterpreterService {
  public readonly isDemo = true;
  public readonly demoNotice = 'Demo VRS Service: Simulated demonstration video call environment';

  async requestInterpreter(req: InterpreterRequest): Promise<InterpreterSession> {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      id: `vrs-demo-${Date.now()}`,
      isDemo: true,
      status: 'connected',
      interpreterName: req.dialect === 'ISL' ? 'Priya Sharma (ISL Certified)' : req.dialect === 'ASL' ? 'David Chen (RID Certified)' : 'Emma Watson (BSL Level 6)',
      credentials: req.dialect === 'ISL' ? 'RCI Reg. Certified ISL Interpreter' : req.dialect === 'ASL' ? 'Registry of Interpreters for the Deaf (RID)' : 'Signature BSL Level 6 Accredited',
      dialect: req.dialect,
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  async endSession(_sessionId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  async getSessionStatus(_sessionId: string): Promise<InterpreterSession['status']> {
    return 'connected';
  }
}

export const interpreterService = new DemoInterpreterService();
