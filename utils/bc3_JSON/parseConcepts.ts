import type { BC3_Concept, BC3_Row_Concept } from "../../types/BC3.types";
import { cleanString } from "../Helpers/index";


export function parseConcepts(lineItems: string[], concepts: BC3_Concept['concepts']) {
  const code = cleanString(lineItems[1]);

  concepts[code] = {
    code: code,
    unit: lineItems[2]?.trim(),
    summary: lineItems[3]?.trim(),
    price: parseFloat(lineItems[4]) || 0,
    date: lineItems[5]?.trim().replace(/\\/, ''),
    type: parseInt(lineItems[6]) || 0,
    typeSigla: lineItems[7]?.trim(),
  }
}
