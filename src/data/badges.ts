import { Badge } from '../types';

export const BADGES: Badge[] = [
  {
    id: 'badge-lvb-basis',
    title: 'LVB Basis',
    description: 'Beheersing van het onderscheid tussen verbale vaardigheid en praktisch handelingsniveau.',
    icon: 'Brain',
    category: 'LVB',
    requiredXpOrAction: 'Voltooi 1 LVB casus of quiz'
  },
  {
    id: 'badge-prikkelprofessional',
    title: 'Prikkelprofessional',
    description: 'Inzicht in sensorische filters, overprikkeling en direct effectieve ontprikkel-technieken.',
    icon: 'ZapOff',
    category: 'Autisme',
    requiredXpOrAction: 'Doorloop de volledige overprikkelingsflow'
  },
  {
    id: 'badge-deescalatie-meester',
    title: 'De-escalatie Meester',
    description: 'Spanning kunnen keren via non-verbale rust, co-regulatie en ruimte bieden.',
    icon: 'TrendingUp',
    category: 'De-escalatie',
    requiredXpOrAction: 'Voltooi 1 de-escalatie casus met topscore'
  },
  {
    id: 'badge-autisme-inzicht',
    title: 'Autisme Inzicht',
    description: 'Herkenning van detailgerichtheid, voorspelbaarheid en sensorische verwerking.',
    icon: 'Sparkles',
    category: 'Autisme',
    requiredXpOrAction: 'Beantwoord alle vragen van de LVB/Autisme quiz goed'
  },
  {
    id: 'badge-ggz-signalen',
    title: 'GGZ Signalen',
    description: 'Herkenning van psychotische belevingen, paniek en suïcidaliteit zonder oordeel.',
    icon: 'ShieldAlert',
    category: 'GGZ',
    requiredXpOrAction: 'Voltooi de casus over stemmen horen'
  },
  {
    id: 'badge-communicatie-expert',
    title: 'Communicatie Specialist',
    description: 'Kennis van aansluiten bij belevingswereld, ondertitelen en open communicatie.',
    icon: 'MessageSquareHeart',
    category: 'Communicatie',
    requiredXpOrAction: 'Stel een persoonlijk signaleringsplan op'
  },
  {
    id: 'badge-stress-regulatie',
    title: 'Stress & Emotieregulatie',
    description: 'Begrijpen van het zenuwstelsel, de Window of Tolerance en polyvagaal theorie.',
    icon: 'HeartHandshake',
    category: 'De-escalatie',
    requiredXpOrAction: 'Verdien 150+ XP in de app'
  }
];
