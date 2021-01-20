import { getDailyHistory } from "../../api/getInstHistory";
import DailyHistory, {
  DayHistory,
  RangeHistory,
} from "../../models/DayHistory";
import { ISymbol } from "../../models/Symbol";
import { averageLast, calcAverage } from "../../utils/average";

export const updateIntraHistory = async (symbols: ISymbol[]) => {
  await DailyHistory.deleteMany();
  await Promise.all(
    symbols.map(async (symbol) => {
      const symbolHistory: DayHistory = await getDailyHistory(symbol.inscode);

      const range: Range = calcRange(symbolHistory);
      const sym = await updateSymbol(symbol, range);
      console.log(sym);
      await DailyHistory.create({ ...symbolHistory, ih: range.ih });
    })
  );
  console.info("updated instHistory successfully ...");
};

type Range = {
  ih: RangeHistory[];
  avg30_QTotTran5J: number;
  avg6_QTotTran5J: number;
};

export const calcRange: (history: DayHistory) => Range = (history) => {
  const range = makeEmptyRange();

  calcAveragesFromHistory(history, range.ih, 30);

  range["avg30_QTotTran5J"] = calcAverage(range.ih, 30, "QTotTran5J");
  range["avg6_QTotTran5J"] = calcAverage(range.ih, 6, "QTotTran5J");
  console.log(range);

  return range;
};

const makeEmptyRange = () => {
  const ih: RangeHistory[] = new Array(30).fill(null).map(() => ({
    QTotTran5J: 0, // در روز قبل n حجم معاملات;
    PClosing: 0, // : در روز قبل n قیمت پایانی در
    PriceYesterday: 0, //در روز قبل n قیمت پایانی در
    PriceMin: 0, // در روز قبل n  کمترین قیمت
    gain: 0, // TODO: find and calc
    loss: 0, // TODO: find and calc
  }));
  const range = { ih, avg30_QTotTran5J: 0, avg6_QTotTran5J: 0 };
  return range;
};

const calcAveragesFromHistory = (
  history: DayHistory,
  ih: RangeHistory[],
  days: number
) => {
  for (let count = 0; count < days; count++) {
    // calc previous n days ago average of tvol

    ih[count].QTotTran5J = averageLast(history, count, "tvol");

    // go n days before last day and get the value
    ih[count].PClosing = history.daily[history.daily.length - count - 1]["pc"];
    ih[count].PriceMin =
      history.daily[history.daily.length - count - 1]["pmin"];
    ih[count].PriceYesterday =
      history.daily[history.daily.length - count - 1]["py"];
  }
};

const updateSymbol: (
  symbol: ISymbol,
  range: Range
) => Promise<ISymbol> = async (symbol, range) => {
  symbol.avg30_QTotTran5J = range.avg30_QTotTran5J;
  symbol.avg6_QTotTran5J = range.avg6_QTotTran5J;
  const sym = await symbol.save();
  return sym;
};
