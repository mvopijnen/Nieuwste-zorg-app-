import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Lightbulb, 
  XCircle, 
  BrainCircuit, 
  AlertTriangle, 
  GraduationCap, 
  ArrowRight,
  Sparkles,
  Zap,
  BookOpen
} from 'lucide-react';
import { Situation, CaseStudy } from '../../types';

interface InteractiveSituationFlowProps {
  situation: Situation;
  onBack: () => void;
  onCompleteFlow: (situationId: string) => void;
  onLaunchCase: (caseId: string) => void;
  relatedCase?: CaseStudy;
}

export const InteractiveSituationFlow: React.FC<InteractiveSituationFlowProps> = ({
  situation,
  onBack,
  onCompleteFlow,
  onLaunchCase,
  relatedCase
}) => {
  const [viewMode, setViewMode] = useState<'quick' | 'stepByStep'>('quick');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSignalIds, setSelectedSignalIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalSteps = 8;

  const toggleSignal = (signalId: string) => {
    if (selectedSignalIds.includes(signalId)) {
      setSelectedSignalIds(selectedSignalIds.filter(id => id !== signalId));
    } else {
      setSelectedSignalIds([...selectedSignalIds, signalId]);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onCompleteFlow(situation.id);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setViewMode('quick');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* 1. SNELLE PRAKTIJKAANPAK (Default voor professionals) */}
      {viewMode === 'quick' ? (
        <div className="space-y-6 animate-in fade-in">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Terug naar Praktijkcoach</span>
            </button>

            <button
              onClick={() => setViewMode('stepByStep')}
              className="py-1.5 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100/80 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Stap-voor-stap analyse (8 stappen)</span>
            </button>
          </div>

          {/* Quick Overview Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Snelle Praktijkkaart · Direct Handelen</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                  {situation.title}
                </h1>
                <p className="text-slate-600 text-sm mt-1.5 max-w-xl leading-relaxed">
                  {situation.shortDescription}
                </p>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold shrink-0 shadow-2xs">
                Urgentie: {situation.urgencyLevel}
              </div>
            </div>

            {/* 4 Quick Pillars: Mogelijk relevant, Nu proberen, Niet doen, Escaleren wanneer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* 1. Mogelijk relevant */}
              <div className="p-6 bg-slate-50/80 rounded-2xl border-0 space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                    Mogelijk relevant
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {situation.hypotheses.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-slate-900">{h.title}:</strong> {h.explanation}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Nu proberen */}
              <div className="p-6 bg-blue-50/50 rounded-2xl border-0 space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                    Nu proberen
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-800">
                  {situation.dos.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-blue-950">{d.title}:</strong> {d.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Niet doen */}
              <div className="p-6 bg-rose-50/50 rounded-2xl border-0 space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                    Niet doen
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-rose-950">
                  {situation.donts.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <div>
                        <strong>{d.title}:</strong> {d.warning} <span className="text-slate-500 font-normal">({d.whyNot})</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Escaleren wanneer */}
              <div className="p-6 bg-amber-50/60 rounded-2xl border-0 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                    Escaleren wanneer
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-800">
                  {situation.escalation.whenToConsult.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                  {situation.escalation.whenToEscalateEmergency.map((e, i) => (
                    <li key={`em-${i}`} className="flex items-start gap-2 text-rose-900 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                      <span>🚨 {e}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Verdiepingsacties */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setViewMode('stepByStep')}
                className="w-full sm:w-auto py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>Verdieping tonen (Stap voor stap)</span>
              </button>

              {situation.recommendedCaseId && (
                <button
                  onClick={() => onLaunchCase(situation.recommendedCaseId!)}
                  className="w-full sm:w-auto py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Oefen deze casus interactief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* 2. STAP-VOOR-STAP VERDIEPINGSMODUS */
        <div className="space-y-6 animate-in fade-in">
          {/* Top Bar with Navigation & Progress */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border-0 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                if (currentStep === 1) {
                  setViewMode('quick');
                } else {
                  handlePrev();
                }
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentStep === 1 ? 'Naar snelle praktijkkaart' : 'Vorige stap'}</span>
            </button>

            {/* Stepper Dots & Progress text */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">
                Stap {currentStep} van {totalSteps}
              </span>
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx + 1 === currentStep
                        ? 'w-6 bg-blue-600'
                        : idx + 1 < currentStep
                        ? 'w-2 bg-blue-300'
                        : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setViewMode('quick')}
              className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
            >
              Snelle weergave
            </button>
          </div>

          {/* Main Flow Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0">
            
            {/* STAP 1: Signalen observeren */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                    <span>Stap 1: Observatie</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    Welke signalen merk je op bij de cliënt?
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Selecteer de signalen die je nu ziet of zojuist hebt waargenomen. Dit helpt om scherp te krijgen wat er speelt.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {situation.signals.map((signal) => {
                    const isSelected = selectedSignalIds.includes(signal.id);
                    return (
                      <button
                        key={signal.id}
                        type="button"
                        onClick={() => toggleSignal(signal.id)}
                        className={`p-4 rounded-2xl text-left flex items-start gap-3.5 transition-all cursor-pointer border-0 shadow-2xs ${
                          isSelected
                            ? 'bg-blue-50 ring-2 ring-blue-600 text-blue-950 font-medium'
                            : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <span className="text-sm font-medium block leading-snug">
                            {signal.label}
                          </span>
                          <span className="text-[11px] text-slate-400 capitalize mt-0.5 block">
                            Categorie: {signal.category}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STAP 2: Hypotheses */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                    <span>Stap 2: Mogelijke Verklaringen</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    Wat zou er mogelijk kunnen spelen?
                  </h2>
                  <div className="p-4 bg-amber-50/80 rounded-2xl text-xs text-amber-900 mt-2">
                    <strong>Belangrijk:</strong> Deze signalen kunnen passen bij verschillende situaties. We stellen geen diagnose, maar onderzoeken mogelijke hypothesen.
                  </div>
                </div>

                <div className="space-y-3">
                  {situation.hypotheses.map((hypo, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 space-y-1.5 shadow-2xs border-0">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" />
                        <h3 className="font-bold text-slate-900 text-sm">{hypo.title}</h3>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed pl-6">
                        {hypo.explanation}
                      </p>
                      <p className="text-[11px] text-blue-800 font-medium pl-6 pt-1">
                        Context: {hypo.likelihoodNote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAP 3: Beïnvloedende Factoren */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                    <span>Stap 3: Context & Triggers</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    Welke factoren hebben invloed?
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Gedrag staat zelden op zichzelf. Kijk kritisch naar omgevingsprikkels en lichamelijke toestand.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {situation.influencingFactors.map((factor, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 space-y-1 shadow-2xs border-0">
                      <span className="text-xs font-bold text-blue-800 uppercase tracking-wide block mb-1">
                        {factor.factor}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {factor.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAP 4: DO's */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                    <span>Stap 4: Directe Handelingsopties</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    Wat kun je op dit moment proberen? (DO's)
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Praktische interventies gericht op directe rust, veiligheid en de-escalatie.
                  </p>
                </div>

                <div className="space-y-3">
                  {situation.dos.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-blue-50/50 flex items-start gap-3.5 shadow-2xs border-0"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                          <span className="text-[10px] uppercase font-semibold text-blue-800 bg-blue-100/60 px-2 py-0.5 rounded">
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAP 5: DONT's */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1">
                    <span>Stap 5: Veelvoorkomende Valkuilen</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    Wat kun je nu beter NIET doen? (DON'Ts)
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Deze reflexen liggen voor de hand, maar verhogen bij deze toestand juist het risico op escalatie.
                  </p>
                </div>

                <div className="space-y-3">
                  {situation.donts.map((dont, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-rose-50/40 flex items-start gap-3.5 shadow-2xs border-0"
                    >
                      <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                        <XCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-rose-950 text-sm">{dont.title}</h3>
                        <p className="text-xs text-rose-900 font-medium mt-0.5">
                          {dont.warning}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          <strong>Waarom niet:</strong> {dont.whyNot}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAP 6: Achtergrond */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                    <span>Stap 6: Wetenschappelijke Inzichten</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    Waarom werken deze interventies?
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Begrip van de werking van het brein en het zenuwstelsel maakt je een sterkere professional.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50/80 space-y-3 shadow-2xs border-0">
                  <div className="flex items-center gap-2.5">
                    <BrainCircuit className="w-6 h-6 text-blue-700" />
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {situation.whyItWorks.concept}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {situation.whyItWorks.explanation}
                  </p>
                  <div className="pt-2 border-t border-slate-200 text-[11px] text-blue-900 font-semibold">
                    Kader: {situation.whyItWorks.scientificBasis}
                  </div>
                </div>
              </div>
            )}

            {/* STAP 7: Veiligheid & Opschalen */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1">
                    <span>Stap 7: Veiligheid & Opschalen</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                    Wanneer is overleg of opschaling nodig?
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Heldere criteria voor wanneer de-escalatie op de vloer niet volstaat en professionele hulp vereist is.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-amber-50/60 space-y-2 shadow-2xs border-0">
                    <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>Wanneer overleggen:</span>
                    </h3>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      {situation.escalation.whenToConsult.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-rose-50/60 space-y-2 shadow-2xs border-0">
                    <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wide flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-700" />
                      <span>Acuut opschalen:</span>
                    </h3>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      {situation.escalation.whenToEscalateEmergency.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-xl text-xs text-slate-600 shadow-2xs">
                  <strong>Advies:</strong> {situation.escalation.contactAdvice}
                </div>
              </div>
            )}

            {/* STAP 8: Afronding */}
            {currentStep === 8 && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto shadow-xs">
                  <Sparkles className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Stap 8: Kennis Verankeren
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 font-display mt-1">
                    Analyse voltooid!
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                    Je hebt alle verdiepingsstappen voor <strong>{situation.title}</strong> doorlopen.
                  </p>
                </div>

                {situation.recommendedCaseId && relatedCase ? (
                  <div className="p-6 bg-blue-50/50 rounded-2xl text-left space-y-3 shadow-2xs border-0">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-700" />
                      <h3 className="font-bold text-slate-900 text-sm">
                        Aanbevolen oefencasus: {relatedCase.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600">
                      {relatedCase.vignette.slice(0, 140)}...
                    </p>
                    <button
                      onClick={() => onLaunchCase(situation.recommendedCaseId!)}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Start deze praktijkcasus direct</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : null}

                <button
                  onClick={() => {
                    setIsCompleted(true);
                    onCompleteFlow(situation.id);
                    setViewMode('quick');
                  }}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Afronden en terug naar snelle praktijkkaart</span>
                </button>
              </div>
            )}

            {/* Footer Navigation Buttons */}
            {currentStep < 8 && (
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={handlePrev}
                  className="py-2.5 px-4 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {currentStep === 1 ? 'Naar snelle praktijkkaart' : 'Vorige stap'}
                </button>

                <button
                  onClick={handleNext}
                  className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Volgende stap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
