import { Document, model, Schema } from "mongoose";

const dailyHistorySchema = new Schema({
  inscode: Number,
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

export interface DayHistory {
  inscode: number;
  daily: IDay[];
}
