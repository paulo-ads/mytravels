import type { CountryRawData } from '../models/countries.model.js';
import type { GuideCountry } from '../models/guide.model.js';

export const parseCountry = (rawData: CountryRawData): GuideCountry => {
  return {
    capital: rawData.capital[0] || '',
    countryCode: rawData.cca2,
    flagUrl: rawData.flags?.svg || '',
    name: rawData.name?.common || 'Unknown',
    population: rawData.population || 0,
    region: rawData.region || 'Unknown',
  };
};
