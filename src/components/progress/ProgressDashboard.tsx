import React from 'react';
import { 
  Award, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { UserProgressState, HealthcareDomain } from '../../types';
import { BADGES } from '../../data/badges';
import { LEVEL_TIERS } from '../../services/storage';

interface ProgressDashboardProps {
  progress: UserProgressState;
  onNavigateTab: (tab: string) => void;
  onSelectBadgeTab: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onNavigateTab,
  onSelectBadgeTab
}) => {
  // Find current and next level tier
  const currentTier = LEVEL_TIERS.find(t => t.level === progress.level) || LEVEL_TIERS[0];
  const nextTier = LEVEL_TIERS.find(t => t.level === progress.level + 1);

  const xpInCurrentTier = progress.xp - currentTier.minXp;
  const xpNeededForNext = nextTier ? nextTier.minXp - currentTier.minXp : 100;
  const tierProgressPercent = nextTier 
    ? Math.min(100, Math.round((xpInCurrentTier / xpNeededForNext) * 100))
    : 100;

  const domainList: { domain: HealthcareDomain; label: string }[] = [
    { domain: 'De-escalatie', label: 'De-escalatie & Emoties' },
    { domain: 'LVB', label: 'Licht Verstandelijke Beperking' },
    { domain: 'Autisme', label: 'Autisme & Prikkels' },
    { domain: 'GGZ', label: 'GGZ & Psychiatrie' },
    { domain: 'Communicatie', label: 'Communicatie & Presentie' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Hero Profile */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl font-display shadow-md">
              Level {progress.level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
                  Professionele Voortgang
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{progress.streakDays} dagen streak</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 font-display mt-0.5">
                {progress.levelTitle}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Totaal: <strong>{progress.xp} XP</strong> verdiend met casussen en praktijksituaties
              </p>
            </div>
          </div>

          {/* Quick summary metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center min-w-[90px]">
              <span className="text-xl font-bold text-slate-900 font-display tabular-nums">
                {progress.completedSituations.length}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Situaties</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center min-w-[90px]">
              <span className="text-xl font-bold text-slate-900 font-display tabular-nums">
                {progress.completedCases.length}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Casussen</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center min-w-[90px]">
              <span className="text-xl font-bold text-teal-700 font-display tabular-nums">
                {progress.unlockedBadgeIds.length}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Badges</p>
            </div>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Level {progress.level}: {currentTier.title}</span>
            <span>
              {nextTier ? `${xpInCurrentTier} / ${xpNeededForNext} XP tot Level ${nextTier.level}` : 'Hoogste rang behaald!'}
            </span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-500"
              style={{ width: `${tierProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Two Column Grid: Kennisgebieden vs Badges & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Kennisgebieden (Domain Proficiency) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Voortgang per Kennisgebied
              </h2>
            </div>
            <span className="text-xs text-slate-400">Gebaseerd op oefeningen</span>
          </div>

          <div className="space-y-4">
            {domainList.map(({ domain, label }) => {
              const score = progress.domainProficiency[domain] || 40;
              return (
                <div key={domain} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{label}</span>
                    <span className="font-bold text-slate-900 tabular-nums">{score}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        score >= 70
                          ? 'bg-emerald-500'
                          : score >= 50
                          ? 'bg-teal-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('learn')}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <span>Verhoog kennis via de praktijkacademie</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Badges Showcase & Recent Activities */}
        <div className="space-y-6">
          
          {/* Badges preview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Behaalde Badges
                </h2>
              </div>
              <button
                onClick={onSelectBadgeTab}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                Bekijk alle ({BADGES.length})
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BADGES.slice(0, 4).map((b) => {
                const isUnlocked = progress.unlockedBadgeIds.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isUnlocked
                        ? 'border-amber-200 bg-amber-50/50'
                        : 'border-slate-150 bg-slate-50/60 opacity-50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center mb-1.5 ${
                      isUnlocked ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {b.title}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {isUnlocked ? 'Behaald' : 'Vergrendeld'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Recente Activiteit
            </h3>
            <div className="space-y-2">
              {progress.recentActivity.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900">{act.title}</p>
                      <p className="text-[11px] text-slate-400">{act.timestamp}</p>
                    </div>
                  </div>
                  <span className="font-bold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded shrink-0">
                    +{act.xpEarned} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
