export const getWeather = async (cityName: string): Promise<any> => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?aqi=no&key=${apiKey}&q=${cityName}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`WeatherAPI Error: ${response.status}`);
  return await response.json();
};
