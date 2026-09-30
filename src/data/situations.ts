import { Situation } from '../types';

export const SITUATIONS: Situation[] = [
  {
    id: 'overprikkeling',
    slug: 'overprikkeling',
    title: 'Overprikkeling (Sensorische overload)',
    shortDescription: 'Zintuiglijke of emotionele informatie stapelt op; het brein kan prikkels niet meer filteren of verwerken.',
    domains: ['Autisme', 'LVB', 'GGZ', 'Gehandicaptenzorg'],
    icon: 'ZapOff',
    color: 'teal',
    urgencyLevel: 'gemiddeld',
    signals: [
      { id: 'oren', label: 'Houdt handen voor de oren of sluit ogen', category: 'lichamelijk' },
      { id: 'weglopen', label: 'Wil plotseling weg / zoekt uitgang', category: 'gedrag' },
      { id: 'ijsberen', label: 'Loopt rusteloos heen en weer', category: 'gedrag' },
      { id: 'stilte', label: 'Wordt plots heel stil of staart wezenloos', category: 'communicatie' },
      { id: 'kortaf', label: 'Reageert geïrriteerd of met korte afkap-antwoorden', category: 'communicatie' },
      { id: 'motoriek', label: 'Repetitieve bewegingen (wieg-beweging, friemelen, tikken)', category: 'lichamelijk' },
      { id: 'geluid', label: 'Klaagt over zoemen, tikkende klok, fel licht of stemmen', category: 'omgeving' },
      { id: 'ontploffing', label: 'Emotionele uitbarsting om schijnbaar triviaal incident', category: 'gedrag' }
    ],
    hypotheses: [
      {
        title: 'Sensorische overbelasting',
        explanation: 'Het zenuwstelsel ontvangt meer prikkels (geluid, licht, drukte, geuren) dan de sensorische filters op dit moment kunnen verwerken.',
        likelihoodNote: 'Veelvoorkomend bij autisme, LVB, NAH (niet-aangeboren hersenletsel) of vermoeidheid.'
      },
      {
        title: 'Cognitieve overvraging',
        explanation: 'Te veel opdrachten, keuzes of complexe communicatie in een te kort tijdsbestek.',
        likelihoodNote: 'Overweeg dit wanneer er zojuist veel vragen zijn gesteld of de dagstructuur wijzigde.'
      },
      {
        title: 'Lichamelijk ongemak of pijn',
        explanation: 'Onopgemerkte hoofdpijn, honger, dorst of slaaptekort verlaagt de prikkeldrempel drastisch.',
        likelihoodNote: 'Controleer wanneer de reactie plotseling feller is dan normaal.'
      }
    ],
    influencingFactors: [
      { factor: 'Omgevingsfactoren', explanation: 'Achtergrondradio, fel TL-licht, groepsgesprekken of geuren van koken.' },
      { factor: 'Tijdstip op de dag', explanation: 'Einde van de middag of na een intensieve activiteit is de emmer vaak vol.' },
      { factor: 'Communicatiestijl', explanation: 'Snelle zinnen, abstracte taal of dubbele vragen verhogen de belasting.' }
    ],
    dos: [
      {
        title: 'Demp direct de omgeving',
        description: 'Zet radio/tv uit, dim fel licht, doe een deur dicht of biedt een geluiddempende hoofdtelefoon / noice-cancelling aan.',
        priority: 'direct',
        category: 'prikkelregulatie'
      },
      {
        title: 'Verlaag communicatie naar het minimum',
        description: 'Stop met vragen stellen en discussiëren. Gebruik maximaal één duidelijke kernzin per minuut in een rustige, warme toon.',
        priority: 'direct',
        category: 'communicatie'
      },
      {
        title: 'Bied een prikkelarme uitwijkmogelijkheid',
        description: 'Vraag zacht: "Zullen we even naar de rustruimte / tuin lopen?" zonder druk uit te oefenen.',
        priority: 'belangrijk',
        category: 'ruimte'
      },
      {
        title: 'Geef verwerkingstijd',
        description: 'Wacht minimaal 10 tot 15 seconden na een eenvoudige opmerking voordat je reactie verwacht.',
        priority: 'belangrijk',
        category: 'communicatie'
      }
    ],
    donts: [
      {
        title: 'Doorvragen over "Wat er scheelt"',
        warning: 'Vraag nu niet "Wat voel je precies?" of "Waarom doe je zo?"',
        whyNot: 'Het talige denkbrein (prefrontale cortex) is tijdelijk offline; vragen voelen als nog meer overstromende prikkels.'
      },
      {
        title: 'Fysiek dichtbij komen of onverwachts aanraken',
        warning: 'Kom niet plotseling te dichtbij en leg geen ongevraagde hand op de schouder.',
        whyNot: 'Bij verhoogde prikkelgevoeligheid kan aanraking aanvoelen als een schok of bedreiging en een vecht-of-vluchtreactie uitlokken.'
      },
      {
        title: 'Gedrag bestraffen of corrigeren',
        warning: 'Zeg niet: "Nu moet je normaal doen, anders vervalt je activiteit."',
        whyNot: 'Overprikkeling is een neurologische overstroming, geen bewuste ongehoorzaamheid.'
      }
    ],
    whyItWorks: {
      concept: 'Het Autonoom Zenuwstelsel & Sensorische Filtreerfunctie',
      explanation: 'Bij overprikkeling raakt het sympathische zenuwstelsel overactief (vecht-, vlucht- of bevriesmodus). Door prikkels fysiek weg te nemen en minimale taal te gebruiken, krijgt het parasympathische zenuwstelsel (de rust-en-herstel-modus) de kans om de fysiologische balans te herstellen.',
      scientificBasis: 'Polyvagaaltheorie (Porges) & Sensorische Integratietheorie (Ayres).'
    },
    escalation: {
      whenToConsult: [
        'Overprikkeling leidt tot aanhoudende paniek die na 30 minuten rust niet afneemt.',
        'Cliënt vertoont beginnend zelfbeschadigend gedrag om prikkels te dempen.',
        'Er is sprake van toenemend dwalen of desoriëntatie.'
      ],
      whenToEscalateEmergency: [
        'Acuut gevaar voor fysieke integriteit van cliënt of omstanders (bijv. de straat op rennen in blinde paniek).',
        'Fysieke agressie met voorwerpen of vastlopen in ernstige vechtreactie.'
      ],
      contactAdvice: 'Overleg met dienstdoende arts of gedragswetenschapper. Volg het afdelingsprotocol voor time-out en veiligheid.'
    },
    recommendedCaseId: 'case-sam-lvb',
    clientVersion: {
      simpleTitle: 'Te veel prikkels in mijn hoofd',
      simpleDescription: 'Het is te druk, te luid of te veel. Mijn hoofd zit vol.',
      pictogram: 'headphones',
      whatIFeel: [
        'Mijn hoofd zit helemaal vol',
        'Geluiden doen pijn aan mijn oren',
        'Ik wil weg of me verstoppen',
        'Ik word snel boos of moet huilen'
      ],
      whatHelpsMe: [
        'Koptelefoon opzetten',
        'Naar een rustige kamer gaan',
        'Even helemaal niks zeggen of moeten',
        'Een slok koud water drinken'
      ],
      whatOthersShouldDo: [
        'Zachtjes praten',
        'Geen moeilijke vragen stellen',
        'Mij de ruimte geven'
      ]
    }
  },
  {
    id: 'oplopende-spanning',
    slug: 'oplopende-spanning',
    title: 'Oplopende Spanning & Emotieregulatie',
    shortDescription: 'Frustratie of stress stijgt richting een kookpunt; vroege signalen tijdig herkennen voorkomt escalatie.',
    domains: ['De-escalatie', 'LVB', 'GGZ', 'Communicatie'],
    icon: 'TrendingUp',
    color: 'amber',
    urgencyLevel: 'hoog',
    signals: [
      { id: 'harder-praten', label: 'Praat merkbaar harder, sneller of met overslaande stem', category: 'communicatie' },
      { id: 'spierspanning', label: 'Gebalde vuisten, opgetrokken schouders, kaakklemmen', category: 'lichamelijk' },
      { id: 'snelle-adem', label: 'Snelle, hoorbare of oppervlakkige ademhaling', category: 'lichamelijk' },
      { id: 'afwijzend', label: 'Reageert met "Laat me met rust!", zuchten of ogen rollen', category: 'communicatie' },
      { id: 'onrust', label: 'Staat steeds op, friemelt nerveus, kan niet stilzitten', category: 'gedrag' },
      { id: 'grenzen', label: 'Zoekt grenzen op of daagt verbaal uit', category: 'gedrag' }
    ],
    hypotheses: [
      {
        title: 'Verlies van controle of ervaren onmacht',
        explanation: 'De cliënt voelt zich niet gehoord, begrepen of klemgezet door een afspraak of gebeurtenis.',
        likelihoodNote: 'Zeer frequent bij LVB wanneer regels worden opgelegd zonder inspraak.'
      },
      {
        title: 'Oplopende arousal binnen de Window of Tolerance',
        explanation: 'De cliënt beweegt zich naar de bovengrens van zijn tolerantievenster (hyperarousal).',
        likelihoodNote: 'Signaleer of de spanning al langer opbouwde (slaaptekort, conflict eerder op de dag).'
      },
      {
        title: 'Angst onder de dekmantel van boosheid',
        explanation: 'Woede fungeert vaak als beschermingsmechanisme tegen onderliggende faalangst of paniek.',
        likelihoodNote: 'Overweeg dit als de cliënt een nieuwe taak of onverwachte verandering doormaakt.'
      }
    ],
    influencingFactors: [
      { factor: 'Begeleidershouding', explanation: 'Een dominante lichaamshouding of strakke blik verhoogt stress onmiddellijk.' },
      { factor: 'Eerdere gebeurtenissen', explanation: 'Slecht nieuws, een telefoontje of ruzie met een medebewoner.' },
      { factor: 'Fysieke behoeften', explanation: 'Lage bloedsuikerspiegel, nicotinebehoefte of cafeïne-overschot.' }
    ],
    dos: [
      {
        title: 'Erken de emotie zonder oordeel',
        description: 'Zeg rustig: "Ik zie dat je ergens mee zit en dat het je raakt" of "Ik hoor dat dit je frustreert."',
        priority: 'direct',
        category: 'communicatie'
      },
      {
        title: 'Vergroot fysieke en relationele ruimte',
        description: 'Neem letterlijk twee stappen naar achteren. Ga schuin staan (niet frontaal tegenover elkaar).',
        priority: 'direct',
        category: 'ruimte'
      },
      {
        title: 'Bied keuzes om controle terug te geven',
        description: 'Vraag: "Wil je even blijven staan, of liever een glas water pakken?" Twee kleine keuzes herstellen eigen regie.',
        priority: 'belangrijk',
        category: 'communicatie'
      },
      {
        title: 'Stem je eigen stemvolume omlaag',
        description: 'Spreek langzamer, zachter en iets lager dan normaal. Het zenuwstelsel spiegelt vaak onbewust jouw kalmte.',
        priority: 'belangrijk',
        category: 'prikkelregulatie'
      }
    ],
    donts: [
      {
        title: 'In discussie gaan over feiten of regels',
        warning: 'Ga nu niet gelijkhalen ("Maar we hadden toch afgesproken dat...")',
        whyNot: 'Logica werkt niet bij verhoogde spanning; discussie wordt ervaren als een gevecht om dominantie.'
      },
      {
        title: 'Zeggen: "Rustig maar!" of "Kalmeer even"',
        warning: 'Vermijd gebiedende wijzen om te kalmeren.',
        whyNot: 'Dit bagatelliseert het gevoel en leidt bij 9 van de 10 mensen juist tot een directe escalatie.'
      },
      {
        title: 'Fysiek de doorgang blokkeren',
        warning: 'Ga nooit in een deuropening staan of de looproute van de cliënt versperren.',
        whyNot: 'Een opgesloten gevoel triggert direct een primitieve vechtreactie om te ontsnappen.'
      }
    ],
    whyItWorks: {
      concept: 'Co-regulatie & De-escalatie via het Spiegelsysteem',
      explanation: 'Mensen zijn sociale zoogdieren. Wanneer de begeleider zenuwstelselrust uitstraalt (lagere ademhaling, ontspannen schouders, zachte stem), registreert het limbische systeem van de cliënt veiligheid (neuroceptie van veiligheid). Dit dempt de amygdala.',
      scientificBasis: 'Window of Tolerance model (Siegel) & Co-regulatie theorie.'
    },
    escalation: {
      whenToConsult: [
        'Spanning blijft meer dan 45 minuten op oranje/rood hangen zonder ontspanning.',
        'Cliënt weigert alle voorgestelde de-escalatie-opties en zoekt ruzie met derden.'
      ],
      whenToEscalateEmergency: [
        'Verbale dreiging met wapens of fysiek geweld tegen personen.',
        'Cliënt begint meubels omver te gooien of deuren te forceren in de nabijheid van anderen.'
      ],
      contactAdvice: 'Schakel een directe collega bij als achtervang (blijf zelf in contact, collega observeert op veilige afstand). Raadpleeg zo nodig gedragsdeskundige of crisisdienst.'
    },
    recommendedCaseId: 'case-daan-spanning',
    clientVersion: {
      simpleTitle: 'Ik voel de spanning stijgen',
      simpleDescription: 'Mijn lichaam voelt strak. Ik word boos of onrustig.',
      pictogram: 'thermometer',
      whatIFeel: [
        'Mijn hart klopt snel',
        'Mijn handen zijn vuisten',
        'Ik wil schreeuwen of stampen',
        'Alles irriteert me'
      ],
      whatHelpsMe: [
        'Even weglopen van de situatie',
        'Diep zuchten: 4 seconden in, 6 seconden uit',
        'Muziek luisteren met oordopjes',
        'Iemand die rustig tegen me praat'
      ],
      whatOthersShouldDo: [
        'Niet tegen me schreeuwen',
        'Mij niet vastpakken',
        'Mij even met rust laten'
      ]
    }
  },
  {
    id: 'agressie-dreiging',
    slug: 'agressie-dreiging',
    title: 'Agressie & Dreigend Gedrag',
    shortDescription: 'Verbaal of fysiek grensoverschrijdend gedrag; prioriteit ligt bij veiligheid, begrenzen en de-escaleren.',
    domains: ['De-escalatie', 'Veiligheid', 'GGZ', 'LVB'],
    icon: 'ShieldAlert',
    color: 'rose',
    urgencyLevel: 'acuut',
    signals: [
      { id: 'dreigen', label: 'Verbaal dreigen met geweld of scheldkanonnades', category: 'communicatie' },
      { id: 'intimidatie', label: 'Binnendringen van persoonlijke ruimte / op de borst staan', category: 'gedrag' },
      { id: 'vernieling', label: 'Slaan op tafels, deuren trappen, spullen gooien', category: 'gedrag' },
      { id: 'blik', label: 'Strakke, fixerende of woedende oogopslag', category: 'lichamelijk' }
    ],
    hypotheses: [
      {
        title: 'Instrumentele agressie',
        explanation: 'De cliënt gebruikt agressie doelgericht om iets voor elkaar te krijgen of een regel te omzeilen.',
        likelihoodNote: 'Let op of het gedrag stopt zodra het doel bereikt lijkt.'
      },
      {
        title: 'Frustratie- of paniekagressie',
        explanation: 'Onvermogen om spanning te hanteren; agressie is een ongecontroleerde uitbarsting van paniek of woede.',
        likelihoodNote: 'Meest voorkomend in LVB en GGZ crisissituaties.'
      },
      {
        title: 'Psychotische beleving of paranoïde waan',
        explanation: 'De cliënt verdedigt zich tegen vermeende dreigingen die voor hem/haar levensecht zijn.',
        likelihoodNote: 'Let op verwarde taal, wantrouwen of blikken naar lege hoeken.'
      }
    ],
    influencingFactors: [
      { factor: 'Veiligheidsgevoel', explanation: 'Voelt de cliënt zich zelf bedreigd of aangevallen?' },
      { factor: 'Middelengebruik', explanation: 'Ontremming door alcohol, drugs of onthouding.' },
      { factor: 'Aanwezigheid van omstanders', explanation: 'Publiek kan gezichtsverlies veroorzaken en agressie aanjagen.' }
    ],
    dos: [
      {
        title: 'Borg je eigen veilige uitweg',
        description: 'Zorg dat er altijd een vrije doorgang is naar de deur voor jezelf en de cliënt.',
        priority: 'direct',
        category: 'veiligheid'
      },
      {
        title: 'Scheid de emotie van het gedrag',
        description: 'Zeg: "Ik begrijp dat je enorm boos bent, maar spullen gooien accepteer ik hier niet."',
        priority: 'direct',
        category: 'communicatie'
      },
      {
        title: 'Ontruim omstanders discreet',
        description: 'Vraag medebewoners of collega’s rustig naar een andere ruimte te gaan om prikkels te verlagen.',
        priority: 'belangrijk',
        category: 'ruimte'
      }
    ],
    donts: [
      {
        title: 'Tegenagressie tonen of sarcastisch worden',
        warning: 'Ga niet spotten, schreeuwen of machtswoorden gebruiken.',
        whyNot: 'Dit escaleert de situatie onmiddellijk naar een fysieke confrontatie.'
      },
      {
        title: 'Alleen blijven in een afgesloten ruimte',
        warning: 'Blijf niet zonder zichtlijn of back-up met een dreigende cliënt in een gesloten kamer.',
        whyNot: 'Veiligheidsrisico is onacceptabel groot.'
      }
    ],
    whyItWorks: {
      concept: 'Begrenzen vanuit Nabijheid en Duidelijkheid',
      explanation: 'Duidelijke grenzen bieden structuur aan een brein dat alle controle kwijt is. Kalme standvastigheid haalt de brandstof uit het conflict.',
      scientificBasis: 'Agressiehantering volgens de Drost-methodiek en Geweldloze Communicatie.'
    },
    escalation: {
      whenToConsult: ['Wanneer verbale begrenzing na 5 minuten geen enkel effect heeft.'],
      whenToEscalateEmergency: [
        'Wapenbezit of dreiging met zwaar letsel.',
        'Fysieke aanval op personen.',
        'Gevaar voor levensbedreigende situatie.'
      ],
      contactAdvice: 'Druk het alarmsysteem in, waarschuw direct collega’s en bel zo nodig 112 bij acuut levensgevaar.'
    },
    recommendedCaseId: 'case-daan-spanning',
    clientVersion: {
      simpleTitle: 'Boosheid en drift',
      simpleDescription: 'Ik ben heel boos en kan mezelf moeilijk beheersen.',
      pictogram: 'flame',
      whatIFeel: ['Ik wil slaan of schreeuwen', 'Ik voel me oneerlijk behandeld', 'Het kookt in mij'],
      whatHelpsMe: ['Afstand nemen', 'Even boksen op een kussen', 'Collega die rustig blijft'],
      whatOthersShouldDo: ['Niet dichtbij komen', 'Niet tegen mij schreeuwen', 'Mij de kans geven af te koelen']
    }
  },
  {
    id: 'angst-paniek',
    slug: 'angst-paniek',
    title: 'Angst of Paniekaanval',
    shortDescription: 'Acute overweldigende angst met fysieke verschijnselen zoals hyperventilatie en doodsangst.',
    domains: ['GGZ', 'LVB', 'Psychiatrie'],
    icon: 'HeartPulse',
    color: 'blue',
    urgencyLevel: 'gemiddeld',
    signals: [
      { id: 'hyperventilatie', label: 'Snelle, hoorbare ademhaling / happen naar lucht', category: 'lichamelijk' },
      { id: 'trillen', label: 'Trillende handen of benen, bleek wegtrekken, zweten', category: 'lichamelijk' },
      { id: 'doodsangst', label: 'Roept: "Ik ga dood!", "Mijn hart stopt!" of "Ik stik!"', category: 'communicatie' },
      { id: 'vastklampen', label: 'Klampt zich letterlijk vast aan begeleider of meubels', category: 'gedrag' }
    ],
    hypotheses: [
      {
        title: 'Paniekaanval (angststoornis)',
        explanation: 'Vals alarm van het brein: adrenalinepiek veroorzaakt heftige lichamelijke sensaties die verkeerd geïnterpreteerd worden.',
        likelihoodNote: 'Zeer typisch bij een plotseling begin zonder duidelijke externe dreiging.'
      },
      {
        title: 'Traumatriggers / herbeleving',
        explanation: 'Een geur, geluid of houding heeft een onbewuste herinnering aan trauma geactiveerd.',
        likelihoodNote: 'Let op dissociatieve blik of desoriëntatie in tijd/plaats.'
      },
      {
        title: 'Somatische oorzaak (hartkloppingen, astma)',
        explanation: 'Fysieke aandoening die angstreactie uitlokt.',
        likelihoodNote: 'Overweeg medische controle bij pijn op de borst of onbekende voorgeschiedenis.'
      }
    ],
    influencingFactors: [
      { factor: 'Hyperventilatie', explanation: 'Te veel zuurstof en te weinig CO2 versterkt duizeligheid en tintelingen.' },
      { factor: 'Cafeïne / Stimulantia', explanation: 'Energiedrankjes of drugs kunnen de fysiologische angst versterken.' }
    ],
    dos: [
      {
        title: 'Bied geruststellende aanwezigheid',
        description: 'Zeg rustig: "Je bent veilig hier. Dit is een paniekaanval. Het voelt heel naar, maar het gaat weer voorbij."',
        priority: 'direct',
        category: 'communicatie'
      },
      {
        title: 'Gronding & ademhaling synchroniseren',
        description: 'Laat voeten stevig op de grond zetten. Adem samen: rustig in door de neus (4 tellen), langzaam uitblazen door getuite lippen (6 tellen).',
        priority: 'direct',
        category: 'prikkelregulatie'
      },
      {
        title: '5-4-3-2-1 zintuigoefening',
        description: 'Laat de cliënt 5 dingen noemen die hij ziet, 4 die hij voelt, 3 die hij hoort.',
        priority: 'belangrijk',
        category: 'communicatie'
      }
    ],
    donts: [
      {
        title: 'Zeggen: "Er is helemaal niks aan de hand"',
        warning: 'Minimaliseer de angst niet.',
        whyNot: 'Voor het lichaam van de cliënt is de doodsangst 100% fysiologisch reëel; ontkenning vergroot de eenzaamheid en paniek.'
      },
      {
        title: 'De cliënt alleen achterlaten',
        warning: 'Laat iemand in acute paniek niet zomaar alleen in een kamer.',
        whyNot: 'Het gevoel verlaten te zijn kan de paniek verder opjagen.'
      }
    ],
    whyItWorks: {
      concept: 'Gronding & Verlengde Uitademing',
      explanation: 'Een verlengde uitademing stimuleert direct de nervus vagus, wat het hartritme vertraagt en de aanmaak van stresshormonen remt. Grondingstechnieken trekken cognitieve capaciteit terug naar het hier-en-nu.',
      scientificBasis: 'Cognitieve gedragstherapie bij paniek (Clark) & Polyvagaalregulatie.'
    },
    escalation: {
      whenToConsult: ['Wanneer paniek na 45 minuten onverminderd aanhoudt ondanks ademhalingsoefeningen.'],
      whenToEscalateEmergency: [
        'Aanhoudende drukkende pijn op de borst met uitstraling naar arm of kaak.',
        'Ernstige cyanose (blauwe lippen) of bewustzijnsverlies.'
      ],
      contactAdvice: 'Bij twijfel over somatische oorzaken (hart/longen) direct dienstdoende arts of 112 raadplegen.'
    },
    clientVersion: {
      simpleTitle: 'Erg bang of in paniek',
      simpleDescription: 'Mijn hart gaat heel snel en ik voel me bang.',
      pictogram: 'heart',
      whatIFeel: ['Mijn hart bonkt heel hard', 'Ik hap naar lucht', 'Ik denk dat er iets ergs gebeurt', 'Ik tril overal'],
      whatHelpsMe: ['Samen rustig ademhalen', 'Voeten plat op de vloer zetten', 'Een hand vasthouden als ik dat wil', 'Koud water drinken'],
      whatOthersShouldDo: ['Rustig bij me blijven', 'Zeggen dat het weer voorbijgaat', 'Niet weggaan']
    }
  },
  {
    id: 'overvraging-lvb',
    slug: 'overvraging-lvb',
    title: 'Overvraging bij LVB (Discrepantie)',
    shortDescription: 'Verbaal vaardig lijken maar emotioneel of handelend overvraagd worden; leidt tot faalangst, ontwijking of verzet.',
    domains: ['LVB', 'Communicatie', 'Sociaal Domein'],
    icon: 'Brain',
    color: 'teal',
    urgencyLevel: 'gemiddeld',
    signals: [
      { id: 'sociaal-wenselijk', label: 'Zegt op alles "Ja hoor, snap ik!" maar doet het vervolgens niet', category: 'communicatie' },
      { id: 'overlevingshumor', label: 'Grappen maken of afleiden om onbegrip te maskeren', category: 'communicatie' },
      { id: 'terugtrekken', label: 'Trekt zich terug op kamer, belt afspraken op het laatste moment af', category: 'gedrag' },
      { id: 'plots-boos', label: 'Wordt plots heel boos bij een ogenschijnlijk simpele taak (post, koken, geld)', category: 'gedrag' }
    ],
    hypotheses: [
      {
        title: 'Kloof tussen verbale en performale intelligentie',
        explanation: 'De cliënt praat vlot, waardoor begeleiders de begrips- en handelingsvaardigheid veel te hoog inschatten.',
        likelihoodNote: 'Klassiek kernkenmerk van licht verstandelijke beperking.'
      },
      {
        title: 'Emotioneel functioneringsniveau ligt lager',
        explanation: 'Verstandelijk 14 jaar, maar emotioneel functionerend op het niveau van een peuter of kleuter (DO-SEN schaal).',
        likelihoodNote: 'Speelt bijna altijd mee bij plotselinge frustratie-uitbarstingen.'
      }
    ],
    influencingFactors: [
      { factor: 'Ingewikkelde brieven / Formulieren', explanation: 'Instanties, DigiD, belasting of rekeningen.' },
      { factor: 'Veranderingen in routine', explanation: 'Nieuwe begeleider, ander rooster of onvoorspelbare planning.' }
    ],
    dos: [
      {
        title: 'Ondertitelen en concretiseren',
        description: 'Vervang open vragen ("Wat vind je ervan?") door concrete keuzes: "Zullen we eerst de blauwe brief openen of de gele?"',
        priority: 'direct',
        category: 'communicatie'
      },
      {
        title: 'Vraag niet: "Snap je het?", maar "Laat eens zien"',
        description: 'Laat de cliënt in eigen woorden herhalen of samen de eerste stap voordoen (voor-samen-zelf).',
        priority: 'direct',
        category: 'communicatie'
      },
      {
        title: 'Bescherm tegen gezichtsverlies',
        description: 'Bied hulp aan als partnerschap: "Zullen we dit even gezellig samen doen?" i.p.v. "Jij kan dit niet alleen."',
        priority: 'belangrijk',
        category: 'ruimte'
      }
    ],
    donts: [
      {
        title: 'Lange uitleg of dubbele opdrachten geven',
        warning: 'Geef niet drie instructies in één zin.',
        whyNot: 'Het werkgeheugen bij LVB raakt na 1 à 2 instructies vol; de rest verdwijnt.'
      },
      {
        title: 'Confronteren met domheid of onkunde',
        warning: 'Zeg nooit: "Dat weet je toch wel?"',
        whyNot: 'Raakt de diepste schaamte en veroorzaakt direct vermijding of agressie.'
      }
    ],
    whyItWorks: {
      concept: 'Afstemmen op Draagkracht en Draaglast',
      explanation: 'Door aan te sluiten op het sociaal-emotionele ontwikkelingsniveau (Dôšen) voelt de cliënt zich veilig in plaats van betrapt. Veiligheid maakt leren en meewerken mogelijk.',
      scientificBasis: 'Emotionele Ontwikkelingstheorie (Anton Dôšen).'
    },
    escalation: {
      whenToConsult: ['Wanneer overvraging structureel leidt tot schulden, ernstige zorgmijding of gewichtsverlies.'],
      whenToEscalateEmergency: ['Wanneer wanhoop omslaat in acute suïcidaliteit of weglopen in onveilige situaties.'],
      contactAdvice: 'Betrek de gedragsdeskundige voor een actuele SEO-kleuring (Sociaal Emotionele Ontwikkeling) en pas het zorgplan aan.'
    },
    recommendedCaseId: 'case-sam-lvb',
    clientVersion: {
      simpleTitle: 'Het is te moeilijk voor mij',
      simpleDescription: 'Mensen praten te snel of vragen dingen die ik niet kan.',
      pictogram: 'help-circle',
      whatIFeel: ['Ik durf niet te zeggen dat ik het niet snap', 'Ik schaam me', 'Ik zeg maar ja terwijl ik nee bedoel', 'Ik voel me dom'],
      whatHelpsMe: ['Korte zinnen', 'Plaatjes of voorbeelden', 'Samen doen stap voor stap', 'Geduld hebben'],
      whatOthersShouldDo: ['Niet boos worden als ik het vergeet', 'Één ding tegelijk vragen', 'Mij complimenten geven']
    }
  },
  {
    id: 'zorgweigering-terugtrekking',
    slug: 'zorgweigering-terugtrekking',
    title: 'Zorgweigering & Terugtrekking',
    shortDescription: 'Cliënt doet de deur niet open, weigert medicatie, maaltijden of contact.',
    domains: ['GGZ', 'LVB', 'Sociaal Domein'],
    icon: 'DoorClosed',
    color: 'amber',
    urgencyLevel: 'gemiddeld',
    signals: [
      { id: 'deur-dicht', label: 'Houdt deur op slot of reageert niet op kloppen/aanbellen', category: 'gedrag' },
      { id: 'medicatie-weigering', label: 'Weigert pertinent voorgeschreven medicatie in te nemen', category: 'gedrag' },
      { id: 'gordijnen-dicht', label: 'Woning blijft donker, gordijnen gesloten overdag', category: 'omgeving' },
      { id: 'persoonlijke-verzorging', label: 'Verwaarlozing van kleding, hygiëne of maaltijden', category: 'lichamelijk' }
    ],
    hypotheses: [
      {
        title: 'Verlies van autonomie of verzet tegen controle',
        explanation: 'De zorg voelt betuttelend of dwingend; weigering is de enige manier om eigen regie te ervaren.',
        likelihoodNote: 'Heel herkenbaar bij mensen met een voorgeschiedenis van institutionele dwang.'
      },
      {
        title: 'Ernstige somberheid of apathie (depressie)',
        explanation: 'Geen energie meer hebben om contact aan te gaan of voor zichzelf te zorgen.',
        likelihoodNote: 'Overweeg dit als de terugtrekking al dagenlang geleidelijk toeneemt.'
      },
      {
        title: 'Paranoia of wantrouwen naar hulpverlening',
        explanation: 'Gedachte dat het eten of de medicatie giftig is of dat begeleiders kwaad willen.',
        likelihoodNote: 'Let op achterdochtige opmerkingen over camera’s of vergiftiging.'
      }
    ],
    influencingFactors: [
      { factor: 'Eerdere slechte ervaringen', explanation: 'Trauma rondom dwangopname of verlies van vrijheid.' },
      { factor: 'Bijwerkingen van medicatie', explanation: 'Vlakt medicatie af of veroorzaakt het extreme sufheid?' }
    ],
    dos: [
      {
        title: 'Houd contactlijnen open zonder forceren',
        description: 'Schrijf een vriendelijk briefje onder de deur door: "Ik ben er voor je. Ik kom om 14:00 uur weer even checken of je een kopje thee wilt."',
        priority: 'direct',
        category: 'communicatie'
      },
      {
        title: 'Erken de autonomie',
        description: 'Zeg: "Jij beslist over je eigen lichaam. Ik wil graag horen wat jouw bezwaren zijn."',
        priority: 'belangrijk',
        category: 'communicatie'
      },
      {
        title: 'Onderzoek wat er wél mogelijk is',
        description: 'Als medicatie nu niet lukt, lukt een glas water of een wandelingetje dan wel?',
        priority: 'overwegen',
        category: 'communicatie'
      }
    ],
    donts: [
      {
        title: 'Meteen dreigen met sancties of dwang',
        warning: 'Zeg niet: "Als je nu niet meewerkt, bel ik de arts voor een maatregel."',
        whyNot: 'Sluit de deur definitief en breekt de behandelrelatie voor maanden af.'
      },
      {
        title: 'De woning zomaar binnenvallen zonder acuut gevaar',
        warning: 'Gebruik de lopersleutel niet tenzij er een protocollaire noodsituatie is.',
        whyNot: 'Schendt de privacy en bevestigt trauma of paranoia.'
      }
    ],
    whyItWorks: {
      concept: 'Presentietheorie & Aansluiten bij Perspectief',
      explanation: 'Door betrouwbaar aanwezig te blijven zonder te eisen (presentie), herstelt het basale vertrouwen. Autonomie erkennen verlaagt de psychologische weerstand (reactance).',
      scientificBasis: 'Presentietheorie (Andries Baart) & Motiverende Gespreksvoering (Miller & Rollnick).'
    },
    escalation: {
      whenToConsult: ['Medicatie die niet gemist mag worden (zoals anti-epileptica of vitale medicatie) wordt langer dan 24 uur geweigerd.'],
      whenToEscalateEmergency: [
        'Vermoeden van ernstig lichamelijk gevaar (bijv. vermoeden coma, bewusteloosheid achter gesloten deur).',
        'Cliënt drinkt en eet al dagenlang niets en droogt zichtbaar uit.'
      ],
      contactAdvice: 'Overleg met behandelend arts / psychiater. Betrek de aandachtsfunctionaris Wet zorg en dwang (Wzd) of Wvggz.'
    },
    clientVersion: {
      simpleTitle: 'Ik wil even niemand zien',
      simpleDescription: 'Ik hou de deur dicht. Ik wil geen hulp op dit moment.',
      pictogram: 'lock',
      whatIFeel: ['Iedereen wil iets van mij', 'Ik wil zelf de baas zijn', 'Ik ben moe van praten', 'Ik vertrouw het even niet'],
      whatHelpsMe: ['Een lief briefje onder de deur', 'Geen dwang of ruzie', 'Weten dat iemand me niet vergeet'],
      whatOthersShouldDo: ['Mij niet dwingen', 'Niet zomaar naar binnen lopen', 'Later rustig terugkomen']
    }
  },
  {
    id: 'stemmen-horen',
    slug: 'stemmen-horen',
    title: 'Stemmen Horen & Verwardheid',
    shortDescription: 'Auditieve hallucinaties of psychotische beleving; ondersteun vanuit rust en aansluiting bij de emotie.',
    domains: ['GGZ', 'Psychiatrie', 'Communicatie'],
    icon: 'Radio',
    color: 'blue',
    urgencyLevel: 'hoog',
    signals: [
      { id: 'luisterhouding', label: 'Draait hoofd naar hoeken, reageert op onhoorbare geluiden', category: 'lichamelijk' },
      { id: 'praten-in-zichzelf', label: 'Fluistert, discussieert of scheldt tegen onzichtbare entiteiten', category: 'communicatie' },
      { id: 'angst-voor-stemmen', label: 'Zegt angstig: "Ze zeggen dat ik slechte dingen moet doen"', category: 'communicatie' },
      { id: 'verwarde-taal', label: 'Onsamenhangende associaties of plotselinge pauzes in spreken', category: 'communicatie' }
    ],
    hypotheses: [
      {
        title: 'Psychotische ontregeling (schizofrenie, psychose)',
        explanation: 'De dopaminehuishouding in het brein kent een verhoogde salience; interne gedachten worden als externe stemmen gehoord.',
        likelihoodNote: 'Komt vaak voor na slaaptekort of plotseling stoppen met medicatie.'
      },
      {
        title: 'Traumatische intrusies / Dissociatieve stemmen',
        explanation: 'Stemmen van vroegere daders of gekwetste kind-delen als gevolg van complex trauma.',
        likelihoodNote: 'Vaak scheldend, vernederend of commandostemmen die verband houden met herinneringen.'
      }
    ],
    influencingFactors: [
      { factor: 'Stilte of juist overmatige drukte', explanation: 'In complete stilte worden stemmen vaak harder; muziek kan helpen.' },
      { factor: 'Slaapgebrek', explanation: 'Niet kunnen slapen wakkert psychose acuut aan.' }
    ],
    dos: [
      {
        title: 'Erken de ervaring zonder de wanen te bevestigen',
        description: 'Zeg: "Ik hoor de stemmen zelf niet, maar ik zie en geloof je dat jij ze heel luid hoort en dat ze je bang maken."',
        priority: 'direct',
        category: 'communicatie'
      },
      {
        title: 'Bied afleiding met geluid',
        description: 'Vraag of de cliënt muziek via een koptelefoon wil luisteren of samen een eenvoudig kaartspelletje wil doen.',
        priority: 'belangrijk',
        category: 'prikkelregulatie'
      },
      {
        title: 'Vraag naar de inhoud en veiligheid',
        description: 'Vraag rustig: "Geven de stemmen je opdrachten om jezelf of een ander pijn te doen?" (Commandostemmen inventariseren).',
        priority: 'direct',
        category: 'veiligheid'
      }
    ],
    donts: [
      {
        title: 'In discussie gaan over of de stemmen "echt" zijn',
        warning: 'Zeg niet: "Het zit alleen maar tussen je oren."',
        whyNot: 'Voor de hersenen van de cliënt is de stem fysiologisch identiek aan een echt pratend persoon in de kamer.'
      },
      {
        title: 'Meegaan in het waansysteem',
        warning: 'Doe niet alsof je de geheime wezens of stemmen zelf ook ziet of hoort.',
        whyNot: 'Dit vergroot de psychotische desoriëntatie en ondermijnt jouw rol als betrouwbaar anker in de realiteit.'
      }
    ],
    whyItWorks: {
      concept: 'Normaliseren & Verankeren in het Hier-en-Nu',
      explanation: 'Door de emotie van de cliënt serieus te nemen zonder de waan te valideren, fungeert de begeleider als een veilig "realiteitsanker". Afleiding via muziek activeert dezelfde auditieve schors in de temporaalkwab, waardoor stemmen naar de achtergrond verdwijnen.',
      scientificBasis: 'Stemmenhoorders-methodiek (Romme & Escher) & CGT bij psychose.'
    },
    escalation: {
      whenToConsult: ['Stemmen worden dwingender of commanderen om gevaarlijke dingen te doen.'],
      whenToEscalateEmergency: [
        'Cliënt meldt dat hij niet meer kan weerstaan aan een opdracht om van een balkon te springen of iemand aan te vallen.',
        'Acute suïcidale drang of destructieve opdrachten.'
      ],
      contactAdvice: 'Meld dit direct bij de regiebehandelaar of de crisisdienst GGZ. Blijf continu bij de cliënt.'
    },
    recommendedCaseId: 'case-fatima-stemmen',
    clientVersion: {
      simpleTitle: 'Stemmen in mijn hoofd',
      simpleDescription: 'Ik hoor stemmen of geluiden die anderen niet horen.',
      pictogram: 'volume-2',
      whatIFeel: ['Ik hoor stemmen die nare dingen zeggen', 'Ik voel me bang of onveilig', 'Ik kan me nergens op concentreren'],
      whatHelpsMe: ['Muziek luisteren met oordopjes', 'Praten met iemand die ik vertrouw', 'Samen iets met mijn handen doen'],
      whatOthersShouldDo: ['Niet zeggen dat ik lieg', 'Rustig bij mij blijven', 'Vragen hoe het met me gaat']
    }
  },
  {
    id: 'zelfbeschadiging',
    slug: 'zelfbeschadiging',
    title: 'Zelfbeschadigend Gedrag & Spanningsreductie',
    shortDescription: 'Pijn toebrengen aan eigen lichaam als copingmechanisme om ondraaglijke emotionele spanning of dissociatie te stoppen.',
    domains: ['GGZ', 'LVB', 'Emotieregulatie'],
    icon: 'Bandage',
    color: 'rose',
    urgencyLevel: 'hoog',
    signals: [
      { id: 'wonden', label: 'Recente krassen, snijwonden, brandplekken of blauwe plekken', category: 'lichamelijk' },
      { id: 'bedekkende-kleding', label: 'Draagt lange mouwen bij heet weer of weigert kledingwissel', category: 'gedrag' },
      { id: 'hoofdbonken', label: 'Met hoofd tegen muur slaan of zichzelf stompen (met name bij LVB)', category: 'gedrag' },
      { id: 'afwezigheid', label: 'Lege blik, reageert verdovend, dissociatieve toestand', category: 'lichamelijk' }
    ],
    hypotheses: [
      {
        title: 'Emotionele overloop / Verdoven van psychische pijn',
        explanation: 'Fysieke pijn maakt endorfines vrij die acute emotionele chaos tijdelijk "resetten".',
        likelihoodNote: 'Veelvoorkomend bij borderline persoonlijkheidsdynamiek of complex trauma.'
      },
      {
        title: 'Stoppen van dissociatie',
        explanation: 'Cliënt voelt zich leeg of niet meer bestaand; pijn dient om "zichzelf weer te voelen".',
        likelihoodNote: 'Vraag na of de cliënt zich gevoelloos of ver van zijn lichaam voelde.'
      },
      {
        title: 'Moeilijk verstaanbaar gedrag bij ernstige LVB',
        explanation: 'Hoofdbonken als uiting van onbehandelde tandpijn, oorontsteking of extreme sensorische onderprikkeling.',
        likelihoodNote: 'Altijd eerst medische somatische oorzaken uitsluiten!'
      }
    ],
    influencingFactors: [
      { factor: 'Afwijzing of conflict', explanation: 'Verlating, kritiek of het verbreken van een relatie.' },
      { factor: 'Alleen zijn op de kamer', explanation: 'Spanning loopt ongezien op in de nacht of tijdens vrije uren.' }
    ],
    dos: [
      {
        title: 'Verzorg wonden zakelijk en vriendelijk',
        description: 'Bied direct wondzorg zonder drama, verwijten of juist overdreven emotionele beloning.',
        priority: 'direct',
        category: 'veiligheid'
      },
      {
        title: 'Bied sensorische alternatieven (TIPP)',
        description: 'Bied ijsblokjes in de hand, een elastiekje om de pols, zeer hete pepermunt of een spijkermat aan om prikkels te vervangen.',
        priority: 'belangrijk',
        category: 'prikkelregulatie'
      },
      {
        title: 'Vraag naar de functie van het gedrag',
        description: 'Vraag niet: "Waarom doe je dat?", maar: "Wat deed de pijn voor jou op dat moment? Hielp het tegen de spanning?"',
        priority: 'belangrijk',
        category: 'communicatie'
      }
    ],
    donts: [
      {
        title: 'Boos worden of straffen',
        warning: 'Neem spullen niet met fysieke dwang af tenzij acuut levensbedreigend.',
        whyNot: 'Straffen vergroot de schaamte en stuurt het gedrag ondergronds naar nog gevaarlijkere methoden.'
      },
      {
        title: 'De cliënt beloven dat je het geheimhoudt',
        warning: 'Beloof nooit absolute geheimhouding over ernstige zelfbeschadiging of suïcidaliteit.',
        whyNot: 'Veiligheid van de cliënt en openheid in het behandelteam gaan voor.'
      }
    ],
    whyItWorks: {
      concept: 'Affectregulatie & Noodvaardigheden (DGT)',
      explanation: 'Zelfbeschadiging is vaak geen doodswens, maar een wanhopige poging om te overleven en ondraaglijke emoties te overstemmen. Door sterke sensorische prikkels (kou, geur) aan te bieden wordt hetzelfde kalmerende effect bereikt zónder weefselschade.',
      scientificBasis: 'Dialectische Gedragstherapie (Linehan).'
    },
    escalation: {
      whenToConsult: ['Wonden die hechtmateriaal vereisen of tekenen van ontsteking vertonen.'],
      whenToEscalateEmergency: [
        'Ernstige arteriële bloedingen.',
        'Zelfbeschadiging gekoppeld aan een actieve suïcidepoging of inname van giftige stoffen/medicatie.'
      ],
      contactAdvice: 'Bij hechtwonden of medicatie-inname direct huisartsenpost of 112. Informeer behandelaar conform signaleringsplan.'
    },
    clientVersion: {
      simpleTitle: 'Ik wil mezelf pijn doen',
      simpleDescription: 'De pijn in mijn hoofd is zo groot dat ik mezelf wil bezeren.',
      pictogram: 'heart-crack',
      whatIFeel: ['Ik voel me leeg of gevoelloos', 'De spanning is ondraaglijk', 'Ik wil de emotie niet meer voelen'],
      whatHelpsMe: ['Een ijsblokje in mijn hand knijpen', 'Een elastiekje om mijn pols schieten', 'Iemand bellen en vertellen dat ik het moeilijk heb', 'Wandelen met stevige stappen'],
      whatOthersShouldDo: ['Niet boos worden', 'Mijn wond verzorgen', 'Bij me blijven tot de spanning zakt']
    }
  },
  {
    id: 'middelengebruik-ontremming',
    slug: 'middelengebruik-ontremming',
    title: 'Middelengebruik & Acute Ontremming',
    shortDescription: 'Verandering in gedrag, bewustzijn of emotie door alcohol, drugs of medicatiemisbruik.',
    domains: ['GGZ', 'LVB', 'Sociaal Domein'],
    icon: 'Wine',
    color: 'amber',
    urgencyLevel: 'hoog',
    signals: [
      { id: 'pupillen', label: 'Wijd open pupillen, speldenknoppupillen of wazige blik', category: 'lichamelijk' },
      { id: 'spraak-lallen', label: 'Lallende spraak, verlies van evenwicht of motorische coördinatie', category: 'lichamelijk' },
      { id: 'ontremming', label: 'Grenzeloos sociaal gedrag, plotselinge overmoed of extreme achterdocht', category: 'gedrag' },
      { id: 'agressie-flits', label: 'Onvoorspelbare stemmingswisselingen van euforie naar agressie', category: 'gedrag' }
    ],
    hypotheses: [
      {
        title: 'Acute intoxicatie door middelen',
        explanation: 'Directe neurologische invloed van stimulerende middelen (cocaïne, speed) of dempende middelen (alcohol, GHB, benzo’s).',
        likelihoodNote: 'Controleer of de cliënt net buiten is geweest of bezoek heeft ontvangen.'
      },
      {
        title: 'Zelfmedicatie voor angst of trauma',
        explanation: 'De cliënt gebruikt middelen om herbelevingen of stemmen te onderdrukken.',
        likelihoodNote: 'Zeer frequent bij dubbele diagnose (GGZ + verslaving).'
      }
    ],
    influencingFactors: [
      { factor: 'Combi-gebruik', explanation: 'Alcohol in combinatie met medicatie of drugs versterkt risico’s exponentieel.' },
      { factor: 'Verminderde weerstand bij LVB', explanation: 'Mensen met LVB worden vaak sneller beïnvloed of uitgebuit door dealers.' }
    ],
    dos: [
      {
        title: 'Behoud rust en houd toezicht op vitale functies',
        description: 'Let op de ademhaling en het bewustzijnsniveau. Blijf in de buurt.',
        priority: 'direct',
        category: 'veiligheid'
      },
      {
        title: 'Geen morele preken houden op het moment zelf',
        description: 'Bespreek het gebruik pas de volgende dag wanneer de cliënt nuchter is. Nu heeft een goed gesprek geen zin.',
        priority: 'belangrijk',
        category: 'communicatie'
      },
      {
        title: 'Bied water en een veilige rustplek',
        description: 'Laat de cliënt water drinken en rusten in een prikkelarme kamer.',
        priority: 'belangrijk',
        category: 'prikkelregulatie'
      }
    ],
    donts: [
      {
        title: 'De confrontatie aangaan over regels',
        warning: 'Ga nu niet fouilleren of dreigen met uithuisplaatsing.',
        whyNot: 'Onder invloed reageren mensen onvoorspelbaar en feller; de kans op letsel is groot.'
      },
      {
        title: 'Iemand met verlaagd bewustzijn op de rug laten slapen',
        warning: 'Leg iemand die suf is nooit plat op de rug.',
        whyNot: 'Levensgevaarlijk risico op verstikking bij braken (leg altijd in stabiele zijligging).'
      }
    ],
    whyItWorks: {
      concept: 'Harm Reduction & Risicobeheersing',
      explanation: 'Tijdens acute intoxicatie is rationeel overleg onmogelijk door biochemische beïnvloeding van de hersenen. De enige professionele focus ligt op fysieke overleving en het voorkomen van schade.',
      scientificBasis: 'Harm Reduction principes & Verslavingszorg richtlijnen.'
    },
    escalation: {
      whenToConsult: ['Cliënt vertoont aanhoudende verwardheid of milde hallucinaties die niet wegebben.'],
      whenToEscalateEmergency: [
        'Moeilijk wekbaar worden of coma (met name bij GHB of alcoholvergiftiging).',
        'Zeer langzame ademhaling (< 8 keer per minuut) of grauwe gelaatskleur.',
        'Oververhitting, stuipen of acute hartritmestoornissen.'
      ],
      contactAdvice: 'Bij bewusteloosheid of ademhalingsproblemen direct 112 bellen. Noem bij de meldkamer altijd mogelijke middelen.'
    },
    clientVersion: {
      simpleTitle: 'Onder invloed van drank of drugs',
      simpleDescription: 'Ik heb middelen gebruikt en voel me niet goed of anders.',
      pictogram: 'alert-triangle',
      whatIFeel: ['Ik draai en kan moeilijk praten', 'Mijn hart gaat raar tekeer', 'Ik ben de controle kwijt'],
      whatHelpsMe: ['Water drinken', 'In bed gaan liggen op mijn zij', 'Een begeleider die op me let'],
      whatOthersShouldDo: ['Niet boos worden op mij nu', 'Mijn ademhaling in de gaten houden', 'Een dokter bellen als ik niet wakker word']
    }
  },
  {
    id: 'onbegrepen-gedrag-pijn',
    slug: 'onbegrepen-gedrag-pijn',
    title: 'Onbegrepen Gedrag / Pijn & Somatisch Ongemak',
    shortDescription: 'Plotselinge gedragsverandering of onrust zonder duidelijke psychische oorzaak; denk altijd eerst aan lichamelijke pijn.',
    domains: ['Gehandicaptenzorg', 'LVB', 'GGZ'],
    icon: 'Activity',
    color: 'teal',
    urgencyLevel: 'gemiddeld',
    signals: [
      { id: 'wrijven-grijpen', label: 'Wrijft vaak over buik, grijpt naar het oor of tandenknarst', category: 'lichamelijk' },
      { id: 'onrust-eten', label: 'Weigert opeens te eten, duwt bord weg of spuugt uit', category: 'gedrag' },
      { id: 'slaapstoornis', label: 'Kan plots de slaap niet vatten of wordt gillend wakker', category: 'lichamelijk' },
      { id: 'houding', label: 'Trekt benen op, kromme rug of schrikt bij aanraking', category: 'lichamelijk' }
    ],
    hypotheses: [
      {
        title: 'Niet-gediagnosticeerde lichamelijke pijn',
        explanation: 'Tandabces, obstipatie, urineweginfectie, maagzuur of oorontsteking.',
        likelihoodNote: 'Verreweg de meest gemiste oorzaak van "agressie" bij ernstige verstandelijke beperking.'
      },
      {
        title: 'Sensorische pijn (kleding, schoenen)',
        explanation: 'Een te strakke schoen, ingegroeide nagel of irriterend waslabel.',
        likelihoodNote: 'Kijk of het gedrag samenhangt met specifieke kledingstukken.'
      }
    ],
    influencingFactors: [
      { factor: 'Communicatieve beperking', explanation: 'Als iemand niet kan zeggen "mijn kies doet pijn", uit pijn zich in slaan of gillen.' },
      { factor: 'Pijnstillers', explanation: 'Is er recent gestopt met paracetamol of andere medicatie?' }
    ],
    dos: [
      {
        title: 'Systematische lichamelijke controle',
        description: 'Controleer temperatuur, ontlastingpatroon (obstipatie!), gebit, oren en huid op roodheid of zwelling.',
        priority: 'direct',
        category: 'veiligheid'
      },
      {
        title: 'Gebruik een gevalideerde pijnobservatieschaal',
        description: 'Vul de REPOS (Rotterdam Elderly Pain Observation Scale) of CPO (Checklist Pijn Gedrag) in.',
        priority: 'belangrijk',
        category: 'communicatie'
      },
      {
        title: 'Overleg over een proefbehandeling met paracetamol',
        description: 'Kijk in overleg met arts of pijnstilling het onrustige gedrag binnen enkele dagen doet afnemen.',
        priority: 'belangrijk',
        category: 'veiligheid'
      }
    ],
    donts: [
      {
        title: 'Het gedrag labelen als "moeilijk" of "aandachttrekkerij"',
        warning: 'Ga er nooit vanuit dat onrust zomaar een manipulatie is.',
        whyNot: 'Dit leidt tot ernstig medisch falen en onnodig lijden van de cliënt.'
      },
      {
        title: 'Meteen psychofarmaca of kalmeringsmiddelen geven',
        warning: 'Demp onrust niet meteen met antipsychotica zonder somatisch onderzoek.',
        whyNot: 'Maskeert de lichamelijke pijn terwijl de ontsteking of obstipatie verergert.'
      }
    ],
    whyItWorks: {
      concept: 'Gedrag als Communicatiemiddel van het Lichaam',
      explanation: 'Wanneer taal tekortschiet, is gedrag de enige taal die overblijft. Pijn activeert direct de stress-as (cortisol en adrenaline), wat resulteert in onrust, verzet en agitatie.',
      scientificBasis: 'Richtlijn Signaleren van Pijn bij Mensen met een Verstandelijke Beperking (NVAVG).'
    },
    escalation: {
      whenToConsult: ['Koorts, niet kunnen plassen, al 4 dagen geen ontlasting of acute zwelling.'],
      whenToEscalateEmergency: [
        'Acute buikpijn met harde buikwand (plankbuik).',
        'Bloedbraken of pikzwarte ontlasting (melaena).',
        'Sufheid gecombineerd met hoge koorts.'
      ],
      contactAdvice: 'Schakel de Arts Verstandelijk Gehandicapten (AVG-arts) of huisarts in voor lichamelijk onderzoek.'
    },
    clientVersion: {
      simpleTitle: 'Pijn in mijn lijf',
      simpleDescription: 'Ik voel pijn maar kan het moeilijk uitleggen.',
      pictogram: 'frown',
      whatIFeel: ['Mijn buik, tanden of oren doen pijn', 'Ik ben boos omdat het zeer doet', 'Ik wil niet eten'],
      whatHelpsMe: ['Aanwijzen waar het pijn doet', 'Een dokter die voorzichtig kijkt', 'Lekker onder een warme deken'],
      whatOthersShouldDo: ['Kijken of ik koorts of pijn heb', 'Mij zachtjes behandelen', 'Een arts bellen']
    }
  }
];
