import type { Request, Response, NextFunction } from 'express';
import {
  createTravel as createTravelService,
  deleteTravel as deleteTravelService,
  getTravels as getTravelsService,
  updateTravel as updateTravelService,
} from '../services/travel.service.js';

export const getTravels = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const travels = await getTravelsService(userId);
    res.json(travels);
  } catch (err) {
    next(err);
  }
};

export const createTravel = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { countryCode, countryName, completed, endDate, notes, startDate } =
      req.body;

    const travel = await createTravelService(
      userId,
      countryCode,
      countryName,
      completed,
      endDate,
      notes,
      startDate,
    );

    res.status(201).json(travel);
  } catch (err) {
    next(err);
  }
};

export const updateTravel = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const { completed, endDate, notes, startDate } = req.body;

    const updatedTravel = await updateTravelService(
      Number(id),
      userId,
      completed,
      endDate,
      notes,
      startDate,
    );

    res.json(updatedTravel);
  } catch (err) {
    next(err);
  }
};

export const deleteTravel = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    await deleteTravelService(Number(id), userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
