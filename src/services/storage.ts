import { SignalingPlan, UserProgressState, UserRole, LanguageLevel, HealthcareDomain } from '../types';

const PROGRESS_STORAGE_KEY = 'praktijkkompas_user_progress_v1';
const ROLE_STORAGE_KEY = 'praktijkkompas_user_role_v1';
const LANG_LEVEL_KEY = 'praktijkkompas_lang_level_v1';
const SIGNALING_PLAN_KEY = 'praktijkkompas_signaling_plan_v1';
const ONBOARDING_KEY = 'praktijkkompas_onboarding_done_v1';

export const LEVEL_TIERS = [
  { level: 1, minXp: 0, title: 'Startend Begeleider' },
  { level: 2, minXp: 100, title: 'Oplettend Waarnemer' },
  { level: 3, minXp: 250, title: 'De-escalatie Specialist' },
  { level: 4, minXp: 450, title: 'Senior Praktijkcoach' },
  { level: 5, minXp: 750, title: 'Rots in de Branding' }
];

export const INITIAL_PROGRESS: UserProgressState = {
  xp: 80,
  level: 1,
  levelTitle: 'Startend Begeleider',
  completedSituations: [],
  completedCases: [],
  completedQuizzes: [],
  unlockedBadgeIds: ['badge-lvb-basis'],
  streakDays: 3,
  dailyChallengeCompleted: false,
  activeSector: 'GHZ',
  domainProficiency: {
    'LVB': 45,
    'Autisme': 35,
    'De-escalatie': 60,
    'GGZ': 40,
    'Communicatie': 50,
    'Psychiatrie': 30,
    'Gehandicaptenzorg': 40,
    'Sociaal Domein': 35,
    'Veiligheid': 50,
    'Emotieregulatie': 45,
    'Somatiek': 50,
    'Acute Zorg': 55
  },
  recentActivity: [
    {
      id: 'act-1',
      type: 'situation',
      title: 'Verkende situatie: Overprikkeling',
      timestamp: 'Vanochtend',
      xpEarned: 25
    },
    {
      id: 'act-2',
      type: 'case',
      title: 'Casus Sam (LVB & Prikkels)',
      timestamp: 'Gisteren',
      xpEarned: 50
    }
  ]
};

export const DEFAULT_SIGNALING_PLAN: SignalingPlan = {
  id: 'plan-default',
  clientName: 'Samir / Eigen Voorbeeld',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  greenPhase: {
    feelingsAndThoughts: ['Ik voel me rustig en ontspannen', 'Ik maak makkelijk een praatje', 'Ik heb zin in mijn dagbesteding'],
    visibleBehaviors: ['Lacht en maakt grapjes', 'Houdt zich goed aan zijn dagritme', 'Kijkt mensen vriendelijk aan'],
    physicalSensations: ['Ademhaling is rustig', 'Geen spierpijn of spanning in de nek', 'Slaapt 7-8 uur per nacht'],
    whatHelps: ['Duidelijke dagplanning op het bord', 'Positief complimentje geven', 'Muziek luisteren tijdens het koken'],
    whatDoesNotHelp: ['Plotselinge programmawijzigingen zonder overleg'],
    whoToContact: 'Begeleider van dienst'
  },
  orangePhase: {
    feelingsAndThoughts: ['Het wordt me te veel', 'Iedereen zeurt tegen me', 'Mijn hoofd voelt warm en vol'],
    visibleBehaviors: ['Begint te ijsberen door de gang', 'Praat sneller en harder', 'Reageert kortaf of zucht luid'],
    physicalSensations: ['Hart klopt sneller', 'Gebalde vuisten in broekzak', 'Kaken op elkaar geklemd'],
    whatHelps: ['Koptelefoon op met rustgevende muziek', 'Even naar buiten lopen voor frisse lucht', 'Begeleider die rustig vraagt: "Zullen we even thee drinken?"'],
    whatDoesNotHelp: ['Veel vragen tegelijk stellen', 'Dicht op de huid zitten of corrigeren op toon'],
    whoToContact: 'Persoonlijk begeleider / dienstdoende collega'
  },
  redPhase: {
    feelingsAndThoughts: ['Niemand begrijpt me', 'Ik wil alles kapotslaan', 'Ik kan niet meer nadenken'],
    visibleBehaviors: ['Schreeuwt scheldwoorden', 'Gooit met stoelen of deuren', 'Sluit zich op in toilet of kamer'],
    physicalSensations: ['Hoge adrenaline, voelt geen fysieke pijn meer', 'Kokervisie / tunnelvisie'],
    whatHelps: ['Fysieke afstand houden (minimaal 3 meter)', 'Alleen korte kernzinnen fluisteren: "Ik ben hier, je bent veilig"', 'Wachten tot de storm zakt zonder aanraking'],
    whatDoesNotHelp: ['Fysiek proberen vast te houden', 'In discussie gaan over de regels', 'Schreeuwen of tegenstand bieden'],
    whoToContact: 'Directe achterwacht / Gedragsdeskundige / Arts'
  },
  emergencyContacts: [
    { name: 'Kantoor Begeleiding', role: 'Dienstdoende team', phone: '088 - 123 45 67' },
    { name: 'Gedragskundige Karin', role: 'Behandelcoördinator', phone: '06 - 987 65 43' },
    { name: 'Huisartsenpost / Crisisdienst', role: 'Bij acute nood', phone: '0900 - 123 123' }
  ]
};

