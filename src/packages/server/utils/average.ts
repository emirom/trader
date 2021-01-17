import { DayHistory } from "../models/dayHistory";
import { RangeHistory } from "../models/Symbol";

export const calcAverage = (ih: RangeHistory[], days: number, key: string) => {
  let sum = 0;

  for (let day = 0; day < days; day++) {
    sum += ih[day][key];
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

  for (let counter = 1; counter <= days; counter++)
    sum += daily[daily.length - counter][dataKey];

  return sum / days;
};
