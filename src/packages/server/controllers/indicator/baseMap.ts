import { ISymbol } from "../../models/Symbol";

/**
 * map carrier functions are in sync and async form,
 * use as needed
 * in fact with these carriers, we defined a structure for all indicators
 */
type MapResponse = { symbol: ISymbol; value: number; weight: number };

// ====== async
export type AsyncIndicator = (
  symbol: ISymbol,
  isBuying: boolean
) => Promise<MapResponse>;

type AsyncBaseMap = (
  indicator: AsyncIndicator,
  symbols: ISymbol[],
  isBuying?: boolean
) => Promise<MapResponse[]>;

export const asyncBaseMap: AsyncBaseMap = async (
  indicator,
  symbols,
  isBuying = true
) => {
  try {
    return await Promise.all(
      symbols.map(async (symbol) => await indicator(symbol, isBuying))
    );
  } catch (error) {
    console.log(`Error on ${indicator.name} indicator`);
    return null;
  }
};

// ====== sync
type Indicator = (symbol: ISymbol, isBuying: boolean) => MapResponse;

export type BaseMap = (
  indicator: Indicator,
  symbols: ISymbol[],
  isBuying?: boolean
) => MapResponse[];

export const baseMap: BaseMap = (indicator, symbols, isBuying = true) => {
  try {
    return symbols.map((symbol) => indicator(symbol, isBuying));
  } catch (error) {
    console.log(`Error on ${indicator.name} indicator`);
    return null;
  }
};
