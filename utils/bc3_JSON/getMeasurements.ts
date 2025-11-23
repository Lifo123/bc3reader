import { BC3_Concept, BC3_Measurement } from "../../types/BC3.types";
import { cleanString } from "../Helpers";

export function getMeasurements(lines: string[]): BC3_Concept['measurements'] {
  let measurements: BC3_Concept['measurements'] = {};

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('|');
    const recordType = parts[0].toUpperCase();

    if (recordType !== 'M' && recordType !== 'N') continue;

    const rawCode = parts[1] || '';
    let parentCode: string | undefined;
    let childCode = rawCode;

    if (rawCode.includes('\\')) {
      const codes = rawCode.split('\\');
      parentCode = cleanString(codes[0]);
      childCode = codes[1].trim();
    }

    const key = rawCode;
    const positions = parts[2]
      ? parts[2].split('\\')
        .map(x => x.trim())
        .filter(x => x !== '')
        .map(x => parseInt(x))
      : [];

    let currentLines: BC3_Measurement['lines'] = [];

    if (parts[4]) {
      const childParts = parts[4].split('\\');

      for (let j = 0; j < childParts.length; j += 6) {
        if (j + 5 >= childParts.length) break;

        const commentRaw = childParts[j + 1]?.trim() || '';
        const commentParts = commentRaw.split('#');

        const u = parseFloat(childParts[j + 2]);
        const l = parseFloat(childParts[j + 3]);
        const h = parseFloat(childParts[j + 4]);
        const w = parseFloat(childParts[j + 5]);

        if (childParts[j] || commentRaw || !isNaN(u)) {
          currentLines.push({
            type: childParts[j]?.trim(),
            comment: commentParts[0],
            bimId: commentParts[1] || undefined,
            units: isNaN(u) ? undefined : u,
            length: isNaN(l) ? undefined : l,
            height: isNaN(h) ? undefined : h,
            width: isNaN(w) ? undefined : w,
          });
        }
      }
    }

    if (recordType === 'N' && measurements[key]) {
      measurements[key]!.lines.push(...currentLines);
      measurements[key]!.total = parseFloat(parts[3]) || measurements[key]!.total;
    } else {
      measurements[key] = {
        parentCode: parentCode,
        childCode: childCode,
        position: positions,
        total: parseFloat(parts[3]) || 0,
        lines: currentLines,
        tag: parts[5]?.trim(),
      };
    }
  }

  return measurements;
}
