import React, { useState } from 'react';
import { 
  ZapOff, 
  TrendingUp, 
  ShieldAlert, 
  HeartPulse, 
  Brain, 
  DoorClosed, 
  Radio, 
  Bandage, 
  Wine, 
  Activity, 
  Search, 
  ChevronRight, 
  Sparkles,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { SITUATIONS } from '../../data/situations';
import { Situation, HealthcareDomain } from '../../types';

interface SituationPickerProps {
  onSelectSituation: (situation: Situation) => void;
  onOpenAiAssistant: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ZapOff,
  TrendingUp,
  ShieldAlert,
  HeartPulse,
  Brain,
  DoorClosed,
  Radio,
  Bandage,
  Wine,
  Activity,
  Flame
};

export const SituationPicker: React.FC<SituationPickerProps> = ({
  onSelectSituation,
  onOpenAiAssistant
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('Alle');

  const categories = [
    'Alle',
    'Spanning',
    'Autisme',
    'LVB',
    'GGZ',
    'De-escalatie',
    'Veiligheid'
  ];

  const filteredSituations = SITUATIONS.filter((situation) => {
    const matchesSearch = 
      situation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      situation.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      situation.signals.some(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = 
      selectedDomain === 'Alle' || 
      situation.domains.some(d => d.toLowerCase().includes(selectedDomain.toLowerCase())) ||
      (selectedDomain === 'Spanning' && (situation.slug === 'oplopende-spanning' || situation.slug === 'overprikkeling'));

    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-2">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span>Praktijkcoach & Situatiekiezer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display text-balance">
            Wat speelt er en wat kun je nu doen?
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Kies hieronder een praktijksituatie om direct stap voor stap signalen te duiden, de-escalerende stappen te ontdekken en valkuilen te vermijden.
          </p>

          {/* Search bar */}
          <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Zoek op signalen (bijv. 'handen voor oren', 'ijsberen', 'schelden')..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Wissen
                </button>
              )}
            </div>

            <button
              onClick={onOpenAiAssistant}
              className="py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Beschrijf situatie aan AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs (Interactive filter controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedDomain === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedDomain(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Situation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSituations.map((situation) => {
          const IconComponent = ICON_MAP[situation.icon] || Activity;
          const isFeatured = situation.slug === 'overprikkeling' || situation.slug === 'oplopende-spanning';

          return (
            <div
              key={situation.id}
              onClick={() => onSelectSituation(situation)}
              className="group bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header row with domains metadata (unboxed text) */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span>{situation.domains.slice(0, 2).join(' · ')}</span>
                    {situation.domains.length > 2 && <span>+{situation.domains.length - 2}</span>}
                  </div>
                  {isFeatured && (
                    <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      Volledige flow
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3.5 mt-1">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    situation.color === 'rose' 
                      ? 'bg-rose-50 text-rose-700' 
                      : situation.color === 'amber'
                      ? 'bg-amber-50 text-amber-700'
                      : situation.color === 'blue'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-teal-50 text-teal-700'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display">
                      {situation.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {situation.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Sample signals preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-slate-500 font-medium self-center mr-1">
                    Signalen:
                  </span>
                  {situation.signals.slice(0, 3).map((sig) => (
                    <span
                      key={sig.id}
                      className="text-[11px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-150"
                    >
                      {sig.label}
                    </span>
                  ))}
                  {situation.signals.length > 3 && (
                    <span className="text-[11px] text-slate-400 self-center">
                      +{situation.signals.length - 3} meer
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom action row */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800">
                <span>Start situatiecoach ({situation.signals.length} signalen)</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredSituations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
          <p className="text-slate-600 text-sm">
            Geen situaties gevonden voor "{searchQuery}".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedDomain('Alle'); }}
            className="mt-3 px-4 py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-200"
          >
            Alle situaties tonen
          </button>
        </div>
      )}

    </div>
  );
};
