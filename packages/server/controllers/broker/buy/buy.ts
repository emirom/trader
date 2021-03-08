import { Request, Response } from "express";
import {
  getClientTypesToday,
  IClientTypeVolCnt,
} from "../../../api/getClientTypesToday";
import { safJamShodan } from "../../../filters/safJamShodan";
import Symbol, { ISymbol } from "../../../models/Symbol";
import { TradeSymbol } from "../../../models/Trade";
import { buySymbol, filterSymbols, hasMinimalProfit } from "./buyUtils";
import { calcIndicators } from "./calcIndicators";
import { getPivots } from "./getPivots";

/**
 *
 */
export const makeBuyList = async (req: Request, res: Response) => {
  try {
    const isBuying: boolean = !!req.query.isBuying;

    const symbols: ISymbol[] = await Symbol.find({}).lean();
    const clientTypes: IClientTypeVolCnt[] = await getClientTypesToday();
    console.log(symbols.length);

    const filteredSymbols = filterSymbols(symbols, clientTypes);
    // const filteredSymbols = symbols;
    console.log("filtered symbols: ", filteredSymbols.length);

    const buyList = await calcIndicators(
      filteredSymbols,
      clientTypes,
      isBuying
    );
    buyList.sort((a, b) => b.score - a.score);

    const forLog = buyList.map((item) => {
      return {
        inscode: item.symbol.inscode,
        l18: item.symbol.l18,
        buySellRate: item.buySellRate,
        buySellW: item.buySellW,
        macd: item.macd,
        macdW: item.macdW,
        cci: item.cci,
        cciW: item.cciW,
        stoc: item.stoc,
        stocW: item.stocW,
        score: item.score,
      };
    });
    console.table(forLog);

    const bestToBuy = chooseBest(buyList, clientTypes);
    if (
      hasMinimalProfit(bestToBuy[0].symbol, 1.5) &&
      hasMinimalScore(bestToBuy[0], 70)
    ) {
      await buySymbol(buyList[0], 10000000);
    } else {
      console.log("find better to buy ...");
      // checkNext();
    }
    // withStoc
    res.status(200).send("bought");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const hasMinimalScore = (item: TradeSymbol, minScore: number) =>
  item.score > minScore;

const chooseBest = (
  tSymbols: TradeSymbol[],
  clientTypes: IClientTypeVolCnt[]
) => {
  tSymbols.filter((tSymbol) => {
    const ct = clientTypes.find((ct) => ct.inscode === tSymbol.symbol.inscode);
    return safJamShodan(tSymbol.symbol, ct) || hasMinRange(tSymbol.symbol, 1.5);
  });
};

const hasMinRange = async (symbol: ISymbol, range: number) => {
  const pivots = await getPivots(symbol.inscode);
  return pivots.maxRes - pivots.minSupp > range;
};
