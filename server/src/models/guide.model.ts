export type GuidePhoto = {
  authorName: string;
  authorProfile: string;
  url: string;
};

export type GuideWeather = {
  condition: string;
  icon: string;
  tempC: number;
};

export type GuideCity = {
  name: string;
  population: number;
  photos?: GuidePhoto[] | null;
  weather?: GuideWeather | null;
};

export type GuideCountry = {
  capital: string;
  countryCode: string;
  flagUrl: string;
  name: string;
  population: number;
  region: string;
};

export type GuidePayload = {
  cities: GuideCity[];
  country: GuideCountry;
};
