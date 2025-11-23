import { BC3_Concept, BC3_Decomp } from "../../types/BC3.types";
import { cleanString } from "../Helpers";


export function parseDescomposition(lineItems: string[], decompositions: BC3_Concept['decompositions']) {
  const parentCode = cleanString(lineItems[1]);
  const content = lineItems[2];

  if (content) {
    const childlineItems = content.split('\\');
    const currentChilds: BC3_Decomp['childs'] = [];

    for (let j = 0; j < childlineItems.length; j += 3) {
      const childCode = childlineItems[j]?.trim();

      if (!childCode) continue;

      currentChilds.push({
        code: childCode,
        factor: parseFloat(childlineItems[j + 1]) || 1.0,
        yield: parseFloat(childlineItems[j + 2]) || 1.0,
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
