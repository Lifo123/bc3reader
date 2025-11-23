import { BC3_Concept } from "../../types/BC3.types";
import { cleanString } from "../Helpers";

export function parseAttachments(lineItems: string[], attachments: BC3_Concept['attachments']) {
  if (!attachments) return;
  const conceptCode = cleanString(lineItems[1]);
  const recordType = lineItems[0].toUpperCase();

  if (!conceptCode) return;

  if (!attachments[conceptCode]) {
    attachments[conceptCode] = [];
  }

  const content = lineItems[2];
  const urlExt = lineItems[3]?.trim();

  if (content) {
    const childParts = content.split('\\');

    if (recordType === 'G') {
      for (let j = 0; j < childParts.length; j++) {
        const file = childParts[j]?.trim();

        if (file) {
          attachments[conceptCode]!.push({
            type: 13, // 13 = Imagen (Estándar FIEBDC)
            fileName: file,
            description: 'Gráfico',
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
