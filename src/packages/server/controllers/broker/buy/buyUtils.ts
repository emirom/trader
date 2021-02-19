import { hajmMashkukFilter } from "../../../filters/hajmMashkuk";
import { hajmMashkukFilter2 } from "../../../filters/hajmMashkuk2";
import { kharidGoruhi } from "../../../filters/kharidGoruhi";
import { tenPercent } from "../../../filters/tenPercent";
import { ISymbol } from "../../../models/Symbol";
import ITrade, { TradeSymbol } from "../../../models/Trade";

export const filterSymbols = (symbols: ISymbol[]) => {
  const potentialSymbols = symbols.filter((symbol) => {
    hajmMashkukFilter(symbol) ||
      hajmMashkukFilter2(symbol) ||
      kharidGoruhi(symbol);
  });

  const tenPercentSymbols = potentialSymbols.filter((symbol) =>
    tenPercent(symbol)
  );

  const filteredSymbols =
    tenPercentSymbols.length > 0 ? tenPercentSymbols : potentialSymbols;
  return filteredSymbols;
};

export const hasMinimalProfit = (symbol: ISymbol, profit: number) =>
  symbol.pl < (profit / 100) * maxPossiblePrice(symbol);

const maxPossiblePrice = (symbol: ISymbol) => {
  const range = (symbol.tmax - symbol.tmin) / 2 / 100;
  return range * symbol.pf;
};

export const buySymbol = async (tradeItem: TradeSymbol, money: number) => {
  const date = new Date();
  const symbol = tradeItem.symbol;
  const trade = await ITrade.create({
    date,
    inscode: symbol.inscode,
    isBuy: true,
    price: symbol.pl,
    amount: money / symbol.pl,
    ...tradeItem,
  });
  console.log(trade);
};
