import React, { useState } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw, 
  BookOpen, 
  FileText, 
  TrendingDown, 
  TrendingUp, 
  UserCheck, 
  HelpCircle,
  Eye,
  Check,
  ChevronRight,
  ShieldAlert
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

  // Clinical reasoning workflow state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<CaseOption | null>(null);
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [reflectionAnswer, setReflectionAnswer] = useState<string>('');
  const [awardedXp, setAwardedXp] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Observable signals list for the current case
  const availableSignals = [
    'Loopt al 20 minuten met grote passen onrustig door de gang',
    'Houdt af en toe kort de hand tegen het linkeroor',
    'Snauwt fel en defensief naar een medebewoner',
    'Achtergrondmuziek en kookgeluiden in de nabije huiskamer',
    'Praat steeds harder binnensmonds tegen zichzelf',
    'Is rustig en zoekt direct ontspanning'
  ];

  // Hypotheses
  const availableHypotheses = [
    { id: 'hyp-1', label: 'Sensorische overprikkeling (geluid, drukte) bij beperkt werkgeheugen', isCorrect: true },
    { id: 'hyp-2', label: 'Mogelijk lichamelijk ongemak of oorpijn', isCorrect: true },
    { id: 'hyp-3', label: 'Doelbewust manipulatief of antisociaal dwarsliggen', isCorrect: false },
    { id: 'hyp-4', label: 'Acute psychotische desoriëntatie', isCorrect: false }
  ];

  const handleToggleSignal = (sig: string) => {
    if (selectedSignals.includes(sig)) {
      setSelectedSignals(selectedSignals.filter(s => s !== sig));
    } else {
      setSelectedSignals([...selectedSignals, sig]);
    }
  };

  const handleSelectOption = (opt: CaseOption) => {
    setSelectedOption(opt);
    const xp = opt.isRecommended ? 50 : 20;
    setAwardedXp(xp);
    if (onProgressUpdate) {
      const updated = StorageService.addXp(xp, `Student simulatie: ${currentCase.title}`, 'case', currentCase.domain);
      onProgressUpdate(updated);
    }
  };

  const handleResetFlow = () => {
    setCurrentStep(1);
    setSelectedSignals([]);
    setSelectedHypothesis(null);
    setSelectedOption(null);
    setStudentNotes('');
    setReflectionAnswer('');
    setIsCompleted(false);
  };

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

        {/* Fictieve Casus Marker */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px]">
              Oefencasus / Simulatie
            </span>
            <span>Uitsluitend fictieve casuïstiek voor educatieve doeleinden.</span>
          </div>

          <div className="flex items-center gap-1.5">
            {CASE_STUDIES.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCaseIndex(idx);
                  handleResetFlow();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCaseIndex === idx
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Casus {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 10-Stappen Klinisch Redeneerproces voor Studenten */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-8">
        
        {/* Step Progression Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Stap {currentStep} van 5 · Klinisch redeneermodel
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

        {/* STAP 1: OBSERVEER DE CASUS */}
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

        {/* STAP 2: SELECTEER SIGNALEN */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Lees de observatie zorgvuldig. Selecteer minimaal 2 gedragssignalen of omgevingsfactoren die relevant zijn voor je beoordeling:
            </p>

            <div className="space-y-3">
              {availableSignals.map((sig, idx) => {
                const isChecked = selectedSignals.includes(sig);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleSignal(sig)}
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
                    <span className="text-xs sm:text-sm">{sig}</span>
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
                disabled={selectedSignals.length === 0}
                onClick={() => setCurrentStep(3)}
                className={`py-3 px-6 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  selectedSignals.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Volgende: Hypothesen vormen ({selectedSignals.length} geselecteerd)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STAP 3: KIES MOGELIJKE VERKLARINGEN */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Wat is volgens jou de meest aannemelijke onderliggende oorzaak van dit gedrag?
            </p>

            <div className="space-y-3">
              {availableHypotheses.map((hyp) => {
                const isSelected = selectedHypothesis === hyp.id;
                return (
                  <button
                    key={hyp.id}
                    type="button"
                    onClick={() => setSelectedHypothesis(hyp.id)}
                    className={`w-full p-4 rounded-xl text-left flex items-start gap-3.5 transition-all cursor-pointer border-0 shadow-2xs ${
                      isSelected
                        ? 'bg-blue-50 ring-2 ring-blue-600 text-blue-950 font-medium'
                        : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs sm:text-sm">{hyp.label}</span>
                  </button>
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
                disabled={!selectedHypothesis}
                onClick={() => setCurrentStep(4)}
                className={`py-3 px-6 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                  selectedHypothesis
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Volgende: Interventie kiezen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STAP 4: KIES INTERVENTIE */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Hoe handel jij nu als begeleider/verpleegkundige om te de-escaleren? Kies de beste optie:
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

        {/* STAP 5: EFFECT OP CLIËNT, PEDAGOGISCHE FEEDBACK & SBAR OVERDRACHT */}
        {currentStep === 5 && selectedOption && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Effect op de spanning */}
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
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                      <span>Effect op spanning cliënt: Stijgt</span>
                    </>
                  )}
                </span>
                <span className="px-3 py-1 bg-white/90 rounded-lg text-xs font-bold shadow-2xs">
                  +{awardedXp} XP verdiend!
                </span>
              </div>

              <h4 className="text-base font-bold font-display">
                {selectedOption.feedbackTitle}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed">
                {selectedOption.feedbackReason}
              </p>
            </div>

            {/* Diepere theoriekoppeling */}
            <div className="p-6 bg-slate-50/80 rounded-2xl border-0 space-y-2 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide">
                Waarom werkt dit zo in de hersenen? (Onderbouwing):
              </span>
              <p className="leading-relaxed">
                {currentCase.deepDiveNote}
              </p>
            </div>

            {/* Oefen een beknopte SBAR of SOAP overdracht */}
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
                Hoe zou je dit incident en jouw interventie kort overdragen aan je collega van de nachtdienst?
              </p>
              <textarea
                rows={3}
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                placeholder="Typ hier jouw beknopte SBAR (S: Sam liep onrustig, B: LVB & prikkelgevoelig, A: Overprikkeld door kookgeluid, R: Naar buiten begeleid, rust teruggekeerd)..."
                className="w-full p-3.5 bg-white rounded-xl text-xs border-0 shadow-xs focus:ring-2 focus:ring-blue-500/20"
              />

              {/* Deskundig voorbeeld */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Deskundig voorbeeld ter vergelijking:
                </span>
                <p className="font-mono text-[11px] bg-white p-3.5 rounded-xl text-slate-700 leading-relaxed shadow-2xs">
                  S: Sam (24, LVB) vertoonde om 17:15 verbale agressie en ijsberen in gang. B: Bekend met sensorische overprikkeling tijdens kooktijd. A: Vroegtijdige escalatiefase door huiskamergeluid. R: Rustig schuin aangesproken en naar buiten begeleid. Spanning gedaald, eet rustig op kamer.
                </p>
              </div>
            </div>

            {/* Korte reflectievraag */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border-0 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Korte reflectie voor je portfolio:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wat zou je morgen vóór 17:00 uur kunnen afspreken met het team om te voorkomen dat Sam opnieuw overprikkeld raakt door kookgeluiden?
              </p>
              <input
                type="text"
                value={reflectionAnswer}
                onChange={(e) => setReflectionAnswer(e.target.value)}
                placeholder="Bijv: Koptelefoon met ruisonderdrukking aanbieden of eerder laten wandelen..."
                className="w-full p-3 bg-slate-50/80 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
              />
            </div>

            {/* Einde van de casus */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                onClick={handleResetFlow}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Opnieuw oefenen
              </button>

              <div className="flex items-center gap-3">
                {selectedCaseIndex < CASE_STUDIES.length - 1 ? (
                  <button
                    onClick={() => {
                      setSelectedCaseIndex(prev => prev + 1);
                      handleResetFlow();
                    }}
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
