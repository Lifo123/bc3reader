import { BC3_Concept } from "../../types/BC3.types";
import { cleanString } from "../Helpers";

export function getAttachments(lines: string[]): BC3_Concept['attachments'] {
  let attachments: BC3_Concept['attachments'] = {};

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split('|');
    const recordType = parts[0].toUpperCase();

    if (recordType !== 'F' && recordType !== 'G') continue;

    const conceptCode = cleanString(parts[1]);

    if (!attachments[conceptCode]) {
      attachments[conceptCode] = [];
    }

    const content = parts[2];
    const urlExt = parts[3]?.trim();

    if (content) {
      const childParts = content.split('\\');

      if (recordType === 'G') {
        for (let j = 0; j < childParts.length; j++) {
          const file = childParts[j]?.trim();

          if (file) {
            attachments[conceptCode]!.push({
              type: 13,
              fileName: file,
              description: '',
              url: urlExt
            });
          }
        }
      } else if (recordType === 'F') {
        for (let j = 0; j < childParts.length; j += 3) {
          const typeStr = childParts[j]?.trim();
          const rawFiles = childParts[j + 1];
          const description = childParts[j + 2]?.trim();

          if (rawFiles) {
            const type = parseInt(typeStr) || 0;
            const files = rawFiles.split(';');

            files.forEach(file => {
              const cleanFile = file.trim();
              if (cleanFile) {
                attachments[conceptCode]!.push({
                  type: isNaN(type) ? 0 : type,
                  fileName: cleanFile,
                  description: description,
                  url: urlExt
                });
              }
            });
          }
        }
      }
    }
  }

  return attachments;
}
