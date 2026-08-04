export interface Travel {
  id: number;
  userId: number;
  countryCode: string;
  countryName: string;
  completed: boolean;
  startDate?: string | null;
  endDate?: string | null;
  notes?: string | null;
}
