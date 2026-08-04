import { prisma } from '../lib/prisma.js';
import type { Prisma } from '../generated/client/index.js';
import type { TravelPayload } from '../models/travel.model.js';

export const getTravels = async (userId: number): Promise<TravelPayload[]> => {
  return await prisma.travel.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const createTravel = async (
  userId: number,
  countryCode: string,
  countryName: string,
  completed?: boolean,
  endDate?: Date,
  notes?: string,
  startDate?: Date,
): Promise<TravelPayload> => {
  return await prisma.travel.create({
    data: {
      userId,
      countryCode,
      countryName,
      completed: completed || false,
      endDate: endDate ?? null,
      notes: notes ?? null,
      startDate: startDate ?? null,
    },
  });
};

export const updateTravel = async (
  id: number,
  userId: number,
  completed?: boolean,
  endDate?: Date,
  notes?: string,
  startDate?: Date,
): Promise<TravelPayload | null> => {
  const data: Prisma.TravelUpdateInput = {};

  if (completed !== undefined) data.completed = completed;
  if (endDate !== undefined) data.endDate = endDate;
  if (notes !== undefined) data.notes = notes;
  if (startDate !== undefined) data.startDate = startDate;

  const result = await prisma.travel.updateMany({
    where: { id, userId },
    data,
  });

  if (result.count === 0) return null;

  return await prisma.travel.findUnique({ where: { id } });
};

export const deleteTravel = async (
  id: number,
  userId: number,
): Promise<boolean> => {
  const result = await prisma.travel.deleteMany({
    where: { id, userId },
  });
  return result.count > 0;
};
