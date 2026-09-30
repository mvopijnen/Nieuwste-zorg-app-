import React from 'react';
import { Home, Stethoscope, ShieldAlert, FileText, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unseenCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'home', label: 'Overzicht', icon: Home },
    { id: 'triage', label: 'Triage', icon: Stethoscope },
    { id: 'abcde', label: 'ABCDE', icon: ShieldAlert },
    { id: 'reporting', label: 'SBAR', icon: FileText },
    { id: 'profile', label: 'Profiel', icon: User }
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 safe-bottom"
      aria-label="Mobiele navigatie"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative cursor-pointer ${
                isActive ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 text-blue-600' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-1 truncate max-w-[64px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
