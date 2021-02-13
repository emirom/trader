import { Request, Response } from "express";
import DayHistory, { RangeHistory } from "../../models/DayHistory";
import { ISymbol } from "../../models/Symbol";
import { roundTo1 } from "../../utils/roundTo";
import { asyncBaseMap, AsyncIndicator } from "./asyncBaseMap";
/**
 * A stochastic oscillator is a popular technical indicator for generating
 *  overbought and oversold signals.
 * ​
 * %K=(
 *      (H14−L14) / (C−L14)
 ​	   )×100
 *
 * where:
 * C = The most recent closing price
 * L14 = The lowest price traded of the 14 previous
 * trading sessions
 * H14 = The highest price traded during the same
 * 14-day period
 * %K = The current value of the stochastic indicator
 */

export const stocOnAll = async (_req: Request, res: Response) => {
  try {
    // console.log(symbols.length + " symbols were read ...");

    const stocList = await asyncBaseMap(
      stocIndicator,
      getBuyWeightStoc,
      getSellWeightStoc,
      true
    );
    const list = stocList.map((stoc) => {
      return {
        stoc: stoc.value,
        weight: stoc.weight,
      };
    });
    list;
    console.table(list);
    res.status(200).send(stocList);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const stocIndicator: AsyncIndicator = async (symbol, weightFunction) => {
  try {
    const ih: RangeHistory[] | undefined = (
      await DayHistory.findOne({ inscode: symbol.inscode })
    )?.ih;
    // console.log(ih);
    let stocValue;
    if (ih) {
      stocValue = stocFormula(symbol, ih);
    }
    const stocWeight = weightFunction(stocValue);
    // console.log({ symbol: symbol.inscode, value: stoc, weight });

    return { stocValue, stocWeight };
  } catch (error) {
    console.log(" Error of stoc :" + error);
    return null;
  }
};

export const stocFormula = (symbol: ISymbol, ih: RangeHistory[]): number => {
  try {
    if (!ih || ih.length === 0) return 0;
    const range = 14;
    const limit = ih?.length > range ? range : ih?.length;
    // const ihRange = ih.slice(0, range);
    let max = ih[0].PriceMax;
    let min = ih[0].PriceMin;

    for (let ipos = 0; ipos < limit; ipos++) {
      if (max < ih[ipos].PriceMax) max = ih[ipos].PriceMax;
      if (min > ih[ipos].PriceMin) min = ih[ipos].PriceMin;
    }

    const K = ((symbol.pc - min) / (max - min)) * 100;

    const D =
      (K +
        ((ih[0].PClosing - min) / (max - min)) * 100 +
        ((ih[1].PClosing - min) / (max - min)) * 100) /
      3;
    return roundTo1(D);
  } catch (error) {
    throw new Error("stoc formula: " + error);
  }
};

export const getBuyWeightStoc = (stoc: number): number => {
  let weight = 0;
  switch (true) {
    case stoc <= 20:
      weight = 5;
      break;

    case 20 < stoc && stoc <= 80:
      weight = 4;
      break;

    case 80 < stoc:
      weight = 1;
      break;

    default:
      break;
  }
  return weight;
};

export const getSellWeightStoc = (stoc: number): number => {
  let weight = 0;
  switch (true) {
    case stoc <= 20:
      weight = 0;
      break;

    case 20 < stoc && stoc <= 80:
      weight = 5;
      break;

    case 80 < stoc:
      weight = 9;
      break;

    default:
      break;
  }
  return weight;
};
