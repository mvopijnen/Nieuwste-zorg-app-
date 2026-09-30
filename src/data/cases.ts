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
    deepDiveNote: 'Bij LVB is het werkgeheugen beperkt en duurt prikkelverwerking langer. Vroegtijdige fysieke nabijheid op veilige afstand in combinatie met prikkelreductie is de gouden standaard voor de-escalatie.'
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
    deepDiveNote: 'Bij psychotische belevingen is "aansluiten bij de emotie, begrenzen van de waan" de gouden regel. Angst erkennen schept contact; over de feiten discussiëren schept verwijdering.'
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
    deepDiveNote: 'De curve van oplopende spanning kent 4 fasen: Rust -> Opbouw -> Uitbarsting -> Herstel. In de uitbarstingsfase is alleen fysieke veiligheid en de-escalatie mogelijk; opvoeden of opruimen kan pas in de herstelfase.'
  }
];