export const StorageService = {
  getUserRole(): UserRole {
    const role = localStorage.getItem(ROLE_STORAGE_KEY);
    if (role === 'client') return 'student';
    if (role === 'student' || role === 'professional') return role;
    return 'professional';
  },

  setUserRole(role: UserRole): void {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
  },

  getLanguageLevel(): LanguageLevel {
    return (localStorage.getItem(LANG_LEVEL_KEY) as LanguageLevel) || 'normal';
  },

  setLanguageLevel(level: LanguageLevel): void {
    localStorage.setItem(LANG_LEVEL_KEY, level);
  },

  isOnboardingDone(): boolean {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  },

  setOnboardingDone(done: boolean): void {
    localStorage.setItem(ONBOARDING_KEY, done ? 'true' : 'false');
  },

  getProgress(): UserProgressState {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PROGRESS;
    }
  },

  saveProgress(progress: UserProgressState): void {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  },

  addXp(amount: number, reasonTitle: string, type: 'situation' | 'case' | 'quiz' | 'signaling', domain?: HealthcareDomain): UserProgressState {
    const current = this.getProgress();
    const newXp = current.xp + amount;
    
    // Calculate new level
    let currentTier = LEVEL_TIERS[0];
    for (const tier of LEVEL_TIERS) {
      if (newXp >= tier.minXp) {
        currentTier = tier;
      }
    }

    // Update domain proficiency if provided
    const newDomainProficiency = { ...current.domainProficiency };
    if (domain && newDomainProficiency[domain] !== undefined) {
      newDomainProficiency[domain] = Math.min(100, newDomainProficiency[domain] + Math.round(amount / 5));
    }

    // Auto-unlock badge conditions
    const unlockedBadges = [...current.unlockedBadgeIds];
    if (newXp >= 150 && !unlockedBadges.includes('badge-stress-regulatie')) {
      unlockedBadges.push('badge-stress-regulatie');
    }

    const updated: UserProgressState = {
      ...current,
      xp: newXp,
      level: currentTier.level,
      levelTitle: currentTier.title,
      unlockedBadgeIds: unlockedBadges,
      domainProficiency: newDomainProficiency,
      recentActivity: [
        {
          id: 'act-' + Date.now(),
          type,
          title: reasonTitle,
          timestamp: 'Zojuist',
          xpEarned: amount
        },
        ...current.recentActivity.slice(0, 5)
      ]
    };

    this.saveProgress(updated);
    return updated;
  },

  markSituationComplete(situationId: string, domain: HealthcareDomain): UserProgressState {
    const current = this.getProgress();
    if (!current.completedSituations.includes(situationId)) {
      current.completedSituations.push(situationId);
      if (situationId === 'overprikkeling' && !current.unlockedBadgeIds.includes('badge-prikkelprofessional')) {
        current.unlockedBadgeIds.push('badge-prikkelprofessional');
      }
      this.saveProgress(current);
      return this.addXp(30, `Situatie doorlopen: ${situationId}`, 'situation', domain);
    }
    return current;
  },

  markCaseComplete(caseId: string, domain: HealthcareDomain, xpGained: number): UserProgressState {
    const current = this.getProgress();
    if (!current.completedCases.includes(caseId)) {
      current.completedCases.push(caseId);
      if (!current.unlockedBadgeIds.includes('badge-deescalatie-meester')) {
        current.unlockedBadgeIds.push('badge-deescalatie-meester');
      }
      this.saveProgress(current);
      return this.addXp(xpGained, `Casus afgerond: ${caseId}`, 'case', domain);
    }
    return current;
  },

  markQuizComplete(quizId: string, domain: HealthcareDomain, xpGained: number): UserProgressState {
    const current = this.getProgress();
    if (!current.completedQuizzes.includes(quizId)) {
      current.completedQuizzes.push(quizId);
      if (!current.unlockedBadgeIds.includes('badge-autisme-inzicht')) {
        current.unlockedBadgeIds.push('badge-autisme-inzicht');
      }
      this.saveProgress(current);
      return this.addXp(xpGained, `Quiz behaald: ${quizId}`, 'quiz', domain);
    }
    return current;
  },

  getSignalingPlan(): SignalingPlan {
    const raw = localStorage.getItem(SIGNALING_PLAN_KEY);
    if (!raw) return DEFAULT_SIGNALING_PLAN;
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_SIGNALING_PLAN;
    }
  },

  saveSignalingPlan(plan: SignalingPlan): void {
    plan.updatedAt = new Date().toISOString();
    localStorage.setItem(SIGNALING_PLAN_KEY, JSON.stringify(plan));
  }
};
