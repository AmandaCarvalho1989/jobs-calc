export interface IJob {
  id?: string;
  title: string;
  totalHours: number;
  dailyHours: number;
  remaining?: number;
  status?: string;
  budget?: number;
}