export type UserRole = 'professional' | 'client';

export type LanguageLevel = 'normal' | 'simple' | 'very_simple' | 'visual';

export type CareSector = 
  | 'VVT' // Verpleeghuis, Verzorging & Thuiszorg
  | 'GHZ' // Gehandicaptenzorg & LVB
  | 'GGZ' // Geestelijke Gezondheidszorg
  | 'Sociaal' // Sociaal Domein & Wijkteams
  | 'Forensisch';

export type HealthcareDomain = 
  | 'GGZ'
  | 'LVB'
  | 'Autisme'
  | 'Gehandicaptenzorg'
  | 'Sociaal Domein'
  | 'De-escalatie'
  | 'Communicatie'
  | 'Psychiatrie'
  | 'Veiligheid'
  | 'Emotieregulatie'
  | 'Somatiek'
  | 'Acute Zorg';

export type UrgencyLevel = 
  | 'U1' // Acuut levensgevaar: direct 112 / reanimatieteam
  | 'U2' // Spoed: binnen 1 uur arts ter plaatse
  | 'U3' // Dringend: binnen enkele uren beoordeling arts
  | 'U4' // Routine: volgende werkdag / eigen arts
  | 'U5'; // Zelfzorg / monitoren & verpleegkundig beleid

export interface VitalParameters {
  systolicBP?: number;
  diastolicBP?: number;
  heartRate?: number;
  oxygenSaturation?: number;
  temperature?: number;
  bloodGlucose?: number;
  respiratoryRate?: number;
  avpu?: 'A' | 'V' | 'P' | 'U'; // Alert, Voice, Pain, Unresponsive
  painScore?: number; // 0-10
}

export interface AbcdeStep {
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
  title: string;
  focus: string;
  checks: string[];
  redFlags: string[];
  immediateInterventions: string[];
}

export interface ClinicalGuidelineSource {
  title: string;
  organization: 'NHG' | 'V&VN' | 'Vilans KICK' | 'NVAVG' | 'NTS' | 'Richtlijnendatabase';
  url?: string;
  summary: string;
  lastUpdated: string;
}

export interface SomaticTriageTopic {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  primaryUrgency: UrgencyLevel;
  commonInSectors: CareSector[];
  typicalSymptoms: string[];
  triageQuestions: {
    question: string;
    description?: string;
    options: {
      text: string;
      urgency: UrgencyLevel;
      actionSnippet: string;
      isRedFlag?: boolean;
    }[];
  }[];
  criticalRedFlags: string[];
  guidelines: ClinicalGuidelineSource[];
  sbarTemplate: {
    situation: string;
    background: string;
    assessment: string;
    recommendation: string;
  };
}

export interface Signal {
  id: string;
  label: string;
  category: 'lichamelijk' | 'gedrag' | 'communicatie' | 'omgeving';
  description?: string;
  iconName?: string;
}

export interface ActionGuideline {
  title: string;
  description: string;
  priority: 'direct' | 'belangrijk' | 'overwegen';
  category: 'prikkelregulatie' | 'communicatie' | 'ruimte' | 'veiligheid';
  icon?: string;
}

export interface EscalationCriteria {
  whenToConsult: string[];
  whenToEscalateEmergency: string[];
  contactAdvice: string;
}

export interface Situation {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  domains: HealthcareDomain[];
  icon: string;
  color: string;
  urgencyLevel: 'laag' | 'gemiddeld' | 'hoog' | 'acuut';
  signals: Signal[];
  hypotheses: {
    title: string;
    explanation: string;
    likelihoodNote: string;
  }[];
  influencingFactors: {
    factor: string;
    explanation: string;
  }[];
  dos: ActionGuideline[];
  donts: {
    title: string;
    warning: string;
    whyNot: string;
  }[];
  whyItWorks: {
    concept: string;
    explanation: string;
    scientificBasis: string;
  };
  escalation: EscalationCriteria;
  recommendedCaseId?: string;
  clientVersion: {
    simpleTitle: string;
    simpleDescription: string;
    pictogram: string;
    whatIFeel: string[];
    whatHelpsMe: string[];
    whatOthersShouldDo: string[];
  };
}

export interface CaseOption {
  id: string;
  text: string;
  isRecommended: boolean;
  feedbackTitle: string;
  feedbackReason: string;
  xpReward: number;
  effectOnTension: 'daalt' | 'stijgt' | 'gelijk';
}

export interface CaseStudy {
  id: string;
  title: string;
  domain: HealthcareDomain;
  targetGroup: string;
  context: string;
  vignette: string;
  options: CaseOption[];
  learningObjective: string;
  deepDiveNote: string;
  urgencyLevel?: UrgencyLevel;
  guidelineReference?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: HealthcareDomain;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  domain: HealthcareDomain;
  xpReward: number;
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: HealthcareDomain;
  requiredXpOrAction: string;
  unlockedAt?: string;
}

export interface SignalingPhase {
  feelingsAndThoughts: string[];
  visibleBehaviors: string[];
  physicalSensations: string[];
  whatHelps: string[];
  whatDoesNotHelp: string[];
  whoToContact?: string;
}

export interface SignalingPlan {
  id: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  greenPhase: SignalingPhase;
  orangePhase: SignalingPhase;
  redPhase: SignalingPhase;
  emergencyContacts: {
    name: string;
    role: string;
    phone: string;
  }[];
}

export interface SbarReport {
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  vitalsSummary?: string;
  urgency: UrgencyLevel;
  generatedAt: string;
}

export interface SoapReport {
  subjective: string;
  objective: string;
  analysis: string;
  plan: string;
  generatedAt: string;
}

export interface UserProgressState {
  xp: number;
  level: number;
  levelTitle: string;
  completedSituations: string[];
  completedCases: string[];
  completedQuizzes: string[];
  unlockedBadgeIds: string[];
  streakDays: number;
  dailyChallengeCompleted: boolean;
  activeSector: CareSector;
  domainProficiency: Record<HealthcareDomain, number>;
  recentActivity: {
    id: string;
    type: 'situation' | 'case' | 'quiz' | 'signaling' | 'triage';
    title: string;
    timestamp: string;
    xpEarned: number;
  }[];
}

