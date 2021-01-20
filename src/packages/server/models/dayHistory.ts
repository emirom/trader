import { Document, model, Schema } from "mongoose";

const dailyHistorySchema = new Schema({
  inscode: Number,

  ih: [
    {
      QTotTran5J: Number, // در روز قبل n حجم معاملات
      PClosing: Number, // : در روز قبل n قیمت پایانی در
      PriceYesterday: Number, //در روز قبل n قیمت پایانی در
      PriceMin: Number, // در روز قبل n  کمترین قیمت
      gain: Number, // TODO: find and calc
      loss: Number, // TODO: find and calc
    },
  ],
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
export default model<IHistory>("DailyHistory", dailyHistorySchema);

export interface IDay {
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
export interface IHistory extends DayHistory, Document {}

export interface RangeHistory {
  QTotTran5J: number; // در روز قبل n حجم معاملات;
  PClosing: number; // : در روز قبل n قیمت پایانی در
  PriceYesterday: number; //در روز قبل n قیمت پایانی در
  PriceMin: Number; // در روز قبل n  کمترین قیمت
  gain: Number; // TODO: find and calc
  loss: Number; // TODO: find and calc
}
export interface DayHistory {
  inscode: number;
  ih: RangeHistory[];
  daily: IDay[];
}
