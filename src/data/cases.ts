import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-sam-lvb',
    title: 'Casus: Onrust bij Sam (LVB en Prikkels)',
    domain: 'LVB',
    targetGroup: 'Licht verstandelijke beperking & sensorische gevoeligheid',
    context: 'Woonlocatie Begeleid Wonen, einde van de middag (17:15 uur). De kookdienst is net gestart en er klinkt muziek in de gezamenlijke huiskamer.',
    vignette: 'Sam (24 jaar, LVB) loopt al twintig minuten onafgebroken met grote passen door de gang. Hij mompelt binnensmonds, praat steeds harder tegen zichzelf en wanneer een medebewoner vraagt of hij thee wil, snauwt hij fel: "Kop dicht jij!". Hij houdt af en toe kort zijn hand tegen zijn linkeroor. Wat doe je als begeleider?',
    learningObjective: 'Het herkennen van sensorische overprikkeling bij LVB en tijdig de-escaleren zonder cognitieve overvraging.',
    options: [
      {
        id: 'opt-1',
        text: 'Loop naar hem toe, pak hem even bij de schouder en vraag indringend: "Sam, wat is er nu precies aan de hand? Waarom doe je zo lelijk tegen de groep?"',
        isRecommended: false,
        effectOnTension: 'stijgt',
        xpReward: 10,
        feedbackTitle: 'Verhoogt de spanning aanzienlijk',
        feedbackReason: 'Fysiek aanraken zonder waarschuwing bij een overprikkeld zenuwstelsel kan een schrik- of vechtreactie uitlokken. Bovendien vraagt "waarom doe je zo?" om complexe zelfreflectie waarvoor zijn denkbrein op dit moment geen capaciteit heeft. Sam voelt zich aangevallen en de kans op een verbale of fysieke uitbarsting neemt toe.'
      },
      {
        id: 'opt-2',
        text: 'Ga op veilige afstand schuin in de gang staan, spreek op rustige, warme toon: "Hee Sam, ik zie dat het druk is in je hoofd. Loop even mee naar buiten of naar de rustkamer."',
        isRecommended: true,
        effectOnTension: 'daalt',
        xpReward: 50,
        feedbackTitle: 'Uitstekende, de-escalerende keuze',
        feedbackReason: 'Door schuin te gaan staan vermijd je een confronterende lichaamshouding. Je benoemt de emotie/drukte zonder oordeel ("het is druk in je hoofd") en biedt direct een prikkelarme uitweg (buiten of rustkamer) met een korte, concrete suggestie. Dit helpt zijn zenuwstelsel te kalmeren.'
      },
      {
        id: 'opt-3',
        text: 'Neem direct een krachtige leiderschapshouding aan en zeg: "Sam, stop met ijsberen. We tolereren niet dat je zo tegen medebewoners praat. Ga naar je kamer totdat het eten klaar is."',
        isRecommended: false,
        effectOnTension: 'stijgt',
        xpReward: 10,
        feedbackTitle: 'Risico op een escalatiecyclus',
        feedbackReason: 'Hoewel grenzen belangrijk zijn, ervaart Sam dit op dit moment als afwijzing en straf voor een overprikkeling die hij zelf niet kan remmen. De corrigerende toon triggert defensieve agressie of verzet ("Jij bepaalt niks!"). Grenzen stellen werkt pas nadat de spanning is gedaald.'
      },
      {
        id: 'opt-4',
        text: 'Laat Sam gewoon lopen en grijp niet in, in de hoop dat hij vanzelf uitraast terwijl jij doorgaat met aardappels schillen in de drukke keuken.',
        isRecommended: false,
        effectOnTension: 'stijgt',
        xpReward: 15,
        feedbackTitle: 'Gemiste kans op vroege interventie',
        feedbackReason: 'Passief afwachten in een omgeving vol prikkels (kookgeluiden, geuren, muziek) zorgt ervoor dat de emmer van Sam verder volloopt. Binnen enkele minuten kan de situatie omslaan naar fysieke vernieling of een geweldsincident met medebewoners.'
      }
    ],
    deepDiveNote: 'Bij LVB is het werkgeheugen beperkt en duurt prikkelverwerking langer. Vroegtijdige fysieke nabijheid op veilige afstand in combinatie met prikkelreductie is de gouden standaard voor de-escalatie.',
    observableSignals: [
      { id: 'sam-sig-1', label: 'Loopt al 20 minuten met grote passen onrustig door de gang', isKey: true, category: 'gedrag' },
      { id: 'sam-sig-2', label: 'Houdt af en toe kort de hand tegen het linkeroor', isKey: true, category: 'lichamelijk' },
      { id: 'sam-sig-3', label: 'Snauwt fel en defensief naar een medebewoner ("Kop dicht jij!")', isKey: true, category: 'communicatie' },
      { id: 'sam-sig-4', label: 'Achtergrondmuziek en kookgeluiden in de nabije huiskamer', isKey: true, category: 'omgeving' },
      { id: 'sam-sig-5', label: 'Praat steeds harder binnensmonds tegen zichzelf', isKey: true, category: 'gedrag' },
      { id: 'sam-sig-6', label: 'Zoekt actief ontspanning op zijn eigen kamer', isKey: false, category: 'gedrag' }
    ],
    hypotheses: [
      { id: 'sam-hyp-1', label: 'Sensorische overprikkeling (geluid, kookdrukte) bij beperkte verwerkingscapaciteit', isPlausible: true, explanation: 'De combinatie van kookgeluiden, muziek en de tijd van de dag veroorzaakt een overbelasting van het zintuiglijk systeem.' },
      { id: 'sam-hyp-2', label: 'Lichamelijk ongemak of pijn (bijv. oorpijn of kiespijn) dat zich uit in agitatie', isPlausible: true, explanation: 'Het herhaaldelijk aanraken van het linkeroor kan wijzen op lichamelijke pijn die Sam verbaal niet goed kan verwoorden.' },
      { id: 'sam-hyp-3', label: 'Doelbewust antisociaal of manipulatief dwarsliggen tegen de groep', isPlausible: false, explanation: 'Bij LVB is onrustig gedrag zelden gepland manipulatief; het is een uiting van overvraging of onveiligheid.' },
      { id: 'sam-hyp-4', label: 'Acute psychotische desoriëntatie met verwardheid', isPlausible: false, explanation: 'Er zijn geen aanwijzingen voor hallucinaties of wanen; het patroon past bij sensorische stress.' }
    ],
    expertReportExample: 'S: Sam (24, LVB) vertoonde om 17:15 uur verbale agressie en ijsberen in gang. B: Bekend met sensorische overprikkeling tijdens kooktijd en mogelijke oorklachten. A: Vroegtijdige escalatiefase (oranje) uitgelokt door huiskamergeluid. R: Rustig schuin aangesproken en naar buiten begeleid. Spanning gedaald, eet rustig op kamer. Controleer morgen het linkeroor op otitis.',
    reflectionQuestion: 'Wat zou je morgen vóór 17:00 uur kunnen afspreken met het team om te voorkomen dat Sam opnieuw overprikkeld raakt door kookgeluiden?',
    learningFeedback: {
      signalFeedback: 'Goed opgemerkt: zowel de omgevingsprikkels (koken/muziek) als het fysieke signaal (hand aan oor) zijn cruciaal voor een compleet beeld.',
      hypothesisFeedback: 'Sterk geredeneerd. Zowel zintuiglijke overprikkeling als lichamelijke pijn (oor) zijn realistische verklaringen die gelijktijdig kunnen spelen.',
      interventionFeedback: 'De-escaleren met behoud van fysieke en emotionele veiligheid heeft de hoogste prioriteit.',
      evaluationFeedback: 'Door prikkelreductie kan het zenuwstelsel herstellen zonder dat er grenzen geforceerd hoeven worden.'
    }
  },
  {
    id: 'case-fatima-stemmen',
    title: 'Casus: Fatima sluit zich op (Stemmen horen)',
    domain: 'GGZ',
    targetGroup: 'GGZ kwetsbaarheid, psychotische beleving & wantrouwen',
    context: 'Beschermde woonvorm GGZ, 21:00 uur ’s avonds. De avondmedicatie moet worden ingenomen.',
    vignette: 'Fatima (32 jaar) heeft de slaapkamerdeur op slot gedraaid. Vanuit de gang hoor je haar huilend en angstig fluisteren: "Nee, niet doen, ga weg!". Als je zachtjes klopt en vraagt of je binnen mag komen, roept ze paniekerig: "Nee! Jullie zitten in het complot, die pillen zijn vergif!". Wat is de beste professionele handelwijze?',
    learningObjective: 'Aansluiten bij de belevingswereld van een psychotische cliënt zonder in de waan mee te gaan of te forceren.',
    options: [
      {
        id: 'opt-fatima-1',
        text: 'Door de deur roepen: "Fatima, stel je niet aan. Je weet best dat die pillen geen gif zijn, die slik je al maanden. Doe open, anders gebruik ik de lopersleutel."',
        isRecommended: false,
        effectOnTension: 'stijgt',
        xpReward: 5,
        feedbackTitle: 'Ernstig escalerend en vertrouwensbreuk',
        feedbackReason: 'Voor Fatima is de dreiging 100% reëel. Door haar gevoel te ontkennen en te dreigen met forceren (lopersleutel), bevestig je direct haar waangedachte dat jij een vijandige bedreiging bent. Ze kan barricades opwerpen of in blinde angst het raam proberen uit te vluchten.'
      },
      {
        id: 'opt-fatima-2',
        text: 'Rustig tegen de deur gaan zitten op ooghoogte en zeggen: "Fatima, ik hoor dat je heel erg geschrokken bent en bang bent voor vergif. Ik ga de deur niet forceren. Ik blijf hier rustig even zitten."',
        isRecommended: true,
        effectOnTension: 'daalt',
        xpReward: 50,
        feedbackTitle: 'Zeer professionele presentiebenadering',
        feedbackReason: 'Je erkent haar angst ("ik hoor dat je bang bent") zonder haar waan te bevestigen. Door expliciet te melden dat je de deur niet forceert en rustig bij haar blijft, haal je de acute dreiging weg en verlaag je de paniek. De fysieke lage houding straalt geen dominantie uit.'
      },
      {
        id: 'opt-fatima-3',
        text: 'Zeggen: "Oké Fatima, ik geloof je dat er complotters zijn. Ik heb de politie al gebeld om ze op te pakken, dus nu kun je veilig de medicatie nemen."',
        isRecommended: false,
        effectOnTension: 'gelijk',
        xpReward: 15,
        feedbackTitle: 'Niet helpend: versterkt het waansysteem',
        feedbackReason: 'Meegaan in een waan ("collusie") lijkt op de korte termijn soms rust te geven, maar versterkt op de lange termijn de psychose en angst. Als Fatima erachter komt dat de politie niet komt, verliest ze haar enige anker met de realiteit.'
      },
      {
        id: 'opt-fatima-4',
        text: 'Meteen weglopen, de dienstdoende psychiater bellen en vragen om een rechterlijke machtiging voor gedwongen medicatietoediening.',
        isRecommended: false,
        effectOnTension: 'gelijk',
        xpReward: 20,
        feedbackTitle: 'Buitenproportionele en te vroege escalatie',
        feedbackReason: 'Een eenmalige weigering op dit moment vormt geen acuut levensgevaar. Dwangtoepassing is altijd het allerlaatste redmiddel (ultimum remedium) volgens de Wvggz. Er zijn eerst relationele de-escalatiestappen mogelijk.'
      }
    ],
    deepDiveNote: 'Bij psychotische belevingen is "aansluiten bij de emotie, begrenzen van de waan" de gouden regel. Angst erkennen schept contact; over de feiten discussiëren schept verwijdering.',
    observableSignals: [
      { id: 'fatima-sig-1', label: 'Slaapkamerdeur op slot gedraaid bij aanvang van medicatieronde', isKey: true, category: 'gedrag' },
      { id: 'fatima-sig-2', label: 'Huilt en fluistert angstig vanuit de kamer: "Nee, niet doen, ga weg!"', isKey: true, category: 'communicatie' },
      { id: 'fatima-sig-3', label: 'Roept paniekerig: "Jullie zitten in het complot, die pillen zijn vergif!"', isKey: true, category: 'communicatie' },
      { id: 'fatima-sig-4', label: 'Acute toename in paniek en wantrouwen richting bekende begeleiders', isKey: true, category: 'gedrag' },
      { id: 'fatima-sig-5', label: 'Tijdstip is 21:00 uur (avondrust, vermoeidheid, minder prikkels/stille gang)', isKey: true, category: 'omgeving' },
      { id: 'fatima-sig-6', label: 'Vraagt rustig om een extra toelichting op de bijsluiter', isKey: false, category: 'communicatie' }
    ],
    hypotheses: [
      { id: 'fatima-hyp-1', label: 'Psychotische beleving (auditieve hallucinaties / stemmen) met paranoïde waan', isPlausible: true, explanation: 'Het fluisteren tegen onzichtbare entiteiten en de angst voor vergiftiging passen bij een psychotische decompensatie.' },
      { id: 'fatima-hyp-2', label: 'Acute paniekaanval en verlies van controle door opgebouwde avondstress', isPlausible: true, explanation: 'Vermoeidheid en de druk van het medicatiemoment kunnen paniek en wantrouwen versterken.' },
      { id: 'fatima-hyp-3', label: 'Opzettelijk ongehoorzaam en manipulatief gedrag om regels te ontduiken', isPlausible: false, explanation: 'De beleving van gevaar is voor Fatima levensecht; dit is geen bewuste tegenwerking.' },
      { id: 'fatima-hyp-4', label: 'Acuut delier ten gevolge van een somatische infectie', isPlausible: false, explanation: 'Hoewel somatische factoren altijd overwogen moeten worden, past het beeld primair bij haar bekende psychiatrische kwetsbaarheid.' }
    ],
    expertReportExample: 'S: Fatima (32) heeft om 21:00 uur slaapkamerdeur op slot gedraaid en weigert avondmedicatie uit angst voor vergif. B: GGZ-woonvorm, bekend met paranoïde psychose en stemmen horen. A: Acute toename van paranoïde angst, geen direct gevaar voor zelfbeschadiging geobserveerd. R: Rustig bij de deur gaan zitten op ooghoogte, angst erkend en niet geforceerd. Na 25 min deur van slot. Medicatie in overleg uitgesteld tot ochtenddienst; nachtdienst gevraagd extra te luisteren.',
    reflectionQuestion: 'Hoe stem je morgenochtend met de behandelend psychiater en Fatima af over een veilige toedieningswijze zonder dat medicatie als bedreiging wordt ervaren?',
    learningFeedback: {
      signalFeedback: 'Zeer goed gekeken: de combinatie van het fluisteren ("ga weg") en de complotuitspraak wijst direct op hallucinaties en waanbeleving.',
      hypothesisFeedback: 'Uitstekend. Erkennen dat de angst voor de cliënt 100% reëel is, vormt de basis van goede psychiatrische zorg.',
      interventionFeedback: 'Presentie en relationele de-escalatie (niet forceren, nabij blijven) herstellen het basisvertrouwen.',
      evaluationFeedback: 'Door dwang te vermijden voorkom je trauma en behoud je de behandelrelatie voor de toekomst.'
    }
  },
  {
    id: 'case-daan-spanning',
    title: 'Casus: Daan gooit zijn bord om (Gedrag & Spanning)',
    domain: 'De-escalatie',
    targetGroup: 'LVB & emotieregulatieproblematiek',
    context: 'Gezamenlijke maaltijd na een lange dag op de houtwerkplaats.',
    vignette: 'Daan (29 jaar) zit strak aan tafel. Als een medebewoner vraagt om de boter, schuift Daan plots met een harde klap zijn bord van tafel, waardoor bord en eten kapot op de grond vallen. Hij springt op, zijn vuisten zijn gebald, zijn borstkas gaat wild op en neer en hij kijkt woedend om zich heen.',
    learningObjective: 'Snel handelen volgens de 3 stappen: veiligheid borgen, emotie erkennen, pas later reflecteren.',
    options: [
      {
        id: 'opt-daan-1',
        text: 'Zorg voor een veilige afstand, houd je handen ontspannen open en vraag rustig aan de medebewoners even naar de woonkamer te lopen.',
        isRecommended: true,
        effectOnTension: 'daalt',
        xpReward: 50,
        feedbackTitle: 'Optimale eerste veiligheidsstap',
        feedbackReason: 'Je haalt direct de toeschouwers weg (waardoor gezichtsverlies en gevaar voor anderen afneemt) en je lichaamstaal (open handen, veilige afstand) geeft het signaal dat er geen tegenaanval komt. Dit geeft Daan de fysieke ruimte om te ontladen zonder dat het escaleert.'
      },
      {
        id: 'opt-daan-2',
        text: 'Wijs streng naar de grond en eis: "Daan! Pak onmiddellijk een stoffer en blik en ruim deze troep op. Dit gedrag is volstrekt onacceptabel!"',
        isRecommended: false,
        effectOnTension: 'stijgt',
        xpReward: 5,
        feedbackTitle: 'Gevaarlijke directe escalatie',
        feedbackReason: 'Zijn adrenaline zit op het absolute maximum. Directe eisen stellen en bevelen geven zal op dit piekmoment vrijwel zeker leiden tot fysieke agressie (een klap of meubilair gooien). Herstel en opruimen komt pas in de herstelfase (Groen).'
      },
      {
        id: 'opt-daan-3',
        text: 'Loop snel op hem af en probeer hem in een fysieke fixatie te nemen om hem in bedwang te houden.',
        isRecommended: false,
        effectOnTension: 'stijgt',
        xpReward: 0,
        feedbackTitle: 'Ernstig gevaar voor letsel en schending Wzd',
        feedbackReason: 'Fysiek ingrijpen mag alleen bij acuut ernstig nadeel en als alle verbale alternatieven zijn uitgeput. Een eenzijdige fysieke actie leidt tot een hevig gevecht met groot risico op letsel voor zowel begeleider als cliënt.'
      },
      {
        id: 'opt-daan-4',
        text: 'Doe alsof er niets is gebeurd, ruim zelf het eten op en vraag gezellig: "Wie wil er nog een toetje?"',
        isRecommended: false,
        effectOnTension: 'gelijk',
        xpReward: 15,
        feedbackTitle: 'Grenzeloos en onveilig',
        feedbackReason: 'Volledig negeren zendt de boodschap dat er geen veilige kaders zijn. De spanning bij Daan is nog niet gezakt, waardoor hij zich onbegrepen kan voelen en alsnog een nieuw object zal zoeken om aandacht af te dwingen.'
      }
    ],
    deepDiveNote: 'De curve van oplopende spanning kent 4 fasen: Rust -> Opbouw -> Uitbarsting -> Herstel. In de uitbarstingsfase is alleen fysieke veiligheid en de-escalatie mogelijk; opvoeden of opruimen kan pas in de herstelfase.',
    observableSignals: [
      { id: 'daan-sig-1', label: 'Zit strak aan tafel met zichtbaar hoge spierspanning', isKey: true, category: 'lichamelijk' },
      { id: 'daan-sig-2', label: 'Schuift plots met harde klap zijn bord van tafel (eten en bord kapot)', isKey: true, category: 'gedrag' },
      { id: 'daan-sig-3', label: 'Springt direct op met gebalde vuisten', isKey: true, category: 'lichamelijk' },
      { id: 'daan-sig-4', label: 'Borstkas gaat wild op en neer (hoge, snelle ademhaling / adrenaline)', isKey: true, category: 'lichamelijk' },
      { id: 'daan-sig-5', label: 'Kijkt woedend en alert om zich heen na een vermoeiende werkdag', isKey: true, category: 'gedrag' },
      { id: 'daan-sig-6', label: 'Geeft rustig verbaal aan dat hij liever even wacht met eten', isKey: false, category: 'communicatie' }
    ],
    hypotheses: [
      { id: 'daan-hyp-1', label: 'Acute vecht-of-vluchtreactie (uitbarstingsfase) door opgebouwde overbelasting op het werk', isPlausible: true, explanation: 'Daan heeft de hele dag spanning opgebouwd; de simpele vraag om boter was de spreekwoordelijke druppel.' },
      { id: 'daan-hyp-2', label: 'Onvermogen tot verbale emotieregulatie bij fysieke uitputting en honger', isPlausible: true, explanation: 'Bij LVB kan een lage bloedsuiker in combinatie met vermoeidheid leiden tot plotseling controleverlies.' },
      { id: 'daan-hyp-3', label: 'Voorbedachte agressie gericht op het vernielen van eigendommen', isPlausible: false, explanation: 'De plotselinge fysiologische adrenalinepiek toont een impulsieve ontlading, geen voorbedacht plan.' },
      { id: 'daan-hyp-4', label: 'Atypische epileptische aanval met automatismen', isPlausible: false, explanation: 'Daan reageert bewust en alert op zijn omgeving, wat niet past bij een insult.' }
    ],
    expertReportExample: 'S: Daan (29) gooide om 18:00 uur tijdens diner plots bord stuk en stond met gebalde vuisten. B: LVB & emotieregulatieproblematiek, volle dag houtwerkplaats gehad. A: Acute fase Rood (uitbarsting). Hoog risico op escalatie bij correctie. R: Medebewoners rustig naar huiskamer geleid. Ruimte en veilige afstand geboden met open lichaamshouding. Daan na 15 min gekalmeerd naar herstelfase. Later samen schoongemaakt. Geen letsel.',
    reflectionQuestion: 'Welke overgangsinterventie kan worden toegevoegd aan Daans signaleringsplan tussen de werkdag en de avondmaaltijd (bijv. 20 min ontprikkelen op zijn kamer)?',
    learningFeedback: {
      signalFeedback: 'Scherp geobserveerd: de lichamelijke signalen (snelle ademhaling, gebalde vuisten) verraden dat zijn zenuwstelsel in de acute overlevingsstand staat.',
      hypothesisFeedback: 'Goede analyse: opgebouwde spanning ontlaadt zich vaak op schijnbaar kleine triggers. Dit is een emotieregulatieprobleem, geen opzettelijke vernielzucht.',
      interventionFeedback: 'Veiligheid eerst: medebewoners beschermen en geen verbale strijd aangaan op de piek van de curve.',
      evaluationFeedback: 'Door rust te bewaren voorkom je fysiek ingrijpen en kan Daan op eigen kracht terugkeren naar de herstelfase.'
    }
  }
];
