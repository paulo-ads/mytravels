import type { CountryRawData } from '../models/countries.model.js';
import type { GuideCountry } from '../models/guide.model.js';

export const parseCountry = (rawData: CountryRawData): GuideCountry => {
  return {
    capital: rawData.capitals[0]?.name || '',
    countryCode: rawData.codes.alpha_2,
    flagUrl: rawData.flag.url_svg || '',
    name: rawData.names.common || 'Unknown',
    population: rawData.population || 0,
    region: rawData.region || 'Unknown',
  };
};
