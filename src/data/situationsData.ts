import type { EnvironmentType } from '../types';

export interface SituationWorkflow {
  id: string;
  environment: EnvironmentType;
  title: string;
  summary: string;
  badge: string;
  vocabulary: { term: string; signDescription: string; plainMeaning: string }[];
  dialoguePairs: { staffPrompt: string; userResponses: string[] }[];
  urgentPhrases: string[];
  tipsForStaff: string[];
}

export const DETAILED_SITUATIONS: Record<EnvironmentType, SituationWorkflow> = {
  hospital: {
    id: 'hospital-detailed',
    environment: 'hospital',
    title: 'Hospital OPD & Trauma Triage',
    summary: 'Direct visual healthcare communication for doctors, triage nurses, lab technicians, and pharmacists.',
    badge: 'Zero Misunderstanding Triage',
    vocabulary: [
      {
        term: 'Triage / Priority',
        signDescription: 'Hand levels indicating 1 (urgent red), 2 (yellow), 3 (green)',
        plainMeaning: 'Sorting patients based on medical urgency rather than arrival time.'
      },
      {
        term: 'X-Ray / MRI Scan',
        signDescription: 'Flat hands framing chest or circular head scan motion',
        plainMeaning: 'Internal diagnostic imaging where loud audio instructions cannot be heard.'
      },
      {
        term: 'Fasting / NPO',
        signDescription: 'Finger crossing lips then touching stomach (no food/water)',
        plainMeaning: 'Must not eat or drink anything before blood tests or surgery.'
      },
      {
        term: 'Dosage: 1 morning / 1 night',
        signDescription: 'Finger taps sun (morning) then moon (night)',
        plainMeaning: 'Take one tablet after breakfast and one after dinner.'
      }
    ],
    dialoguePairs: [
      {
        staffPrompt: 'Where is the pain located and how long have you had it?',
        userResponses: [
          'It is a sharp chest pain that started 2 hours ago.',
          'It is a constant dull stomach ache since yesterday evening.',
          'Severe migraine headache that makes light painful.'
        ]
      },
      {
        staffPrompt: 'Do you take any regular blood pressure or diabetes medication?',
        userResponses: [
          'Yes, I take blood pressure medicine daily. Here is my prescription.',
          'No regular prescription medicines.',
          'I take insulin injections twice daily.'
        ]
      },
      {
        staffPrompt: 'Please lie down on the examination table for an ultrasound.',
        userResponses: [
          'Understood. Please tap my shoulder when I need to hold my breath.',
          'Is it okay if my family member stays in the room with me?'
        ]
      }
    ],
    urgentPhrases: [
      'I am experiencing severe chest pressure and dizziness.',
      'I cannot hear alarms or door knocks; please flash the room light.',
      'I am allergic to penicillin and sulfa drugs.'
    ],
    tipsForStaff: [
      'Face the patient directly in well-lit areas; do not talk while writing or facing away.',
      'Do not speak louder; volume does not assist Deaf individuals. Use text or sign visuals.',
      'When calling names, use optical screen flashes or visual token displays.'
    ]
  },
  railway: {
    id: 'railway-detailed',
    environment: 'railway',
    title: 'Railway Terminal & Metro Transit',
    summary: 'Soundless transit navigation replacing sudden auditory platform announcements and ticket counters.',
    badge: 'Auditory-Independent Transit',
    vocabulary: [
      {
        term: 'Platform Change',
        signDescription: 'Two fingers pointing left then switching sharply to right',
        plainMeaning: 'Train has been shifted to a different track with zero audio warning.'
      },
      {
        term: 'PNR / Booking Status',
        signDescription: 'Index finger tapping paper slip or phone screen',
        plainMeaning: 'Passenger Name Record booking reference for coach & berth number.'
      },
      {
        term: 'Divyang / Accessible Coach',
        signDescription: 'Wheelchair hand motion followed by train coach sign',
        plainMeaning: 'Specially designated compartment with widened doors and lower berths.'
      },
      {
        term: 'Luggage Cloakroom',
        signDescription: 'Two hands carrying heavy bag, tapping lock symbol',
        plainMeaning: 'Secure station holding area to leave baggage for hours.'
      }
    ],
    dialoguePairs: [
      {
        staffPrompt: 'Which train number or destination are you traveling to?',
        userResponses: [
          'Train 12626 New Delhi Superfast Express.',
          'I need the next suburban train to Central Junction.',
          'I need to cancel this ticket and get a refund.'
        ]
      },
      {
        staffPrompt: 'Do you have your senior citizen or disability concession certificate?',
        userResponses: [
          'Yes, here is my original Unique Disability ID (UDID) railway pass.',
          'I paid regular full fare; no concession requested.'
        ]
      },
      {
        staffPrompt: 'The train is delayed by 45 minutes and arrives on Platform 4.',
        userResponses: [
          'Thank you for writing that down. Where is the ramp to Platform 4?',
          'Will the battery buggy escort be available at Platform 4?'
        ]
      }
    ],
    urgentPhrases: [
      'The PA speaker announced something urgently, what did it say?',
      'Has my train departed already or is it delayed?',
      'I need immediate assistance to board the accessible coach.'
    ],
    tipsForStaff: [
      'Never rely solely on public address speakers for platform alterations.',
      'Write down platform numbers and delays on paper or the station counter tablet.',
      'Guide deaf passengers with clear directional hand gestures to ramps and elevators.'
    ]
  },
  college: {
    id: 'college-detailed',
    environment: 'college',
    title: 'Colleges & Academic Universities',
    summary: 'Equal academic participation for lectures, registrar administration, science labs, and exams.',
    badge: 'Academic Equity Suite',
    vocabulary: [
      {
        term: 'CART / Live Captions',
        signDescription: 'Fingers typing on keyboard with eyes moving across screen',
        plainMeaning: 'Real-time text transcription displayed simultaneously during lectures.'
      },
      {
        term: 'Semester Fee Clearance',
        signDescription: 'Currency sign followed by rubber stamp gesture',
        plainMeaning: 'Official financial endorsement required before hall ticket issuance.'
      },
      {
        term: 'Exam Accommodation',
        signDescription: 'Clock sign + extra time gesture (30 mins per hour)',
        plainMeaning: 'Approved compensatory time and separate quiet room with visual timers.'
      },
      {
        term: 'Lab Safety Beacon',
        signDescription: 'Flashing light with safety glasses hand shape',
        plainMeaning: 'Emergency visual strobe indicating chemical spill or fire alarm.'
      }
    ],
    dialoguePairs: [
      {
        staffPrompt: 'Are you here for semester course registration or fee receipt?',
        userResponses: [
          'I am here to register for Computer Science semester 4 electives.',
          'I need my official stamped academic fee receipt.',
          'I need to submit my disability accommodation renewal form.'
        ]
      },
      {
        staffPrompt: 'Have you met the department advisor for lab allotment?',
        userResponses: [
          'Yes, Professor Sharma approved my laboratory workbench in Row 1.',
          'Not yet. Where is the department advisor office located?'
        ]
      }
    ],
    urgentPhrases: [
      'The fire alarm is sounding silently; where is the accessible emergency exit?',
      'I need the professor lecture slides and audio transcript for today lecture.',
      'I require an educational sign interpreter for my viva examination tomorrow.'
    ],
    tipsForStaff: [
      'Ensure the instructor does not turn their back while lecturing or explaining the board.',
      'Provide digital lecture handouts in advance of laboratory practicals.',
      'Assign front-row seating with clear line of sight to interpreters and screens.'
    ]
  },
  bank: {
    id: 'bank-detailed',
    environment: 'bank',
    title: 'Banks & Financial Desks',
    summary: 'Discreet, secure, and private banking for cash deposits, KYC verification, and loans.',
    badge: 'Confidential Visual Banking',
    vocabulary: [
      {
        term: 'Biometrics KYC',
        signDescription: 'Thumb pressed firmly onto glass reader surface',
        plainMeaning: 'Fingerprint or iris scan to verify customer legal identity.'
      },
      {
        term: 'PIN / Secret Code',
        signDescription: 'Hand shielding keypad with finger entering 4 digits',
        plainMeaning: 'Private password that staff must NEVER ask the customer to say out loud.'
      },
      {
        term: 'Fixed Deposit (FD)',
        signDescription: 'Fist locked onto palm for a set time horizon',
        plainMeaning: 'Term investment yielding guaranteed interest over months/years.'
      },
      {
        term: 'Cheque Clearance',
        signDescription: 'Signing paper rectangle then sliding under window',
        plainMeaning: 'Transferring funds from paper instrument into recipient account.'
      }
    ],
    dialoguePairs: [
      {
        staffPrompt: 'What banking service do you need today?',
        userResponses: [
          'I want to withdraw cash from my savings account.',
          'I need to complete my biometric KYC verification.',
          'My debit card was swallowed by the ATM machine outside.'
        ]
      },
      {
        staffPrompt: 'Please enter your account number or insert debit card.',
        userResponses: [
          'Here is my passbook with account number clearly printed.',
          'I have inserted my chip card into the terminal.'
        ]
      }
    ],
    urgentPhrases: [
      'Please do not broadcast my financial details over desk speaker.',
      'My card was stolen; please freeze my account immediately.',
      'Show me the screen confirming the transaction amount before submitting.'
    ],
    tipsForStaff: [
      'Never ask a deaf customer to vocalize their account balance or PIN code.',
      'Turn the customer-facing display so they can review numbers before executing.',
      'Use written confirmation slips for every withdrawal and deposit.'
    ]
  },
  government: {
    id: 'government-detailed',
    environment: 'government',
    title: 'Government & Civic Registrar',
    summary: 'Dignified civic empowerment for disability ID renewal, pensions, certificates, and affidavits.',
    badge: 'Universal Civic Empowerment',
    vocabulary: [
      {
        term: 'UDID Card',
        signDescription: 'Card sign with national seal and disability ribbon symbol',
        plainMeaning: 'Unique Disability Identity Card issued by the central ministry.'
      },
      {
        term: 'Attestation / Notary',
        signDescription: 'Hand stamping official round seal with signature flourish',
        plainMeaning: 'Legal verification by gazetted officer that document is genuine.'
      },
      {
        term: 'Civic Grievance',
        signDescription: 'Formal complaint letter handed over with tracking receipt',
        plainMeaning: 'Official dispute redressal for delayed public services.'
      },
      {
        term: 'Prorated Pension',
        signDescription: 'Monthly calendar page flip with direct bank credit sign',
        plainMeaning: 'Monthly state welfare deposit for eligible citizens.'
      }
    ],
    dialoguePairs: [
      {
        staffPrompt: 'Which civic scheme or certificate application are you filing?',
        userResponses: [
          'Renewal application for my national disability UDID identity card.',
          'Submission of annual life certificate for my welfare pension.',
          'Municipal address update on voter electoral roll.'
        ]
      },
      {
        staffPrompt: 'Do you have your medical board assessment certificate copy?',
        userResponses: [
          'Yes, certified copy from the district hospital medical superintendent is attached.',
          'I have the digital QR-verified PDF on my phone.'
        ]
      }
    ],
    urgentPhrases: [
      'Can you write down the exact list of missing documents on paper?',
      'I have waited 3 hours because the counter token audio call was not displayed on screen.',
      'I request a hearing officer who understands written legal petitions.'
    ],
    tipsForStaff: [
      'Provide visual token screens with large bold font visible from waiting chairs.',
      'Accept digital verified PDFs from DigiLocker / national storage portals.',
      'Provide clear written receipts with official tracking numbers.'
    ]
  }
};
