import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  Building2, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

export const SourcesViewer: React.FC = () => {
  const sources = [
    {
      org: 'Nederlands Huisartsen Genootschap (NHG)',
      type: 'NHG-Standaarden & Triagecriteria',
      items: [
        'Acuut hoesten en dyspneu (2025)',
        'Acuut coronair syndroom (2025)',
        'Acute buikpijn bij volwassenen (2024)',
        'Duizeligheid en syncope (2024)',
        'Delier bij kwetsbare ouderen (2025)',
        'Urineweginfecties en urosepsis (2025)'
      ],
      link: 'https://richtlijnen.nhg.org'
    },
    {
      org: 'Verpleegkundigen & Verzorgenden Nederland (V&VN)',
      type: 'Klinische Richtlijnen & Kwaliteitsstandaarden',
      items: [
        'Richtlijn Sepsis herkenning buiten het ziekenhuis (qSOFA)',
        'Richtlijn Delier bij volwassenen en ouderen',
        'Handreiking Bloeddrukmeting & Orthostase',
        'Richtlijn Veilige principes in de medicatieketen',
        'Richtlijn Pijnmeting bij kwetsbare doelgroepen'
      ],
      link: 'https://www.venvn.nl'
    },
    {
      org: 'Vilans Kenniscentrum',
      type: 'KICK-Protocollen voor Voorbehouden & Risicovolle Handelingen',
      items: [
        'Meten van vitale functies (RR, pols, SpO2, temperatuur)',
        'Bloedglucose bepalen en insulinetoediening',
        'Zuurstoftoediening en inhalatietherapie',
        'Blaaskatheterisatie en blaasscan',
        'Wondzorg volgens het TIME-model'
      ],
      link: 'https://www.vilans.nl'
    },
    {
      org: 'Nederlandse Vereniging van Artsen voor Verstandelijk Gehandicapten (NVAVG)',
      type: 'Gespecialiseerde GHZ/LVB Richtlijnen',
      items: [
        'Richtlijn Signaleren van Pijn bij Mensen met een Verstandelijke Beperking',
        'Richtlijn Obstipatie bij verstandelijke beperking',
        'Richtlijn Probleemgedrag en Psychofarmaca'
      ],
      link: 'https://www.nvavg.nl'
    },
    {
      org: 'Nederlandse Triage Standaard (NTS)',
      type: 'Landelijke Urgenciestructuur',
      items: [
        'U1: Levensbedreigend (onmiddellijk ambulance/reanimatie)',
        'U2: Spoed (beoordeling binnen 1 uur)',
        'U3: Dringend (beoordeling binnen enkele uren)',
        'U4: Routine (volgende werkdag)',
        'U5: Zelfzorg en advies'
      ],
      link: 'https://www.de-nts.nl'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Transparantie, Veiligheid & Herleidbaarheid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Onderliggende Richtlijnen & Verdienmodel
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            ZorgKompas verzint geen medische protocollen. Alle beslisbomen, drempelwaarden en handelingsperspectieven zijn rechtstreeks herleidbaar naar gevalideerde Nederlandse zorgstandaarden.
          </p>
        </div>
      </div>

      {/* AI Veiligheid Guardrails */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Strikte AI-Veiligheid & Kaders
            </h2>
            <p className="text-xs text-slate-500">
              Hoe voorkomen we dat AI onveilig 'hallucineert' in de zorg?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <p className="font-bold text-slate-900">1. Geen autonome diagnoses</p>
            <p className="text-slate-600 leading-relaxed">
              De AI stelt nooit diagnoses, maar formuleert hypothesen en verwijst altijd naar fysieke metingen en artsbeoordeling.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <p className="font-bold text-slate-900">2. Harde U1-veiligheidscut-offs</p>
            <p className="text-slate-600 leading-relaxed">
              Bij alarmsignalen (SpO2 &lt; 90%, systolisch &lt; 85 mmHg, bewusteloosheid) onderbreekt het systeem de dialoog en toont direct 112/noodprotocollen.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <p className="font-bold text-slate-900">3. Gronding in Nederlandse standaarden</p>
            <p className="text-slate-600 leading-relaxed">
              Adviezen zijn begrensd tot gevalideerde protocollen van NHG, V&VN, Vilans en NVAVG.
            </p>
          </div>
        </div>
      </div>

      {/* Herleidbare Bronnen Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-display">
          Herleidbare Zorgstandaarden & Richtlijnen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((src, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-teal-800 uppercase tracking-wide">{src.type}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {src.org}
                </h3>
                <ul className="mt-3 space-y-1 text-xs text-slate-600 list-disc pl-4">
                  {src.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Officieel register</span>
                <span className="text-teal-700 font-semibold flex items-center gap-1">
                  <span>Gevalideerd</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commercieel B2B Verdienmodel & Terugkerende Waarde */}
      <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-5">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wide">
            B2B Waardepropositie & Verdienmodel
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display mt-1">
            Waarom zorginstellingen investeren in ZorgKompas
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Zorgorganisaties kampen met hoge personeelsverloop, nachtdienststress en overbelaste artsenposten. ZorgKompas levert meetbare tijdwinst en kwaliteitsborging op de vloer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1">
            <h4 className="font-bold text-teal-300 text-sm">1. Foutreductie in Overdracht</h4>
            <p className="text-slate-300 leading-relaxed">
              Gestructureerde SBAR en SOAP voorkomen vergeten vitale parameters bij telefonisch artscontact om 03:00 uur.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1">
            <h4 className="font-bold text-teal-300 text-sm">2. V&VN Accreditatie</h4>
            <p className="text-slate-300 leading-relaxed">
              Zorgmedewerkers bouwen continu geaccrediteerde deskundigheidspunten op via casussen en triage-simulaties.
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1">
            <h4 className="font-bold text-teal-300 text-sm">3. ECD & HIS Koppeling</h4>
            <p className="text-slate-300 leading-relaxed">
              Jaarabonnement per zorgorganisatie (SaaS-licentie per medewerker) met directe API-koppeling naar Nedap Ons en HiX.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
