import { model, Schema } from "mongoose";
import { roundTo2 } from "../utils/roundTo";

const ISymbolSchema = new Schema(
  // today symbol

  {
    inscode: { type: String, unique: true, required: true },
    ih: [{ QTotTran5J: Number, PClosing: Number, PriceMin: Number }],
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

    /**
     *  computed history:
     */
    avg30QTotTran5J: Number,
    avg6QTotTran5J: Number,
    PClosing: Number,
    PriceMin: Number,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export interface ISymbol extends Document {
  inscode: number;
  ih: [{ QTotTran5J: number; PClosing: number; PriceMin: number }];
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
  pcc: number;
  pcp: number;
  plc: number;
  plp: number;
  pe: number;

  // last orders:
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

  /**
   *  computed history:
   */
  avg30_QTotTran5J: Number;
  avg6_QTotTran5J: Number;
  PClosing: Number;
  PriceMin: Number;
}

export default model("Symbol", ISymbolSchema);

ISymbolSchema.virtual("pcc").get(function (this: ISymbol) {
  // تغییر قیمت پایانی price change
  return this?.pc - this?.py;
});

ISymbolSchema.virtual("pcp").get(function (this: ISymbol) {
  // درصد تغییر قیمت پایانی price change percent
  return roundTo2((100 * this.pcc) / this.py);
});

ISymbolSchema.virtual("plc").get(function (this: ISymbol) {
  // تغییر آخرین قیمت price last change
  return this.tno === 0 ? 0 : this.pl - this.py;
});

ISymbolSchema.virtual("plp").get(function (this: ISymbol) {
  // درصد تغییر آخرین قیمت  price last percent
  return this.tno === 0 ? 0 : roundTo2((100 * this.plc) / this.py);
});

ISymbolSchema.virtual("pe").get(function (this: ISymbol) {
  // درصد تغییر آخرین قیمت  price last percent
  return this.eps ? roundTo2((100 * this.pc) / this.eps) : 0;
});
