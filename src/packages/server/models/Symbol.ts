import { Document, model, Schema } from "mongoose";

const ISymbolSchema = new Schema(
  // today symbol
  {
    inscode: { type: String, unique: true, required: true },

    iid: String, // code
    l18: String, // نماد symbol
    l30: String, // نام name
    heven: Number, // ?
    pf: Number, //اولین قیمت price first
    pc: String, //قیمت پایانی price closing
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
    zo1: String,
    zd1: String,
    pd1: String,
    po1: String,
    qd1: String,
    qo1: String,
    zo2: String,
    zd2: String,
    pd2: String,
    po2: String,
    qd2: String,
    qo2: String,
    zo3: String,
    zd3: String,
    pd3: String,
    po3: String,
    qd3: String,
    qo3: String,

    //  computed history:
    avg30_QTotTran5J: Number,
    avg6_QTotTran5J: Number,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
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

export default model<ISymbol>("Symbol", ISymbolSchema);

export interface FetchedSymbolProps {
  inscode: number;
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
}

export interface BestLimits {
  zo1: string;
  zd1: string;
  pd1: string;
  po1: string;
  qd1: string;
  qo1: string;

  zo2: string;
  zd2: string;
  pd2: string;
  po2: string;
  qd2: string;
  qo2: string;

  zo3: string;
  zd3: string;
  pd3: string;
  po3: string;
  qd3: string;
  qo3: string;
}
