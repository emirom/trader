import { Document, model, Schema } from "mongoose";

const SymbolSchema = new Schema(
  // today symbol
  {
    inscode: { type: String, unique: true, required: true },

    iid: String, // code
    l18: String, // نماد symbol
    l30: String, // نام name
    heven: Number, // ?
    pf: Number, //اولین قیمت price first
    pc: Number, //قیمت پایانی price closing
    pl: Number, //آخرین قیمت price last
    tno: Number, //تعداد معاملات trade number
    tvol: Number, //حجم معاملات trade volume
    tval: Number, //ارزش معاملات trade value
    pmin: Number, //کمترین قیمت price min
    pmax: Number, // بیشترین قیمت price max
    py: Number, //قیمت دیروز price yesterday
    eps: Number,
    bvol: Number, //حجم مبنا base volume
    visitcount: Number, // c2
    flow: Number, // table_id
    cs: Number, // گروه صنعت company sort
    tmax: Number, //آستانه مجاز بالا threshold max
    tmin: Number, //آستانه مجاز پایین threshold min
    z: Number, // تعداد سهام
    yval: Number, // ارزش دیروز ؟

    // computed properties:
    pcc: Number, // تغییر قیمت پایانی price closing change
    pcp: Number, // درصد تغییر قیمت پایانی price change percent
    plc: Number, // تغییر آخرین قیمت price last change
    plp: Number, //درصد تغییر آخرین قیمت  price last percent
    pe: Number, // انتظارات سرمایه گذاران از بازدهی آینده p/e ,

    // last orders:
    zo1: Number,
    zd1: Number,
    pd1: Number,
    po1: Number,
    qd1: Number,
    qo1: Number,

    zo2: Number,
    zd2: Number,
    pd2: Number,
    po2: Number,
    qd2: Number,
    qo2: Number,

    zo3: Number,
    zd3: Number,
    pd3: Number,
    po3: Number,
    qd3: Number,
    qo3: Number,

    is5: Number, // میانگین حجم معاملات در 3 ماه گذشته
    is6: Number, // میانگین حجم معاملات در 3 ماه گذشته
    //  computed history:
    avg30_QTotTran5J: Number,
    avg6_QTotTran5J: Number,
  }
);
export interface ISymbol
  extends CalculatedSymbolProps,
    FetchedSymbolProps,
    BestLimits,
    Document {
  // computed history:
  avg30_QTotTran5J: number;
  avg6_QTotTran5J: number;
}

export default model<ISymbol>("Symbol", SymbolSchema);

export interface FetchedSymbolProps {
  inscode: string;
  iid: string;
  l18: string;
  l30: string;
  heven: number;
  pf: number;
  pc: number;
  pl: number;
  tno: number;
  tvol: number;
  tval: number;
  pmin: number;
  pmax: number;
  py: number;
  eps: number;
  bvol: number;
  visitcount: number;
  flow: number;
  cs: number;
  tmax: number;
  tmin: number;
  z: number;
  yval: number;
}
export interface CalculatedSymbolProps {
  pcc: number;
  pcp: number;
  plc: number;
  plp: number;
  pe: number;

  is5: number; // میانگین حجم معاملات در 3 ماه گذشته
  is6: number; // میانگین حجم معاملات در 12 ماه گذشته
}

export interface BestLimits {
  zo1: number;
  zd1: number;
  pd1: number;
  po1: number;
  qd1: number;
  qo1: number;

  zo2: number;
  zd2: number;
  pd2: number;
  po2: number;
  qd2: number;
  qo2: number;

  zo3: number;
  zd3: number;
  pd3: number;
  po3: number;
  qd3: number;
  qo3: number;
}
