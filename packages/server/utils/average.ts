import { RangeHistory } from "../models/DayHistory";

export const getIhValue = (ih: RangeHistory[], count: number, key: string) => {
  const prev = ih && ih[count] && ih[count][key];
  return prev ? prev : 0;
};

export const calcAverage = (ih: RangeHistory[], days: number, key: string) => {
  const limit = ih?.length > days ? days : ih?.length;
  let sum = 0;
  for (let count = 0; count < limit; count++) {
    sum += getIhValue(ih, count, key);
  }

  return sum / days;
};
// ih.reduce((sum, currentIh) => sum + currentIh.QTotTran5J, 0) / 30;
