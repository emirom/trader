import { IClientTypeVolCnt } from "../../../api/getClientTypesToday";
import { watchSymbol } from "../../../api/watchSymbol";
import { hajmMashkukFilter } from "../../../filters/hajmMashkuk";
import { hajmMashkukFilter2 } from "../../../filters/hajmMashkuk2";
import { kharidGoruhi } from "../../../filters/kharidGoruhi";
import { tenPercent } from "../../../filters/tenPercent";
import { voroudPul1 } from "../../../filters/voroudPul1";
import { ISymbol } from "../../../models/Symbol";
import Trade, { ITrade, TradeSymbol } from "../../../models/Trade";

export const filterSymbols = (
  symbols: ISymbol[],
  clientTypes: IClientTypeVolCnt[]
) => {
  const potentialSymbols = symbols.filter((symbol) => {
    const ct = clientTypes.find((ct) => ct.inscode === symbol.inscode);
    hajmMashkukFilter(symbol) ||
      hajmMashkukFilter2(symbol) ||
      kharidGoruhi(symbol);

    voroudPul1(symbol, ct);
    return symbol;
  });

  const tenPercentSymbols = potentialSymbols.filter((symbol) =>
    tenPercent(symbol)
  );

  const filteredSymbols =
    tenPercentSymbols.length > 0 ? tenPercentSymbols : potentialSymbols;
  return filteredSymbols;
};

export const hasMinimalProfit = (symbol: ISymbol, profit: number) =>
  symbol.pl * (100 + profit / 100) < symbol.tmax;

// const maxPossiblePrice = (symbol: ISymbol) => {
//   const range = (symbol.tmax - symbol.tmin) / 2 / 100/100;
//   return range * symbol.pf;
// };

export const buySymbol = async (tradeItem: TradeSymbol, money: number) => {
  const date = new Date();

  const symbol = await watchSymbol(tradeItem.symbol.inscode);
  const trade: ITrade = await Trade.create({
    date,
    inscode: symbol.inscode,
    isBuy: true,
    price: symbol.pl,
    amount: money / symbol.pl,
    ...tradeItem,
  });
  console.log("bought : " + trade);
};
