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
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { SOMATIC_TRIAGE_TOPICS } from '../../data/somaticTriage';
import { SomaticTriageTopic, UrgencyLevel, CareSector, ClinicalDecisionTrace } from '../../types';

interface SomaticTriageFlowProps {
  initialTopic?: SomaticTriageTopic | null;
  onBack: () => void;
  onOpenSbar: (topic: SomaticTriageTopic, urgency: UrgencyLevel, answersSummary: string) => void;
  activeSector: CareSector;
  isStudentMode?: boolean;
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
  activeSector,
  isStudentMode = false
}) => {
  const [selectedTopic, setSelectedTopic] = useState<SomaticTriageTopic | null>(initialTopic || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [givenAnswers, setGivenAnswers] = useState<{ question: string; answerText: string; urgency: UrgencyLevel }[]>([]);
  const [triageFinished, setTriageFinished] = useState(false);
  const [showWhyReasoning, setShowWhyReasoning] = useState(false);

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
      <div className="space-y-8 sm:space-y-10">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-2">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            <span>Klinische Symptoomtriage & Beslisbomen</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display leading-snug">
            Wat zijn de lichamelijke klachten?
          </h1>
          <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">
            Selecteer een somatisch symptoom. De app vraagt logisch door via klinische beslisbomen om de juiste urgentie (U1 t/m U5) te bepalen volgens de Nederlandse Triage Standaard (NTS).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOMATIC_TRIAGE_TOPICS.map((topic) => {
            const IconComponent = ICON_MAP[topic.icon] || Stethoscope;
            return (
              <div
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className="bg-white rounded-2xl p-7 shadow-[0_2px_16px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_26px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group border-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-105">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md">
                      Basis: {topic.primaryUrgency}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors font-display">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {topic.shortDescription}
                  </p>

                  <div className="mt-4 text-[11px] text-slate-400">
                    Symptomen: {topic.typicalSymptoms.slice(0, 2).join(' · ')}...
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-800">
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
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-7">
          
          {/* Stepper info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-700">
              <span>Beslisboom Vraag {currentQuestionIndex + 1} van {selectedTopic.triageQuestions.length}</span>
              <span>Klinisch doorvragen</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {activeQuestion.question}
            </h2>
            {activeQuestion.description && (
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {activeQuestion.description}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3.5">
            {activeQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswerIndex === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-5 rounded-2xl text-left flex items-start gap-4 transition-all cursor-pointer shadow-xs border-0 ${
                    isSelected
                      ? 'bg-blue-50 ring-2 ring-blue-600 text-blue-950'
                      : option.isRedFlag
                      ? 'bg-rose-50/40 hover:bg-rose-50/70 text-slate-900'
                      : 'bg-slate-50/80 hover:bg-blue-50/60 text-slate-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    option.urgency === 'U1'
                      ? 'bg-rose-600 text-white'
                      : option.urgency === 'U2'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-slate-700 shadow-2xs'
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
          <div className="p-6 bg-slate-50/80 rounded-2xl border-0 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Let op absolute alarmsignalen bij {selectedTopic.title}:</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
              {selectedTopic.criticalRedFlags.slice(0, 3).map((flag, i) => (
                <li key={i}>{flag}</li>
              ))}
            </ul>
          </div>

        </div>
      ) : (
        /* TRIAGE OUTCOME & CONCLUSION */
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-7 animate-in fade-in">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
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
              highestUrgency === 'U1' ? 'bg-rose-600' : highestUrgency === 'U2' ? 'bg-amber-600' : highestUrgency === 'U3' ? 'bg-yellow-600' : 'bg-blue-600'
            }`}>
              <ShieldAlert className="w-5 h-5" />
              <span>Urgentie: {highestUrgency}</span>
            </div>
          </div>

          {/* Action Protocol according to Urgency */}
          <div className={`p-6 rounded-2xl border-0 space-y-3 ${
            highestUrgency === 'U1'
              ? 'bg-rose-50/80 text-rose-950'
              : highestUrgency === 'U2'
              ? 'bg-amber-50/80 text-amber-950'
              : 'bg-blue-50/80 text-blue-950'
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
              isStudentMode ? (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-100 text-rose-950 rounded-xl text-xs font-bold border border-rose-200">
                  <PhoneCall className="w-4 h-4 text-rose-600" />
                  <span>In een echte situatie: bel direct 112 (Meldkamer)</span>
                </div>
              ) : (
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Bel 112 (Meldkamer)</span>
                </a>
              )
            )}
          </div>

          {/* Onderbouwing van dit advies (ClinicalDecisionTrace) */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShowWhyReasoning(!showWhyReasoning)}
              className="w-full py-3 px-4 bg-blue-50/80 hover:bg-blue-100/70 text-blue-900 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Onderbouwing van dit advies</span>
              </div>
              <span className="text-blue-600 underline font-semibold">
                {showWhyReasoning ? 'Inklappen' : 'Toon beslisregel & bron'}
              </span>
            </button>

            {showWhyReasoning && (() => {
              const decisionTrace: ClinicalDecisionTrace = {
                urgency: highestUrgency,
                sourceOrganization: 'Nederlandse Triage Standaard (NTS) / NHG',
                guidelineTitle: `NTS Ingangsklacht: ${selectedTopic.title}`,
                versionOrYear: 'In validatie',
                appliedDecisionRule:
                  highestUrgency === 'U1'
                    ? 'Aanwezigheid van acuut alarmsymptoom met vitale bedreiging activeert urgentie U1 (directe inzet ambulance/reanimatieteam).'
                    : highestUrgency === 'U2'
                    ? 'Aanwezigheid van ernstig of potentieel levensbedreigend signaal activeert urgentie U2 (fysieke artsbeoordeling binnen 1 uur).'
                    : highestUrgency === 'U3'
                    ? 'Dringende klacht zonder directe vitale bedreiging: artsbeoordeling binnen enkele uren (U3).'
                    : 'Geen alarmsignalen gedetecteerd: veilig verpleegkundig beleid en routinecontrole (U4/U5).',
                triggeringData: givenAnswers.map(ans => `${ans.question}: ${ans.answerText} (Urgentie: ${ans.urgency})`)
              };

              return (
                <div className="p-6 bg-slate-50/90 rounded-2xl border-0 space-y-4 text-xs text-slate-800 animate-in fade-in">
                  <div className="border-b border-slate-200/80 pb-3">
                    <span className="font-bold text-slate-900 block text-sm">
                      Klinische beslisonderbouwing voor urgentie: {decisionTrace.urgency}
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      Transparante weergave van de vaste beslisregel, bronstandaard en de invoer die deze uitkomst heeft geactiveerd.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-xl shadow-2xs">
                      <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Bronorganisatie:</span>
                      <span className="font-bold text-slate-900">{decisionTrace.sourceOrganization}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-2xs">
                      <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Richtlijn / Ingangsklacht:</span>
                      <span className="font-bold text-slate-900">{decisionTrace.guidelineTitle}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-2xs">
                      <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Status / Versie:</span>
                      <span className="font-bold text-slate-900">{decisionTrace.versionOrYear}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-2xs">
                      <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Vaste Beslisregel:</span>
                      <span className="font-bold text-slate-900">{decisionTrace.appliedDecisionRule}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl shadow-2xs space-y-1.5">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                      Geactiveerd door jouw invoer (Triggering data):
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {decisionTrace.triggeringData.map((dataItem, idx) => (
                        <li key={idx}>
                          <span className="text-slate-800">{dataItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Given Answers Audit Trail */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Vastgelegde Beoordelingsstappen:
            </h4>
            <div className="space-y-2">
              {givenAnswers.map((ans, i) => (
                <div key={i} className="p-4 bg-slate-50/80 rounded-xl text-xs flex items-start justify-between gap-3 shadow-2xs">
                  <div>
                    <span className="font-semibold text-slate-700 block">{ans.question}</span>
                    <span className="text-slate-900 mt-1 block">{ans.answerText}</span>
                  </div>
                  <span className="font-bold text-[11px] bg-white px-2 py-0.5 rounded text-slate-800 shrink-0 shadow-2xs">
                    {ans.urgency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traceable Guidelines & Sources */}
          <div className="p-6 bg-slate-50/80 rounded-2xl border-0 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>Onderliggende Professionele Richtlijnen & Protocollen:</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              {selectedTopic.guidelines.map((g, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span><strong>{g.organization}</strong>: {g.title} ({g.lastUpdated})</span>
                  <span className="text-blue-700 font-semibold">{g.summary}</span>
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
              className="w-full sm:w-auto py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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
