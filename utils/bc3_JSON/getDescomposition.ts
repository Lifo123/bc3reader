import { BC3_Concept, BC3_Decomp } from "../../types/BC3.types";
import { cleanString } from "../Helpers";


export function getDescomposition(lines: string[]): BC3_Concept['decompositions'] {
  let decompositions: BC3_Concept['decompositions'] = {};

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('|');
    const recordType = parts[0].toUpperCase();

    if (recordType !== 'D' && recordType !== 'Y') continue;

    const parentCode = cleanString(parts[1]);
    const content = parts[2];

    if (content) {
      const childParts = content.split('\\');
      const currentChilds: BC3_Decomp['childs'] = [];

      for (let j = 0; j < childParts.length; j += 3) {
        const childCode = childParts[j]?.trim();

        if (!childCode) continue;

        currentChilds.push({
          code: childCode,
          factor: parseFloat(childParts[j + 1]) || 1.0,
          yield: parseFloat(childParts[j + 2]) || 1.0,
        });
      }

      if (currentChilds.length > 0) {
        if (!decompositions[parentCode]) {
          decompositions[parentCode] = [];
        }
        decompositions[parentCode]!.push(...currentChilds);
      }
    }
  }

  return decompositions;
}
