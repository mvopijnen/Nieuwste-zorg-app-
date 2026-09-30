import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { Quiz } from '../../types';

interface QuizViewerProps {
  quiz: Quiz;
  onBack: () => void;
  onCompleteQuiz: (quizId: string, xpEarned: number) => void;
}

export const QuizViewer: React.FC<QuizViewerProps> = ({
  quiz,
  onBack,
  onCompleteQuiz
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOptionIndex(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizFinished(true);
      const earnedXp = Math.round((correctAnswersCount / quiz.questions.length) * quiz.xpReward) || 20;
      onCompleteQuiz(quiz.id, earnedXp);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const finalScore = Math.round((correctAnswersCount / quiz.questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-5 animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Quiz Resultaat
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-display mt-1">
            {quiz.title}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Je behaalde <strong>{correctAnswersCount}</strong> van de <strong>{quiz.questions.length}</strong> vragen goed ({finalScore}% score).
          </p>
        </div>

        <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-teal-900">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span>+{quiz.xpReward} XP bijgeschreven in jouw profiel!</span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleRestart}
            className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Opnieuw proberen</span>
          </button>
          <button
            onClick={onBack}
            className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Terug naar Leeromgeving</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Terug naar Quizzen</span>
        </button>

        <div className="text-xs font-medium text-slate-500">
          Vraag {currentQuestionIndex + 1} van {quiz.questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-teal-600 transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            {quiz.domain} Kennischeck
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-display mt-1 leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrect = idx === question.correctIndex;

            let itemClass = 'border-slate-200 bg-white hover:border-slate-300';
            if (isAnswered) {
              if (isCorrect) {
                itemClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                itemClass = 'border-rose-400 bg-rose-50 text-rose-950';
              } else {
                itemClass = 'border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${itemClass} ${
                  isAnswered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isAnswered && isCorrect
                    ? 'bg-emerald-600 text-white'
                    : isAnswered && isSelected && !isCorrect
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="flex-1 text-sm leading-snug">
                  {opt}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation Card upon Answer */}
        {isAnswered && (
          <div className="p-4 rounded-2xl border bg-slate-50 border-slate-200 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              {selectedOptionIndex === question.correctIndex ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-emerald-900 text-xs">Helemaal juist!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="font-bold text-rose-900 text-xs">Niet helemaal juist.</span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next Question CTA */}
        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-[0.99] cursor-pointer"
          >
            <span>{isLastQuestion ? 'Bekijk eindresultaat' : 'Volgende vraag'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

      </div>

    </div>
  );
};
