import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';
import { getGuide as getGuideService } from '../services/guide.service.js';

export const getGuide = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { countryCode } = req.params;

    if (!countryCode || typeof countryCode !== 'string') {
      return next(new AppError('Invalid or missing country code.', 400));
    }
    const guide = await getGuideService(countryCode);

    res.json(guide);
  } catch (err) {
    next(err);
  }
};
