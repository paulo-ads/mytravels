import type {
  GuideCountry,
  GuideCity,
  GuidePayload,
} from '../models/guide.model.js';

export const parseGuidePayload = (
  guideCities: GuideCity[],
  guideCountry: GuideCountry,
): GuidePayload => {
  return {
    cities: guideCities,
    country: guideCountry,
  };
};
