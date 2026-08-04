import type { CountryRawData } from '../models/countries.model.js';

export const getCountry = async (
  countryCode: string,
): Promise<CountryRawData> => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`,
  );

  if (!response.ok) throw new Error(`REST Countries Error: ${response.status}`);
  const data = await response.json();
  return data[0];
};
