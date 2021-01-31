import { Request, Response } from "express";
import DayHistory from "../../models/DayHistory";
import Symbol from "../../models/Symbol";
import { asyncBaseMap, AsyncIndicator } from "./baseMap";

export const cciOnAll = async (_req: Request, res: Response) => {
  try {
    const symbols = await Symbol.find({});
    console.log(symbols.length + " symbols were read ...");

    const cciList = await asyncBaseMap(cciIndicator, symbols, true);
    res.status(200).send(cciList);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const cciIndicator: AsyncIndicator = async (symbol, isBuying) => {
  try {
    const ih = (await DayHistory.findOne({ inscode: symbol.inscode })).ih;
    if (!ih) return null;

    const period = 6;
    let i: number,
      j: number,
      tp: number, // Typical price = قیمت معمول
      smtp: number,
      nd: number,
      smnd: number,
      cci: number;
    let stp = 0;
    let snd = 0;
    const weightFunction = isBuying ? getBuyWeight : getSellWeight;
    for (i = 0; i < period; i++) {
      j = period - 1 - i;

      tp = (ih[j].PriceMax + ih[j].PClosing + ih[j].PriceMin) / 3;
      stp = stp + tp;
      smtp = stp / (i + 1); //  MA=Moving average= میانگین متحرک
      nd = Math.abs(smtp - tp);
      snd = snd + nd;
      smnd = snd / (i + 1);
      cci = (tp - smtp) / smnd / 0.015;
    }
    const weight = weightFunction(cci);

    console.log({ symbol: symbol.inscode, value: cci, weight });

    return { symbol, value: cci, weight };
  } catch (error) {
    console.log(" Error of cci :" + error);
    return null;
  }
};
const getBuyWeight = (cci: number) => {
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

const getSellWeight = (cci: number) => {
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
