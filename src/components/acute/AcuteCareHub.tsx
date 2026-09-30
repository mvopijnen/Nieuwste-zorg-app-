import React, { useState } from 'react';
import { Stethoscope, ShieldAlert, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { SomaticTriageFlow } from '../triage/SomaticTriageFlow';
import { AbcdeScanner } from '../triage/AbcdeScanner';
import { VitalsChecker } from '../vitals/VitalsChecker';
import { CareSector, SomaticTriageTopic, UrgencyLevel, VitalParameters } from '../../types';

interface AcuteCareHubProps {
  activeSector: CareSector;
  onOpenSbarFromTriage: (topic: SomaticTriageTopic, urgency: UrgencyLevel, answersSummary: string) => void;
  onExportAbcdeToSbar: (abcdeSummary: string, calculatedUrgency: UrgencyLevel) => void;
  onExportVitalsToSbar: (vitals: VitalParameters, summaryText: string, calculatedUrgency: UrgencyLevel) => void;
  initialSubTab?: 'triage' | 'abcde' | 'vitals';
}

export const AcuteCareHub: React.FC<AcuteCareHubProps> = ({
  activeSector,
  onOpenSbarFromTriage,
  onExportAbcdeToSbar,
  onExportVitalsToSbar,
  initialSubTab = 'triage'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'triage' | 'abcde' | 'vitals'>(initialSubTab);

  const subTabs = [
    { id: 'triage', label: '1. Symptoom beoordelen', icon: Stethoscope, desc: 'Klachten uitvragen & urgentie bepalen' },
    { id: 'abcde', label: '2. ABCDE Protocol', icon: ShieldAlert, desc: 'Systematisch vitale bedreiging uitsluiten' },
    { id: 'vitals', label: '3. Vitale Functies', icon: Activity, desc: 'RR, Pols, SpO2, Temp & EWS score' }
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* Subtab Navigation Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id as 'triage' | 'abcde' | 'vitals')}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer border-0 ${
                  isActive
                    ? 'bg-blue-50 text-blue-950 ring-2 ring-blue-600 shadow-xs'
                    : 'bg-slate-50/70 hover:bg-slate-100/80 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs sm:text-sm">{tab.label}</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {tab.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Module View */}
      {activeSubTab === 'triage' && (
        <SomaticTriageFlow
          activeSector={activeSector}
          onBack={() => {}}
          onOpenSbar={onOpenSbarFromTriage}
        />
      )}

      {activeSubTab === 'abcde' && (
        <AbcdeScanner
          onExportToSbar={onExportAbcdeToSbar}
        />
      )}

      {activeSubTab === 'vitals' && (
        <VitalsChecker
          onExportToSbar={onExportVitalsToSbar}
        />
      )}

    </div>
  );
};
