import { IClientTypeVolCnt } from "../../../api/getClientTypesToday";
import {
  buyRateFormula,
  getBuyWeightBuySell,
  getSellWeightBuySell,
} from "../../../filters/buySellRate";
import DayHistory, { RangeHistory } from "../../../models/DayHistory";
import { ISymbol } from "../../../models/Symbol";
import {
  cciFormula,
  getBuyWeightCci,
  getSellWeightCci,
} from "../../indicator/cci";
import {
  getBuyWeightMacd,
  getSellWeightMacd,
  macdFormula,
} from "../../indicator/macd/macdFormula";
import {
  getBuyWeightStoc,
  getSellWeightStoc,
  stocFormula,
} from "../../indicator/stoc";

export const calcIndicators = async (
  symbols: ISymbol[],
  clientTypes: IClientTypeVolCnt[],
  isBuying: boolean
) => {
  //set get weight funcs
  const getWeightBuySell = isBuying
    ? getBuyWeightBuySell
    : getSellWeightBuySell;
  const getWeightMacd = isBuying ? getBuyWeightMacd : getSellWeightMacd;
  const getWeightCci = isBuying ? getBuyWeightCci : getSellWeightCci;
  const getWeightStoc = isBuying ? getBuyWeightStoc : getSellWeightStoc;

  return await Promise.all(
    symbols.map(async (symbol) => {
      const ih: RangeHistory[] | undefined = (
        await DayHistory.findOne({ inscode: symbol.inscode }).lean()
      )?.ih;

      const ct = clientTypes.find((ct) => ct.inscode === symbol.inscode);
      const buySellRate = buyRateFormula(ct);
      const buySellW = getWeightBuySell(buySellRate);
      const macd = macdFormula(ih);
      const macdW = getWeightMacd(macd);
      const cci = cciFormula(ih);
      const cciW = getWeightCci(cci);
      const stoc = stocFormula(symbol, ih);
      const stocW = getWeightStoc(stoc);
      return {
        symbol,
        // name: symbol.l18,
        buySellRate,
        buySellW,
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
};
