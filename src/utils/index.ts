export const calculateBudget = (job: any, valueHour: number) => {
  return  Math.round(valueHour * job.totalHours)
}

export const remainingDays = (job: any)  => {
  // cálculo de tempo restante
  const remainingDays = (job.totalHours / job.dailyHours).toFixed()

  const createdDate = new Date(job.createdAt)
  const dueDay = createdDate.getDate() + Number(remainingDays)
  const dueDateInMs = createdDate.setDate(dueDay)

  const timeDiffInMs = dueDateInMs - Date.now()
  // transformar milli em dias
  const dayInMs = 1000 * 60 * 60 * 24
  const dayDiff = Math.floor(timeDiffInMs / dayInMs)

  // restam x dias
  return dayDiff
}
