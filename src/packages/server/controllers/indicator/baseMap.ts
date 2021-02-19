import {
  getClientTypesToday,
  IClientTypeVolCnt,
} from "../../api/getClientTypesToday";
import Symbol, { ISymbol } from "../../models/Symbol";

/**
 * map carrier functions are in sync and async form,
 * use as needed
 * in fact with these carriers, we defined a structure for all indicators
 */
export type MappedSymbol = {
  value?: number;
  weight?: number;
};

export type WeightFunction = (value: number) => number;

// ====== sync

/**
 * usage:
 * kharidBeForush
 */
export type BaseMapForList = (
  symbolsData: ISymbol[],
  clientTypes: IClientTypeVolCnt[],
  indicator: Indicator,
  getBuyWeight: WeightFunction,
  getSellWeight: WeightFunction,
  isBuying?: boolean
  //  MappedSymbol[]
) => Promise<MappedSymbol[]>;

export const baseMapForList: BaseMapForList = async (
  symbolsData,
  clientTypes,
  indicator,
  getBuyWeight,
  getSellWeight,
  isBuying = true
) => {
  try {
    const getWeight = isBuying ? getBuyWeight : getSellWeight;
    return symbolsData.map((symbol) => {
      const indicated = indicator(
        symbol,
        clientTypes.find((ct) => ct.inscode === symbol.inscode),
        getWeight
      );

      return {
        // name: symbol.l18,
        // inscode: symbol.inscode,
        ...symbol,
        ...indicated,
      };
    });
  } catch (error) {
    console.log(`Error on ${indicator.name} indicator: ${error}`);
    return null;
  }
};

export type BaseMap = (
  indicator: Indicator,
  getBuyWeight: WeightFunction,
  getSellWeight: WeightFunction,
  isBuying?: boolean,
  symbols?: ISymbol[]
) => Promise<MappedSymbol[]>;

export type Indicator = (
  symbol: ISymbol,
  ct: IClientTypeVolCnt /** difference with async */,
  weightFunction: WeightFunction
) => MappedSymbol | any;

export const baseMap: BaseMap = async (
  indicator,
  getBuyWeight,
  getSellWeight,
  isBuying = true,
  symbolsData
) => {
  try {
    const symbols = symbolsData || (await Symbol.find({}).lean());
    const clientTypes: IClientTypeVolCnt[] = await getClientTypesToday();
    const weightFunction = isBuying ? getBuyWeight : getSellWeight;
    return symbols.map((symbol) =>
      indicator(
        symbol,
        clientTypes.find((ct) => ct.inscode === symbol.inscode),
        weightFunction
      )
    );
  } catch (error) {
    console.log(`Error on ${indicator.name} indicator`);
    return null;
  }
};
