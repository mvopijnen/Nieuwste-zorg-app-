import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wind, 
  Thermometer, 
  Activity, 
  Heart, 
  Brain, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  ChevronRight, 
  PhoneCall, 
  FileText, 
  RotateCcw, 
  Pill, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { SOMATIC_TRIAGE_TOPICS } from '../../data/somaticTriage';
import { SomaticTriageTopic, UrgencyLevel, CareSector } from '../../types';

interface SomaticTriageFlowProps {
  initialTopic?: SomaticTriageTopic | null;
  onBack: () => void;
  onOpenSbar: (topic: SomaticTriageTopic, urgency: UrgencyLevel, answersSummary: string) => void;
  activeSector: CareSector;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Wind,
  Thermometer,
  Activity,
  Heart,
  Brain,
  Stethoscope
};

export const SomaticTriageFlow: React.FC<SomaticTriageFlowProps> = ({
  initialTopic,
  onBack,
  onOpenSbar,
  activeSector
}) => {
  const [selectedTopic, setSelectedTopic] = useState<SomaticTriageTopic | null>(initialTopic || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [givenAnswers, setGivenAnswers] = useState<{ question: string; answerText: string; urgency: UrgencyLevel }[]>([]);
  const [triageFinished, setTriageFinished] = useState(false);

  // Medication high risk check
  const [highRiskMeds, setHighRiskMeds] = useState<string[]>([]);

  const handleSelectTopic = (topic: SomaticTriageTopic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setGivenAnswers([]);
    setTriageFinished(false);
  };

  const handleAnswer = (optionIndex: number) => {
    if (!selectedTopic) return;
    const q = selectedTopic.triageQuestions[currentQuestionIndex];
    const option = q.options[optionIndex];

    const newAnswers = [
      ...givenAnswers,
      {
        question: q.question,
        answerText: option.text,
        urgency: option.urgency
      }
    ];
    setGivenAnswers(newAnswers);
    setSelectedAnswerIndex(optionIndex);

    // If red flag or last question, finish triage
    if (option.isRedFlag || currentQuestionIndex >= selectedTopic.triageQuestions.length - 1) {
      setTriageFinished(true);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswerIndex(null);
      }, 300);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setGivenAnswers([]);
    setTriageFinished(false);
  };

  // Determine highest urgency among answers
  const highestUrgency: UrgencyLevel = givenAnswers.reduce<UrgencyLevel>((acc, curr) => {
    const priorityOrder: Record<UrgencyLevel, number> = { U1: 5, U2: 4, U3: 3, U4: 2, U5: 1 };
    return priorityOrder[curr.urgency] > priorityOrder[acc] ? curr.urgency : acc;
  }, selectedTopic?.primaryUrgency || 'U3');

  // Topic selector view if none selected
  if (!selectedTopic) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
            <Stethoscope className="w-4 h-4 text-rose-600" />
            <span>Klinische Symptoomtriage & Beslisbomen</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Wat zijn de lichamelijke klachten?
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Selecteer een somatisch symptoom. De app vraagt logisch door via klinische beslisbomen om de juiste urgentie (U1 t/m U5) te bepalen volgens de Nederlandse Triage Standaard (NTS).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOMATIC_TRIAGE_TOPICS.map((topic) => {
            const IconComponent = ICON_MAP[topic.icon] || Stethoscope;
            return (
              <div
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center transition-transform group-hover:scale-105">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Basis: {topic.primaryUrgency}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors font-display">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {topic.shortDescription}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    Symptomen: {topic.typicalSymptoms.slice(0, 2).join(' · ')}...
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-teal-700">
                  <span>Start beslisboom</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active question in decision tree
  const activeQuestion = selectedTopic.triageQuestions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSelectedTopic(null)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Andere klacht kiezen</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700">{selectedTopic.title.split(' ')[0]}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">Sector: {activeSector}</span>
        </div>
      </div>

      {/* Decision Tree Container */}
      {!triageFinished ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Stepper info */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal-700">
              <span>Beslisboom Vraag {currentQuestionIndex + 1} van {selectedTopic.triageQuestions.length}</span>
              <span>Klinisch doorvragen</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
              {activeQuestion.question}
            </h2>
            {activeQuestion.description && (
              <p className="text-xs text-slate-500 mt-1">
                {activeQuestion.description}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {activeQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswerIndex === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600'
                      : option.isRedFlag
                      ? 'border-rose-200 hover:border-rose-400 bg-rose-50/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    option.urgency === 'U1'
                      ? 'bg-rose-600 text-white'
                      : option.urgency === 'U2'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {option.urgency}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      {option.text}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Directe actie: {option.actionSnippet}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Critical Red Flags Reminder */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Let op absolute alarmsignalen bij {selectedTopic.title}:</span>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc pl-4">
              {selectedTopic.criticalRedFlags.slice(0, 3).map((flag, i) => (
                <li key={i}>{flag}</li>
              ))}
            </ul>
          </div>

        </div>
      ) : (
        /* TRIAGE OUTCOME & CONCLUSION */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Triage Resultaat volgens NTS / NHG
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-display mt-0.5">
                {selectedTopic.title}
              </h2>
            </div>

            {/* Urgency Badge */}
            <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 text-white font-bold text-sm shadow-xs ${
              highestUrgency === 'U1' ? 'bg-rose-600' : highestUrgency === 'U2' ? 'bg-amber-600' : highestUrgency === 'U3' ? 'bg-yellow-600' : 'bg-emerald-600'
            }`}>
              <ShieldAlert className="w-5 h-5" />
              <span>Urgentie: {highestUrgency}</span>
            </div>
          </div>

          {/* Action Protocol according to Urgency */}
          <div className={`p-5 rounded-2xl border space-y-3 ${
            highestUrgency === 'U1'
              ? 'bg-rose-50 border-rose-300 text-rose-950'
              : highestUrgency === 'U2'
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-teal-50 border-teal-200 text-teal-950'
          }`}>
            <h3 className="font-bold text-sm uppercase tracking-wide">
              {highestUrgency === 'U1' && '🚨 U1: ACUUT LEVENSGEVAAR - DIRECT 112'}
              {highestUrgency === 'U2' && '⚠️ U2: SPOED - BEOORDELING BINNEN 1 UUR'}
              {highestUrgency === 'U3' && '⏱️ U3: DRINGEND - BEOORDELING BINNEN ENKELE UREN'}
              {highestUrgency === 'U4' && '📅 U4: ROUTINE - VOLGENDE WERKDAG'}
              {highestUrgency === 'U5' && '✅ U5: ZELFZORG / VERPLEEGKUNDIG OBSERVEREN'}
            </h3>

            <p className="text-xs leading-relaxed font-medium">
              {highestUrgency === 'U1' && 'Bel direct 112. Vraag om een ambulance met A-urgentie. Blijf onafgebroken bij de cliënt, controleer continu de vitale functies (ABCDE) en houd de AED gereed.'}
              {highestUrgency === 'U2' && 'Schakel direct de dienstdoende arts of Huisartsenpost (HAP) in. Deze situatie mag niet wachten tot de volgende ochtend. Meet alle vitale functies voor de overdracht.'}
              {highestUrgency === 'U3' && 'Overleg vandaag met de behandelend arts / huisarts. Start een observatielijst in het ECD (vocht, tensie, temperatuur).'}
              {highestUrgency === 'U4' && 'Regulier overleg met de arts tijdens de volgende dienst of visite. Documenteer in de rapportage.'}
              {highestUrgency === 'U5' && 'Geen acute medische indicatie. Voer verpleegkundige interventies uit (rust, drinken, geruststellen).'}
            </p>

            {highestUrgency === 'U1' && (
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Bel 112 (Meldkamer)</span>
              </a>
            )}
          </div>

          {/* Given Answers Audit Trail */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Vastgelegde Beoordelingsstappen:
            </h4>
            <div className="space-y-1.5">
              {givenAnswers.map((ans, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-slate-700 block">{ans.question}</span>
                    <span className="text-slate-900 mt-0.5 block">{ans.answerText}</span>
                  </div>
                  <span className="font-bold text-[11px] bg-slate-200 px-2 py-0.5 rounded text-slate-800 shrink-0">
                    {ans.urgency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traceable Guidelines & Sources */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <BookOpen className="w-4 h-4 text-teal-700" />
              <span>Onderliggende Professionele Richtlijnen & Protocollen:</span>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              {selectedTopic.guidelines.map((g, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span><strong>{g.organization}</strong>: {g.title} ({g.lastUpdated})</span>
                  <span className="text-teal-700 font-semibold">{g.summary}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions: Export to SBAR / Copy / Reset */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto py-2.5 px-4 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Beslisboom opnieuw doorlopen</span>
            </button>

            <button
              onClick={() => {
                const summary = givenAnswers.map(a => `${a.question}: ${a.answerText}`).join('\n');
                onOpenSbar(selectedTopic, highestUrgency, summary);
              }}
              className="w-full sm:w-auto py-2.5 px-5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Genereer SBAR Overdracht voor Arts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
