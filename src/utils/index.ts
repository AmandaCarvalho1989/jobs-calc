import { IJob } from "@/models/job";
import { loadJobs } from "@/services/job";
import { loadProfileData } from "@/services/profile";

export const calculateBudget = (job: any, valueHour: number) => {
  return Math.round(valueHour * job.totalHours).toFixed(2);
};

export const remainingDays = (job: any) => {
  // cálculo de tempo restante
  const remainingDays = (job.totalHours / job.dailyHours).toFixed();

  const createdDate = new Date(job.createdAt);
  const dueDay = createdDate.getDate() + Number(remainingDays);
  const dueDateInMs = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDateInMs - Date.now();
  // transformar milli em dias
  const dayInMs = 1000 * 60 * 60 * 24;
  const dayDiff = Math.floor(timeDiffInMs / dayInMs);

  // restam x dias
  return dayDiff;
};
export interface IHomeFormattedData {
  statusCount: {
    progress: number;
    done: number;
    total: number;
  };
  freeHours: number;
  updatedJobs: IJob[];
}
export const loadFormattedData = async (): Promise<IHomeFormattedData> => {
  const profile = await loadProfileData();
  const jobs = await loadJobs();
  const statusCount = {
    progress: 0,
    done: 0,
    total: jobs.length,
  };
  let jobTotalHours = 0;

  const updatedJobs = jobs.map((job) => {
    // ajustes no job
    const remaining = remainingDays(job);
    const status = remaining <= 0 ? "done" : "progress";

    // Somando a quantidade de status
    statusCount[status] += 1;

    // total de horas por dia de cada Job em progresso
    jobTotalHours =
      status == "progress"
        ? jobTotalHours + Number(job.dailyHours)
        : jobTotalHours;

    return {
      ...job,
      remaining,
      status,
      budget: calculateBudget(job, profile.valueHour),
    };
  });
  const freeHours = profile.hoursPerDay - jobTotalHours;
  return {
    statusCount,
    freeHours,
    updatedJobs,
  };
};
