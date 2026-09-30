import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Send, 
  Loader2, 
  Check, 
  XCircle, 
  AlertTriangle, 
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { analyzeSituationWithAi, AiAnalysisResult } from '../../services/geminiService';
import { Situation } from '../../types';

interface AiPracticeAssistantProps {
  onBack: () => void;
  onSelectSituation: (situation: Situation) => void;
}

export const AiPracticeAssistant: React.FC<AiPracticeAssistantProps> = ({
  onBack,
  onSelectSituation
}) => {
  const [observation, setObservation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiAnalysisResult | null>(null);

  const samplePrompts = [
    'Mijn cliënt met LVB loopt al 20 minuten heen en weer, houdt handen voor de oren en raakt geïrriteerd bij vragen.',
    'Cliënt gooit opeens zijn bord omver aan tafel na een drukke dag en heeft gebalde vuisten.',
    'Bewoonster sluit zich op in de kamer, praat angstig tegen onzichtbare stemmen en weigert medicatie.',
    'Cliënt ademt zeer snel, trilt over het hele lichaam en roept in paniek dat hij doodgaat.'
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = textToAnalyze || observation;
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await analyzeSituationWithAi(text);
      setResult(res);
    } catch {
      // Fallback handled in service
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (sample: string) => {
    setObservation(sample);
    handleAnalyze(sample);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Terug naar Situaties</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-medium text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>AI Praktijk-Assistent</span>
        </div>
      </div>

      {/* Main Input Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Wat zie of ervaar je op dit moment?
          </h1>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Beschrijf in je eigen woorden wat de cliënt doet of zegt. Onze AI helpt de situatie direct gestructureerd in kaart te brengen zonder medische diagnoses te stellen.
          </p>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <textarea
            rows={4}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Bijvoorbeeld: 'Mijn cliënt loopt onrustig door de gang, praat steeds harder en reageert fel als ik vraag wat er aan de hand is...'"
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-slate-400">
              Veilig & privacy-bewust: vermeld geen persoonsgegevens zoals achternamen of BSN.
            </span>

            <button
              onClick={() => handleAnalyze()}
              disabled={loading || !observation.trim()}
              className={`w-full sm:w-auto py-2.5 px-5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                loading || !observation.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs cursor-pointer active:scale-98'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Situatie analyseren...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Analyseer situatie</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Prompt Suggestions */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-700 block mb-2">
            Of kies een herkenbaar praktijkvoorbeeld:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {samplePrompts.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="p-2.5 rounded-xl border border-slate-200 text-left text-xs text-slate-700 hover:border-teal-400 hover:bg-teal-50/50 transition-all cursor-pointer leading-snug"
              >
                "{sample.slice(0, 70)}..."
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Structured Result */}
      {result && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-2">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Gestructureerd Handelingsadvies
              </h2>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              Bron: PraktijkKompas Kennismodel
            </span>
          </div>

          {/* 1. Mogelijke Verklaringen */}
          <div className="p-4 bg-teal-50/50 border border-teal-200/80 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wide">
              1. Wat zou er kunnen spelen? (Niet-diagnostisch)
            </h3>
            <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
              {result.summaryHypotheses}
            </p>
          </div>

          {/* 2. DO's and DONT's Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* DO's */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Wat kun je NU proberen?</span>
              </h3>
              <ul className="text-xs text-slate-800 space-y-2 list-disc pl-4">
                {result.directDos.map((d, i) => (
                  <li key={i} className="leading-snug">{d}</li>
                ))}
              </ul>
            </div>

            {/* DONT's */}
            <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wide flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Wat kun je beter NIET doen?</span>
              </h3>
              <ul className="text-xs text-slate-800 space-y-2 list-disc pl-4">
                {result.directDonts.map((d, i) => (
                  <li key={i} className="leading-snug">{d}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Matched Situations Cards */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Aanbevolen Kennisroutes in PraktijkKompas:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.matchedSituations.map((sit) => (
                <button
                  key={sit.id}
                  onClick={() => onSelectSituation(sit)}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-teal-500 bg-slate-50/50 hover:bg-white text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs group-hover:text-teal-700">
                      {sit.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {sit.shortDescription}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Safety Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span>{result.safetyNotice}</span>
          </div>

        </div>
      )}

    </div>
  );
};
