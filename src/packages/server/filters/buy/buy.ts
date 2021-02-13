import { Request, Response } from "express";
import {
  getClientTypesToday,
  IClientType,
} from "../../api/getClientTypesToday";
import {
  cciFormula,
  getBuyWeightCci,
  getSellWeightCci,
} from "../../controllers/indicator/cci";
import {
  getBuyWeightMacd,
  getSellWeightMacd,
  macdFormula,
} from "../../controllers/indicator/macd/macdFormula";
import {
  getBuyWeightStoc,
  getSellWeightStoc,
  stocFormula,
} from "../../controllers/indicator/stoc";
import DayHistory, { RangeHistory } from "../../models/DayHistory";
// import { stocIndicator } from "../controllers/indicator/stoc";
import Symbol, { ISymbol } from "../../models/Symbol";
import {
  buyRateFormula,
  getBuyWeightBuySell,
  getSellWeightBuySell,
} from "../buySellRate";
import { buySymbol, filterSymbols, hasMinimalProfit } from "./buyUtils";

/**
 *
 */
export const makeBuyList = async (req: Request, res: Response) => {
  try {
    const isBuying: boolean = !!req.query.isBuying;

    const symbols: ISymbol[] = await Symbol.find({}).lean();
    const clientTypes: IClientType[] = await getClientTypesToday();

    const filteredSymbols = filterSymbols(symbols);

    const getWeightBuySell = isBuying
      ? getBuyWeightBuySell
      : getSellWeightBuySell;
    const getWeightMacd = isBuying ? getBuyWeightMacd : getSellWeightMacd;
    const getWeightCci = isBuying ? getBuyWeightCci : getSellWeightCci;
    const getWeightStoc = isBuying ? getBuyWeightStoc : getSellWeightStoc;

    const List1 = await Promise.all(
      filteredSymbols.map(async (symbol) => {
        const ih: RangeHistory[] | undefined = (
          await DayHistory.findOne({ inscode: symbol.inscode }).lean()
        )?.ih;
        const ct = clientTypes.find((ct) => ct.inscode === symbol.inscode);
        const buySell = buyRateFormula(ct);
        const buySellW = getWeightBuySell(buySell);
        const macd = macdFormula(ih);
        const macdW = getWeightMacd(macd);
        const cci = cciFormula(ih);
        const cciW = getWeightCci(cci);
        const stoc = stocFormula(symbol, ih);
        const stocW = getWeightStoc(stoc);
        return {
          symbol,
          // name: symbol.l18,
          خریدبفروش: buySell,
          وزنخریدبهفروش: buySellW,
          macd,
          macdW,
          cci,
          cciW,
          stoc,
          stocW,
          sum: buySellW + macdW + cciW + stocW,
        };
      })
    );

    List1.sort((a, b) => b.sum - a.sum);
    // console.table(List1);

    if (hasMinimalProfit(List1[0].symbol, 1.5)) {
      buySymbol(List1[0].symbol);
    }
    res
      .status(200)
      .send
      // withStoc
      ();
  } catch (error) {
    res.status(500).send(error);
  }
};

// const putFilters(symbols:ISymbol,filters:)
