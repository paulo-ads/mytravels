export interface GuideImage {
  url: string;
  authorName: string;
  authorProfile: string;
}

export interface GuideWeather {
  tempC: number;
  condition: string;
  icon: string;
}

export interface GuideCity {
  name: string;
  population: number;
  weather: GuideWeather | null;
  photos: GuideImage[];
}

export interface GuideCountry {
  capital: string;
  countryCode: string;
  flagUrl: string;
  name: string;
  population: number;
  region: string;
  currency?: string;
  languages?: string[];
}

export interface GuidePayload {
  country: GuideCountry;
  cities: GuideCity[];
}
