import { Document, model, Schema } from "mongoose";

const symbolMomentHistorySchema = new Schema({
  inscode: String,
  tarikh: String,

  PriceFirst: Number, // pf : اولین قیمت
  PClosing: Number, // pc : قیمت پایانی

  //  computed history:
  avg6_QTotTran5J: Number,
  avg30_QTotTran5J: Number,
  is5: Number, // میانگین حجم معاملات در 3 ماه گذشته
  is6: Number, // میانگین حجم معاملات در 3 ماه گذشته

  ih: [
    {
      date: Date, // Date.now()
      ZTotTran: Number, // tno : تعداد معاملات
      QTotTran5J: Number, // tvol : حجم معاملات
      QTotCap: Number, // tval : ارزش معاملات
      PriceMax: Number, // pmax : بیشترین قیمت
      PriceMin: Number, // pmin : کمترین قیمت
      PDrCotVal: Number, // pl : آخرین معامله

      Buy_CountI: Number, // تعداد خریدار حقیقی
      Buy_CountN: Number, // تعداد خریدار حقوقی
      Sell_CountI: Number, // تعداد فروشنده حقیقی
      Sell_CountN: Number, // تعداد فروشنده حقوقی
      Buy_I_Volume: Number, // حجم خرید حقیقی
      Buy_N_Volume: Number, // حجم خرید حقوقی
      Sell_I_Volume: Number, // حجم فروش حقیقی
      Sell_N_Volume: Number, //	حجم فروش حقوقی
      Buy_I_Value: Number, // ارزش خرید حقیقی
      Buy_N_Value: Number, // ارزش خرید حقوقی
      Sell_I_Value: Number, // ارزش فروش حقیقی
      Sell_N_Value: Number, //	ارزش فروش حقوقی
    },
  ],
});

export default model<ISymbolMomentHistory>(
  "SymbolMomentHistory",
  symbolMomentHistorySchema
);

interface MomentHistory {
  date: Date; // Date.now()
  ZTotTran: number; // tno : تعداد معاملات
  QTotTran5J: number; // tvol : حجم معاملات
  QTotCap: number; // tval : ارزش معاملات
  PriceMax: number; // pmax : بیشترین قیمت
  PriceMin: number; // pmin : کمترین قیمت
  PDrCotVal: number; // pl : آخرین معامله
}

interface StableHistory {
  inscode: string;
  tarikh: string;

  PriceFirst: number; // pf : اولین قیمت
  PClosing: number; // pc : قیمت پایانی

  avg6_QTotTran5J: number;
  avg30_QTotTran5J: number;
  is5: number; // میانگین حجم معاملات در 3 ماه گذشته
  is6: number; // میانگین حجم معاملات در 3 ماه گذشته
}

export interface ISymbolMomentHistory extends Document, StableHistory {
  ih: MomentHistory[];
}
