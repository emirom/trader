import { DayHistory, RangeHistory } from "../models/DayHistory";

export const calcAverage = (ih: RangeHistory[], days: number, key: string) => {
  let sum = 0;

  for (let day = 0; day < days; day++) {
    const data = ih[day];
    sum += data ? data[key] : 0;
  }

  return sum / days;
};
// ih.reduce((sum, currentIh) => sum + currentIh.QTotTran5J, 0) / 30;

export const averageLast = function (
  history: DayHistory,
  days: number,
  dataKey: string
) {
  const daily = history.daily;
  let sum = 0;

  for (let counter = 0; counter <= days; counter++) {
    const day = daily && daily[daily.length - counter - 1];
    sum += day ? day[dataKey] : 0;
  }

  return sum / (days === 0 ? 1 : days);
};
