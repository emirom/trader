import { ISymbol } from "../models/Symbol";

/**
 * filter carrier functions are in sync and async form,
 * use as needed
 */

type AsyncBaseFilter = (
  symbols: ISymbol[],
  symbolFilter: (symbol: ISymbol) => Promise<boolean>
) => Promise<ISymbol[]>;

export const asyncBaseFilter: AsyncBaseFilter = async (
  symbols,
  symbolFilter
) => {
  return await Promise.all(
    symbols.filter(async (symbol) => await symbolFilter(symbol))
  );
};

type BaseFilter = (
  symbols: ISymbol[],
  symbolFilter: (symbol: ISymbol) => boolean
) => ISymbol[];

export const baseFilter: BaseFilter = (symbols, filterSymbol) => {
  return symbols.filter(async (symbol) => filterSymbol(symbol));
};
