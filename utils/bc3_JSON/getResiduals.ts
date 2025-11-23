import { BC3_Concept, BC3_Residuals } from "../../types/BC3.types";
import { cleanString } from "../Helpers";

export function getResiduals(lines: string[]): BC3_Concept['residuals'] {
  let residuals: BC3_Concept['residuals'] = {};

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('|');
    const recordType = parts[0].toUpperCase();
    const parentCode = cleanString(parts[1]);

    if (recordType !== 'R') continue;
    if (!parentCode) continue;

    if (!residuals[parentCode]) {
      residuals[parentCode] = [];
    }

    for (let j = 2; j < parts.length; j++) {
      const field = parts[j];
      if (!field || field.trim() === '') continue;

      const subParts = field.split('\\');

      if (subParts.length >= 2) {
        const type = parseInt(subParts[0]);
        const childCode = subParts[1]?.trim();

        if (!childCode) continue;

        const props: BC3_Residuals['props'] = {};

        for (let k = 2; k < subParts.length; k += 3) {
          const propName = subParts[k]?.trim();
          if (!propName) continue;

          const valRaw = subParts[k + 1]?.trim();
          const unit = subParts[k + 2]?.trim();

          const valNum = parseFloat(valRaw);

          props[propName] = {
            value: isNaN(valNum) ? valRaw : valNum,
            unit: unit || undefined
          };
        }

        residuals[parentCode]!.push({
          type: isNaN(type) ? 0 : type,
          code: childCode,
          props: props
        });
      }
    }
  }

  return residuals;
}
