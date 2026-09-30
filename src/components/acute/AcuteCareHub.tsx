import React, { useState } from 'react';
import { Stethoscope, ShieldAlert, Activity, GraduationCap } from 'lucide-react';
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
  isStudentMode?: boolean;
}

export const AcuteCareHub: React.FC<AcuteCareHubProps> = ({
  activeSector,
  onOpenSbarFromTriage,
  onExportAbcdeToSbar,
  onExportVitalsToSbar,
  initialSubTab = 'triage',
  isStudentMode = false
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'triage' | 'abcde' | 'vitals'>(initialSubTab);

  const subTabs = [
    { id: 'triage', label: '1. Symptoom beoordelen', icon: Stethoscope, desc: 'Klachten uitvragen & urgentie bepalen' },
    { id: 'abcde', label: '2. ABCDE Protocol', icon: ShieldAlert, desc: 'Systematisch vitale bedreiging uitsluiten' },
    { id: 'vitals', label: '3. Vitale Functies', icon: Activity, desc: 'RR, Pols, SpO2, Temp & EWS score' }
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* Student Mode Education Notice */}
      {isStudentMode && (
        <div className="bg-amber-50/90 rounded-2xl p-5 border-0 flex items-start gap-3.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[11px]">
                SIMULATIE / OEFENOMGEVING
              </span>
              <span className="text-xs font-semibold text-amber-950">
                Uitsluitend fictieve trainingsdata
              </span>
            </div>
            <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
              In een echte situatie: bel direct 112 of waarschuw de dienstdoende arts. In deze oefenomgeving leer je systematisch observeren, vitale parameters duiden en methodisch handelen zonder dat actieve noodlijnen worden gebeld.
            </p>
          </div>
        </div>
      )}

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
          isStudentMode={isStudentMode}
        />
      )}

      {activeSubTab === 'abcde' && (
        <AbcdeScanner
          onExportToSbar={onExportAbcdeToSbar}
          isStudentMode={isStudentMode}
        />
      )}

      {activeSubTab === 'vitals' && (
        <VitalsChecker
          onExportToSbar={onExportVitalsToSbar}
          isStudentMode={isStudentMode}
        />
      )}

    </div>
  );
};
