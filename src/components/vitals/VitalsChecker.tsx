import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Wind, 
  Thermometer, 
  Droplet, 
  AlertTriangle, 
  CheckCircle2, 
  ClipboardCopy, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { VitalParameters, UrgencyLevel, ClinicalDecisionTrace } from '../../types';
import { VITAL_SIGNS_THRESHOLDS } from '../../data/somaticTriage';

interface VitalsCheckerProps {
  onExportToSbar?: (vitals: VitalParameters, summaryText: string, calculatedUrgency: UrgencyLevel) => void;
  isStudentMode?: boolean;
}

export const VitalsChecker: React.FC<VitalsCheckerProps> = ({ 
  onExportToSbar,
  isStudentMode = false
}) => {
  const [systolic, setSystolic] = useState<string>('');
  const [diastolic, setDiastolic] = useState<string>('');
  const [heartRate, setHeartRate] = useState<string>('');
  const [spO2, setSpO2] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [glucose, setGlucose] = useState<string>('');
  const [respRate, setRespRate] = useState<string>('');
  const [avpu, setAvpu] = useState<'A' | 'V' | 'P' | 'U'>('A');

  const [copied, setCopied] = useState(false);
  const [showTrace, setShowTrace] = useState(false);

  // Parse values
  const sysNum = parseFloat(systolic);
  const diaNum = parseFloat(diastolic);
  const hrNum = parseFloat(heartRate);
  const satNum = parseFloat(spO2);
  const tempNum = parseFloat(temperature);
  const glucNum = parseFloat(glucose);
  const respNum = parseFloat(respRate);

  // Calculate critical alerts & EWS points
  const criticalAlerts: string[] = [];
  const warningAlerts: string[] = [];

  let urgencyScore: number = 5; // 1 = U1, 2 = U2, 3 = U3, 4 = U4, 5 = U5

  const elevateUrgency = (level: number) => {
    if (level < urgencyScore) {
      urgencyScore = level;
    }
  };

  if (!isNaN(sysNum)) {
    if (sysNum <= VITAL_SIGNS_THRESHOLDS.systolicBP.criticalLow) {
      criticalAlerts.push(`Ernstige hypotensie (Systolisch ${sysNum} mmHg ≤ 85)`);
      elevateUrgency(1);
    } else if (sysNum <= VITAL_SIGNS_THRESHOLDS.systolicBP.low) {
      warningAlerts.push(`Lage bloeddruk (Systolisch ${sysNum} mmHg)`);
      elevateUrgency(2);
    } else if (sysNum >= VITAL_SIGNS_THRESHOLDS.systolicBP.criticalHigh) {
      criticalAlerts.push(`Hypertensieve crisis (Systolisch ${sysNum} mmHg ≥ 180)`);
      elevateUrgency(2);
    }
  }

  if (!isNaN(satNum)) {
    if (satNum < VITAL_SIGNS_THRESHOLDS.oxygenSaturation.criticalLow) {
      criticalAlerts.push(`Ernstige desaturatie / hypoxie (SpO2 ${satNum}% < 88%)`);
      elevateUrgency(1);
    } else if (satNum < VITAL_SIGNS_THRESHOLDS.oxygenSaturation.normalMin) {
      warningAlerts.push(`Verlaagde zuurstofsaturatie (SpO2 ${satNum}%)`);
      elevateUrgency(2);
    }
  }

  if (!isNaN(hrNum)) {
    if (hrNum <= VITAL_SIGNS_THRESHOLDS.heartRate.criticalLow) {
      criticalAlerts.push(`Ernstige bradycardie (Pols ${hrNum}/min ≤ 40)`);
      elevateUrgency(1);
    } else if (hrNum >= VITAL_SIGNS_THRESHOLDS.heartRate.criticalHigh) {
      criticalAlerts.push(`Ernstige tachycardie (Pols ${hrNum}/min ≥ 130)`);
      elevateUrgency(2);
    } else if (hrNum >= VITAL_SIGNS_THRESHOLDS.heartRate.high) {
      warningAlerts.push(`Tachycardie (Pols ${hrNum}/min)`);
      elevateUrgency(3);
    }
  }

  if (!isNaN(tempNum)) {
    if (tempNum >= VITAL_SIGNS_THRESHOLDS.temperature.criticalHigh || tempNum < VITAL_SIGNS_THRESHOLDS.temperature.criticalLow) {
      criticalAlerts.push(`Kritieke temperatuur (${tempNum}°C)`);
      elevateUrgency(2);
    } else if (tempNum >= VITAL_SIGNS_THRESHOLDS.temperature.fever) {
      warningAlerts.push(`Koorts (${tempNum}°C)`);
      elevateUrgency(3);
    }
  }

  if (!isNaN(glucNum)) {
    if (glucNum <= VITAL_SIGNS_THRESHOLDS.bloodGlucose.criticalLow) {
      criticalAlerts.push(`Ernstige hypoglykemie (Glucose ${glucNum} mmol/L ≤ 3.5)`);
      elevateUrgency(1);
    } else if (glucNum >= VITAL_SIGNS_THRESHOLDS.bloodGlucose.criticalHigh) {
      criticalAlerts.push(`Kritieke hyperglykemie (Glucose ${glucNum} mmol/L ≥ 20.0)`);
      elevateUrgency(2);
    }
  }

  if (!isNaN(respNum)) {
    if (respNum >= VITAL_SIGNS_THRESHOLDS.respiratoryRate.criticalHigh || respNum <= VITAL_SIGNS_THRESHOLDS.respiratoryRate.criticalLow) {
      criticalAlerts.push(`Kritieke ademfrequentie (${respNum}/min)`);
      elevateUrgency(1);
    } else if (respNum >= VITAL_SIGNS_THRESHOLDS.respiratoryRate.high) {
      warningAlerts.push(`Tachypneu (${respNum}/min - qSOFA alert)`);
      elevateUrgency(2);
    }
  }

  if (avpu === 'P' || avpu === 'U') {
    criticalAlerts.push(`Verlaagd bewustzijn (AVPU: ${avpu === 'P' ? 'Pijnprikkel' : 'Niet wekbaar'})`);
    elevateUrgency(1);
  }

  const urgencyMap: Record<number, UrgencyLevel> = { 1: 'U1', 2: 'U2', 3: 'U3', 4: 'U4', 5: 'U5' };
  const calculatedUrgency: UrgencyLevel = urgencyMap[urgencyScore] || 'U5';

  // Summary Text
  const vitalsSummary = `RR: ${systolic || '-'}/${diastolic || '-'} mmHg | Pols: ${heartRate || '-'} bpm | SpO2: ${spO2 || '-'}% | Temp: ${temperature || '-'}°C | Glucose: ${glucose || '-'} mmol/L | AF: ${respRate || '-'} /min | AVPU: ${avpu}`;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(vitalsSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    if (onExportToSbar) {
      onExportToSbar(
        {
          systolicBP: sysNum || undefined,
          diastolicBP: diaNum || undefined,
          heartRate: hrNum || undefined,
          oxygenSaturation: satNum || undefined,
          temperature: tempNum || undefined,
          bloodGlucose: glucNum || undefined,
          respiratoryRate: respNum || undefined,
          avpu
        },
        vitalsSummary,
        calculatedUrgency
      );
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 mb-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Klinische Triage & Vitale Functies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display leading-snug">
            Meetwaarden & Early Warning Invoer
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Vul direct de gemeten parameters in. De app analyseert fysiologische afwijkingen, qSOFA sepsis-criteria en genereert een kant-en-klare SBAR-overdracht.
          </p>
        </div>

        {/* Live Urgency Status Banner */}
        <div className={`mt-6 p-5 rounded-2xl border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          calculatedUrgency === 'U1'
            ? 'bg-rose-50/90 text-rose-950'
            : calculatedUrgency === 'U2'
            ? 'bg-amber-50/90 text-amber-950'
            : 'bg-blue-50/70 text-blue-950'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0 ${
              calculatedUrgency === 'U1' ? 'bg-rose-600 animate-pulse' : calculatedUrgency === 'U2' ? 'bg-amber-600' : 'bg-blue-600'
            }`}>
              {calculatedUrgency}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">
                {calculatedUrgency === 'U1' && 'U1: Acuut Levensgevaar (Direct 112)'}
                {calculatedUrgency === 'U2' && 'U2: Spoed (Arts binnen 1 uur ter plaatse)'}
                {calculatedUrgency === 'U3' && 'U3: Dringend (Beoordeling arts binnen enkele uren)'}
                {calculatedUrgency === 'U4' && 'U4: Routine (Volgende werkdag / eigen arts)'}
                {calculatedUrgency === 'U5' && 'U5: Stabiel / Geen directe alarmsignalen'}
              </p>
              <p className="text-xs mt-0.5 opacity-90">
                {criticalAlerts.length > 0 
                  ? `${criticalAlerts.length} kritieke afwijking(en) gedetecteerd`
                  : warningAlerts.length > 0
                  ? `${warningAlerts.length} aandachtspunt(en)`
                  : 'Meetwaarden vallen binnen normale fysiologische grenzen'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handleCopySummary}
              className="py-2 px-3.5 bg-white/90 hover:bg-white text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <ClipboardCopy className="w-3.5 h-3.5" />
              <span>{copied ? 'Gekopieerd!' : 'Kopieer meetreeks'}</span>
            </button>
            {onExportToSbar && (
              <button
                onClick={handleExport}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Naar SBAR overdracht</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Student Test Scenario Loader */}
        {isStudentMode && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Oefenscenario's:</span>
            <button
              type="button"
              onClick={() => {
                setSystolic('80');
                setDiastolic('50');
                setHeartRate('135');
                setSpO2('86');
                setTemperature('39.4');
                setGlucose('6.2');
                setRespRate('28');
                setAvpu('V');
              }}
              className="px-2.5 py-1 bg-rose-50 text-rose-800 rounded-lg font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Laad septische shock (U1)
            </button>
            <button
              type="button"
              onClick={() => {
                setSystolic('125');
                setDiastolic('80');
                setHeartRate('72');
                setSpO2('98');
                setTemperature('36.8');
                setGlucose('5.5');
                setRespRate('14');
                setAvpu('A');
              }}
              className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              Laad stabiele waarden (U5)
            </button>
            <button
              type="button"
              onClick={() => {
                setSystolic('');
                setDiastolic('');
                setHeartRate('');
                setSpO2('');
                setTemperature('');
                setGlucose('');
                setRespRate('');
                setAvpu('A');
              }}
              className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Leegmaken
            </button>
          </div>
        )}

        {/* Onderbouwing van dit advies (ClinicalDecisionTrace) */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowTrace(!showTrace)}
            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Onderbouwing van dit advies</span>
            </div>
            <span className="text-blue-600 text-xs">
              {showTrace ? 'Inklappen' : 'Toon beslisregel & afkapwaarden'}
            </span>
          </button>

          {showTrace && (() => {
            const decisionTrace: ClinicalDecisionTrace = {
              urgency: calculatedUrgency,
              sourceOrganization: 'V&VN / NHG (Vitale Functies, NEWS2 & qSOFA)',
              guidelineTitle: 'Handreiking Vitale Functies & Sepsis Herkenning',
              versionOrYear: 'In validatie',
              appliedDecisionRule:
                calculatedUrgency === 'U1'
                  ? 'Aanwezigheid van kritieke grenswaarde (Systolisch ≤ 85 mmHg, SpO2 < 88%, Pols ≤ 40 bpm, AF ≥ 25 of AVPU niet alert) activeert direct urgentieklasse U1.'
                  : calculatedUrgency === 'U2'
                  ? 'Aanwezigheid van ernstig afwijkende meetwaarden vereist fysieke artsbeoordeling binnen 1 uur (U2).'
                  : calculatedUrgency === 'U3'
                  ? 'Afwijkende parameters (bijv. koorts of lichte tachycardie) vereisen overleg binnen enkele uren (U3).'
                  : 'Alle ingevulde parameters vallen binnen veilige referentiewaarden voor volwassenen.',
              triggeringData:
                criticalAlerts.length > 0 || warningAlerts.length > 0
                  ? [...criticalAlerts, ...warningAlerts]
                  : ['Alle gemeten parameters binnen normale fysiologische grenzen']
            };

            return (
              <div className="mt-3 p-5 bg-slate-50/80 rounded-2xl border-0 space-y-3 text-xs text-slate-700 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Bronorganisatie:</span>
                    <span className="font-bold text-slate-900">{decisionTrace.sourceOrganization}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Richtlijn:</span>
                    <span className="font-bold text-slate-900">{decisionTrace.guidelineTitle}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Status:</span>
                    <span className="font-bold text-slate-900">{decisionTrace.versionOrYear}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">Beslisregel:</span>
                    <span className="font-bold text-slate-900">{decisionTrace.appliedDecisionRule}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl shadow-2xs space-y-1">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                    Geactiveerd door meetwaarden (Triggering data):
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800">
                    {decisionTrace.triggeringData.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Critical Alerts List */}
      {(criticalAlerts.length > 0 || warningAlerts.length > 0) && (
        <div className="space-y-2">
          {criticalAlerts.map((alert, i) => (
            <div key={`crit-${i}`} className="p-3 bg-rose-100/80 border border-rose-300 text-rose-900 text-xs font-semibold rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" />
              <span>{alert}</span>
            </div>
          ))}
          {warningAlerts.map((alert, i) => (
            <div key={`warn-${i}`} className="p-3 bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{alert}</span>
            </div>
          ))}
        </div>
      )}

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Bloeddruk */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(15,23,42,0.03)] border-0 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Bloeddruk (RR)</span>
            </span>
            <span>mmHg</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Syst"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className="w-1/2 p-3 bg-slate-50/90 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-xs"
            />
            <span className="text-slate-400 font-bold">/</span>
            <input
              type="number"
              placeholder="Diast"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="w-1/2 p-3 bg-slate-50/90 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-xs"
            />
          </div>
          <p className="text-[11px] text-slate-400">Normaal: 120/80 (Syst: 110-140)</p>
        </div>

        {/* Pols / Hartfrequentie */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(15,23,42,0.03)] border-0 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Hartfrequentie</span>
            </span>
            <span>bpm</span>
          </div>
          <input
            type="number"
            placeholder="Bijv. 76"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            className="w-full p-3 bg-slate-50/90 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-xs"
          />
          <p className="text-[11px] text-slate-400">Normaal rust: 60 - 95 slagen/min</p>
        </div>

        {/* Zuurstofsaturatie */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(15,23,42,0.03)] border-0 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Wind className="w-4 h-4 text-blue-500" />
              <span>Saturatie (SpO2)</span>
            </span>
            <span>%</span>
          </div>
          <input
            type="number"
            placeholder="Bijv. 97"
            value={spO2}
            onChange={(e) => setSpO2(e.target.value)}
            className="w-full p-3 bg-slate-50/90 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-xs"
          />
          <p className="text-[11px] text-slate-400">Normaal: ≥ 95% (COPD: 88-92%)</p>
        </div>

        {/* Temperatuur */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(15,23,42,0.03)] border-0 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Thermometer className="w-4 h-4 text-amber-500" />
              <span>Temperatuur</span>
            </span>
            <span>°C</span>
          </div>
          <input
            type="number"
            step="0.1"
            placeholder="Bijv. 37.2"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full p-3 bg-slate-50/90 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-xs"
          />
          <p className="text-[11px] text-slate-400">Normaal: 36.5 - 37.5°C (Koorts: ≥ 38.0)</p>
        </div>

        {/* Bloedglucose */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(15,23,42,0.03)] border-0 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Droplet className="w-4 h-4 text-blue-500" />
              <span>Bloedglucose</span>
            </span>
            <span>mmol/L</span>
          </div>
          <input
            type="number"
            step="0.1"
            placeholder="Bijv. 5.6"
            value={glucose}
            onChange={(e) => setGlucose(e.target.value)}
            className="w-full p-3 bg-slate-50/90 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-xs"
          />
          <p className="text-[11px] text-slate-400">Nuchter: 4.0 - 7.0 (Hypo: &lt; 3.5)</p>
        </div>

        {/* Ademfrequentie */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(15,23,42,0.03)] border-0 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Wind className="w-4 h-4 text-blue-600" />
              <span>Ademfrequentie</span>
            </span>
            <span>/minuut</span>
          </div>
          <input
            type="number"
            placeholder="Bijv. 14"
            value={respRate}
            onChange={(e) => setRespRate(e.target.value)}
            className="w-full p-3 bg-slate-50/90 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-xs"
          />
          <p className="text-[11px] text-slate-400">Normaal: 12 - 18 /min (qSOFA: ≥ 22)</p>
        </div>

        {/* Bewustzijn (AVPU) */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(15,23,42,0.03)] border-0 space-y-3 sm:col-span-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="text-slate-800">Bewustzijnsschaal (AVPU)</span>
            <span>Neurologische status</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'A', label: 'Alert (Helder)' },
              { id: 'V', label: 'Voice (Spraak)' },
              { id: 'P', label: 'Pain (Pijn)' },
              { id: 'U', label: 'Unresponsive' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAvpu(item.id as 'A' | 'V' | 'P' | 'U')}
                className={`py-2.5 px-1.5 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  avpu === item.id
                    ? item.id === 'A'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {item.id}
                <span className="hidden sm:block text-[10px] font-normal opacity-90 truncate mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* SBAR Output Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-[0_4px_25px_rgba(15,23,42,0.03)] border-0 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-blue-300 uppercase tracking-wide">
            Klinische Gegevensoverdracht
          </span>
          <button
            onClick={handleCopySummary}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 font-semibold cursor-pointer transition-colors"
          >
            <ClipboardCopy className="w-3.5 h-3.5" />
            <span>{copied ? 'Gekopieerd!' : 'Kopieer'}</span>
          </button>
        </div>
        <p className="font-mono text-xs sm:text-sm text-blue-100/90 leading-relaxed bg-slate-800/80 p-4 rounded-2xl border-0">
          {vitalsSummary}
        </p>
      </div>

    </div>
  );
};
