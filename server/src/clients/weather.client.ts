import type { WeatherRawData } from '../models/weather.model.js';

export const getWeather = async (cityName: string): Promise<WeatherRawData> => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?aqi=no&key=${apiKey}&q=${cityName}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`WeatherAPI Error: ${response.status}`);
  return await response.json();
};
