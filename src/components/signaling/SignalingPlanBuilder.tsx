import React, { useState } from 'react';
import { 
  ClipboardList, 
  Check, 
  Plus, 
  Trash2, 
  Printer, 
  Share2, 
  User, 
  Phone, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles,
  Download
} from 'lucide-react';
import { SignalingPlan, SignalingPhase } from '../../types';
import { StorageService } from '../../services/storage';

interface SignalingPlanBuilderProps {
  initialPlan?: SignalingPlan;
  onSave?: (plan: SignalingPlan) => void;
}

export const SignalingPlanBuilder: React.FC<SignalingPlanBuilderProps> = ({
  initialPlan,
  onSave
}) => {
  const [plan, setPlan] = useState<SignalingPlan>(() => initialPlan || StorageService.getSignalingPlan());
  const [activeTab, setActiveTab] = useState<'editor' | 'cardView'>('editor');
  const [savedToast, setSavedToast] = useState(false);

  // New item inputs
  const [newGreenHelp, setNewGreenHelp] = useState('');
  const [newOrangeSign, setNewOrangeSign] = useState('');
  const [newOrangeHelp, setNewOrangeHelp] = useState('');
  const [newRedBehavior, setNewRedBehavior] = useState('');
  const [newRedHelp, setNewRedHelp] = useState('');
  const [newRedDont, setNewRedDont] = useState('');

  const handleSave = () => {
    StorageService.saveSignalingPlan(plan);
    if (onSave) onSave(plan);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const addItemToPhase = (
    phaseKey: 'greenPhase' | 'orangePhase' | 'redPhase',
    fieldKey: keyof SignalingPhase,
    itemText: string,
    clearInputFn: () => void
  ) => {
    if (!itemText.trim()) return;
    const currentList = (plan[phaseKey][fieldKey] as string[]) || [];
    const updatedPhase = {
      ...plan[phaseKey],
      [fieldKey]: [...currentList, itemText.trim()]
    };
    const updatedPlan = { ...plan, [phaseKey]: updatedPhase };
    setPlan(updatedPlan);
    StorageService.saveSignalingPlan(updatedPlan);
    clearInputFn();
  };

  const removeItemFromPhase = (
    phaseKey: 'greenPhase' | 'orangePhase' | 'redPhase',
    fieldKey: keyof SignalingPhase,
    indexToRemove: number
  ) => {
    const currentList = (plan[phaseKey][fieldKey] as string[]) || [];
    const updatedPhase = {
      ...plan[phaseKey],
      [fieldKey]: currentList.filter((_, idx) => idx !== indexToRemove)
    };
    const updatedPlan = { ...plan, [phaseKey]: updatedPhase };
    setPlan(updatedPlan);
    StorageService.saveSignalingPlan(updatedPlan);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 mb-1">
            <ClipboardList className="w-4 h-4 text-teal-600" />
            <span>Persoonlijke Vroegsignalering</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Signaleringsplan & Crisiskaart
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Samen met de cliënt inzichtelijk maken: hoe ziet spanning eruit in Groen, Oranje en Rood, en wat helpt wel of juist beslist niet?
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab(activeTab === 'editor' ? 'cardView' : 'editor')}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{activeTab === 'editor' ? 'Bekijk Kaartweergave' : 'Terug naar Bewerken'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Afdrukken / Delen</span>
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold rounded-xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Signaleringsplan succesvol opgeslagen!</span>
        </div>
      )}

      {/* Client Name Input Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <User className="w-4 h-4 text-slate-400" />
          <label htmlFor="client-name" className="text-xs font-semibold text-slate-700">Naam cliënt:</label>
          <input
            id="client-name"
            type="text"
            value={plan.clientName}
            onChange={(e) => setPlan({ ...plan, clientName: e.target.value })}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20 max-w-xs"
          />
        </div>

        <button
          onClick={handleSave}
          className="self-end sm:self-auto py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          Opslaan
        </button>
      </div>

      {/* VIEW: VISUAL CARD VIEW (PRINT-FRIENDLY & SHARABLE) */}
      {activeTab === 'cardView' ? (
        <div className="space-y-4 print:p-0">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* GROEN */}
            <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                <div>
                  <span className="text-xs font-bold text-emerald-900 uppercase">Fase 1: Stabiel</span>
                  <h3 className="text-lg font-bold text-emerald-950 font-display">Groen (Goed)</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-950 mb-1">Hoe merk ik dat het goed gaat?</h4>
                <ul className="text-xs text-emerald-900 space-y-1 list-disc pl-4">
                  {plan.greenPhase.feelingsAndThoughts.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-emerald-950 mb-1">Wat helpt om stabiel te blijven?</h4>
                <ul className="text-xs text-emerald-900 space-y-1 list-disc pl-4">
                  {plan.greenPhase.whatHelps.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ORANJE */}
            <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div>
                  <span className="text-xs font-bold text-amber-900 uppercase">Fase 2: Spanning</span>
                  <h3 className="text-lg font-bold text-amber-950 font-display">Oranje (Let op)</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-950 mb-1">Signalen van oplopende spanning:</h4>
                <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                  {plan.orangePhase.visibleBehaviors.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-950 mb-1">Wat helpt mij NU om te kalmeren?</h4>
                <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                  {plan.orangePhase.whatHelps.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-950 mb-1">Wat helpt beslist NIET?</h4>
                <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                  {plan.orangePhase.whatDoesNotHelp.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ROOD */}
            <div className="bg-rose-50/70 border-2 border-rose-300 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                <div>
                  <span className="text-xs font-bold text-rose-900 uppercase">Fase 3: Crisis</span>
                  <h3 className="text-lg font-bold text-rose-950 font-display">Rood (Niet meer te hanteren)</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-rose-950 mb-1">Gedrag in de hoogste fase:</h4>
                <ul className="text-xs text-rose-900 space-y-1 list-disc pl-4">
                  {plan.redPhase.visibleBehaviors.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-rose-950 mb-1">Wat anderen MOETEN doen:</h4>
                <ul className="text-xs text-rose-900 space-y-1 list-disc pl-4">
                  {plan.redPhase.whatHelps.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-rose-950 mb-1">Wat anderen beslist NIET mogen doen:</h4>
                <ul className="text-xs text-rose-900 space-y-1 list-disc pl-4">
                  {plan.redPhase.whatDoesNotHelp.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Emergency contacts card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-teal-600" />
              <span>Belangrijke contactpersonen bij nood:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plan.emergencyContacts.map((contact, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <p className="font-bold text-slate-900">{contact.name}</p>
                  <p className="text-slate-500">{contact.role}</p>
                  <a href={`tel:${contact.phone}`} className="font-semibold text-teal-700 hover:underline mt-1 block">
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* VIEW: INTERACTIVE EDITOR */
        <div className="space-y-6">
          
          {/* GROEN VAK */}
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-emerald-100">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Fase 1: Groen (Als het goed gaat)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Hoe merk ik dat het goed gaat?</h4>
                <div className="space-y-1.5">
                  {plan.greenPhase.feelingsAndThoughts.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-emerald-50/60 rounded-xl text-xs text-slate-800">
                      <span>{item}</span>
                      <button 
                        onClick={() => removeItemFromPhase('greenPhase', 'feelingsAndThoughts', idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        aria-label="Verwijder item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Wat helpt mij om stabiel te blijven?</h4>
                <div className="space-y-1.5">
                  {plan.greenPhase.whatHelps.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-emerald-50/60 rounded-xl text-xs text-slate-800">
                      <span>{item}</span>
                      <button 
                        onClick={() => removeItemFromPhase('greenPhase', 'whatHelps', idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        aria-label="Verwijder item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={newGreenHelp}
                    onChange={(e) => setNewGreenHelp(e.target.value)}
                    placeholder="Voeg helpende activiteit toe (bijv. muziek luisteren)..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addItemToPhase('greenPhase', 'whatHelps', newGreenHelp, () => setNewGreenHelp(''));
                      }
                    }}
                  />
                  <button
                    onClick={() => addItemToPhase('greenPhase', 'whatHelps', newGreenHelp, () => setNewGreenHelp(''))}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ORANJE VAK */}
          <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-amber-100">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500" />
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Fase 2: Oranje (Oplopende spanning & vroege signalen)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Waaraan merk ik/anderen dat spanning stijgt?</h4>
                <div className="space-y-1.5">
                  {plan.orangePhase.visibleBehaviors.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-amber-50/60 rounded-xl text-xs text-slate-800">
                      <span>{item}</span>
                      <button 
                        onClick={() => removeItemFromPhase('orangePhase', 'visibleBehaviors', idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        aria-label="Verwijder item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={newOrangeSign}
                    onChange={(e) => setNewOrangeSign(e.target.value)}
                    placeholder="Signaal toevoegen (bijv. sneller lopen, zuchten)..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addItemToPhase('orangePhase', 'visibleBehaviors', newOrangeSign, () => setNewOrangeSign(''));
                      }
                    }}
                  />
                  <button
                    onClick={() => addItemToPhase('orangePhase', 'visibleBehaviors', newOrangeSign, () => setNewOrangeSign(''))}
                    className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Wat helpt mij NU direct om te kalmeren?</h4>
                <div className="space-y-1.5">
                  {plan.orangePhase.whatHelps.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-amber-50/60 rounded-xl text-xs text-slate-800">
                      <span>{item}</span>
                      <button 
                        onClick={() => removeItemFromPhase('orangePhase', 'whatHelps', idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        aria-label="Verwijder item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={newOrangeHelp}
                    onChange={(e) => setNewOrangeHelp(e.target.value)}
                    placeholder="Helpende actie (bijv. oordopjes, kopje thee)..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addItemToPhase('orangePhase', 'whatHelps', newOrangeHelp, () => setNewOrangeHelp(''));
                      }
                    }}
                  />
                  <button
                    onClick={() => addItemToPhase('orangePhase', 'whatHelps', newOrangeHelp, () => setNewOrangeHelp(''))}
                    className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ROOD VAK */}
          <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-rose-100">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500" />
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Fase 3: Rood (Crisis & Overstroming)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Wat gebeurt er als het niet meer gaat?</h4>
                <div className="space-y-1.5">
                  {plan.redPhase.visibleBehaviors.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-rose-50/60 rounded-xl text-xs text-slate-800">
                      <span>{item}</span>
                      <button 
                        onClick={() => removeItemFromPhase('redPhase', 'visibleBehaviors', idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        aria-label="Verwijder item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={newRedBehavior}
                    onChange={(e) => setNewRedBehavior(e.target.value)}
                    placeholder="Gedrag toevoegen (bijv. deuren dichtslaan)..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addItemToPhase('redPhase', 'visibleBehaviors', newRedBehavior, () => setNewRedBehavior(''));
                      }
                    }}
                  />
                  <button
                    onClick={() => addItemToPhase('redPhase', 'visibleBehaviors', newRedBehavior, () => setNewRedBehavior(''))}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Wat moeten anderen beslist NIET doen?</h4>
                <div className="space-y-1.5">
                  {plan.redPhase.whatDoesNotHelp.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-rose-50/60 rounded-xl text-xs text-slate-800">
                      <span>{item}</span>
                      <button 
                        onClick={() => removeItemFromPhase('redPhase', 'whatDoesNotHelp', idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        aria-label="Verwijder item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={newRedDont}
                    onChange={(e) => setNewRedDont(e.target.value)}
                    placeholder="Valkuil toevoegen (bijv. vastpakken, in discussie gaan)..."
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addItemToPhase('redPhase', 'whatDoesNotHelp', newRedDont, () => setNewRedDont(''));
                      }
                    }}
                  />
                  <button
                    onClick={() => addItemToPhase('redPhase', 'whatDoesNotHelp', newRedDont, () => setNewRedDont(''))}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
