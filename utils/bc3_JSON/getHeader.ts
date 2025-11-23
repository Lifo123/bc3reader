import { BC3_Info } from "../../types/BC3.types";

export function getHeaderInfo(lines: string[]): BC3_Info {
  let info: BC3_Info = {};

  for (let i = 0; i < 3; i++) {
    const line = lines[i];
    if (line === '') continue;

    const parts = line.split('|');

    switch (parts[0]) {
      case 'V':
        info.owner = parts[1];
        info.formatVersion = parts[2];
        info.fromSoftware = parts[3];
        info.headerId = parts[4]; //IDK what its their use for
        info.encoding = parts[5];

        info.comment = parts[6];
        info.typeInfo = parts[7];
        info.numberCertified = parts[8];
        info.dateCertified = parts[9];
        info.baseURL = parts[10];
        break;
      case 'K':
        const decimals = parts[1].split(`\\`)
        const percentages = parts[2].split(`\\`)

        const rawCurrencies = parts[3].split('\\').filter(x => x.trim() !== '');
        const currenciesList = [];
        const BLOCK_SIZE = 13;

        for (let i = 0; i < rawCurrencies.length; i += BLOCK_SIZE) {
          if (i + 12 < rawCurrencies.length) {
            currenciesList.push({
              drc: parseInt(rawCurrencies[i]),
              dc: parseInt(rawCurrencies[i + 1]),
              dfs: parseInt(rawCurrencies[i + 2]),
              drs: parseInt(rawCurrencies[i + 3]),
              duo: parseInt(rawCurrencies[i + 4]),
              di: parseInt(rawCurrencies[i + 5]),
              des: parseInt(rawCurrencies[i + 6]),
              dn: parseInt(rawCurrencies[i + 7]),
              dd: parseInt(rawCurrencies[i + 8]),
              ds: parseInt(rawCurrencies[i + 9]),
              dsp: parseInt(rawCurrencies[i + 10]),
              dec: parseInt(rawCurrencies[i + 11]),
              currencyCode: rawCurrencies[i + 12]
            });
          }
        }

        info.params = {
          decimals: {
            dn: parseInt(decimals[0]),
            dd: parseInt(decimals[1]),
            ds: parseInt(decimals[2]),
            dr: parseInt(decimals[3]),
            di: parseInt(decimals[4]),
            dp: parseInt(decimals[5]),
            dc: parseInt(decimals[6]),
            dm: parseInt(decimals[7]),
            currency: decimals[8],
          },
          percentages: {
            indirectCost: parseFloat(percentages[0]),
            generalCost: parseFloat(percentages[1]),
            profit: parseFloat(percentages[2]),
            baja: parseFloat(percentages[3]),
            tax: parseFloat(percentages[4]),
          },
          currencies: currenciesList,
          n: parts[4] ? parseInt(parts[4]) : 0,
        }
        break;
      default:
        break;
    }
  }

  return info;
}
