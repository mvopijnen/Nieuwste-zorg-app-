import { Quiz } from '../types';

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-deescalatie',
    title: 'Quiz: Meesterschap in De-escalatie',
    description: 'Test je kennis over vroege spanningsopbouw, communicatieve valkuilen en het Window of Tolerance.',
    domain: 'De-escalatie',
    xpReward: 60,
    questions: [
      {
        id: 'q1-1',
        question: 'Een cliënt begint steeds harder te praten en ijsbeert door de ruimte. Wat is op dit moment de meest helpende houding voor jou als zorgverlener?',
        options: [
          'Frontaal tegenover de cliënt gaan staan met de armen over elkaar om natuurlijk gezag uit te stralen',
          'Twee stappen afstand nemen, schuin gaan staan en je eigen stemvolume en spreektempo verlagen',
          'Vragen: "Waarom doe je zo onrustig? Vertel eens precies wat er scheelt"',
          'Direct een time-out op de kamer opleggen'
        ],
        correctIndex: 1,
        explanation: 'Door schuin te gaan staan en afstand te houden voorkom je dat je als bedreiging wordt ervaren. Het verlagen van je stemtempo en -volume triggert co-regulatie via het spiegelsysteem van de cliënt.',
        domain: 'De-escalatie'
      },
      {
        id: 'q1-2',
        question: 'Waarom werkt de opmerking "Kalmeer nu even, er is niets aan de hand" vrijwel altijd averechts bij oplopende woede?',
        options: [
          'Omdat de cliënt te weinig intelligent is om te begrijpen wat kalmeren betekent',
          'Omdat het de reële fysiologische spanning van de cliënt bagatelliseert en het gevoel geeft niet serieus genomen te worden',
          'Omdat je altijd eerst fysiek moet ingrijpen voordat je praat',
          'Omdat regels alleen schriftelijk gecommuniceerd mogen worden'
        ],
        correctIndex: 1,
        explanation: 'Het ontkennen van de emotie zorgt voor invalidatie. De cliënt voelt zich niet gehoord en zal het volume nog verder moeten opvoeren om de urgentie over te brengen.',
        domain: 'De-escalatie'
      },
      {
        id: 'q1-3',
        question: 'Wat gebeurt er neurologisch met de "prefrontale cortex" (het denkende brein) wanneer de spanning piekt in de vecht/vlucht-fase?',
        options: [
          'De prefrontale cortex gaat sneller en rationeler logische argumenten verwerken',
          'De prefrontale cortex raakt tijdelijk ondergeschikt aan de amygdala; logische redeneringen en lange zinnen komen niet meer aan',
          'Er treedt direct een staat van diepe ontspanning op',
          'Het gehoor verbetert voor complexe abstracte instructies'
        ],
        correctIndex: 1,
        explanation: 'Onder hoge acute stress kaapt de amygdala het brein. De executieve functies vallen tijdelijk uit. Alleen korte, concrete, voorspelbare taal op laag volume kan nog worden verwerkt.',
        domain: 'De-escalatie'
      }
    ]
  },
  {
    id: 'quiz-lvb-autisme',
    title: 'Quiz: Begrijpen van LVB & Sensorische Prikkels',
    description: 'Ontdek hoe overvraging ontstaat door de kloof tussen verbale vlotheid en emotionele draagkracht.',
    domain: 'LVB',
    xpReward: 60,
    questions: [
      {
        id: 'q2-1',
        question: 'Wat bedoelen we met de "façade" of overschatting bij een cliënt met een lichte verstandelijke beperking (LVB)?',
        options: [
          'Dat de cliënt opzettelijk liegt om zorgverleners te manipuleren',
          'Dat een vlotte verbale babbel en sociaal wenselijk "ja knikken" verbloemt dat het daadwerkelijke begrips- en handelingsniveau veel lager ligt',
          'Dat de cliënt geen behoefte heeft aan structuur of dagritme',
          'Dat de cliënt intelligenter is dan de gemiddelde bevolking'
        ],
        correctIndex: 1,
        explanation: 'Veel mensen met een LVB hebben geleerd sociaal wenselijke antwoorden te geven om erbij te horen en schaamte te maskeren. De handelingsbekwaamheid blijft vaak achter bij het praatje.',
        domain: 'LVB'
      },
      {
        id: 'q2-2',
        question: 'Hoe formuleer je een opdracht het meest effectief voor iemand met een verwerkingsbeperking?',
        options: [
          '"Zou je alsjeblieft, zodra je klaar bent met je koffie, even je jas willen aantrekken en daarna de sleutels pakken zodat we over tien minuten weg kunnen?"',
          'Één duidelijke, concrete stap tegelijk: "Trek je jas aan." Pas na voltooiing de volgende stap.',
          'Door de hele weekplanning in één keer mondeling door te nemen bij het ontbijt',
          'Geen opdrachten geven, maar hopen dat de cliënt zelf initiatief neemt'
        ],
        correctIndex: 1,
        explanation: 'Het kortetermijngeheugen en werkgeheugen hebben een beperkte capaciteit. Door taken op te knippen in behapbare micro-stappen (voor-samen-zelf) voorkom je frustratie en faalervaringen.',
        domain: 'LVB'
      },
      {
        id: 'q2-3',
        question: 'Welk signaal wijst waarschijnlijk op sensorische overprikkeling in plaats van "onwil"?',
        options: [
          'De cliënt vraagt rustig om een extra taak',
          'Handen voor de oren slaan, knipperen tegen fel TL-licht of plotseling verstrakken bij harde achtergrondmuziek',
          'Een uitgebreid betoog houden over politiek',
          'Lachen en ontspannen grapjes maken'
        ],
        correctIndex: 1,
        explanation: 'Lichamelijke afweerreacties zoals het afsluiten van de zintuigen wijzen op een zenuwstelsel dat de overvloed aan omgevingsprikkels niet meer kan filteren.',
        domain: 'Autisme'
      }
    ]
  }
];
