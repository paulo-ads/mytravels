import { getCities as getCitiesClient } from '../clients/geodb.client.js';
import { getCountry as getCountryClient } from '../clients/countries.client.js';
import { getPhotos as getPhotosClient } from '../clients/unsplash.client.js';
import { getWeather as getWeatherClient } from '../clients/weather.client.js';
import type {
  GuideCity,
  GuideCountry,
  GuidePayload,
  GuidePhoto,
  GuideWeather,
} from '../models/guide.model.js';
import { parseCities } from '../parsers/geodb.parser.js';
import { parseCountry } from '../parsers/countries.parser.js';
import { parseGuidePayload } from '../parsers/guide.parser.js';
import { parsePhoto } from '../parsers/unsplash.parser.js';
import { parseWeather } from '../parsers/weather.parser.js';

export const getGuide = async (countryCode: string): Promise<GuidePayload> => {
  const [guideCountry, guideCities] = await Promise.all([
    getCountry(countryCode),
    getCities(countryCode),
  ]);

  return parseGuidePayload(guideCities, guideCountry);
};

const getCities = async (countryCode: string): Promise<GuideCity[]> => {
  const rawData = await getCitiesClient(countryCode);
  const parsedCities = parseCities(rawData);

  return Promise.all(
    parsedCities.map(async (city): Promise<GuideCity> => {
      const [cityPhotos, cityWeather] = await Promise.all([
        getPhotos(city.name).catch(() => null),
        getWeather(city.name).catch(() => null),
      ]);

      return {
        name: city.name,
        photos: cityPhotos || null,
        population: city.population,
        weather: cityWeather || null,
      };
    }),
  );
};

const getCountry = async (countryCode: string): Promise<GuideCountry> => {
  const rawData = await getCountryClient(countryCode);
  return parseCountry(rawData);
};

const getPhotos = async (cityName: string): Promise<GuidePhoto[]> => {
  const rawData = await getPhotosClient(cityName);
  return rawData.map(parsePhoto);
};

const getWeather = async (cityName: string): Promise<GuideWeather> => {
  const rawData = await getWeatherClient(cityName);
  return parseWeather(rawData);
};
