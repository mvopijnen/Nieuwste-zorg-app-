import { SomaticTriageTopic, AbcdeStep, ClinicalGuidelineSource } from '../types';

export const ABCDE_PROTOCOL: AbcdeStep[] = [
  {
    letter: 'A',
    title: 'Airway (Luchtweg)',
    focus: 'Vrije luchtweg & bedreigingen',
    checks: [
      'Kan de cliënt normaal praten? (Zo ja = vrije luchtweg)',
      'Hoorbare ademgeluiden: stridor (piepen bij inademing), snurken, gorgelen?',
      'Inspectie mondholte: braaksel, bloed, corpus alienum of gebitsprothese los?'
    ],
    redFlags: [
      'Stridor of totale stilte bij adempogingen (luchtwegobstructie)',
      'Verstikking of massaal aspiratiegevaar',
      'Angio-oedeem (zwelling tong/lippen na medicatie of insectensteek)'
    ],
    immediateInterventions: [
      'Kinlift of kaakhandgreep bij bewusteloosheid',
      'Uitzuigen bij braaksel/sputum (mits getraind en materiaal aanwezig)',
      'Stabiele zijligging bij spontane ademhaling en verlaagd bewustzijn',
      'Bij acute obstructie: Heimlich manoeuvre of 5 rugslagen + 5 buikstoten'
    ]
  },
  {
    letter: 'B',
    title: 'Breathing (Ademhaling)',
    focus: 'Effectiviteit, frequentie & zuurstofgehalte',
    checks: [
      'Ademfrequentie tellen (normaal volwassene: 12 - 20 per minuut)',
      'Zuurstofsaturatie (SpO2) meten (normaal ≥ 95%, bij COPD vaak streefwaarde 88-92%)',
      'Kijk naar ademarbeid: gebruik hulpademhalingsspieren, neusvleugelen, intrekkingen?',
      'Huidskleur: cyanose (blauwe lippen of nagelbedden)?'
    ],
    redFlags: [
      'Ademfrequentie < 8 of > 30 per minuut',
      'SpO2 < 90% (of < 85% bij COPD)',
      'Uitputting: patiënt kan geen hele zin meer uitspreken ("één-woord-zinnen")'
    ],
    immediateInterventions: [
      'Rechtop zittende houding (orthopneu verlichten)',
      'Kleding losmaken rond borst en hals',
      'Zuurstoftoediening volgens voorschrift/protocol (bijv. 2-4 L/min via neusbril)',
      'Direct arts/112 waarschuwen bij respiratoire insufficiëntie'
    ]
  },
  {
    letter: 'C',
    title: 'Circulation (Circulatie)',
    focus: 'Hartfrequentie, bloeddruk, perfusie & bloeding',
    checks: [
      'Polsfrequentie en ritme (normaal in rust: 60 - 100/min, regelmatig)',
      'Bloeddruk meten (systolisch en diastolisch)',
      'Capillary Refill Time (CRT / capillaire refill op vingertop: normaal < 2 seconden)',
      'Huidtemperatuur en klamheid (koud, klam, grauw = verdenking shock)',
      'Zijn er actieve uitwendige bloedingen?'
    ],
    redFlags: [
      'Systolische bloeddruk < 90 mmHg (hypotensieve shock)',
      'Hartfrequentie > 130/min of < 40/min in rust',
      'Koude, gemarmerde extremiteiten + CRT > 3 seconden',
      'Massaal bloedverlies (bijv. maagbloeding of ernstig trauma)'
    ],
    immediateInterventions: [
      'Actieve bloeding direct afdrukken met steriel gaas / drukverband',
      'Bij hypotensie/collaps: benen omhoog brengen (tenzij benauwd)',
      'Warmtedeken om onderkoeling te voorkomen',
      'Bij verdenking sepsis direct vitale functies doorgeven aan arts'
    ]
  },
  {
    letter: 'D',
    title: 'Disability (Bewustzijn & Neurologie)',
    focus: 'Bewustzijnsniveau, pupillen & glucose',
    checks: [
      'AVPU-score: Alert, Voice (reageert op aanspreken), Pain (reageert op pijnprikkel), Unresponsive',
      'Bloedglucosewaarde meten (altijd meten bij veranderd bewustzijn!)',
      'Pupillen controleren: gelijk, rond en lichtreactief?',
      'FAST-test bij plotselinge uitval: Face (scheve mond), Arm (lamme arm), Speech (onduidelijke spraak), Time'
    ],
    redFlags: [
      'AVPU score is "P" of "U" (reageert alleen op pijn of reageert helemaal niet)',
      'Bloedglucose < 3.5 mmol/L (acute hypoglykemie) of > 25 mmol/L',
      'Acute asymmetrie in gezicht of eenzijdige spierzwakte (verdenking CVA / TIA)',
      'Aanhoudend insult / epileptische status epilepticus > 5 minuten'
    ],
    immediateInterventions: [
      'Bij hypoglykemie en bij bewustzijn: snelle suikers (dextrose/limonadesiroop)',
      'Bij hypoglykemie en bewusteloos: NIETS oraal toedienen (aspiratiegevaar!); glucagon/arts bellen',
      'Bij insult: bescherm hoofd, stop niets tussen de tanden, start timer, midazolam neusspray indien afgesproken',
      'Bij positieve FAST: direct 112 bellen voor trombolyse window'
    ]
  },
  {
    letter: 'E',
    title: 'Exposure / Environment (Inspectie & Temperatuur)',
    focus: 'Lichaamstemperatuur, huiduitslag, trauma & context',
    checks: [
      'Lichaamstemperatuur rectaal/oor meten (normaal: 36.5°C - 37.5°C)',
      'Volledige huidinspectie: niet-wegdrukbare rode vlekjes (petechiën), wonden, decubitus?',
      'Controleer op hematomen, zwellingen of afwijkende stand na mogelijke val',
      'Controleer infusen, katheters en sondes op afknelling of lekkage'
    ],
    redFlags: [
      'Petechiën / purpura (niet wegdrukbare puntbloedingen: verdenking meningokokken)',
      'Temperatuur > 40.5°C of < 35.0°C (ernstige hypothermie)',
      'Pijnlijke, harde, gezwollen kuit (verdenking diepe veneuze trombose / DVT)'
    ],
    immediateInterventions: [
      'Afkoelen bij hitteberoerte of verwarmen bij onderkoeling',
      'Huiduitslag testen met een glas (wegdrukbaarheids-test)',
      'Patiënt toedekken tegen warmteverlies en privacy waarborgen'
    ]
  }
];

