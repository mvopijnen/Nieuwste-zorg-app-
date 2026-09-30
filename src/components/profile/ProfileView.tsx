import React, { useState } from 'react';
import { 
  User, 
  Eye, 
  RotateCcw, 
  Check, 
  HelpCircle
} from 'lucide-react';
import { UserRole, HealthcareDomain } from '../../types';

interface ProfileViewProps {
  currentRole: UserRole;
  onRoleToggle: (role: UserRole) => void;
  onRestartOnboarding: () => void;
  onResetProgress: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentRole,
  onRoleToggle,
  onRestartOnboarding,
  onResetProgress
}) => {
  const [userName, setUserName] = useState('Zorgprofessional');
  const [userTitle, setUserTitle] = useState('Persoonlijk Begeleider');
  const [selectedDomain, setSelectedDomain] = useState<HealthcareDomain>('LVB');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-2xl font-display shadow-md">
              {userName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {userName}
                </h1>
                <span className="text-xs font-semibold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                  {currentRole === 'professional' ? 'Professional' : 'Cliënt'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {userTitle} · Werkveld {selectedDomain}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Check className="w-4 h-4" />
            <span>Wijzigingen opslaan</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Profielinstellingen succesvol opgeslagen!</span>
          </div>
        )}
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* User Details & Role */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900 font-display">
              Gebruikersgegevens
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Naam / Weergavenaam:</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Functie / Rol:</label>
              <input
                type="text"
                value={userTitle}
                onChange={(e) => setUserTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Primair Zorgdomein:</label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value as HealthcareDomain)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
              >
                <option value="LVB">Licht Verstandelijke Beperking (LVB)</option>
                <option value="GGZ">Geestelijke Gezondheidszorg (GGZ)</option>
                <option value="Autisme">Autismespectrumstoornis (ASS)</option>
                <option value="Gehandicaptenzorg">Gehandicaptenzorg</option>
                <option value="Sociaal Domein">Sociaal Domein & Wijkteams</option>
                <option value="De-escalatie">De-escalatie & Agressiehantering</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Actieve Modus:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onRoleToggle('professional')}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                    currentRole === 'professional'
                      ? 'border-teal-600 bg-teal-50 text-teal-900 ring-1 ring-teal-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Professional
                </button>
                <button
                  type="button"
                  onClick={() => onRoleToggle('client')}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                    currentRole === 'client'
                      ? 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Cliëntmodus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility & Tools */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Eye className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900 font-display">
              Toegankelijkheid & Weergave
            </h2>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Tekstgrootte */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">Tekstgrootte</p>
                <p className="text-[11px] text-slate-500">Grotere letters voor betere leesbaarheid</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${fontSize === 'normal' ? 'bg-teal-700 text-white' : 'bg-white text-slate-700 border'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2.5 py-1 rounded-lg text-sm font-bold cursor-pointer ${fontSize === 'large' ? 'bg-teal-700 text-white' : 'bg-white text-slate-700 border'}`}
                >
                  A+
                </button>
              </div>
            </div>

            {/* TTS sound toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">Voorleesgeluid / TTS</p>
                <p className="text-[11px] text-slate-500">Ondersteuning voor spraakweergave</p>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${soundEnabled ? 'bg-teal-600' : 'bg-slate-300'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${soundEnabled ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={onRestartOnboarding}
                className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>Onboarding & Introductie opnieuw bekijken</span>
              </button>

              <button
                onClick={onResetProgress}
                className="w-full py-2 px-3 text-slate-400 hover:text-rose-600 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Voortgang en oefeningen resetten</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Organisation & Disclaimer Card */}
      <div className="bg-slate-100 border border-slate-200 rounded-3xl p-5 text-xs text-slate-600 space-y-2">
        <p className="font-bold text-slate-800">Over PraktijkKompas Zorg & Welzijn</p>
        <p className="leading-relaxed">
          PraktijkKompas is ontworpen als interactieve praktijkcoach voor Nederlandse zorgorganisaties in de GGZ, LVB en gehandicaptenzorg. Inhoudelijke handelingsperspectieven zijn afgestemd op de-escalatiemethodieken, de Window of Tolerance en sociaal-emotionele ontwikkelingsmodellen (Dôšen).
        </p>
      </div>

    </div>
  );
};
