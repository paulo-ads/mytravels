import type { GeodbRawData } from '../models/geodb.model.js';

export const getCities = async (
  countryCode: string,
  limit: number = 10,
): Promise<GeodbRawData[]> => {
  const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?countryIds=${countryCode}&limit=${limit}&sort=-population&types=CITY`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`GeoDB Error: ${response.status}`);
  const data = await response.json();
  return data.data;
};
