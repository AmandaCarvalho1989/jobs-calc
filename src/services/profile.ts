import { IProfile } from "@/models/profile";
import api from "./api";

async function loadProfileData(): Promise<IProfile> {
  const response = await api.get("/profile");
  // api.get("/profile").then((response) => {
  console.log(response);
  const { daysPerWeek, vacationsPerYear, hoursPerDay, monthlyBudget } =
    response.data;

  const weeksPerYear = 52;

  // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
  const weeksPerMonth = (weeksPerYear - vacationsPerYear) / 12;

  // total de horas trabalhadas na semana
  const weekTotalHours = hoursPerDay * daysPerWeek;

  // horas trabalhadas no mês
  const monthlyTotalHours = weekTotalHours * weeksPerMonth;

  // qual será o valor da minha hora?
  const valueHour = Math.round(monthlyBudget / monthlyTotalHours);
  const formattedProfile = { ...response.data, valueHour };
  console.log({ formattedProfile });

  return { ...response.data, valueHour };
  // });
}

async function updateProfileData(profile: IProfile): Promise<IProfile> {
  const updatedProfileData = {
    ...profile,
    monthlyBudget: Number(profile.monthlyBudget),
    daysPerWeek: Number(profile.daysPerWeek),
    hoursPerDay: Number(profile.hoursPerDay),
    vacationsPerYear: Number(profile.vacationsPerYear),
    valueHour: Number(profile.valueHour),
  };
  return api.put("/profile", { ...updatedProfileData });
}

export { loadProfileData, updateProfileData };
