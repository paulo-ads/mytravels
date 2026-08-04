export type TravelPayload = {
  completed: boolean;
  countryCode: string;
  countryName: string;
  createdAt: Date;
  endDate: Date | null;
  id: number;
  notes: string | null;
  startDate: Date | null;
  updatedAt: Date;
  userId: number;
};
