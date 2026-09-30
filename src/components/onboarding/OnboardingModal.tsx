import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, Shield, Heart, ArrowRight, X } from 'lucide-react';
import { UserRole } from '../../types';

interface OnboardingModalProps {
  onComplete: (role: UserRole) => void;
  onDismiss?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete, onDismiss }) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>('professional');
  const [selectedDomain, setSelectedDomain] = useState<string>('LVB');

  const handleFinish = () => {
    onComplete(selectedRole);
  };

  const handleClose = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      onComplete(selectedRole);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Sluit introductie"
          title="Direct naar app"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Progress Header */}
        <div className="h-1.5 bg-slate-100 w-full">
          <div 
            className="h-full bg-teal-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          
          {step === 1 && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Welkom bij PraktijkKompas
                </h2>
                <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                  Jouw interactieve digitale praktijkcoach voor de GGZ, LVB-zorg, gehandicaptenzorg en het sociaal domein.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>De centrale vraag van deze app:</span>
                </div>
                <p className="text-teal-900 font-medium italic text-sm">
                  “Wat speelt er en wat kan ik nu doen?”
                </p>
                <p className="text-slate-600">
                  Geen stoffige protocollenmap of medische diagnoses, maar stap voor stap ontdekken, de-escaleren en leren via interactieve casussen.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.99] cursor-pointer"
                >
                  <span>Aan de slag (Rondleiding)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Direct naar het dashboard overslaan →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Hoe wil je PraktijkKompas gebruiken?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Je kunt op elk gewenst moment tussen de modi wisselen via de menubalk.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('professional')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                    selectedRole === 'professional'
                      ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Professionalmodus</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Voor begeleiders, verpleegkundigen, agogen en sociaal werkers. Directe handelingsopties, neurobiologische achtergrond en oefencasussen.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('client')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                    selectedRole === 'client'
                      ? 'border-teal-600 bg-teal-50/50 shadow-xs ring-1 ring-teal-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Cliëntmodus</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Voor cliënten en naasten. Eenvoudige taal, pictogrammen, rustige schermen, kalmeringsoefeningen en audio-voorleesfunctie.
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 px-3 border border-slate-200 text-slate-600 rounded-xl font-medium text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Terug
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Volgende stap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Welkom bonus ontgrendeld!
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Je start met <strong className="text-teal-700">+25 XP</strong> en de badge <strong className="text-slate-800">LVB Basis</strong> in je profiel.
                </p>
              </div>

              <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-semibold text-slate-700">Wat is jouw primaire werkveld?</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['LVB-zorg', 'GGZ / Psychiatrie', 'Gehandicaptenzorg', 'Sociaal Domein'].map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => setSelectedDomain(domain)}
                      className={`p-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                        selectedDomain === domain
                          ? 'border-teal-600 bg-white text-teal-800 shadow-xs'
                          : 'border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.99] cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Open PraktijkKompas (+25 XP)</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
