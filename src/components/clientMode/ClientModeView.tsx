import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Volume2, 
  VolumeX, 
  Heart, 
  Smile, 
  Frown, 
  Sparkles, 
  Phone, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft,
  Wind,
  ShieldAlert,
  Play,
  Pause
} from 'lucide-react';
import { SITUATIONS } from '../../data/situations';
import { Situation, LanguageLevel } from '../../types';

interface ClientModeViewProps {
  onBackToProfessional?: () => void;
}

export const ClientModeView: React.FC<ClientModeViewProps> = ({ onBackToProfessional }) => {
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState<LanguageLevel>('simple');
  const [activeSituation, setActiveSituation] = useState<Situation | null>(null);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'in' | 'vast' | 'uit'>('in');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Breathing exercise timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathingActive) {
      let count = 0;
      interval = setInterval(() => {
        count = (count + 1) % 10;
        if (count < 4) {
          setBreathPhase('in');
        } else if (count < 6) {
          setBreathPhase('vast');
        } else {
          setBreathPhase('uit');
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  // Text to speech function
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setSpeechNotice('Spraakweergave wordt niet ondersteund door deze browser.');
      setTimeout(() => setSpeechNotice(null), 3000);
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.85; // rustiger tempo voor eenvoud
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Client Welcome Banner */}
      <div className="bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-teal-50 border border-teal-200/90 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wide mb-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>PraktijkKompas · Voor Jou</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Hoe voel jij je nu?
            </h1>
            <p className="text-slate-700 text-sm mt-1 max-w-lg">
              Kies hieronder wat er aan de hand is. We leggen rustig uit wat er in je hoofd of lijf gebeurt en wat jou kan helpen.
            </p>
          </div>

          <button
            onClick={() => setIsBreathingActive(!isBreathingActive)}
            className="py-3 px-5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <Wind className="w-5 h-5" />
            <span>{isBreathingActive ? 'Stop ademhaling' : 'Help mij kalmeren'}</span>
          </button>
        </div>

        {/* Simplicity Level Switcher */}
        <div className="mt-5 pt-4 border-t border-teal-200/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-700 mr-1">Taalniveau:</span>
          
          <button
            onClick={() => setSelectedLanguageLevel('simple')}
            className={`py-1.5 px-3 rounded-xl font-medium transition-colors cursor-pointer ${
              selectedLanguageLevel === 'simple'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-teal-200 hover:bg-teal-50'
            }`}
          >
            Eenvoudige taal (B1)
          </button>

          <button
            onClick={() => setSelectedLanguageLevel('very_simple')}
            className={`py-1.5 px-3 rounded-xl font-medium transition-colors cursor-pointer ${
              selectedLanguageLevel === 'very_simple'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-teal-200 hover:bg-teal-50'
            }`}
          >
            Zeer eenvoudig (A1)
          </button>

          <button
            onClick={() => setSelectedLanguageLevel('visual')}
            className={`py-1.5 px-3 rounded-xl font-medium transition-colors cursor-pointer ${
              selectedLanguageLevel === 'visual'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-teal-200 hover:bg-teal-50'
            }`}
          >
            Beeldmodus / Pictogrammen
          </button>
        </div>
      </div>

      {/* Guided Calming Breath Visualizer */}
      {isBreathingActive && (
        <div className="bg-white rounded-3xl border-2 border-teal-400 p-8 shadow-md text-center space-y-4 animate-in zoom-in-95">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">
              Ademhalingsoefening
            </span>
            <button
              onClick={() => setIsBreathingActive(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Sluiten ×
            </button>
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            <div 
              className={`w-36 h-36 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-1000 ${
                breathPhase === 'in'
                  ? 'scale-125 bg-teal-500 shadow-teal-300'
                  : breathPhase === 'vast'
                  ? 'scale-125 bg-amber-500 shadow-amber-300'
                  : 'scale-90 bg-emerald-600 shadow-emerald-200'
              }`}
            >
              {breathPhase === 'in' && 'Adem in...'}
              {breathPhase === 'vast' && 'Even vasthouden'}
              {breathPhase === 'uit' && 'Blaas rustig uit...'}
            </div>
            <p className="text-xs text-slate-600 mt-6 max-w-xs mx-auto">
              Volg de bol. Rustig inademen door je neus, langzaam uitblazen door je mond alsof je zachtjes tegen een kaarsje blaast.
            </p>
          </div>
        </div>
      )}

      {/* Detail of Selected Situation */}
      {activeSituation ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                handleStopSpeaking();
                setActiveSituation(null);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 py-1.5 px-3 rounded-xl bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Terug naar overzicht</span>
            </button>

            {/* Read Aloud Button */}
            <button
              onClick={() => {
                const textToRead = `${activeSituation.clientVersion.simpleTitle}. ${activeSituation.clientVersion.simpleDescription}. Wat ik kan voelen: ${activeSituation.clientVersion.whatIFeel.join(', ')}. Wat mij kan helpen: ${activeSituation.clientVersion.whatHelpsMe.join(', ')}.`;
                speakText(textToRead);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600" />
                  <span>Stop voorlezen</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-teal-700" />
                  <span>Lees hardop voor</span>
                </>
              )}
            </button>
          </div>

          {speechNotice && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-semibold animate-in fade-in">
              {speechNotice}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              {activeSituation.clientVersion.simpleTitle}
            </h2>
            <p className="text-base text-slate-700 mt-2 font-medium">
              {activeSituation.clientVersion.simpleDescription}
            </p>
          </div>

          {/* Drie duidelijke blokken */}
          <div className="space-y-4">
            
            {/* Wat ik voel */}
            <div className="p-5 bg-amber-50/70 border-2 border-amber-200 rounded-2xl space-y-2">
              <h3 className="font-bold text-amber-950 text-sm flex items-center gap-2">
                <span>💭</span>
                <span>Wat je kunt voelen in je lichaam:</span>
              </h3>
              <ul className="text-sm text-amber-900 space-y-1.5 list-disc pl-5">
                {activeSituation.clientVersion.whatIFeel.map((feel, i) => (
                  <li key={i}>{feel}</li>
                ))}
              </ul>
            </div>

            {/* Wat mij kan helpen */}
            <div className="p-5 bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl space-y-2">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <span>💡</span>
                <span>Dingen die jou NU kunnen helpen:</span>
              </h3>
              <ul className="text-sm text-emerald-900 space-y-1.5 list-disc pl-5 font-medium">
                {activeSituation.clientVersion.whatHelpsMe.map((help, i) => (
                  <li key={i}>{help}</li>
                ))}
              </ul>
            </div>

            {/* Wat anderen moeten doen */}
            <div className="p-5 bg-blue-50/70 border-2 border-blue-200 rounded-2xl space-y-2">
              <h3 className="font-bold text-blue-950 text-sm flex items-center gap-2">
                <span>🤝</span>
                <span>Wat jouw begeleider of naaste kan doen:</span>
              </h3>
              <ul className="text-sm text-blue-900 space-y-1.5 list-disc pl-5">
                {activeSituation.clientVersion.whatOthersShouldDo.map((other, i) => (
                  <li key={i}>{other}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Hulp vragen knop */}
          <div className="pt-2">
            <a
              href="tel:0881234567"
              className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-base flex items-center justify-center gap-3 shadow-md transition-transform active:scale-98"
            >
              <Phone className="w-5 h-5" />
              <span>Bel nu direct met de begeleiding</span>
            </a>
          </div>

        </div>
      ) : (
        /* Situation Cards in Simple Language */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SITUATIONS.slice(0, 6).map((situation) => (
            <button
              key={situation.id}
              onClick={() => setActiveSituation(situation)}
              className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-teal-500 hover:shadow-md text-left transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-xl">
                  {situation.slug === 'overprikkeling' && '🎧'}
                  {situation.slug === 'oplopende-spanning' && '⚡'}
                  {situation.slug === 'agressie-dreiging' && '🔥'}
                  {situation.slug === 'angst-paniek' && '💓'}
                  {situation.slug === 'overvraging-lvb' && '🧩'}
                  {situation.slug === 'zorgweigering-terugtrekking' && '🚪'}
                </div>

                <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-teal-700">
                  {situation.clientVersion.simpleTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {situation.clientVersion.simpleDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>Lees wat helpt</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Switch back to professional */}
      {onBackToProfessional && (
        <div className="text-center pt-4">
          <button
            onClick={onBackToProfessional}
            className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
          >
            ← Terug naar Professionalmodus
          </button>
        </div>
      )}

    </div>
  );
};
