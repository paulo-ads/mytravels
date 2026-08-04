import { AppError } from '../utils/AppError.js';
import {
  createTravel as createTravelRepository,
  deleteTravel as deleteTravelRepository,
  getTravels as getTravelsRepository,
  updateTravel as updateTravelRepository,
} from '../repositories/travel.repository.js';

export const getTravels = async (userId: number) => {
  return await getTravelsRepository(userId);
};

export const createTravel = async (
  userId: number,
  countryCode: string,
  countryName: string,
  completed?: boolean,
  endDate?: string,
  notes?: string,
  startDate?: string,
) => {
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  return await createTravelRepository(
    userId,
    countryCode,
    countryName,
    completed,
    end,
    notes,
    start,
  );
};

export const updateTravel = async (
  id: number,
  userId: number,
  completed?: boolean,
  endDate?: string,
  notes?: string,
  startDate?: string,
) => {
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  const updatedTravel = await updateTravelRepository(
    id,
    userId,
    completed,
    end,
    notes,
    start,
  );

  if (!updatedTravel) {
    throw new AppError('Travel plan not found or unauthorized.', 404);
  }

  return updatedTravel;
};

export const deleteTravel = async (id: number, userId: number) => {
  const deleted = await deleteTravelRepository(id, userId);
  if (!deleted)
    throw new AppError('Travel plan not found or unauthorized', 404);
};
