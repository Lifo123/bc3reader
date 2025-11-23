import { BC3_Concept } from "../../types/BC3.types";
import { cleanString } from "../Helpers";


export function getTexts(lines: string[]): BC3_Concept['texts'] {
  let texts: BC3_Concept['texts'] = {};

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('|');
    const recordType = parts[0].toUpperCase();

    if (recordType !== 'T' && recordType !== 'P') continue;

    const conceptId = cleanString(parts[1]);
    texts[conceptId] = parts[2]?.trim();
  }

  return texts;
}
