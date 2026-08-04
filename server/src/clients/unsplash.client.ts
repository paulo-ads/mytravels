import type { UnsplashRawPhoto } from '../models/unsplash.model.js';

export const getPhotos = async (
  cityName: string,
): Promise<UnsplashRawPhoto[]> => {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;

  const fetchWithQuery = async (searchQuery: string) => {
    const query = encodeURIComponent(searchQuery);
    const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&orientation=landscape&per_page=1&query=${query}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unsplash Error: ${response.status}`);
    return await response.json();
  };

  const data = await fetchWithQuery(`${cityName} city`);

  return data.results?.length
    ? data.results
    : (await fetchWithQuery(cityName)).results;
};