export const SOMATIC_TRIAGE_TOPICS: SomaticTriageTopic[] = [
  {
    id: 'benauwdheid-dyspneu',
    slug: 'benauwdheid-dyspneu',
    title: 'Benauwdheid & Kortademigheid (Dyspneu)',
    shortDescription: 'Acute of progressieve ademnood; onderscheid tussen astma/COPD, hartfalen, longembolie en hyperventilatie.',
    icon: 'Wind',
    primaryUrgency: 'U2',
    commonInSectors: ['VVT', 'GHZ', 'GGZ'],
    typicalSymptoms: ['Kortademigheid in rust of bij minimale inspanning', 'Snelle hoorbare ademhaling', 'Piepen of reutelen', 'Blauwe lippen of nagelbedden'],
    criticalRedFlags: [
      'Ademfrequentie > 30 per minuut of < 8 per minuut',
      'Zuurstofsaturatie < 90% (zonder bekend ernstig COPD)',
      'Patiënt kan geen volzinnen meer spreken (uitputting)',
      'Stridor (inspiratoir piepen) of intrekkingen bij hals en borstkas',
      'Verlaagd bewustzijn in combinatie met benauwdheid (CO2-retentie / respiratoire insufficiëntie)'
    ],
    guidelines: [
      {
        title: 'NHG-Standaard Acuut Hoesten en Dyspneu',
        organization: 'NHG',
        summary: 'Triagecriteria voor acute kortademigheid, alarmsymptomen van hartfalen en longembolie.',
        lastUpdated: '2025'
      },
      {
        title: 'Nederlandse Triage Standaard (NTS) - Kortademigheid volwassenen',
        organization: 'NTS',
        summary: 'Urgencietoekenning U1 t/m U4 op basis van ademarbeid en saturatie.',
        lastUpdated: '2024'
      }
    ],
    triageQuestions: [
      {
        question: 'Stap 1: Kan de cliënt nog in volzinnen spreken en hoe hoog is de saturatie?',
        description: 'Beoordeel ademarbeid en meet SpO2.',
        options: [
          {
            text: 'Cliënt is uitgeput, spreekt in één-woord-zinnen, SpO2 < 90% of cyanose',
            urgency: 'U1',
            actionSnippet: 'Direct 112 bellen voor ambulance met A-urgentie. Rechtop laten zitten, kleding los, zuurstof toedienen.',
            isRedFlag: true
          },
          {
            text: 'Duidelijk benauwd in rust, spreekt korte zinnen, SpO2 90-93% of hoorbaar piepen/reutelen',
            urgency: 'U2',
            actionSnippet: 'Direct dienstdoende arts / HAP inschakelen (beoordeling binnen 1 uur). Vitale functies compleet meten.',
            isRedFlag: false
          },
          {
            text: 'Enkel kortademig bij inspanning, hoest al enkele dagen, geen koorts, SpO2 ≥ 95%',
            urgency: 'U3',
            actionSnippet: 'Overleg met behandelend arts / huisarts dezelfde dag. Start observatielijst.',
            isRedFlag: false
          }
        ]
      },
      {
        question: 'Stap 2: Is er sprake van koorts, pijn vast aan de ademhaling of een dik pijnlijk been?',
        description: 'Differentiatie tussen pneumonie, longembolie en COPD-exacerbatie.',
        options: [
          {
            text: 'Plotseling ontstaan, stekende pijn op de borst, éénzijdig gezwollen kuit of hemoptoë (bloed ophoesten)',
            urgency: 'U1',
            actionSnippet: 'Verdenking longembolie! Direct met spoed arts waarschuwen / 112.',
            isRedFlag: true
          },
          {
            text: 'Koorts (> 38.5°C), purulent sputum, algehele malaise bij kwetsbare cliënt',
            urgency: 'U2',
            actionSnippet: 'Verdenking pneumonie. Arts binnen enkele uren voor auscultatie en evt. antibioticastart.',
            isRedFlag: false
          },
          {
            text: 'Bekend met paniekaanvallen/hyperventilatie, tintelingen rond mond en handen, SpO2 99-100%',
            urgency: 'U4',
            actionSnippet: 'Begeleid rustige buikademhaling (4 sec in, 6 sec uit). Blijf co-reguleren.',
            isRedFlag: false
          }
        ]
      }
    ],
    sbarTemplate: {
      situation: 'Ik bel voor cliënt [Naam/Geboortedatum], die sinds [tijdstip] toenemend ernstig benauwd is.',
      background: 'Bekend met [COPD / Astma / Hartfalen]. Huidige medicatie: [inhalatoren / diuretica].',
      assessment: 'Huidige vitale functies: SpO2 [..]%, Ademfrequentie [..]/min, Pols [..]/min, RR [..]/[..], Temp [..]°C. Cliënt spreekt [in volzinnen / één-woord-zinnen].',
      recommendation: 'Ik vraag u om deze cliënt [direct met spoed / binnen 1 uur] te beoordelen voor respiratoire ondersteuning.'
    }
  },
  {
    id: 'duizeligheid-hypotensie',
    slug: 'duizeligheid-hypotensie',
    title: 'Duizeligheid, Hypotensie & Collapsneiging',
    shortDescription: 'Licht in het hoofd, wegraken bij opstaan, lage tensie of acute ritmestoornis.',
    icon: 'Activity',
    primaryUrgency: 'U3',
    commonInSectors: ['VVT', 'GHZ', 'GGZ'],
    typicalSymptoms: ['Draaiduizeligheid of licht gevoel in het hoofd', 'Zwart voor de ogen bij overeind komen', 'Bleek zien en koud zweet', 'Zwabberende benen'],
    criticalRedFlags: [
      'Gepaard met druk op de borst, uitstralende pijn of acute kortademigheid',
      'Systolische bloeddruk < 85 mmHg met sufheid of verwardheid',
      'Pols < 40 of > 140 slagen per minuut in rust',
      'Val met hoofdletsel bij gebruik van bloedverdunners (DOAC/coumarines)'
    ],
    guidelines: [
      {
        title: 'NHG-Standaard Duizeligheid en Wegrakingen',
        organization: 'NHG',
        summary: 'Onderscheid tussen vertigo, orthostase en cardiale syncope.',
        lastUpdated: '2024'
      },
      {
        title: 'V&VN Handreiking Bloeddrukmeting en Orthostase',
        organization: 'V&VN',
        summary: 'Correct meten van liggende en staande bloeddruk na 1 en 3 minuten.',
        lastUpdated: '2023'
      }
    ],
    triageQuestions: [
      {
        question: 'Stap 1: Is de cliënt echt bewusteloos geweest (wegraking) of gevallen?',
        description: 'Vraag naar tongbeet, trekkingen, hersteltijd en hoofdletsel.',
        options: [
          {
            text: 'Wegraking met trekkingen of cliënt gebruikt bloedverdunners en heeft hoofd gestoten',
            urgency: 'U2',
            actionSnippet: 'Direct arts waarschuwen. Pupillen en EMV-score monitoren. Let op intracranieel hematoom.',
            isRedFlag: true
          },
          {
            text: 'Geen bewustzijnsverlies; alleen duizelig bij overeind komen uit bed/stoel',
            urgency: 'U4',
            actionSnippet: 'Laat cliënt rustig liggen/zitten. Meet liggende en staande bloeddruk (orthostasetest). Bied water aan.',
            isRedFlag: false
          }
        ]
      },
      {
        question: 'Stap 2: Wat zijn de actuele bloeddruk en hartfrequentie?',
        options: [
          {
            text: 'Systolisch < 90 mmHg of pols onregelmatig > 120 / < 45/min',
            urgency: 'U2',
            actionSnippet: 'Overleg direct met arts. Leg benen hoog mits niet benauwd. Controleer vochtinname en medicatielijst.',
            isRedFlag: true
          },
          {
            text: 'Tensie binnen acceptabele grenzen, klachten nemen af na glas water en even rusten',
            urgency: 'U5',
            actionSnippet: 'Adviseer rustig opstaan via de bedrand. Registreer vochtlijst en temperatuur.',
            isRedFlag: false
          }
        ]
      }
    ],
    sbarTemplate: {
      situation: 'Cliënt [Naam] heeft acute klachten van duizeligheid en collapsneiging sinds [tijdstip].',
      background: 'Cliënt gebruikt [antihypertensiva / psychofarmaca / bloedverdunners]. Eerdere valhistorie: [ja/nee].',
      assessment: 'RR liggend [..]/[..], staand [..]/[..]. Pols [..]/min [regelmatig/onregelmatig]. Glucose [..] mmol/L. Geen uitvalsverschijnselen.',
      recommendation: 'Graag uw beoordeling of medicatieaanpassing (bijv. diuretica/bloeddrukverlagers) wenselijk is.'
    }
  },
  {
    id: 'koorts-sepsis',
    slug: 'koorts-sepsis',
    title: 'Koorts, Koude Rillingen & Sepsis Triage',
    shortDescription: 'Verhoogde lichaamstemperatuur; snelle herkenning van urosepsis, pneumonie of systemische infectie.',
    icon: 'Thermometer',
    primaryUrgency: 'U2',
    commonInSectors: ['VVT', 'GHZ', 'GGZ'],
    typicalSymptoms: ['Temperatuur > 38.5°C of juist ondertemperatuur < 36.0°C', 'Klappertanden / hevige koude rillingen', 'Snelle ademhaling en snelle pols', 'Acute verwardheid of sufheid'],
    criticalRedFlags: [
      'qSOFA criteria positief (≥ 2 van: ademfrequentie ≥ 22/min, veranderd bewustzijn, systolische RR ≤ 100 mmHg)',
      'Koude rillingen die niet stoppen (bacteriëmie / sepsis alarm)',
      'Niet-wegdrukbare rode huiduitslag (petechiën)',
      'Al meer dan 12 uur niet geplast of troebele stinkende urine met flankpijn'
    ],
    guidelines: [
      {
        title: 'Richtlijn Herkenning en Behandeling van Sepsis buiten het Ziekenhuis',
        organization: 'V&VN',
        summary: 'Toepassing van qSOFA-score in de langdurige zorg en thuiszorg.',
        lastUpdated: '2024'
      },
      {
        title: 'NHG-Standaard Urineweginfecties & Kwetsbare Ouderen',
        organization: 'NHG',
        summary: 'Beleid bij urineweginfectie met weefselinvasie en delier.',
        lastUpdated: '2025'
      }
    ],
    triageQuestions: [
      {
        question: 'Stap 1: qSOFA Sepsis Check: Voldoet de cliënt aan de alarmsymptomen?',
        description: 'Controleer: 1. Ademfrequentie ≥ 22? 2. Veranderd bewustzijn? 3. Systolische tensie ≤ 100 mmHg?',
        options: [
          {
            text: 'JA, 2 of 3 qSOFA-criteria aanwezig + koude rillingen of sufheid',
            urgency: 'U1',
            actionSnippet: 'SEPSIS ALARM! Direct met spoed arts/ambulance inschakelen. Snelle antibiotica en vochttoediening zijn levensreddend.',
            isRedFlag: true
          },
          {
            text: 'Koorts > 38.5°C met klachten van hoesten of plassen, maar tensie en ademhaling zijn stabiel',
            urgency: 'U3',
            actionSnippet: 'Arts inschakelen voor diagnostiek (urinetest / sputum / lichamelijk onderzoek) binnen enkele uren.',
            isRedFlag: false
          },
          {
            text: 'Milde temperatuursverhoging (38.0 - 38.4°C), goede eetlust, drinkt goed, helder van geest',
            urgency: 'U5',
            actionSnippet: 'Voldoende drinken aanbieden (minimaal 1.5 - 2 liter). Temperatuurcurve bijhouden. Paracetamol zo nodig.',
            isRedFlag: false
          }
        ]
      }
    ],
    sbarTemplate: {
      situation: 'Ik vermoed een ernstige infectie / mogelijke sepsis bij [Naam cliënt]. Huidige temperatuur is [..]°C.',
      background: 'Cliënt heeft een [katheter / wond / chronische longaandoening]. Bekend met urineweginfecties.',
      assessment: 'qSOFA score: [..]/3. RR: [..]/[..], Pols: [..]/min, Ademhaling: [..]/min, SpO2: [..]%. Cliënt is [alert / suf / verward].',
      recommendation: 'Ik verzoek u om deze cliënt [direct met spoed / binnen 1 uur] te beoordelen voor eventuele antibiotica en ziekenhuisopname.'
    }
  },
  {
    id: 'acute-buikpijn',
    slug: 'acute-buikpijn',
    title: 'Acute Buikpijn, Obstipatie & Retentie',
    shortDescription: 'Hevige buikklachten; uitsluiten van acute buik, ileus, urineretentie of gal-/niersteenkoliek.',
    icon: 'Stethoscope',
    primaryUrgency: 'U2',
    commonInSectors: ['GHZ', 'VVT', 'GGZ'],
    typicalSymptoms: ['Krampende of continue buikpijn', 'Opgezette gespannen buik', 'Braken (met name fecaal of gal)', 'Niet kunnen plassen of al dagen geen ontlasting'],
    criticalRedFlags: [
      'Plankharde, niet-inveerkrachtige buikwand (peritonitis / darmperforatie)',
      'Pijn gecombineerd met braken en al > 4 dagen geen ontlasting of winden (ileus)',
      'Harde bolle zwelling boven het schaambeen + niet kunnen plassen (acute urineretentie)',
      'Koude, klamme huid en daling van de bloeddruk (intra-abdominale bloeding)'
    ],
    guidelines: [
      {
        title: 'NHG-Standaard Acute Buikpijn',
        organization: 'NHG',
        summary: 'Klinisch onderzoek, palpatie van de buik en indicaties voor spoedverwijzing.',
        lastUpdated: '2024'
      },
      {
        title: 'NVAVG Richtlijn Signaleren en Behandelen van Obstipatie bij LVB',
        organization: 'NVAVG',
        summary: 'Herkenning van ernstige fecale impactie en paradoxale overloopdiarree.',
        lastUpdated: '2023'
      }
    ],
    triageQuestions: [
      {
        question: 'Stap 1: Hoe voelt de buik aan bij voorzichtige aanraking en wat is de ontlastingshistorie?',
        options: [
          {
            text: 'Plankharde buik, cliënt krimpt ineen van de pijn bij loslaten (loslaatpijn), braakt gallig',
            urgency: 'U1',
            actionSnippet: 'ACUTE BUIK! Laat cliënt nuchter blijven (geen eten of drinken!). Direct 112 / dienstdoende chirurgische beoordeling.',
            isRedFlag: true
          },
          {
            text: 'Bolle gespannen onderbuik, al > 12 uur niet geplast, onrustig ijsberen',
            urgency: 'U2',
            actionSnippet: 'Verdenking acute urineretentie. Arts inschakelen voor blaasscan of eenmalige katheterisatie.',
            isRedFlag: false
          },
          {
            text: 'Buik is soepel maar gevoelig, al 3-4 dagen geen ontlasting gehad, geen koorts',
            urgency: 'U4',
            actionSnippet: 'Overleg over laxantia (bijv. macrogol/klysma) volgens protocol. Vocht en vezels stimuleren.',
            isRedFlag: false
          }
        ]
      }
    ],
    sbarTemplate: {
      situation: 'Cliënt [Naam] heeft acute buikpijn sinds [tijdstip]. Pijnscore is [..]/10.',
      background: 'Laatste ontlasting was [aantal dagen] geleden. Laatste mictie om [tijdstip]. Bekend met obstipatie.',
      assessment: 'Buik voelt [soepel / opgezet / plankhard]. Braken: [ja/nee]. Temp: [..]°C, Pols: [..]/min, RR: [..]/[..].',
      recommendation: 'Graag uw beoordeling of [katheterisatie / laxerend beleid / spoedverwijzing] noodzakelijk is.'
    }
  },
  {
    id: 'pijn-op-de-borst',
    slug: 'pijn-op-de-borst',
    title: 'Pijn op de Borst & Cardiale Triage',
    shortDescription: 'Drukkend, beklemmend gevoel op de borst; uitsluiten van acuut coronair syndroom (infarct).',
    icon: 'Heart',
    primaryUrgency: 'U1',
    commonInSectors: ['VVT', 'GGZ', 'GHZ', 'Sociaal'],
    typicalSymptoms: ['Drukkende, snoerende of brandende pijn midden op de borst', 'Uitstraling naar linkerarm, kaak, hals of tussen de schouderbladen', 'Klam zweten, grauwe gelaatskleur en misselijkheid', 'Kortademigheid'],
    criticalRedFlags: [
      'Pijn houdt in rust langer aan dan 15 minuten en reageert niet op nitrospray',
      'Patiënt is klam, grauw, zweet hevig en heeft doodsangst',
      'Wegraking of collaps voorafgaand aan of tijdens de pijn',
      'Vrouwen en diabetici presenteren zich vaak atypisch: enkel ernstige misselijkheid, maagpijn en extreme vermoeidheid!'
    ],
    guidelines: [
      {
        title: 'NHG-Standaard Acuut Coronair Syndroom',
        organization: 'NHG',
        summary: 'Directe triage en medicamenteuze eerste opvang bij verdenking myocardinfarct.',
        lastUpdated: '2025'
      }
    ],
    triageQuestions: [
      {
        question: 'Stap 1: Is er sprake van een drukkend gevoel met uitstraling of klam zweten?',
        options: [
          {
            text: 'JA, aanhoudende drukkende pijn op de borst + klam/grauw of uitstraling naar kaak/arm',
            urgency: 'U1',
            actionSnippet: 'DIRECT 112 BELLEN! Meld verdenking acuut myocardinfarct. Laat cliënt rustig halfzittend rusten. Blijf continu bij de cliënt. AED stand-by.',
            isRedFlag: true
          },
          {
            text: 'Stekende pijn die duidelijk toeneemt bij diep inademen of draaien van het bovenlichaam',
            urgency: 'U3',
            actionSnippet: 'Vaak musculoskeletaal (myalgie/tietze) of pleuraprikkeling. Meet vitale functies en overleg met arts.',
            isRedFlag: false
          }
        ]
      }
    ],
    sbarTemplate: {
      situation: 'SPOEDOPROEP: Cliënt [Naam] heeft acute drukkende pijn op de borst sinds [tijdstip].',
      background: 'Bekend met [hypertensie / diabetes / eerdere hartinfarcten].',
      assessment: 'Pijn is [drukkend/snoerend] met uitstraling naar [kaak/arm]. Cliënt is klam en bleek. RR [..]/[..], Pols [..]/min, SpO2 [..]%.',
      recommendation: 'Ik heb 112 gebeld / vraag om directe komst van de arts met ECG-apparatuur.'
    }
  },
  {
    id: 'delier-verwardheid',
    slug: 'delier-verwardheid',
    title: 'Plotselinge Verwardheid & Delier',
    shortDescription: 'Acuut wisselend bewustzijn, aandachtsstoornissen en desoriëntatie; vaak veroorzaakt door infectie of medicatie.',
    icon: 'Brain',
    primaryUrgency: 'U2',
    commonInSectors: ['VVT', 'GHZ', 'GGZ'],
    typicalSymptoms: ['Fluctuerend beeld: overdag rustig, in de avond/nacht extreem onrustig (sundowning)', 'Hallucinaties (bijv. beestjes zien kruipen)', 'Desoriëntatie in tijd, plaats en persoon', 'Plukkerig gedrag of juist apathisch wegzakken (stil delier)'],
    criticalRedFlags: [
      'Gepaard met hoge koorts of nekstijfheid (verdenking meningitis)',
      'Verstoring van vitale functies (hypotensie, saturatiedaling)',
      'Cliënt is niet aanspreekbaar of raakt in coma',
      'Recent gestopt met alcohol of benzodiazepinen (delirium tremens: levensbedreigend!)'
    ],
    guidelines: [
      {
        title: 'Richtlijn Delier bij Volwassenen en Ouderen',
        organization: 'V&VN',
        summary: 'Signalering via DOS (Delirium Observatie Schaal) en niet-medicamenteuze maatregelen.',
        lastUpdated: '2024'
      },
      {
        title: 'NHG-Standaard Delier',
        organization: 'NHG',
        summary: 'Opsporen van de onderliggende somatische luxerende factor.',
        lastUpdated: '2025'
      }
    ],
    triageQuestions: [
      {
        question: 'Stap 1: Is de verwardheid acuut ontstaan (binnen uren tot dagen) en fluctueert het?',
        options: [
          {
            text: 'Acuut ontstaan, fluctueert sterk, hallucinaties of motorische onrust',
            urgency: 'U2',
            actionSnippet: 'Verdenking delier! Zoek de onderliggende somatische oorzaak: urine controleren (blaasontsteking), temp meten, obstipatie, medicatiewijziging. Overleg met arts.',
            isRedFlag: false
          },
          {
            text: 'Langzaam sluipend ontstaan over maanden, stabiel beeld van vergeetachtigheid',
            urgency: 'U4',
            actionSnippet: 'Past meer bij geleidelijke cognitieve achteruitgang / dementie. Bespreek in multidisciplinair overleg.',
            isRedFlag: false
          }
        ]
      }
    ],
    sbarTemplate: {
      situation: 'Cliënt [Naam] vertoont sinds [tijdstip/gisteren] acute wisselende verwardheid en onrust.',
      background: 'Bekend met [cognitieve stoornis / eerdere delieren]. Recente medicatiewijziging: [ja/nee].',
      assessment: 'DOS-score is verhoogd. Urine gecontroleerd op nitriet/leuko: [uitslag]. Temp [..]°C, Glucose [..] mmol/L.',
      recommendation: 'Graag lichamelijk onderzoek en beleid ten aanzien van onderliggende infectie en rustgevend beleid.'
    }
  }
];

