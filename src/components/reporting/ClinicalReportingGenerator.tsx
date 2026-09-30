import React, { useState } from 'react';
import { 
  FileText, 
  ClipboardCopy, 
  Check, 
  PhoneCall, 
  Printer, 
  Sparkles, 
  Download,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { SbarReport, SoapReport, UrgencyLevel, VitalParameters } from '../../types';

interface ClinicalReportingGeneratorProps {
  initialSbar?: Partial<SbarReport>;
  vitalsData?: VitalParameters;
  vitalsSummary?: string;
  initialUrgency?: UrgencyLevel;
}

export const ClinicalReportingGenerator: React.FC<ClinicalReportingGeneratorProps> = ({
  initialSbar,
  vitalsData,
  vitalsSummary,
  initialUrgency = 'U2'
}) => {
  const [activeTab, setActiveTab] = useState<'sbar' | 'soap' | 'time'>('sbar');
  const [copied, setCopied] = useState(false);

  // SBAR fields
  const [clientName, setClientName] = useState('Dhr. / Mw. [Achternaam]');
  const [dob, setDob] = useState('01-01-1950');
  const [location, setLocation] = useState('Locatie Berkenhof / Woning 4');
  const [callerName, setCallerName] = useState('Zorgprofessional dienstdoend');
  
  const [situation, setSituation] = useState(
    initialSbar?.situation || 
    'Ik bel voor dhr./mw. vanwege een acute toename van benauwdheid en duizeligheid sinds 02:30 uur vannacht.'
  );
  const [background, setBackground] = useState(
    initialSbar?.background || 
    'Bekend met COPD Gold III en hypertensie. Reanimatiebeleid: Wel reanimeren / Geen IC-opname. Allergie: Geen.'
  );
  const [assessment, setAssessment] = useState(
    vitalsSummary || 
    'RR: 105/65 mmHg | Pols: 112/min | SpO2: 89% (zonder O2) | Temp: 38.6°C | AF: 26/min | AVPU: Alert maar angstig en kortademig.'
  );
  const [recommendation, setRecommendation] = useState(
    initialSbar?.recommendation || 
    'Gezien de desaturatie en koorts vraag ik u om deze cliënt binnen 1 uur ter plaatse te beoordelen en beleid af te spreken voor zuurstof en antibiotica.'
  );

  // SOAP fields
  const [soapS, setSoapS] = useState('Cliënt meldt: "Ik krijg geen lucht meer en voel me heel slap in de benen."');
  const [soapO, setSoapO] = useState('SpO2 89%, pols 112 regulair, temp 38.6°C rectaal. Gebruikt hulpademhalingsspieren bij praten. Hoest taai wit sputum op.');
  const [soapA, setSoapA] = useState('Acuut respiratoir probleem, vermoeden lageluchtweginfectie / pneumonie bij bekende COPD.');
  const [soapP, setSoapP] = useState('Dienstdoende arts gebeld via SBAR. Zuurstof gestart op 1.5 L/min. Cliënt halfzittend geïnstalleerd. Ieder kwartier vitale functies herhalen.');

  // TIME fields
  const [timeT, setTimeT] = useState('Geel beslag (fibrineus) circa 40%, rood granulatieweefsel 60%. Geen zwart necrotisch weefsel.');
  const [timeI, setTimeI] = useState('Roodheid wondrand < 1 cm, wond voelt warm aan. Geen onaangename geur. Lichaamstemperatuur 37.1°C.');
  const [timeM, setTimeM] = useState('Wond is matig vochtig. Verbandgaas voor de helft verzadigd met sereus exsudaat.');
  const [timeE, setTimeE] = useState('Wondranden zijn vlak en rustig, geen maceratie of verweking.');

  const buildCompleteSbarText = () => {
    return `=== SBAR OVERDRACHT ARTS / HAP (Urgentie: ${initialUrgency}) ===
[S] SITUATIE:
Ik ben ${callerName} van ${location}.
Ik bel over cliënt: ${clientName} (Geb. ${dob}).
Aanleiding: ${situation}

[B] ACHTERGROND:
${background}

[A] ASSESSMENT (BEOORDELING & MEETWAARDEN):
${assessment}

[R] RECOMMENDATION (AANBEVELING / VRAAG AAN ARTS):
${recommendation}
===================================================`;
  };

  const buildCompleteSoapText = () => {
    return `=== SOAP RAPPORTAGE VOOR ECD ===
Datum/Tijd: ${new Date().toLocaleDateString('nl-NL')} ${new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
Cliënt: ${clientName}

S (Subjectief):
${soapS}

O (Objectief):
${soapO}

A (Analyse):
${soapA}

P (Plan / Acties):
${soapP}
================================`;
  };

  const buildCompleteTimeText = () => {
    return `=== TIME WONDINSPECTIE RAPPORTAGE ===
Cliënt: ${clientName}
Datum: ${new Date().toLocaleDateString('nl-NL')}

T (Tissue / Weefsel):
${timeT}

I (Infection / Infectie):
${timeI}

M (Moisture / Vochtbalans):
${timeM}

E (Edge / Wondranden):
${timeE}
====================================`;
  };

  const handleCopyCurrent = () => {
    const textToCopy = 
      activeTab === 'sbar' 
        ? buildCompleteSbarText() 
        : activeTab === 'soap' 
        ? buildCompleteSoapText() 
        : buildCompleteTimeText();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Professionele Dossier- & Overdrachtsmodule</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display leading-snug">
              Rapportage: SBAR, SOAP & TIME
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-xl leading-relaxed">
              Gestructureerd communiceren voorkomt medische missers. Lees de SBAR direct telefonisch voor aan de arts, of kopieer de SOAP in één klik naar het ECD.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyCurrent}
              className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <ClipboardCopy className="w-4 h-4" />
              <span>{copied ? 'Gekopieerd naar klembord!' : '1-Klik Kopiëren'}</span>
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="mt-8 flex items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl max-w-md shadow-2xs">
          <button
            onClick={() => setActiveTab('sbar')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sbar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SBAR (Overdracht Arts)
          </button>
          <button
            onClick={() => setActiveTab('soap')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'soap'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            SOAP (ECD Rapportage)
          </button>
          <button
            onClick={() => setActiveTab('time')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'time'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TIME (Wondzorg)
          </button>
        </div>
      </div>

      {/* Basic Client Meta Strip */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(15,23,42,0.03)] border-0 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="font-semibold text-slate-700 block mb-1.5">Naam cliënt:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full p-2.5 bg-slate-50/90 rounded-xl text-slate-900 font-medium border-0 shadow-xs focus:bg-white"
          />
        </div>
        <div>
          <label className="font-semibold text-slate-700 block mb-1.5">Geboortedatum:</label>
          <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2.5 bg-slate-50/90 rounded-xl text-slate-900 font-medium border-0 shadow-xs focus:bg-white"
          />
        </div>
        <div>
          <label className="font-semibold text-slate-700 block mb-1.5">Afdeling / Woning:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2.5 bg-slate-50/90 rounded-xl text-slate-900 font-medium border-0 shadow-xs focus:bg-white"
          />
        </div>
      </div>

      {/* SBAR TAB CONTENT */}
      {activeTab === 'sbar' && (
        <div className="space-y-6">
          
          <div className="p-5 bg-rose-50/80 rounded-2xl border-0 flex items-center justify-between text-xs text-rose-900 shadow-2xs">
            <span className="font-semibold">
              Tip voor 03:00 uur: Blijf rustig, spreek duidelijk in de telefoon en noem direct je Assessment en Reanimatiebeleid!
            </span>
            <span className="font-bold uppercase bg-white/80 px-2.5 py-1 rounded-md shadow-2xs">
              Urgentie {initialUrgency}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-6">
            
            {/* S */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center">S</span>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Situation (Wat is het acute probleem op dit moment?)
                </label>
              </div>
              <textarea
                rows={2}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs leading-relaxed border-0 shadow-xs focus:bg-white"
              />
            </div>

            {/* B */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center">B</span>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Background (Relevante voorgeschiedenis, allergieën & behandelbeperkingen)
                </label>
              </div>
              <textarea
                rows={2}
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs leading-relaxed border-0 shadow-xs focus:bg-white"
              />
            </div>

            {/* A */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center">A</span>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Assessment (Vitale functies, meetwaarden & wat zie/denk jij?)
                </label>
              </div>
              <textarea
                rows={3}
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs leading-relaxed border-0 shadow-xs focus:bg-white font-mono"
              />
            </div>

            {/* R */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center">R</span>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Recommendation (Wat verwacht je concreet van de arts?)
                </label>
              </div>
              <textarea
                rows={2}
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs leading-relaxed border-0 shadow-xs focus:bg-white"
              />
            </div>

          </div>

          {/* Formatted Preview Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wide">
                Gereed om voor te lezen aan de dienstdoende arts:
              </span>
              <button
                onClick={handleCopyCurrent}
                className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ClipboardCopy className="w-3.5 h-3.5" />
                <span>{copied ? 'Gekopieerd!' : 'Kopieer SBAR'}</span>
              </button>
            </div>
            <pre className="font-mono text-xs text-blue-100/90 whitespace-pre-wrap bg-slate-800/80 p-5 rounded-2xl border-0 leading-relaxed">
              {buildCompleteSbarText()}
            </pre>
          </div>

        </div>
      )}

      {/* SOAP TAB CONTENT */}
      {activeTab === 'soap' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-6">
          
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              S - Subjectief (Wat zegt de cliënt/naaste?)
            </label>
            <textarea
              rows={2}
              value={soapS}
              onChange={(e) => setSoapS(e.target.value)}
              className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              O - Objectief (Wat observeer jij? Meetwaarden, wonden, gedrag)
            </label>
            <textarea
              rows={2}
              value={soapO}
              onChange={(e) => setSoapO(e.target.value)}
              className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              A - Analyse (Verpleegkundige duiding / hypothesen)
            </label>
            <textarea
              rows={2}
              value={soapA}
              onChange={(e) => setSoapA(e.target.value)}
              className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              P - Plan (Gemaakte afspraken, controles, opvolging)
            </label>
            <textarea
              rows={2}
              value={soapP}
              onChange={(e) => setSoapP(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleCopyCurrent}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <ClipboardCopy className="w-4 h-4" />
              <span>{copied ? 'Gekopieerd!' : 'Kopieer SOAP tekst voor Nedap Ons / HiX'}</span>
            </button>
          </div>

        </div>
      )}

      {/* TIME TAB CONTENT */}
      {activeTab === 'time' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-6">
          
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              T - Tissue (Weefsel: zwart/necrose, geel/fibrine, rood/granulatie, roze/epitheel)
            </label>
            <textarea
              rows={2}
              value={timeT}
              onChange={(e) => setTimeT(e.target.value)}
              className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              I - Infection (Infectie: roodheid, warmte, oedeem, pijn, geur, koorts)
            </label>
            <textarea
              rows={2}
              value={timeI}
              onChange={(e) => setTimeI(e.target.value)}
              className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              M - Moisture (Vochtbalans: te droog, vochtig, verweking/maceratie)
            </label>
            <textarea
              rows={2}
              value={timeM}
              onChange={(e) => setTimeM(e.target.value)}
              className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wide block mb-2">
              E - Edge (Wondrand: gaaf, ondermijnd, opgeworpen, eelt)
            </label>
            <textarea
              rows={2}
              value={timeE}
              onChange={(e) => setTimeE(e.target.value)}
              className="w-full p-3.5 bg-slate-50/90 rounded-xl text-xs border-0 shadow-xs focus:bg-white"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleCopyCurrent}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
            >
              <ClipboardCopy className="w-4 h-4" />
              <span>{copied ? 'Gekopieerd!' : 'Kopieer TIME Wondverslag'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
