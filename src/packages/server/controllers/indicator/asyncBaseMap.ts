import Symbol, { ISymbol } from "../../models/Symbol";
import { MappedSymbol, WeightFunction } from "./baseMap";

// ====== async
type AsyncBaseMapForList = (
  symbolsData: any,
  indicator: AsyncIndicator,
  getBuyWeight: WeightFunction,
  getSellWeight: WeightFunction,
  isBuying?: boolean
) => Promise<MappedSymbol[]>;

export type AsyncIndicator = (
  symbol: ISymbol,
  weightFunction: WeightFunction
) => Promise<any>;

export const asyncBaseMapForList: AsyncBaseMapForList = async (
  symbolsData,
  indicator,
  getBuyWeight,
  getSellWeight,
  isBuying = true
) => {
  try {
    const weightFunction = isBuying ? getBuyWeight : getSellWeight;
    return await Promise.all(
      symbolsData.map(async (symbolData) => {
        const indicated = await indicator(symbolData.symbol, weightFunction);
        console.log(indicated);

        return {
          // ...symbolData,

          name: symbolData.l18,
          inscode: symbolData.inscode,
          ...indicated,
        };
      })
    );
  } catch (error) {
    console.log(`Error on ${indicator.name} indicator`);
    throw new Error(`Error on ${indicator.name} indicator: ${error}`);
  }
};

type AsyncBaseMap = (
  indicator: AsyncIndicator,
  getBuyWeight: WeightFunction,
  getSellWeight: WeightFunction,
  isBuying?: boolean
) => Promise<MappedSymbol[]>;

export const asyncBaseMap: AsyncBaseMap = async (
  indicator,
  getBuyWeight,
  getSellWeight,
  isBuying = true
) => {
  try {
    const weightFunction = isBuying ? getBuyWeight : getSellWeight;
    const symbols: ISymbol[] = await Symbol.find({}).lean();
    return await Promise.all(
      symbols.map(async (symbol) => await indicator(symbol, weightFunction))
    );
  } catch (error) {
    console.log(`Error on ${indicator.name} indicator`);
    throw new Error(`Error on ${indicator.name} indicator: ${error}`);
  }
};
