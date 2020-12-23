import { Schema, model } from "mongoose";

const CtSchema = new Schema({
  iid: String,
  data: [
    {
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

export interface Ct {
  inscode: String;
  data: [
    {
      Buy_CountI: number; // تعداد خریدار حقیقی
      Buy_CountN: number; // تعداد خریدار حقوقی
      Sell_CountI: number; // تعداد فروشنده حقیقی
      Sell_CountN: number; // تعداد فروشنده حقوقی
      Buy_I_Volume: number; // حجم خرید حقیقی
      Buy_N_Volume: number; // حجم خرید حقوقی
      Sell_I_Volume: number; // حجم فروش حقیقی
      Sell_N_Volume: number; //	حجم فروش حقوقی
      Buy_I_Value: number; // ارزش خرید حقیقی
      Buy_N_Value: number; // ارزش خرید حقوقی
      Sell_I_Value: number; // ارزش فروش حقیقی
      Sell_N_Value: number; //	ارزش فروش حقوقی
    }
  ];
}

export default model("Ct", CtSchema);
