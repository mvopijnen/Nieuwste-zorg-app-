import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  Award, 
  Sparkles, 
  BookOpen, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { CaseStudy, CaseOption } from '../../types';

interface CaseStudyViewerProps {
  caseStudy: CaseStudy;
  onBack: () => void;
  onCompleteCase: (caseId: string, xpEarned: number) => void;
  onNextCase?: () => void;
}

export const CaseStudyViewer: React.FC<CaseStudyViewerProps> = ({
  caseStudy,
  onBack,
  onCompleteCase,
  onNextCase
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const selectedOption = caseStudy.options.find(o => o.id === selectedOptionId);

  const handleSubmitChoice = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);
    onCompleteCase(caseStudy.id, selectedOption.xpReward);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Terug naar Leeromgeving</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Domein: {caseStudy.domain}</span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
            +50 XP te verdienen
          </span>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Interactieve Praktijkcasus
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
            {caseStudy.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Doelgroep: {caseStudy.targetGroup}
          </p>
        </div>

        {/* Context box */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600">
          <strong className="text-slate-800">Situatieschets:</strong> {caseStudy.context}
        </div>

        {/* Vignette Narrative */}
        <div className="p-5 bg-teal-50/30 border border-teal-200/60 rounded-2xl text-slate-800 text-sm leading-relaxed font-normal">
          <p className="italic">
            "{caseStudy.vignette}"
          </p>
        </div>

        {/* Learning Goal */}
        <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
          <BookOpen className="w-4 h-4 text-teal-600 shrink-0" />
          <span><strong>Leerdoel:</strong> {caseStudy.learningObjective}</span>
        </div>
      </div>

      {/* Options Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          Wat is jouw reactie als zorgprofessional?
        </h3>

        <div className="space-y-3">
          {caseStudy.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D

            return (
              <button
                key={option.id}
                type="button"
                disabled={hasSubmitted}
                onClick={() => setSelectedOptionId(option.id)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                  hasSubmitted && option.isRecommended
                    ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500'
                    : hasSubmitted && isSelected && !option.isRecommended
                    ? 'border-rose-400 bg-rose-50/70'
                    : isSelected
                    ? 'border-teal-600 bg-teal-50/60 ring-1 ring-teal-600 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                } ${hasSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  hasSubmitted && option.isRecommended
                    ? 'bg-emerald-600 text-white'
                    : hasSubmitted && isSelected && !option.isRecommended
                    ? 'bg-rose-600 text-white'
                    : isSelected
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {letter}
                </div>

                <div className="flex-1 text-sm text-slate-800 leading-snug">
                  {option.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        {!hasSubmitted && (
          <div className="pt-2">
            <button
              onClick={handleSubmitChoice}
              disabled={!selectedOptionId}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                selectedOptionId
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Bevestig jouw keuze</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* In-depth Pedagogical Feedback Block */}
      {hasSubmitted && selectedOption && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedOption.isRecommended
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {selectedOption.isRecommended ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <AlertCircle className="w-6 h-6" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pedagogische Feedback
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {selectedOption.feedbackTitle}
                </h3>
              </div>
            </div>

            {/* Tension indicator */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 ${
              selectedOption.effectOnTension === 'daalt'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : selectedOption.effectOnTension === 'stijgt'
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-slate-100 text-slate-700'
            }`}>
              {selectedOption.effectOnTension === 'daalt' && <TrendingDown className="w-4 h-4" />}
              {selectedOption.effectOnTension === 'stijgt' && <TrendingUp className="w-4 h-4" />}
              {selectedOption.effectOnTension === 'gelijk' && <Minus className="w-4 h-4" />}
              <span>Spanning {selectedOption.effectOnTension}</span>
            </div>
          </div>

          <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {selectedOption.feedbackReason}
          </div>

          {/* Deep dive theory */}
          <div className="p-4 bg-teal-50/50 border border-teal-200/70 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Praktijkinzicht & Theorie</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {caseStudy.deepDiveNote}
            </p>
          </div>

          {/* Reward and Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl w-full sm:w-auto">
              <Award className="w-4 h-4 text-amber-600" />
              <span>+{selectedOption.xpReward} XP toegevoegd aan jouw profiel!</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleReset}
                className="flex-1 sm:flex-initial px-3.5 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Andere optie proberen</span>
              </button>

              {onNextCase && (
                <button
                  onClick={onNextCase}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Volgende casus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
