import { IProfile } from "@/models/profile";
import api from "./api";

const weeksPerYear = 52;

async function loadProfileData(): Promise<IProfile> {
  const response = await api.get("/profile");
  const { daysPerWeek, vacationsPerYear, hoursPerDay, monthlyBudget } =
    response.data;

  // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
  const weeksPerMonth = (weeksPerYear - vacationsPerYear) / 12;

  // total de horas trabalhadas na semana
  const weekTotalHours = hoursPerDay * daysPerWeek;

  // horas trabalhadas no mês
  const monthlyTotalHours = weekTotalHours * weeksPerMonth;

  // qual será o valor da minha hora?
  const valueHour = Math.round(monthlyBudget / monthlyTotalHours);

  return { ...response.data, valueHour };
}

async function createProfileData(profile: IProfile): Promise<IProfile> {
  const { daysPerWeek, vacationsPerYear, hoursPerDay, monthlyBudget } = profile;

  const weeksPerMonth = (weeksPerYear - vacationsPerYear) / 12;
  const weekTotalHours = hoursPerDay * daysPerWeek;
  const monthlyTotalHours = weekTotalHours * weeksPerMonth;
  const valueHour = Math.round(monthlyBudget / monthlyTotalHours);

  const updatedProfileData = {
    ...profile,
    monthlyBudget: Number(profile.monthlyBudget),
    daysPerWeek: Number(profile.daysPerWeek),
    hoursPerDay: Number(profile.hoursPerDay),
    vacationsPerYear: Number(profile.vacationsPerYear),
    valueHour: Number(valueHour),
  };
  const response = api.post("/profile", { ...updatedProfileData });
  return (await response).data;
}
async function updateProfileData(profile: IProfile): Promise<IProfile> {
  const { daysPerWeek, vacationsPerYear, hoursPerDay, monthlyBudget } = profile;

  const weeksPerMonth = (weeksPerYear - vacationsPerYear) / 12;
  const weekTotalHours = hoursPerDay * daysPerWeek;
  const monthlyTotalHours = weekTotalHours * weeksPerMonth;
  const valueHour = Math.round(monthlyBudget / monthlyTotalHours);

  const updatedProfileData = {
    ...profile,
    monthlyBudget: Number(profile.monthlyBudget),
    daysPerWeek: Number(profile.daysPerWeek),
    hoursPerDay: Number(profile.hoursPerDay),
    vacationsPerYear: Number(profile.vacationsPerYear),
    valueHour: Number(valueHour),
  };
  const response = api.put("/profile", { ...updatedProfileData });
  return (await response).data;
}

export { loadProfileData, updateProfileData,createProfileData };