export const VITAL_SIGNS_THRESHOLDS = {
  systolicBP: {
    criticalLow: 85,
    low: 100,
    normalMin: 110,
    normalMax: 140,
    high: 160,
    criticalHigh: 180
  },
  diastolicBP: {
    low: 60,
    normalMin: 70,
    normalMax: 90,
    high: 100,
    criticalHigh: 110
  },
  heartRate: {
    criticalLow: 40,
    low: 50,
    normalMin: 60,
    normalMax: 95,
    high: 110,
    criticalHigh: 130
  },
  oxygenSaturation: {
    criticalLow: 88,
    low: 92,
    normalMin: 95,
    normalMax: 100
  },
  temperature: {
    criticalLow: 35.0,
    low: 36.0,
    normalMin: 36.5,
    normalMax: 37.5,
    fever: 38.0,
    highFever: 38.8,
    criticalHigh: 40.5
  },
  bloodGlucose: {
    criticalLow: 3.5,
    low: 4.0,
    normalMin: 4.5,
    normalMax: 7.8,
    high: 11.0,
    criticalHigh: 20.0
  },
  respiratoryRate: {
    criticalLow: 8,
    low: 10,
    normalMin: 12,
    normalMax: 18,
    high: 22,
    criticalHigh: 30
  }
};
