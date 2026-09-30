import React, { useState } from 'react';
import { 
  GraduationCap, 
  HelpCircle, 
  Sparkles, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Brain, 
  Flame, 
  ShieldCheck, 
  BookOpen 
} from 'lucide-react';
import { CASE_STUDIES } from '../../data/cases';
import { QUIZZES } from '../../data/quizzes';
import { BADGES } from '../../data/badges';
import { CaseStudy, Quiz, UserProgressState } from '../../types';

interface LearningHubProps {
  progress: UserProgressState;
  onSelectCase: (caseStudy: CaseStudy) => void;
  onSelectQuiz: (quiz: Quiz) => void;
}

export const LearningHub: React.FC<LearningHubProps> = ({
  progress,
  onSelectCase,
  onSelectQuiz
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'cases' | 'quizzes' | 'badges'>('cases');

  return (
    <div className="space-y-6">
      
      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-2">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>Praktijkacademie & Scenariotraining</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display text-balance">
            Oefenen met realistische casussen
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Versterk je professionele intuïtie. Kies een casus of quiz, maak keuzes en ontdek direct waarom bepaalde interventies spanning breken of juist verhogen.
          </p>
        </div>

        {/* Daily Challenge Card */}
        <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Flame className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                  Dagelijkse Praktijkuitdaging
                </span>
                <span className="text-[11px] font-semibold bg-teal-200/60 text-teal-900 px-2 py-0.2 rounded">
                  +50 Bonus XP
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-0.5">
                Onrust bij Sam (LVB en Prikkels)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Herken sensorische overbelasting en de-escaleer zonder cognitieve overvraging.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectCase(CASE_STUDIES[0])}
            className="w-full sm:w-auto py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
          >
            <span>Start uitdaging</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Segmented Control / Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 max-w-md">
        <button
          onClick={() => setActiveSubTab('cases')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === 'cases'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Praktijkcasussen ({CASE_STUDIES.length})
        </button>
        <button
          onClick={() => setActiveSubTab('quizzes')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === 'quizzes'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kennisquizzen ({QUIZZES.length})
        </button>
        <button
          onClick={() => setActiveSubTab('badges')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === 'badges'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Badges ({progress.unlockedBadgeIds.length}/{BADGES.length})
        </button>
      </div>

      {/* TAB 1: Casussen */}
      {activeSubTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASE_STUDIES.map((c) => {
            const isCompleted = progress.completedCases.includes(c.id);

            return (
              <div
                key={c.id}
                onClick={() => onSelectCase(c)}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium">{c.domain} · {c.targetGroup.split('&')[0]}</span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Voltooid</span>
                      </span>
                    ) : (
                      <span className="text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded">
                        +50 XP
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    "{c.vignette}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>4 antwoordopties met feedback</span>
                  </div>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{isCompleted ? 'Opnieuw spelen' : 'Start casus'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Quizzen */}
      {activeSubTab === 'quizzes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUIZZES.map((quiz) => {
            const isCompleted = progress.completedQuizzes.includes(quiz.id);

            return (
              <div
                key={quiz.id}
                onClick={() => onSelectQuiz(quiz)}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium">Domein: {quiz.domain}</span>
                    <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded">
                      +{quiz.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                  <span className="text-slate-500">{quiz.questions.length} meerkeuzevragen</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{isCompleted ? 'Opnieuw proberen' : 'Start quiz'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: Badges */}
      {activeSubTab === 'badges' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Jouw Expert Badges
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Verdien badges door situaties te bestuderen, casussen op te lossen en quizzes te voltooien.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BADGES.map((badge) => {
              const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'border-amber-200 bg-amber-50/40 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">{badge.title}</h4>
                        {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {badge.description}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2">
                        {isUnlocked ? 'Ontgrendeld!' : `Doel: ${badge.requiredXpOrAction}`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
