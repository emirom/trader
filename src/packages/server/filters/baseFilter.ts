import { ISymbol } from "../models/Symbol";

type AsyncBaseFilter = (
  symbols: ISymbol[],
  symbolFilter: (symbol: ISymbol) => Promise<boolean>
) => Promise<ISymbol[]>;

export const asyncBaseFilter: AsyncBaseFilter = async (
  symbols,
  filterSymbol
) => {
  return await Promise.all(
    symbols.filter(async (symbol) => await filterSymbol(symbol))
  );
};

type BaseFilter = (
  symbols: ISymbol[],
  symbolFilter: (symbol: ISymbol) => boolean
) => ISymbol[];

export const baseFilter: BaseFilter = (symbols, filterSymbol) => {
  return symbols.filter(async (symbol) => filterSymbol(symbol));
};
