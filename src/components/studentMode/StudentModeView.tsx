import React, { useState } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  FileText, 
  TrendingDown, 
  TrendingUp, 
  UserCheck, 
  HelpCircle, 
  Check, 
  ChevronRight, 
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { CASE_STUDIES } from '../../data/cases';
import { CaseStudy, CaseOption, UserProgressState } from '../../types';
import { StorageService } from '../../services/storage';

interface StudentModeViewProps {
  onBackToProfessional: () => void;
  onNavigateTab?: (tab: string) => void;
  progress: UserProgressState;
  onProgressUpdate?: (newProgress: UserProgressState) => void;
}

export const StudentModeView: React.FC<StudentModeViewProps> = ({
  onBackToProfessional,
  onNavigateTab,
  progress,
  onProgressUpdate
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const currentCase: CaseStudy = CASE_STUDIES[selectedCaseIndex] || CASE_STUDIES[0];

  // 5-Fasen Klinisch Redeneermodel State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSignalIds, setSelectedSignalIds] = useState<string[]>([]);
  const [selectedHypothesisIds, setSelectedHypothesisIds] = useState<string[]>([]);
  const [primaryHypothesisId, setPrimaryHypothesisId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<CaseOption | null>(null);
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [reflectionAnswer, setReflectionAnswer] = useState<string>('');
  
  // Track completion per case
  const isAlreadyCompleted = progress.completedCases.includes(currentCase.id);
  const [isCompletedInSession, setIsCompletedInSession] = useState<boolean>(isAlreadyCompleted);
  const [sessionAwardedXp, setSessionAwardedXp] = useState<number>(0);

  const availableSignals = currentCase.observableSignals || [];
  const availableHypotheses = currentCase.hypotheses || [];

  // Toggle signal selection (minimum 2 required)
  const handleToggleSignal = (sigId: string) => {
    if (selectedSignalIds.includes(sigId)) {
      setSelectedSignalIds(selectedSignalIds.filter(id => id !== sigId));
    } else {
      setSelectedSignalIds([...selectedSignalIds, sigId]);
    }
  };

  // Toggle hypothesis selection (maximum 2 allowed)
  const handleToggleHypothesis = (hypId: string) => {
    if (selectedHypothesisIds.includes(hypId)) {
      const next = selectedHypothesisIds.filter(id => id !== hypId);
      setSelectedHypothesisIds(next);
      if (primaryHypothesisId === hypId) {
        setPrimaryHypothesisId(next[0] || null);
      }
    } else {
      if (selectedHypothesisIds.length >= 2) {
        // Replace second or warn
        const next = [selectedHypothesisIds[0], hypId];
        setSelectedHypothesisIds(next);
      } else {
        const next = [...selectedHypothesisIds, hypId];
        setSelectedHypothesisIds(next);
        if (!primaryHypothesisId) {
          setPrimaryHypothesisId(hypId);
        }
      }
    }
  };

  // Select intervention (does NOT grant XP here; feedback is provided)
  const handleSelectOption = (opt: CaseOption) => {
    setSelectedOption(opt);
  };

  // Mark full case as completed and award XP only once
  const handleCompleteFullCase = () => {
    if (isAlreadyCompleted || isCompletedInSession) {
      return;
    }
    const xpReward = 50;
    setSessionAwardedXp(xpReward);
    setIsCompletedInSession(true);
    
    // Mark complete and update progress (markCaseComplete handles saving and adding XP once)
    const updated = StorageService.markCaseComplete(currentCase.id, currentCase.domain, xpReward);
    if (onProgressUpdate) {
      onProgressUpdate(updated);
    }
  };

  const handleResetFlow = () => {
    setCurrentStep(1);
    setSelectedSignalIds([]);
    setSelectedHypothesisIds([]);
    setPrimaryHypothesisId(null);
    setSelectedOption(null);
    setStudentNotes('');
    setReflectionAnswer('');
    setIsCompletedInSession(progress.completedCases.includes(currentCase.id));
    setSessionAwardedXp(0);
  };

  const handleCaseChange = (idx: number) => {
    setSelectedCaseIndex(idx);
    const targetCase = CASE_STUDIES[idx];
    setCurrentStep(1);
    setSelectedSignalIds([]);
    setSelectedHypothesisIds([]);
    setPrimaryHypothesisId(null);
    setSelectedOption(null);
    setStudentNotes('');
    setReflectionAnswer('');
    setIsCompletedInSession(targetCase ? progress.completedCases.includes(targetCase.id) : false);
    setSessionAwardedXp(0);
  };

  // Signal selection counts
  const neededSignals = Math.max(0, 2 - selectedSignalIds.length);

  return (
    <div className="space-y-8 sm:space-y-10 max-w-4xl mx-auto">
      
      {/* Student Top Banner: Heldere positionering & switch knop */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Opleidings- & Oefenmodule (MBO-V / HBO-V / Stagiaires)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display leading-snug">
              Klinisch Redeneren in de Praktijk
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-xl leading-relaxed">
              Oefen met realistische praktijksituaties, leer signalen methodisch duiden, observeer het effect van jouw keuzes en verdien leerpunten (XP).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* XP status in student mode */}
            <div className="px-4 py-2 bg-blue-50 text-blue-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{progress.xp} XP</span>
              <span className="text-blue-500 font-normal">· Niv {progress.level}</span>
            </div>

            <button
              onClick={onBackToProfessional}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              title="Terug naar de snelle zorgverlenersmodus"
            >
              <UserCheck className="w-4 h-4 text-slate-600" />
              <span>Naar Professional-modus</span>
            </button>
          </div>
        </div>

        {/* Fictieve Casus Marker & Casus Knoppen */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px]">
              Oefencasus / Simulatie
            </span>
            <span>Uitsluitend fictieve casuïstiek voor educatieve doeleinden.</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {CASE_STUDIES.map((c, idx) => {
              const isDone = progress.completedCases.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => handleCaseChange(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedCaseIndex === idx
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>Casus {idx + 1}</span>
                  {isDone && <Check className="w-3 h-3 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5-FASEN KLINISCH REDENEERMODEL VOOR STUDENTEN */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-8">
        
        {/* Step Progression Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Stap {currentStep} van 5 · 5-fasen klinisch redeneermodel
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {currentStep === 1 && '1. Observeer de casus & context'}
              {currentStep === 2 && '2. Welke signalen vallen jou op?'}
              {currentStep === 3 && '3. Wat zou er kunnen spelen? (Hypothesen)'}
              {currentStep === 4 && '4. Kies jouw pedagogische interventie'}
              {currentStep === 5 && '5. Effect, feedback & overdracht'}
            </h2>
          </div>

          <button
            onClick={handleResetFlow}
            className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1.5 cursor-pointer"
            title="Herstart deze oefencasus"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Herstart</span>
          </button>
        </div>

        {/* FASE 1: OBSERVEER DE CASUS */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="p-6 bg-blue-50/40 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs text-blue-900 font-semibold">
                <span>Doelgroep: {currentCase.targetGroup}</span>
                <span>Domein: {currentCase.domain}</span>
              </div>
              <p className="text-xs text-slate-500 italic">
                Context: {currentCase.context}
              </p>
              <h3 className="text-lg font-bold text-slate-900 font-display pt-2">
                {currentCase.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-white p-5 rounded-xl shadow-2xs">
                {currentCase.vignette}
              </p>
            </div>

            <div className="p-5 bg-slate-50/80 rounded-2xl flex items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Leerdoel:</strong> {currentCase.learningObjective}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Volgende: Signalen selecteren</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* FASE 2: SELECTEER SIGNALEN (MINIMAAL 2 VEREIST) */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-sm text-slate-600 leading-relaxed">
                Lees de observatie zorgvuldig. Selecteer <strong>minimaal 2 signalen</strong> of omgevingsfactoren die relevant zijn voor je beoordeling:
              </p>
              <div className={`text-xs font-semibold px-3 py-1 rounded-lg shrink-0 ${
                neededSignals === 0 
                  ? 'bg-emerald-50 text-emerald-800' 
                  : 'bg-amber-50 text-amber-800'
              }`}>
                {neededSignals === 0 
                  ? `✓ ${selectedSignalIds.length} geselecteerd` 
                  : neededSignals === 1 
                  ? 'Selecteer nog 1 signaal' 
                  : 'Selecteer nog 2 signalen'}
              </div>
            </div>

            <div className="space-y-3">
              {availableSignals.map((sig) => {
                const isChecked = selectedSignalIds.includes(sig.id);
                return (
                  <button
                    key={sig.id}
                    type="button"
                    onClick={() => handleToggleSignal(sig.id)}
                    className={`w-full p-4 rounded-xl text-left flex items-start gap-3.5 transition-all cursor-pointer border-0 shadow-2xs ${
                      isChecked
                        ? 'bg-blue-50 ring-2 ring-blue-600 text-blue-950 font-medium'
                        : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs sm:text-sm">{sig.label}</span>
                      {sig.category && (
                        <span className="ml-2 text-[10px] uppercase font-semibold text-slate-400">
                          [{sig.category}]
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← Terug naar casus
              </button>

              <button
                disabled={selectedSignalIds.length < 2}
                onClick={() => setCurrentStep(3)}
                className={`py-3 px-6 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  selectedSignalIds.length >= 2
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>
                  {selectedSignalIds.length >= 2
                    ? `Volgende: Hypothesen vormen (${selectedSignalIds.length} geselecteerd)`
                    : neededSignals === 1
                    ? 'Selecteer nog 1 signaal'
                    : 'Selecteer nog minimaal 2 signalen'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* FASE 3: HYPOTHESE-DENKEN (MAXIMAAL 2 SELECTEREN) */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Welke mogelijke verklaringen verdienen volgens jou aandacht?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Selecteer maximaal 2 hypothesen. In de praktijk kunnen meerdere verklaringen tegelijk een rol spelen (bijv. sensorische overprikkeling én fysiek ongemak). Deze module stelt geen medische diagnose, maar helpt methodisch nadenken.
              </p>
            </div>

            <div className="space-y-3">
              {availableHypotheses.map((hyp) => {
                const isSelected = selectedHypothesisIds.includes(hyp.id);
                const isPrimary = primaryHypothesisId === hyp.id;

                return (
                  <div
                    key={hyp.id}
                    className={`w-full p-4 rounded-xl text-left transition-all border-0 shadow-2xs ${
                      isSelected
                        ? 'bg-blue-50 ring-2 ring-blue-600 text-blue-950'
                        : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleHypothesis(hyp.id)}
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 cursor-pointer ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <div className="flex-1 cursor-pointer" onClick={() => handleToggleHypothesis(hyp.id)}>
                        <p className="text-xs sm:text-sm font-semibold">{hyp.label}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{hyp.explanation}</p>
                      </div>
                    </div>

                    {/* Primary designation if selected */}
                    {isSelected && selectedHypothesisIds.length > 1 && (
                      <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-blue-800">
                          {isPrimary ? '★ Als eerste te onderzoeken' : 'Secundaire hypothese'}
                        </span>
                        {!isPrimary && (
                          <button
                            type="button"
                            onClick={() => setPrimaryHypothesisId(hyp.id)}
                            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                          >
                            Markeer als eerste te onderzoeken
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← Terug naar signalen
              </button>

              <button
                disabled={selectedHypothesisIds.length === 0}
                onClick={() => setCurrentStep(4)}
                className={`py-3 px-6 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  selectedHypothesisIds.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Volgende: Interventie kiezen ({selectedHypothesisIds.length} geselecteerd)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* FASE 4: KIES INTERVENTIE */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Hoe handel jij nu als begeleider of verpleegkundige om te de-escaleren? Kies de beste optie:
            </p>

            <div className="space-y-4">
              {currentCase.options.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-5 rounded-2xl text-left flex items-start gap-4 transition-all cursor-pointer border-0 shadow-2xs ${
                      isSelected
                        ? 'bg-blue-50 ring-2 ring-blue-600 text-blue-950 font-medium'
                        : 'bg-slate-50/80 hover:bg-blue-50/50 text-slate-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {opt.id.replace('opt-', '')}
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← Terug naar hypothesen
              </button>

              <button
                disabled={!selectedOption}
                onClick={() => setCurrentStep(5)}
                className={`py-3 px-6 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  selectedOption
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Bekijk gevolg & feedback</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* FASE 5: EFFECT OP CLIËNT, LEERFEEDBACK & RAPPORTAGE */}
        {currentStep === 5 && selectedOption && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Effect op spanning */}
            <div className={`p-6 rounded-2xl border-0 space-y-3 ${
              selectedOption.isRecommended
                ? 'bg-blue-50/80 text-blue-950'
                : 'bg-amber-50/80 text-amber-950'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  {selectedOption.effectOnTension === 'daalt' ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-blue-600" />
                      <span>Effect op spanning cliënt: Daalt</span>
                    </>
                  ) : selectedOption.effectOnTension === 'stijgt' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                      <span>Effect op spanning cliënt: Stijgt</span>
                    </>
                  ) : (
                    <span>Effect op spanning cliënt: Blijft gelijk</span>
                  )}
                </span>
                
                {selectedOption.isRecommended ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-bold shadow-2xs">
                    Passende professionele keuze
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold shadow-2xs">
                    Minder effectieve keuze
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold font-display">
                {selectedOption.feedbackTitle}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed">
                {selectedOption.feedbackReason}
              </p>
            </div>

            {/* Inhoudelijke casus-specifieke leerfeedback */}
            {currentCase.learningFeedback && (
              <div className="p-6 bg-blue-50/50 rounded-2xl border-0 space-y-3 text-xs text-blue-950">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span>Klinische leerfeedback:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                  {currentCase.learningFeedback.signalFeedback && (
                    <div className="p-3 bg-white rounded-xl shadow-2xs space-y-1">
                      <span className="font-bold text-slate-900 block text-[11px]">Signalen & Waarneming:</span>
                      <p className="leading-relaxed">{currentCase.learningFeedback.signalFeedback}</p>
                    </div>
                  )}
                  {currentCase.learningFeedback.hypothesisFeedback && (
                    <div className="p-3 bg-white rounded-xl shadow-2xs space-y-1">
                      <span className="font-bold text-slate-900 block text-[11px]">Hypothesevorming:</span>
                      <p className="leading-relaxed">{currentCase.learningFeedback.hypothesisFeedback}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Diepere theoriekoppeling */}
            <div className="p-6 bg-slate-50/80 rounded-2xl border-0 space-y-2 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide">
                Waarom werkt dit zo in de hersenen? (Onderbouwing):
              </span>
              <p className="leading-relaxed">
                {currentCase.deepDiveNote}
              </p>
            </div>

            {/* Oefen een beknopte SBAR of SOAP overdracht (data-driven) */}
            <div className="bg-slate-50/60 rounded-2xl p-6 border-0 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Oefen jouw rapportage (SBAR / SOAP)
                </h4>
                <span className="text-[11px] text-blue-600 font-semibold">
                  Opleidingsvaardigheid
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hoe zou je dit incident en jouw interventie kort overdragen aan je collega van de volgende dienst?
              </p>
              <textarea
                rows={3}
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                placeholder="Schrijf hier jouw overdracht (S: Situatie, B: Achtergrond, A: Beoordeling, R: Aanbeveling)..."
                className="w-full p-3.5 bg-white rounded-xl text-xs border-0 shadow-xs focus:ring-2 focus:ring-blue-500/20"
              />

              {/* Deskundig voorbeeld uit currentCase */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Deskundig voorbeeld ter vergelijking:
                </span>
                <p className="font-mono text-[11px] bg-white p-3.5 rounded-xl text-slate-700 leading-relaxed shadow-2xs">
                  {currentCase.expertReportExample}
                </p>
              </div>
            </div>

            {/* Korte reflectievraag uit currentCase */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border-0 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Korte reflectie voor je portfolio:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentCase.reflectionQuestion}
              </p>
              <input
                type="text"
                value={reflectionAnswer}
                onChange={(e) => setReflectionAnswer(e.target.value)}
                placeholder="Typ jouw reflectienotitie of afspraak voor morgen..."
                className="w-full p-3 bg-slate-50/80 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
              />
            </div>

            {/* Afronding & Gecontroleerde XP Toekenning */}
            <div className="p-6 bg-slate-50/90 rounded-2xl border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-900 block">
                  Voortgangsregistratie
                </span>
                <p className="text-xs text-slate-500">
                  {isAlreadyCompleted || isCompletedInSession
                    ? 'Deze casus is succesvol voltooid in jouw profiel. XP is eenmalig toegekend.'
                    : 'Rond deze oefencasus af om 50 XP te ontvangen en op te slaan in je voortgang.'}
                </p>
              </div>

              <div>
                {isAlreadyCompleted || isCompletedInSession ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Casus voltooid ✓</span>
                  </div>
                ) : (
                  <button
                    onClick={handleCompleteFullCase}
                    className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Afronden & 50 XP claimen</span>
                  </button>
                )}
              </div>
            </div>

            {/* Navigatie aan einde van de casus */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={handleResetFlow}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Opnieuw oefenen
              </button>

              <div className="flex items-center gap-3">
                {selectedCaseIndex < CASE_STUDIES.length - 1 ? (
                  <button
                    onClick={() => handleCaseChange(selectedCaseIndex + 1)}
                    className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Volgende casus starten</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onBackToProfessional}
                    className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-blue-400" />
                    <span>Naar Professional-modus</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
