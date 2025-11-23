import type { Bc3RawData } from '../types/BC3.types';
import {
  getHeaderInfo,
  getConcepts,
  getDescomposition,
  getTexts,
  getMeasurements,
  getTechnicalInfo,
  getResiduals,
  getAttachments
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

    technicalInfo: {},
    residuals: {},
    attachments: {},
  };

  const lines = content.split('~');

  data.info = getHeaderInfo(lines);
  data.concepts = getConcepts(lines);
  data.decompositions = getDescomposition(lines)
  data.texts = getTexts(lines);
  data.measurements = getMeasurements(lines);

  data.technicalInfo = getTechnicalInfo(lines);
  data.residuals = getResiduals(lines);
  data.attachments = getAttachments(lines);

  return data
}


