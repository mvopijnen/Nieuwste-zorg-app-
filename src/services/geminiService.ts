import { GoogleGenAI } from '@google/genai';
import { SITUATIONS } from '../data/situations';
import { Situation } from '../types';

export interface AiAnalysisResult {
  summaryHypotheses: string;
  matchedSituations: Situation[];
  directDos: string[];
  directDonts: string[];
  safetyNotice: string;
  source: 'gemini' | 'rules';
}

const SYSTEM_INSTRUCTION = `Je bent de PraktijkKompas AI Assistent voor zorgprofessionals in de Nederlandse GGZ, LVB-zorg, gehandicaptenzorg en het sociaal domein.
Jouw taak is de professional te ondersteunen bij de vraag: "Wat speelt er en wat kan ik nu doen?".

STRIKTE VEILIGHEIDS- EN ETHIEKREGELS:
1. Stel NOOIT een medische of psychiatrische diagnose. Gebruik altijd formuleringen zoals: "kan passen bij", "kan samenhangen met", "mogelijke verklaringen zijn".
2. Schrijf in helder, menselijk en professioneel Nederlands (geen onnodig medisch jargon).
3. Geef concrete, direct toepasbare handelingsperspectieven (de-escalerend, prikkelarm, ruimte gevend).
4. Benoem expliciet wat men NIET moet doen (veelgestelde valkuilen).
5. Eindig altijd met een korte veiligheidsherinnering over organisatieprotocollen en noodnummers bij acuut gevaar.`;

export async function analyzeSituationWithAi(userObservation: string): Promise<AiAnalysisResult> {
  const query = userObservation.toLowerCase();

  // Find relevant situations from our database
  const matched = SITUATIONS.filter(s => {
    const titleMatch = s.title.toLowerCase().includes(query) || s.shortDescription.toLowerCase().includes(query);
    const signalMatch = s.signals.some(sig => query.includes(sig.label.toLowerCase()) || sig.label.toLowerCase().split(' ').some(w => w.length > 4 && query.includes(w)));
    const domainMatch = s.domains.some(d => query.includes(d.toLowerCase()));
    return titleMatch || signalMatch || domainMatch;
  });

  const selectedMatches = matched.length > 0 ? matched.slice(0, 3) : [SITUATIONS[0], SITUATIONS[1]];

  // Check if Gemini API key is available in Vite environment
  const apiKey = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '');

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Een zorgprofessional beschrijft de volgende situatie:
"${userObservation}"

Help deze professional de situatie direct te structureren volgens de PraktijkKompas richtlijnen:
1. Mogelijke verklaringen (stel geen diagnose, formuleer als hypothesen).
2. Wat kun je NU direct doen? (2-3 concrete adviezen).
3. Wat kun je beter NIET doen? (2 valkuilen).
Geef antwoord in compacte, heldere alinea's.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3
        }
      });

      const responseText = response.text || '';

      return {
        summaryHypotheses: responseText,
        matchedSituations: selectedMatches,
        directDos: selectedMatches.flatMap(s => s.dos.slice(0, 2).map(d => `${d.title}: ${d.description}`)),
        directDonts: selectedMatches.flatMap(s => s.donts.slice(0, 1).map(d => `${d.title}: ${d.warning}`)),
        safetyNotice: 'Bij acuut fysiek gevaar of ernstige somatische nood direct organisatieprotocol, arts of 112 inschakelen.',
        source: 'gemini'
      };
    } catch {
      // Fallback cleanly to structured expert rules
    }
  }

  // Fallback to deterministic expert clinical heuristic logic
  return buildExpertRuleResponse(userObservation, selectedMatches);
}

function buildExpertRuleResponse(observation: string, matchedSituations: Situation[]): AiAnalysisResult {
  const primary = matchedSituations[0] || SITUATIONS[0];

  const hypothesesText = `De beschreven signalen ("${observation.slice(0, 60)}${observation.length > 60 ? '...' : ''}") kunnen bij verschillende situaties voorkomen. Mogelijke verklaringen zijn onder andere ${primary.hypotheses.map(h => h.title.toLowerCase()).join(', ')} of sensorische overvraging. Er kunnen ook somatische factoren (zoals pijn of vermoeidheid) meespelen.`;

  const dos = primary.dos.slice(0, 3).map(d => `**${d.title}**: ${d.description}`);
  const donts = primary.donts.slice(0, 2).map(d => `**${d.title}**: ${d.warning} (${d.whyNot})`);

  return {
    summaryHypotheses: hypothesesText,
    matchedSituations: matchedSituations,
    directDos: dos,
    directDonts: donts,
    safetyNotice: 'PraktijkKompas stelt geen medische diagnoses. Volg bij dreigend gevaar altijd het protocol van je zorgorganisatie.',
    source: 'rules'
  };
}
