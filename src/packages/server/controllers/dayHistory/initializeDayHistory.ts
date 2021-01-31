import { Request, Response } from "express";
import { getDailyHistory } from "../../api/getInstHistory";
import DailyHistory, {
  DayHistory,
  IDay,
  RangeHistory,
} from "../../models/DayHistory";
import Symbol, { ISymbol } from "../../models/Symbol";
import { averageLast, calcAverage } from "../../utils/average";
export const initializeDayHistory = async (_req: Request, res: Response) => {
  try {
    console.log("\nStarted initializing day histories ... ");

    const symbols = await Symbol.find({});

    await DailyHistory.deleteMany();

    await Promise.all(
      symbols.map(async (symbol) => {
        const symbolHistory: DayHistory = await getDailyHistory(symbol.inscode);

        const range: Range = calcRange(symbolHistory);
        await updateSymbol(symbol, range, symbolHistory);

        await DailyHistory.create({ ...symbolHistory, ih: range.ih });
      })
    );

    console.log("Initialized History successfully ...");
    res.status(200).send("\nInitialized dayHistory successfully ...");
  } catch (error) {
    res.status(500).send("\nInitialized dayHistory error:" + error);
  }
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

  return range;
};

const makeEmptyRange = () => {
  const ih: RangeHistory[] = new Array(30).fill(null).map(() => ({
    QTotTran5J: 0, // در روز قبل n حجم معاملات;
    PClosing: 0, // : در روز قبل n قیمت پایانی در
    PriceYesterday: 0, //در روز قبل n قیمت پایانی در
    PriceMin: 0, // در روز قبل n  کمترین قیمت
    PriceMax: 0, // در روز قبل n  بیشترین قیمت
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

    // go n days before today and get the value
    ih[count].PClosing = prev(history.daily, count, "pc");
    ih[count].PriceMin = prev(history.daily, count, "pmin");
    ih[count].PriceMax = prev(history.daily, count, "pmax");
    ih[count].PriceYesterday = prev(history.daily, count, "py");
  }
};

const prev = (daily: IDay[], counter: number, field: string) => {
  const prev =
    daily &&
    daily[daily.length - 1 - counter] &&
    daily[daily.length - 1 - counter][field];
  return prev ? prev : 0;
};

const updateSymbol: (
  symbol: ISymbol,
  range: Range,
  history: DayHistory
) => Promise<ISymbol> = async (symbol, range, history) => {
  symbol.avg30_QTotTran5J = range.avg30_QTotTran5J;
  symbol.avg6_QTotTran5J = range.avg6_QTotTran5J;
  symbol.is5 = averageLast(history, 80, "tvol");
  symbol.is6 = averageLast(history, 300, "tvol");
  const sym = await symbol.save();
  return sym;
};
