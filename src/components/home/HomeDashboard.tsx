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
  Sparkles
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

  // Core 4 Pillars with serene blue styling and generous spacing
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
    <div className="space-y-8 sm:space-y-10">
      
      {/* 1. Hoofdkaart: Royale vulling, zachte schaduw, geen harde randen */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)]">
        
        {/* Werkveld selector - Ruim opgezet en rustgevend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold text-slate-700">
              Geselecteerd werkveld:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {sectors.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSectorChange(s.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  activeSector === s.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Introductie & Snelle Zoekactie met royale witruimte */}
        <div className="space-y-5">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight leading-snug">
              Wat speelt er bij de cliënt?
            </h1>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Direct klinisch handelingsperspectief, somatische beslisbomen en de-escalatie voor de dagelijkse zorgpraktijk.
            </p>
          </div>

          {/* Rustige, randloze zoekbalk met zachte schaduw */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
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
                  className="w-full pl-11 pr-4 py-3 bg-slate-50/90 hover:bg-slate-100/70 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white shadow-xs transition-all"
                />
              </div>

              <button
                onClick={() => onNavigateTab('triage')}
                className="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                Zoek in protocollen
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="py-3 px-4 bg-blue-50 hover:bg-blue-100/70 text-blue-700 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                title="Vraag de AI Zorgcoach"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">AI Zorgcoach</span>
              </button>
            </div>

            {/* Directe rustige snelkoppelingen met meer ademruimte */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="text-slate-400 font-medium">Direct naar:</span>
              <button 
                onClick={() => onNavigateTab('abcde')}
                className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                ABCDE Spoedprotocol
              </button>
              <span className="text-slate-300">·</span>
              <button 
                onClick={() => onNavigateTab('vitals')}
                className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                Vitale meetwaarden
              </button>
              <span className="text-slate-300">·</span>
              <button 
                onClick={() => onNavigateTab('reporting')}
                className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
              >
                SBAR Artsenoverdracht
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 2. De 4 Hoofddomeinen: Randloos, zachte schaduw, ruime binnenvulling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {corePillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              onClick={pillar.action}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_16px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_26px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-100/80 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-slate-900 font-display group-hover:text-blue-700 transition-colors">
                  {pillar.title}
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-800">
                <span>{pillar.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Veelvoorkomende somatische beslisbomen voor het gekozen werkveld */}
      <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-[0_2px_16px_rgba(15,23,42,0.03)] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Veelvoorkomende klachten in {activeSector}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Directe klinische uitvraag volgens NHG en V&VN richtlijnen
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('triage')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            Alle klachten bekijken →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onNavigateTab('triage')}
              className="p-5 sm:p-6 bg-slate-50/70 hover:bg-blue-50/50 rounded-2xl shadow-xs hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-900 group-hover:text-blue-700">
                  {topic.title}
                </span>
                <span className="text-[10px] text-slate-500 font-medium bg-white px-2 py-0.5 rounded-md shadow-2xs">
                  {topic.primaryUrgency}
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-1">
                {topic.shortDescription}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-medium text-blue-600">
                <span>Start beslisboom</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Casustraining & Richtlijnen: Royale vulling, rustige diepte */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Casus training (Zacht ijsblauw, royale vulling, subtiele schaduw) */}
        <div className="lg:col-span-2 bg-blue-50/40 rounded-3xl p-8 sm:p-9 shadow-[0_2px_16px_rgba(15,23,42,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-xs font-semibold text-blue-800">
                Klinische Oefencasus
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">
                {activeCase.domain}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              {activeCase.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-xl">
              {activeCase.context} — {activeCase.learningObjective}
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Oefen met 4 keuzes en directe theoriekoppeling.
            </span>
            <button
              onClick={() => onSelectCase(activeCase)}
              className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
            >
              <span>Casus openen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Kwaliteitsborging & Richtlijnen */}
        <div className="bg-white rounded-3xl p-8 sm:p-9 shadow-[0_2px_16px_rgba(15,23,42,0.03)] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Gevalideerde Zorgstandaarden</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alle adviezen en beslisbomen sluiten aan bij:
            </p>
            <ul className="mt-3 text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              <li>NHG-Standaarden (Dyspneu, Pijn, ACS)</li>
              <li>V&VN Handreikingen & KICK-protocollen</li>
              <li>NVAVG (Gezondheid bij LVB)</li>
              <li>Nederlandse Triage Standaard (NTS)</li>
            </ul>
          </div>

          <button
            onClick={() => onNavigateTab('sources')}
            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Bekijk richtlijnen & bronnen</span>
          </button>
        </div>

      </div>

    </div>
  );
};
