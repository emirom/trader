import { Request, Response } from "express";
import { getDailyHistory } from "../../api/getInstHistory";
import DailyHistory, { DayHistory } from "../../models/DayHistory";
import Symbol, { ISymbol } from "../../models/Symbol";
import { calcAverage, getIhValue } from "../../utils/average";
export const initializeDayHistory = async (_req: Request, res: Response) => {
  try {
    console.log("\nStarted initializing day histories ... ");

    const symbols = await Symbol.find({});

    await DailyHistory.deleteMany();

    await Promise.all(
      symbols.map(async (symbol) => {
        const dayHistory: DayHistory = await getDailyHistory(symbol.inscode);

        completeHistory(dayHistory, 30);
        await updateSymbol(symbol, dayHistory);

        await DailyHistory.create({ ...dayHistory });
      })
    );

    console.log("Initialized History successfully ...");
    res.status(200).send("\nInitialized dayHistory successfully ...");
  } catch (error) {
    res.status(500).send("\nInitialized dayHistory error:" + error);
  }
};

const completeHistory = (dayHistory: DayHistory, days: number) => {
  const limit = dayHistory.ih?.length > days ? days : dayHistory.ih?.length;
  for (let count = 1; count <= limit; count++) {
    // go n days before today and get the value
    dayHistory.ih[count].PriceYesterday = getIhValue(
      dayHistory.ih,
      count,
      "PClosing"
    );
  }
};

const updateSymbol: (
  symbol: ISymbol,
  history: DayHistory
) => Promise<ISymbol> = async (symbol, history) => {
  symbol.avg30_QTotTran5J = calcAverage(history.ih, 30, "QTotTran5J");
  symbol.avg6_QTotTran5J = calcAverage(history.ih, 6, "QTotTran5J");
  symbol.is5 = calcAverage(history.ih, 80, "tvol");
  symbol.is6 = calcAverage(history.ih, 300, "tvol");
  const sym = await symbol.save();
  return sym;
};
