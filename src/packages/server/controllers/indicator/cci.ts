import { Request, Response } from "express";
import DayHistory, { RangeHistory } from "../../models/DayHistory";
import { roundTo1 } from "../../utils/roundTo";
import { asyncBaseMap, AsyncIndicator } from "./asyncBaseMap";

export const cciOnAll = async (_req: Request, res: Response) => {
  try {
    // console.log(symbols.length + " symbols were read ...");

    const cciList = await asyncBaseMap(
      cciIndicator,
      getBuyWeightCci,
      getSellWeightCci,
      true
    );
    const list = cciList.map((cci) => {
      return {
        cci: cci.value,
        weight: cci.weight,
      };
    });
    list;
    console.table(list);
    res.status(200).send(cciList);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const cciIndicator: AsyncIndicator = async (symbol, weightFunction) => {
  try {
    const ih: RangeHistory[] | undefined = (
      await DayHistory.findOne({ inscode: symbol.inscode })
    )?.ih;
    console.log(ih);
    let cciValue = 0;
    let cciWeight = 0;
    if (ih) {
      cciValue = cciFormula(ih);
      cciWeight = weightFunction(cciValue);
    }
    // console.log({ symbol: symbol.inscode, value: cci, weight });

    return { cciValue, cciWeight };
  } catch (error) {
    console.log(" Error of cci :" + error);
    return null;
  }
};

export const cciFormula = (ih: RangeHistory[]): number => {
  try {
    if (!ih || ih.length <= 0) return 0;

    const period = 6;
    const limit = period > ih.length ? period : ih.length;
    let i: number,
      j: number,
      tp: number, // Typical price = قیمت معمول
      smtp: number,
      nd: number,
      smnd: number,
      cci: number;
    let stp = 0;
    let snd = 0;
    for (i = 0; i < limit; i++) {
      j = limit - 1 - i;

      tp = (ih[j].PriceMax + ih[j].PClosing + ih[j].PriceMin) / 3;
      stp = stp + tp;
      smtp = stp / (i + 1); //  MA=Moving average= میانگین متحرک
      nd = Math.abs(smtp - tp);
      snd = snd + nd;
      smnd = snd / (i + 1);
      cci = (tp - smtp) / smnd / 0.015;
    }
    return roundTo1(cci);
  } catch (error) {
    throw new Error("cci err: " + error);
  }
};

export const getBuyWeightCci = (cci: number): number => {
  let weight = 0;
  switch (true) {
    case cci < -250:
      weight = 11;
      break;

    case -250 < cci && cci <= -100:
      weight = 5;
      break;

    case -100 < cci && cci <= 100:
      weight = 2;
      break;

    case cci > 100:
      weight = 2;
      break;

    default:
      break;
  }
  return weight;
};

export const getSellWeightCci = (cci: number): number => {
  let weight = 0;
  switch (true) {
    case cci < -250:
      weight = 0;
      break;

    case -250 < cci && cci <= -100:
      weight = 1;
      break;

    case -100 < cci && cci <= 100:
      weight = 3;
      break;

    case cci > 100:
      weight = 9;
      break;

    default:
      break;
  }
  return weight;
};
