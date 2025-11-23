import type { BC3_Concept, BC3_Row_Concept } from "../../types/BC3.types";
import { cleanString } from "../Helpers/index";


export function getConcepts(lines: string[]): BC3_Concept['concepts'] {
  let concepts: Record<string, BC3_Row_Concept> = {};

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('|');
    const recordType = parts[0].toUpperCase();

    if (recordType !== 'C') continue;

    const code = cleanString(parts[1]);

    concepts[code] = {
      code: parts[1].trim(),
      unit: parts[2]?.trim(),
      summary: parts[3]?.trim(),
      price: parseFloat(parts[4]) || 0,
      date: parts[5]?.trim().replace(/\\/, ''),
      type: parseInt(parts[6]) || 0,
      typeSigla: parts[7]?.trim(),
    }
  }

  return concepts;
}
