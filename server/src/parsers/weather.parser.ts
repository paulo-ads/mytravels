import type { GuideWeather } from '../models/guide.model.js';
import type { WeatherRawData } from '../models/weather.model.js';

export const parseWeather = (rawData: WeatherRawData): GuideWeather => {
  return {
    condition: rawData.current?.condition?.text || 'Unknown',
    icon: rawData.current?.condition?.icon || '',
    tempC: rawData.current?.temp_c || 0,
  };
};
