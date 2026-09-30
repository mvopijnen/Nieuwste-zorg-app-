import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pk_safety_banner_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem('pk_safety_banner_dismissed', 'true');
    } catch {
      // Ignore
    }
  };

  if (dismissed) return null;

  return (
    <div className="bg-blue-50/60 border-b border-blue-100 text-[11px] text-slate-600 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <p className="line-clamp-1">
            <span className="font-semibold text-slate-800">Professioneel kader:</span> Educatief handelingsperspectief voor de zorgvloer. Bij acuut fysiek gevaar: bel 112 of volg je organisatieprotocol.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-slate-700 shrink-0 p-0.5 rounded cursor-pointer transition-colors"
          aria-label="Verberg melding"
          title="Verberg melding"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
