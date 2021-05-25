import { IJob } from "@/models/job";
import api from "./api";

const createJob = async (job: IJob): Promise<IJob> => {
  const newJob = {
    title: job.title,
    dailyHours: Number(job.dailyHours),
    totalHours: Number(job.totalHours),
    createdAt: new Date(),
  };

  return await api.post("/jobs", { ...newJob });
};
const updateJob = async (job: IJob): Promise<IJob> => {
  const newJob = {
    title: job.title,
    dailyHours: Number(job.dailyHours),
    totalHours: Number(job.totalHours),
  };

  return await api.put(`/jobs/${job.id}`, { ...newJob });
};

export { createJob, updateJob };
