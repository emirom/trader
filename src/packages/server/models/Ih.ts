import { Document, Schema } from "mongoose";

const IhSchema = new Schema({
  inscode: Number,
  history: [{ QTotTran5J: Number, PClosing: Number, PriceMin: Number }],
  /*
   * QTotTran5J : حجم معاملات در n روز قبل
   * PClosing :قیمت پایانی در n روز قبل
   * PriceMin قیمت پایانی در n روز قبل
   */
  daily: [
    {
      tarikh: String,
      date: String,
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
    this.history[days].QTotTran5J = average(days, "tvol");

    // go n days before last day and get the value
    this.history[days].PClosing = this.daily[this.daily.length - days]["pc"];
    this.history[days].PriceMin = this.daily[this.daily.length - days]["pmin"];
  }
};

export interface Ih extends Document {
  inscode: number;
  // QTotTran5J : حجم معاملات در n روز قبل
  // PClosing :قیمت پایانی در n روز قبل
  history: [{ QTotTran5J: number; PClosing: number; PriceMin: number }];
  daily: [
    {
      tarikh: string;
      date: string;
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

const AverageFunction = function (this: Ih, days: number, dataKey: string) {
  const daily = this.daily;
  let sum;
  for (let day = 0; day <= days; day++) {
    sum += daily[daily.length - day][dataKey];
  }

  return sum / days + 1;
};

const average = AverageFunction.bind(IhSchema); // bind this

/**
 *******ih and data interfaces of Ih schema:
 */
export interface instHistory {
  QTotTran5J: number;
  PClosing: number;
  PriceMin: Number;
}

export interface dataHistory {
  date: Number;
  pmax: Number;
  pmin: Number;
  pl: Number;
  pc: Number;
  pf: Number;
  tval: Number;
  tvol: Number;
  tno: Number;
}
