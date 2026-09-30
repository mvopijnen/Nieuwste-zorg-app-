import React, { useState } from 'react';
import { 
  Stethoscope,
  Activity,
  ZapOff,
  FileText,
  Search,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Situation, UserProgressState, CaseStudy, CareSector } from '../../types';
import { CASE_STUDIES } from '../../data/cases';
import { SOMATIC_TRIAGE_TOPICS } from '../../data/somaticTriage';

interface HomeDashboardProps {
  onNavigateTab: (tab: string) => void;
  onSelectSituation: (situation: Situation) => void;
  onSelectCase: (caseStudy: CaseStudy) => void;
  onOpenAiAssistant: () => void;
  onRoleToggle: (role: 'professional' | 'client') => void;
  progress: UserProgressState;
  activeSector: CareSector;
  onSectorChange: (sector: CareSector) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigateTab,
  onSelectCase,
  onOpenAiAssistant,
  activeSector,
  onSectorChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sectors: { id: CareSector; label: string }[] = [
    { id: 'GHZ', label: 'GHZ / LVB' },
    { id: 'GGZ', label: 'GGZ' },
    { id: 'VVT', label: 'VVT & Thuiszorg' },
    { id: 'Sociaal', label: 'Sociaal Domein' },
    { id: 'Forensisch', label: 'Forensisch' }
  ];

  // Core 4 Pillars with unified blue styling
  const corePillars = [
    {
      id: 'triage',
      title: 'Symptomen & Triage',
      description: 'Systematisch uitvragen bij benauwdheid, koorts, buikpijn of delier met NTS-urgentiebepaling.',
      icon: Stethoscope,
      action: () => onNavigateTab('triage'),
      linkText: 'Start triage'
    },
    {
      id: 'abcde',
      title: 'ABCDE & Meetwaarden',
      description: 'Bloeddruk, pols, saturatie, ademhaling en temperatuur met automatische EWS-score.',
      icon: Activity,
      action: () => onNavigateTab('abcde'),
      linkText: 'Naar meetwaarden'
    },
    {
      id: 'situations',
      title: 'Gedrag & De-escalatie',
      description: 'Handelingsperspectief bij overprikkeling, oplopende spanning, stemmen horen en zorgweigering.',
      icon: ZapOff,
      action: () => onNavigateTab('situations'),
      linkText: 'Bekijk situaties'
    },
    {
      id: 'reporting',
      title: 'SBAR & Overdracht',
      description: 'Medisch gestructureerde overdracht conform SBAR voor artsenoverleg of SOAP voor het ECD.',
      icon: FileText,
      action: () => onNavigateTab('reporting'),
      linkText: 'Stel overdracht op'
    }
  ];

  const featuredTopics = SOMATIC_TRIAGE_TOPICS.slice(0, 3);
  const activeCase = CASE_STUDIES[0];

  return (
    <div className="space-y-6">
      
      {/* 1. Hoofdkaart: Rust, overzicht en werkveldkeuze */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        
        {/* Werkveld selector - Rustig gesegmenteerd in blauwtinten */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold text-slate-700">
              Geselecteerd werkveld:
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {sectors.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSectorChange(s.id)}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeSector === s.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Introductie & Snelle Zoekactie */}
        <div className="mt-5 space-y-4">
          <div className="max-w-2xl">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display tracking-tight">
              Wat speelt er bij de cliënt?
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
              Direct klinisch handelingsperspectief, somatische beslisbomen en de-escalatie voor de dagelijkse zorgpraktijk.
            </p>
          </div>

          {/* Rustige, centrale zoek- en actiebalk */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onNavigateTab('triage');
                    }
                  }}
                  placeholder="Zoek op klacht of gedrag (bijv. benauwdheid, koorts, buikpijn, onrust)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <button
                onClick={() => onNavigateTab('triage')}
                className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shrink-0"
              >
                Zoek in protocollen
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="py-2.5 px-3.5 bg-blue-50 hover:bg-blue-100/80 text-blue-700 border border-blue-200/80 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                title="Vraag de AI Zorgcoach"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">AI Zorgcoach</span>
              </button>
            </div>

            {/* Directe rustige snelkoppelingen */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
              <span className="text-slate-400">Direct naar:</span>
              <button 
                onClick={() => onNavigateTab('abcde')}
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                ABCDE Spoedprotocol
              </button>
              <span className="text-slate-300">·</span>
              <button 
                onClick={() => onNavigateTab('vitals')}
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                Vitale meetwaarden
              </button>
              <span className="text-slate-300">·</span>
              <button 
                onClick={() => onNavigateTab('reporting')}
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
              >
                SBAR Artsenoverdracht
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 2. De 4 Hoofddomeinen: Uniform, rustig en overzichtelijk in blauwtinten */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {corePillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              onClick={pillar.action}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display group-hover:text-blue-700 transition-colors">
                  {pillar.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-800">
                <span>{pillar.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Veelvoorkomende somatische beslisbomen voor het gekozen werkveld */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              Veelvoorkomende klachten in {activeSector}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Directe klinische uitvraag volgens NHG en V&VN richtlijnen
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('triage')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            Alle klachten bekijken →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {featuredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onNavigateTab('triage')}
              className="p-4 bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-200 rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-900 group-hover:text-blue-700">
                  {topic.title}
                </span>
                <span className="text-[10px] text-slate-500 font-medium bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {topic.primaryUrgency}
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {topic.shortDescription}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-blue-600">
                <span>Start beslisboom</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Casustraining & Richtlijnen: Kalm, educatief en betrouwbaar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Casus training (Sereen blauw, geen donkere game-esthetiek) */}
        <div className="lg:col-span-2 bg-blue-50/50 rounded-2xl p-5 sm:p-6 border border-blue-200/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-800">
                Klinische Oefencasus
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">
                {activeCase.domain}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              {activeCase.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-xl">
              {activeCase.context} — {activeCase.learningObjective}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Oefen met 4 keuzes en directe theoriekoppeling.
            </span>
            <button
              onClick={() => onSelectCase(activeCase)}
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Casus openen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Kwaliteitsborging & Richtlijnen */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Gevalideerde Zorgstandaarden</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alle adviezen en beslisbomen sluiten aan bij:
            </p>
            <ul className="mt-2 text-xs text-slate-700 space-y-1 list-disc pl-4">
              <li>NHG-Standaarden (Dyspneu, Pijn, ACS)</li>
              <li>V&VN Handreikingen & KICK-protocollen</li>
              <li>NVAVG (Gezondheid bij LVB)</li>
              <li>Nederlandse Triage Standaard (NTS)</li>
            </ul>
          </div>

          <button
            onClick={() => onNavigateTab('sources')}
            className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Bekijk richtlijnen & bronnen</span>
          </button>
        </div>

      </div>

    </div>
  );
};
