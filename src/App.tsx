/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { SafetyBanner } from './components/common/SafetyBanner';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { HomeDashboard } from './components/home/HomeDashboard';
import { SituationPicker } from './components/situations/SituationPicker';
import { InteractiveSituationFlow } from './components/situations/InteractiveSituationFlow';
import { CaseStudyViewer } from './components/learning/CaseStudyViewer';
import { QuizViewer } from './components/learning/QuizViewer';
import { LearningHub } from './components/learning/LearningHub';
import { SignalingPlanBuilder } from './components/signaling/SignalingPlanBuilder';
import { ClientModeView } from './components/clientMode/ClientModeView';
import { AiPracticeAssistant } from './components/ai/AiPracticeAssistant';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
import { ProfileView } from './components/profile/ProfileView';

// Somatic Triage, ABCDE, Vitals, Reporting & Guidelines
import { SomaticTriageFlow } from './components/triage/SomaticTriageFlow';
import { AbcdeScanner } from './components/triage/AbcdeScanner';
import { VitalsChecker } from './components/vitals/VitalsChecker';
import { ClinicalReportingGenerator } from './components/reporting/ClinicalReportingGenerator';
import { SourcesViewer } from './components/sources/SourcesViewer';

import { SITUATIONS } from './data/situations';
import { CASE_STUDIES } from './data/cases';
import { StorageService, INITIAL_PROGRESS } from './services/storage';
import { 
  Situation, 
  CaseStudy, 
  Quiz, 
  UserRole, 
  UserProgressState, 
  CareSector, 
  UrgencyLevel, 
  VitalParameters,
  SomaticTriageTopic
} from './types';
import { Sparkles, Award } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState<UserRole>(() => StorageService.getUserRole());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => !StorageService.isOnboardingDone());
  const [activeSector, setActiveSector] = useState<CareSector>('GHZ');

  // Specific view states
  const [activeSituation, setActiveSituation] = useState<Situation | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);

  // SBAR preloading from Vitals / Triage / ABCDE
  const [sbarPreload, setSbarPreload] = useState<{
    situation?: string;
    background?: string;
    assessment?: string;
    recommendation?: string;
    vitalsSummary?: string;
    vitalsData?: VitalParameters;
    urgency?: UrgencyLevel;
  }>({});

  // User progress state
  const [progress, setProgress] = useState<UserProgressState>(() => StorageService.getProgress());
  const [xpToast, setXpToast] = useState<{ message: string; amount: number } | null>(null);

  const safeScrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Ignore
    }
  };

  const showToast = (message: string, amount: number) => {
    setXpToast({ message, amount });
    setTimeout(() => {
      setXpToast(null);
    }, 3500);
  };

  const handleRoleToggle = (newRole: UserRole) => {
    setRole(newRole);
    StorageService.setUserRole(newRole);
    setActiveSituation(null);
    setActiveCaseStudy(null);
    setActiveQuiz(null);
    setIsAiOpen(false);
  };

  const handleOnboardingComplete = (chosenRole: UserRole) => {
    setRole(chosenRole);
    StorageService.setUserRole(chosenRole);
    StorageService.setOnboardingDone(true);
    setShowOnboarding(false);
    
    const updated = StorageService.addXp(25, 'Welkom bij PraktijkKompas bonus', 'situation', 'LVB');
    setProgress(updated);
    showToast('Welkom bonus ontgrendeld!', 25);
  };

  const handleDismissOnboarding = () => {
    StorageService.setOnboardingDone(true);
    setShowOnboarding(false);
  };

  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    setActiveSituation(null);
    setActiveCaseStudy(null);
    setActiveQuiz(null);
    setIsAiOpen(false);
    safeScrollToTop();
  };

  const handleSelectSituation = (situation: Situation) => {
    setActiveSituation(situation);
    setActiveCaseStudy(null);
    setActiveQuiz(null);
    setIsAiOpen(false);
    safeScrollToTop();
  };

  const handleSelectCase = (caseStudy: CaseStudy) => {
    setActiveCaseStudy(caseStudy);
    setActiveSituation(null);
    setActiveQuiz(null);
    setIsAiOpen(false);
    safeScrollToTop();
  };

  const handleSelectQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setActiveSituation(null);
    setActiveCaseStudy(null);
    setIsAiOpen(false);
    safeScrollToTop();
  };

  const handleResetProgress = () => {
    StorageService.saveProgress(INITIAL_PROGRESS);
    setProgress(INITIAL_PROGRESS);
    showToast('Voortgang gereset naar beginwaarden', 0);
  };

  const handleCompleteSituationFlow = (situationId: string) => {
    const sit = SITUATIONS.find(s => s.id === situationId);
    const domain = sit?.domains[0] || 'De-escalatie';
    const updated = StorageService.markSituationComplete(situationId, domain);
    setProgress(updated);
    showToast(`Situatie '${sit?.title.split(' ')[0]}' voltooid!`, 30);
  };

  const handleCompleteCase = (caseId: string, xpGained: number) => {
    const caseObj = CASE_STUDIES.find(c => c.id === caseId);
    const domain = caseObj?.domain || 'De-escalatie';
    const updated = StorageService.markCaseComplete(caseId, domain, xpGained);
    setProgress(updated);
    showToast(`Casuskeuze geregistreerd!`, xpGained);
  };

  const handleCompleteQuiz = (quizId: string, xpGained: number) => {
    const updated = StorageService.markQuizComplete(quizId, 'De-escalatie', xpGained);
    setProgress(updated);
    showToast(`Quiz voltooid!`, xpGained);
  };

  // Callback from VitalsChecker
  const handleVitalsExportToSbar = (vitals: VitalParameters, summaryText: string, calculatedUrgency: UrgencyLevel) => {
    setSbarPreload({
      assessment: summaryText,
      vitalsSummary: summaryText,
      vitalsData: vitals,
      urgency: calculatedUrgency
    });
    setActiveTab('reporting');
    safeScrollToTop();
    showToast('Meetwaarden ingeladen in SBAR overdracht!', 15);
  };

  // Callback from AbcdeScanner
  const handleAbcdeExportToSbar = (abcdeSummary: string, calculatedUrgency: UrgencyLevel) => {
    setSbarPreload(prev => ({
      ...prev,
      assessment: `${prev.assessment ? prev.assessment + '\n\n' : ''}${abcdeSummary}`,
      urgency: calculatedUrgency
    }));
    setActiveTab('reporting');
    safeScrollToTop();
    showToast('ABCDE beoordeling ingeladen in SBAR!', 15);
  };

  // Callback from SomaticTriageFlow
  const handleTriageExportToSbar = (topic: SomaticTriageTopic, urgency: UrgencyLevel, answersSummary: string) => {
    setSbarPreload({
      situation: `Verdenking ${topic.title} bij cliënt. Acute klachten conform triage: ${topic.shortDescription}`,
      background: topic.sbarTemplate.background,
      assessment: answersSummary,
      recommendation: topic.sbarTemplate.recommendation,
      urgency
    });
    setActiveTab('reporting');
    safeScrollToTop();
    showToast('Triage-uitkomst overgedragen naar SBAR!', 20);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans">
      
      {/* Top Bar (One-row 3-zone contract) */}
      <Header
        currentRole={role}
        onRoleToggle={handleRoleToggle}
        progress={progress}
        onNavigateTab={handleNavigateTab}
        activeTab={activeTab}
      />

      {/* Safety & Protocol Banner */}
      <SafetyBanner />

      {/* Main Content Viewport with generous white space */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 sm:px-8 py-8 sm:py-10 pb-32 md:pb-20">
        
        {/* CLIENT MODE */}
        {role === 'client' ? (
          <ClientModeView
            onBackToProfessional={() => handleRoleToggle('professional')}
          />
        ) : (
          /* PROFESSIONAL / CLINICAL VIEWS */
          <>
            {/* 1. Subview: AI Assistant */}
            {isAiOpen && (
              <AiPracticeAssistant
                onBack={() => setIsAiOpen(false)}
                onSelectSituation={(sit) => {
                  setIsAiOpen(false);
                  handleSelectSituation(sit);
                }}
              />
            )}

            {/* 2. Subview: Interactive Situation Flow (8 steps) */}
            {!isAiOpen && activeSituation && (
              <InteractiveSituationFlow
                situation={activeSituation}
                onBack={() => setActiveSituation(null)}
                onCompleteFlow={handleCompleteSituationFlow}
                onLaunchCase={(caseId) => {
                  const targetCase = CASE_STUDIES.find(c => c.id === caseId);
                  if (targetCase) {
                    handleSelectCase(targetCase);
                  }
                }}
                relatedCase={CASE_STUDIES.find(c => c.id === activeSituation.recommendedCaseId)}
              />
            )}

            {/* 3. Subview: Interactive Case Study */}
            {!isAiOpen && !activeSituation && activeCaseStudy && (
              <CaseStudyViewer
                caseStudy={activeCaseStudy}
                onBack={() => setActiveCaseStudy(null)}
                onCompleteCase={handleCompleteCase}
                onNextCase={() => {
                  const currentIndex = CASE_STUDIES.findIndex(c => c.id === activeCaseStudy.id);
                  const nextCase = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];
                  setActiveCaseStudy(nextCase);
                }}
              />
            )}

            {/* 4. Subview: Interactive Quiz */}
            {!isAiOpen && !activeSituation && !activeCaseStudy && activeQuiz && (
              <QuizViewer
                quiz={activeQuiz}
                onBack={() => setActiveQuiz(null)}
                onCompleteQuiz={handleCompleteQuiz}
              />
            )}

            {/* PRIMARY TABS (when no subview is open) */}
            {!isAiOpen && !activeSituation && !activeCaseStudy && !activeQuiz && (
              <>
                {/* 1. Home Dashboard */}
                {activeTab === 'home' && (
                  <HomeDashboard
                    onNavigateTab={handleNavigateTab}
                    onSelectSituation={handleSelectSituation}
                    onSelectCase={handleSelectCase}
                    onOpenAiAssistant={() => setIsAiOpen(true)}
                    onRoleToggle={handleRoleToggle}
                    progress={progress}
                    activeSector={activeSector}
                    onSectorChange={setActiveSector}
                  />
                )}

                {/* 2. Somatische Symptoomtriage (Beslisbomen) */}
                {activeTab === 'triage' && (
                  <SomaticTriageFlow
                    onBack={() => handleNavigateTab('home')}
                    onOpenSbar={handleTriageExportToSbar}
                    activeSector={activeSector}
                  />
                )}

                {/* 3. ABCDE & Meetwaarden */}
                {activeTab === 'abcde' && (
                  <div className="space-y-8">
                    <AbcdeScanner
                      onExportToSbar={handleAbcdeExportToSbar}
                    />
                    <div className="pt-6 border-t border-slate-200">
                      <VitalsChecker
                        onExportToSbar={handleVitalsExportToSbar}
                      />
                    </div>
                  </div>
                )}

                {/* 4. Vitals direct */}
                {activeTab === 'vitals' && (
                  <VitalsChecker
                    onExportToSbar={handleVitalsExportToSbar}
                  />
                )}

                {/* 5. Gedrag & GGZ Situaties */}
                {activeTab === 'situations' && (
                  <SituationPicker
                    onSelectSituation={handleSelectSituation}
                    onOpenAiAssistant={() => setIsAiOpen(true)}
                  />
                )}

                {/* 6. Rapportage: SBAR, SOAP & TIME */}
                {activeTab === 'reporting' && (
                  <ClinicalReportingGenerator
                    initialSbar={sbarPreload}
                    vitalsSummary={sbarPreload.vitalsSummary}
                    initialUrgency={sbarPreload.urgency || 'U2'}
                  />
                )}

                {/* 7. Leren & Casussen */}
                {activeTab === 'learn' && (
                  <LearningHub
                    progress={progress}
                    onSelectCase={handleSelectCase}
                    onSelectQuiz={handleSelectQuiz}
                  />
                )}

                {/* 8. Persoonlijk Signaleringsplan */}
                {activeTab === 'signaling' && (
                  <SignalingPlanBuilder />
                )}

                {/* 9. Voortgang & Gamification */}
                {activeTab === 'progress' && (
                  <ProgressDashboard
                    progress={progress}
                    onNavigateTab={handleNavigateTab}
                    onSelectBadgeTab={() => {
                      setActiveTab('learn');
                    }}
                  />
                )}

                {/* 10. Richtlijnen, AI-veiligheid & Verdienmodel */}
                {activeTab === 'sources' && (
                  <SourcesViewer />
                )}

                {/* 11. Gebruikersprofiel & Instellingen */}
                {activeTab === 'profile' && (
                  <ProfileView
                    currentRole={role}
                    onRoleToggle={handleRoleToggle}
                    onRestartOnboarding={() => setShowOnboarding(true)}
                    onResetProgress={handleResetProgress}
                  />
                )}
              </>
            )}
          </>
        )}

      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (role === 'client') {
            setRole('professional');
          }
          handleNavigateTab(tab);
        }}
      />

      {/* Rustige statusnotificatie */}
      {xpToast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-100">{xpToast.message}</p>
            {xpToast.amount > 0 && (
              <p className="text-[11px] text-blue-300 font-semibold">+{xpToast.amount} XP geregistreerd</p>
            )}
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onDismiss={handleDismissOnboarding}
        />
      )}

    </div>
  );
}
