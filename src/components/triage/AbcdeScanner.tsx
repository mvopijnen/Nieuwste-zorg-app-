import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  ClipboardCopy, 
  PhoneCall, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ABCDE_PROTOCOL } from '../../data/somaticTriage';
import { AbcdeStep, UrgencyLevel, ClinicalDecisionTrace } from '../../types';

interface AbcdeScannerProps {
  onExportToSbar?: (abcdeSummary: string, calculatedUrgency: UrgencyLevel) => void;
  isStudentMode?: boolean;
}

export const AbcdeScanner: React.FC<AbcdeScannerProps> = ({ 
  onExportToSbar,
  isStudentMode = false 
}) => {
  const [activeStepLetter, setActiveStepLetter] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [checkedRedFlags, setCheckedRedFlags] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showTrace, setShowTrace] = useState(false);

  const toggleRedFlag = (flag: string) => {
    if (checkedRedFlags.includes(flag)) {
      setCheckedRedFlags(checkedRedFlags.filter(f => f !== flag));
    } else {
      setCheckedRedFlags([...checkedRedFlags, flag]);
    }
  };

  const toggleCheck = (item: string) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter(i => i !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  // Determine overall urgency from red flags
  const hasCriticalRedFlag = checkedRedFlags.length > 0;
  const calculatedUrgency: UrgencyLevel = hasCriticalRedFlag ? 'U1' : 'U3';

  const currentStep = ABCDE_PROTOCOL.find(s => s.letter === activeStepLetter) || ABCDE_PROTOCOL[0];

  const handleReset = () => {
    setCheckedRedFlags([]);
    setCheckedItems([]);
    setActiveStepLetter('A');
  };

  const generateAbcdeSummary = () => {
    return `ABCDE BEOORDELING:
A (Luchtweg): ${checkedRedFlags.some(f => f.includes('obstructie') || f.includes('Stridor')) ? 'BEDREIGD' : 'Vrij'}
B (Ademhaling): ${checkedRedFlags.some(f => f.includes('Ademfrequentie') || f.includes('SpO2')) ? 'AFWIJKEND' : 'Geen acute nood'}
C (Circulatie): ${checkedRedFlags.some(f => f.includes('Systolische') || f.includes('Hartfrequentie')) ? 'BEDREIGD' : 'Stabiel'}
D (Disability): ${checkedRedFlags.some(f => f.includes('AVPU') || f.includes('hypoglykemie')) ? 'VERLAAGD BEWUSTZIJN' : 'Alert'}
E (Exposure): ${checkedRedFlags.some(f => f.includes('Petechiën') || f.includes('Temperatuur')) ? 'AFWIJKEND' : 'Geen letsel'}
Alarmsignalen: ${checkedRedFlags.length > 0 ? checkedRedFlags.join('; ') : 'Geen'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateAbcdeSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Acute Benadering & Spoedbeoordeling</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display leading-snug">
              Systematische ABCDE Scanner
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-xl leading-relaxed">
              Beoordeel de vitale functies systematisch van A naar E. Een bedreigde A of B gaat altijd vóór C of D!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200/70 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset scan</span>
            </button>
            {onExportToSbar && (
              <button
                onClick={() => onExportToSbar(generateAbcdeSummary(), calculatedUrgency)}
                className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Naar SBAR overdracht</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Urgency indicator strip */}
        <div className={`mt-6 p-5 rounded-2xl border-0 flex items-center justify-between gap-4 ${
          hasCriticalRedFlag ? 'bg-rose-50/90 text-rose-950' : 'bg-blue-50/70 text-blue-950'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0 ${
              hasCriticalRedFlag ? 'bg-rose-600 animate-pulse' : 'bg-blue-600'
            }`}>
              {calculatedUrgency}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                {hasCriticalRedFlag 
                  ? `U1 ALARMSIGNAAL ACTIEF: ${checkedRedFlags.length} rode vlag(gen)`
                  : 'Geen acute ABC-bedreigingen aangevinkt'}
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {hasCriticalRedFlag 
                  ? 'Start directe interventie & bel 112 / dienstartsenpost direct.' 
                  : 'Doorloop alle 5 stappen om vitale stabiliteit te bevestigen.'}
              </p>
            </div>
          </div>

          {hasCriticalRedFlag && (
            isStudentMode ? (
              <div className="py-2.5 px-4 bg-rose-100 text-rose-950 rounded-xl text-xs font-bold border border-rose-200 shrink-0 flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                <span>In een echte situatie: bel direct 112</span>
              </div>
            ) : (
              <a
                href="tel:112"
                className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 shadow-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Bel 112</span>
              </a>
            )
          )}
        </div>

        {/* Onderbouwing van dit advies (ClinicalDecisionTrace) */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowTrace(!showTrace)}
            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Onderbouwing van dit advies</span>
            </div>
            <span className="text-blue-600 text-xs">
              {showTrace ? 'Inklappen' : 'Toon beslisregel & richtlijn'}
            </span>
          </button>

          {showTrace && (() => {
            const decisionTrace: ClinicalDecisionTrace = {
              urgency: calculatedUrgency,
              sourceOrganization: 'V&VN / Nederlandse Reanimatie Raad (NRR)',
              guidelineTitle: 'Landelijke ABCDE-systematiek voor Spoedbeoordeling',
              versionOrYear: 'In validatie',
              appliedDecisionRule: hasCriticalRedFlag
                ? 'Aanwezigheid van 1 of meer rode vlaggen in stap A, B of C activeert direct urgentieklasse U1 (acuut bedreigde vitale functie).'
                : 'Geen acute alarmsignalen gedetecteerd in de geëvalueerde stappen; vitale stabiliteit vooralsnog gehandhaafd (U3/stabiel).',
              triggeringData: checkedRedFlags.length > 0 ? checkedRedFlags : ['Geen rode vlaggen aangevinkt']
            };

            return (
              <div className="mt-3 p-5 bg-slate-50/80 rounded-2xl border-0 space-y-3 text-xs text-slate-700 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Bronorganisatie:</span>
                    <span className="font-bold text-slate-900">{decisionTrace.sourceOrganization}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Richtlijn:</span>
                    <span className="font-bold text-slate-900">{decisionTrace.guidelineTitle}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Status:</span>
                    <span className="font-bold text-slate-900">{decisionTrace.versionOrYear}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Beslisregel:</span>
                    <span className="font-bold text-slate-900">{decisionTrace.appliedDecisionRule}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl shadow-2xs space-y-1">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                    Geactiveerd door alarmsignalen:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    {decisionTrace.triggeringData.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ABCDE 5-Letter Navigation Bar */}
      <div className="grid grid-cols-5 gap-3">
        {ABCDE_PROTOCOL.map((step) => {
          const isActive = activeStepLetter === step.letter;
          const hasFlagsInStep = step.redFlags.some(f => checkedRedFlags.includes(f));

          return (
            <button
              key={step.letter}
              onClick={() => setActiveStepLetter(step.letter)}
              className={`p-3.5 rounded-2xl text-center transition-all cursor-pointer border-0 shadow-xs ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : hasFlagsInStep
                  ? 'bg-rose-50 text-rose-950 font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-xl font-bold block font-display">{step.letter}</span>
              <span className="text-[11px] block truncate opacity-85 mt-0.5">{step.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Assessment Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-7">
        
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              ABCDE Stap {currentStep.letter}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Focus: {currentStep.focus}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
            {currentStep.title}
          </h2>
        </div>

        {/* RED FLAGS SECTION */}
        <div className="p-6 bg-rose-50/60 rounded-2xl border-0 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h3 className="font-bold text-rose-950 text-xs uppercase tracking-wide">
              Kritieke Rode Vlaggen (U1 Alarmering):
            </h3>
          </div>
          <div className="space-y-2.5">
            {currentStep.redFlags.map((flag, idx) => {
              const isChecked = checkedRedFlags.includes(flag);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleRedFlag(flag)}
                  className={`w-full p-4 rounded-xl text-left flex items-start gap-3.5 transition-all cursor-pointer border-0 shadow-2xs ${
                    isChecked
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-white hover:bg-rose-50/50 text-rose-950'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isChecked ? 'border-white bg-white text-rose-600' : 'border-rose-300'
                  }`}>
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-xs leading-snug">{flag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CHECKS & OBSERVATIONS */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
            Systematische Controlepunten ({currentStep.letter}):
          </h3>
          <div className="space-y-2.5">
            {currentStep.checks.map((check, idx) => {
              const isChecked = checkedItems.includes(check);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCheck(check)}
                  className={`w-full p-4 rounded-xl text-left flex items-start gap-3.5 transition-all cursor-pointer border-0 shadow-2xs ${
                    isChecked
                      ? 'bg-blue-50 text-blue-950 font-medium'
                      : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isChecked ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                  }`}>
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                  <span className="text-xs leading-snug">{check}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* IMMEDIATE INTERVENTIONS */}
        <div className="p-6 bg-slate-50/80 rounded-2xl border-0 space-y-3">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
            Wat kun je direct doen bij problemen in stap {currentStep.letter}?
          </h3>
          <ul className="text-xs text-slate-700 space-y-2 list-disc pl-5 leading-relaxed">
            {currentStep.immediateInterventions.map((action, idx) => (
              <li key={idx}><strong>{action}</strong></li>
            ))}
          </ul>
        </div>

        {/* Navigation to next step */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              const steps: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
              const prevIdx = steps.indexOf(activeStepLetter) - 1;
              if (prevIdx >= 0) setActiveStepLetter(steps[prevIdx]);
            }}
            disabled={activeStepLetter === 'A'}
            className={`py-2 px-3.5 text-xs font-semibold rounded-xl transition-colors ${
              activeStepLetter === 'A' ? 'opacity-40 cursor-not-allowed text-slate-400' : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 cursor-pointer'
            }`}
          >
            ← Vorige letter
          </button>

          <button
            onClick={() => {
              const steps: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
              const nextIdx = steps.indexOf(activeStepLetter) + 1;
              if (nextIdx < steps.length) setActiveStepLetter(steps[nextIdx]);
            }}
            disabled={activeStepLetter === 'E'}
            className={`py-2.5 px-4 bg-blue-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs ${
              activeStepLetter === 'E' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'
            }`}
          >
            <span>Volgende stap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Summary Box */}
      <div className="bg-white rounded-3xl p-8 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Gegenereerde ABCDE Observatie
          </h3>
          <button
            onClick={handleCopy}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ClipboardCopy className="w-3.5 h-3.5" />
            <span>{copied ? 'Gekopieerd!' : 'Kopieer samenvatting'}</span>
          </button>
        </div>
        <pre className="p-5 bg-slate-50/80 rounded-2xl border-0 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
          {generateAbcdeSummary()}
        </pre>
      </div>

    </div>
  );
};
