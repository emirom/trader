import { ISymbol } from "../../models/Symbol";
import { hajmMashkukFilter } from "../hajmMashkuk";
import { hajmMashkukFilter2 } from "../hajmMashkuk2";
import { kharidGoruhi } from "../kharidGoruhi";
import { tenPercent } from "../tenPercent";

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

export const buySymbol = (symbol: ISymbol) => {
    
};
