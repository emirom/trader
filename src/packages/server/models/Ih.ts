import { Schema } from "mongoose";

const IhSchema = new Schema({
  inscode: Number,
  ih: [{ QTotTran5J: Number, PClosing: Number, PriceMin: Number }],
  /*
   * QTotTran5J : حجم معاملات در n روز قبل
   * PClosing :قیمت پایانی در n روز قبل
   * PriceMin قیمت پایانی در n روز قبل
   */
  data: [
    {
      date: Number,
      pmax: Number,
      pmin: Number,
      pl: Number,
      pc: Number,
      pf: Number,
      tval: Number,
      tvol: Number,
      tno: Number,
    },
  ],
});

IhSchema.methods.calcIh = function (this: Ih) {
  for (let days = 0; days < 30; days++) {
    // calc previous n days ago average of tvol
    this.ih[days].QTotTran5J = average(days, "tvol");

    // go n days before last day and get the value
    this.ih[days].PClosing = this.data[this.data.length - days]["pc"];
    this.ih[days].PriceMin = this.data[this.data.length - days]["pmin"];
  }
};

export interface Ih {
  inscode: number;
  // QTotTran5J : حجم معاملات در n روز قبل
  // PClosing :قیمت پایانی در n روز قبل
  ih: [{ QTotTran5J: number; PClosing: number; PriceMin: number }];
  data: [
    {
      date: number;
      pmax: number;
      pmin: number;
      pl: number;
      pc: number;
      pf: number;
      value: number;
      volume: number;
      count: number;
    }
  ];
}

const AverageBeforeBind = function (this: Ih, days: number, dataKey: string) {
  const data = this.data;
  let sum;
  for (let day = 0; day <= days; day++) {
    sum += data[data.length - day][dataKey];
  }

  return sum / days + 1;
};

const average = AverageBeforeBind.bind(IhSchema); // bind this
