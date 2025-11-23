import { BC3_Concept } from "../../types/BC3.types";
import { cleanString } from "../Helpers";


export function parseTexts(lineItems: string[], texts: BC3_Concept['texts']) {
  if (texts) {
    const conceptId = cleanString(lineItems[1]);
    texts[conceptId] = lineItems[2]?.trim();
  }
}
