import { BC3_Concept } from "../../types/BC3.types";
import { cleanString } from "../Helpers";


export function parseTechnicalInfo(lineItems: string[], technicalInfo: BC3_Concept['technicalInfo']) {
  if (!technicalInfo?.ref) technicalInfo!.ref = {};
  if (!technicalInfo?.values) technicalInfo!.values = {};

  const rawCode = lineItems[1]?.trim();
  const conceptId = cleanString(rawCode);
  const isRef = conceptId === '';

  if (lineItems[2]) {
    const childlineItems = lineItems[2].split('\\');

    if (isRef) {
      for (let j = 0; j < childlineItems.length; j += 3) {
        const techId = childlineItems[j]?.trim();

        if (techId) {
          technicalInfo!.ref[techId] = {
            summary: childlineItems[j + 1]?.trim(),
            unit: childlineItems[j + 2]?.trim(),
          };
        }
      }
    } else {
      if (!technicalInfo!.values[conceptId]) {
        technicalInfo!.values[conceptId] = {};
      }

      for (let j = 0; j < childlineItems.length; j += 2) {
        const techId = childlineItems[j]?.trim();

        if (techId) {
          const valRaw = childlineItems[j + 1]?.trim();
          const valNum = parseFloat(valRaw);
          const finalValue = isNaN(valNum) ? valRaw : valNum;

          technicalInfo!.values[conceptId][techId] = finalValue;
        }
      }
    }
  }
}
