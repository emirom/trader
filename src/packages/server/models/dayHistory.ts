import { Document, model, Schema } from "mongoose";

const IhSchema = new Schema({
  inscode: Number,
  history: {
    type: [{ QTotTran5J: Number, PClosing: Number, PriceMin: Number }],
    default: undefined,
  },
  /*
   * QTotTran5J : حجم معاملات در n روز قبل
   * PClosing :قیمت پایانی در n روز قبل
   * PriceMin قیمت پایانی در n روز قبل
   */
  daily: [
    {
      tarikh: String,
      date: String,
      tno: Number,
      tvol: Number,
      tval: Number,
      pf: Number,
      pmax: Number,
      pmin: Number,
      pc: Number,
      pl: Number,
    },
  ],
});
export default model<Ih>("Ih", IhSchema);

// IhSchema.methods.calcIh = function (this: Ih) {
//   for (let days = 0; days < 30; days++) {
//     // calc previous n days ago average of tvol
//     this.history[days].QTotTran5J = average(days, "tvol");

//     // go n days before last day and get the value
//     this.history[days].PClosing = this.daily[this.daily.length - days]["pc"];
//     this.history[days].PriceMin = this.daily[this.daily.length - days]["pmin"];
//   }
// };

export interface Ih extends Document {
  inscode: number;
  // history: RangeHistory[];
  daily: dayHistory[];
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
export interface RangeHistory {
  QTotTran5J: number; // روز قبل n حجم معاملات
  PClosing: number; //  روز قبل n قیمت پایانی
  PriceMin: number; // روز قبل n حداقل قیمت
}

export interface dayHistory {
  tarikh: string;
  date: string;
  tno: number;
  tvol: number;
  tval: number;
  pf: number;
  pmax: number;
  pmin: number;
  pc: number;
  pl: number;
}
