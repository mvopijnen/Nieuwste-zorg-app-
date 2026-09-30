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
import { AbcdeStep, UrgencyLevel } from '../../types';

interface AbcdeScannerProps {
  onExportToSbar?: (abcdeSummary: string, calculatedUrgency: UrgencyLevel) => void;
}

export const AbcdeScanner: React.FC<AbcdeScannerProps> = ({ onExportToSbar }) => {
  const [activeStepLetter, setActiveStepLetter] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [checkedRedFlags, setCheckedRedFlags] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

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
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Acute Benadering & Spoedbeoordeling</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Systematische ABCDE Scanner
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Beoordeel de vitale functies systematisch van A naar E. Een bedreigde A of B gaat altijd vóór C of D!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="py-2 px-3 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset scan</span>
            </button>
            {onExportToSbar && (
              <button
                onClick={() => onExportToSbar(generateAbcdeSummary(), calculatedUrgency)}
                className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Naar SBAR overdracht</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Urgency indicator strip */}
        <div className={`mt-5 p-4 rounded-2xl border flex items-center justify-between gap-4 ${
          hasCriticalRedFlag ? 'bg-rose-50 border-rose-300' : 'bg-teal-50 border-teal-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0 ${
              hasCriticalRedFlag ? 'bg-rose-600 animate-pulse' : 'bg-teal-600'
            }`}>
              {calculatedUrgency}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                {hasCriticalRedFlag 
                  ? `U1 ALARMSIGNAAL ACTIEF: ${checkedRedFlags.length} rode vlag(gen)`
                  : 'Geen acute ABC-bedreigingen aangevinkt'}
              </p>
              <p className="text-[11px] text-slate-600">
                {hasCriticalRedFlag 
                  ? 'Start directe interventie & bel 112 / dienstartsenpost direct.' 
                  : 'Doorloop alle 5 stappen om vitale stabiliteit te bevestigen.'}
              </p>
            </div>
          </div>

          {hasCriticalRedFlag && (
            <a
              href="tel:112"
              className="py-2 px-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Bel 112</span>
            </a>
          )}
        </div>
      </div>

      {/* ABCDE 5-Letter Navigation Bar */}
      <div className="grid grid-cols-5 gap-2">
        {ABCDE_PROTOCOL.map((step) => {
          const isActive = activeStepLetter === step.letter;
          const hasFlagsInStep = step.redFlags.some(f => checkedRedFlags.includes(f));

          return (
            <button
              key={step.letter}
              onClick={() => setActiveStepLetter(step.letter)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isActive
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                  : hasFlagsInStep
                  ? 'border-rose-400 bg-rose-50 text-rose-950 font-bold'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="text-lg font-bold block font-display">{step.letter}</span>
              <span className="text-[11px] block truncate opacity-80">{step.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Assessment Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
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
        <div className="p-5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h3 className="font-bold text-rose-950 text-xs uppercase tracking-wide">
              Kritieke Rode Vlaggen (U1 Alarmering):
            </h3>
          </div>
          <div className="space-y-2">
            {currentStep.redFlags.map((flag, idx) => {
              const isChecked = checkedRedFlags.includes(flag);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleRedFlag(flag)}
                  className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isChecked
                      ? 'border-rose-600 bg-rose-600 text-white font-semibold'
                      : 'border-rose-200 bg-white hover:border-rose-300 text-rose-950'
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
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
            Systematische Controlepunten ({currentStep.letter}):
          </h3>
          <div className="space-y-2">
            {currentStep.checks.map((check, idx) => {
              const isChecked = checkedItems.includes(check);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCheck(check)}
                  className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    isChecked
                      ? 'border-teal-600 bg-teal-50/60 text-slate-900'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-white text-slate-700'
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
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
            Wat kun je direct doen bij problemen in stap {currentStep.letter}?
          </h3>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4 leading-relaxed">
            {currentStep.immediateInterventions.map((action, idx) => (
              <li key={idx}><strong>{action}</strong></li>
            ))}
          </ul>
        </div>

        {/* Navigation to next step */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              const steps: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];
              const prevIdx = steps.indexOf(activeStepLetter) - 1;
              if (prevIdx >= 0) setActiveStepLetter(steps[prevIdx]);
            }}
            disabled={activeStepLetter === 'A'}
            className={`py-2 px-3 text-xs font-semibold rounded-xl border ${
              activeStepLetter === 'A' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
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
            className={`py-2 px-4 bg-slate-900 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 ${
              activeStepLetter === 'E' ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-800 cursor-pointer'
            }`}
          >
            <span>Volgende stap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Summary Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Gegenereerde ABCDE Observatie
          </h3>
          <button
            onClick={handleCopy}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <ClipboardCopy className="w-3.5 h-3.5" />
            <span>{copied ? 'Gekopieerd!' : 'Kopieer samenvatting'}</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
          {generateAbcdeSummary()}
        </pre>
      </div>

    </div>
  );
};
