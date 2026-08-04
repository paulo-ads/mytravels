import type { GuidePhoto } from '../models/guide.model.js';
import type { UnsplashRawPhoto } from '../models/unsplash.model.js';

export const parsePhoto = (rawData: UnsplashRawPhoto): GuidePhoto => {
  return {
    authorName: rawData.user?.name || 'Unknown Photographer',
    authorProfile: rawData.user?.links?.html || '',
    url: rawData.urls?.regular || '',
  };
};
