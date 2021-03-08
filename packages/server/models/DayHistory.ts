import { Document, model, Schema } from "mongoose";

const dailyHistorySchema = new Schema({
  inscode: String,

  ih: [
    {
      tarikh: String,
      date: String,
      ZTotTran: Number, // tno : تعداد معاملات
      QTotTran5J: Number, // tvol : حجم معاملات
      QTotCap: Number, // tval : ارزش معاملات
      PriceFirst: Number, // pf : اولین قیمت
      PriceMax: Number, // pmax : بیشترین قیمت
      PriceMin: Number, // pmin : کمترین قیمت
      PClosing: Number, // pc : قیمت پایانی
      PDrCotVal: Number, // pl : آخرین معامله

      PriceYesterday: Number, // py : قیمت روز قبل

      gain: Number, // TODO: find and calc
      loss: Number, // TODO: find and calc
    },
  ],
});
export default model<IHistory>("DailyHistory", dailyHistorySchema);

/**
 * RangeHistory naming is based on tsetmc naming :
 * @link http://www.tsetmc.com/Site.aspx?ParTree=151715&LnkIdn=3197
 */
export interface RangeHistory {
  // روز قبل n اطلاعات
  tarikh: string;
  date: string;
  ZTotTran: number; // tno : تعداد معاملات
  QTotTran5J: number; // tvol : حجم معاملات
  QTotCap: number; // tval : ارزش معاملات
  PriceFirst: number; // pf : اولین قیمت
  PriceMax: number; // pmax : بیشترین قیمت
  PriceMin: number; // pmin : کمترین قیمت
  PClosing: number; // pc : قیمت پایانی
  PDrCotVal: number; // pl : آخرین معامله

  PriceYesterday: number; // py : قیمت روز قبل

  gain: number; // TODO: find and calc
  loss: number; // TODO: find and calc
}
export interface IHistory extends DayHistory, Document {}

/**
 *  we need the  DayHistory interface that has no Document props.
 */
export interface DayHistory {
  inscode: string;
  ih: RangeHistory[];
}
