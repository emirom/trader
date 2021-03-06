import got from "got/dist/source";
import { DayHistory, RangeHistory } from "../models/DayHistory";
import { newAliveAgent } from "../utils/got";

type GetDailyHistory = (inscode: string) => Promise<DayHistory>;

export const getDailyHistory: GetDailyHistory = async (inscode) => {
  try {
    const response = await got.get(
      `http://tsetmc.com/tsev2/data/InstTradeHistory.aspx?i=${inscode}&Top=999999&A=0`,
      newAliveAgent()
    );
    const result = extract(response.body);

    return {
      inscode,
      ih: [...result],
    };
  } catch (err) {
    throw new Error(err);
  }
};

const extract: (raw: string) => RangeHistory[] = (raw) => {
  const rows = raw.split(";");
  rows.pop(); // remove last undefined
  return rows.map((row) => checkColumns(row) as RangeHistory);
};

export const checkColumns = (row) => {
  const column = row.split("@");
  const data = column instanceof Error ? null : column;
  const [date, high, low, final, close, open, , value, volume, count] = data;
  const year = date.substr(0, 4),
    month = date.substr(4, 2),
    day = date.substr(6, 2);
  const tarikh = new Date(+year, +month - 1, +day).toLocaleDateString("fa-IR");

  return {
    tarikh,
    date: `${year}-${month}-${day}`,
    ZTotTran: +count, // tno : تعداد معاملات
    QTotTran5J: +volume, // tvol : حجم معاملات
    QTotCap: +value, // tval : ارزش معاملات
    PriceFirst: +open, // pf : اولین قیمت
    PriceMax: +high, // pmax : بیشترین قیمت
    PriceMin: +low, // pmin : کمترین قیمت
    PClosing: +close, // pc : قیمت پایانی
    PDrCotVal: +final, // pl : آخرین معامله
  };
};
