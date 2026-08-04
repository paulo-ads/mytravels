import type { CountryRawData } from '../models/countries.model.js';

export const getCountry = async (
  countryCode: string,
): Promise<CountryRawData> => {
  const apiKey = process.env.REST_COUNTRIES_API_KEY;
  const response = await fetch(
    `https://api.restcountries.com/countries/v5/codes.alpha_3/${countryCode}?response_fields=names.common,codes.alpha_2,capitals,flag.url_svg,population,region`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );
  if (!response.ok) throw new Error(`REST Countries Error: ${response.status}`);
  const data = await response.json();
  return data.data.objects[0];
};
