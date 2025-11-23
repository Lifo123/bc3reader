import { BC3_Concept } from "../../types/BC3.types";
import { cleanString } from "../Helpers";


export function getTechnicalInfo(lines: string[]): BC3_Concept['technicalInfo'] {
  let technicalInfo: BC3_Concept['technicalInfo'] = {
    ref: {},
    values: {},
  };

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('|');
    const recordType = parts[0].toUpperCase();

    if (recordType !== 'X') continue;

    const rawCode = parts[1]?.trim();
    const conceptId = cleanString(rawCode);
    const isRef = conceptId === '';

    if (parts[2]) {
      const childParts = parts[2].split('\\');

      if (isRef) {
        for (let j = 0; j < childParts.length; j += 3) {
          const techId = childParts[j]?.trim();

          if (techId && technicalInfo.ref) {
            technicalInfo.ref[techId] = {
              summary: childParts[j + 1]?.trim(),
              unit: childParts[j + 2]?.trim(),
            };
          }
        }
      } else {
        if (!technicalInfo.values) technicalInfo.values = {};

        if (!technicalInfo.values[conceptId]) {
          technicalInfo.values[conceptId] = {};
        }

        for (let j = 0; j < childParts.length; j += 2) {
          const techId = childParts[j]?.trim();

          if (techId) {
            const valRaw = childParts[j + 1]?.trim();

            const valNum = parseFloat(valRaw);
            const finalValue = isNaN(valNum) ? valRaw : valNum;

            technicalInfo.values[conceptId][techId] = finalValue;
          }
        }
      }
    }

  }

  return technicalInfo;
}
