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
import { VitalParameters, UrgencyLevel } from '../../types';
import { VITAL_SIGNS_THRESHOLDS } from '../../data/somaticTriage';

interface VitalsCheckerProps {
  onExportToSbar?: (vitals: VitalParameters, summaryText: string, calculatedUrgency: UrgencyLevel) => void;
}

export const VitalsChecker: React.FC<VitalsCheckerProps> = ({ onExportToSbar }) => {
  const [systolic, setSystolic] = useState<string>('');
  const [diastolic, setDiastolic] = useState<string>('');
  const [heartRate, setHeartRate] = useState<string>('');
  const [spO2, setSpO2] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [glucose, setGlucose] = useState<string>('');
  const [respRate, setRespRate] = useState<string>('');
  const [avpu, setAvpu] = useState<'A' | 'V' | 'P' | 'U'>('A');

  const [copied, setCopied] = useState(false);

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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Klinische Triage & Vitale Functies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Meetwaarden & Early Warning Invoer
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Vul direct de gemeten parameters in. De app analyseert fysiologische afwijkingen, qSOFA sepsis-criteria en genereert een kant-en-klare SBAR-overdracht.
          </p>
        </div>

        {/* Live Urgency Status Banner */}
        <div className={`mt-5 p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          calculatedUrgency === 'U1'
            ? 'bg-rose-50 border-rose-300 text-rose-950'
            : calculatedUrgency === 'U2'
            ? 'bg-amber-50 border-amber-300 text-amber-950'
            : calculatedUrgency === 'U3'
            ? 'bg-yellow-50 border-yellow-200 text-yellow-950'
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0 ${
              calculatedUrgency === 'U1' ? 'bg-rose-600' : calculatedUrgency === 'U2' ? 'bg-amber-600' : calculatedUrgency === 'U3' ? 'bg-yellow-600' : 'bg-emerald-600'
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

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleCopySummary}
              className="py-1.5 px-3 bg-white/80 hover:bg-white text-slate-800 border rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ClipboardCopy className="w-3.5 h-3.5" />
              <span>{copied ? 'Gekopieerd!' : 'Kopieer meetreeks'}</span>
            </button>
            {onExportToSbar && (
              <button
                onClick={handleExport}
                className="py-1.5 px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Naar SBAR overdracht</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Bloeddruk */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Activity className="w-4 h-4 text-teal-600" />
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
              className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
            />
            <span className="text-slate-400 font-bold">/</span>
            <input
              type="number"
              placeholder="Diast"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="w-1/2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
            />
          </div>
          <p className="text-[11px] text-slate-400">Normaal: 120/80 (Syst: 110-140)</p>
        </div>

        {/* Pols / Hartfrequentie */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
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
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          />
          <p className="text-[11px] text-slate-400">Normaal rust: 60 - 95 slagen/min</p>
        </div>

        {/* Zuurstofsaturatie */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
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
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          />
          <p className="text-[11px] text-slate-400">Normaal: ≥ 95% (COPD: 88-92%)</p>
        </div>

        {/* Temperatuur */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
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
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          />
          <p className="text-[11px] text-slate-400">Normaal: 36.5 - 37.5°C (Koorts: ≥ 38.0)</p>
        </div>

        {/* Bloedglucose */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Droplet className="w-4 h-4 text-purple-500" />
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
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          />
          <p className="text-[11px] text-slate-400">Nuchter: 4.0 - 7.0 (Hypo: &lt; 3.5)</p>
        </div>

        {/* Ademfrequentie */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Wind className="w-4 h-4 text-teal-600" />
              <span>Ademfrequentie</span>
            </span>
            <span>/minuut</span>
          </div>
          <input
            type="number"
            placeholder="Bijv. 14"
            value={respRate}
            onChange={(e) => setRespRate(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/20"
          />
          <p className="text-[11px] text-slate-400">Normaal: 12 - 18 /min (qSOFA: ≥ 22)</p>
        </div>

        {/* Bewustzijn (AVPU) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2 sm:col-span-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span className="text-slate-800">Bewustzijnsschaal (AVPU)</span>
            <span>Neurologische status</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
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
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  avpu === item.id
                    ? item.id === 'A'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item.id}
                <span className="hidden sm:block text-[10px] font-normal opacity-90 truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* SBAR Output Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide">
            Klinische Gegevensoverdracht
          </span>
          <button
            onClick={handleCopySummary}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
          >
            <ClipboardCopy className="w-3.5 h-3.5" />
            <span>{copied ? 'Gekopieerd!' : 'Kopieer'}</span>
          </button>
        </div>
        <p className="font-mono text-xs sm:text-sm text-teal-100/90 leading-relaxed bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
          {vitalsSummary}
        </p>
      </div>

    </div>
  );
};
