import type { Bc3RawData } from '../types/BC3.types';
import {
  parseHeader,
  parseConcepts,
  parseDescomposition,
  parseTexts,
  parseMeasurements,
  parseTechnicalInfo,
  parseResiduals,
  parseAttachments
} from '../utils/bc3_JSON/index';

export function parseBC3(buffer: Uint8Array) {
  const decoder = new TextDecoder('windows-1252');
  const content = decoder.decode(buffer);

  const data: Bc3RawData = {
    info: {},
    concepts: {},
    decompositions: {},
    texts: {},
    measurements: {},

    technicalInfo: { ref: {}, values: {} },
    residuals: {},
    attachments: {},
  };

  const lines = content.split('~');

  for (let i = 0; i < lines.length; i++) {
    const lineItems = lines[i].split('|');
    const recordType = lineItems[0].toUpperCase();

    switch (recordType) {
      case 'V':
      case 'K':
        parseHeader(lineItems, data.info);
        break;
      case 'C':
        parseConcepts(lineItems, data.concepts);
        break;
      case 'D':
      case 'Y':
        parseDescomposition(lineItems, data.decompositions);
        break;
      case 'T':
      case 'P':
        parseTexts(lineItems, data.texts);
        break;
      case 'M':
      case 'N':
        parseMeasurements(lineItems, data.measurements);
        break;

      case 'X':
        parseTechnicalInfo(lineItems, data.technicalInfo);
        break;
      case 'R':
        parseResiduals(lineItems, data.residuals);
        break;
      case 'F':
      case 'G':
        parseAttachments(lineItems, data.attachments);
        break;

      default:
        break;
    }
  }

  return data
}


