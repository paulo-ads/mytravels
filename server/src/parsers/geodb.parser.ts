import type { GeodbRawData } from '../models/geodb.model.js';
import type { GuideCity } from '../models/guide.model.js';

export const parseCities = (rawData: GeodbRawData[]): GuideCity[] => {
  const forbiddenWords = [
    'area',
    'brasília',
    'district',
    'greater',
    'metropolitan',
    'region',
  ];

  const filteredRawData = rawData.filter((city) => {
    return !forbiddenWords.some((word) =>
      city.name.toLowerCase().includes(word),
    );
  });

  return filteredRawData.slice(0, 3).map((city) => ({
    name: city.name,
    population: city.population || 0,
  }));
};
