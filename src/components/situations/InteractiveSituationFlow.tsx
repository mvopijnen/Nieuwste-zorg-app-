import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  HelpCircle, 
  Lightbulb, 
  XCircle, 
  BrainCircuit, 
  AlertTriangle, 
  GraduationCap, 
  ArrowRight,
  Shield,
  Sparkles,
  Volume2
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
      onBack();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Bar with Navigation & Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Overzicht' : 'Vorige stap'}</span>
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
                      ? 'w-6 bg-teal-600'
                      : idx + 1 < currentStep
                      ? 'w-2 bg-teal-300'
                      : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-xs font-medium text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
            {situation.title.split(' ')[0]}
          </div>
        </div>

        {/* Mobile Full-width progress bar */}
        <div className="sm:hidden mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-600 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Flow Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        
        {/* STAP 1: Signalen observeren */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
                <span>Stap 1: Observatie</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Welke signalen merk je op bij de cliënt?
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Selecteer de signalen die je nu ziet of zojuist hebt waargenomen. Dit helpt om scherp te krijgen wat er speelt.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {situation.signals.map((signal) => {
                const isSelected = selectedSignalIds.includes(signal.id);
                return (
                  <button
                    key={signal.id}
                    type="button"
                    onClick={() => toggleSignal(signal.id)}
                    className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/70 text-slate-900 ring-1 ring-teal-600'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'border-slate-300 bg-white'
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

            {selectedSignalIds.length === 0 && (
              <p className="text-xs text-slate-400 italic">
                Tip: Kies minimaal 1 signaal om verder te gaan, of klik op volgende om het complete overzicht te bekijken.
              </p>
            )}
          </div>
        )}

        {/* STAP 2: Wat zou er kunnen spelen? (Hypotheses) */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
                <span>Stap 2: Mogelijke Verklaringen</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Wat zou er mogelijk kunnen spelen?
              </h2>
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 mt-2">
                <strong>Belangrijk:</strong> Deze signalen kunnen passen bij verschillende situaties. We stellen geen diagnose, maar onderzoeken mogelijke hypotheses.
              </div>
            </div>

            <div className="space-y-3">
              {situation.hypotheses.map((hypo, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-teal-600 shrink-0" />
                    <h3 className="font-bold text-slate-900 text-sm">{hypo.title}</h3>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pl-6">
                    {hypo.explanation}
                  </p>
                  <p className="text-[11px] text-teal-800 font-medium pl-6 pt-1">
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
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
                <span>Stap 3: Context & Triggers</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Welke factoren hebben invloed?
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Gedrag staat zelden op zichzelf. Kijk kritisch naar de omgevingsprikkels en lichamelijke toestand.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {situation.influencingFactors.map((factor, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wide block mb-1">
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

        {/* STAP 4: Wat kun je direct doen? (DO's) */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
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
                  className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/30 flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                      <span className="text-[10px] uppercase font-semibold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded">
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

        {/* STAP 5: Wat kun je beter NIET doen? (DON'Ts) */}
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
                  className="p-4 rounded-2xl border border-rose-200/90 bg-rose-50/30 flex items-start gap-3.5"
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

        {/* STAP 6: Waarom werkt dit? (Achtergrond) */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
                <span>Stap 6: Wetenschappelijke Inzichten</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Waarom werken deze interventies?
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Begrip van de werking van het brein en het zenuwstelsel maakt je een sterkere professional.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-teal-200 bg-teal-50/40 space-y-3">
              <div className="flex items-center gap-2.5">
                <BrainCircuit className="w-6 h-6 text-teal-700" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {situation.whyItWorks.concept}
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {situation.whyItWorks.explanation}
              </p>
              <div className="pt-2 border-t border-teal-200/60 text-[11px] text-teal-900 font-semibold">
                Kader: {situation.whyItWorks.scientificBasis}
              </div>
            </div>
          </div>
        )}

        {/* STAP 7: Wanneer overleg of opschaling nodig? */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2">
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

              <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-2">
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

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <strong>Advies:</strong> {situation.escalation.contactAdvice}
            </div>
          </div>
        )}

        {/* STAP 8: Oefencasus & Afronding */}
        {currentStep === 8 && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Stap 8: Kennis Verankeren
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display mt-1">
                Kennisroute voltooid!
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Je hebt alle stappen voor <strong>{situation.title}</strong> doorlopen. Je verdient direct <strong className="text-teal-700">+30 XP</strong>.
              </p>
            </div>

            {situation.recommendedCaseId && relatedCase ? (
              <div className="p-5 bg-teal-50/60 border border-teal-200 rounded-2xl text-left space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-teal-700" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Aanbevolen oefencasus: {relatedCase.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  {relatedCase.vignette.slice(0, 140)}...
                </p>
                <button
                  onClick={() => onLaunchCase(situation.recommendedCaseId!)}
                  className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
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
                onBack();
              }}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Afronden en terug naar situaties (+30 XP)</span>
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
              {currentStep === 1 ? 'Annuleren' : 'Vorige stap'}
            </button>

            <button
              onClick={handleNext}
              className="py-2.5 px-5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-transform active:scale-[0.99] cursor-pointer"
            >
              <span>Volgende stap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
