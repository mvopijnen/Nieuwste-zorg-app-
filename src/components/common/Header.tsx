import React, { useState } from 'react';
import { Compass, UserCheck, Heart, AlertTriangle, PhoneCall, X, User } from 'lucide-react';
import { UserRole, UserProgressState } from '../../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleToggle: (role: UserRole) => void;
  progress: UserProgressState;
  onNavigateTab: (tab: string) => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleToggle,
  progress,
  onNavigateTab,
  activeTab
}) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overzicht' },
    { id: 'triage', label: 'Symptoomtriage' },
    { id: 'abcde', label: 'ABCDE & Vitals' },
    { id: 'situations', label: 'Gedrag & GGZ' },
    { id: 'reporting', label: 'Rapportage' },
    { id: 'learn', label: 'Casuïstiek' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100/60 shadow-[0_1px_10px_rgba(0,0,0,0.02)] transition-all">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => onNavigateTab('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
            aria-label="PraktijkKompas startpagina"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 font-display block leading-tight">
                PraktijkKompas
              </span>
              <span className="text-[11px] font-normal text-slate-500 block leading-tight">
                Klinische Zorgcoach
              </span>
            </div>
          </button>

          {/* Primary Navigation (Desktop) - Geordend, rustig en overzichtelijk */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => onNavigateTab(item.id)} 
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Rechter acties: Rustig en zonder schreeuwende kleuren */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Moduswissel (Zorgverlener / Cliënt) */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/80 text-xs">
              <button
                onClick={() => onRoleToggle('professional')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
                  currentRole === 'professional'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Professionele zorgverlenersmodus"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Professional</span>
              </button>
              <button
                onClick={() => onRoleToggle('client')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
                  currentRole === 'client'
                    ? 'bg-white text-blue-700 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Vereenvoudigde cliëntmodus"
              >
                <Heart className="w-3.5 h-3.5 text-blue-500" />
                <span>Cliënt</span>
              </button>
            </div>

            {/* Nood & Crisis Trigger (Discreet, rustig maar direct toegankelijk) */}
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Directe noodinformatie en crisislijnen"
              title="Acuut gevaar of crisisprotocol"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span className="hidden sm:inline">Nood</span>
            </button>

            {/* Profiel / Voortgang snelle toegang */}
            {currentRole === 'professional' && (
              <button
                onClick={() => onNavigateTab('profile')}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  activeTab === 'profile' || activeTab === 'progress'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-slate-500 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
                }`}
                title="Profiel & Voortgang"
                aria-label="Profiel en instellingen"
              >
                <User className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Emergency & Protocol Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowEmergencyModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg"
              aria-label="Sluit noodvenster"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Veiligheidsprotocol & Crisis
                </h3>
                <p className="text-xs text-slate-500">
                  PraktijkKompas vervangt geen acute medische noodzorg
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-700 mb-6">
              <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-xl">
                <p className="font-semibold text-red-900 text-xs mb-1">
                  1. Acuut levensgevaar of ernstig fysiek geweld:
                </p>
                <p className="text-red-800 text-xs mb-2">
                  Bel direct <strong>112</strong> en waarschuw onmiddellijk je collega's via het interne personeelsalarm.
                </p>
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Bel 112 (Nood)
                </a>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl">
                <p className="font-semibold text-blue-900 text-xs mb-1">
                  2. Psychiatrische crisis of suïcidaliteit:
                </p>
                <p className="text-blue-800 text-xs mb-2">
                  Raadpleeg de dienstdoende arts of GGZ Crisisdienst, of bel gratis <strong>113</strong>.
                </p>
                <a
                  href="tel:113"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Bel 113 (Zelfmoordpreventie)
                </a>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-semibold text-slate-800 text-xs mb-1">
                  3. Binnen je organisatie:
                </p>
                <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
                  <li>Activeer je achterwacht (blijf niet alleen in een gesloten ruimte).</li>
                  <li>Controleer het signaleringsplan in het dossier (ECD).</li>
                  <li>Meld incidenten na stabilisatie via het interne protocol (MIC/VIM).</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowEmergencyModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-medium text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Sluiten en terug naar overzicht
            </button>
          </div>
        </div>
      )}
    </>
  );
};
